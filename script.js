const game = document.getElementById("game");

let score = 0;
let timeLeft = 30;
let currentMole = -1;
let speed = 700;
let gameInterval, timerInterval;

/* Create holes */
for (let i = 0; i < 9; i++) {
  const div = document.createElement("div");
  div.classList.add("hole");

  div.onclick = () => hitMole(i);

  game.appendChild(div);
}

/* Start Game */
function startGame(level) {
  document.getElementById("levelScreen").style.display = "none";
  document.getElementById("gameUI").style.display = "block";

  if (level === "easy") speed = 800;
  if (level === "medium") speed = 500;
  if (level === "hard") speed = 300;

  score = 0;
  timeLeft = 30;

  document.getElementById("score").innerText = score;
  document.getElementById("time").innerText = timeLeft;

  gameInterval = setInterval(showMole, speed);
  timerInterval = setInterval(updateTime, 1000);
}

/* Mole logic */
function showMole() {
  const holes = document.querySelectorAll(".hole");
  holes.forEach(h => h.classList.remove("mole"));

  const randomIndex = Math.floor(Math.random() * 9);
  holes[randomIndex].classList.add("mole");

  currentMole = randomIndex;
}

/* Hit */
function hitMole(index) {
  if (index === currentMole) {
    score++;
    document.getElementById("score").innerText = score;
    currentMole = -1;
  }
}

/* Timer */
function updateTime() {
  timeLeft--;
  document.getElementById("time").innerText = timeLeft;

  if (timeLeft === 0) {
    clearInterval(gameInterval);
    clearInterval(timerInterval);

    document.getElementById("finalScore").innerText =
      "Your Score: " + score;

    document.getElementById("overlay").style.display = "flex";
  }
}

/* Restart */
function restartGame() {
  document.getElementById("overlay").style.display = "none";
  startGame("medium");
}

/* Back */
function goBack() {
  clearInterval(gameInterval);
  clearInterval(timerInterval);

  document.getElementById("overlay").style.display = "none";
  document.getElementById("gameUI").style.display = "none";

  const levelScreen = document.getElementById("levelScreen");
  levelScreen.style.display = "flex";

  // 🔥 reset animation (important)
  levelScreen.classList.remove("fade-up");
  void levelScreen.offsetWidth; // force reflow
  levelScreen.classList.add("fade-up");
}