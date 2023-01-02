const { CommandType, ArgumentType, Command, Argument } = require('gcommands')
const { EmbedBuilder } = require('discord.js')
const schema = require('../model/model')

new Command({
    name: 'transferir',
    description: 'Transfira um valor',
    type: [CommandType.SLASH],
    arguments: [
        new Argument({
            name: 'user',
            description: 'Insira o usuário que deseja transferir',
            type: ArgumentType.USER,
            required: true,
        }),
        new Argument({
            name: 'valor',
            description: 'Insira um valor(em numero)',
            type: ArgumentType.NUMBER,
            required: true,
        }),
    ],
    run: async (ctx) => {
        const valorg = ctx.arguments.getNumber('valor')
        const user = ctx.arguments.getUser('user')
        schema.findOne({ UserID: user.id }, async (error, data) => {
              if (valorg > data.Dinheiro) {
                  return ctx.reply('Você não tem essa quantidade de dinheiro')
              }
            if (!data) {
                return ctx.reply('Vc não está registrado')
            } else {
                const novoDin = valorg
                data.Dinheiro = data.Dinheiro + novoDin
                data.save()
              
                schema.findOne({ UserID: ctx.user.id }, (error, data) => {
                        
                    if (error) {
                        console.log(error)
                    }
                    const reduzir = data.Dinheiro - valorg
                    data.Dinheiro = reduzir
                    data.save()
                })
                return ctx.reply(`Foi transferido ${valorg} para ${user}`)
            }
        })
    },
})
