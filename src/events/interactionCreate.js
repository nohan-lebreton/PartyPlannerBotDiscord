// src/events/interactionCreate.js

module.exports = async (client, interaction) => {
    if (!interaction.isCommand()) return;
  
    const { commandName } = interaction;
  
    // Charge les commandes dynamiquement
    const command = client.commands.get(commandName);
  
    if (!command) return;
  
    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      await interaction.reply({ content: 'Il y a eu une erreur lors de l\'exécution de cette commande!', ephemeral: true });
    }
  };
  