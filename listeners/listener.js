const { Listener } = require('gcommands')
const moment = require('moment')
const colors = require('colors')

new Listener({
    name: 'listener',
    event: 'ready',
    run: (client) => {
        const timeT = moment().format('LTS').replace('PM', '').trim()
        return console.log(`[${timeT}/TIME] Estou online!`.underline.red)
    },
})
