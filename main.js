/*
  Advices
  - Always Check The Console
  - Take Your Time To Name The Identifiers
  - DRY

  Steps To Create The Project
  [01] Create HTML Markup
  [02] Add Styling And Separate From Logic
  [03] Create The App Logic
  ---- [01] Add Levels
  ---- [02] Show Level And Seconds
  ---- [03] Add Array Of Words
  ---- [04] ِAdd Start Game Button
  ---- [05] Generate Upcoming Words
  ---- [06] Disable Copy Word And Paste Event + Focus On Input
  ---- [07] Start Play Function
  ---- [08] Start The Time And Count Score
  ---- [09] Add The Error And Success Messages
  [04] Your Trainings To Add Features
  ---- [01] Save Score To Local Storage With Date
  ---- [02] Choose Levels From Select Box
  ---- [03] Break The Logic To More Functions
  ---- [04] Choose Array Of Words For Every Level
  ---- [05] Write Game Instruction With Dynamic Values
  ---- [06] Add 3 Seconds For The First Word
*/

// Array Of Words
// Array Of Words
const words = {
  Easy: [
    "Hello",
    "Code",
    "Town",
    "Testing",
    "Funny",
    "Task",
    "Roles",
    "Test",
    "cat", 
    "sun", 
    "pen", 
    "car", 
    "dog", 
    "hat", 
    "fish", 
    "tree", 
    "ball",
    "book",
    "bird", 
    "rain", 
    "chair", 
    "hand",
    "door", 
    "moon", 
    "star", 
    "sky", 
    "shoe", 
    "nose",
    "leaf", 
    "cup", 
    "bed", 
    "cake", 
    "bus", 
    "egg", 
    "farm", 
    "park", 
    "road", 
    "wall",
    "frog", 
    "kite", 
    "lamp", 
    "map", 
    "mat", 
    "apple", 
    "toy", 
    "boat", 
    "lake", 
    "cow",
    "bell", 
    "name", 
    "song", 
    "flower", 
    "sand", 
    "ice", 
    "juice", 
    "coat", 
    "rope", 
    "bread",
    "hair", 
    "mall", 
    "pipe", 
    "ring", 
    "note", 
    "wind", 
    "tooth",
    "milk", 
    "gift", 
    "game",
    "box", 
    "hotel", 
    "dress", 
    "fish"
  ],
  Normal: [
    "Programming",
    "Javascript",
    "Country",
    "Youtube",
    "Linkedin",
    "Twitter",
    "Github",
    "Internet",
    "Python",
    "Scala",
    "journey", 
    "library", 
    "dinner", 
    "vacation",
    "scientist",
    "exercise",
    "magazine",
    "calendar",
    "theater",
    "festival",
    "behavior",
    "tennis",
    "location",
    "director",
    "software", 
    "natural", 
    "creative", 
    "mineral", 
    "biology", 
    "material", 
    "economy",
    "consider", 
    "practice", 
    "strategy", 
    "animal", 
    "audience", 
    "project", 
    "designer",
    "formula", 
    "industry", 
    "therapy", 
    "routine", 
    "function", 
    "analyze", 
    "dentist",
    "attitude", 
    "engine", 
    "cabinet", 
    "laboratory", 
    "fantasy", 
    "building", 
    "holiday",
    "assistant", 
    "mission"
  ],
  Hard: [
    "Destructuring",
    "Paradigm",
    "Styling",
    "Cascade",
    "Documentation",
    "Coding",
    "Working",
    "Dependencies",
    "Runner",
    "Rust",
    "Playing",
    "labyrinth", 
    "phenomenon", 
    "extraordinary", 
    "encyclopedia", 
    "constellation",
    "transformation", 
    "significance", 
    "astronomical", 
    "paradoxical",
    "experimentation",
    "manipulation", 
    "comprehension", 
    "synchronization", 
    "documentation", 
    "accomplishment",
    "abstraction", 
    "degradation", 
    "reconciliation", 
    "exaggeration", 
    "configuration",
    "sophistication", 
    "revolutionize", 
    "characterization", 
    "differentiation", 
    "implementation",
    "articulation", 
    "consideration", 
    "manifestation", 
    "application", 
    "representation",
    "intellectual", 
    "specialization", 
    "rehabilitation", 
    "observation", 
    "accumulation",
    "organization", 
    "contemplation", 
    "institution", 
    "exploration", 
    "rejuvenation",
    "administration"
  ]
};


// Setting Levels
const lvls = {
  "Easy": 5,
  "Normal": 3,
  "Hard": 4,
};


