const { ChannelType, PermissionsBitField } = require('discord.js');

module.exports = {
    name: 'guildCreate',
    once: false,
    async execute(guild, client) {
        console.log(`Le bot a rejoint le serveur : ${guild.name}`);
        try {
            const channel = await guild.channels.create({
                name: 'party-planner',  // Le nom du canal
                type: ChannelType.GuildText,  // Canal textuel
                permissionOverwrites: [
                    {
                        id: guild.id,  // @everyone (rendre visible)
                        allow: [PermissionsBitField.Flags.ViewChannel],  // Permet de voir le canal
                        deny: [PermissionsBitField.Flags.SendMessages],  // Interdit d'envoyer des messages
                    },
                    {
                        id: client.user.id,  // ID du bot
                        allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages],  // Permet au bot d'envoyer des messages
                    },
                ],
            });
            console.log(`Canal créé : ${channel.name}`);
        } catch (error) {
            console.error('Erreur lors de la création du canal :', error);
        }
    },
};
