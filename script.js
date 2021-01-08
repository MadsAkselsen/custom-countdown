const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdownForm');
const dateEL = document.getElementById('date-picker');

const countdownEl = document.getElementById('countdown');
const countdownElTitle = document.getElementById('countdown-title');
const countdownBtn = document.getElementById('countdown-button');
const timeElements = document.querySelectorAll('span');

const completeEl = document.getElementById('complete');
const completeElInfo = document.getElementById('complete-info');
const newCountdownBtn = document.getElementById('newCountdown-button');

let countdownTitle = '';
let countdownDate = '';
let countdownValue = Date;
let countdownActive;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

// Set the first available date with Today's Date
const today = new Date().toISOString().split('T')[0]; // Today's date turned into a format that the date picker understands
dateEL.setAttribute('min', today);

// Populate Countdown / Complete UI
function updateDOM() {
  countdownActive = setInterval(() => {
    const now = new Date().getTime(); // getting the current moment in time and how far from 1970 we are in miliseconds
    const distance = countdownValue - now; // Finding the time between now and the date submitted in the form (in miliseconds)
    const days = Math.floor(distance / day);
    const hours = Math.floor((distance % day) / hour);
    const minutes = Math.floor((distance % hour) / minute);
    const seconds = Math.floor((distance % minute) / second);

    // Hide Input Form
    inputContainer.hidden = true;

    // if the countdown has ended, show complete card
    if (distance < 0) {
      countdownEl.hidden = true;
      clearInterval(countdownActive);
      completeElInfo.textContent = `${countdownTitle} finished ${countdownDate}`;
      completeEl.hidden = false;
    } else {
      // else, show the countdown in progress
      // Add time info to the countdown UI
      countdownElTitle.textContent = `${countdownTitle}`;
      timeElements[0].textContent = `${days}`;
      timeElements[1].textContent = `${hours}`;
      timeElements[2].textContent = `${minutes}`;
      timeElements[3].textContent = `${seconds}`;
      completeEl.hidden = true;
      countdownEl.hidden = false;
    }
  }, 1000);
}

// Take values from form input
function updateCountdown(e) {
  e.preventDefault();
  countdownTitle = e.srcElement[0].value;
  countdownDate = e.srcElement[1].value;
  // check for valid date
  if (countdownDate === '') {
    alert('Please select a date for the countdown');
  } else {
    // Get number version of current date, updateDOM
    countdownValue = new Date(countdownDate).getTime(); // time between countdownDate and 1970 in miliseconds
    updateDOM();
  }
}

// reset all values
function reset() {
  // hide countdowns, show input
  countdownEl.hidden = true;
  completeEl.hidden = true;
  inputContainer.hidden = false;
  // stop the countdown
  clearInterval(countdownActive);
  // reset values
  countdownTitle = '';
  countdownDate = '';
}

// Event listeners
countdownForm.addEventListener('submit', updateCountdown);
countdownBtn.addEventListener('click', reset);
newCountdownBtn.addEventListener('click', reset);
