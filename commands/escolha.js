const { CommandType, ArgumentType, Command, Argument } = require('gcommands')
const { EmbedBuilder, Events, ActionRowBuilder, ButtonStyle, ButtonBuilder, ComponentType } = require('discord.js')

new Command({
    name: 'choose',
    description: 'Está indeciso? Deixa que eu escolho!',
    type: [CommandType.SLASH],
    arguments: [
        new Argument({
            name: 'coisa1',
            description: 'primeira coisa a ser escolhida',
            type: ArgumentType.STRING,
            required: true,
        }),
        new Argument({
            name: 'coisa2',
            description: 'segunda coisa a ser escolhida',
            type: ArgumentType.STRING,
            required: true,
        }),
    ],
    run: async(ctx) => { 
      const coisa1 = ctx.arguments.getString ('coisa1')
      const coisa2 = ctx.arguments.getString('coisa2')
      const aleatorio = [coisa1, coisa2]
      const escolher = aleatorio[Math.floor(Math.random() * aleatorio.length)]
      return ctx.reply(`Eu escolho ${escolher}`)
    }
})
