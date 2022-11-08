/**
 * 2C = Two of clubs (Trebol)
 * 2D = Two of Diamonds
 * 2H = Two of hurts
 * 2S = Two of spades
 */


let deck = []
const types = ['C', 'D', 'H', 'S']
specials = ['A', 'J', 'Q', 'K']

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
    
    console.log(card);
    console.log(deck)
    return card
}

askForCard();
