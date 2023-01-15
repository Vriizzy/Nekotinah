const { Schema, model } = require('mongoose')

module.exports = model(
    'Likes no perfil',
    new Schema({
        PessoaQueCurtiu: String,
        PerfilCurtido: {type: Array},
        Like: { type: Number, default: 0 },
        Seguidores: { type: Number, default: 0 },
    })
)
