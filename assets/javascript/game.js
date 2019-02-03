// ------------------------------------ PSEUDO CODE: IN ALL CAPS ----------------------------------------
// GRAB REFERENCE TO DOM ELEMENTS (1)
// using '$' notation in front; that way you know what's a DOM element and what's not in JS
var $newGameButton = document.getElementById('new-game-button');
var $placeholders = document.getElementById('placeholders');
var $guessedLetters = document.getElementById('guessed-letters');
var $guessesLeft = document.getElementById('guesses-left');
var $wins = document.getElementById('wins');
var $losses = document.getElementById('losses');

// CREATE VARIABLES FOR GAME (2)
// WORDBANK, WINS, LOSSES, PICKED WORD, GUESSES LEFT, GAME RUNNING, PICKED WORD PLACEHOLDER, GUESSED LETTER BANK, INCORRECT LETTER BANK
var wordBank = ["Bulbasaur","Ivysaur","Venusaur","Charmander","Charmeleon","Charizard","Squirtle","Wartortle","Blastoise","Caterpie","Metapod","Butterfree","Weedle","Kakuna","Beedrill","Pidgey","Pidgeotto","Pidgeot","Rattata","Raticate","Spearow","Fearow","Ekans","Arbok","Pikachu","Raichu","Sandshrew","Sandslash","Nidoran","Nidorina","Nidoqueen","Nidoran","Nidorino","Nidoking","Clefairy","Clefable","Vulpix","Ninetales","Jigglypuff","Wigglytuff","Zubat","Golbat","Oddish","Gloom","Vileplume","Paras","Parasect","Venonat","Venomoth","Diglett","Dugtrio","Meowth","Persian","Psyduck","Golduck","Mankey","Primeape","Growlithe","Arcanine","Poliwag","Poliwhirl","Poliwrath","Abra","Kadabra","Alakazam","Machop","Machoke","Machamp","Bellsprout","Weepinbell","Victreebel","Tentacool","Tentacruel","Geodude","Graveler","Golem","Ponyta","Rapidash","Slowpoke","Slowbro","Magnemite","Magneton","Farfetch'd","Doduo","Dodrio","Seel","Dewgong","Grimer","Muk","Shellder","Cloyster","Gastly","Haunter","Gengar","Onix","Drowzee","Hypno","Krabby","Kingler","Voltorb","Electrode","Exeggcute","Exeggutor","Cubone","Marowak","Hitmonlee","Hitmonchan","Lickitung","Koffing","Weezing","Rhyhorn","Rhydon","Chansey","Tangela","Kangaskhan","Horsea","Seadra","Goldeen","Seaking","Staryu","Starmie","Mr. Mime","Scyther","Jynx","Electabuzz","Magmar","Pinsir","Tauros","Magikarp","Gyarados","Lapras","Ditto","Eevee","Vaporeon","Jolteon","Flareon","Porygon","Omanyte","Omastar","Kabuto","Kabutops","Aerodactyl","Snorlax","Articuno","Zapdos","Moltres","Dratini","Dragonair","Dragonite","Mewtwo","Mew"];
var wins = 0;
var losses = 0;
var guessesLeft = 7;
var gameRunning = false;
var pickedWord = '';
var pickedWordPlaceholderArr = []; // set to array bc we want to do pushes on it
var guessedLetterBank = []; // set to array bc we want to do pushes on it
var incorrectLetterBank = []; // set to array bc we want to do pushes on it

// NEW GAME FUNCTION TO RESET ALL STATS (3)
// PICK NEW WORD AND CREATE PLACEHOLDERS
function newGame() {
  // reset all game info
  gameRunning = true; // don't want game logic to run if game is not running; don't want it to run against user; only true when we hit New Game
  guessesLeft = 7;
  guessedLetterBank = [];
  incorrectLetterBank = [];
  pickedWordPlaceholderArr = [];

  // pick a new word
  pickedWord = wordBank[Math.floor(Math.random() * wordBank.length)];

  // create placeholders out of new pickedWord
  for (var i = 0; i < pickedWord.length; i++) {
    // check to see what it is
    if (pickedWord[i] === ' ') {
      pickedWordPlaceholderArr.push(' ');
    } else {
      pickedWordPlaceholderArr.push('_');
    }
  }
  // write all new game info to DOM... resetting guesses left, new place holders show to diff words; so that person knows that's what the word they're trying to get; clearing our the bank with incorrect guesses
  $guessesLeft.textContent = guessesLeft; // reset my guesses left; want to show 7 at the new game; not what previous game had
  $placeholders.textContent = pickedWordPlaceholderArr.join(''); // turn it back into a string, that way it doesn't print out with all of the comas; new place holder with NEW word
  $guessedLetters.textContent = incorrectLetterBank; // more just if i'm playing multiple games in a row, to clear that bank
}

