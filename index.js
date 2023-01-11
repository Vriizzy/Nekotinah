require('dotenv').config()
const { GClient, Plugins, Command, Component } = require('gcommands')
const {
    GatewayIntentBits,
    Events,
    PermissionFlagsBits,
    ChannelType,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
} = require('discord.js')
const { join } = require('path')
const mongoose = require('mongoose')
const schema = require('./model/modelTicket')
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

client.on('interactionCreate', async (interaction) => {
    function deleteChannel() {
        interaction.channel.delete()
    }
    if (interaction.isButton()) {
        if (interaction.customId === 'abrir') {
            const nome_do_canal = `🌀 -${interaction.user.username}`
            const canal = interaction.guild.channels.cache.find((c) => c.name == nome_do_canal)
            const data = await schema.findOne({ UserID: interaction.user.id })
            if (data) {
                return interaction.reply({ content: `Parece que você já tem um ticket aberto!` })
            } else {
                schema.create({ UserID: interaction.user.id, TicketName: nome_do_canal }, (error, data) => {})
                let categoria = interaction.channel.parent
                if (!categoria) return null
                interaction.guild.channels
                    .create({
                        name: `${nome_do_canal}`,
                        type: ChannelType.GuildText,
                        parent: categoria,
                        permissionOverwrites: [
                            {
                                id: interaction.user.id,
                                deny: [PermissionFlagsBits.ViewChannel],
                            },
                            {
                                id: interaction.user.id,
                                allow: [PermissionFlagsBits.AddReactions, PermissionFlagsBits.SendMessagesInThreads],
                            },
                        ],
                    })
                    .then((ch) => {
                        interaction.reply({ content: `Seu ticket foi aberto em ${ch} corre lá para ver!`, ephemeral: true })
                        const row = new ActionRowBuilder().addComponents(
                            new ButtonBuilder().setCustomId('fechar-ticket').setEmoji('❌').setStyle(ButtonStyle.Danger)
                        )
                        const embed = new EmbedBuilder()
                            .setTitle('Ticket aberto!')
                            .setDescription(`${interaction.user} Olá! seu ticket foi aberto, aguarde até que um staff te responda!`)

                        return ch.send({ embeds: [embed], components: [row] }).then((m) => {})
                    })
            }
        } else if (interaction.customId === 'fechar-ticket') {
            interaction.reply('fechando ticket em 5 segundos...')
            setTimeout(() => {
                deleteChannel()
                schema.findOneAndDelete({ UserID: interaction.user.id }, (err) =>{
                    if(err) throw err;
                })
            }, 5000)
        }
    }
})

client.login(process.env.DISCORD_TOKEN)
