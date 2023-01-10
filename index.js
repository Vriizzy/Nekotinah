require('dotenv').config()
const { GClient, Plugins, Command, Component } = require('gcommands')
const { GatewayIntentBits, Events, InteractionCollector } = require('discord.js')
const { join } = require('path')
const mongoose = require('mongoose')
mongoose.Promise = global.Promise
Command.setDefaults({
    cooldown: '5s',
})

Component.setDefaults({
    onError: (ctx, error) => {
        return ctx.reply(`Opa, encontrei um erro ${error}, aguarde um pouco...`)
    },
})

Plugins.search(__dirname)

const client = new GClient({
    dirs: [
        join(__dirname, 'commands'),
        join(__dirname, 'listeners'),
        join(__dirname, 'components'),
        join(__dirname, 'model'),
        join(__dirname, 'economia'),
        join(__dirname, 'ticket'),
    ],
    messagePrefix: '!',
    messageSupport: true | true,
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMembers],
})

mongoose.connect(process.env.MONGODB)
mongoose.connection.on('connected', () => {
    console.log('connected')
})
client.on('guildMemberAdd', (member) => {
    member.send('')
})

client.on('interactionCreate', (i) => {
   console.log(i.isButton, i.isButton())

        if (i.customId === 'abrir') {
            let verificaçao = i.guild.channels.cache.find((ticket) => ticket.name === i.user.id)
            if (verificaçao) {
                return i.reply(`Eita! Você já possui um ticket em instancia!\nEle está aberto bem aqui ${verificaçao}`)
            } else {
                i.guild.channels.create(verificaçao)
            }
        }
    })

    
client.login(process.env.DISCORD_TOKEN)
