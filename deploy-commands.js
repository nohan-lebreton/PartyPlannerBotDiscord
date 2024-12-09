require('dotenv').config();
const { REST, Routes } = require('discord.js');

// Créer une liste des commandes
const commands = [
    {
        name: 'ping',
        description: 'Replies with Pong!',
    },
    {
        name: 'createparty',
        description: 'Create a new party',
        options: [
            {
                name: 'party_name',
                type: 3, // STRING
                description: 'The name of the party',
                required: true,
            },
            {
                name: 'game_name',
                type: 3, // STRING
                description: 'The name of the game',
                required: true,
            },
            {
                name: 'date',
                type: 3, // STRING
                description: 'Date of the party (dd-mm-yyyy)',
                required: true,
            },
            {
                name: 'min_players',
                type: 4, // INTEGER
                description: 'Minimum number of players',
                required: true,
            },
            {
                name: 'max_players',
                type: 4, // INTEGER
                description: 'Maximum number of players (optional)',
                required: false,
            },
        ],
    },
    {
        name: 'showparties',
        description: 'Show the list of parties',
    },
];

// Créer une nouvelle instance REST pour envoyer les commandes à l'API Discord
const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

// Enregistrer les commandes
(async () => {
    try {
        console.log('Démarrage de l\'enregistrement des commandes /.');

        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            { body: commands },
        );

        console.log('Commandes / enregistrées avec succès.');
    } catch (error) {
        console.error('Erreur lors de l\'enregistrement des commandes:', error);
    }
})();
