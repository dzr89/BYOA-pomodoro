const timeDisplay = document.getElementById('timeDisplay');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const moreTimeBtn = document.getElementById('moreTimeBtn');
const modeToggle = document.getElementById('modeToggle');
const timerBorder = document.getElementById('timerBorder');
const glowEffect = document.getElementById('glowEffect');
const beachOverlay = document.getElementById('beachOverlay');
const themeToggle = document.getElementById('themeToggle');
const focusDisplay = document.getElementById('focusDisplay');

let timeLeft = 25 * 60; // 25 minutes in seconds
let timerId = null;
let isRestMode = false;
let isDarkMode = true; // Default to dark mode

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    timeDisplay.textContent = timeString;
    updatePageTitle();
}

function startTimer() {
    if (timerId === null) {
        // Only prompt for focus text in focus mode and when starting a new session
        if (!isRestMode && timeLeft === (25 * 60)) {
            const focusText = prompt('What will you focus on during this session?');
            if (focusText) {
                focusDisplay.textContent = `Focus: ${focusText}`;
            }
        }

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
    focusDisplay.textContent = ''; // Clear focus text on reset
}

function addMoreTime() {
    timeLeft += 5 * 60; // Add 5 minutes
    updateDisplay();
}

function toggleMode() {
    isRestMode = !isRestMode;
    
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
    
    // Clear focus text when switching modes
    focusDisplay.textContent = '';
    
    // Update button text to show what mode you can switch to
    modeToggle.textContent = isRestMode ? 'Focus Mode' : 'Rest Mode';
    
    // Hide "I Need More Time" button in rest mode
    moreTimeBtn.style.display = 'none';
}

function toggleTheme() {
    isDarkMode = !isDarkMode; // Toggle the boolean
    document.body.classList.toggle('dark-mode', isDarkMode);
    document.body.classList.toggle('light-mode', !isDarkMode);
    
    // Update button text to show what theme you can switch to
    themeToggle.textContent = isDarkMode ? 'Light Mode' : 'Dark Mode';
    
    // Save preference
    localStorage.setItem('darkMode', isDarkMode);
}

function updatePageTitle() {
    document.title = `${timeDisplay.textContent} - Pomodoro Timer`;
}

startBtn.addEventListener('click', startTimer);
resetBtn.addEventListener('click', resetTimer);
moreTimeBtn.addEventListener('click', addMoreTime);
modeToggle.addEventListener('click', toggleMode);
themeToggle.addEventListener('click', toggleTheme);

// Initialize theme from saved preference
const savedDarkMode = localStorage.getItem('darkMode');
if (savedDarkMode !== null) {
    isDarkMode = savedDarkMode === 'true';
    // Update initial button state
    themeToggle.textContent = isDarkMode ? 'Light Mode' : 'Dark Mode';
} else {
    // Set initial state to dark mode
    isDarkMode = true;
    themeToggle.textContent = 'Light Mode';
}

// Set initial visual state
document.body.classList.toggle('dark-mode', isDarkMode);
document.body.classList.toggle('light-mode', !isDarkMode);

// Set initial mode button text
modeToggle.textContent = 'Rest Mode';

// Initial page title update
updatePageTitle(); 