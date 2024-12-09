module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        console.log(`Prêt! Connecté en tant que ${client.user.tag}`);
    },
};
