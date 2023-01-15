// .addFields({ name: ' 🛑 > Nickname do consultado:', value: `${data.Nickname}`, name:''})
const cooldown = new Set()
const { CommandType, ArgumentType, Command, Argument } = require('gcommands')
const { EmbedBuilder, Events, ActionRowBuilder, ButtonStyle, ButtonBuilder, ComponentType } = require('discord.js')
const schema = require('../model/model')
const like = require('../model/modelLike')

new Command({
    name: 'perfil',
    description: 'a',
    type: [CommandType.SLASH],
    arguments: [
        new Argument({
            name: 'usuario',
            description: 'a',
            type: ArgumentType.USER,
            required: false,
        }),
        // new Argument({
        //     name: 'nickname',
        //     description: 'a',
        //     type: ArgumentType.STRING,
        //     required: false,
        // }),
    ],
    run: (ctx, message) => {
        const user = ctx.arguments.getUser('usuario')
        const data2 = like.findOne({ UserID: ctx.user.id })
        const nick = ctx.arguments.getString('nickname')
        schema.findOne({ UserID: user.id }, (error, data) => {
            const row = new ActionRowBuilder().addComponents(
                new ButtonBuilder().setCustomId('like').setLabel('❤️').setStyle(ButtonStyle.Danger),
                new ButtonBuilder().setCustomId('seguir').setLabel('🔰').setStyle(ButtonStyle.Primary)
            )
            if (!data) {
                return ctx.reply('Vc não está registrado')
            } else {
                const embed =
                    new EmbedBuilder()

                        .setTitle('✅  | Usuário encontrado!')
                        .setColor('Random')
                        .addFields([
                            {
                                name: '🚧 | Nick in game',
                                value: `${data.Nickname}`,
                                inline: false,
                            },
                            {
                                name: ' 🔰 | Discord do usuário',
                                value: `<@${data.UserID}>`,
                                inline: false,
                            },
                            {
                                name: '🏷️  | Bio',
                                value: data.Bio || 'Não possui',
                            },
                            {
                                name: '💱  | Nekot coins',
                                value: data.Dinheiro + ' N$',
                            },
                            {
                                name: 'likes no perfil',
                                value: data2.Like || '0',
                            },
                        ])
                        .setImage(data.Banner) || 'não possui'.setThumbnail(`https://mc-heads.net/combo/${data.Nickname}`)
                return ctx.reply({ embeds: [embed], components: [row] }).then((m) => {
                    const collector = m.createMessageComponentCollector({ componentType: ComponentType.Button, time: 15000 })

                    collector.on('collect', async (i) => {
                        if (i.isButton()) {
                            if (i.customId === 'like') {
                                const data = await schema.findOne({ UserID: ctx.user.id })
                                if (!data) {
                                    return i.reply('Se registre')
                                } else {
                                    data2.findOne({ PerfilCurtido: user.id }, (error, data) => {
                                        if (data) {
                                            return i.reply('a')
                                        } else {
                                            like.create({ PessoaQueCurtiu: i.user.id, PerfilCurtido: user.id, Like: 1 }, (error, data) => {
                                                if (data) {
                                                    data.PerfilCurtido = user.id
                                                    data.Like = data.Like + 1
                                                    data.save();
                                                    i.reply('curtido2')
                                                }
                                                i.reply('curtido')
                                            })
                                        }
                                    })
                                }
                            }
                        }
                    })
                })
            }
        })
    },
})
