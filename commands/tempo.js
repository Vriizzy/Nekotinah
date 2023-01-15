const { Command, CommandType, Argument, ArgumentType } = require('gcommands')
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle} = require('discord.js')
require('dotenv').config()
new Command({
    name: 'tempo',
    description: 'Utilize esse comando para ver o tempo',
    type: [CommandType.SLASH],
    arguments: [
        new Argument({
            name: 'regiao',
            description: 'estados e paises e etc...',
            type: ArgumentType.STRING,
            required: true,
        }),
    ],
    run: async (ctx) => {
        const api_key = process.env.weather_api
        const input = ctx.arguments.getString('regiao')
        const consulta = fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input}&lang=pt_br&units=metric&appid=${api_key}`)
            .then((response) => response.json())
            .then((tempo) => {
                const clima = `${tempo.weather[0].description}`
                if (tempo?.cod && tempo.cod === '404') {
                    return ctx.reply('Local não encontrado!')
                }
                 const row = new ActionRowBuilder().addComponents(
                     new ButtonBuilder().setCustomId('F').setLabel('🌡️Fahrenheit').setStyle(ButtonStyle.Danger)
                 )
                const bandeira = tempo.sys.country.toLowerCase()
                const temperatura = `${Math.floor(tempo.main.temp)}`;
                const temperaturaMinima = `${Math.floor(tempo.main.temp_min)}`
                const temperaturaMaxima = `${Math.floor(tempo.main.temp_max)}`
                const imagem = `http://openweathermap.org/img/wn/${tempo.weather[0].icon}@2x.png`
                const embed = new EmbedBuilder()
                    .setDescription(`**:flag_${bandeira}: tempo em ${input}**`)
                    .setColor('Random')
                    .addFields(
                        {
                            name: '☁️> Temperatura atual',
                            value: `${temperatura}°C\n**Minima de hoje**\n${temperaturaMinima}°C\n**Maxima de hoje**\n${temperaturaMaxima}°C\n`,
                        },
                        {
                            name: '💨> Vento',
                            value: `${tempo.wind.speed} km/h`,
                        },
                        {
                            name: '💧> Umidade',
                            value: `${tempo.main.humidity}%`,
                        },
                        {
                            name: '🌫️> Clima',
                            value: `${clima}`,
                        },
                        {
                            name: 'Nuvens no céu',
                            value: `${tempo.clouds.all}`,
                        }
                    )

                    .setThumbnail(imagem)
                
                return ctx.reply({ embeds: [embed], components: [row]})
            })
    },
})
