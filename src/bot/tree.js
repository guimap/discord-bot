const commands = require('./commands')
const tree = [
    {
        node: "procurar",
        childs: [
            {
                node: 'anime',
                command: commands.searchAnime
            },
            
            {
                node: 'episodios',
                command: commands.listCommands
            }

        ]
    },
    {
        node: "help",
        command: commands.listCommands
    }
]

//Arvore de decisão
module.exports = tree