// Catch Selectors
let startButton = document.querySelector(".start");
let lvlNameSpan = document.querySelector(".message .lvl");
let secondsSpan = document.querySelector(".message .seconds");
let theWord = document.querySelector(".the-word");
let upcomingWords = document.querySelector(".upcoming-words");
let input = document.querySelector(".input");
let timeLeftSpan = document.querySelector(".time span");
let scoreGot = document.querySelector(".score .got");
let scoreTotal = document.querySelector(".score .total");
let finishMessage = document.querySelector(".finish");
let radiobox = document.querySelector("#radiobox-container")
let radioinput = document.querySelectorAll(".radiobox-group input");


let defaultLevelName = "Normal"; // Change Level From Here
let defaultLevelSeconds = lvls[defaultLevelName];


lvlNameSpan.innerHTML = defaultLevelName;
secondsSpan.innerHTML = defaultLevelSeconds;
timeLeftSpan.innerHTML = defaultLevelSeconds;
scoreTotal.innerHTML = "0"

radioinput.forEach((e) => {
  e.onclick = function () {
    defaultLevelName = this.dataset.value;
    defaultLevelSeconds = lvls[this.dataset.value];
    lvlNameSpan.innerHTML = defaultLevelName;
    timeLeftSpan.innerHTML = defaultLevelSeconds;
    secondsSpan.innerHTML = defaultLevelSeconds;
  }
});


// Disable Paste Event
input.onpaste = function () {
  return false;
}

const storedUserScore = window.localStorage.getItem("userScore");
const userScore = storedUserScore ? JSON.parse(storedUserScore) : [];
window.localStorage.setItem("userScore", JSON.stringify(userScore));


let scores = []

for(let i = 0; i < userScore.length; i++){
  scores.push(userScore[i].userScore)
}

document.querySelector(".big-score").innerHTML = Math.max(...scores)


if (userScore.length === 0){
  document.querySelector(".big-score").style.display = "none"
}else{
  document.querySelector(".big-score").style.display = "block"
}

// Start Game
startButton.onclick = function () {
  this.remove();
  input.focus();
  radiobox.style.display = "none"
  // Generate Word Function
  if (lvlNameSpan.innerHTML === "Normal"){
    scoreTotal.innerHTML = words.Normal.length
    genWords();
  }else if (lvlNameSpan.innerHTML === "Easy"){
    scoreTotal.innerHTML = words.Easy.length
    genWordsEasy()
  }else if (lvlNameSpan.innerHTML === "Hard"){
    scoreTotal.innerHTML = words.Hard.length
    genWordsHard()
  }
}

function genWords() {
  // Get Random Word From Array
  let randomWord = words.Normal[Math.floor(Math.random() * words.Normal.length)];;
  // Get Word Index
  let wordIndex = words.Normal.indexOf(randomWord);
  // Remove WordFrom Array
  words.Normal.splice(wordIndex, 1);
  // Show The Random Word
  theWord.innerHTML = randomWord;
  // Empty Upcoming Words
  upcomingWords.innerHTML = '';
  // Generate Words
  for (let i = 0; i < words.Normal.length; i++) {
    // Create Div Element
    let div = document.createElement("div");
    let txt = document.createTextNode(words.Normal[i]);
    div.appendChild(txt);
    upcomingWords.appendChild(div);
  }
  // Call Start Play Function
  startPlay();
}


function startPlay() {
  timeLeftSpan.innerHTML = defaultLevelSeconds;
  let start = setInterval(() => {
    timeLeftSpan.innerHTML--;
    if (timeLeftSpan.innerHTML === "0") {
      // Stop Timer
      clearInterval(start);
      // Compare Words
      if (theWord.innerHTML.toLowerCase().trim() === input.value.toLowerCase().trim()) {
        // Empty Input Field
        input.value = '';
        // Increase Score
        scoreGot.innerHTML++;
        if (words.Normal.length > 0) {
          // Call Generate Word Function
          genWords();
        } else {
          let span = document.createElement("span");
          span.className = 'good';
          let spanText = document.createTextNode("Congratz");
          span.appendChild(spanText);
          finishMessage.appendChild(span);
          // Remove Upcoming Words Box
          upcomingWords.remove();
          const score = {
            date: new Date(),
            userScore: scoreGot.innerHTML
          }
          userScore.push(score)
          window.localStorage.setItem("userScore", JSON.stringify(userScore));
          radiobox.style.display = "block"
          setTimeout(() =>{
            location.reload()
          },3000)
        }
      } else {
        let span = document.createElement("span");
        span.className = 'bad';
        let spanText = document.createTextNode("Game Over");
        span.appendChild(spanText);
        finishMessage.appendChild(span);
        const score = {
          date: new Date(),
          userScore: scoreGot.innerHTML
        }
        userScore.push(score)
        window.localStorage.setItem("userScore", JSON.stringify(userScore));
        radiobox.style.display = "block"
        
      }
    }
  }, 1000);
}


