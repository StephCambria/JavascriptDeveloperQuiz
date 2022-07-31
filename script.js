const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const scoreContainer = document.getElementById('result-container');
const mostRecentScore = localStorage.getItem('mostRecentScore');
const finalScore = document.getElementById('finalScore')
const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn');




var timerInterval


let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++ //++ means to add 1
    setNextQuestion()
} )



function startGame() {
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    scoreContainer.classList.add('hide')
    setNextQuestion()
    clearInterval(timerInterval);
    setTime();
    secondsLeft = 60;
}

function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    } )
}


function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while(answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}




function selectAnswer(e) {
    const selectedButton = e.target
    let correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    } else {
        startButton.innerText = 'Restart'
        startButton.classList.remove('hide')
        saveHighScore();
    }  
}




function setStatusClass(element, correct) {
    clearStatusClass(element)
    if(correct) {
        element.classList.add('correct')
        setTimeout(secondsLeft++);
        timerEl.textContent = secondsLeft++;
        
    } else {
        element.classList.add('wrong')
        //reducing a few extra seconds if you pick the wrong answer
            setTimeout(secondsLeft--);
            timerEl.textContent = secondsLeft;
        }
    }


function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

//TIMER
var timerEl = document.getElementById('count-down');

var secondsLeft = 60;

function setTime() {
   timerInterval = setInterval(function() {
        secondsLeft--;
        timerEl.textContent = secondsLeft;
    }, 1000);
    if(timerInterval <= 0) {
        gameOver();
    }
}






const questions = [
    {
        question: 'What does HTML stand for?',
        answers: [
            { text: 'Hyper Trainer Marking Language', correct: false},
            { text: 'Hyper Text Marketing Language', correct: false},
            { text: 'Hyper Text Markup Language', correct: true},
            { text: 'Hyper Text Markup Leveler', correct: false}
        ]
    },
    {
        question: 'What are the elements of the CSS Box Model?',
        answers: [
            { text: 'Content, Padding, Borer-box, and Margin', correct: false},
            { text: 'Content, Padding, Border, and Margin', correct: true},
            { text: 'CSS, Padding, Border, and Margin', correct: false},
            { text: 'Content-box, Padding, Border-box, and Margin', correct: false}
        ]
    },
    {
        question: 'Which of these are Pseudo-Elements?',
        answers: [
            { text: '::before', correct: false},
            { text: '::after', correct: false},
            { text: '::first-line', correct: false},
            { text: 'all of the above', correct: true}
        ]
    },
    {
        question: 'The z-index specifies ____ .',
        answers: [
            { text: 'The vertical stacking order of the positioned elements on the page', correct: true},
            { text: 'The horizontal stacking order of the positioned elements on the page', correct: false},
            { text: 'The vertical and horizontal stacking order of the positioned elements on the page', correct: false},
            { text: 'none of the above', correct: false}
        ]
    },
    {
        question: 'What are some of the properties of flexbox?',
        answers: [
            { text: 'flex-direction', correct: false},
            { text: 'flex-wrap', correct: false},
            { text: 'row-reverse', correct: false},
            { text: 'all of the above', correct: true}
        ]
    },
    {
        question: 'The ____ CSS property positions an element relative to the browser.',
        answers: [
            { text: 'Absolute', correct: false},
            { text: 'Relative', correct: false},
            { text: 'Fixed', correct: true},
            { text: 'Static', correct: false}
        ]
    },
    {
        question: 'Which of these CSS box-sizing properties calculate the total width and height of an element?',
        answers: [
            { text: 'content-box', correct: false},
            { text: 'padding-box', correct: false},
            { text: 'border-box', correct: false},
            { text: 'all of the above', correct: true}
        ]
    },
    {
        question: 'Which of these are @media properties?',
        answers: [
            { text: 'screen', correct: false},
            { text: 'print', correct: false},
            { text: 'speech', correct: false},
            { text: 'all of the above', correct: true}
        ]
    },
    {
        question: 'A ____ represents a logical entity and can only have two values: true or false.',
        answers: [
            { text: 'string', correct: false},
            { text: 'boolean', correct: true},
            { text: 'number', correct: false},
            { text: 'none of the above', correct: false}
        ]
    },
    {
        question: 'Which of these can declare or construct an object in Javascript?',
        answers: [
            { text: 'A function', correct: false},
            { text: 'A class', correct: false},
            { text: 'A method', correct: false},
            { text: 'all of the above', correct: true}
        ]
    }
    
];

//for loop to prevent shuffled questions from repeating!
let visited = [];

let len = questions.length;

questions.sort();

let _temp;

for (let i = 0; i < len; i++) {
    if (questions[i] !== _temp) {
        visited.push(questions[i]);
        _temp = questions[i];
    }
}


//local storage
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    console.log(highScores);
const MAX_HIGH_SCORES = 5;
function saveHighScore() {
    scoreContainer.classList.remove('hide')
    clearInterval(timerInterval);

    username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value;
});
    saveHighScore = (e) => {
    e.preventDefault();

    const score = {
       score: Math.floor(Math.random() * 100),
       name: username.value
    }

    highScores.push(score);

    highScores.sort( (a,b) => b.score - a.score)

    highScores.splice(5);

    localStorage.setItem('highScores', JSON.stringify(highScores));
}
}

function gameOver() {
    startButton.innerText = 'Restart'
    clearInterval(timerInterval);
    saveHighScore();
}





