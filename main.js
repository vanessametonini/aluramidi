let gravadorAtivo = false; 

function tocaSom (seletorAudio) {
    const elemento = document.querySelector(seletorAudio);

    if (elemento && elemento.localName === 'audio') {
        elemento.play();
    }
    else {
        alert('Elemento não encontrado');
        console.log('Elemento não encontrado ou seletor inválido');
    }
}

//criando um elemento dinamicamente
function gravaSom(objetoDoSom) {
    
    //1 criar elemento dinamicamente e manipular os atributos dele
    const templateDoSom = document.createElement('span');
    templateDoSom.classList.add('som');
    templateDoSom.textContent = objetoDoSom.nome;

    //1 data-atributes pq ele pé mais adequado para este caso?
    templateDoSom.setAttribute('data-id', objetoDoSom.idElementoAudio);


    if (gravadorAtivo) {
        const tela = document.querySelector('.tela .rolagem');
        //1 inserAdjacentElement (4 posições, e diferença entre insertAdjacentHTML)
        tela.insertAdjacentElement('beforeend', templateDoSom);
    }


    //1 inserindo eventos em elementos criados dinamicamente
    templateDoSom.addEventListener('click', function () {
        if(confirm('Tem certeza que deseja remover?')) {
            this.remove();
        }
    });
}

const teclado = document.querySelector('.teclado');

//1 event delegation (retirar o for das teclas e usar o teclado) - 
//motivar com e se meu teclado tiver mil teclas? muitos listeners causam lentidão nas paginas
teclado.addEventListener('click', function ( evento ) {
    const tecla = evento.target;
    if (tecla.localName === 'button') {
        const instrumento = tecla.classList[1];
        const idAudio = `#som_${instrumento}`;
        tocaSom(idAudio);
    }
});


//1 antes tava tecla por tecla agora precisamos passar para o teclado
    teclado.addEventListener('keydown', function (evento) {
        const tecla = evento.target;
        if (evento.code === 'Space' || evento.code === 'Enter') {
            tecla.classList.add('ativa');
        }
    });

    //desestruturação de objetos
    teclado.addEventListener('keyup', function ( {target} ) {
        target.classList.remove('ativa');
    });
//


function gravacao (evento) {
    const objeto = {
        nome: evento.target.textContent,
        idElementoAudio: `#som_${evento.target.classList[1]}`
    };
    gravaSom(objeto);
}

//estado do botão gravar
const botaoGravar = document.querySelector('.gravar');


//1 sobre removeEventListener
botaoGravar.addEventListener('click', () => {
    if (gravadorAtivo == true) {
        gravadorAtivo = false;
        //explicar textContent
        botaoGravar.textContent = 'Gravar';
        //removeEventListener
        teclado.removeEventListener('click', gravacao);
    } else {
        gravadorAtivo = true;

        teclado.addEventListener('click', gravacao);
        botaoGravar.textContent = 'Parar';
    }
});

const botaoTocar = document.querySelector('.tocar');

//1 lógica com length da lista para nao tocar a sequencia numa lista vazia
botaoTocar.addEventListener('click', () => {
    const sequencia = document.querySelectorAll('.tela span.som');


    if (sequencia.length != 0) {
      tocarSequencia(sequencia);
    } else {
        alert('Grave uma sequência de som!');
    }

});


function tocarSequencia(listaDeSons) {

    let espera = 0;
    console.log(listaDeSons);

    //1 video só sobre array (listas puras de JS é diferente de nodelist mas tem notação similar, tipo de dado array)
    const listaDeIds = [];

    //1 video só sobre forEach, 1o param é o item da lista, o segundo param é o contador do laço/loop/iteracao da lista
    listaDeSons.forEach((som)=> {
        //trabalhando com array inserindo itens/dados no array
        listaDeIds.push(som.dataset.id);
    });

    listaDeIds.forEach((id, indice) => {

        //1 video de setTimeout
        setTimeout(() => {
            tocaSom(id);
        }, espera);


        //1 video destructuring?
        const { duration } = document.querySelector(id);

        //OU no lugar de destructuring, pegar elemento normalment
        // const tagAudio = document.querySelector(id);
        // tagAudio.duration


        //1 video de trabalhando com numeros strings
        //const milissegundos = parseInt(duration.toString().replace('0.','').slice('0','3'));

        //1 video para construção da logica de atribuição do milissegundos na espera
        // o primero nao precisa esperar OK, 
        // o segundo precisa esperar a duração do primeiro
        // o terceiro precisa esperar a duração do primeiro+segundo
        // o quarto precisa esperar a duração do primeiro+segundo+terceiro 
        // ... até o fim da lista 

        if(duration < 1 ) {
            const milissegundos = parseInt(duration.toString().replace('0.','').slice('0','3'));
            espera = espera + milissegundos;
            console.log(indice, id, espera);
        }
        else {
            const milissegundos = parseInt(duration.toString().replace('.','').slice('0','4'));
            espera = espera + milissegundos;
            console.log(indice, id, espera);
        }


    });
}