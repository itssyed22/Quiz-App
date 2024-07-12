
let users = [];
let currentUser = null;
let questions = [
    {
        question: "Which is the largest mammal on Earth?",
        options: ["Elephant",  "Giraffe","Blue Whale", "Hippo"],
        answer: "Blue Whale"
    },
    {
        question: "Who wrote 'Romeo and Juliet'?",
        options: ["William Shakespeare", "Jane Austen", "Charles Dickens", "Leo Tolstoy"],
        answer: "William Shakespeare"
    },
    {
        question: "What is the capital of Spain?",
        options: ["Barcelona", "Seville", "Valencia","Madrid"],
        answer: "Madrid"
    },
    {
        question: "Which country is famous for the Eiffel Tower?",
        options: ["Italy", "France", "Germany", "Spain"],
        answer: "France"
    },
    {
        question: "What is the largest continent by land area?",
        options: ["Asia", "Africa", "North America", "Europe"],
        answer: "Asia"
    }
];

let currentQuestionIndex = 0;
let score = 0;

document.getElementById('signup-btn').addEventListener('click', signUp);
document.getElementById('login-btn').addEventListener('click', login);
document.getElementById('show-login').addEventListener('click', showLogin);
document.getElementById('show-signup').addEventListener('click', showSignUp);
document.getElementById('start-quiz').addEventListener('click', showQuiz);
document.getElementById('restart-quiz').addEventListener('click', restartQuiz);
document.getElementById('go-home').addEventListener('click', showHome);

function signUp() {
    let username = document.getElementById('signup-username').value;
    let password = document.getElementById('signup-password').value;

    if (username && password) {
        users.push({ username, password });
        alert("Sign up successful!");
        showLogin();
    } else {
        alert("Please enter a username and password.");
    }
}

function login() {
    let username = document.getElementById('login-username').value;
    let password = document.getElementById('login-password').value;

    currentUser = users.find(user => user.username === username && user.password === password);

    if (currentUser) {
        alert("Login successful!");
        document.getElementById('auth-links').style.display = 'none';
        document.getElementById('start-quiz').style.display = 'block';
        showHome();
    } else {
        alert("Invalid username or password.");
    }
}

function showSignUp() {
    document.getElementById('signup').style.display = 'block';
    document.getElementById('login').style.display = 'none';
    document.getElementById('home').style.display = 'none';
    document.getElementById('quiz').style.display = 'none';
    document.getElementById('score').style.display = 'none';
}

function showLogin() {
    document.getElementById('signup').style.display = 'none';
    document.getElementById('login').style.display = 'block';
    document.getElementById('home').style.display = 'none';
    document.getElementById('quiz').style.display = 'none';
    document.getElementById('score').style.display = 'none';
}

function showHome() {
    document.getElementById('signup').style.display = 'none';
    document.getElementById('login').style.display = 'none';
    document.getElementById('home').style.display = 'block';
    document.getElementById('quiz').style.display = 'none';
    document.getElementById('score').style.display = 'none';
}

function showQuiz() {
    document.getElementById('signup').style.display = 'none';
    document.getElementById('login').style.display = 'none';
    document.getElementById('home').style.display = 'none';
    document.getElementById('quiz').style.display = 'block';
    document.getElementById('score').style.display = 'none';
    currentQuestionIndex = 0;
    score = 0;
    displayQuestion();
}

function displayQuestion() {
    if (currentQuestionIndex >= questions.length) {
        showScore();
        return;
    }

    let question = questions[currentQuestionIndex];
    let questionContainer = document.getElementById('question-container');
    questionContainer.innerHTML = `
        <div class="question">
            <p>${question.question}</p>
            ${question.options.map((option, index) => `
                <label>
                    <input type="radio" name="option" value="${option}"> ${option}
                </label>
            `).join('')}
            <button id="submit-answer">Submit Answer</button>
        </div>
    `;

    document.getElementById('submit-answer').addEventListener('click', () => {
        let selectedOption = document.querySelector('input[name="option"]:checked');
        if (selectedOption) {
            let isCorrect = selectedOption.value === question.answer;
            if (isCorrect) {
                score++;
            }
            alert(`Your answer is ${isCorrect ? 'correct' : 'incorrect'}. The correct answer is ${question.answer}.`);
            currentQuestionIndex++;
            displayQuestion();
        } else {
            alert("Please select an option.");
        }
    });
}

function showScore() {
    document.getElementById('quiz').style.display = 'none';
    document.getElementById('score').style.display = 'block';
    document.getElementById('score-display').innerText = `You scored ${score} out of ${questions.length}!`;
}

function restartQuiz() {
    showQuiz();
}

// Initially show sign-up form
showSignUp();
