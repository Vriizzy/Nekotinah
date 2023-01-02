const { CommandType, ArgumentType, Command, Argument } = require('gcommands')
const { EmbedBuilder } = require('discord.js')
var generator = require('generate-password')
const schema = require('../model/model.js')
const password = generator.generate({
    length: 8,
    numbers: false,
})
new Command({
    name: 'register',
    description: 'Registre-se digitando seu nick',
    type: [CommandType.SLASH],
    arguments: [
        new Argument({
            name: 'nickname',
            description: 'Quase lá...',
            type: ArgumentType.STRING,
            required: true,
        }),
    ],
    run: (ctx) => {
        const nick = ctx.arguments.getString('nickname')
        schema.findOne({ UserID: ctx.user.id }, (error, data) => {
            if (data) {
                return ctx.reply('Você já possui registro em.')
            } else {
                schema.create({ UserID: ctx.user.id, Nickname: nick, IdRegister: password }, () => {
                    const embed = new EmbedBuilder()
                        .setTitle('✅ > Registro feito!')
                        .setColor('Random')
                        .setThumbnail(`https://mc-heads.net/avatar/${nick}`)
                        .setDescription(`🌀 > Nick registrado: **${nick}** \n⭐> Discord registrado: ${ctx.user}\n🏓 > ID do registro: ${password}`)

                    return ctx.reply({ embeds: [embed] })
                })
            }
        })
    },
})
