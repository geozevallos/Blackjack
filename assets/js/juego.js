/**
 * 2C = Two of clubs (Trebol)
 * 2D = Two of Diamonds
 * 2H = Two of hurts
 * 2S = Two of spades
 */


let deck = []
const types = ['C', 'D', 'H', 'S']
specials = ['A', 'J', 'Q', 'K']
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

    console.log(deck)
    // Using underscore.js
    deck = _.shuffle(deck)
    console.log(deck)

    return deck
}

createDeck();
