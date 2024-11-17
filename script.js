const paresImagens = [
    'bobrossparrot.gif', 'bobrossparrot.gif',
    'explodyparrot.gif', 'explodyparrot.gif',
    'fiestaparrot.gif', 'fiestaparrot.gif',
    'metalparrot.gif', 'metalparrot.gif',
    'revertitparrot.gif', 'revertitparrot.gif',
    'tripletsparrot.gif', 'tripletsparrot.gif',
    'unicornparrot.gif', 'unicornparrot.gif'
];

let crtsEscolhidas = [];
let jogadas = 0;
let paresCartas = 0;
let numPares;

function embaralhar() {
    return Math.random() - 0.5;
}

function inicioJogo() {
    let numCartas;
    do {
        numCartas = parseInt(prompt("Com quantas cartas deseja jogar? (4 a 14, apenas pares)"));
    } while (isNaN(numCartas) || numCartas < 4 || numCartas > 14 || numCartas % 2 !== 0);

    numPares = numCartas / 2;
    const tabuleiro = document.querySelector('.tabuleiro'); 
    tabuleiro.innerHTML = ''; 

    const imagensSelecionadas = paresImagens.slice(0, numCartas).sort(embaralhar);

    imagensSelecionadas.forEach(imagem => {
        const carta = document.createElement('div');
        carta.className = 'carta';
        carta.innerHTML = `
            <div class="conteudo-carta">
                <div class="face face-frente">
                    <img src="./imagens/back.png" alt="Frente da carta" />
                </div>
                <div class="face face-verso">
                    <img src="./imagens/${imagem}" alt="Papagaio" />
                </div>
            </div>
        `;
        carta.addEventListener('click', () => viradaCarta(carta, imagem));
        tabuleiro.appendChild(carta); 
    });
}

function viradaCarta(carta, imagem) {
    if (carta.classList.contains('virada') || crtsEscolhidas.length === 2) return;

    carta.classList.add('virada');
    crtsEscolhidas.push({ carta, imagem });
    jogadas++;

    if (crtsEscolhidas.length === 2) {
        if (crtsEscolhidas[0].imagem === crtsEscolhidas[1].imagem) {
            paresCartas++;
            crtsEscolhidas = [];
            if (paresCartas === numPares) {
                setTimeout(() => alert(`Você ganhou em ${jogadas} jogadas!`), 500);
            }
        } else {
            setTimeout(() => {
                crtsEscolhidas.forEach(item => item.carta.classList.remove('virada'));
                crtsEscolhidas = [];
            }, 1000);
        }
    }
}

document.addEventListener('DOMContentLoaded', inicioJogo);
