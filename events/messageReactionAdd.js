// events/messageReactionAdd.js
module.exports = {
    name: 'messageReactionAdd',
    async execute(reaction, user) {
        if (user.bot) return; // Ignorer les réactions du bot

        const { message } = reaction;
        const party = await getPartyFromMessage(message); // Récupérer les infos de la party associée au message
        
        if (!party) return;

        const minPlayers = party.minPlayers;
        const totalReactions = reaction.count; // Compter le nombre total de réactions

        if (totalReactions >= minPlayers) {
            // Si le nombre de votes dépasse ou égale au nombre minimum de joueurs
            const embed = message.embeds[0];

            // Créer une nouvelle version de l'embed avec la couleur verte
            const newEmbed = {
                ...embed.data, // Copie les données de l'embed original
                color: 0x00FF00, // Change la couleur à vert
            };

            // Modifier le message avec le nouvel embed
            await message.edit({ embeds: [newEmbed] });
        }
    },
};

// Fonction pour récupérer les informations de la party depuis le message
async function getPartyFromMessage(message) {
    // Ici, tu dois définir la logique pour récupérer la party associée à ce message.
    // Par exemple, à partir d'une base de données ou d'une variable stockée.
    return {
        minPlayers: 4, // Exemple : minimum 4 joueurs
    };
}
