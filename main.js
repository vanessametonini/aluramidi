// Projeto: substituir as variáveis fixas pelo elementos do html
const percursao_q = document.querySelector('#som_tecla-q');
const percursao_w = document.querySelector('#som_tecla-w');
const percursao_e = document.querySelector('#som_tecla-e');
const percursao_a = document.querySelector('#som_tecla-a');
const percursao_s = document.querySelector('#som_tecla-s');
const percursao_d = document.querySelector('#som_tecla-d');
const percursao_z = document.querySelector('#som_tecla-z');
const percursao_x = document.querySelector('#som_tecla-x');
const percursao_c = document.querySelector('#som_tecla-c');

percursao_w.onclick = tocaSom(percursao_w);

//Projeto: substituir uma variavel para cada som para usar uma lista com todos
const todosOsSons = document.querySelectorAll('audio');





function tocaSom(som) {
    console.log(som);
    som.play();
}






