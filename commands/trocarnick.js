const {Command, CommandType, Argument, ArgumentType} = require('gcommands')
const { EmbedBuilder, Events, ActionRowBuilder, ButtonStyle, ButtonBuilder, ComponentType } = require('discord.js')
const schema = require('../model/model')
new Command({ 
  name:'trocar-nick', 
  description:'troque de nick usando esse comando.',
  type: [CommandType.SLASH],
  arguments: [ 
    new Argument({ 
      name:'nickname',
      description:'Quase lá...',
      type: ArgumentType.STRING,
      required: true
    })
  ],
   run: async(ctx) => { 
        async function trocarNick(nickname) {
           
            const data = await schema.findOne({UserID: ctx.user.id})
              if(!data) {return ctx.reply('Como você quer mudar de nick e nem está registrado? Se foder arrombado')}
              nickname = ctx.arguments.getString('nickname')
              ctx.reply('modificado com sucesso')
              data.Nickname = nickname
              data.save()
        }

        await trocarNick();
   }
})