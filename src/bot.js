require('dotenv').config({
    silent:true
})

//Cli do discord
if(process.env.TOKEN_DISCORD)
    require('./bot/cli/discord/cli')