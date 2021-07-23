const mapaDeTeclas = ['q','w','e','a','s','d','z','x','c'];

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

function tocaSom(teclaSom) {
    const audio = document.querySelector(`#som_tecla-${teclaSom}`);
    audio.play();
    return audio.duration; 
}

function removeClasseAtiva(elemento) {
    elemento.classList.remove("ativa");
    console.log("Final da animação");
}