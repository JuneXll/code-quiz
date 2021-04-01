
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
var finished = document.getElementById("finished");
var submit = document.querySelector("#submit");
var ol = document.getElementById("ol");
var high = document.getElementById("high");
var highscoresHeader = document.getElementById("highscores-header");
var highscores = document.getElementById("highscores");
var clear = document.getElementById("clear-highscores");

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
        if (allDone && timeLeft > 0) {
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

    finished.style.display="flex";
    quiz.style.display="none";
    clearInterval(timer);
  }

//   What happens when timer runs out
function incomplete(){

    finished.style.display="flex";
    quiz.style.display="none;"
    renderScore();
  }

//   Check answer
function checkAnswer(answer){
    if(answer == questions[runningQuestion].correctAnswer){
        score++;
        correctAns();
    } else {
        wrongAns();
    }
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    } else {
        clearInterval(timer);
        allDone = true;
        renderScore();
    }
}

// If correct answer is chosen..
function correctAns(){
    
    document.querySelector("hr").style.display = "flex";
    var newP = document.createElement("p");
    var correct = document.createTextNode("Correct!");
    newP.appendChild(correct);
    quiz.appendChild(newP);
    // if(runningQuestion){
    //     newP.parentElement.removeChild(newP);
    // }
}

// If wrong answer is chosen...
function wrongAns(){

    document.querySelector("hr").style.display = "flex";
    var newP = document.createElement("p");
    var wrong = document.createTextNode("Wrong!");
    newP.appendChild(wrong);
    quiz.appendChild(newP);
    tenSecsOff();
    timer.textContent = timeLeft;
    // if(runningQuestion){
    //     newP.lastElementChild.removeChild(newP);
    // }
}

// Figure out what was your score
function renderScore(){

    score = Math.round(100 * score/questions.length);
    finalScore.innerText = score+ "%";
}

// Remove ten seconds off the timer for wrong answers
function tenSecsOff(){
    timeLeft = timeLeft - 10;
}

// Event listener for finished page to go to highscores
submit.addEventListener("click", highscore);


// Changes to highscores page and adds new initials to the list 
function highscore(event){
    var initials = document.getElementById("initials").value;
    event.preventDefault();
    high.style.display = "flex";
    finished.style.display = "none";
    highscoresHeader.style.display = "none";
    var highscoresArray = localStorage.getItem("player-score");
    if(highscoresArray){
        highscoresArray = JSON.parse(highscoresArray);
    } else {
        highscoresArray = [];
    }
    highscoresArray.push(initials + " - " + score + "%")
    localStorage.setItem("player-score", (JSON.stringify(highscoresArray)));

    listScore();
}

// Append the initials and scores to the highscores list
function listScore(){
    var highscoresArray = localStorage.getItem("player-score");
    if(highscoresArray){
        highscoresArray = JSON.parse(highscoresArray);
    } else {
        highscoresArray = [];
    }

    for(var i = 0; i < highscoresArray.length; i++){
    var li = document.createElement("li");
    li.append(highscoresArray[i]);
    ol.append(li);
   }

}

// Event listener to go-back button to return to starting div
document.getElementById("go-back").addEventListener("click", function(){

    high.style.display = "none";
    startPage.style.display = "flex";
    highscoresHeader.style.display = "flex";
    timeLeft = 75;
    timer.textContent = timeLeft;
})

// Link for the view highscores
highscores.addEventListener("click",function (){
    clearInterval(timer);
    highscoresHeader.style.display = "none";
    startPage.style.display = "none";
    quiz.style.display = "none";
    finished.style.display = "none";
    high.style.display = "flex";
})


//Event listener for button that clears the highscores
clear.addEventListener("click", function(){
    localStorage.clear();
    highscoresArray = [];
    ol.innerHTML = "";
})

//To-Do:
//fix bug start button after quiz has been completed at least once(goes straight to last question for 3 secs then jumps to finished page)
// remove the appended p after every question 
//  Add function that clears the highscores
// set if statement if no initials are entered
//set scores from high to low

