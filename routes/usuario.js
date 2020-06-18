const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
require('../models/Usuario')
const Usuario = mongoose.model('usuarios')
const validaUsuario = require('../control/validaUsuario')
const bcrypt = require('bcryptjs')
const passport = require('passport')

require('../models/Mensagem')
const Mensagem = mongoose.model('mensagens')
const validaMensagem = require('../control/validaMensagem.js')

router.get('/registro', (req,res) =>{
    res.render('usuarios/registro')
})

router.post('/registro', (req, res) =>{
    let erros = validaUsuario(req.body)
    if(erros.length > 0){
        res.render('usuarios/registro', {erros: erros})
    }
    else{
        Usuario.findOne({email: req.body.email}).then((usuario) =>{
            if(usuario){
                req.flash('error_msg', 'Já existe uma conta com este e-mail')
                res.redirect('/usuarios/registro')
            }
            else{

                const novoUsuario = new Usuario({
                    nome: req.body.nome,
                    email: req.body.email,
                    senha: req.body.senha,
                })

                bcrypt.genSalt(10, (erro, salt) =>{
                    bcrypt.hash(novoUsuario.senha, salt, (erro, hash) =>{
                        if(erro){
                            req.flash('error_msg', 'Houve um erro ao salvar o usuário')
                            res.redirect('/')
                        }
                        else{
                            novoUsuario.senha = hash

                            novoUsuario.save().then(()=>{
                                req.flash('success_msg', 'Usuário criado com sucesso!')
                                res.redirect('/usuarios/login')
                            }).catch((err)=>{
                                req.flash('error_msg', 'Houve um erro ao criar o usuário, tente novamente!')
                                res.redirect('/usuarios/registro')
                            })
                        }
                        
                    })
                })

            }
        }).catch((err) =>{
            req.flash('error_msg', 'Houve um erro interno!')
            res.redirect('/')
        })
    }
})

router.get('/login',(req, res) =>{
    res.render('usuarios/login')
})

router.post('/login', (req, res, next) =>{
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/usuarios/login',
        failureFlash: true
    })(req, res, next)

})

router.get('/logout', (req, res) => {
    req.logout()
    req.flash('success_msg', 'Deslogado com sucesso!')
    res.redirect('/usuarios/login')
})

router.get('/contato', (req, res) =>{
    res.render('usuarios/contato')
})

router.get('/sobre', (req, res) =>{
    res.render('usuarios/sobre')
})

router.post('/mensagens/nova', (req, res) =>{
    var erros = validaMensagem(req.body)

    if(erros.length > 0){
        res.render("usuarios/contato", {erros: erros})
    }
    else{
        const novaMensagem = {
            nome: req.body.nome,
            email: req.body.email,
            tel: req.body.tel,
            txtMensagem: req.body.txtMensagem
        }
    
        new Mensagem(novaMensagem).save().then(()=>{
            req.flash('success_msg', 'Mensagem enviada com sucesso!')
            res.redirect('/usuarios/contato')
        }).catch((err) =>{
            req.flash('error_msg', 'Erro ao enviar a mensagem, tente novamente!')
            res.redirect('/usuarios')
        })
    }
})

router.get('/mensagens/nova', (req, res) =>{
    res.redirect('/usuarios/contato')
})

module.exports = router