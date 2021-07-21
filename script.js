const mapaDeTeclas = ['q','w','e','a','s','d','z','x','c'];

document.body.addEventListener('keyup', (evento)=> {
    let tecla = evento.key.toLowerCase();
    tocaSom(tecla);
});

const listaDeTeclas = document.querySelectorAll('.tecla');
for (let index = 0; index < listaDeTeclas.length; index++) {
    const tecla = listaDeTeclas[index];
    tecla.addEventListener('click', ()=> {
        tocaSom(tecla.textContent.toLowerCase());
    });
    tecla.addEventListener('keyup', () => {
        tocaSom(tecla.textContent.toLowerCase());
    });
}

function tocaSom(teclaSom) {
    if (mapaDeTeclas.find((letra) => teclaSom == letra)) {
        let audio = document.querySelector(`#som_tecla-${teclaSom}`);
        audio.play(); 
    }  
}