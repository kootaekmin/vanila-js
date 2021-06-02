const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdownForm');
const dateEl = document.getElementById('date-picker');

const countdownEl = document.getElementById('countdown');
const countdownElTitle = document.getElementById('countdown-title');
const countdownButton = document.getElementById('countdown-button');
const timeElements = document.querySelectorAll('span');

let countdownTitle = '';
let countdownDate = '';
let countdownValue = Date;

// set date input min with today's date;
const today = new Date().toISOString().split('T')[0];
dateEl.setAttribute('min', today);

// populate countdown / complete ui
function updateDOM() {}

// Take values from form input
function updateCountdown(e) {
	e.preventDefault();
	countdownTitle = e.srcElement[0].value;
	countdownDate = e.srcElement[1].value;
	console.log(countdownTitle, countdownDate);
	// get number version of current Date, updateDOM
	countdownValue = new Date(countdownDate).getTime();
	updateDOM();
}

// event listener
countdownForm.addEventListener('submit', updateCountdown);
