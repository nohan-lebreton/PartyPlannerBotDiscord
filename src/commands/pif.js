// src/commands/pif.js

module.exports = {
    data: {
      name: 'pif',
      description: 'Répond avec Paf!',
    },
    async execute(interaction) {
      await interaction.reply('Paf!');
    },
  };
  