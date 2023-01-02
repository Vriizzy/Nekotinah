const { CommandType, ArgumentType, Command, Argument } = require('gcommands')
const { EmbedBuilder } = require('discord.js')
const schema = require('../model/model.js')

new Command({
    name: 'bio',
    description: 'Escreva e deixe seu perfil bonito com uma bela bio!',
    type: [CommandType.SLASH],
    arguments: [
        new Argument({
            name: 'escreva',
            description: 'Quase lá',
            type: ArgumentType.STRING,
            required: true,
        }),
    ],
    run: (ctx) => {
        const bioo = ctx.arguments.getString('escreva')
         schema.findOne({ UserID: ctx.user.id }, (error, data) => {
            if (!data) {
                return ctx.reply('Por favor, se registre usando /register')
            } else {
                data.Bio = bioo
                data.save();
                ctx.reply(`Bio definida como: ${bioo}`)
            }
        })
    },
})
