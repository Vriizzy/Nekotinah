const { Command, CommandType, AutoDeferType, Argument, ArgumentType } = require('gcommands')
const schema = require('../model/model')
const schema2 = require('../model/modelInvestimento')
new Command({
    name: 'ganhar-dinheiro',
    description: 'invista/crieUmaEmpresa',
    type: [CommandType.SLASH],
    autoDefer: AutoDeferType.NORMAL,
    arguments: [
        new Argument({
            name: 'investir',
            description: 'Invista e ganhe dinheiro',
            type: ArgumentType.SUB_COMMAND,
            arguments: [
                new Argument({
                    name: 'quantia',
                    description: 'Quantia que deseja investir',
                    type: ArgumentType.NUMBER,
                    required: true,
                }),
            ],
        }),
        new Argument({
            name: 'criar-empresa',
            description: 'crie uma empresa',
            type: ArgumentType.SUB_COMMAND,
            arguments: [
                new Argument({
                    name: 'nome-da-empresa',
                    description: 'Selecione o nome da empresa',
                    type: ArgumentType.STRING,
                    required: true,
                }),
            ],
        }),
    ],
    run: async (ctx) => {
        const sub = ctx.arguments.getSubcommand()
        const nomeDaEmpresa = ctx.arguments.getString('nome-da-empresa')
        schema.findOne({ UserID: ctx.user.id }, (error, data) => {
            if (!data) {
                return ctx.reply('não possui registro.')
            } else {
                if (sub === 'investir') {
                    schema2.findOne({ UserID: ctx.user.id }, async (error, data) => {
                        if (!data) {
                            return ctx.reply('Você não possui uma empresa, crie uma usando /ganhar-dinheiro criar-empresa')
                        } else {
                             schema2.find({}, async(error, data) => {
                                console.log(data[3].Nickname)
                            }).exec
                        }
                    })
                } else {
                    if (sub === 'criar-empresa') {
                        schema2.findOne({ UserID: ctx.user.id }, (error, data) => {
                            if (data) {
                                return ctx.reply('Você já possui uma empresa')
                            } else {
                                schema2.create({ UserID: ctx.user.id, Empresa: nomeDaEmpresa }, (error, data) => {
                                    return ctx.reply('Foi criado com sucesso!')
                                })
                            }
                        })
                    }
                }
            }
        })
    },
})
