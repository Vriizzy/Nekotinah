const { Schema, model } = require('mongoose')

module.exports = model(
    'Model de produtos',
    new Schema({
        IdProduto: { type: String },
        QuemCriouOProduto: { type: String },
        NomeDoProduto: { type: String },
        DescriçaoDoProduto: { type: String },
        PreçoDoProduto: { type: Number },
        EstoqueDoProduto: { type: Number },
    })
)
