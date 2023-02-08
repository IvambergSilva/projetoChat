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

document.querySelector('#acessarConta').addEventListener('click', acessar)

function acessar() {
    console.log('dasdas');
    firebase
    .auth()
    .singInWithEmailAndPassword('ivamberg.silva@hlaureano.org.br', 'ivamberg.silva@hlaureano.org.br')
    .then(() => {
        alert('CERTO')
    })
    .catch((error) => {
        if (error.code === 'auth/invalid-email') {
            alert('Este email é inválido!');
        }
    })
}

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

// function guardarUsuario(usuarioCadastrado) {
//     let user = usuarioCadastrado
//     console.log(user);
// }

// JÁ POSSUI CONTA

let possuiConta = document.querySelector('#possuiConta')

possuiConta.addEventListener('click', () => {
    inputsLogin.style.display = 'flex'
    inputsCriar.style.display = 'none'
})