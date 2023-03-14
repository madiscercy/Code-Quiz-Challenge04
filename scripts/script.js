console.log(Questions);


let title = document.querySelector(".title");
let subTitle = document.querySelector(".sub-title");
let subContent = document.querySelector(".sub-content");
let optionOne = document.querySelector(".option-1");
let optionTwo = document.querySelector(".option-2");
let optionThree = document.querySelector(".option-3");
let optionFour = document.querySelector(".option-4");
let buttonOne = document.querySelector("#button-1");
let buttonTwo = document.querySelector(".button-2");
let quizArea = document.querySelector(".quiz");
let mainPage = document.querySelector(".main-page");
let questionButtons = document.querySelector(".question-buttons");
let timeEl = document.querySelector(".timer");
let currentIndex = 0;


buttonOne.addEventListener('click', function(){
  console.log("hello");
  quizArea.classList.remove("hide");
  quizArea.classList.add("show");
  mainPage.classList.remove("show");
  mainPage.classList.add("hide");
  startQuiz()

  // call timer here
  var secondsLeft = 60;
  var timerInterval = setInterval(function() {
    secondsLeft--;
    timeEl.textContent = secondsLeft + " seconds left.";

    if(secondsLeft === 0) {
      // Stops execution of action at set interval
      clearInterval(timerInterval);
      // Calls function to create and append image
      sendMessage();
    }

  }, 1000);
})

function startQuiz(){
  let questionTitle= document.querySelector(".question-title");
  questionTitle.textContent = Questions[currentIndex].q;
  questionButtons.innerHTML = ""
  for (let i = 0; i < Questions[currentIndex].a.length; i++) {
    let questionButton = document.createElement("button");
    questionButton.setAttribute("data-correct", Questions[currentIndex].a[i].isCorrect)
    questionButton.onclick = function() {nextQuestion()};
    questionButton.textContent = Questions[currentIndex].a[i].text;
    questionButtons.appendChild(questionButton);
  }
}

function nextQuestion(){
  // event or this to get the text content from the button
  // if the information we get back = the attribute of data correct is true or false
  // look into get attribute
  // call gameover in here
  currentIndex++;
  startQuiz();
}


// creat game over function that will render input box for user to type in their name and their score
// create a timer function
// get highscores function to render highscores

// https://www.geeksforgeeks.org/how-to-create-a-simple-javascript-quiz/

