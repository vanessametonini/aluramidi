const mapaDeTeclas = ['q','w','e','a','s','d','z','x','c'];

document.addEventListener('DOMContentLoaded', () => {

    const todosSons = document.querySelectorAll('audio');

    const listaDeDuracoes = [];

    for (let index = 0; index < todosSons.length; index++) {

        const som = todosSons[index];

        const idDoElemento = som.id

        const numeroDeLetrasDoId = idDoElemento.length;

        const tecla = idDoElemento.substring(numeroDeLetrasDoId - 1, numeroDeLetrasDoId)

       //const tecla = som.id.charAt(numeroDeLetrasDoId - 1);

        listaDeDuracoes.push({
            tecla,
            duracao: som.duration
        })

    }

})

document.body.addEventListener('keydown', (evento)=> {
    const tecla = evento.key.toLowerCase();
    if (mapaDeTeclas.find((letra) => tecla == letra)) { 
        const botao = document.querySelector(`.tecla-${tecla}`);
        const duracaoAudio = tocaSom(tecla);
        botao.classList.add("ativa");

        botao.style.animationDuration = duracaoAudio;

        botao.addEventListener('animationend', () =>{
            removeClasseAtiva(botao);
        });
    }
});

const listaDeTeclas = document.querySelectorAll('.tecla');

for (let index = 0; index < listaDeTeclas.length; index++) {
    const tecla = listaDeTeclas[index];
    tecla.addEventListener('click', ()=> {

        const duracaoAudio = tocaSom(tecla.textContent.toLowerCase());
        tecla.classList.add("ativa");
        tecla.style.animationDuration = duracaoAudio;

        tecla.addEventListener('animationend', ()=>{

           removeClasseAtiva(tecla);
        });

    });
    tecla.addEventListener('keydown', () => {
        tocaSom(tecla.textContent.toLowerCase());
    });
}

const formGravador = document.querySelector('.gravador');

formGravador.addEventListener('submit', (evento)=> {

    evento.preventDefault();

    const sequenciaDeSom = formGravador.querySelector('input').value;

    let espera = 2000;

    for (let i = 0; i < sequenciaDeSom.length; i++) {

        let letra = sequenciaDeSom[i];

        //se for a primeira execucão, nao tem espera para tocar
        if(i == 0) {
            console.log(letra);
            espera += tocaSom(letra)

            console.log(espera);

        }

        //seguintes execuções espera para tocar
        else {


            setTimeout(() => {
                console.log(letra);
                espera += tocaSom(letra)
                console.log(espera);
            },
            espera
            )

            console.log(espera);
        }

    }

});


function tocaSom(teclaSom) {
    const audio = document.querySelector(`#som_tecla-${teclaSom}`);
    audio.play();
    return audio.duration;
}

function removeClasseAtiva(elemento) {
    elemento.classList.remove("ativa");
}
