const { Command, CommandType, Argument, ArgumentType } = require('gcommands')
const { EmbedBuilder } = require('discord.js')

new Command({
    name: 'lojinha',
    description: 'Lojinha, onde você pode adquirir coisas dentro do server',
    type: [CommandType.SLASH],
    run: async (ctx) => {
      const embed = new EmbedBuilder()
      .setTitle(' 🌈  | Lojinha')
      .setDescription('Cargo: 30000k R$\n**OBS: PARA PODER COMPRAR, TRANSFIRA 30000K PARA UM SUPERIOR**')
      .setColor('#f14dfa')
      return ctx.reply({embeds: [embed]})
    }
})