function genWordsEasy() {
  // Get Random Word From Array
  let randomWord = words.Easy[Math.floor(Math.random() * words.Easy.length)];
  // Get Word Index
  let wordIndex = words.Easy.indexOf(randomWord);
  // Remove WordFrom Array
  words.Easy.splice(wordIndex, 1);
  // Show The Random Word
  theWord.innerHTML = randomWord;
  // Empty Upcoming Words
  upcomingWords.innerHTML = '';
  // Generate Words
  for (let i = 0; i < words.Easy.length; i++) {
    // Create Div Element
    let div = document.createElement("div");
    let txt = document.createTextNode(words.Easy[i]);
    div.appendChild(txt);
    upcomingWords.appendChild(div);
  }
  // Call Start Play Function
  startPlayEasy()
}


function startPlayEasy() {
  timeLeftSpan.innerHTML = defaultLevelSeconds;
  let start = setInterval(() => {
    timeLeftSpan.innerHTML--;
    if (timeLeftSpan.innerHTML === "0") {
      // Stop Timer
      clearInterval(start);
      // Compare Words
      if (theWord.innerHTML.toLowerCase().trim() === input.value.toLowerCase().trim()) {
        // Empty Input Field
        input.value = '';
        // Increase Score
        scoreGot.innerHTML++;
        if (words.Easy.length > 0) {
          // Call Generate Word Function
          genWordsEasy();
        } else {
          let span = document.createElement("span");
          span.className = 'good';
          let spanText = document.createTextNode("Congratz");
          span.appendChild(spanText);
          finishMessage.appendChild(span);
          // Remove Upcoming Words Box
          upcomingWords.remove();
          const score = {
            date: new Date(),
            userScore: scoreGot.innerHTML
          }
          userScore.push(score)
          window.localStorage.setItem("userScore", JSON.stringify(userScore));
          radiobox.style.display = "block"
          setTimeout(() =>{
            location.reload()
          },3000)
        }
      } else {
        let span = document.createElement("span");
        span.className = 'bad';
        let spanText = document.createTextNode("Game Over");
        span.appendChild(spanText);
        finishMessage.appendChild(span);
        const score = {
          date: new Date(),
          userScore: scoreGot.innerHTML
        }
        userScore.push(score)
        window.localStorage.setItem("userScore", JSON.stringify(userScore));
        radiobox.style.display = "block"
        
      }
    }
  }, 1000);
}




function genWordsHard() {
  // Get Random Word From Array
  let randomWord = words.Easy[Math.floor(Math.random() * words.Hard.length)];
  // Get Word Index
  let wordIndex = words.Hard.indexOf(randomWord);
  // Remove WordFrom Array
  words.Hard.splice(wordIndex, 1);
  // Show The Random Word
  theWord.innerHTML = randomWord;
  // Empty Upcoming Words
  upcomingWords.innerHTML = '';
  // Generate Words
  for (let i = 0; i < words.Easy.length; i++) {
    // Create Div Element
    let div = document.createElement("div");
    let txt = document.createTextNode(words.Easy[i]);
    div.appendChild(txt);
    upcomingWords.appendChild(div);
  }
  // Call Start Play Function
  sstartPlayHard()
}



function startPlayHard() {
  timeLeftSpan.innerHTML = defaultLevelSeconds;
  let start = setInterval(() => {
    timeLeftSpan.innerHTML--;
    if (timeLeftSpan.innerHTML === "0") {
      // Stop Timer
      clearInterval(start);
      // Compare Words
      if (theWord.innerHTML.toLowerCase().trim() === input.value.toLowerCase().trim()) {
        // Empty Input Field
        input.value = '';
        // Increase Score
        scoreGot.innerHTML++;
        if (words.Hard.length > 0) {
          // Call Generate Word Function
          genWordsHard();
        } else {
          let span = document.createElement("span");
          span.className = 'good';
          let spanText = document.createTextNode("Congratz");
          span.appendChild(spanText);
            finishMessage.appendChild(span);
          // Remove Upcoming Words Box
          upcomingWords.remove();
          const score = {
            date: new Date(),
            userScore: scoreGot.innerHTML
          }
          userScore.push(score)
          window.localStorage.setItem("userScore", JSON.stringify(userScore));
          radiobox.style.display = "block"
          setTimeout(() =>{
            location.reload()
          },3000)
        }
      } else {
        let span = document.createElement("span");
        span.className = 'bad';
        let spanText = document.createTextNode("Game Over");
        span.appendChild(spanText);
        finishMessage.appendChild(span);
        const score = {
          date: new Date(),
          userScore: scoreGot.innerHTML
        }
        userScore.push(score)
        window.localStorage.setItem("userScore", JSON.stringify(userScore));
        radiobox.style.display = "block"
        
      }
    }
  }, 1000);
}
