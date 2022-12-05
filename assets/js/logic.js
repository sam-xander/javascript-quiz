var body = document.body;

var startScreen = document.querySelector("#start-screen");
var startButton = document.querySelector("#start");

var timerElement = document.querySelector("#time");
var time = 60;
timerElement.innerText = time;

var questionWrapper = document.querySelector("#question-wrapper");

function getQuestion(questionNumber) {
  var question = questions[questionNumber];
  var title = question.title;
  var choices = question.choices;

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
    if (target.innerText.includes(questions[questionNumber].answer)) {
      console.log("correct");
    } else {
      if (time < 10) {
        time = 1;
      } else {
        time += -10;
      }
    }
  });
}

var questionNumber = 1;

startButton.addEventListener("click", function () {
  startScreen.classList.add("hide");

  var timer = setInterval(function () {
    time--;

    timerElement.innerText = time;

    if (time < 1) {
      clearInterval(timer);
    }
  }, 1000);

  getQuestion(questionNumber);
  checkAnswer(questionNumber);
});
