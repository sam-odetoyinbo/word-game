// Define an array of words to guess
const words = ["JAVASCRIPT","COMPUTER","PUZZLE","DEVELOP","GAMING","LEARNING","MOBILE","PYTHON","CODING",
"CHALLENGE","WEB","PROGRAM","QUIZ","FUN","HTML","CSS","JAVA","NODEJS","DATABASE","COOL"];

// Select elements
const wordElement = document.getElementById("word");
const messageElement = document.getElementById("message");
const resetButton = document.getElementById("reset-button");

let selectedWord = words[Math.floor(Math.random() * words.length)];
let guessedWord = Array(selectedWord.length).fill("_");
let incorrectEntries = 0; // Track the number of incorrect entries

// Display the initial word
updateWordDisplay();

// Add event listener for keyboard input
document.addEventListener("keyup", (event) => {
    if (event.key.match(/^[a-zA-Z]$/i) && guessedWord.indexOf(event.key.toUpperCase()) === -1) {
        checkLetter(event.key.toUpperCase());
    }
});

// Add event listener for the reset button
resetButton.addEventListener("click", () => {
    selectedWord = words[Math.floor(Math.random() * words.length)];
    guessedWord = Array(selectedWord.length).fill("_");
    updateWordDisplay();
    messageElement.innerHTML = ""; // Clear the message element
    resetButton.disabled = true;
    incorrectEntries = 0;
});

// Function to check if the letter is in the word
function checkLetter(letter) {
    let letterFound = false;

    for (let i = 0; i < selectedWord.length; i++) {
        if (selectedWord[i] === letter) {
            guessedWord[i] = letter;
            letterFound = true;
        }
    }

    if (!letterFound) {
        incorrectEntries++;

        if (incorrectEntries >= 12) {
            messageElement.innerHTML = `You lose! 😢 The correct word was "${selectedWord}"`; // Sad emoji for losing
            disableInput();
            resetButton.disabled = false;
            return;
        }
    }

    updateWordDisplay();

    if (letterFound) {
        if (guessedWord.join("") === selectedWord) {
            messageElement.innerHTML = "You win! 😄"; // Happy emoji for winning
            disableInput();
            resetButton.disabled = false;
        }
    } else {
        messageElement.innerHTML = "Try again!";
    }
}

// Function to update the word display
function updateWordDisplay() {
    wordElement.textContent = guessedWord.join(" ");
}

// Function to disable keyboard input
function disableInput() {
    document.removeEventListener("keyup", checkLetter);
}
