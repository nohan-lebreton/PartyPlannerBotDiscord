const { SlashCommandBuilder } = require('@discordjs/builders');
const { getPartyList } = require('../utils/partyManager');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('showparties')
        .setDescription('Afficher la liste des parties'),
    
    async execute(interaction) {
        const partyDetails = getPartyList(); // Obtenir la liste des parties
        await interaction.reply('Voici la liste des parties :\n' + partyDetails);
    },
};
