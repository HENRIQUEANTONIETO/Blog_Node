let verificaPostagens = function validaCampo(dados){

    let erros = []
    
    if(!dados.titulo || typeof dados.titulo == undefined || dados.titulo == null){
        erros.push({texto: "Titulo inválido"})
    }

    if(!dados.slug || typeof dados.slug == undefined || dados.slug == null){
        erros.push({texto: "Slug inválido"})
    }

    if(!dados.descricao || typeof dados.descricao == undefined || dados.descricao == null){
        erros.push({texto: "Descricão inválida"})
    }

    if(!dados.conteudo || typeof dados.conteudo == undefined || dados.conteudo == null){
        erros.push({texto: "Conteúdo inválido"})
    }

    if(!dados.categoria || typeof dados.categoria == undefined || dados.categoria == null || dados.categoria == "0"){
        erros.push({texto: "Categoria inválida, registre uma categoria"})
    }
    return erros
}

module.exports = verificaPostagens;