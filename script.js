const questions = [
    {
        question : "Which is the biggest country area-wise?",
        answer: [
            { text:"India" , correct: false },
            { text:" Russia" , correct: true },
            { text:"America" , correct: false },
            { text:"China" , correct: false }
        ]
    },
    {
        question : "Which country is most populated country in the world?",
        answer: [
            { text:"China" , correct: false },
            { text:"Pakistan" , correct: false },
            { text:"India" , correct: true },
            { text:"Shri Lanka" , correct: false }
        ]
    },
    {
        question : "Which country experience 6 seasons?",
        answer: [
            { text:"China" , correct: false },
            { text:"Indonesia" , correct: false },
            { text:"India" , correct: true },
            { text:"Cuba" , correct: false }
        ]
    },
    {
        question : "Which country is known as Vishwaguru?",
        answer: [
            { text:"Australia" , correct: false },
            { text:"England" , correct: false },
            { text:"America" , correct: false },
            { text:"India" , correct: true }
        ]
    }
];
const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-btn");
const nextButton = document.getElementById("next-btn");
let currentQuestionNumber = 0;
let score = 0;
function startQuiz(){
    currentQuestionNumber=0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}
function showQuestion(){
    resetState();
     let currentQuestion = questions[currentQuestionNumber];
     let questionNumber = currentQuestionNumber + 1;
     questionElement.innerHTML = questionNumber + ". " + currentQuestion.question;

     currentQuestion.answer.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer);
     });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}
function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}
function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}


function handleNextButton(){
    currentQuestionNumber++;
    if(currentQuestionNumber < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionNumber < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});


startQuiz();
