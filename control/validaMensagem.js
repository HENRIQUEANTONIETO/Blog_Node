let verificaMensagem = function validaCampo(dados){

    let erros = []
    
    if(!dados.nome || typeof dados.nome == undefined || dados.nome == null){
        erros.push({texto: "Nome inválido"})
    }

    if(!dados.email || typeof dados.email == undefined || dados.email == null){
        erros.push({texto: "Email inválido"})
    }

    if(!dados.txtMensagem || typeof dados.txtMensagem == undefined || dados.txtMensagem == null){
        erros.push({texto: "Mensagem inválida"})
    }

    if(dados.txtMensagem.length < 5){
        erros.push({texto: "Mensagem muito curta"})
    }


    return erros
}

module.exports = verificaMensagem;
