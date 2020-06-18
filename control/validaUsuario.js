let verificaUsuario = function validaCampo(dados){

    let erros = []
    
    if(!dados.nome || typeof dados.nome == undefined || dados.nome == null){
        erros.push({texto: "Nome inválido"})
    }

    if(!dados.email || typeof dados.email == undefined || dados.email == null){
        erros.push({texto: "Email inválido"})
    }

    if(!dados.senha || typeof dados.senha == undefined || dados.senha == null){
        erros.push({texto: "Senha inválida"})
    }

    if(dados.senha.length < 4){
        erros.push({texto: "Senha muito curta"})
    }

    if(dados.senha != dados.senha2){
        erros.push({texto: "As senhas são diferentes, tente novamente!"}) 
    }


    return erros
}

module.exports = verificaUsuario;