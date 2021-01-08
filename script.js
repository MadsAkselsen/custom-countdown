const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdownForm');
const dateEL = document.getElementById('date-picker');

const countdownEL = document.getElementById('countdown');
const countdownELTitle = document.getElementById('countdown-title');
const countdownBtn = document.getElementById('countdown-button');
const timeElements = document.querySelectorAll('span');

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

    // Add time info to the countdown UI
    countdownELTitle.textContent = `${countdownTitle}`;
    timeElements[0].textContent = `${days}`;
    timeElements[1].textContent = `${hours}`;
    timeElements[2].textContent = `${minutes}`;
    timeElements[3].textContent = `${seconds}`;

    // Hide Input Form
    inputContainer.hidden = true;
    // show countdown
    countdownEL.hidden = false;
  }, 1000);
}

// Take values from form input
function updateCountdown(e) {
  e.preventDefault();
  countdownTitle = e.srcElement[0].value;
  countdownDate = e.srcElement[1].value;
  // Get number version of current date, updateDOM
  countdownValue = new Date(countdownDate).getTime(); // time between countdownDate and 1970 in miliseconds
  updateDOM();
}

// Event listeners
countdownForm.addEventListener('submit', updateCountdown);
