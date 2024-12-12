/**
 * Returns an array of 52 Cards
 * @returns {Array} deck - a deck of cards
 */

const isNumberCard = function(number)
{
  return  (number >= 2 && number <= 10) ? number : 0 ;
}

const getDeck = (numberDeck) => {
  const deck = []
  const suits = ['hearts', 'spades', 'clubs', 'diamonds']

  for (let i=0; i < numberDeck; i ++) {

    for (let index = 0; index < suits.length; index++) {
      // create an array of 13 objects
      for (let j = 2; j <= 14; j++) {
        // for each loop, push a card object to the deck

        // special cases for when j > 10
        let displayVal = ''

        switch (j) {
          case 11:
            displayVal = 'Ace'
            break
          case isNumberCard(j):
            displayVal = j
            break
          case 12:
            displayVal = 'Jack'
            break
          case 13:
            displayVal = 'Queen'
            break
          case 14:
            displayVal = 'King'
            break
        }

        const card = {
          val: j,
          displayVal: displayVal,
          suit: suits[index],
        }

        if (displayVal === 'Ace') {
          card.val = 11
        }

        if (displayVal === 'Jack' || displayVal === 'Queen' || displayVal === 'King') {
          card.val = 10
        }

        deck.push(card)
      }
    }

}
  return deck;
}

// Shuffle the deck using Fisher-Yates algorithm
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }

  return array;
}

// CHECKS
const deck = getDeck(1)
console.log(deck[Math.floor(Math.random() * (52 - 1 + 1) + 1)])
console.log(`Deck length equals 52? ${deck.length === 52}`)

const randomCard = deck[Math.floor(Math.random() * 52)]

const cardHasVal =
  randomCard && randomCard.val && typeof randomCard.val === 'number'
console.log(`Random card has val? ${cardHasVal}`)

const cardHasSuit =
  randomCard && randomCard.suit && typeof randomCard.suit === 'string'
console.log(`Random card has suit? ${cardHasSuit}`)

const cardHasDisplayVal =
  randomCard &&
  randomCard.displayVal &&
  typeof randomCard.displayVal === 'string'
console.log(`Random card has display value? ${cardHasDisplayVal}`)
