// ABRIR A ABA DE CRIAÇÃO UM NOVO GRUPO

let displayCriacaoGrupo = document.querySelector('#displayCriacaoGrupo')

let adicionarNovoGrupo = document.querySelector('#adicionarNovoGrupo')

adicionarNovoGrupo.addEventListener('click', () => {
    displayCriacaoGrupo.style.display = 'flex'
    adicionarNovoGrupo.style.display = 'none'
    document.querySelector('#main').style.backgroundColor = '#A7A7A7'
    document.querySelector('#header').style.backgroundColor = '#A7A7A7'
    document.querySelector('#header div').style.backgroundColor = '#038C4580'
    
    for(let i = 0; i < document.querySelector('#displayGruposGeral').childElementCount; i++) {
        document.querySelector('#displayGruposGeral').children[i].children[0].style.backgroundColor = '#A7A7A7'    
    }
})

// FECHAR A ABA DE CRIAÇÃO UM NOVO GRUPO

let voltarDoCriarGrupo = document.querySelector('#voltarDoCriarGrupo')

voltarDoCriarGrupo.addEventListener('click', () => {
    displayCriacaoGrupo.style.display = 'none'
    adicionarNovoGrupo.style.display = 'block'
    document.querySelector('#main').style.backgroundColor = '#FFF'
    document.querySelector('#header').style.backgroundColor = '#FFF'
    document.querySelector('#header div').style.backgroundColor = '#038C45'

    for(let i = 0; i < document.querySelector('#displayGruposGeral').childElementCount; i++) {
        document.querySelector('#displayGruposGeral').children[i].children[0].style.backgroundColor = '#FFF'    
    }
})

// CRIAR UM NOVO GRUPO

let buttonCriarGrupo = document.querySelector('#criarGrupo')
buttonCriarGrupo.addEventListener('click', criarGrupo)

function criarGrupo(){
    let nomeDoGrupo = document.querySelector('#nomeDoGrupo').value
    
    firebase.
    firestore()
    .collection('TOPICOS_MENSAGENS')
    .add({
        nome: nomeDoGrupo,
        adm: 'usuario',
        ultimaMensagem: {
            texto: `Grupo ${nomeDoGrupo} criado. Bem vindo(a)!`,
            dataCriacao: firebase.firestore.FieldValue.serverTimestamp(),
        }
    })
    .then((docRef) => {
        docRef.collection('MENSAGENS').add({
            texto: `Grupo ${nomeDoGrupo} criado. Bem vindo(a)!`,
            dataCriacao: firebase.firestore.FieldValue.serverTimestamp(),
            system: true,
        })
        .then(() => {
            displayCriacaoGrupo.style.display = 'none'
            adicionarNovoGrupo.style.display = 'none'
            alert(firebase.auth().currentUser.toJSON())
            window.location.reload(true);
        })
    })
    .catch((erro) => {
        console.log(erro);
    })
    // console.log(firebase.auth().currentUser);
    // console.log(firebase.auth().currentUser.toJSON());
    // hasUser()
}

// function hasUser(){
//     const hasUser = firebase.auth().currentUser ? firebase.auth().currentUser.toJSON() : null
//     console.log(hasUser);
// }

function buscarGrupos(){
    firebase.
    firestore()
    .collection('TOPICOS_MENSAGENS')
    .orderBy('ultimaMensagem.dataCriacao', 'desc')
    .limit(10)
    .get()
    .then((snapshot) => {
        const topicos = snapshot.docs.map(doc => {
            return {
                id: doc.id,
                nome: '',
                ultimaMensagem: { texto: '' },
                ...doc.data()
            }
        })
        if (topicos == 0) {
            document.querySelector('.quantidade').innerHTML = `Não há grupos`
        } else {
            criarDisplayGrupos(topicos)
        }
    })
}

buscarGrupos()

let displayGruposGeral = document.querySelector('#displayGruposGeral')

