// .addFields({ name: ' 🛑 > Nickname do consultado:', value: `${data.Nickname}`, name:''})
const cooldown = new Set();
const { CommandType, ArgumentType, Command, Argument } = require('gcommands')
const { EmbedBuilder, Events } = require('discord.js')
const schema = require('../model/model')

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
    run: (ctx) => {
        const user = ctx.arguments.getUser('usuario')

        const nick = ctx.arguments.getString('nickname')
        schema.findOne({ UserID: user.id}, (error, data) => {
            if (!data) {
                return ctx.reply('Vc não está registrado')
            } else {
                const embed = new EmbedBuilder()
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
                            name: '💱  | RsZ coins',
                            value: data.Dinheiro + ' R$',
                        },
                    ])

                    .setImage(data.Banner)

                    .setThumbnail(`https://mc-heads.net/combo/${data.Nickname}`)
                return ctx.reply({ embeds: [embed] })
            }
        })
    },
})
