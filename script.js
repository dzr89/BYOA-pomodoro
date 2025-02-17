const timeDisplay = document.getElementById('timeDisplay');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const moreTimeBtn = document.getElementById('moreTimeBtn');
const modeToggle = document.getElementById('modeToggle');
const timerBorder = document.getElementById('timerBorder');
const glowEffect = document.getElementById('glowEffect');
const beachOverlay = document.getElementById('beachOverlay');

let timeLeft = 25 * 60; // 25 minutes in seconds
let timerId = null;
let isRestMode = false;

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timeDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function startTimer() {
    if (timerId === null) {
        startBtn.textContent = 'Pause';
        timerId = setInterval(() => {
            timeLeft--;
            updateDisplay();
            
            if (timeLeft === 0) {
                clearInterval(timerId);
                timerId = null;
                alert(isRestMode ? 'Rest time completed!' : 'Pomodoro session completed!');
                startBtn.textContent = 'Start';
                moreTimeBtn.style.display = 'none'; // Hide button when timer completes
            }
        }, 1000);
        
        // Show "I Need More Time" button only in focus mode
        if (!isRestMode) {
            moreTimeBtn.style.display = 'block';
        }
    } else {
        clearInterval(timerId);
        timerId = null;
        startBtn.textContent = 'Start';
    }
}

function resetTimer() {
    clearInterval(timerId);
    timerId = null;
    timeLeft = isRestMode ? 5 * 60 : 25 * 60;
    updateDisplay();
    startBtn.textContent = 'Start';
    moreTimeBtn.style.display = 'none'; // Hide button on reset
}

function addMoreTime() {
    timeLeft += 5 * 60; // Add 5 minutes
    updateDisplay();
}

function toggleMode() {
    isRestMode = modeToggle.checked;
    
    // Update timer duration
    timeLeft = isRestMode ? 5 * 60 : 25 * 60;
    
    // Reset timer state
    clearInterval(timerId);
    timerId = null;
    startBtn.textContent = 'Start';
    updateDisplay();
    
    // Toggle visual styles
    document.body.classList.toggle('rest-mode', isRestMode);
    timerBorder.classList.toggle('rest-mode', isRestMode);
    glowEffect.classList.toggle('rest-mode', isRestMode);
    beachOverlay.classList.toggle('active', isRestMode);
    
    // Hide "I Need More Time" button in rest mode
    moreTimeBtn.style.display = 'none';
}

startBtn.addEventListener('click', startTimer);
resetBtn.addEventListener('click', resetTimer);
moreTimeBtn.addEventListener('click', addMoreTime);
modeToggle.addEventListener('click', toggleMode); 