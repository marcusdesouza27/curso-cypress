it ('Nada agora', function(){})

// function soma(a, b){
//     return a + b
// }

// const soma = function(a, b) {
//     return a + b
// }

// const soma = (a, b) => {
//     return a + b
// }

const soma = (a, b) => a + b

// const soma = a => a + a

// const soma = () => 5 - 8
console.log(soma(3,7))

it('A function test', function() {
    console.log('Function', this)
})

it('A arrow test', () => {
    console.log('Arrow', this)
})