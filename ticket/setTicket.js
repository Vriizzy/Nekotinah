const {
    Command,
    CommandType,
    Argument,
    ArgumentType,
    Inhibitor: { MemberRoles },
} = require('gcommands')
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')

new Command({
    name: 'set-ticket',
    description: 'sete um ticket',
    type: [CommandType.SLASH],
    // Inhibitor: [
    //     new MemberRoles({
    //         ids: ['1062419286297161919'],
    //         message:'Você não tem permissão para utilizar esse comando',
    //         ephemeral: true
    //     }),
    // ],
    run: (ctx) => {
        const embed = new EmbedBuilder().setTitle('Sistema de ticket!').setDescription('Aperte o botão abaixo para poder abrir um ticket.')
        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setCustomId('abrir').setLabel('suporte!').setStyle(ButtonStyle.Primary)
        )
        return ctx.reply({ embeds: [embed], components: [row]})
    },
})
