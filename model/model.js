const {Schema, model} = require('mongoose')

module.exports = model( 
  'Registrados', 
  new Schema({ 
    UserID: String,
    Nickname: String,
    IdRegister: String,
    Bio: String,
    Banner: String, 
    Dinheiro: {default: 0, type: Number}
  })
)
