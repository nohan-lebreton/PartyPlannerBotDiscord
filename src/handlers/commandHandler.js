// src/handlers/commandHandler.js

const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require('fs');
const path = require('path');

module.exports = (client) => {
  // Charge toutes les commandes dans le dossier `commands`
  const commands = [];
  const commandFiles = fs.readdirSync(path.join(__dirname, '../commands')).filter(file => file.endsWith('.js'));

  for (const file of commandFiles) {
    const command = require(path.join(__dirname, '../commands', file));
    client.commands.set(command.data.name, command);
    commands.push(command.data.toJSON());
  }

  // Déployer les commandes
  return commands;
};
