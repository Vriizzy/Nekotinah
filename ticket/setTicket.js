const { Command, CommandType, Argument, ArgumentType } = require('gcommands')
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')
const OwnerOnlyExecute = require('../inhibitors/ownerOnly')
new Command({
    name: 'set-ticket',
    description: 'sete um ticket',
    type: [CommandType.SLASH],
    inhibitors: [ 
        new OwnerOnlyExecute()
    ],
    run: (ctx) => {
        const embed = new EmbedBuilder().setTitle('Sistema de ticket!').setDescription('Aperte o botão abaixo para poder abrir um ticket.')
        const row = new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId('abrir').setLabel('suporte!').setStyle(ButtonStyle.Primary))
        return ctx.reply({ embeds: [embed], components: [row] })
    },
})
