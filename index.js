require('dotenv').config()
const { GClient, Plugins, Command, Component } = require('gcommands')
const { GatewayIntentBits, Events } = require('discord.js')
const obj = require('./economia/emprestimo')
const { join } = require('path')
const schema = require('./model/model')
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
    ],
    messagePrefix: '!',
    messageSupport: true | true,
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
})

mongoose.connect(process.env.MONGODB)
mongoose.connection.on('connected', () => {
    console.log('connected')
})

client.on(Events.InteractionCreate, async (interaction) => {
    if (interaction.isButton()) {
        if (interaction.customId === 'aceito') {
            const data = await schema.findOne({ UserID: interaction.user.id })
            if (!data) {
                return interaction.reply('Você não está registrado!')
            } else {
                interaction.user.send(`${interaction.user}, o usuário aceitou a solicitação de emprestimo!`)
            }
        }
    }
})
client.login(process.env.DISCORD_TOKEN)
