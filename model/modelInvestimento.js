const { Schema, model } = require('mongoose')

module.exports = model(
    'Investimentos',
    new Schema({
        UserID: String,
        DinheiroInv: {type: Number, default: 0},
        
    })
)
