console.log(Questions);


let title = document.querySelector(".title");
let subTitle = document.querySelector(".sub-title");
let subContent = document.querySelector(".sub-content");
let buttonOne = document.querySelector("#button-1");
let buttonTwo = document.querySelector(".button-2");
let quizArea = document.querySelector(".quiz");
let mainPage = document.querySelector(".main-page");
let questionButtons = document.querySelector(".question-buttons");
let timeEl = document.querySelector(".timer");
let endPage = document.querySelector(".end-page");
let finalScoreEl = document.querySelector(".final-score");
let enterIntialsEl = document.querySelector(".highscore-input");
let submitInitialsel = document.querySelector(".submit");
let savedHighscores = document.querySelector(".saved-highscores");
let highscorePage = document.querySelector(".highscore-page");
let goBackBtn = document.querySelector(".go-back");
let viewHighscoresBtn = document.querySelector(".view-highscores");
let clearHighscoreBtn = document.querySelector(".clear-highscore")
let highscoresKey = "highscores";
let currentIndex = 0;
let secondsLeft = 60;
let finalScore = 0;
let gameover = false;

// clicking the start will change the content and start the game, along with a 60 second timer that decrements 5 seconds whenever an answer is wrong
buttonOne.addEventListener('click', function () {
  quizArea.classList.remove("hide");
  quizArea.classList.add("show");
  mainPage.classList.remove("show");
  mainPage.classList.add("hide");
  viewHighscoresBtn.classList.remove("show");
  viewHighscoresBtn.classList.add("hide");
  setNextQuestion()
  var timerInterval = setInterval(function () {
    if (!gameover) {
      secondsLeft--;
      timeEl.textContent = secondsLeft + " seconds left.";
    }

    if (secondsLeft === 0 || gameover) {
      clearInterval(timerInterval);
      endGame();
    }
  }, 1000);
})

// event listeners for all buttons
goBackBtn.addEventListener('click', goBack);
submitInitialsel.addEventListener('click', saveHighscore);
clearHighscoreBtn.addEventListener('click', clearHighscores);
viewHighscoresBtn.addEventListener('click', viewHighscores);


// switching to next question
function setNextQuestion() {
  let questionTitle = document.querySelector(".question-title");
  questionTitle.textContent = Questions[currentIndex].q;
  questionButtons.innerHTML = ""
  for (let i = 0; i < Questions[currentIndex].a.length; i++) {
    let questionButton = document.createElement("button");
    questionButton.onclick = function (event) { nextQuestion(event) };
    questionButton.textContent = Questions[currentIndex].a[i].text;
    questionButtons.appendChild(questionButton);
  }
}

// if it's a game over, this will call and stop the timer, show the end page and display the score
function endGame() {
  if (!gameover) {
    gameover = true;
    quizArea.classList.remove("show");
    quizArea.classList.add("hide");
    endPage.classList.remove("hide");
    endPage.classList.add("show");
    finalScore = secondsLeft;
    secondsLeft = 1;
    timeEl.textContent = "Timer"
    finalScoreEl.textContent = "Your final score is " + finalScore;
  }
}

function nextQuestion(event) {
  checkAnswer(event);
  if (currentIndex >= Questions.length - 1) {
    endGame();
  } else {
    currentIndex++;
    setNextQuestion();
  }
}

// checking if questions are right or wrong
function checkAnswer(event) {
  let userInput = event.target;

  if (Questions[currentIndex].isCorrect != userInput.textContent) {
    secondsLeft -= 5;
    console.log("INCORRECT")
  } else {
    console.log("CORRECT")
  }
}


// saving highscore to localStorage, json parsing and stringifying, also sorting highscores from highest to lowest.
function saveHighscore() {
  endPage.classList.remove("show");
  endPage.classList.add("hide");
  highscorePage.classList.remove("hide");
  highscorePage.classList.add("show");


  let highscore = {
    initials: enterIntialsEl.value,
    score: finalScore
  }

  let localHighscores = localStorage.getItem(highscoresKey);

  if (localHighscores) {
    let localHighscoresArray = JSON.parse(localHighscores)
    let addedHighscore = false;
    for (let i = 0; i < localHighscoresArray.length; i++) {
      const localHighscore = localHighscoresArray[i];
      if (localHighscore.score < highscore.score) {
        localHighscoresArray.splice(i, 0, highscore);
        addedHighscore = true;
        break;
      }
    }

    if (!addedHighscore) {
      localHighscoresArray.push(highscore)
    }

    localStorage.setItem(highscoresKey, JSON.stringify(localHighscoresArray))

  } else {
    let highscoresArray = [];
    highscoresArray.push(highscore)
    localStorage.setItem(highscoresKey, JSON.stringify(highscoresArray))
  }

  displayHighscores()
}


// showing highscores, if none, then it will show no highscores available
function displayHighscores() {
  let localHighscores = JSON.parse(localStorage.getItem(highscoresKey));
  if (localHighscores && localHighscores.length > 0) {
    for (let i = 0; i < localHighscores.length; i++) {
      const highscore = localHighscores[i];
      let pElement = document.createElement("p");
      pElement.textContent = (i + 1) + ". " + highscore.initials + " - " + highscore.score;
      savedHighscores.appendChild(pElement);
    }
  } else {
    let pElement = document.createElement("p");
    pElement.textContent = "No highscores available.";
    savedHighscores.appendChild(pElement);
  }
}


function clearHighscores() {
  localStorage.removeItem(highscoresKey);
  while (savedHighscores.firstChild) {
    savedHighscores.removeChild(savedHighscores.firstChild);
  }
  displayHighscores();
}

// for go back button to show the start page
function goBack() {
  highscorePage.classList.remove("show");
  highscorePage.classList.add("hide");
  mainPage.classList.remove("hide");
  mainPage.classList.add("show");
  viewHighscoresBtn.classList.remove("hide");
  viewHighscoresBtn.classList.add("show");
}


// for view highscore button to show highscore page
function viewHighscores() {
  highscorePage.classList.remove("hide");
  highscorePage.classList.add("show");
  mainPage.classList.remove("show");
  mainPage.classList.add("hide");
  viewHighscoresBtn.classList.remove("show");
  viewHighscoresBtn.classList.add("hide");

  displayHighscores();
}
