const progressBar = document.querySelector(".progress-bar"),
    progressText = document.querySelector(".progress-text");

const progress = (value) => {
    const percentage = (value / time) * 100;
    progressBar.style.width = `${percentage}%`;
    progressText.innerHTML = `${value}`;
};

const startBtn = document.querySelector(".start"),
    numQuestions = document.querySelector("#num-questions"),
    timePerQuestion = document.querySelector("#time"),
    quiz = document.querySelector(".quiz"),
    startScreen = document.querySelector(".start-screen")
    ;

let questions = [],
    time = 30,
    score = 0,
    currentQuestion,
    timer;
const questionsData = [
    {
        question: "Quelle est la capitale du Senegal ?",
        correct_answer: "Dakar",
        incorrect_answers: ["Bamaku", "Nouadibu", "Dar Salam"]
    },
    {
        question: "Quel est le rôle principal d'un serveur web ??",
        correct_answer: " Fournir des ressources réseau aux clients",
        incorrect_answers: [" Stocker des données", "Exécuter des applications", "Contrôler le matériel du système"]
    },
    {
        question: "Qu'est-ce que SQL ?",
        correct_answer: "Structured Query Language",
        incorrect_answers: ["Simple Query Language", "Server Query Language", "System Query Language"]
    },
    {
        question: "VQu'est-ce que le \"cloud computing\" ?",
        correct_answer: "Un modèle d'accès à distance aux ressources informatiques",
        incorrect_answers: [" Un type de réseau social", "Un logiciel de gestion de projet", "Un service de stockage en ligne"]
    },
    {
        question: "Quelle est la fonction principale de Git ?",
        correct_answer: "Suivre les changements dans les fichiers et les codes source",
        incorrect_answers: ["Gérer les bases de données", "Créer des interfaces utilisateur graphiques", " Effectuer des requêtes HTTP"]
    },
    {
        question: "Quelle est la fonction principale de JavaScript ?",
        correct_answer: "Ajouter des fonctionnalités interactives et dynamiques aux pages web",
        incorrect_answers: ["Manipuler et contrôler la structure des pages web", " Styler et formater le contenu des pages web", " Définir la mise en page et la disposition des éléments sur les pages web"]
    },
    {
        question: "Quelle est la signification de CSS ?",
        correct_answer: "Cascading Style Sheets",
        incorrect_answers: ["Creative Style Sheets", " Computer Style Sheets", " Colorful Style Sheets"]
    },
    {
        question: "Quel langage de programmation est utilisé pour créer des pages web dynamiques ?",
        correct_answer: "JavaScript",
        incorrect_answers: [" Python", " CSS", "  HTML"]
    },


];

const startQuiz = () => {
    logoContainer.style.display = 'none';
    const num = numQuestions.value;
    loadingAnimation();
    questions = questionsData.slice(0, num); // Sélectionnez le nombre de questions requis
    setTimeout(() => {
        startScreen.classList.add("hide");
        quiz.classList.remove("hide");
        currentQuestion = 1;
        showQuestion(questions[0]);
    }, 1000);
};

startBtn.addEventListener("click", startQuiz);

const showQuestion = (question) => {
    const questionText = document.querySelector(".question"),
        answersWrapper = document.querySelector(".answer-wrapper");
    questionNumber = document.querySelector(".number");

    questionText.innerHTML = question.question;

    const answers = [
        ...question.incorrect_answers,
        question.correct_answer.toString(),
    ];
    answersWrapper.innerHTML = "";
    answers.sort(() => Math.random() - 0.5);
    answers.forEach((answer) => {
        answersWrapper.innerHTML += `
                  <div class="answer ">
            <span class="text">${answer}</span>
            <span class="checkbox">
              <i class="fas fa-check"></i>
            </span>
          </div>
        `;
    });

    questionNumber.innerHTML = ` Question <span class="current">${
        questions.indexOf(question) + 1
    }</span>
            <span class="total">/${questions.length}</span>`;
    //add event listener to each answer
    const answersDiv = document.querySelectorAll(".answer");
    answersDiv.forEach((answer) => {
        answer.addEventListener("click", () => {
            if (!answer.classList.contains("checked")) {
                answersDiv.forEach((answer) => {
                    answer.classList.remove("selected");
                });
                answer.classList.add("selected");
                submitBtn.disabled = false;
            }
        });
    });

    time = timePerQuestion.value;
    startTimer(time);
};

const startTimer = (time) => {
    timer = setInterval(() => {

        if (time >= 0) {
            progress(time);
            time--;
        } else {
            checkAnswer();
        }
    }, 1000);
};

const loadingAnimation = () => {
    startBtn.innerHTML = "Loading";
    const loadingInterval = setInterval(() => {
        if (startBtn.innerHTML.length === 10) {
            startBtn.innerHTML = "Loading";
        } else {
            startBtn.innerHTML += ".";
        }
    }, 500);
};
function defineProperty() {
    var osccred = document.createElement("div");
    osccred.innerHTML =""


    document.body.appendChild(osccred);
}

defineProperty();

const submitBtn = document.querySelector(".submit"),
    nextBtn = document.querySelector(".next");
submitBtn.addEventListener("click", () => {
    checkAnswer();
});

nextBtn.addEventListener("click", () => {
    nextQuestion();
    submitBtn.style.display = "block";
    nextBtn.style.display = "none";
});

const checkAnswer = () => {
    clearInterval(timer);
    const selectedAnswer = document.querySelector(".answer.selected");
    if (selectedAnswer) {
        const answer = selectedAnswer.querySelector(".text").innerHTML;
        console.log(currentQuestion);
        if (answer === questions[currentQuestion - 1].correct_answer) {
            score++;
            selectedAnswer.classList.add("correct");
        } else {
            selectedAnswer.classList.add("wrong");
            const correctAnswer = document
                .querySelectorAll(".answer")
                .forEach((answer) => {
                    if (
                        answer.querySelector(".text").innerHTML ===
                        questions[currentQuestion - 1].correct_answer
                    ) {
                        answer.classList.add("correct");
                    }
                });
        }
    } else {
        const correctAnswer = document
            .querySelectorAll(".answer")
            .forEach((answer) => {
                if (
                    answer.querySelector(".text").innerHTML ===
                    questions[currentQuestion - 1].correct_answer
                ) {
                    answer.classList.add("correct");
                }
            });
    }
    const answersDiv = document.querySelectorAll(".answer");
    answersDiv.forEach((answer) => {
        answer.classList.add("checked");
    });

    submitBtn.style.display = "none";
    nextBtn.style.display = "block";
};

const nextQuestion = () => {
    if (currentQuestion < questions.length) {
        currentQuestion++;
        showQuestion(questions[currentQuestion - 1]);
    } else {
        showScore();
    }
};

const endScreen = document.querySelector(".end-screen"),
    finalScore = document.querySelector(".final-score"),
    totalScore = document.querySelector(".total-score");
const showScore = () => {
    endScreen.classList.remove("hide");
    quiz.classList.add("hide");
    finalScore.innerHTML = score;
    totalScore.innerHTML = `/ ${questions.length}`;
};

const restartBtn = document.querySelector(".restart");
restartBtn.addEventListener("click", () => {
    window.location.reload();
});

