
const numDeck = document.getElementById("cardDeck");

let playerWinner = 0;
let dealerWinner = 0;
let blackjackDeck;
let shownHands = [];


/**
 * Represents a card player (including dealer).
 * @constructor
 * @param {string} name - The name of the player
 */
class CardPlayer {

    constructor(name) {
        this.name = name;
        this.hand = [];
        if (this.name == 'dealer') {
          this.container = document.getElementById("rectangle-container-dealer");
        } else {
          this.container= document.getElementById("rectangle-container-gambler");
        }
        }

    drawCard() {

      const suits = { 'spades': '\u2660',   // Spades
                    'hearts': '\u2665',   // Hearts
                    'diamonds': '\u2666', // Diamonds
                    'clubs': '\u2663'};     // Clubs

        // const card = blackjackDeck[Math.floor(Math.random() * (12 - 11 + 1) + 11)];
        // let randomIndex = Math.floor(Math.random() * (51 - 1 + 1) + 1)
        // console.log(`Random number is ${randomIndex}`)
        // const card = blackjackDeck[randomIndex];
        // Select the last item from the shuffled deck and remove the card from the deck
        const card = blackjackDeck.pop(); 
        if (card === undefined) {
          let body = document.getElementsByTagName('body')[0]
          let r = 255;
          const animate = function() {
          r--;
          if (r < 256) {
          body.style.backgroundColor=`rgb(${r},${r},${r})`;
          requestAnimationFrame(animate);
          }
          }
          requestAnimationFrame(animate);
          return;
        }
        this.hand.push(card);

        const rectangle = document.createElement("div");
        rectangle.className = "rectangle";
        // Set the background color to black for even indices and red for odd indices
        rectangle.style.backgroundColor = ((card.suit === 'hearts') || (card.suit === 'diamonds')) ? "red" : "black";
        rectangle.textContent = card.displayVal + '\n' + suits[card.suit];

        this.container.appendChild(rectangle); // Add the rectangle to the container

        };

    reset() {
      this.hand = [];
    }

    printHand() {

        let handString = " ";

        this.hand.forEach(obj => {
          handString += `${obj.displayVal} of ${obj.suit} `
      });
      return handString;
    }

}; //TODO

// // CREATE TWO NEW CardPlayers
const dealer = new CardPlayer('dealer'); // TODO
const player = new CardPlayer('player');; // TODO

/**
 * Calculates the score of a Blackjack hand
 * @param {Array} hand - Array of card objects with val, displayVal, suit properties
 * @returns {Object} blackJackScore
 * @returns {number} blackJackScore.total
 * @returns {boolean} blackJackScore.isSoft
 */
const calcPoints = (hand) => {
  // CREATE FUNCTION HERE
  let totalPoint = 0;
  isSoft = false;
  for (let i = 0; i < hand.length; i++) {
    if (hand[i].val === 11) {
        continue;
    }
    else {
    totalPoint += hand[i].val;
    }
  }

  let aces = hand.filter((card) => card.val === 11);
  for (let j=0; j< aces.length; j++) {
    if (totalPoint >11) {
        totalPoint += 1;
    } else { totalPoint += 11;
        isSoft = true;
    }
}

  return {
    total: totalPoint,
    isSoft: isSoft
  }

}

// /**
//  * Determines whether the dealer should draw another card.
//  * 
//  * @param {Array} dealerHand Array of card objects with val, displayVal, suit properties
//  * @returns {boolean} whether dealer should draw another card
//  */
const dealerShouldDraw = (dealerHand) => {
  // CREATE FUNCTION HERE
    isDrawNewCard = false;
    const dealPoint = calcPoints(dealerHand);
    if (dealPoint.total <= 16) {
        isDrawNewCard = true;
    }
    if (dealPoint.total === 17 && dealPoint.isSoft) {
        isDrawNewCard = false;
    }
    return isDrawNewCard;
}

// /**
//  * Determines the winner if both player and dealer stand
//  * @param {number} playerScore 
//  * @param {number} dealerScore 
//  * @returns {string} Shows the player's score, the dealer's score, and who wins
//  */
const determineWinner = (playerScore, dealerScore) => {
  // CREATE FUNCTION HERE
  let winner = "";

  if (playerScore == dealerScore) {
    winner = "Tied game";
  }

  else if (dealerScore > 21) 
    {
    winner = 'Player'
    playerWinner++;
    } 
   else {
    winner = playerScore > dealerScore ? 'Player' : 'Dealer'
    if (winner === 'Player') {
      playerWinner++; }
    else {
      dealerWinner++;
    }
   }
   
  const result = `Player's score ${playerScore}, Dealer's score ${dealerScore}. Winner is ${winner}`;

  return result;
}

/**
 * Creates user prompt to ask if they'd like to draw a card
 * @param {number} count 
 * @param {string} dealerCard 
 */
const getMessage = (count, dealerCard) => {
  return `Dealer showing ${dealerCard.displayVal}, your count is ${count}.  Draw card?`
}

/**
 * Logs the player's hand to the console
 * @param {CardPlayer} player 
 */
const showHand = (player) => {
  const displayHand = player.hand.map((card) => card.displayVal);
  console.log(`${player.name}'s hand is ${displayHand.join(', ')} (${calcPoints(player.hand).total})`);
}

/**
 * Runs Blackjack Game
 */
const shuffleButton = document.getElementById('shuffleButton');
const hitButton = document.getElementById('hitButton');
const standButton = document.getElementById('standButton');
const aiButton = document.getElementById('aiButton');
const newGameButton = document.getElementById('newGame');
let resultBanner = document.getElementById("result");
let openAILogicBanner = document.getElementById("openAI")

