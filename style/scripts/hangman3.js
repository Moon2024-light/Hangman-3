// Constants
const wordList = ["javascript", "programming", "hangman", "developer", "algorithm"];
const maxAttempts = 6;
const hangmanStages = [
  `
     -----
     |   |
         |
         |
         |
         |
    ========
  `,
  `
     -----
     |   |
     O   |
         |
         |
         |
    ========
  `,
  `
     -----
     |   |
     O   |
     |   |
         |
         |
    ========
  `,
  `
     -----
     |   |
     O   |
    /|   |
         |
         |
    ========
  `,
  `
     -----
     |   |
     O   |
    /|\\  |
         |
         |
    ========
  `,
  `
     -----
     |   |
     O   |
    /|\\  |
    /    |
         |
    ========
  `,
  `
     -----
     |   |
     O   |
    /|\\  |
    / \\  |
         |
    ========
  `,
];

// Main game function
function playHangman() {
  // Randomly select a word from the word list
  const secretWord = wordList[Math.floor(Math.random() * wordList.length)];
  const secretWordArray = secretWord.split("");
  const guessedWord = Array(secretWord.length).fill("_");
  const guessedLetters = []; // Keep track of guessed letters
  let remainingAttempts = maxAttempts;

  alert("Welcome to Hangman! Try to guess the word letter by letter.");

  while (remainingAttempts > 0 && guessedWord.join("") !== secretWord) {
    // Show hangman stage, guessed word, and guessed letters
    alert(
      `${hangmanStages[maxAttempts - remainingAttempts]}\n` +
      `Word: ${guessedWord.join(" ")}\n` +
      `Guessed letters: ${guessedLetters.length > 0 ? guessedLetters.join(", ") : "None"}\n` +
      `Attempts left: ${remainingAttempts}`
    );

    // Get user input
    let userGuess = prompt("Enter a single letter:");

    // Handle cancel button
    if (userGuess === null) {
      alert("Game canceled. Goodbye!");
      return;
    }

    // Validate user input
    userGuess = userGuess.toLowerCase().trim();
    if (userGuess === "") {
      alert("Empty input. Please enter a valid letter.");
      continue;
    }

    if (!/^[a-z]$/.test(userGuess)) {
      alert("Invalid input. Please enter a single letter.");
      continue;
    }

    // Check if letter has already been guessed
    if (guessedLetters.includes(userGuess)) {
      alert("You already guessed that letter. Try a different one.");
      continue;
    }

    // Add the letter to guessed letters
    guessedLetters.push(userGuess);

    // Check if the guessed letter is in the secret word
    if (secretWordArray.includes(userGuess)) {
      alert(`Good job! \"${userGuess}\" is in the word.`);
      // Update the guessed word
      for (let i = 0; i < secretWordArray.length; i++) {
        if (secretWordArray[i] === userGuess) {
          guessedWord[i] = userGuess;
        }
      }
    } else {
      alert(`Sorry, \"${userGuess}\" is not in the word.`);
      remainingAttempts--;
    }
  }

  // Check win/loss condition
  if (guessedWord.join("") === secretWord) {
    alert(
      `Congratulations! You guessed the word: ${secretWord}\n` +
      `${hangmanStages[maxAttempts - remainingAttempts]}`
    );
  } else {
    alert(
      `Game over! You've been hanged.\n` +
      `${hangmanStages[hangmanStages.length - 1]}\n` +
      `The word was: ${secretWord}`
    );
  }
}

// Control replay at the bottom of the file
let playAgain = true;

while (playAgain) {
  playHangman();
  playAgain = confirm("Would you like to play again?");
}
