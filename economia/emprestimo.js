const { Command, CommandType, Argument, ArgumentType } = require('gcommands')
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')
const schema = require('../model/modelInvestimento')
const schema2 = require('../model/model')
new Command({
    name: 'emprestimo',
    description: 'Solicite um emprestimo a um usuário',
    type: [CommandType.SLASH],
    arguments: [
        new Argument({
            name: 'usuario',
            description: 'Selecione um usuário que deseja emprestimo',
            type: ArgumentType.USER,
            required: true,
        }),
        new Argument({
            name: 'quantia',
            description: 'Selecione um usuário que deseja emprestimo',
            type: ArgumentType.NUMBER,
            required: true,
        }),
    ],
    run: async (ctx, message, interaction, channel, client) => {
        const user = ctx.arguments.getUser('usuario')
        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setCustomId('aceito').setLabel('Aceito').setStyle(ButtonStyle.Success),
            new ButtonBuilder().setCustomId('negar').setLabel('Nego').setStyle(ButtonStyle.Danger)
        )
             
        const data = await schema2.findOne({ UserID: ctx.user.id })
        const data2 = await schema.findOne({ UserID: ctx.user.id })
        if (!data) {
            return ctx.reply('Você não possui registro, register-se usando /register')
        } else {
            const embed = new EmbedBuilder()
                .setTitle(`Solicitação de emprestimo`)
                .setDescription(`Olá, ${usuario} o usuario ${ctx.user} está pedindo um empréstimo no valor de ${quantia}, você aceita emprestar ?`)
            ctx.reply(`Foi enviado ao privado do ${usuario} a solicitação de empréstimo, caso aceite, terá uma mensagem em seu privado`)
            usuario.send({ embeds: [embed], components: [row] })
        }
        
    },

})
