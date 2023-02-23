const cooldown = new Set()
const { Command, CommandType, Argument, ArgumentType } = require('gcommands')
const { EmbedBuilder, ButtonStyle, ActionRowBuilder, ButtonBuilder } = require('discord.js')
const schema = require('../model/model.js')
new Command({
    name: 'emprestimo',
    description: 'peça um emprestimo',
    type: [CommandType.SLASH],
    arguments: [
        new Argument({
            name: 'usuario',
            description: 'Selecione o usuário',
            type: ArgumentType.USER,
            required: true,
        }),
        new Argument({
            name: 'quantia',
            description: 'Quantia',
            type: ArgumentType.NUMBER,
            required: true,
        }),
    ],
    run: async (ctx) => {
        const data = await schema.findOne({ UserID: ctx.user.id })
        const usuario = ctx.arguments.getUser('usuario')
        const quantia = ctx.arguments.getNumber('quantia')
        if(usuario.id === ctx.user.id) {
          return ctx.reply('Pelo amor de deus amigão, você ta tentando pedir um empréstimo pra você mesmo!? Ridiculo!')
        }
        if(quantia > data.Dinheiro) {
          return ctx.reply('Esse usuário não possui essa quantia de dinheiro')
        }
        if (!data) {
            return ctx.reply('Não possui registro')
        }

        if (cooldown.has(ctx.user.id)) {
            return ctx.reply('Aguarde 24 horas para poder pedir empréstimo')
        }
        cooldown.add(ctx.user.id)
        setTimeout(() => {
            cooldown.delete(ctx.user.id)
        }, 50000)
        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setCustomId('aceitar').setLabel('✅').setStyle(ButtonStyle.Success),
            new ButtonBuilder().setCustomId('rejeitar').setLabel('❌').setStyle(ButtonStyle.Danger)
        )
        const embed = new EmbedBuilder()
            .setTitle(`Solicitação de empréstimo`)
            .setDescription(`Olá ${usuario}, ${ctx.user} te pediu um empréstimo no valor de ${quantia} você aceita?`)
        ctx.reply(`${ctx.user} Foi enviado uma solicitação de empréstimo para ${usuario}, espere até que ele aceite!`)
        return usuario.send({ embeds: [embed], components: [row] }).then((m) => {
            const collector = m.createMessageComponentCollector({ max: 1500 })
            collector.on('collect', async (i) => {
                if (!data) {
                    ctx.reply('se registre')
                } else {
                    if (i.isButton()) {
                        if (i.customId === 'aceitar') {
                            const embed2 = new EmbedBuilder().setDescription(
                                `${ctx.user}, o ${usuario} aceitou sua solicitação de empréstimo no valor de ${quantia}`
                            )
                            ctx.user.send({ embeds: [embed2] })
                            i.reply('Você aceitou a solicitação')
                            data.Dinheiro = data.Dinheiro + quantia
                            data.save()
                        } else if (i.customId === 'rejeitar') {
                            const embed3 = new EmbedBuilder().setDescription(
                                `${ctx.user} o ${usuario} rejeitou sua solicitação de empréstimo no valor de ${quantia}`
                            )
                            ctx.user.send({ embeds: [embed3] })
                        }
                    }
                }
            })
        })
    },
})
