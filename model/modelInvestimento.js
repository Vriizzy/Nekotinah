const { Schema, model } = require('mongoose')

module.exports = model(
    'Investimentos',
    new Schema({
        UserID: String,
        Empresa: {type: String, default:'Lugar vago'},
        ValorDaEmpresa: {type: Number, default: 0},
        DinheiroInv: {type: Number, default: 0},
    })
)
