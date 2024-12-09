const fs = require('fs');

async function addReactionsToMessage(message, guild) {
    const emojiPath = './emoji/';
    try {
        const files = fs.readdirSync(emojiPath);
        for (const file of files) {
            const emojiName = file.split('.')[0];
            const emoji = guild.emojis.cache.find(e => e.name === emojiName);
            if (emoji) {
                await message.react(emoji);
            }
        }
    } catch (error) {
        console.error('Erreur lors de l\'ajout des réactions:', error);
    }
}

module.exports = { addReactionsToMessage };
