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
let endPage = document.querySelector(".end-page")
let finalScoreEl = document.querySelector(".final-score")
let currentIndex = 0;
let secondsLeft = 60;
let finalScore = 0;
let gameover = false;


buttonOne.addEventListener('click', function(){
  console.log("hello");
  quizArea.classList.remove("hide");
  quizArea.classList.add("show");
  mainPage.classList.remove("show");
  mainPage.classList.add("hide");
  setNextQuestion()
  var timerInterval = setInterval(function() {
    if (!gameover) {
      secondsLeft--;
      timeEl.textContent = secondsLeft + " seconds left.";
    }

     if(secondsLeft === 0 || gameover) {
      clearInterval(timerInterval);
      endGame();
    }
  }, 1000);
})



function setNextQuestion(){
  let questionTitle= document.querySelector(".question-title");
  questionTitle.textContent = Questions[currentIndex].q;
  questionButtons.innerHTML = ""
  for (let i = 0; i < Questions[currentIndex].a.length; i++) {
    let questionButton = document.createElement("button");
    // questionButton.setAttribute("data-correct", Questions[currentIndex].a[i].isCorrect)
    questionButton.onclick = function(event) {nextQuestion(event)};
    questionButton.textContent = Questions[currentIndex].a[i].text;
    questionButtons.appendChild(questionButton);
  }
}

function endGame(){
  if (!gameover) {
    gameover = true;
    quizArea.classList.remove("show");
    quizArea.classList.add("hide");
    endPage.classList.remove("hide");
    endPage.classList.add("show");
    finalScore = secondsLeft;
    secondsLeft = 1;
    console.log("finalScore: " + finalScore)
    timeEl.textContent = "timerrr"
    finalScoreEl.textContent = "Your final score is " + finalScore;
  }
}

function nextQuestion(event){
  checkAnswer(event);
  if (currentIndex >= Questions.length - 1) {
    endGame();
  } else{
  currentIndex++;
  setNextQuestion();}
}

function checkAnswer(event){
let userInput = event.target;
  console.log("isCorrect:  " +  Questions[currentIndex].isCorrect )
  console.log("userInput.textContent: " + userInput.textContent)
  console.log("Do they match? - " + (Questions[currentIndex].isCorrect == userInput.textContent))
  if (Questions[currentIndex].isCorrect != userInput.textContent) {
    secondsLeft-= 5;
    console.log("INCORRECT")
  } else {
    console.log("CORRECT")
  }
}



function saveHighscore(){

}

// creat game over function that will render input box for user to type in their name and their score
// create a timer function
// get highscores function to render highscores

// https://www.geeksforgeeks.org/how-to-create-a-simple-javascript-quiz/

  

  // if/else goes here
  // event or this to get the text content from the button
  // if the information we get back = the attribute of data correct is true or false
  // look into get attribute
  // call gameover in here