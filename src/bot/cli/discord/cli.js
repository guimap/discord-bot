const Discord = require('discord.io');
const logger = require('winston');
const commands = require('../../tree');
const { TOKEN_DISCORD } = process.env;




/**
 * @desc Recebe  os comandos e as palavras do comando dado,e a palavra a ser analisada
 * @param {*} commands Array da arvore de comandos
 * @param {*} commandsString Texto do comando 
 * @param {*} words Array de palavras do comando passado pelo usuario
 * @param {*} currentWord Palavra sendo analisada
 */
function searchInTree(commands,commandString,words,indexWord){
    for(let c of commands){
        if(c.node == words[indexWord]){
            if(c.childs){
                return searchInTree(c.childs, commandString, words, ++indexWord)
            }else if(c.command){

                let args = words.slice(++indexWord, words.length);
                return c.command(args)
            }
        }
    }
}


var bot = new Discord.Client({
    token: TOKEN_DISCORD,
    autorun: true
 });


 bot.on('ready', (evt) => {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')'); 
});

bot.on('message', (user, userID, channelID, message, evt) => {

    let comando = message
    let words = comando.split(' ')
    
    console.log("Comando", message)
    const result = searchInTree(commands,comando,words,0)
    if(result){
        result
        .then(message => {
            bot.sendMessage({
                to:channelID,
                message: message
            })
        })
        .catch(console.error)
    }
})