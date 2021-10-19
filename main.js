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
    const templateDoSom = document.createElement('span');
    templateDoSom.classList.add('som');
    templateDoSom.textContent = objetoDoSom.nome;
    templateDoSom.setAttribute('data-id', objetoDoSom.idElementoAudio);
    if (gravadorAtivo) {
        const tela = document.querySelector('.tela .rolagem');
        tela.insertAdjacentElement('beforeend', templateDoSom);
    }
    templateDoSom.addEventListener('click', function () {
        if(confirm('Tem certeza que deseja remover?')) {
            this.remove();
        }
    });
}

const teclado = document.querySelector('.teclado');

teclado.addEventListener('click', function ( evento ) {
    const tecla = evento.target;
    if (tecla.localName === 'button') {
        const instrumento = tecla.classList[1];
        const idAudio = `#som_${instrumento}`;
        tocaSom(idAudio);
    }
});

teclado.addEventListener('keydown', function (evento) {
    const tecla = evento.target;
    if (evento.code === 'Space' || evento.code === 'Enter') {
        tecla.classList.add('ativa');
    }
});

teclado.addEventListener('keyup', function ( {target} ) {
    target.classList.remove('ativa');
});


function gravacao (evento) {
    const objeto = {
        nome: evento.target.textContent,
        idElementoAudio: `#som_${evento.target.classList[1]}`
    };
    gravaSom(objeto);
}

//estado do botão gravar
const botaoGravar = document.querySelector('.gravar');
botaoGravar.addEventListener('click', () => {
    if (gravadorAtivo == true) {
        gravadorAtivo = false;
        botaoGravar.textContent = 'Gravar';
        teclado.removeEventListener('click', gravacao);
    } else {
        gravadorAtivo = true;
        teclado.addEventListener('click', gravacao);
        botaoGravar.textContent = 'Parar';
    }
});

const botaoTocar = document.querySelector('.tocar');
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

    const listaDeIds = [];
    listaDeSons.forEach((som)=>{
        listaDeIds.push(som.dataset.id); 
    });

    listaDeIds.forEach((id) => { 
        setTimeout(() => {
            tocaSom(id);
        }, espera);  

        espera += 250;
    });
}