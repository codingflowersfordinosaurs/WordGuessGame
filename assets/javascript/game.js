//Creat an array of Words
const words = ["Bulbasaur","Ivysaur","Venusaur","Charmander","Charmeleon","Charizard","Squirtle","Wartortle","Blastoise","Caterpie","Metapod","Butterfree","Weedle","Kakuna","Beedrill","Pidgey","Pidgeotto","Pidgeot","Rattata","Raticate","Spearow","Fearow","Ekans","Arbok","Pikachu","Raichu","Sandshrew","Sandslash","Nidoran","Nidorina","Nidoqueen","Nidoran","Nidorino","Nidoking","Clefairy","Clefable","Vulpix","Ninetales","Jigglypuff","Wigglytuff","Zubat","Golbat","Oddish","Gloom","Vileplume","Paras","Parasect","Venonat","Venomoth","Diglett","Dugtrio","Meowth","Persian","Psyduck","Golduck","Mankey","Primeape","Growlithe","Arcanine","Poliwag","Poliwhirl","Poliwrath","Abra","Kadabra","Alakazam","Machop","Machoke","Machamp","Bellsprout","Weepinbell","Victreebel","Tentacool","Tentacruel","Geodude","Graveler","Golem","Ponyta","Rapidash","Slowpoke","Slowbro","Magnemite","Magneton","Farfetch'd","Doduo","Dodrio","Seel","Dewgong","Grimer","Muk","Shellder","Cloyster","Gastly","Haunter","Gengar","Onix","Drowzee","Hypno","Krabby","Kingler","Voltorb","Electrode","Exeggcute","Exeggutor","Cubone","Marowak","Hitmonlee","Hitmonchan","Lickitung","Koffing","Weezing","Rhyhorn","Rhydon","Chansey","Tangela","Kangaskhan","Horsea","Seadra","Goldeen","Seaking","Staryu","Starmie","Mr. Mime","Scyther","Jynx","Electabuzz","Magmar","Pinsir","Tauros","Magikarp","Gyarados","Lapras","Ditto","Eevee","Vaporeon","Jolteon","Flareon","Porygon","Omanyte","Omastar","Kabuto","Kabutops","Aerodactyl","Snorlax","Articuno","Zapdos","Moltres","Dratini","Dragonair","Dragonite","Mewtwo","Mew"];

//Choose word randomly
let randomWord = Math.floor(Math.random()*words.length);
let chosenWord = words[randomWord]; //choosing the random word
let rightWord = [];
let wrongWord = [];
// console.log(chosenWord); logging the word to the console
let underScore = [];

//DOM manipulation
let docUnderScore = document.getElementsByClassName('underscore');
let docRightGuess = document.getElementsByClassName('rightGuess');
let docWrongGuess = document.getElementsByClassName('wrongGuess');


// Testing
console.log(chosenWord);

//Create underscore based on length of word
//generate underscores based on the length of the array
//so create a for loop
let generateUnderscore = () => {
  for (let i = 0; i < chosenWord.length; i++) {
    underScore.push('_'); //what are we pushing? underscores!
    docUnderScore[0].innerHTML = underScore.join('');
  }
  return underScore;
}
console.log(generateUnderscore()); 

//Get users guess
//have to capture the user's guess....have to do an event
document.addEventListener('keypress', (event) => {
  // console.log(event);
  //convert key code into a letter....js keycode....
  // let keycode = event.keyCode; //javascript keyCode
  // // console.log(keycode);
  // //next step, need to convert that into a string
  // let keyword = String.fromCharCode(keycode);
  // console.log(keyword);
  let keyword = String.fromCharCode(event.keyCode); //combo of line 26 and 29
  //compare it to the word that was chosen
  //using indexOf method..tells you if the string youre looking for exist, give you a number greater than -1
  //if user guess is right
  if (chosenWord.indexOf(keyword) > -1) {
  // add to right words array
    rightWord.push(keyword);  
    //replace underscore with right letter
    underScore[chosenWord.indexOf(keyword)] = keyword;
    docUnderScore[0].innerHTML = underScore.join(' ');
    docRightGuess[0].innerHTML = rightWord;
    
    //check to see if user word matches guesses
    if (underScore.join('') === chosenWord) {
      alert('You win!');
    }
  }

    // console.log(underScore); //cool, it works
    // console.log(rightWord);
    // // console.log(true);
  else {
    wrongWord.push(keyword);
    docWrongGuess[0].innerHTML = wrongWord;

    // console.log(wrongWord);//cool, it works
  }
  //need to check if all underscores have been filled
  // if (underScore.join) = keyword;
  // alert("you win");

});

underScore[0].innerHTML = generateUnderscore().join(' ');

//Check if guess is right

//If right, push to right array

//If wrong, push to wrong array