var startButton = document.getElementById("start-btn")
var nextButton = document.getElementById("next-btn")
var questionContainer = document.getElementById('questionBox')
var clock = document.getElementById('time')
var scorecard = document.getElementById('score')
//var score = 0
//const choiceA = document.getElementById('A')
//const choiceB = document.getElementById('B')
//const choiceC = document.getElementById('C')
//const choiceD = document.getElementById('D')
var questionElement = document.getElementById('question')
var answerButtonsElement = document.getElementById('answerBtn')

let shuffledQuestions, currentQuestionIndex

nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function countdown() {
    var timeLeft = 60;
    
timeInterval = setInterval(function () {
   // var clock = document.getElementById('time')
   
    
    // As long as the `timeLeft` is greater than 1
    if (timeLeft > 1) {
      // Set the `textContent` of `timerEl` to show the remaining seconds
      clock.textContent = timeLeft;
      // Decrement `timeLeft` by 1
      timeLeft--;
    } else if (timeLeft === 1) {
      // When `timeLeft` is equal to 1, rename to 'second' instead of 'seconds'
      clock.textContent = timeLeft + ' second remaining';
      timeLeft--;
    } else {
      // Once `timeLeft` gets to 0, set `timerEl` to an empty string
      clock.textContent = '';
      // Use `clearInterval()` to stop the timer
      clearInterval(timeInterval);
      
      
    }
  }, 1000);
}

function selectAnswer(e){
  const pickedButton = e.target
  const correct = pickedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button =>{
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex +1){
  nextButton.classList.remove('hide')
  } else {
    startButton.innerHTML = "Restart"
    startButton.classList.remove('hide')
  }

}

function setStatusClass(element, correct){
  scorecard = document.getElementById('score')
  score = 0
  
  clearStatusClass(element)
  if(correct){
    element.classList.add('correct')
    score++
    console.log(typeof score)
  }
  else {
    element.classList.add('wrong')

  }
}

function incrementScore(){
  points +10
  score = points
  scorecard.innerHTML = points

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


function startGame() {
  //console.log("hello")
  startButton.classList.add('hide')
  questionContainer.classList.remove('hide')
  shuffledQuestions = questions.sort(() => Math.random() -.5)
  currentQuestionIndex = 0
  //renderQuestion()
  setNextQuestion()
  countdown();
  
}

function setNextQuestion(){
  clearButtons();
  getQuestion(shuffledQuestions[currentQuestionIndex])
  
}

function getQuestion(question){
  questionElement.innerHTML = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct){
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
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


