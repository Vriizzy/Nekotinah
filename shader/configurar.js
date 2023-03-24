require('dotenv').config()
const {
    ChannelType,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    TextInputBuilder,
    TextInputStyle,
    ModalBuilder,
    PermissionFlagsBits,
} = require('discord.js')
const { Command, CommandType, Argument, ArgumentType } = require('gcommands')
const client = require('../index.js')
const schema = require('../model/model')
const generator = require('generate-password')
const schemaProdutos = require('../model/modelProdutos')
const mercadopago = require('mercadopago')
const fetch = require('fetch-api')
new Command({
    name: 'configurar',
    description: 'configure',
    type: [CommandType.SLASH],
    run: async (ctx) => {
        const id = generator.generate({ length: 14, numbers: false })
        mercadopago.configurations.setAccessToken(process.env.mercado_pago_key)
        var payment_data = {
            transaction_amount: 1,
            description: 'Título do produto',
            payment_method_id: 'pix',
            payer: {
                email: 'aaaa@gmail.com',
                first_name: 's',
                last_name: 's',
                identification: {
                    type: 'number',
                    number: process.env.cp,
                },
                address: {
                    zip_code: '06233200',
                    street_name: 'Av. das Nações Unidas',
                    street_number: '3003',
                    neighborhood: 'Bonfim',
                    city: 'Osasco',
                    federal_unit: 'SP',
                },
            },
        }

        let embed1
        let embed2
        let embed3
        let embed4
        let embed5
        embed5 = new EmbedBuilder()
        embed4 = new EmbedBuilder()
        embed3 = new EmbedBuilder()
        let embed_categoria
        embed_categoria = new EmbedBuilder()
        const data = await schema.findOne({ UserID: ctx.user.id })
        const data_produtos = await schemaProdutos({ QuemCriouOProduto: ctx.user.id })
        console.log(data_produtos.QuemCriouOProduto)
        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setCustomId('apelido').setLabel(' ✏️  Alterar apelido').setStyle(ButtonStyle.Secondary),
            new ButtonBuilder().setCustomId('avatar').setLabel(' 🖼️   Alterar avatar').setStyle(ButtonStyle.Secondary),
            new ButtonBuilder().setCustomId('cor').setLabel(' 🎨  Alterar cor').setStyle(ButtonStyle.Secondary),
            new ButtonBuilder().setCustomId('categoria').setLabel('  🏷️ Add categoria').setStyle(ButtonStyle.Secondary)
        )
        embed1 = new EmbedBuilder()
        embed1.setTitle('⚙️ | Painel de Configurações')
        embed1.setDescription(
            `Olá ${ctx.user} você acessou meu painel de configurações, aqui você pode mudar meu apelido, trocar a cor das embeds do seus produtos, remover o apelido, adicionar categoria e muito mais!`
        )
        embed1.addFields(
            {
                name: '1️⃣  Passo 1',
                value: 'Clique no botão "Alterar apelido" para poder alterar o apelido do bot no servidor, caso contrario será mantido o nome do bot por padrão',
            },
            {
                name: '2️⃣  Passo 2',
                value: 'Clique no botão "Alterar avatar" para poder alterar o avatar do bot, caso contrario será mantido o avatar do bot por padrão',
            },
            {
                name: ' 3️⃣  Passo 3',
                value: 'Clique no botão "cor" para poder alterar a cor das embeds da sua embed de produtos, caso esteja com duvidas de como colocar, acesse esse link e pegue o hex da cor que quiser! https://g.co/kgs/bYQAcn',
            },
            {
                name: ' 4️⃣   Passo 4',
                value: 'Clique no botão "Adicionar categoria" para poder adicionar uma categoria para seus produtos, conto com você em!',
            }
        )
        return ctx.reply({ embeds: [embed1], ephemeral: true, components: [row] }).then((msg) => {
            client.on('interactionCreate', (i) => {
                if (i.isButton()) {
                    if (i.customId === 'apelido') {
                        function apelido() {
                            const modal = new ModalBuilder().setCustomId('myModal').setTitle('Trocar apelido do bot')
                            const apelido = new TextInputBuilder().setCustomId('apelido-bot').setLabel('Apelido do bot').setStyle(TextInputStyle.Short)
                            const apelido_row = new ActionRowBuilder().addComponents(apelido)
                            modal.addComponents(apelido_row)

                            i.showModal(modal)
                        }

                        apelido()
                    }
                } else {
                    if (i.isModalSubmit()) {
                        if (i.customId === 'myModal') {
                            const apelido_nick = i.fields.getTextInputValue('apelido-bot')
                            client.user.setUsername(`${apelido_nick}`)
                            i.reply({ content: `Você modificou o nome do bot com sucesso`, ephemeral: true })
                        }
                    }
                }
            })

            client.on('interactionCreate', (i) => {
                if (i.isButton()) {
                    if (i.customId === 'avatar') {
                        function avatar() {
                            const modal = new ModalBuilder().setCustomId('myModal2').setTitle('Trocar avatar do bot')
                            const avatar = new TextInputBuilder()
                                .setCustomId('avatar-bot')
                                .setLabel('Avatar do bot')
                                .setStyle(TextInputStyle.Short)
                                .setPlaceholder('Utilize links aqui')
                                .setValue('Ex: htts://image.png')
                                .setRequired(true)
                            const avatar_row = new ActionRowBuilder().addComponents(avatar)
                            modal.addComponents(avatar_row)

                            i.showModal(modal)
                        }
                        avatar()
                    }
                } else {
                    if (i.isModalSubmit()) {
                        if (i.customId === 'myModal2') {
                            const avatar_bot = i.fields.getTextInputValue('avatar-bot')
                            client.user.setAvatar(`${avatar_bot}`)
                            i.reply({ content: `Você modificou o avatar do bot com sucesso`, ephemeral: true })
                        }
                    }
                }
            })
            client.on('interactionCreate', (i) => {
                if (i.isButton()) {
                    if (i.customId === 'cor') {
                        function cor() {
                            const modal = new ModalBuilder().setCustomId('myModal3').setTitle('Setar cores das embeds.')
                            const cor = new TextInputBuilder()
                                .setCustomId('cor-bot')
                                .setLabel('Cor das Embeds')
                                .setStyle(TextInputStyle.Short)
                                .setPlaceholder('Utilize hex color: #9999')
                                .setValue('Use isso:https://g.co/kgs/bYQAcn')
                                .setRequired(true)
                            const cor_row = new ActionRowBuilder().addComponents(cor)
                            modal.addComponents(cor_row)

                            i.showModal(modal)
                        }
                        cor()
                    }
                } else {
                    if (i.isModalSubmit()) {
                        if (i.customId === 'myModal3') {
                            const cor = i.fields.getTextInputValue('cor-bot')
                            data.Cor = cor
                            data.save()
                            i.reply({ content: `Boa, você editou a cor da embed para: ${cor}`, ephemeral: true })
                        }
                    }
                }
            })
            client.on('interactionCreate', (i) => {
                if (i.isButton()) {
                    if (i.customId === 'categoria') {
                        function categoria() {
                            const modal = new ModalBuilder().setCustomId('myModal4').setTitle('Adicione uma categoria')
                            const categoria = new TextInputBuilder()
                                .setCustomId('categoria-bot')
                                .setLabel('Adicione uma categoria')
                                .setStyle(TextInputStyle.Short)
                                .setPlaceholder('Nome da categoria')
                                .setValue('Nome da categoria')
                                .setRequired(true)
                            const categoria_row = new ActionRowBuilder().addComponents(categoria)
                            modal.addComponents(categoria_row)

                            i.showModal(modal)
                        }
                        categoria()
                    }
                } else {
                    if (i.isModalSubmit()) {
                        if (i.customId === 'myModal4') {
                            const categoria = i.fields.getTextInputValue('categoria-bot')
                            i.guild.channels
                                .create({
                                    name: categoria,
                                    type: ChannelType.GuildCategory,
                                    permissionOverwrites: [
                                        {
                                            id: '1073077483504685190',
                                            allow: [PermissionFlagsBits.ViewChannel],
                                        },
                                    ],
                                })
                                .then((categoria) => {
                                    embed4.setTitle('Maravilha! Você acabou de criar uma categoria!')
                                    embed4.setDescription('Agora, clique no botão abaixo para criar um produto!')
                                    const row = new ActionRowBuilder().addComponents(
                                        new ButtonBuilder().setCustomId('add-produto').setLabel('Add produto ').setStyle(ButtonStyle.Secondary)
                                    )
                                    i.reply({ embeds: [embed4], components: [row] }).then((msg) => {
                                        client.on('interactionCreate', (i) => {
                                            if (i.isButton()) {
                                                if (i.customId === 'add-produto') {
                                                    const modal = new ModalBuilder().setCustomId('myModal5').setTitle('Nome do produto')
                                                    const add_produto = new TextInputBuilder()
                                                        .setCustomId('nome-do-produto')
                                                        .setLabel('Nome do produto aqui')
                                                        .setStyle(TextInputStyle.Short)
                                                        .setPlaceholder('Entre com o nome do produto')
                                                        .setValue('Ex: nitro, artes, camisas e etc...')
                                                        .setRequired(true)
                                                    const produto_row = new ActionRowBuilder().addComponents(add_produto)
                                                    modal.addComponents(produto_row)

                                                    i.showModal(modal)
                                                }
                                            } else {
                                                if (i.isModalSubmit()) {
                                                    if (i.customId === 'myModal5') {
                                                        const nome_do_produto = i.fields.getTextInputValue('nome-do-produto')
                                                        const aspas = '```'
                                                        schemaProdutos.create({
                                                            NomeDoProduto: nome_do_produto,
                                                            IdProduto: id,
                                                            PreçoDoProduto: '0.00',
                                                            QuemCriouOProduto: i.user.id,
                                                            EstoqueDoProduto: '0',
                                                            DescriçaoDoProduto: 'Sem descrição',
                                                        })

                                                        i.guild.channels
                                                            .create({
                                                                name: nome_do_produto,
                                                                type: ChannelType.GuildText,
                                                                parent: categoria.id,
                                                            })
                                                            .then((canal) => {
                                                                const row2 = new ActionRowBuilder().addComponents(
                                                                    new ButtonBuilder()
                                                                        .setCustomId('configurar2')
                                                                        .setLabel(' configurar')
                                                                        .setStyle(ButtonStyle.Secondary),

                                                                    new ButtonBuilder()
                                                                        .setCustomId('comprar-produto')
                                                                        .setLabel('comprar')
                                                                        .setStyle(ButtonStyle.Secondary)
                                                                )
                                                                schemaProdutos.findOne({ QuemCriouOProduto: i.user.id }, (error, data) => {
                                                                    console.log(data.EstoqueDoProduto)
                                                                    embed5.setTitle(`${nome_do_produto}`)
                                                                    embed5.setDescription(`${aspas} Sem descrição ${aspas}`)
                                                                    embed5.addFields(
                                                                        { name: '💳| Preço', value: `${data.PreçoDoProduto}` + 'R$' },
                                                                        { name: '🛒 | Estoque', value: `${data.EstoqueDoProduto}` }
                                                                    )
                                                                    canal.send({ embeds: [embed5], components: [row2] }).then((msg) => {
                                                                        //interação para comprar produto
                                                                        client.on('interactionCreate', (i) => {
                                                                            if (i.customId === 'comprar-produto') {
                                                                                mercadopago.payment.create(payment_data).then(function (data) {
                                                                                    fetch(
                                                                                        `https://api.mercadolibre.com/collections/notifications/${data.body.id}`,
                                                                                        {
                                                                                            headers: {
                                                                                                'Authorization': `Bearer ${process.env.mercado_pago_key}`,
                                                                                            },
                                                                                        }
                                                                                    )
                                                                                        .then((response) => response.json())
                                                                                        .then((doc) => {
                                                                                            i.guild.channels
                                                                                                .create({
                                                                                                    name: `${i.user.username}-compra`,
                                                                                                    type: ChannelType.GuildText,
                                                                                                    permissionOverwrites: [
                                                                                                        {
                                                                                                            id: i.user.id,
                                                                                                            allow: [PermissionFlagsBits.ViewChannel],
                                                                                                        },
                                                                                                    ],
                                                                                                })
                                                                                                .then((compra) => {
                                                                                                    const buffer = Buffer.from(
                                                                                                        data.body.point_of_interaction.transaction_data
                                                                                                            .qr_code_base64,
                                                                                                        'base64'
                                                                                                    )
                                                                                                    const attachment = new Discord.MessageAttachment(
                                                                                                        buffer,
                                                                                                        'payment.png'
                                                                                                    )
                                                                                                  
                                                                                                        const embed = new Discord.MessageEmbed()
                                                                                                            .setTitle(
                                                                                                                `${config.nomebot} | Sistema de pagamento`
                                                                                                            )
                                                                                                            .setDescription(
                                                                                                                `<a:992152024110088326:995211047646527530> - Efetue o pagamento de \`${eprod.nome}\` escaneando o QR Code abaixo.\n\n> Caso prefira efetuar o pagamento copiando e colando o código em seu aplicativo do banco, clique no botão “<:cdigodebarras:995211032534470666>”, o bot irá enviar nesse chat o código do seu pagamento.`
                                                                                                            )
                                                                                                            .setImage('attachment://payment.png')
                                                                                                            .setColor(config.cor)
                                                                                                            .setFooter(
                                                                                                                'Após efetuar o pagamento, o tempo de entrega é de no maximo 1 minuto!'
                                                                                                            )
                                                                                                        return compra.send({ embeds: { embed }, files: [attachment]})
                                                                                                    
                                                                                                })
                                                                                        })
                                                                                })
                                                                            }
                                                                        })
                                                                        client.on('interactionCreate', (i) => {
                                                                            const row3 = new ActionRowBuilder().addComponents(
                                                                                new ButtonBuilder()
                                                                                    .setCustomId('titulo-embed')
                                                                                    .setLabel(' titulo da embed')
                                                                                    .setStyle(ButtonStyle.Secondary),
                                                                                new ButtonBuilder()
                                                                                    .setCustomId('descrição-embed')
                                                                                    .setLabel('descrição da embed')
                                                                                    .setStyle(ButtonStyle.Secondary)
                                                                            )
                                                                            if (i.customId === 'configurar2') {
                                                                                msg.edit({ components: [row3] })
                                                                            }
                                                                            if (i.customId === 'titulo-embed') {
                                                                                const modal = new ModalBuilder()
                                                                                    .setCustomId('myModal5')
                                                                                    .setTitle('Titulo do produto')
                                                                                const add_produto = new TextInputBuilder()
                                                                                    .setCustomId('titulo-do-produto')
                                                                                    .setLabel('Titulo embed')
                                                                                    .setStyle(TextInputStyle.Short)
                                                                                    .setPlaceholder('Entre com o titulo da embed')
                                                                                    .setValue('ex: nitro e etc...')
                                                                                    .setRequired(true)
                                                                                const produto_row = new ActionRowBuilder().addComponents(add_produto)
                                                                                modal.addComponents(produto_row)

                                                                                i.showModal(modal)
                                                                                if (i.isModalSubmit()) {
                                                                                    if (i.customId === 'myModal5') {
                                                                                        const nome_do_produto =
                                                                                            i.fields.getTextInputValue('titulo-da-produto')

                                                                                        data.NomeDoProduto = embed5.setTitle()
                                                                                    }
                                                                                }
                                                                            }
                                                                        })
                                                                    })
                                                                })
                                                            })
                                                    }
                                                }
                                            }
                                        })
                                    })
                                })
                        }
                    }
                }
            })
        })
    },
})

