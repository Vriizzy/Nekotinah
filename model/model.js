const {Schema, model} = require('mongoose')

module.exports = model( 
  'Registrados', 
  new Schema({ 
    UserID: String,
    Nickname: String,
    IdRegister: String,
    Bio: String,
    Banner: String, 
    Like: {default: 0, type: Array},
    Dinheiro: {default: 0, type: Number},
    ClasseRpg: String
  })
)
