require('dotenv').config({
    silent:true
})

const commands = require('./src/bot/tree');


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

let comando = "procurar anime boku no hero academia ep 17"
let words = comando.split(' ')

console.log("Comando", comando)
const result = searchInTree(commands,comando,words,0)
if(result){
    result.then(console.log)
    .catch(console.error)
}

