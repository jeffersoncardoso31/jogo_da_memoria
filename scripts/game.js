let game = {

    lockMode: false,
    firstCard: null,
    secondCard: null,

    personagens: ['aladin',
        'donald',
        'io',
        'leitao',
        'mickey',
        'minie',
        'mufasa',
        'olaf',
        'pateta',
        'pluto',
        'pooh',
        'simba',
        'stitch',
        'tigrao',
        'tio_patinhas'
    ],

    cards: null,

    setCard: function (id) {

        let card = this.cards.filter(card => card.id === id)[0];
        console.log(card);
        if (card.flipped || this.lockMode) {
            return false;
        }

        if (!this.firstCard) {
            this.firstCard = card;
            this.firstCard.flipped = true;
            return true;
        } else {
            this.secondCard = card;
            this.secondCard.flipped = true;
            this.lockMode = true;
            return true;
        }

    },

    verificarCorrespondente: function () {
        if (!this.firstCard || !this.secondCard) {
            return false;
        }
        return this.firstCard.icon === this.secondCard.icon;
    },

    limparCards: function () {
        this.firstCard = null;
        this.secondCard = null;
        this.lockMode = false;
    },
    abrirCards() {
        this.firstCard.flipped = false;
        this.secondCard.flipped = false;
        this.limparCards();
    },

    verificarFimJogo() {

        return this.cards.filter(card => !card.flipped).length == 0;
        
    },





    criarCardsParaPersonagens: function () {

        this.cards = [];

        this.personagens.forEach((personagem) => {
            this.cards.push(this.criarParParaPersonagem(personagem));
        })
        this.cards = this.cards.flatMap(pair => pair);
        this.embaralharCards();
        return this.cards;
    },

    criarParParaPersonagem: function (personagem) {

        return [{
            id: this.criarIdPersonagen(personagem),
            icon: personagem,
            flipped: false,
        }, {
            id: this.criarIdPersonagen(personagem),
            icon: personagem,
            flipped: false,
        }]

    },

    criarIdPersonagen: function (personagem) {
        return personagem + parseInt(Math.random() * 1000);
    },

    embaralharCards: function (cards) {
        let currentIndex = this.cards.length;
        let randomIndex = 0;

        while (currentIndex !== 0) {

            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [this.cards[randomIndex], this.cards[currentIndex]] = [this.cards[currentIndex], this.cards[randomIndex]]
        }

    }



}