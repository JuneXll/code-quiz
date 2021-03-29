
// Selected elements
var start = document.getElementById("start");
var quiz = document.getElementById("quiz");
var question = document.getElementById("question");
var choices = document.getElementById("choices");
var choiceA = document.getElementById("A");
var choiceB = document.getElementById("B");
var choiceC = document.getElementById("C");
var choiceD = document.getElementById("D");
var timer = document.getElementById("timer");
var startPage = document.getElementById("starting-div");
var finalScore = document.getElementById("final-score");

// Questions
var questions =[
    {
        question: "Commonly used data types DO NOT include:",
        choiceA: "1. Strings",
        choiceB: "2. Booleans",
        choiceC: "3. Alerts",
        choiceD: "4. Numbers",
        correctAnswer: "C"
    },
    {
        question: "The condition in an if/else statement is encoded within _____.",
        choiceA: "1. Quotes",
        choiceB: "2. Curly brackets",
        choiceC: "3. Parentheses",
        choiceD: "4. Square brackets",
        correctAnswer: "C"
    },
    {
        question: "Arrays in JavaScript can be used to store _____.",
        choiceA: "1. Numbers and Strings",
        choiceB: "2. Other arrays",
        choiceC: "3. Booleans",
        choiceD: "4. All of the above",
        correctAnswer: "D"
    },
    {
        question: "String values must be enclosed within ____ when being assigned to variables.",
        choiceA: "1. Commas",
        choiceB: "2. Curly brackets",
        choiceC: "3. Quotes",
        choiceD: "4. Parentheses",
        correctAnswer: "C"
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        choiceA: "1. JavaScript",
        choiceB: "2. Terminal/bash",
        choiceC: "3. For loops",
        choiceD: "4. console.log",
        correctAnswer: "D"
    }
];

// Variables to keep track 
var lastQuestion = questions.length-1;
var runningQuestion = 0;
var timeLeft = 75;
var score = 0;
var allDone = false;


// Render the question and choices
function renderQuestion(){
    var q = questions[runningQuestion];

    question.innerHTML = "<h1>" + q.question + "</h1>";
    choiceA.innerHTML = "<button class='choiceAdd'>" + q.choiceA + "</button>";
    choiceB.innerHTML = "<button class='choiceAdd'>" + q.choiceB + "</button>";
    choiceC.innerHTML = "<button class='choiceAdd'>" + q.choiceC + "</button>";
    choiceD.innerHTML = "<button class='choiceAdd'>" + q.choiceD + "</button>";

} 

// Start quiz
start.addEventListener("click", startQuiz);

function startQuiz(){
    startPage.style.display="none";
    startTimer();
    renderQuestion();
    quiz.style.display = "flex";
}

// start timer
function startTimer() {
   var countdown = setInterval(function() {
      timeLeft--;
      timer.textContent = timeLeft;
      if (timeLeft >= 0) {
        if (allDone && count > 0) {
          clearInterval(countdown);
          completed();
        }
      }
      if (timeLeft === 0) {
        clearInterval(countdown);
        incomplete();
      }
    }, 1000);
  }

// What happens when quiz is completed
function completed(){
    clearInterval(timer);
    // renderScore();
    switchFinish();
  }

//   What happens when timer runs out
function incomplete(){
    // renderScore();
    switchFinish();
  }

//   Check answer
function checkAnswer(answer){
    if(answer == questions[runningQuestion].correctAnswer){
        score++;
        correctAns();
    } else {
        wrongAns();
    }
    count = 0;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    } else {
        clearInterval(timer);
        // renderScore();
    }
}

// If correct answer is chosen..
function correctAns(){
    document.querySelector("hr").style.display = "flex";
    var newP = document.createElement("p");
    var correct = document.createTextNode("Correct!");
    newP.appendChild(correct);
    quiz.appendChild(newP);
}

// If wrong answer is chosen...
function wrongAns(){
    document.querySelector("hr").style.display = "flex";
    var newP = document.createElement("p");
    var wrong = document.createTextNode("Wrong!");
    newP.appendChild(wrong);
    quiz.appendChild(newP);
}

// Figure out what was your score
// function renderScore(){
//     score = Math.round(100 * score/questions.length);
//     finalScore.innerText = score+ "%";
// }

// Switch to finished page
function switchFinish(){
    if(questions[runningQuestion]=== lastQuestion){
        window.location.href = "finished.html";
    }
}
  // 1-Create timer that will count down from 75 once start button is clicked

//2-Once start button is clicked, 1st question will appear.

//3-User will have to click an answer before going to the new questions =>if wrong choice is picked 10 secs will be deducted from timer and Wrong! will appear under the choices before going onto the next question =>if correct, Correct! will appear under the choices before going onto the next question.

//4-Once 5th question is completed timer will stop OR timer reaches 0 then finished page will appear with score=>asking user to input their initials.

//Initials will then be logged into the highscores page.=>if clear button clicked, all highscores will be removed=>if go back button clicked then quiz will start all over and timer back at 75


// things i need to fix:
// 1. wrong answer deducts 10 sec from countdown
// 2. remove the appended p after every question 