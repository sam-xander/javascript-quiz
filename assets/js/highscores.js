var highscoreElement = document.querySelector("#highscores");
var clearHighscoreElement = document.querySelector("#clear");

var highscores = JSON.parse(localStorage.getItem("highscores"));

if (!highscores) {
  var highscores = [];
}

function printScores() {
  highscoreElement.innerHTML = "";

  highscores.forEach(function (item) {
    highscoreElement.insertAdjacentHTML(
      "beforeend",
      `<li>${item.initials} - ${item.score}</li>`
    );
  });
}

function clearHighscores() {
  highscores = [];
  localStorage.setItem("highscores", JSON.stringify(highscores));

  printScores();
}

clearHighscoreElement.addEventListener("click", clearHighscores);

printScores();
