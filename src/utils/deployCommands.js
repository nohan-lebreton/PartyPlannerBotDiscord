// src/utils/deployCommands.js

const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token } = require('../config.json');

module.exports = async (commands) => {
  const rest = new REST({ version: '9' }).setToken(token);

  try {
    console.log('Déploiement des commandes...');
    await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
      body: commands,
    });
    console.log('Commandes déployées!');
  } catch (error) {
    console.error(error);
  }
};
