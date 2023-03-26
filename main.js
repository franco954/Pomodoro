const breakLength = document.getElementById('break-length');
const sessionLength = document.getElementById('session-length');
const timerLabel = document.getElementById('timer-label');
const timeLeft = document.getElementById('time-left');
const startStopBtn = document.getElementById('start_stop');
const resetBtn = document.getElementById('reset');
const breakDecrementBtn = document.getElementById('break-decrement');
const breakIncrementBtn = document.getElementById('break-increment');
const sessionDecrementBtn = document.getElementById('session-decrement');
const sessionIncrementBtn = document.getElementById('session-increment');
const beepSound = document.getElementById('beep');

let breakLengthValue = parseInt(breakLength.innerHTML);
let sessionLengthValue = parseInt(sessionLength.innerHTML);
let timeLeftValue = sessionLengthValue * 60; // in seconds
let timerId;
let isRunning = false;

function formatTimeLeft(timeLeftValue) {
    let minutes = Math.floor(timeLeftValue / 60);
    let seconds = timeLeftValue % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function updateTimer() {
    timeLeftValue--;
    timeLeft.innerHTML = formatTimeLeft(timeLeftValue);
    if (timeLeftValue < 0) {
        clearInterval(timerId);
        beepSound.play();
        if (timerLabel.innerHTML === 'Session') {
            timerLabel.innerHTML = 'Break';
            timeLeftValue = breakLengthValue * 60;
        } else {
            timerLabel.innerHTML = 'Session';
            timeLeftValue = sessionLengthValue * 60;
        }
        startStopBtn.innerHTML = 'Start';
    }
}

breakDecrementBtn.addEventListener('click', () => {
    if (breakLengthValue > 1) {
        breakLengthValue--;
        breakLength.innerHTML = breakLengthValue;
        if (timerLabel.innerHTML === 'Break') {
            timeLeftValue = breakLengthValue * 60;
            timeLeft.innerHTML = formatTimeLeft(timeLeftValue);
        }
    }
});

breakIncrementBtn.addEventListener('click', () => {
    if (breakLengthValue < 60) {
        breakLengthValue++;
        breakLength.innerHTML = breakLengthValue;
        if (timerLabel.innerHTML === 'Break') {
            timeLeftValue = breakLengthValue * 60;
            timeLeft.innerHTML = formatTimeLeft(timeLeftValue);
        }
    }
});

sessionDecrementBtn.addEventListener('click', () => {
    if (sessionLengthValue > 1) {
        sessionLengthValue--;
        sessionLength.innerHTML = sessionLengthValue;
        if (timerLabel.innerHTML === 'Session') {
            timeLeftValue = sessionLengthValue * 60;
            timeLeft.innerHTML = formatTimeLeft(timeLeftValue);
        }
    }
});

sessionIncrementBtn.addEventListener('click', () => {
    if (sessionLengthValue < 60) {
        sessionLengthValue++;
        sessionLength.innerHTML = sessionLengthValue;
        if (timerLabel.innerHTML === 'Session') {
            timeLeftValue = sessionLengthValue * 60;
            timeLeft.innerHTML = formatTimeLeft(timeLeftValue);
        }
    }
});

startStopBtn.addEventListener('click', () => {
    if (!isRunning) {
        isRunning = true;
        startStopBtn.innerHTML = 'Stop';
        timerId = setInterval(updateTimer, 1000);
    } else {
        isRunning = false;
        startStopBtn.innerHTML = 'Start';
        clearInterval(timerId);
    }
});

resetBtn.addEventListener('click', () => {
    clearInterval(timerId);
    isRunning = false;
    timerLabel.innerHTML = 'Session';
    breakLengthValue = 5;
    sessionLengthValue = 25;
    breakLength.innerHTML = breakLengthValue;
    sessionLength.innerHTML = sessionLengthValue;
    timeLeftValue = sessionLengthValue * 60;
    timeLeft.innerHTML = formatTimeLeft(timeLeftValue);
    startStopBtn.innerHTML = 'Start';
    beepSound.pause();
    beepSound.currentTime = 0;
});