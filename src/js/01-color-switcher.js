const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const bodyEl = document.querySelector('body');

startBtn.addEventListener('click', clickBtnStart);

stopBtn.addEventListener('click', clickBtnStop);

let timerId = null;
stopBtn.disabled = true;

function clickBtnStart() {
  setBodyBgColor();

  timerId = setInterval(() => {
    setBodyBgColor();
  }, 1000);

  startBtn.disabled = true;
  stopBtn.disabled = false;
}

function clickBtnStop() {
  startBtn.disabled = false;
  stopBtn.disabled = true;
  document.body.style.backgroundColor = '';
  clearInterval(timerId);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function setBodyBgColor() {
  document.body.style.backgroundColor = getRandomHexColor();
}
