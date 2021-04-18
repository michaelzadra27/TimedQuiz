var start = document.getElementById("start-btn")
var advance = document.getElementById("next-btn")
var questionContainer = document.getElementById('questionBox')
var clock = document.getElementById('time')
var scorecard = document.getElementById('score')
var leaderBElement = document.getElementById('leaderB-btn')
var restartBtnEl = document.getElementById('restart-btn')
const endScreenElement = document.getElementById("endGame")
const finishButton = document.getElementById('endscreen-btn')
var showScores = document.getElementById('leaderboard')
var getScore = document.getElementById('postHere')
var yourScore = document.getElementById('finishedScore')
var initials = document.getElementById('initials')
var lastPlayer = document.getElementById('lastScore')
//var score = 0
//const choiceA = document.getElementById('A')
//const choiceB = document.getElementById('B')
//const choiceC = document.getElementById('C')
//const choiceD = document.getElementById('D')
var questionElement = document.getElementById('question')
var answerButtonsElement = document.getElementById('answerBtn')
var timeLeft = 60




let randomQuestions, currentQuestionIndex

const finalScore = timeLeft

//console.log(yourScore)
//console.log(leaderBElement)


//increments to get to next random question
advance.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

//Takes you to the score display when the game is over
leaderBElement.addEventListener('click', seeScores)


//Controls the clock
function countdown() {
timeInterval = setInterval(function () {
 timeLeft--;
 clock.textContent = timeLeft
 if (timeLeft == 0) {

//endgame Function
      clearInterval(timeInterval);
    }
  }, 1000);
}



// function stopTime(){
//   clearInterval(timeInterval);
  

// }


//listens to what button is clicked
function selectAnswer(choice){
  const pickedButton = choice.target
  const correct = pickedButton.dataset.correct
 
  if (randomQuestions.length > currentQuestionIndex +1){
  advance.classList.remove('hide')
  } else {
    //start.innerHTML = "Restart"
    //start.classList.remove('hide')
    finishGame();
    

    }
}


//adds and removes classes on the submit button to only show leaderboard
function seeScores() {
  var getInitials = initials.value

  showScores.classList.remove('hide')
  leaderBElement.classList.add('hide')
  restartBtnEl.classList.remove('hide')
  endScreenElement.classList.add('hide')
  getScore.innerHTML= (timeLeft)
  lastPlayer.innerHTML = (getInitials)
  localStorage.setItem("score", timeLeft )
  //yourScore.innerHTML = (timeLeft)
  

}

//adds and removes classes at the end of the game and shows the endgame page
function finishGame(){
  
    leaderBElement.classList.remove('hide')
    restartBtnEl.classList.remove('hide')
    restartBtnEl.addEventListener('click', reloadPage)
    endScreenElement.classList.remove('hide')
    questionContainer.classList.add('hide')
    clearInterval(timeInterval);
    yourScore.innerHTML = "Your Score: " + (timeLeft)
    console.log(yourScore)

    //console.log(finalScore)
   
}


//reloads the pages on the restart button
function reloadPage(){
  window.location.reload();
}


function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions =[
  {
    question: 'Who won the world series in 2020?', 
    answers: [
      {text:'Dodgers', correct: true},
      {text:'Nationals', correct: false},
      {text:'Royals'},
      {text:'Astros'}
    ]
  },
  {
    question: 'Who won the NL Cy Young in 2020?', 
    answers: [
      {text:'Trevor Bauer', correct: true},
      {text:'Jacob deGrom', correct: false},
      {text:'Corbin Burnes', correct: false},
      {text:'Yu Darvis', correct: false}
    ]
  },
  {
    question: 'Who won the NL MVP in 2019?', 
    answers: [
      {text:'Cody Bellinger', correct: true},
      {text:'Ketel Marte', correct: false},
      {text:'Pete Alonso', correct: false},
      {text:'Christian Yelich', correct: false},
    ]
  },
  {
    question: 'Who won NL rookie of the year in 2020?', 
    answers: [
      {text:'Devin Williams', correct: true},
      {text:'Gavin Lux', correct: false},
      {text:'Alex Bohm', correct: false},
      {text:'Jake Cronenworth', correct: false}
    ]
  },
  {
    question: 'Who won the NL MVP in 2019?', 
    answers: [
      {text:'Cody Bellinger', correct: true},
      {text:'Ketel Marte', correct: false}
    ]
  },

  

]

// let questions = [
//     {question: "How many Innings are in a Baseball Game?",
//     choiceA: "6",
//     choiceB: "3",
//     choiceC: "9",
//     choiceD: "7",
//     correct: "C"
// },
// {question: "Question 2",
//     choiceA: "6",
//     choiceB: "3",
//     choiceC: "9",
//     choiceD: "7",
//     correct: "A"
// },
// {question: "Question 3?",
//     choiceA: "6",
//     choiceB: "3",
//     choiceC: "9",
//     choiceD: "7",
//     correct: "B"
// },
// {question: "Question 4",
//     choiceA: "6",
//     choiceB: "3",
//     choiceC: "9",
//     choiceD: "7",
//     correct: "D"
// },

// ]

// var lastQuestion = question.length -1;
// var runningQuestion = 0;

// function renderQuestion (){
//     let q = questions[runningQuestion];
//     question.innerHTML = "<p>" + q.question + "</p>"
//     choiceA.innerHTML =q.choiceA
//     choiceB.innerHTML =q.choiceB
//     choiceC.innerHTML =q.choiceC
//     choiceD.innerHTML =q.choiceD

// }

//Other way to call questions




//

function startGame() {
  //console.log("hello")
  start.classList.add('hide')
  leaderBElement.classList.add('hide')
  questionContainer.classList.remove('hide')
  randomQuestions = questions.sort(() => Math.random() -.5)
  currentQuestionIndex = 0
  //renderQuestion()
  setNextQuestion()
  countdown();
 
  
}

function setNextQuestion(){
  clearButtons();
  getQuestion(randomQuestions[currentQuestionIndex])
  
}

function getQuestion(question){
  questionElement.innerHTML = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct){
      button.addEventListener('click', function(e){
        selectAnswer(e)
      })
    } else{
    button.addEventListener('click', function(e){
      selectAnswer(e)
      timeLeft -= 5;
      

    })   
    
  }
  //  button.dataset.correct = answer.correct
  //  button.dataset.wrong = answer.wrong
  answerButtonsElement.appendChild(button)
})
}



//removes previous question buttons when moving to the next question
function clearButtons() {
  clearStatusClass(document.body)
  advance.classList.add('hide')
  while (answerButtonsElement.firstChild){
    answerButtonsElement.removeChild
    (answerButtonsElement.firstChild)
  }
}



start.addEventListener("click", startGame)


