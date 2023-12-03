const keyboard = document.querySelector('.keyboard'),
      hintText = document.querySelector('.hint-text b'),
      wordDisplay = document.querySelector('.word-display'),
      guessesText = document.querySelector('.guesses-text b'),
      hangmanImage = document.querySelector('.hangman-box img'),
      gameModal = document.querySelector('.game-modal'),
      playAgainBtn = document.querySelector('.play-again');

let currentWord = '',
  wrongGuessCount = 0,
  correctLetter = [];
const maxGuessCount = 6;


const resetGame = () => {
  correctLetter = [];
  wrongGuessCount = 0,
  hangmanImage.src = `assets/images/hangman-${wrongGuessCount}.svg`;
  guessesText.innerText = `${wrongGuessCount} / ${maxGuessCount}`;
  keyboard.querySelectorAll('button').forEach((btn) => btn.disabled = false);
  wordDisplay.innerHTML = currentWord.split('').map(() => `<li class="letter"></li>`).join(''); 
  gameModal.classList.remove('show');
}
/* Creating buttons */
for (let i = 97; i <= 122; ++i) {
  const button = document.createElement('button');
  button.innerText = String.fromCharCode(i);
  keyboard.append(button);
  button.addEventListener('click', (e) => initGame(e.target, String.fromCharCode(i)));
}

function getRandomWord() {
  const {word, hint} = wordList[Math.floor(Math.random() * wordList.length)];
  currentWord = word;
  hintText.textContent = hint;
  wordDisplay.innerHTML = word.split('').map(() => `<li class="letter"></li>`).join(''); 
  resetGame();
}

getRandomWord();

function initGame(button, clickedLetter) {
  if (currentWord.includes(clickedLetter)) {
    [...currentWord].forEach((letter, index) => {
      if(letter === clickedLetter) {
        correctLetter.push(letter);
        wordDisplay.querySelectorAll('li')[index].innerText = letter;
        wordDisplay.querySelectorAll('li')[index].classList.add('guessed');
      }
    })
  } else {
    wrongGuessCount++;
    hangmanImage.src = `assets/images/hangman-${wrongGuessCount}.svg`;
  }
  button.disabled = true;

  guessesText.innerText = `${wrongGuessCount} / ${maxGuessCount}`;

  if (wrongGuessCount === maxGuessCount) {
    return gameOver(false);
  }
  if (correctLetter.length === currentWord.length) {
    return gameOver(true);
  }
}

function gameOver(isVictory) {
  setTimeout(() => {
    const modalText = isVictory ? `You found the word` : 'The correct word was: ';
    gameModal.querySelector('h4').textContent = `${isVictory ? 'Congrats!' : 'Game Over!'}`;
    gameModal.querySelector('img').src = `assets/images/${isVictory ? 'victory' : 'lost'}.gif`;
    gameModal.querySelector('p').innerHTML = `${modalText} <b>${currentWord}</b>`;
    gameModal.classList.add('show');
  }, 300);
} 

playAgainBtn.addEventListener('click', getRandomWord);
