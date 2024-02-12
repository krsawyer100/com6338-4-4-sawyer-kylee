var words = [
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

var wordToGuessEl = document.getElementById('word-to-guess')
var previousWordEl = document.getElementById('previous-word')
var incorrectLettersEl = document.getElementById('incorrect-letters')
var remainingGuessesEl = document.getElementById('remaining-guesses')
var scoreEl = document.getElementById('score')
var winsEl = document.getElementById('wins')
var lossesEl = document.getElementById('losses')

winsEl.textContent = 0
lossesEl.textContent = 0

var word
var underscores

//needs to restart game without deleting wins and losses information once completed
function reset() {
  remainingGuessesEl.textContent = 10
  incorrectLettersEl.textContent = ''

//choose a word at random and display as underscores
  word = words[Math.floor(Math.random() * words.length)]
  underscores = ''

  for (var i = 0; i < word.length; i++) { //generating underscores for each letter in the random word 
    underscores = underscores + '_' //add 1 '_' each loop
  }

  wordToGuessEl.textContent = underscores
}

reset()

//grab user keystrokes and check if included in word
document.body.onkeyup = function(e) {
  var key = e.key.toLowerCase()
  var completed = true
  var incorrectLetters = incorrectLettersEl.textContent
  if ((key >= 'a') && ('z' >= key) && (key.length === 1)) {
    //track and ignore repeated letters
    var isGuessed = false
    for (var i = 0; i < incorrectLetters.length; i++) {
      if (incorrectLetters[i] === key) {
        isGuessed = true
      }
    }
    var wordToGuess = wordToGuessEl.textContent
    for (var i = 0; i < wordToGuess.length; i++) {
      if (wordToGuess[i] === key) {
        isGuessed = true
      }
    } 

    if (!isGuessed) {
      //this is where the function will check for correct or incorrect letters
      var isInWord = false
      for (var i = 0; i < word.length; i++) {
        if (word[i] === key) {
          //correct replace underscore
          isInWord = true
          
          var s = wordToGuessEl.textContent
          wordToGuessEl.textContent = s.substring(0,i) + key + s.substring(i+1,s.length)
        }
      }
    if (!isInWord) {
      if (incorrectLettersEl.textContent.length > 0) {
        incorrectLettersEl.textContent += ', '
      }
      incorrectLettersEl.textContent = incorrectLettersEl.textContent + key
      remainingGuessesEl.textContent = remainingGuessesEl.textContent - 1
    }
    }
  }
  for (var i = 0; i < wordToGuessEl.textContent.length; i++) {
    if (wordToGuessEl.textContent[i] === '_') {
      completed = false
    }
  }
  //display number of wins
  if (completed && remainingGuessesEl.textContent >= 0) {
    winsEl.textContent = parseInt(winsEl.textContent) + 1
    previousWordEl.textContent = word
    reset()
  }
  //display number of losses
  if (!completed && remainingGuessesEl.textContent < 1) {
    lossesEl.textContent = parseInt (lossesEl.textContent) + 1
    previousWordEl.textContent = word
    reset()
  }
}