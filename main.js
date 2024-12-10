// main.js

const { Client, Intents } = require('discord.js');
const { token } = require('./config.json');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// Pour stocker les commandes
client.commands = new Map();

// Importation des gestionnaires d'événements
const commandHandler = require('./src/handlers/commandHandler');
const interactionCreateHandler = require('./src/events/interactionCreate');

// Chargement des commandes
const commands = commandHandler(client);

// Enregistrement des commandes auprès de Discord
require('./src/utils/deployCommands')(commands);

// Initialisation du bot
client.once('ready', () => {
  console.log('Bot prêt!');
});

// Gestion des événements d'interaction
client.on('interactionCreate', (interaction) => interactionCreateHandler(client, interaction));

// Connexion du bot
client.login(token);
