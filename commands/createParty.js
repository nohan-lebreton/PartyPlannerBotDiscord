const { SlashCommandBuilder } = require('@discordjs/builders');
const { addReactionsToMessage } = require('../utils/emojiHandler');
const { addParty } = require('../utils/partyManager');
const { EmbedBuilder } = require('discord.js');
const path = require('path');
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('createparty')
        .setDescription('Créer une nouvelle party')
        .addStringOption(option => option.setName('party_name').setDescription('Nom de la party').setRequired(true))
        .addStringOption(option => option.setName('game_name').setDescription('Nom du jeu').setRequired(true))
        .addStringOption(option => option.setName('date').setDescription('Date de la party (dd/mm/yyyy)').setRequired(true))
        .addIntegerOption(option => option.setName('min_players').setDescription('Nombre minimum de joueurs').setRequired(true))
        .addIntegerOption(option => option.setName('max_players').setDescription('Nombre maximum de joueurs').setRequired(false)),

    async execute(interaction) {
        const name = interaction.options.getString('party_name');
        const game = interaction.options.getString('game_name');
        const date = interaction.options.getString('date');
        const minPlayers = interaction.options.getInteger('min_players');
        const maxPlayers = interaction.options.getInteger('max_players') || 'Pas spécifié';

        // Créer l'objet party
        const party = { name, game, date, minPlayers, maxPlayers };
        addParty(party); // Ajouter la party à la liste

        // Répondre à l'interaction
        await interaction.reply(`Party "${name}" créée avec succès pour le jeu "${game}" le ${date}.`);

        // Récupérer le canal "party-planner"
        const partyChannel = interaction.guild.channels.cache.find(channel => channel.name === 'party-planner');
        if (partyChannel) {
            // Charger une image depuis le dossier /img
            const imgDir = './img/';
            let imagePath = '';
            try {
                const files = fs.readdirSync(imgDir);
                if (files.length > 0) {
                    const imageFile = files[Math.floor(Math.random() * files.length)]; // Choisir une image au hasard
                    imagePath = path.join(imgDir, imageFile);
                }
            } catch (error) {
                console.error('Erreur lors de la récupération de l\'image:', error);
            }

            // Créer un embed pour formater le message de la party
            const partyEmbed = new EmbedBuilder()
                .setTitle(name)  // Le nom de la party en titre
                .setDescription(`Jeu : ${game}\nDate : ${date}\nJoueurs minimum : ${minPlayers}\nJoueurs maximum : ${maxPlayers}`)
                .setColor('#0099ff')  // Bleu au départ
                .setTimestamp()  // Ajouter la date de création de l'embed
                .setImage(`attachment://${path.basename(imagePath)}`);  // Ajouter l'image dans l'embed

            // Envoyer l'embed et l'image en tant que pièce jointe
            const message = await partyChannel.send({ 
                embeds: [partyEmbed], 
                files: [imagePath] 
            });

            // Ajouter les réactions d'émojis au nouveau message
            await addReactionsToMessage(message, interaction.guild);

            // Suivre les réactions et changer la couleur de l'embed si le nombre de joueurs min est atteint
            const filter = (reaction, user) => !user.bot; // Ignorer les réactions des bots
            const collector = message.createReactionCollector({ filter, dispose: true });

            const updateEmbedColor = async () => {
                let isPartyValidated = false; // Pour suivre si la party est validée

                for (const [emoji, reaction] of message.reactions.cache) {
                    const userReactions = await reaction.users.fetch();
                    const voteCount = userReactions.size ; // Ignorer le bot dans les votes

                    // Comparer les votes à minPlayers
                    if (voteCount >= minPlayers) {
                        isPartyValidated = true; // Si un emoji atteint le nombre minimal
                        break; // Pas besoin de continuer si déjà validé
                    }
                }

                // Mettre à jour la couleur de l'embed en fonction de la validation
                const newColor = isPartyValidated ? '#00FF00' : '#0099ff'; // Vert si validé, bleu sinon
                const updatedEmbed = new EmbedBuilder()
                    .setTitle(name)
                    .setDescription(`Jeu : ${game}\nDate : ${date}\nJoueurs minimum : ${minPlayers}\nJoueurs maximum : ${maxPlayers}`)
                    .setColor(newColor)  // Mettre à jour la couleur en fonction des votes
                    .setTimestamp()
                    .setImage(`attachment://${path.basename(imagePath)}`);

                await message.edit({ embeds: [updatedEmbed] });
            };

            // Surveiller les ajouts de réactions
            collector.on('collect', async () => {
                await updateEmbedColor();
            });

            // Surveiller les suppressions de réactions
            collector.on('remove', async () => {
                await updateEmbedColor();
            });

        } else {
            console.error('Le canal "party-planner" n\'a pas été trouvé.');
        }
    },
};
