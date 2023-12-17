const startBtn = document.querySelector("#startBtn");
const quitBtn = document.querySelector("#quitBtn");
const gameBtn = document.querySelectorAll(".gameBtn");
const scoreDisplay = document.querySelector(".score");
const scoreOverlay = document.querySelector(".scoreOverlay");
const closeBtn = document.querySelector("#closeBtn");
const alarm = document.querySelector(".alarm");
const alarmRing = document.querySelector(".alarmRing");

let alarmSound = new Audio("./sounds/alarmSound.mp3");
let hitSound = new Audio("./sounds/hitSound.mp3");
let roosterSound = new Audio("./sounds/rooster.mp3");

let score = 0;
let timer;
let pace = 1000;
let active = 0;
let rounds = 0;
let clickedDuringInactive = false;

const getRndNum = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const clickGameBtn = (i) => {
  if (i !== active || clickedDuringInactive) {
    return endGame();
  }

  if (hitSound.paused) {
    hitSound.play();
  } else {
    hitSound.currentTime = 0;
  }

  rounds--;
  score += 1;
  scoreDisplay.textContent = score;
  clickedDuringInactive = true;
};

let alarmSounds = [];
const maxAlarmSounds = 5;

const createAlarmSounds = () => {
  for (let i = 0; i < maxAlarmSounds; i++) {
    alarmSounds.push(new Audio("./sounds/alarmSound.mp3"));
    alarmSounds[i].onended = () => {
      alarmSounds[i].isPlaying = false;
    };
  }
};

const playAlarm = () => {
  for (let i = 0; i < alarmSounds.length; i++) {
    if (!alarmSounds[i].isPlaying || alarmSounds[i].ended) {
      alarmSounds[i].play();
      alarmSounds[i].isPlaying = true;
      break;
    }
  }
};

createAlarmSounds();

const startGame = () => {
  if (rounds >= 3) {
    return endGame();
  }

  enableEvents();
  const newActive = pickNew(active);
  gameBtn[newActive].classList.toggle("active");
  gameBtn[active].classList.remove("active");
  clickedDuringInactive = false;

  playAlarm();

  gameBtn.forEach((btn, i) => {
    if (i === newActive) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });

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

gameBtn.forEach((gameBtn, i) => {
  gameBtn.addEventListener("click", () => clickGameBtn(i));
});

const enableEvents = () => {
  gameBtn.forEach((gameBtn) => {
    gameBtn.style.pointerEvents = "auto";
  });
};

const scoreModalShow = () => {
  roosterSound.play();
  scoreOverlay.classList.toggle("visible");
  scoreModal.innerHTML = `<p>Wakey Wakey Eggs and Bakey! </br> Your Final Score: ${score}</p>`;
};

const showQuit = () => {
  quitBtn.classList.toggle("visible");
  startBtn.classList.toggle("hidden");
};

const resetGame = () => {
  window.location.reload();
};

const endGame = () => {
  console.log("Game ended");
  scoreModalShow();
  clearTimeout(timer);
};

startBtn.addEventListener("click", startGame);
startBtn.addEventListener("click", showQuit);
quitBtn.addEventListener("click", endGame);
quitBtn.addEventListener("click", showQuit);
closeBtn.addEventListener("click", resetGame);
