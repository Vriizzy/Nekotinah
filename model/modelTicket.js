const { Schema, model } = require('mongoose')

module.exports = model(
    'tickets',
    new Schema({
        UserID: String,
        TicketName: String,
    })
)
