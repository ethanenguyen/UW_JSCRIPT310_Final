* This is a simple Black Jack game with an option to "ask" OpenAI for recommendation on whether to take a card or not.  This is to demonstrate the ability of ChatGPT to undestand the rules of Black Jack and basic probability.  When an user "asks" OpenAI for recommendation, the player's hand, dealer's hand and the previously shown cards are passed to OpenAI. OpenAI will provide the recommendation to "Hit" or "Stand" with rationale for the recommendation. The author is trying to get a better understanding of OpenAI's ability to reason and basic knowledge of proability  

* The game can be played manually with "Hit" and "Stand" 

* To communicate to ChatGPT a UAT is needed.  If UAT is not provided, the code can connect to a "fake" ChatGPT endpoint which will randomly generates "Hit" or "Stand"

* When there is no cards left to draw, the screen will slowly turn to dark 

* Steps to start the APP
  * Update the fetch-api-key.js with appropriate OpenAI information (Or can leave it as is if connecting to the "fake" endpoint)
  * Start the "server.js" by running "node server.js"
  * Run blackjack.html to start the APP
  * Click on Shuffle & Deal to start the game


![image](https://github.com/user-attachments/assets/fcd87c7a-7aeb-485d-bce0-60fddf68860b)
