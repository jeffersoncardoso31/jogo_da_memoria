const FRONT = "card_front"
const BACK = "card_back"
const CARD = "card"
const ICON = "icon"
let jogador = 0;
let jogadores = [null,null]
let branco = document.querySelector('#branco');
let roxo = document.querySelector('#roxo');

branco.style.backgroundColor='rgba(255, 255, 0, 0.589)'
branco.style.boxShadow = '5px 5px 10px yellow';
startGame();

function startGame() {
    initializeCards(game.criarCardsParaPersonagens());
}

function initializeCards(cards) {
    let gameBoard = document.getElementById("gameBoard");
    gameBoard.innerHTML = '';
    game.cards.forEach(card => {

        let cardElement = document.createElement('div');
        cardElement.id = card.id;
        cardElement.classList.add(CARD);
        cardElement.dataset.icon = card.icon;

        criarContainerCard(card, cardElement);

        cardElement.addEventListener('click', virarCard)
        gameBoard.appendChild(cardElement);
    })
}
function trocarJogador(){
    if(jogador == 0){
        jogador = 1
        roxo.style.backgroundColor='rgba(255, 255, 0, 0.589)'
        roxo.style.boxShadow = '5px 5px 10px yellow';
        branco.style.backgroundColor='rgba(255, 255, 0, 0)'
        branco.style.boxShadow = '5px 5px 10px black';
    }else{
        jogador = 0
        roxo.style.backgroundColor='rgba(255, 255, 0, 0)'
        roxo.style.boxShadow = '5px 5px 10px black';
        branco.style.backgroundColor='rgba(255, 255, 0, 0.589)'
        branco.style.boxShadow = '5px 5px 10px yellow';
    }
}
function criarContainerCard(card, cardElement) {

    criarFaceCard(FRONT, card, cardElement);
    criarFaceCard(BACK, card, cardElement);


}

function criarFaceCard(face, card, element) {

    let cardElementFace = document.createElement('div');
    cardElementFace.classList.add(face);
    if (face === FRONT) {
        let iconElement = document.createElement('img');
        iconElement.classList.add(ICON);
        iconElement.src = "./imagens/" + card.icon + ".png";
        cardElementFace.appendChild(iconElement);
    } else {
        let iconElement = document.createElement('img');
        iconElement.classList.add(ICON);
        iconElement.src = "./imagens/fundo.png";
        cardElementFace.appendChild(iconElement);
    }
    element.appendChild(cardElementFace);
}


function virarCard() {

    if (game.setCard(this.id)) {

        this.classList.add("flip");
        if (game.secondCard) {
            if (game.verificarCorrespondente()) {
                game.limparCards();
                jogadores[jogador] += 1;
                if(jogadores[0] == null){
                    roxo.innerHTML = jogadores[1];
                }else if(jogadores[1] == null){
                    branco.innerHTML = jogadores[0];
                }else{
                    branco.innerHTML = jogadores[0];
                    roxo.innerHTML = jogadores[1];
                }
                if (game.verificarFimJogo()) {
                    let gameOverLayer = document.querySelector('#gameOver');
                    gameOverLayer.style.display = 'flex';
                    let resultado = document.querySelector('#resultado');
                    if(jogadores[0] > jogadores[1]){
                        resultado.innerHTML = `Parabéns, o jogador Branco ganhou de ${jogadores[0]}x${jogadores[1]}`
                    }else{
                        resultado.innerHTML = `Parabéns, o jogador Roxo ganhou de ${jogadores[1]}x${jogadores[0]}`
                    }
                }
            } else {
                setTimeout(() => {
                    let firstCardView = document.getElementById(game.firstCard.id);
                    let secondCardView = document.getElementById(game.secondCard.id);

                    firstCardView.classList.remove('flip');
                    secondCardView.classList.remove('flip');
                    game.abrirCards();
                    trocarJogador()
                }, 1000);

            };
        }
    }

}

function reiniciar() {
    game.limparCards();
    branco.inneText = 0;
    roxo.inneText = 0;
    jogador = 0;
    startGame();
    let gameOverLayer = document.getElementById("gameOver");
    gameOverLayer.style.display = 'none';
}