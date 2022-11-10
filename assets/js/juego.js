/**
 * 2C = Two of clubs (Trebol)
 * 2D = Two of Diamonds
 * 2H = Two of hurts
 * 2S = Two of spades
 */

// Reference to HTML elements
const btnGet = document.querySelector('#btnGet');
const btnStop = document.querySelector('#btnStop');
const smallsHTML = document.querySelectorAll('small');
const divPlayerCards = document.querySelector('.jugador-cartas')
const divComputerCards = document.querySelector('.computadora-cartas')

let deck = []
const types = ['C', 'D', 'H', 'S']
specials = ['A', 'J', 'Q', 'K']

let scorePlayer1 = 0,
    scoreComputer = 0; 

// This function create a new deck
const createDeck = () => {
    for (let i = 2; i <= 10; i++) {
        for (const type of types) {
            deck.push(i + type)    
        }
    }

    for (const special of specials) {
        for (const type of types) {
            deck.push(special + type)    
        }
    }

    // Using underscore.js
    deck = _.shuffle(deck)
    console.log(deck)

    return deck
}

createDeck();


// This functions allow the player to pick a card
const askForCard = () => {

    // Validate if deck is empty
    if(deck.length === 0){
        throw 'No hay cartas en el deck';
    }

    card = deck.pop()
    

    return card
}


// This functions assign value for each card
const cardValue = (card) => {
    const value = card.substring(0,card.length-1);
    return isNaN(value) ? ((value === 'A') ? 11 : 10) : value * 1
}

// Computer
const computerTurn = (minScore) => {
    do {
        const card = askForCard();
    
        scoreComputer = scoreComputer + cardValue(card);
        smallsHTML[1].innerText = scoreComputer;
    
        // Generate card image
        const cardImg = document.createElement('img')
        cardImg.src = `assets/cartas/${card}.png`
        cardImg.classList.add('carta');
        divComputerCards.append(cardImg);

        // player one lost, so don't care what card computer get
        if(minScore > 21){
            break;
        }
    } while ((scoreComputer < minScore) && (minScore <= 21));
}

// Events
btnGet.addEventListener('click', () => {
    const card = askForCard();
    
    scorePlayer1 = scorePlayer1 + cardValue(card);
    smallsHTML[0].innerText = scorePlayer1;

    // Generate card image
    const cardImg = document.createElement('img')
    cardImg.src = `assets/cartas/${card}.png`
    cardImg.classList.add('carta');
    divPlayerCards.append(cardImg);

    if (scorePlayer1 > 21){
        console.warn('Perdise, papu :(!')
        btnGet.disabled = true;
        btnStop.disabled = true;

        computerTurn(scorePlayer1);
    } else if(scorePlayer1 === 21){
        console.warn('21, genial')
        btnStop.disabled = true;
        computerTurn(scorePlayer1);
    }
})

btnStop.addEventListener('click', () => {
    btnGet.disabled = true;
    btnStop.disabled = true;

    computerTurn(scorePlayer1);
})