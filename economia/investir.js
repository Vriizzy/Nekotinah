const cooldown = new Set()
const { Command, CommandType, Argument, ArgumentType } = require('gcommands')
const { EmbedBuilder } = require('discord.js')
const schema = require('../model/modelInvestimento')
const schema2 = require('../model/model')
const moment = require('moment')
new Command({
    name: 'investir',
    description: 'Invista e consiga um retorno',
    type: [CommandType.SLASH],
    arguments: [
        new Argument({
            name: 'dinheiro',
            description: 'Insira a quantia',
            type: ArgumentType.NUMBER,
            required: true,
        }),
    ],
    run: (ctx) => {
        const valorinv = ctx.arguments.getNumber('dinheiro')
        schema2.findOne({ UserID: ctx.user.id }, (error, data) => {
            const dobra = Math.ceil(valorinv * 2) || 'DOBRADO'
            const triplo = Math.ceil(valorinv * 3) || 'TRIPLICADO'
            const quadriplo = Math.ceil(valorinv * 4) || 'QUADRIPLICADO'
            const array = [dobra, triplo, quadriplo]
            const randomQuantia = array[Math.floor(Math.random() * array.length)]
            const valor = randomQuantia
            //----------------//
            //----------------//
            const valorAleatorio = Math.floor(Math.random() * `${valorinv}`)
            const perdeuinv = valorAleatorio
            const arrayInv = [valor, perdeuinv]
            const random = arrayInv[Math.floor(Math.random() * arrayInv.length)]
            const aleatorio = Math.floor(Math.random(86400000))
            const m = moment().format('LTS').replace('AM', '').trim()
            if (cooldown.has(ctx.user.id)) {
                return ctx.reply(`Você precisa aguardar \`1 minuto\` para poder executar novamente o comando`)
            }
            cooldown.add(ctx.user.id)
            setTimeout(() => {
                cooldown.delete(ctx.user.id)
            }, 30000)
            if (!data) {
                return ctx.reply('Você não está registrado! Registre-se!')
            } else {
                if (valorinv > data.Dinheiro) {
                    return ctx.reply('Você não pode investir um dinheiro que você não tem!')
                }
                if (random === arrayInv[0]) {
                    data.Dinheiro = data.Dinheiro + valor
                    data.save()
                    setTimeout(() => {
                        const embed4 = new EmbedBuilder()
                            .setDescription(
                                `🖋️  > **Investidor:** ${ctx.user}\n🔐  > **Parece que seus investimentos foram bons e renderam ${valor}R$**\n🗂️  > **Atualmente em sua carteira: ${data.Dinheiro}**\n⏰ > **Tempo que levou: xxx**`
                            )
                            .setThumbnail('https://imgur.com/HMIby5W.png')
                        ctx.editReply({ embeds: [embed4], content: `${ctx.user}` })
                    }, 10000)
                } else {
                    if (random === arrayInv[1]) {
                        data.Dinheiro = data.Dinheiro - perdeuinv
                        data.DinheiroInv = 0
                        data.save()
                        setTimeout(() => {
                            const embed4 = new EmbedBuilder()
                                .setDescription(
                                    `🖋️  > **Investidor(a):** ${ctx.user}\n🔐  > **Parece que você perdeu ${perdeuinv}R$**\n⏱️  > **Tempo que levou: xxx**\n🗂️  > **Atualmente em sua carteira: ${data.Dinheiro}**`
                                )
                                .setColor('Random')
                                .setThumbnail('https://imgur.com/tpK4pWz.png')
                            ctx.editReply({ embeds: [embed4], content: `${ctx.user}` })
                        }, 10000)
                    }
                }

                schema.findOne({ UserID: ctx.user.id }, (error, data) => {
                    if (data) {
                        const dinInvSoma = (data.DinheiroInv = data.DinheiroInv + valorinv)
                        const embed2 = new EmbedBuilder()
                            .setDescription(
                                `🖋️ > **Olá investidor(a) ${ctx.user}, o sistema de investimento não é tão rapido quanto parece, você tem que esperar um prazo para poder ter a chance de ganhar ou perder com seus investimentos**\n👔  > Investidor: ${ctx.user}\n⏰  > Data da aplicação: **${m}**\n 🏷️  > Quantidade aplicada: ${valorinv}\n📮  > Quantidade na carteira de investimentos: ${data.DinheiroInv}`
                            )
                            .setColor('Random')
                            .setThumbnail('https://imgur.com/4xvUeHk.png')
                        data.DinheiroInv = data.DinheiroInv - valorinv
                        data.Dinheiro = (data.Dinheiro - valorinv)
                        data.save()
                        ctx.reply({ embeds: [embed2] })
                    } else {
                        schema.create({ UserID: ctx.user.id, DinheiroInv: valorinv }, (error, data) => {
                            const embed = new EmbedBuilder().setDescription(
                                `🖋️ > **Olá investidor(a) ${ctx.user}, o sistema de investimento não é tão rapido quanto parece, você tem que esperar um prazo para poder ter a chance de ganhar ou perder com seus investimentos**\n👔  > Investidor: ${ctx.user}\n⏰  > Data da aplicação: **${m}**\n 🏷️  > Quantidade aplicada: ${valorinv}\n📮  > Quantidade na carteira de investimentos: ${data.DinheiroInv}`
                            )
                            return ctx.reply({ embeds: [embed] })
                        })
                    }
                })
            }
        })
    },
})
