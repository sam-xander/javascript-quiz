var body = document.body;

var startScreen = document.querySelector("#start-screen");
var startButton = document.querySelector("#start");

var timerElement = document.querySelector("#time");
var startTime = 60;
timerElement.innerText = startTime;

var questionNumber = 0;

function getQuestion(questionNumber) {
  var question = questions[questionNumber];
  var title = question.title;
  var choices = question.choices;

  var questionWrapper = document.querySelector("#question-wrapper");
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

startButton.addEventListener("click", function () {
  startScreen.classList.add("hide");

  setInterval(function () {
    startTime--;

    timerElement.innerText = startTime;
  }, 1000);

  getQuestion(questionNumber);
});
