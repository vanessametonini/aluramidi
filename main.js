// Primeiras aulas
// const tecla = document.querySelector('.tecla_q');

// tecla.addEventListener('click', () => {
//     const idDoAudio = `som_${tecla.classList[1]}`;
//     const tagAudio = document.querySelector(`#${idDoAudio}`);

//     if(tagAudio) {
//         tagAudio.play();
//     }

// })

//Código da última aula
const listaDeTeclas = document.querySelectorAll('.tecla');

listaDeTeclas.forEach(function(tecla){

    tecla.addEventListener('click', () => {
        const idDoAudio = `som_${tecla.classList[1]}`;
        const tagAudio = document.querySelector(`#${idDoAudio}`);

        if(tagAudio) {
            tagAudio.play();
        }

    })

})