//    if (i.isModalSubmit()) {
//        if (i.customId === 'myModal5') {
//            const nome_do_produto = i.fields.getTextInputValue('produto-bot')
//            const aspas = '```'
//            i.guild.channels
//                .create({
//                    name: nome_do_produto,
//                    type: ChannelType.GuildText,
//                    parent: category.id,
//                })
//                .then((canal) => {
//                    console.log(`Foi criado ${canal.name}`)
//                    let embed3

//                    const row22 = new ActionRowBuilder().addComponents(
//                        new ButtonBuilder().setCustomId('nome-produto').setLabel('Nome').setStyle(ButtonStyle.Secondary),
//                        new ButtonBuilder().setCustomId('descrição').setLabel(' descrição').setStyle(ButtonStyle.Secondary),
//                        new ButtonBuilder().setCustomId('preço-prod').setLabel(' preço').setStyle(ButtonStyle.Secondary),
//                        new ButtonBuilder().setCustomId('Banner').setLabel('  Banner').setStyle(ButtonStyle.Secondary),
//                        new ButtonBuilder().setCustomId('Add-estq').setLabel('  add-estoque').setStyle(ButtonStyle.Secondary),
//                        new ButtonBuilder().setCustomId('limp-estq').setLabel('  limpar-estoque').setStyle(ButtonStyle.Secondary)
//                    )
//                    embed3 = new EmbedBuilder()
//                    embed3.setTitle(`${nome_do_produto}`)
//                    embed3.setDescription(`${aspas}Sem descrição${aspas}`)
//                    embed3.setColor(data.Cor)
//                    embed3.setImage(`${client.user.displayAvatarURL()}`)
//                    embed3.setThumbnail(`${client.user.displayAvatarURL()}`)
//                    embed3.addFields({ name: '💳 | Preço', value: '0' }, { name: '🛒| Estoque', value: '0' })
//                    canal.send({ embeds: [embed3], components: [row22] })
//                })
//        }
//    }
