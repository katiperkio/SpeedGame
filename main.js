const startBtn = document.querySelector("#startBtn");
const quitBtn = document.querySelector("#quitBtn");
const gameBtn = document.querySelectorAll(".gameBtn");
const scoreDisplay = document.querySelector(".score");

let score = 0;
let timer;
let pace = 1000;
let active = 0;
let rounds = 0;

const getRndNum = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const clickGameBtn = (i) => {
  if (i !== active) {
    return endGame();
  }
  rounds--;
  score += 1;
  scoreDisplay.textContent = score;
};

gameBtn.forEach((gameBtn, i) => {
  gameBtn.addEventListener("click", () => clickGameBtn(i));
});

const enableEvents = () => {
  gameBtn.forEach((gameBtn) => {
    gameBtn.style.pointerEvents = "auto";
  });
};

const startGame = () => {
  if (rounds >= 3) {
    return endGame();
  }

  enableEvents();
  const newActive = pickNew(active);

  gameBtn[newActive].classList.toggle("active");
  gameBtn[active].classList.remove("active");

  active = newActive;

  timer = setTimeout(startGame, pace);

  pace -= 10;
  rounds++;
  function pickNew(active) {
    const newActive = getRndNum(0, 3);
    if (newActive !== active) {
      return newActive;
    }
    return pickNew(active);
  }
};

const endGame = () => {
  console.log("Game ended");
  clearTimeout(timer);
  resetGame();
};

const resetGame = () => {
  window.location.reload();
};

startBtn.addEventListener("click", startGame);
quitBtn.addEventListener("click", endGame);
