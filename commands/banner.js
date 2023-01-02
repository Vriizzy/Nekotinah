const { Command, CommandType, Argument, ArgumentType } = require('gcommands')
const schema = require('../model/model.js')
new Command({
    name: 'banner',
    description: 'Deixe seu perfil mais bonito com um banner!',
    type: [CommandType.SLASH],
    arguments: [
        new Argument({
            name: 'banner',
            description: 'Drope um arquivo aqui!',
            type: ArgumentType.ATTACHMENT,
            required: true,
        }),
    ],
    run: async (ctx) => {
        const banner = ctx.arguments.getAttachment('banner')?.url
              const data = await schema.findOne({ UserID: ctx.user.id})
              data.Banner = banner
              data.save();
              return ctx.reply('aaa')

    },
})
