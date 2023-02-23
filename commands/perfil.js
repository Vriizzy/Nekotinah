// .addFields({ name: ' 🛑 > Nickname do consultado:', value: `${data.Nickname}`, name:''})
const cooldown = new Set()
const { CommandType, ArgumentType, Command, Argument } = require('gcommands')
const { EmbedBuilder, Events, ActionRowBuilder, ButtonStyle, ButtonBuilder, ComponentType } = require('discord.js')
const schema = require('../model/model')
const client = require('../index')
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
    run: async (ctx, message) => {
        const user = ctx.arguments.getUser('usuario') || ctx.user
        const nick = ctx.arguments.getString('nickname')
        const data = await schema.findOne({ UserID: user.id })

        schema.findOne({ UserID: user.id }, (error, data) => {
            const row = new ActionRowBuilder().addComponents(
                new ButtonBuilder().setCustomId('like').setLabel('❤️').setStyle(ButtonStyle.Danger).setDisabled(),
                new ButtonBuilder().setCustomId('seguir').setLabel('🔰').setStyle(ButtonStyle.Primary).setDisabled(),
               
            )

            if (!data) {
                return ctx.reply('Vc não está registrado')
            } else {
                fetch(`https://mush.com.br/api/player/${data.Nickname}`)
                    .then((response) => response.json())
                    .then((json) => {
                        const embed =
                            new EmbedBuilder()
                                .setThumbnail(`https://mc-heads.net/combo/${data.Nickname}.png`)
                                .setTitle('✅  | Usuário encontrado!')
                                .setColor(`${json.response.rank.color}`)
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
                                        name: '💄 | Like no perfil',
                                        value: `${data.Like}`,
                                    },
                                    {
                                        name: '🌌 | Vip',
                                        value: json.response.rank.title || json.response.account.type,
                                    },
                                    {
                                        name: ' ⭐ | Level BW',
                                        value: `${json.response.stats.bedwars.level}`,
                                    },
                                ])
                                .setImage(data.Banner) || 'não possui'
                        return ctx.reply({ embeds: [embed], components: [row] }).then((m) => {
                            client.on('interactionCreate', (i) => {
                                if (i.isButton()) {
                                    if (i.customId === 'like') {
                                        schema.find({ PessoaQueCurtiu: ctx.user.id }, (error, data) => {
                                            if (user.id === PessoaQueCurtiu) {
                                                return i.reply('você já curtiu esse perfil')
                                            } else {
                                                data.PessoaQueCurtiu = `${user.id}`
                                                data.Like = data.Like + 1
                                                data.save()
                                                i.reply('você curtiu esse perfil')
                                            }
                                        })
                                    }
                                }
                            })
                        })
                    })
            }
        })
    },
})
