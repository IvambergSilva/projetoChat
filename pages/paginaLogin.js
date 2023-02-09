// PAGINA INICIAL LOGIN

let botaoLogin = document.querySelector('#botaoLogin')
let logo = document.querySelector('.logo')

botaoLogin.addEventListener('click', () => {
    botaoLogin.style.display = 'none'
    document.querySelector('#containerlogin').style.display = 'flex'
})

let inputsLogin = document.querySelector('#inputsLogin')
let inputsCriar = document.querySelector('#inputsCriar')

// CRIAR NOVA CONTA

document.querySelector('#criarNovaConta').addEventListener('click', () => {
    inputsLogin.style.display = 'none'
    inputsCriar.style.display = 'flex'
})

// CADASTRAR USUARIO

let usuario = '' 
let email = ''
let senha = ''

let liberacaoParaCriacao = true

document.querySelector('#cadastrarConta').addEventListener('click', cadastrarUsuario)

function cadastrarUsuario() {
    usuario = document.querySelector('#criarNomeUsuario').value
    email = document.querySelector('#criarEmailUsuario').value 
    senha = document.querySelector('#criarSenhaUsuario').value 
    
    // CONDIÇÃO PARA EMAIL DAR CERTO
    
    liberacaoParaCriacao = validarEmail(email)

    if (usuario === '' || email === '' || senha === '') {
        alert('CAMPOS EM BRANCOS')
        liberacaoParaCriacao = false
    }
    
    if (!liberacaoParaCriacao && (usuario !== '' || email !== '' || senha !== '')) alert('É necessário que o email tenha o domínio do nosso hospital: @hlaureano.org.br');
    
    if (liberacaoParaCriacao) {
        firebase
        .auth()
        .createUserWithEmailAndPassword(email, senha)
        .then((usuarioCredencial) => {
            // let usuarioCadastrado = usuarioCredencial;

            document.querySelector('#criarNomeUsuario').value = ''
            document.querySelector('#criarEmailUsuario').value = ''
            document.querySelector('#criarEmailUsuario').value = ''

            inputsLogin.style.display = 'flex'
            inputsCriar.style.display = 'none'
            document.querySelector('#sucesso').style.display = 'flex'
            setTimeout(() => {
                document.querySelector('#sucesso').style.display = 'none'
            }, 4000);
        })
        .catch((error) => {
            if (error.code === 'auth/email-already-in-use') {
                alert('Este email já está em uso!');
            }
        
            if (error.code === 'auth/invalid-email') {
                alert('Este email é inválido!');
            }
        })
    } 

}

// VALIDAR EMAIL

let aux = ''
let dominio = ''

function validarEmail(email){
    for(let i = 0; i < email.length; i++) {
        if (email[i] == '@') {
            aux = i + 1;
            break
        }
    }

    for(let i = aux; i < email.length; i++) {
        dominio += email[i];
    }

    if (dominio == 'hlaureano.org.br' || dominio == 'HLAUREANO.ORG.BR') return true
    else return false
}

// ACESSAR CONTA

document.querySelector('#acessarConta').addEventListener('click', acessar)

function acessar() {
    liberacaoParaCriacao = true

    email = document.querySelector('#emailUsuario').value 
    senha = document.querySelector('#senhaUsuario').value 

    if (email === '' || senha === '') {
        alert('CAMPOS EM BRANCOS')
        liberacaoParaCriacao = false
    }

    if (liberacaoParaCriacao) {
        firebase
        .auth()
        .signInWithEmailAndPassword(email, senha)
        .then(() => {
            console.log('SUCESS');
            alert('CERTO')

            document.querySelector('#emailUsuario').value = ''
            document.querySelector('#emailUsuario').value = ''
            document.querySelector('#emailUsuario').value = ''
        })
        .catch((error) => {
            if (error.code === 'auth/invalid-email') {
                alert('Este email é inválido!');
                console.log('error!!');
            }
            console.log(error);
        })

        setTimeout(() => {
            window.location.href = "/index.html"; 
        }, 1000);
    }
}

// JÁ POSSUI CONTA

let possuiConta = document.querySelector('#possuiConta')

possuiConta.addEventListener('click', () => {
    inputsLogin.style.display = 'flex'
    inputsCriar.style.display = 'none'
})

// CONTINUAR LOGADO

// firebase.auth().onAuthStateChanged(user => {
//     if(user) {
//         window.location.href = "/index.html"; 
//     }
//     console.log(user);
// })