function criarDisplayGrupos(topicos){
    for (let i = 0; i < topicos.length; i++) {
        let divContainer = document.createElement('DIV')
        divContainer.classList.add('displayGrupo')
        divContainer.setAttribute("id", topicos[i].id)

        let divImgGrupo = document.createElement('DIV')
        divImgGrupo.classList.add('displayImagem')

        let divTexto = document.createElement('DIV')
        divTexto.classList.add('displayTexto')

        let strong = document.createElement('STRONG')
        strong.classList.add('displayNomeDoGrupo')
        strong.textContent = topicos[i].nome

        let paragrafo = document.createElement('P')
        paragrafo.classList.add('displayUltimaMensagem')
        paragrafo.textContent = topicos[i].ultimaMensagem.texto

        divContainer.appendChild(divImgGrupo)
        divTexto.appendChild(strong)
        divTexto.appendChild(paragrafo)
        divContainer.appendChild(divTexto)
        displayGruposGeral.appendChild(divContainer)
    }
}


//-------------------------------------------//

document.querySelector('#displayGruposGeral').addEventListener('click', (e) => {
    document.querySelector('.areaDeTexto').children[document.querySelector('.areaDeTexto').childElementCount-1].style.padding = "0 0 25px 0"

    document.querySelector('.areaDeTexto').children[0].style.padding = "80px 0 0 0"

    document.querySelector('.containerAreaDeTexto').scrollTop = document.querySelector('.containerAreaDeTexto').scrollHeight;


    let evento = e.target
    let idChatClicado = ''
    if (evento.classList.value[0] == 'd') {
        if (evento.classList.value == 'displayImagem') {
            idChatClicado = evento.parentElement.id
        } 
        
        else if (evento.classList.value == 'displayNomeDoGrupo' || evento.classList.value == 'displayUltimaMensagem') {
            idChatClicado = evento.parentElement.parentElement.id
        } 
        
        else {
            idChatClicado = evento.id
        }
    }

    abrirChat(idChatClicado)
})

let informacoesChat = ''

function abrirChat(idChatClicado) {
    // load()

    console.log(idChatClicado);
    
    displayGruposGeral.style.display = 'none';

    document.querySelector('.chat').style.display = 'flex';

    firebase.
    firestore()
    .collection('TOPICOS_MENSAGENS')
    .get()
    .then((snapshot) => {
        const topicos = snapshot.docs.map(doc => {
            return {
                id: doc.id,
                nome: '',
                ultimaMensagem: { texto: '' },
                ...doc.data()    
            }
        })
        for (let i = 0; i < topicos.length; i++) {
            if (topicos[i].id == idChatClicado){
                // console.log(topicos[i].id);
                informacoesChat = topicos[i]
                // console.log(informacoesChat);
                document.querySelector('.chatNome').innerHTML = informacoesChat.nome
                // document.querySelector('.enviarMensagem').addEventListener('click', enviarMensagem(topicos))
                console.log('a');
                enviarMensagem(informacoesChat)
            }
        }
    })
}


document.querySelector('.setaVoltar').addEventListener('click', () => {
    displayGruposGeral.style.display = 'flex';
    document.querySelector('.chat').style.display = 'none';
})


function mostrarMensagens(){
    firebase.
    firestore()
    .collection('TOPICOS_MENSAGENS')
    .doc(topicos.id)
    .collection('MENSAGENS')
    .orderBy('dataCriacao', 'desc')
    .onSnapShot(consultaSnapShot => {
        const mensagens = consultaSnapShot.docs.map(doc => {
            const firebaseData = doc.data()

            const data = {
                id: doc.id,
                texto: '',
                dataCriacao: firebase.firestore.FieldValue.serverTimestamp(),
                ...firebaseData
            }

            if (!firebaseData.system){
                data.usuario = {
                    ...firebaseData.usuario,
                    nome: firebaseData.usuario.displayNome
                }
            }
        })
    })

}

