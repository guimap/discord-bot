const logger = require('knoblr')
const http = require('http')
const request = require('request')
const prefixPath = '../../hyuga/src/';
const StrategyBuilder = require(prefixPath + 'strategies/StrategyBuilder')



const searchAnime = (command) => {
    const stringCommand = command.join(' ');
    
    const ep = stringCommand.match(/\d+/ig)
    const name = /(.*?)ep|episodio/ig.exec(stringCommand)
    
    const builder = new StrategyBuilder()
    const anime = {
        _id: "000",
        episode: ep[0],
        name: name[1] ? name[1].trim() : 'null' ,
        datasource: 'animesonline'
    } 
    
    
    return new Promise((resolve,reject) => {
        
        let strategy = builder.build(anime.datasource)    
        strategy.execute(anime)
        .then(animeResult => {
            resolve(`Veja nesse link ${animeResult.link}`)
        })
        .catch(reject)        
    })
    
}

const listCommands = () => {
    return "Teste"
}

module.exports = {
    searchAnime,
    listCommands
}