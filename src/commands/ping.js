// src/commands/ping.js

module.exports = {
    data: {
      name: 'ping',
      description: 'Répond avec Pong!',
    },
    async execute(interaction) {
      await interaction.reply('Pong!');
    },
  };
  