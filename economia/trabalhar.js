const cooldown = new Set()
const { Command, CommandType, Argument, ArgumentType } = require('gcommands')
const { EmbedBuilder } = require('discord.js')
const schema = require('../model/model')
new Command({
    name: 'trabalhar',
    description: 'Trabalhe para ganhar dinheiro e poder investir!',
    type: [CommandType.SLASH],
    run: async (ctx) => {
        const profissoes = ['astronauta', 'advogado', 'programador', 'lixeiro', 'gamer', 'policial', 'governador', 'deputadoFederal', 'deputadoEstadual']
        const profAleatorias = profissoes[Math.floor(Math.random() * profissoes.length)]
        const valorAleatorio = Math.floor(Math.random() * 1000000)
        schema.findOne({ UserID: ctx.user.id }, (error, data) => {
           if (cooldown.has(ctx.user.id)) {
               return ctx.reply(`Você precisa aguardar \`5 minutos\` para poder executar novamente o comando`)
           }
           cooldown.add(ctx.user.id)
           setTimeout(() => {
               cooldown.delete(ctx.user.id)
           }, 300000)
            if (!data) {
                return ctx.reply('Você não está registrado! Registre-se!')
            } else {
                const embed = new EmbedBuilder().setDescription(`✨  > Você trabalhou de **${profAleatorias}** e ganhou **${valorAleatorio}**R$`)
                data.Dinheiro = valorAleatorio + data.Dinheiro
                data.save();
                return ctx.reply({embeds: [embed]})
            }   
        })
    },
})
 