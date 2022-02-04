const startBtn = document.querySelector('#start-btn');
const quiz = document.querySelector('#quiz');
const instruction = document.querySelector('.instruction');
const question = document.getElementById('question');
const optionOne = document.getElementById('optionOne');
const optionTwo = document.getElementById('optionTwo');
const optionThree = document.getElementById('optionThree');
const optionFour = document.getElementById('optionFour');
const timer = document.getElementById('timer');
const progress = document.getElementById('progress');
const result = document.getElementById('result');
const scoreResult = document.getElementById('my-results');
const reset = document.querySelector('.restart-btn');
const chooseOption = document.querySelectorAll('.btn-option');

let time = 10;
let counter;
let score = 0;
let loadQuestion = 0;
const lastQuestion = questions.length - 1;

const renderQuestion = () => {
    let quizquestions = questions[loadQuestion];
    question.innerHTML = quizquestions.question;
    optionOne.innerHTML = quizquestions.answers.optOne;
    optionTwo.innerHTML = quizquestions.answers.optTwo;
    optionThree.innerHTML = quizquestions.answers.optThree;
    optionFour.innerHTML = quizquestions.answers.optFour;
    

    for (let i = 0; i < chooseOption.length; i++) {
        chooseOption[i].setAttribute('onclick', 'checkAnswer(this)')
    }
}

const renderProgress = () => {
    for (let i = 0; i <= lastQuestion; i++) {
        progress.innerHTML += '<div class="progressBtn" id= ' + i + '></div>';
    }
}

function timerQuiz() {
    timer.textContent = time + 's';
    time--;

    timer.style.color = 'white'
    if (time < 9) {
        let addZero = timer.textContent;
        timer.textContent = "0" + addZero;
    }
    if (time < 3) {
        timer.style.color = 'red';
    }
    if (time < 0) {
        if (loadQuestion < lastQuestion) {
            time = 10
            increaseProgress()
            loadQuestion++;
            renderQuestion();

        } else {
            clearInterval(counter);
            renderResult();
        }
    }
}
function increaseProgress() {
    document.getElementById(loadQuestion).style.backgroundColor = 'teal'
}

const checkAnswer = (answer) => {
    increaseProgress()

    let userAns = answer.textContent;
    let correctAns = questions[loadQuestion].correctAnswer;
    answer.classList.add('selected')
    if (userAns === correctAns) {
        score += 1;
    }
    time = 10
    if (loadQuestion < lastQuestion) {
        loadQuestion++;
        answer.classList.remove('selected');
        renderQuestion()
    }
    else {
        clearInterval(counter)
        renderResult()
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
      element.classList.add('correct')
    } else {
      element.classList.add('wrong')
    }
  }
  
  function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
  }



const renderResult = () => {
    quiz.style.display = 'none';
    result.style.display = 'block'
    scoreResult.innerHTML = score + ' / ' + questions.length;
}

const startQuiz = () => {
    instruction.style.display = 'none';
    renderQuestion(loadQuestion);
    timerQuiz();
    clearInterval(counter)
    quiz.style.display = 'flex';
    renderProgress();
    counter = setInterval(timerQuiz, 1000)


}

startBtn.addEventListener('click', startQuiz)
