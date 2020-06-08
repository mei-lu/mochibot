require('dotenv').config()
const Discord = require('discord.js')
const client = new Discord.Client();
const fetch = require('node-fetch')

client.once('ready', () => {
	console.log('Ready!');
});

client.login(process.env.BOT_TOKEN)

client.on('message', async message => {
     let command = message.content.replace('~', '')
     console.log(command)
    if (message.content.startsWith('~')) {
        try{
            await fetch(`https://mochimoji-api.herokuapp.com/kaomojis/${command}`).then(response => response.json())
            .then(data => {
                if (data === undefined) {
                    message.channel.send('Invalid emotion (╥_╥)')
                } else {
                    message.channel.send(data[0].kaomoji)
                }
            })
        } catch (err) {
            message.channel.send('No kaomoji (╥_╥)')
        }
        
        
    }
})
