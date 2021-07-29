
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
