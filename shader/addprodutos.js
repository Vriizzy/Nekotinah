const { EmbedBuilder, ActionRowBuilder, ButtonStyle, ButtonBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js')
const { Command, CommandType, ArgumentType, Argument } = require('gcommands')
const client = require('../index')
new Command({
    name: 'addprodutos',
    description: 'add-produtos',
    type: [CommandType.SLASH],
    arguments: [
        new Argument({
            name: 'canal',
            description: 'coloque o canal',
            type: ArgumentType.CHANNEL,
            required: true,
        }),
    ],
    run: async (ctx) => {
        let embed1
        let embed2
        let cargo
        let row
        let row2
        let modal
        let modal2
        embed2 = new EmbedBuilder()
        modal = new ModalBuilder().setCustomId('myModal').setTitle('My Modal')
        modal2 = new ModalBuilder().setCustomId('myModal2').setTitle('My Modal2')
        row = new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId('configurar').setLabel('⚙️ ').setStyle(ButtonStyle.Danger))
        row2 = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setCustomId('titulo-embed').setLabel('titulo-embed ').setStyle(ButtonStyle.Danger),
            new ButtonBuilder().setCustomId('description-embed').setLabel('description-embed').setStyle(ButtonStyle.Danger)
        )  
       async function descrição() { 
                 const a = new TextInputBuilder()
                                .setCustomId('a')
                                // The label is the prompt the user sees for this input
                                .setLabel('Descrição da embed')
                                // Short means only a single line of text
                                .setStyle(TextInputStyle.Short)

                            const aa = new ActionRowBuilder().addComponents(a)

                            // Add inputs to the modal
                            modal.addComponents(aa)

                            // Show the modal to the user
                            await i.showModal(modal)
        }

        embed1 = new EmbedBuilder()
        async function addProdutos() {
            embed1.setTitle('o que você quiser aqui')
            embed1.setDescription('AAAA')
            return ctx.reply({ embeds: [embed1], components: [row] }).then((msg) => {
                client.on('interactionCreate', (i) => {
                    if (i.isButton()) {
                        if (i.customId === 'configurar') {
                            if (!i.user.id === i.member.roles.cache.has('1073077483504685190')) {
                                i.reply({ ephemeral: true, content: 'Você não possui permissão para isso.' })
                            } else {
                                return ctx.editReply({ embeds: [embed1], components: [row2], content: 'Você tem acesso' })
                            }
                        }
                    }
                })
                client.on('interactionCreate', async (i) => {
                    if (i.isButton()) {
                        if (i.customId === 'titulo-embed') {
                            const favoriteColorInput = new TextInputBuilder()
                                .setCustomId('favoriteColorInput')
                                // The label is the prompt the user sees for this input
                                .setLabel('Titulo da embed')
                                // Short means only a single line of text
                                .setStyle(TextInputStyle.Short)

                            // An action row only holds one text input,
                            // so you need one action row per text input.
                            const firstActionRow = new ActionRowBuilder().addComponents(favoriteColorInput)

                            // Add inputs to the modal
                            modal.addComponents(firstActionRow)

                            // Show the modal to the user
                            await i.showModal(modal)
                        }
                    }
                })
                client.on('interactionCreate', async (i) => {
                    if (i.isButton()) {
                        if (i.customId === 'description-embed') {
                                await descrição();
                           
                        }
                    }
                })
                client.on('interactionCreate', async (i) => { 
                    if(i.isModalSubmit()) { 
                        if(i.customId === "titulo-embed") { 

                                    const aaa = descrição.a
                                    const a = interaction.fields.getTextInputValue('')

                                    embed2.setDescription(`${a}`)
                                    embed1.editReply({ embeds: [embed2] })
                                
                            
                        }
                    }
                })
            })
        }
        await addProdutos()
    },
})
