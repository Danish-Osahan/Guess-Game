const inputs = document.querySelector(".inputs");
let resetbutton = document.querySelector(".reset-btn");
let hint = document.querySelector(".hints span");
let typinginput = document.querySelector(".typing-input");
let wrongletters = document.querySelector(".wrong-letters span");
let guessesleft = document.querySelector(".guess-left span");
let word,
  maxguesses,
  incorrects = [],
  correctwords = [];
function randomword() {
  // Getting random object from wordlist
  let randobj = wordlist[Math.floor(Math.random() * wordlist.length)];
  incorrects = [];
  correctwords = [];
  word = randobj.word;
  maxguesses = 5;
  guessesleft.innerText = maxguesses;
  wrongletters.innerHTML = incorrects;
  // console.log(word);
  hint.innerHTML = randobj.hint;

  let html = "";
  for (let index = 0; index < word.length; index++) {
    html += ' <input type="text" disabled />';
    inputs.innerHTML = html;
  }
}
function initgame(event) {
  let key = event.target.value;
  if (
    key.match(/^[a-zA-z]+$/) &&
    !incorrects.includes(` ${key}`) &&
    !correctwords.includes(key)
  ) {
    // console.log(key);
    if (word.includes(key)) {
      for (let i = 0; i < word.length; i++) {
        if (word[i] === key) {
          correctwords.push(key);
          inputs.querySelectorAll("input")[i].value = key;
         setTimeout(()=>{
          if(correctwords.length===word.length){
            alert(`You have Found The word '${word.toUpperCase()}' 🥳`)
          }
         })
        }
      }
    } else {
      maxguesses--;
      setTimeout(()=>{
        if(maxguesses==0){
          alert(' Game Over😈 You dont have any Guesses left!');
          for (let i = 0; i < word.length; i++) {
            
            inputs.querySelectorAll("input")[i].value =word[i];
          }
        }
      })
      incorrects.push(` ${key}`);
    }
    guessesleft.innerText = maxguesses;
    wrongletters.innerHTML = incorrects;
  }
  // incorrects.pop()
  typinginput.value = "";
}

randomword();
resetbutton.addEventListener("click", randomword);
typinginput.addEventListener("input", initgame);
document.addEventListener("keydown", () => typinginput.focus());
