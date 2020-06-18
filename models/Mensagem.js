const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Mensagem = new Schema({
    nome: {
        type: String,
        required: true
    },
    
     email: {
        type: String,
        required: true
    },
    
    data: {
        type: Date,
        default: Date.now() 
    },

    tel: {
        type: String,
    },

    txtMensagem: {
        type: String,
        required: true
    }
})

mongoose.model('mensagens', Mensagem)