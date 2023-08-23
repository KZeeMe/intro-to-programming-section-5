const guessInput = document.getElementById("guess");
const submitButton = document.getElementById("submit");
const resetButton = document.getElementById("reset");
const messages = document.getElementsByClassName("message");
const tooHighMessage = document.getElementById("too-high");
const tooLowMessage = document.getElementById("too-low");
const maxGuessesMessage = document.getElementById("max-guesses");
const numberOfGuessesMessage = document.getElementById("number-of-guesses");
const correctMessage = document.getElementById("correct");
const error = document.getElementById("error");

let targetNumber;
// changed from const to let
let attempts = 0;
// changed from const to let
let maxNumberOfAttempts = 5;

// Returns a random number from min (inclusive) to max (exclusive)
// Usage:
// > getRandomNumber(1, 50)
// <- 32
// > getRandomNumber(1, 50)
// <- 11
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function checkGuess() {
  // Get value from guess input element

  const guess = parseInt(guessInput.value, 10);
  /*
    if (guess < 1) {
      error.innerHTML = `Must be greater than 0.`;
    } else if (guess > 99) {
      error.innerHTML = `Must be less than 100.`;
    }
  } catch {
    error.innerHTML = `Please only enter numbers and restart the game.`;
  }
  
  */
  //attempts = attempts + 1;

  hideAllMessages();

  if (guess === targetNumber) {
    attempts++;
    numberOfGuessesMessage.style.display = "";

    numberOfGuessesMessage.innerHTML = `You made ${attempts} guesses`;

    correctMessage.style.display = "";

    submitButton.disabled = true;
    guessInput.disabled = true;
  }

  if (guess !== targetNumber) {
    attempts++;
    if (guess < targetNumber) {
      tooLowMessage.style.display = "";
    } else {
      // adjusted message to be the too high message if number guessed was too high
      tooHighMessage.style.display = "";
    }

    //changed const to let

    let remainingAttempts = maxNumberOfAttempts - attempts;

    numberOfGuessesMessage.style.display = "";

    if (attempts < 4) {
      numberOfGuessesMessage.innerHTML = `You guessed ${guess}. <br> ${remainingAttempts} guesses remaining`;
    } else if (attempts === 4) {
      numberOfGuessesMessage.innerHTML = `You guessed ${guess}. <br> ${remainingAttempts} guess remaining`;
    } else {
      numberOfGuessesMessage.innerHTML = `You guessed ${guess}. <br> ${remainingAttempts} guesses remaining`;
      submitButton.disabled = true;
      guessInput.disabled = true;
      tooLowMessage.style.display = "none";
      tooHighMessage.style.display = "none";
      maxGuessesMessage.style.display = "";
      //numberOfGuessesMessage.style.display = "none";
    }
  }
  /*
  if (attempts === maxNumberOfAttempts) {
    submitButton.disabled = true;
    guessInput.disabled = true;
    maxGuessesMessage.innerHTML = `You've run out of guesses. Please press the Reset button to play again.`;
  }
*/
  guessInput.value = "";

  resetButton.style.display = "";
  //attempts++;
}

function hideAllMessages() {
  // changed elementIndex from <= to <
  for (let elementIndex = 0; elementIndex < messages.length; elementIndex++) {
    messages[elementIndex].style.display = "none";
  }
}

function setup() {
  // Get random number
  targetNumber = getRandomNumber(1, 100);
  console.log(`target number: ${targetNumber}`);

  // Reset number of attempts
  maxNumberOfAttempts = 5;
  attempts = 0;

  // Enable the input and submit button
  //fixed typo in disabled for submitButton
  submitButton.disabled = false;
  guessInput.disabled = false;

  hideAllMessages();
  resetButton.style.display = "none";
}

submitButton.addEventListener("click", checkGuess);
resetButton.addEventListener("click", setup);

setup();
