const { Command, CommandType, ArgumentType, Argument } = require('gcommands')
const { EmbedBuilder } = require('discord.js')
const schema = require('../model/modelInvestimento')
const usuario = require('../model/model')

new Command({
    name: 'listar-empresas',
    description: 'Liste as empresas para poder investir',
    type: [CommandType.SLASH],
    run: async (ctx) => {
        async function listarEmpresas() {
            schema.find({}, (err, data) => {
                for (let listar of data) {
                     
                    const embed = new EmbedBuilder().setTitle('Aqui está a lista de empresas que você pode investir!').setDescription(listar.Empresa)
                     ctx.reply({ embeds: [embed] })
                       
                }
            })
        }
        await listarEmpresas()
    },
})
