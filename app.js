// Game Variables
const qwerty = document.querySelector('#qwerty');
const phrase = document.querySelector('#phrase');
let missed = 0;

// Hide Start Screen
const overlay = document.querySelector('.start');
const startButton = document.querySelector('.btn__reset');
startButton.addEventListener('click', () => {
  overlay.style.display = "none";
});

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

function addPhraseToDisplay(arr) {
    // Creates a list item for each character in an array of letters and adds it to "#phrase ul"
    // Also adds the class "letter" to each character that is not a space
    const letterList = document.querySelector('#phrase ul');
    for (let i = 0; i < arr.length; i++) {
      const newLi = document.createElement('li');
      newLi.textContent = arr[i];
      if (arr[i] !== ' ') {
          newLi.className = "letter"
      }
      letterList.appendChild(newLi);
    }
}

const phraseArray = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(phraseArray);

function checkLetter(letterPressed) {
  // Checks if a letter pressed matches a letter of the phrase. 
  // If there is a match reveal the letter and return the value, otherwise return null.
  const letters = document.querySelectorAll(".letter");
  let match = null;
  for (let i = 0; i < letters.length; i++) {
    const letterChecked = letters[i];
    if (letterChecked.textContent.toLowerCase() === letterPressed) {
      letterChecked.className += " show";
      match = letterChecked;
    }
  }
  return match;
}

function checkWin () {
  // Check if the user has won the game and changes the display
  const totalLetters = document.querySelectorAll(".letter");
  const lettersRevealed = document.querySelectorAll(".show");
  const headline = document.querySelector(".title");
  if (totalLetters.length === lettersRevealed.length) {
    overlay.style.display = "flex";
    overlay.className += " win";
    headline.textContent = "You Win!";
  } else if (missed > 4) {
    overlay.style.display = "flex";
    overlay.className += " lose";
    headline.textContent = "Sorry, You Lost.";
  }
}

qwerty.addEventListener('click', (e) => {
  // Listens for a click on qwery buttons and prevents user from clicking the same button twice
  // Also decreases lives when a button that does not match the phrase and updates missed counter
  const eventTarget = e.target;
  const letterFound = checkLetter(eventTarget.textContent);
  if (eventTarget.tagName === 'BUTTON') {
      eventTarget.className = "chosen";
      eventTarget.disabled = true;
    if (letterFound === null) {
    document.querySelector('ol').lastElementChild.remove();
    missed++;
    }
  }
  checkWin();
});