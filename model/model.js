const {Schema, model} = require('mongoose')

module.exports = model( 
  'Registrados', 
  new Schema({ 
    UserID: String,
    Nickname: String,
    IdRegister: String,
    Bio: String,
    Banner: String, 
    Like: {type:Number, default:0},
    PessoaQueCurtiu: {default: 'None', type:Array},
    Dinheiro: {default: 0, type: Number},
    Cor: {default:'#000000', type: String},
    Categoria: {default: 'Nenhum',  type: String}
    
  })
)
