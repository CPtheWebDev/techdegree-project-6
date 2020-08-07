// Global Variables
const overlay = document.querySelector('.start');
const letterList = document.querySelector('#phrase ul');
const qwerty = document.querySelector('#qwerty');
const startButton = document.querySelector('.btn__reset');
let missed = 0;

// Phrases
const phrases = [
    'Body and Soul',
    'Burst Your Bubble',
    'Word of Mouth',
    'Under the Weather',
    'Trial by Fire'
];

function getRandomPhraseAsArray(arr) {
    // Selects a random string from an array and seperates the string into an array for each character
    const randomPhraseIndex = Math.floor(Math.random() * arr.length);
    const phraseToSplit = arr[randomPhraseIndex];
    const numOfCharacters = phraseToSplit.length;
    let arrayOfCharacters = [];
    for(let i = 0; i < numOfCharacters; i++) {
      arrayOfCharacters.push(phraseToSplit.charAt(i));
    }
    return arrayOfCharacters;
}

function addPhraseToDisplay(arr, list) {
    // Creates a list item for each character in an array of letters and adds it to "#phrase ul"
    // Also adds the class "letter" to each letter character and "space" to each space character
    for (let i = 0; i < arr.length; i++) {
      const newLi = document.createElement('li');
      newLi.textContent = arr[i];
      if (arr[i] !== ' ') {
        newLi.className = "letter"
      } else {
        newLi.className = "space"
      }
      list.appendChild(newLi);
    }
}

// Start Game
startButton.addEventListener('click', () => {
  // Clears overlay and generates a random phrase while clearing any content from previous games
  missed = 0;
  letterList.textContent = "";
  addPhraseToDisplay(getRandomPhraseAsArray(phrases), letterList);
  const key = document.querySelectorAll(".chosen");
  for (let i = 0; i < key.length; i++) {
    key[i].className = "";
    key[i].disabled = false;
  }
  document.querySelector('ol').innerHTML = `
    <li class="tries"><img src="images/liveHeart.png" alt ="liveHeart" height="35" width="30"></li>
    <li class="tries"><img src="images/liveHeart.png" alt ="liveHeart" height="35" width="30"></li>
    <li class="tries"><img src="images/liveHeart.png" alt ="liveHeart" height="35" width="30"></li>
    <li class="tries"><img src="images/liveHeart.png" alt ="liveHeart" height="35" width="30"></li>
    <li class="tries"><img src="images/liveHeart.png" alt ="liveHeart" height="35" width="30"></li>
  `
  overlay.className = "";
  overlay.style.display = "none";
});

function checkLetter(letterPressed, totalLetters) {
  // Checks if a letter pressed matches a letter of the phrase. 
  // If there is a match reveal the letter and return the value, otherwise return null.
  let match = null;
  for (let i = 0; i < totalLetters.length; i++) {
    const letterChecked = totalLetters[i];
    if (letterChecked.textContent.toLowerCase() === letterPressed) {
      letterChecked.className += " show";
      match = letterChecked;
    }
  }
  return match;
}

function endGame(winLoss, headline, buttonContent) {
  // Changes overlay content based on a win or loss
  overlay.style.display = "flex";
  overlay.className = winLoss;
  document.querySelector(".title").textContent = headline;
  startButton.textContent = buttonContent;
}

function checkWin(totalLetters) {
  // Check if the user has won the game and changes the display
  const lettersRevealed = document.querySelectorAll(".show");
  if (totalLetters.length === lettersRevealed.length) {
    endGame("win", "You Win", "Play Again");
  } else if (missed > 4) {
    endGame("lose", "Sorry, You Lost.", "Try Again")
  }
}

qwerty.addEventListener('click', (e) => {
  // Listens for a click on qwery buttons and prevents user from clicking the same button twice
  // Also decreases lives when a button that does not match the phrase and updates missed counter
  const totalLetters = document.querySelectorAll(".letter");
  const eventTarget = e.target;
  const letterFound = checkLetter(eventTarget.textContent, totalLetters);
  if (eventTarget.tagName === 'BUTTON') {
      eventTarget.className = "chosen";
      eventTarget.disabled = true;
    if (letterFound === null) {
    document.querySelector('ol').lastElementChild.remove();
    missed++;
    }
  }
  checkWin(totalLetters);
});