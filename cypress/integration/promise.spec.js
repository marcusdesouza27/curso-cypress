it ('Nada agora', ( ) => { })

//Método antigo - não recomendado
// const getSomething = Callback => {
//     setTimeout(() => {
//         Callback(12);
//     }, 1000)
// }

// const system = () => {
//     console.log('Init');
//         getSomething(some => {
//         console.log(`Something is ${some}`);
//         console.log('end')
//     })
// }

//Chamada com Promise

// const getSomething = () => {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve(13);
//         }, 1000)
//     })
   
// }

// const system = () => {
//     console.log('Init');
//     getSomething().then(some => {
//         console.log(`Something is ${some}`);
//     })
//     console.log('end')
// }

// async / await (Não muito recomendado para Cypress)
const getSomething = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(13);
        }, 1000)
    })
   
}

const system = async () => {
    console.log('Init');
    const some = await getSomething()
    console.log(`Something is ${some}`)
    console.log('end')
}
system();