let areaDeTexto = document.querySelector('.areaDeTexto')

function mostrarMensagem(){
    firebase.
    firestore()
    .collection('TOPICOS_MENSAGENS')
    .doc('K417Qi2PPpCssg8xLk2p')
    .collection('MENSAGENS')
    .get()
    .then((snapshot) => {
        const topicos = snapshot.docs.map(doc => {
            return {
                ...doc.data()    
            }
        })
        console.log(topicos);

        for (let i = 0; i < topicos.length; i++){

            let divBloco = document.createElement('DIV')
            
            let div = document.createElement('DIV')
            
            if (false){
                divBloco.classList.add('blocoMensagemRecebida')
                
                let paragrafoNome = document.createElement('P')
                paragrafoNome.classList.add('nomeDoUsuario')
                
            div.append(paragrafoNome)

        } else {
            divBloco.classList.add('blocoMensagemEnviada')
        }
  
            let paragrafoMensagem = document.createElement('P')
            paragrafoMensagem.classList.add('mensagem')
            
            paragrafoMensagem.innerHTML = topicos[i].texto
            
            div.append(paragrafoMensagem)
            
            divBloco.appendChild(div)
            
            areaDeTexto.appendChild(divBloco)
        }
    })
}


function enviarMensagem(topicos){
    document.querySelector('.enviarMensagem').addEventListener('click', () => {
        // buscarMensagens(topicos)
        let mensagemDigitada = document.querySelector('.mensagens')
        console.log(mensagemDigitada.value);
        console.log(topicos);

        firebase.
        firestore()
        .collection('TOPICOS_MENSAGENS')
        .doc(topicos.id)
        .collection('MENSAGENS')
        .add({
            texto: mensagemDigitada.value,
            dataCriacao: firebase.firestore.FieldValue.serverTimestamp(),
            system: false
        }, { merge: true })
        console.log(topicos);
        mostrarMensagem(topicos)
        mensagemDigitada.value = ''
    })
}












// function load(){
//     let loading = setInterval(() => {
//         document.querySelector('#main').style.backgroundColor = '#A7A7A7'
//         document.querySelector('.chat').style.display = 'none'
//         document.querySelector('#loadExterno').style.display = 'flex'
//         document.querySelector('#loadInterno').style.display = 'block' 
//         console.log('entrou');
//     }, 10);

//     setTimeout(() => {
//         clearInterval(loading)
//         document.querySelector('#main').style.backgroundColor = '#FFF'
//         document.querySelector('.chat').style.display = 'flex'
//         document.querySelector('#loadExterno').style.display = 'none'
//         document.querySelector('#loadInterno').style.display = 'none' 
//         console.log('entrou');
//     }, 100);
// }




let iconeBuscador = document.querySelector('#iconeBuscador')

iconeBuscador.addEventListener('click', () => {
    document.querySelector('#tituloAreaDeGrupo').style.display = 'none'
    document.querySelector('#pesquisarNomeDoGrupo').style.display = 'block'

})

// Logout

let iconeSair = document.querySelector('#iconeSair')

iconeSair.addEventListener('click', logout)

function logout() {
    firebase.auth().signOut().then(() => {
        setTimeout(() => {
            window.location.href = "pages/paginaLogin.html"; 
        }, 1000);
    }).catch(() => {
        alert(error)
    })

    // document.querySelector('.loading').style.display = 'flex'

}


// CONTINUAR LOGADO

// firebase.auth().onAuthStateChanged(function(user){
//     if(user) {
//         window.location.href = "/index.html"; 
//     }
//     console.log(user);
// })

// firebase.auth().onAuthStateChanged(function(user){
//     if(!user) {
//         window.location.href = "pages/paginaLogin.html"; 
//     }
//     console.log(user);
// })

// function buscarMensagens(topicos){
    //     console.log(topicos);
    //     mostrarMensagem(topicos)
    // }
    
    // mostrarMensagem()