// LETTERGUESS FUNCTION (5)
// TAKES IN THE LETTER YOU PRESSED AND SEES IF IT'S IN THE SELECTED WORD
function letterGuess(letter) {
  console.log(letter); // make sure it works

  if (gameRunning === true && guessedLetterBank.indexOf(letter) === -1) { // returns -1, means we haven't guessed the letter yet
    // run game logic
    guessedLetterBank.push(letter); // makes a note that we've guessed it already

    // check if guessed letter is in my picked word
    for (var i = 0; i < pickedWord.length; i++) {
      // convert both values to lower case so i can compare them correctly
      if (pickedWord[i].toLowerCase() === letter.toLowerCase()) { // making sure to check apples with apples (bc in wordBank there are capital letters)
        // if a match, swap out that character in the placeholder with the actual letter
        pickedWordPlaceholderArr[i] = pickedWord[i]; // pickedWord[i] bc if guessed lowercase but it's uppercase you'll just replace it with what's in picked word
      } // at each iteration we check to see if that word at that character is the same letter user gueses convert; if true grab pickedwordplacedholder and reassign its value to be whatever pickedWord at i ([i]) is 
    }
    // write that back to the DOM
    $placeholders.textContent = pickedWordPlaceholderArr.join('');
    // pass letter into our checkIncorrect function; taking event.key and passing it through this ^ function and its logic
    checkIncorrect(letter);
  } 
  else {
    if (!gameRunning) { // ! says if it's not running; like the opposite --> shorthand for gameRunning === false;
      alert("The game isn't running, click on the New Game button to start over.");
    } else {
      alert("You've already guessed this letter, try a new one!");
    }
  }
}

// CHECKINCORRECT(LETTER)
function checkIncorrect(letter) {
  // check to see if letter DIDN'T make it into our pickedWordPlaceholder
  // therefore, incorrect guess
  if (pickedWordPlaceholderArr.indexOf(letter.toLowerCase()) === -1 &&
  pickedWordPlaceholderArr.indexOf(letter.toUpperCase()) === -1) { // need to check both bc we have both capital and lowercase letters
    // decrement guesses
    guessesLeft--;
    // add incorrect letter to incorrectLetterBank
    incorrectLetterBank.push(letter);
    // write new bank of incorrect letters guess to DOM
    $guessedLetters.textContent = incorrectLetterBank.join(' '); 
    // write new amount of guesses left to DOM
    $guessesLeft.textContent = guessesLeft;
  }
  checkLoss();
}

// CHECKLOSS
function checkLoss() { // don't take arguments bc just checking on globally created variables
  if (guessesLeft === 0) {
    losses++;
    gameRunning = false; // so, tap another letter then game over
    $losses.textContent = losses; // write it to the DOM
    $placeholders.textContent = pickedWord; // fills in the blanks if you lose
  }
  checkWin();
}

// CHECKWIN
function checkWin() {
  if (pickedWord.toLowerCase() === pickedWordPlaceholderArr.join('').toLowerCase()) { // means like, if all identical then you win
    wins++;
    gameRunning = false;
    $wins.textContent = wins;
  }
}

// ADD EVENT LISTENER FOR NEW GAME BUTTON (4)
$newGameButton.addEventListener('click', newGame);

// ADD ONKEYUP EVEN TO TRIGGER LETTERGUESS (6)
document.onkeyup = function(event) {
  if (event.keyCode >= 65 && event.keyCode <= 90) { // 65 keycode for 'a'; 90 keycode for 'z'; only if it's a to z
    letterGuess(event.key); // event.key is the actual letter
  } // only pass it through onlly if it's a to z; if it's true then i run my letterguess fxn (pass the actual key from event and pass it up to fxn letterGuess(letter) and everything goes through there)
}