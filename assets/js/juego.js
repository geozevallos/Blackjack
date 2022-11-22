/**
 * 2C = Two of clubs (Trebol)
 * 2D = Two of Diamonds
 * 2H = Two of hurts
 * 2S = Two of spades
 */

const miModulo = (() => {
  "use strict";

  // Reference to HTML elements
  const btnGet = document.querySelector("#btnGet");
  const btnStop = document.querySelector("#btnStop");
  const btnNew = document.querySelector("#btnNew");
  const smallsHTML = document.querySelectorAll("small");
  const divPlayersCards = document.querySelectorAll(".divCards");

  let deck = [];
  const types = ["C", "D", "H", "S"],
    specials = ["A", "J", "Q", "K"];

  //   let scorePlayer1 = 0,
  //     scoreComputer = 0;
  let playersScore = [];

  // This function start the game
  const startGame = (players = 2) => {
    deck = createDeck();
    playersScore = [];

    for (let i = 0; i < players; i++) {
      playersScore.push(0);
    }

    smallsHTML.forEach((element) => {
      element.innerText = 0;
    });

    divPlayersCards.forEach((element) => {
      element.innerHTML = "";
    });

    btnGet.disabled = false;
    btnStop.disabled = false;
  };

  // This function create a new deck
  const createDeck = () => {
    deck = [];
    for (let i = 2; i <= 10; i++) {
      for (const type of types) {
        deck.push(i + type);
      }
    }

    for (const special of specials) {
      for (const type of types) {
        deck.push(special + type);
      }
    }

    // Using underscore.js
    return _.shuffle(deck);
  };

  // This functions allow the player to pick a card
  const askForCard = () => {
    // Validate if deck is empty
    if (deck.length === 0) {
      throw "No hay cartas en el deck";
    }

    return deck.pop();
  };

  // This functions assign value for each card
  const cardValue = (card) => {
    const value = card.substring(0, card.length - 1);
    return isNaN(value) ? (value === "A" ? 11 : 10) : value * 1;
  };

  //   Turn: 0 = 1st player, lastone = computer
  const setScore = (card, turn) => {
    playersScore[turn] = playersScore[turn] + cardValue(card);
    smallsHTML[turn].innerText = playersScore[turn];
    return playersScore[turn];
  };

  const generateCard = (card, turn) => {
    const cardImg = document.createElement("img");
    cardImg.src = `assets/cartas/${card}.png`;
    cardImg.classList.add("carta");

    divPlayersCards[turn].append(cardImg);
  };

  // Computer
  const computerTurn = (minScore) => {
    let scoreComputer = 0;
    do {
      const card = askForCard();

      scoreComputer = setScore(card, playersScore.length - 1);

      // Generate card image
      generateCard(card, playersScore.length - 1);

      // player one lost, so don't care what card computer get
      if (minScore > 21) {
        break;
      }
    } while (scoreComputer < minScore && minScore <= 21);

    showWinner();
  };

  const showWinner = () => {
    setTimeout(() => {
      const [scorePlayer1, scoreComputer] = playersScore;

      if (
        scorePlayer1 <= 21 &&
        (scoreComputer < scorePlayer1 || scoreComputer > 21)
      ) {
        alert("You win!!");
      } else if (scorePlayer1 === scoreComputer) {
        alert("No body wins");
      } else {
        alert("You lost :(");
      }
    }, 1000);
  };

  // Events
  btnGet.addEventListener("click", () => {
    const card = askForCard();
    let scorePlayer1 = setScore(card, 0);

    // Generate card image
    generateCard(card, 0);

    if (scorePlayer1 > 21) {
      console.warn("Perdise, papu :(!");
      btnGet.disabled = true;
      btnStop.disabled = true;

      computerTurn(scorePlayer1);
    } else if (scorePlayer1 === 21) {
      console.warn("21, genial");
      btnStop.disabled = true;
      computerTurn(scorePlayer1);
    }
  });

  btnStop.addEventListener("click", () => {
    btnGet.disabled = true;
    btnStop.disabled = true;

    computerTurn(playersScore[0]);
  });

  btnNew.addEventListener("click", () => {
    startGame();
  });


  return {
    newGame: startGame
  }
})();
