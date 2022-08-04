const words = [
  'bananas',
  'grapes',
  'carousel',
  'milkshake',
  'javascript',
  'limousine',
  'chocolate',
  'programming',
  'meatloaf',
  'ukulele',
  'mango'
]

let wins = 0
let losses = 0
let currentWord

class Word {
  constructor(word) {
    this.word = word
    this.displayWord = word.replaceAll(/[\w]/g, "_")
    this.remainingGuesses = 10
    this.incorrectLetters = []
    this.correctLetters = []
  }

  // implement the guessLetter function:
  guessLetter(letter) {
    console.log(letter)
    if (this.correctLetters.includes(letter) || (this.incorrectLetters.includes(letter))) {
      return
    }
    if (this.word.includes(letter)) {
      console.log("word contains letter");
      this.correctLetters.push(letter);
      let correctGuess = [];
      for (let i = 0; i < this.word.length; i++) {
        if (this.word[i] === letter) {
          correctGuess.push(i);
        }
      }
    let updatedDisplayWord = ''
    for (let index = 0; index < this.displayWord.length; index++) {
      const element = this.displayWord[index];
    if (correctGuess.includes(index)) {
        updatedDisplayWord = updatedDisplayWord + letter
      } else {
        updatedDisplayWord = updatedDisplayWord  + element
      }
    }
    this.displayWord = updatedDisplayWord
    } else {
      this.incorrectLetters.push(letter)
      this.remainingGuesses = this.remainingGuesses -1 
    }
  }

  // implement the updateScreen function:
  updateScreen() {
    let remainingGuesses = document.getElementById('remaining-guesses')
    remainingGuesses.innerHTML = this.remainingGuesses
    let incorrectLetters = document.getElementById('incorrect-letters')
    incorrectLetters.innerHTML = this.incorrectLetters
    let wordToGuess = document.getElementById('word-to-guess')
    wordToGuess.innerHTML = this.displayWord
  }

  // implement the isGameOver function:
  isGameOver() {
    if (this.remainingGuesses === 0 || this.displayWord === this.word) {
      return true
    } else {
      return false
    }
  }

  // implement the getWinOrLoss function:
  getWinOrLoss() {
    if (this.word === this.displayWord && this.remainingGuesses > 0) {
      return 'win'
    } else if(this.displayWord !== this.word && this.remainingGuesses <= 0) {
      return 'loss'
    } else {
      return null
    }
  }
}

function newGame() {
  const randomWord = words[Math.floor(Math.random() * words.length)]
  currentWord = new Word(randomWord)
  console.log(currentWord)
  currentWord.updateScreen()
}

document.onkeyup = function(e) {
  const pressedKey = e.key.toLowerCase()
  // early exit for non-letter key presses
  if (!/^[a-z]{1}$/g.test(pressedKey)) return

  // pass in guessed letter to word obj
  currentWord.guessLetter(pressedKey)
  // allow word obj to update screen
  currentWord.updateScreen()
  // check if game is over
  const gameOver = currentWord.isGameOver()
console.log(gameOver)
  // if game is over, update wins/losses and start new game
  if (gameOver) {
    const previousWord = document.getElementById('previous-word')
    const winDisplay = document.getElementById('wins')
    const lossDisplay = document.getElementById('losses')
    previousWord.textContent = currentWord.word
    const result = currentWord.getWinOrLoss()
    if (result === 'win') {
      wins++
      winDisplay.textContent = wins
    } else if (result === 'loss') {
      losses++
      lossDisplay.textContent = losses
    }
    newGame()
  }
}

newGame()