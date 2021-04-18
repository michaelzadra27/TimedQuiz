var startButton = document.getElementById("start-btn")
var nextButton = document.getElementById("next-btn")
var questionContainer = document.getElementById('questionBox')
var clock = document.getElementById('time')
var scorecard = document.getElementById('score')
var leaderBElement = document.getElementById('leaderB-btn')
var restartBtnEl = document.getElementById('restart-btn')
const endScreenElement = document.getElementById("endGame")
const finishButton = document.getElementById('endscreen-btn')
//var score = 0
//const choiceA = document.getElementById('A')
//const choiceB = document.getElementById('B')
//const choiceC = document.getElementById('C')
//const choiceD = document.getElementById('D')
var questionElement = document.getElementById('question')
var answerButtonsElement = document.getElementById('answerBtn')
var timeLeft = 60

let randomQuestions, currentQuestionIndex

nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

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

function selectAnswer(e){
  const pickedButton = e.target
  const correct = pickedButton.dataset.correct
  // setStatusClass(document.body, correct)
  // Array.from(answerButtonsElement.children).forEach(button =>{
  //   setStatusClass(button, button.dataset.correct)
  // })
  if (randomQuestions.length > currentQuestionIndex +1){
  nextButton.classList.remove('hide')
  } else {
    //startButton.innerHTML = "Restart"
    //startButton.classList.remove('hide')
    finishGame();
    

    }
}

function finishGame(){
  leaderBElement.classList.remove('hide')
    restartBtnEl.classList.remove('hide')
    restartBtnEl.addEventListener('click', reloadPage)
    endScreenElement.classList.remove('hide')
    questionContainer.classList.add('hide')
}

function reloadPage(){
  window.location.reload();
}

// function setStatusClass(element, correct){

//   clearStatusClass(element)
//   if(correct){
//     element.classList.add('correct')
    
//   }else {
//     element.classList.add('wrong')
//     console.log("Hello")
    
//   }
// }

// }

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


function startGame() {
  //console.log("hello")
  startButton.classList.add('hide')
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


function clearButtons() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild){
    answerButtonsElement.removeChild
    (answerButtonsElement.firstChild)
  }
}



startButton.addEventListener("click", startGame)


