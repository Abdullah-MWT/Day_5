const questions = [
    {
        question: 'What is Capital of pakistan?',
        answers: [
            {text: 'Islamabad', correct: true},
            {text: 'Lahore', correct: false},
            {text: 'Karachi', correct: false},
            {text: 'Quetta', correct: false},
        ]
    },
    {
        question: 'What is Capital of India?',
        answers: [
            {text: 'Delhi', correct: true},
            {text: 'Lahore', correct: false},
            {text: 'Karachi', correct: false},
            {text: 'Quetta', correct: false},
        ]
    },
    {
        question: 'Who is imran khan?',
        answers: [
            {text: 'Great Pakistani', correct: true},
            {text: 'poor Pakistani', correct: false},
            {text: 'Not pakistani', correct: false},
            {text: 'Not good', correct: false},
        ]
    },
    {
        question: 'Who is Abdullah Developer?',
        answers: [
            {text: 'A Great Doctor', correct: false},
            {text: 'poor Pakistani', correct: false},
            {text: 'Good Coder', correct: true},
            {text: 'Not good', correct: false},
        ]
    },
    {
        question: 'When was imran khan born?',
        answers: [
            {text: '1956', correct: false},
            {text: '1951', correct: true},
            {text: '1952', correct: false},
            {text: '1963', correct: false},
    ]
    }
]

const questionElement = document.getElementById('question');
const answerbuttons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = 'Next';
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerText = questionNo + '.' + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerbuttons.appendChild(button);
    })

}

function resetState(){
    nextButton.style.display = 'none';
    while(answerbuttons.firstChild){
        answerbuttons.removeChild(answerbuttons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === 'true';
    if(isCorrect){
        selectedBtn.classList.add('correct');
        score++;
    }else{
        selectedBtn.classList.add('wrong');
    }
    Array.from(answerbuttons.children).forEach(button => {
        if(button.dataset.correct === 'true'){
            button.classList.add('correct');
        }
        button.disabled = true;
    })
    nextButton.style.display = 'block';
}

function showScore(){
    resetState();
    questionElement.innerText = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerText = 'Play Again';
    nextButton.style.display = 'block';
}
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}
nextButton.addEventListener('click', () => {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})


startQuiz();
