let partyList = [];

function addParty(party) {
    partyList.push(party);
}

function getPartyList() {
    return partyList.length === 0 
        ? 'Aucune partie disponible.' 
        : partyList.map(party => 
            `>>> \`\`\`fix\n${party.name}\n${party.game}\n${party.date}\n${party.minPlayers} joueurs min\n${party.maxPlayers} joueurs max\n\`\`\``)
        .join('\n');
}

module.exports = { addParty, getPartyList };
