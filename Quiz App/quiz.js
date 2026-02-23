const Quizbank = [
    {
        question: "1. What is the capital of India?",
        options: ["Mumbai", "Delhi", "Kolkata", "Chennai"],
        answer: 1   
    },
    {
        question: "2. Which language runs in the browser?",
        options: ["Java", "C++", "Python", "JavaScript"],
        answer: 3   
    },
    {
        question: "3. Who is known as the Father of Computer?",
        options: ["Charles Babbage", "Bill Gates", "Alan Turing", "Steve Jobs"],
        answer: 0   
    },
    {
        question: "4. Which HTML tag is used for inserting a line break?",
        options: ["<break>", "<br>", "<lb>", "<hr>"],
        answer: 1   
    },
    {
        question: "5. Which company developed Java?",
        options: ["Microsoft", "Sun Microsystems", "Google", "IBM"],
        answer: 1   
    },
    {
        question: "6. What does CSS stand for?",
        options: ["Computer Style Sheets", "Creative Style System", "Cascading Style Sheets", "Colorful Style Sheets"],
        answer: 2   
    },
    {
        question: "7. Which is the largest planet in our solar system?",
        options: ["Earth", "Mars", "Jupiter", "Saturn"],
        answer: 2   
    },
    {
        question: "8. Which symbol is used for comments in JavaScript?",
        options: ["//", "##", "<!-- -->", "**"],
        answer: 0  
    },
    {
        question: "9. Which method is used to print in the browser console?",
        options: ["print()", "console.log()", "echo()", "write()"],
        answer: 1   
    },
    {
        question: "10. Which keyword is used to declare a variable in JavaScript?",
        options: ["int", "var", "define", "dim"],
        answer: 1
    }
];

let currentQuestion = 0;
let timeLeft = 60; 
let timerInterval;
let selectedAnswers = new Array(Quizbank.length).fill(null);

let prevBtn = document.getElementById("prev");
let nextBtn = document.getElementById("next");
let submitBtn = document.getElementById("submit");

// Page load par start modal show
window.onload = function () {
    let startModal = new bootstrap.Modal(document.getElementById('startModal'));
    startModal.show();
};

// Start button click
document.getElementById("startBtn").onclick = function () {
    let startModalEl = document.getElementById('startModal');
    let modalInstance = bootstrap.Modal.getInstance(startModalEl);
    modalInstance.hide();

    document.getElementById("quizTitle").style.display = "none";
    document.getElementById("timer").style.display = "block";
    document.getElementById("quizContent").style.display = "block";
    document.getElementById("quizButtons").style.display = "flex";

    showQuestion();
    startTimer();
};

// ------------------ Show Question ------------------
function showQuestion() {
    let getElement = Quizbank[currentQuestion];
    document.getElementById('question').innerText = getElement.question;
    
    let optionButtons = document.getElementById('options');
    optionButtons.innerHTML = "";

    for (let i = 0; i < getElement.options.length; i++) {

        let btn = document.createElement("button");
        btn.innerText = getElement.options[i];

        btn.style.display = "block";
        btn.style.margin = "10px auto";
        btn.style.width = "200px";

        btn.onclick = function() {
            selectedAnswers[currentQuestion] = i;

            let allBtns = optionButtons.querySelectorAll("button");
            allBtns.forEach(b => {
                b.style.backgroundColor = "";
                b.style.color = "black";
            });

            btn.style.backgroundColor = "#0d6efd";
            btn.style.color = "white";
        };

        optionButtons.appendChild(btn);
    }

    prevBtn.disabled = currentQuestion === 0;

    if(currentQuestion === Quizbank.length - 1) {
        nextBtn.style.display = "none";
        submitBtn.style.display = "inline-block";
    } else {
        nextBtn.style.display = "inline-block";
        submitBtn.style.display = "none";
    }
}

// Next button click
nextBtn.onclick = function() {
    if(currentQuestion < Quizbank.length-1) {
        currentQuestion++;
        showQuestion();
    }
};

// Prev button click
prevBtn.onclick = function() {
    if(currentQuestion > 0) { 
        currentQuestion--;
        showQuestion();
    }
};

// ------------------ Timer ------------------
function startTimer() {
    timerInterval = setInterval(function () {
        let minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;

        seconds = seconds < 10 ? "0" + seconds : seconds;
        minutes = minutes < 10 ? "0" + minutes : minutes;

        document.getElementById("timer").innerText = "Time Left: " + minutes + ":" + seconds;
        timeLeft--;

        if (timeLeft < 0) {
            clearInterval(timerInterval);
            autoSubmit();
        }
    }, 1000);
}

// ------------------ Submit ------------------
submitBtn.onclick = function() {
    clearInterval(timerInterval);
    const score = calculateScore();
    document.getElementById("finalScore").innerText = "Total Score: " + score + " / " + Quizbank.length;

    let myModal = new bootstrap.Modal(document.getElementById('resultModal'));
    myModal.show();
};

// ------------------ Auto Submit ------------------
function autoSubmit() {
    const score = calculateScore();
    document.getElementById("finalScore").innerText = "Time Over ⏰\nTotal Score: " + score + " / " + Quizbank.length;

    let myModal = new bootstrap.Modal(document.getElementById('resultModal'));
    myModal.show();
}

// ------------------ Score Calculation ------------------
function calculateScore() {
    let score = 0;
    for (let i = 0; i < Quizbank.length; i++) {
        if (selectedAnswers[i] === Quizbank[i].answer) score++;
    }
    return score;
}