function displayCards (arr) {

    const displayCount = {};
    const flatArray = arr.flat();

    for (var i = 0; i < flatArray.length; i++) {
        let value = flatArray[i].displayVal;
        if (displayCount[value]) {
            displayCount[value]++;
        } else {
            displayCount[value] = 1;
        }
      }

    return displayCount;
}


shuffleButton.addEventListener('click', function() {
  blackjackDeck = shuffle(getDeck(numDeck.value));
  console.log(startGame());
});

newGameButton.addEventListener('click', function() {

  const dealerDv = document.getElementById("rectangle-container-dealer");
  dealerDv.innerHTML = "";
  const playerDv = document.getElementById("rectangle-container-gambler");
  playerDv.innerHTML = "";
  resultBanner.textContent = "";
  hitButton.disabled = false;
  standButton.disabled =false;
  aiButton.disabled = false;
  openAILogicBanner.textContent = ""
  // Refresh the current page
  shownHands.push(dealer.hand);
  shownHands.push(player.hand);
  // // CREATE TWO NEW CardPlayers
  player.reset();
  dealer.reset();

  const displayValueCountsString = Object.entries(displayCards(shownHands))
  .map(([key, value]) => `${key}: ${value}`)
  .join(', ');

  document.getElementById("previousCards").innerHTML = "Previous Cards: " + displayValueCountsString + " .Total cards count: " + shownHands.flat().length;
  document.getElementById('scoreboard').innerText = `Player: ${playerWinner} | Dealer: ${dealerWinner}`;

  startGame();
});


hitButton.addEventListener('click', function() {

  player.drawCard();
  playerScore = calcPoints(player.hand).total;
  showHand(player);

  if (playerScore > 21) {
    resultBanner.textContent = 'You went over 21 - you lose! :(';
    this.disabled = true;
    standButton.disabled = true;
    dealerWinner++;
    return;
  }

  if (player.hand.length === 5) {
    resultBanner.textContent = 'You are under 21 - you win! :)';
    this.disabled = true;
    standButton.disabled = true;
    playerWinner++;
    return;
  }

  console.log(`Player stands at ${playerScore}`);

});


standButton.addEventListener('click', function() {

  let dealerScore = calcPoints(dealer.hand).total;
  let playerScore = calcPoints(player.hand).total;
  while (dealerScore < 21 && dealerShouldDraw(dealer.hand)) {
    dealer.drawCard();
    dealerScore = calcPoints(dealer.hand).total;
    // showHand(dealer);
  }
  if (dealerScore > 21) {
    result = 'Dealer went over 21 - you win! :)';
    resultBanner.textContent = result;
    this.disabled = true;
    hitButton.disabled = true;
    playerWinner++;
    return;
  }
  
  result = determineWinner(playerScore, dealerScore);
  resultBanner.textContent = result;

  console.log(`Dealer stands at ${dealerScore}`);
  this.disabled = true;
  hitButton.disabled = true;
  aiButton.disabled = true;
  return;

}); 

aiButton.addEventListener('click', function() {


  let previousCards = " "

  const flatArray = shownHands.flat();
  flatArray.forEach(obj => {
  previousCards += `${obj.displayVal} of ${obj.suit} ` })
  // const previousCards = Object.entries(displayCards(shownHands))
  // .map(([key, value]) => `${key}: ${value}`)
  // .join(', ');

  const numberCard = 52*numDeck.value
  let dealerHand = dealer.printHand();
  let playerHand = player.printHand();
  const inputText = `I'm playing black jack with ${numDeck.value} decks of ${numberCard} cards.  These cards and their occurences in previous hands are <${previousCards}> from the deck. 
  For this hand, the dealer has {${dealerHand}} and I have {${playerHand}}. The goal is to have higher points than the dealer's hand without going over 21 points. 
  Given the cards have been dealt and the dealer's hand, should I take another card or not? Provide your answer with decision Yes or No and rationale in JSON format`

  console.log(inputText)
  try {

    fetch('http://localhost:3000/api/openai/blackjack', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: inputText }],
          max_tokens: 5000
      })
    })
    .then(function(data) {
      return data.json();
    })
    .then(function(responseJson) {
      console.log(responseJson);
      openAILogicBanner.textContent = responseJson.rationale;
      if (responseJson.decision === 'Yes') {
        openAILogicBanner.style.color = "red";
        hitButton.click();
      } else {
        openAILogicBanner.style.color = "blue";
        standButton.click();
      }
    })

} catch (error) {
    console.error('Error:', error);
    outputDiv.innerHTML = 'An error occurred while fetching data.';
}

});

const startGame = function() {



  dealer.drawCard();
  player.drawCard();
  player.drawCard();
  // dealer.drawCard();

  // shownHands.push(dealer.hand);
  // shownHands.push(player.hand);

  const playWin = calcPoints(player.hand).total == 21 ? true : false
  const dealerWin = calcPoints(dealer.hand).total == 21 ? true : false
  if ( playWin && !dealerWin) {
    resultBanner.textContent = 'Player get black Jack - you win! :)';
    playerWinner++;
    return 'Player get black Jack - you win! :)';
  }

  if (!playWin && dealerWin) {
    resultBanner.textContent = 'Dealer get black Jack - they win :(';
    dealerWinner++;
    return 'Dealer get black Jack - they win :(';
  }

  if (playWin && dealerWin) {
    resultBanner.textContent = 'Both get black Jack - push ¯\_(ツ)_/¯ ';
    return 'Both get black Jack - push!';
  }

  // let playerScore = calcPoints(player.hand).total;
  showHand(player);
  showHand(dealer);

  return;
}
