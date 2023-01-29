let nomeDaSala = document.querySelector('#nomeDaSala')

let adicionarNovaSala = document.querySelector('#adicionarNovaSala')

let modalGrupo = document.querySelector('#modalGrupo')

adicionarNovaSala.addEventListener('click', () => {
    modalGrupo.style.display = 'flex'
})

let usuario = 'Berg'

function criarSala(){
    firebase.
    firestore()
    .collection('TOPICOS_MENSAGENS')
    .add({
        nome: nomeDaSala.value,
        adm: usuario,
        ultimaMensagem: {
            texto: `Grupo ${nomeDaSala} criado. Bem vindo(a)!`,
            dataCriacao: firebase.firestore.FieldValue.serverTimestamp(),
        }
    })
    .then((docRef) => {
        docRef.collection('MENSAGENS').add({
            texto: `Grupo ${nomeDaSala} criado. Bem vindo(a)!`,
            dataCriacao: firebase.firestore.FieldValue.serverTimestamp(),
            system: true,
        })
        .then(() => {
            modalGrupo.style.display = 'none'
            alert('GRUPO DE CHAT CRIADO! ')
        })
    })
    .catch((erro) => {
        console.log(erro);
    })

}

// let teste =  firebase.firestore()
// .collection('TOPICOS_MENSAGENS')
// .get().then(snapshot => {
//     snapshot.docs.forEach(doc => {
//         console.log(doc);
//     })
// })

let buttonCriarSala = document.querySelector('#criarSala')


buttonCriarSala.addEventListener('click', criarSala)
