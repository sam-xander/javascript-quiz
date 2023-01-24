var body = document.body;

var startScreen = document.querySelector("#start-screen");
var startButton = document.querySelector("#start");
var feedbackElement = document.querySelector("#feedback");

var timerElement = document.querySelector("#time");
var time = 60;
timerElement.innerText = time;

var questionWrapper = document.querySelector("#question-wrapper");

var highscores = JSON.parse(localStorage.getItem("highscores"));

if (!highscores) {
  var highscores = [];
}

var correctAnswerSound = document.querySelector("#correct-answer-sound");
var incorrectAnswerSound = document.querySelector("#incorrect-answer-sound");

function getQuestion(questionNumber) {
  questionWrapper.innerHTML = "";
  var question = questions[questionNumber];
  var title = question.title;
  var choices = question.choices;

  choices.sort(function () {
    return 0.5 - Math.random();
  });

  questionWrapper.insertAdjacentHTML(
    "beforeend",
    `<div id="question" class="">
      <h2 id="question-title"></h2>
      <div id="choices" class="choices"></div>
      </div>`
  );

  var titleElement = document.querySelector("#question-title");

  titleElement.innerText = title;

  var choicesElement = document.querySelector("#choices");

  var number = 1;

  for (var choice in choices) {
    choicesElement.insertAdjacentHTML(
      "beforeend",
      `<button>${number}. ${choices[choice]}</button>`
    );
    number++;
  }
}

function checkAnswer(questionNumber) {
  questionWrapper.addEventListener("click", function (event) {
    var target = event.target;

    feedbackElement.classList.remove("hide");

    if (target.innerText.includes(questions[questionNumber].answer)) {
      correctAnswerSound.play();
      feedbackElement.innerHTML = "Correct!";

      questionNumber++;

      if (questionNumber < questions.length) {
        getQuestion(questionNumber);
      } else {
        resetPlay();
      }
    } else {
      incorrectAnswerSound.play();
      feedbackElement.innerHTML = "Incorrect!";

      if (time < 10) {
        time = 0;
      } else {
        time += -10;
      }
    }
  });
}

function saveScore(time) {
  var initials = prompt("Enter your initials.");

  if (!initials) {
    initials = "Anon";
  }

  var score = time;

  var currentScore = {
    score: score,
    initials: initials,
  };

  highscores.push(currentScore);

  highscores.sort(function (a, b) {
    return b.score - a.score;
  });

  localStorage.setItem("highscores", JSON.stringify(highscores));
}

function resetPlay() {
  saveScore(time);
  questionWrapper.innerHTML = "";
  startScreen.classList.remove("hide");
  feedbackElement.classList.add("hide");
}

var questionNumber = 0;

startButton.addEventListener("click", function () {
  startScreen.classList.add("hide");

  var timer = setInterval(function () {
    if (time > 0) {
      time--;
    }

    timerElement.innerText = time;

    if (time < 1) {
      clearInterval(timer);
      resetPlay();
    }
  }, 1000);

  getQuestion(questionNumber);
  checkAnswer(questionNumber);
});
