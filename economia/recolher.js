const cooldown = new Set()
const { Command, CommandType, Argument, ArgumentType } = require('gcommands')
const { EmbedBuilder } = require('discord.js')
const schema = require('../model/model')
const ms = require('ms')

new Command({
    name: 'recolher',
    description: 'Recolha uma quantia em dinheiro para poder adquirir coisas dentro do sistema do bot',
    type: [CommandType.SLASH],
    run: async (ctx) => {
        let tempo = 10800000
        if (cooldown.has(ctx.user.id)) {
            return ctx.reply(`Você precisa aguardar \`3 horas\` para poder executar novamente o comando`)
        }
        cooldown.add(ctx.user.id)
        setTimeout(() => {
            cooldown.delete(ctx.user.id)
        }, `${tempo}`)
        let valor = Math.ceil(Math.random() * 10000)
        const data = await schema.findOne({ UserID: ctx.user.id })
        data.Dinheiro = valor + data.Dinheiro
        data.save()

        return ctx.reply(`A quantia que você resgatou foi: ${valor}, utilize /perfil para visualizar a quantia em sua carteira!`)
    },
})
