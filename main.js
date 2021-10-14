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
function gravaSom(nomeDoSom) {
    const templateDoSom = document.createElement('span');
    templateDoSom.classList.add('som');
    templateDoSom.textContent = nomeDoSom;
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
    console.log(evento.target);
    const tecla = evento.target;
    if (tecla.localName === 'button') {
        const instrumento = tecla.classList[1];
        const idAudio = `#som_${instrumento}`;
        tocaSom(idAudio);
        gravaSom(tecla.textContent);
    }
});

teclado.addEventListener('onkeydown', function (evento) {
    const tecla = evento.target;
    if (evento.code === 'Space' || evento.code === 'Enter') {
        tecla.classList.add('ativa');
    }
});
teclado.addEventListener('onkeyup', function (evento) {
    const tecla = evento.target;
    tecla.classList.remove('ativa');
});


//estado do botão gravar
const botaoGravar = document.querySelector('.gravar');
botaoGravar.addEventListener('click', () => {
    if (gravadorAtivo == true) {
        gravadorAtivo = false;
        botaoGravar.textContent = 'Gravar';
    } else {
        gravadorAtivo = true;
        botaoGravar.textContent = 'Parar';
    }
    console.log(gravadorAtivo);
});
