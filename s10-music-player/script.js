const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');

const music = document.querySelector('audio');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');

const prevButton = document.getElementById('prev');
const playButton = document.getElementById('play');
const nextButton = document.getElementById('next');

// Music
const songs = [
	{
		name: 'jacinto-1',
		displayName: 'Electric Chill Machine',
		artist: 'Jacinto Design',
	},
	{
		name: 'jacinto-2',
		displayName: 'Seven Nation Army',
		artist: 'Jacinto Design',
	},
	{
		name: 'jacinto-3',
		displayName: 'Goodnight, Disco Queen',
		artist: 'Jacinto Design',
	},
	{
		name: 'metric-1',
		displayName: 'Front Row(remix)',
		artist: 'Jacinto Design',
	},
];

// Check if Playing
let isPlaying = false;

// Play
function playSong() {
	isPlaying = true;
	playButton.classList.replace('fa-play', 'fa-pause');
	playButton.setAttribute('title', 'Pause');
	music.play();
}

// Pause
function pauseSong() {
	isPlaying = false;
	playButton.classList.replace('fa-pause', 'fa-play');
	playButton.setAttribute('title', 'play');
	music.pause();
}

// Play or Pause
playButton.addEventListener('click', () =>
	isPlaying ? pauseSong() : playSong()
);

// Update DOM
function loadSong(song) {
	title.textContent = song.displayName;
	artist.textContent = song.artist;
	music.src = `./music/${song.name}.mp3`;
	image.src = `./img/${song.name}.jpg`;
}

// Current Song
let songIndex = 0;

function prevSong() {
	songIndex--;
	if (songIndex < 0) {
		songIndex = songs.length - 1;
	}
	loadSong(songs[songIndex]);
	playSong();
}

function nextSong() {
	songIndex++;
	if (songIndex > songs.length - 1) {
		songIndex = 0;
	}
	loadSong(songs[songIndex]);
	playSong();
}

// On Load - Select First Sonf
loadSong(songs[songIndex]);

// update progress bar & time
function updateProgressBar(e) {
	console.log(e);
	if (isPlaying) {
		const { duration, currentTime } = e.srcElement;
		// updata progress bar width
		const progressPercent = (currentTime / duration) * 100;
		progress.style.width = `${progressPercent}%`;

		// calculate display for duration
		const durationMinutes = Math.floor(duration / 60);
		let durationSeconds = Math.floor(duration % 60);
		if (durationSeconds < 10) {
			durationSeconds = `0${durationSeconds}`;
		}
		// Delay switching duration Element to avoid NaN
		if (durationSeconds) {
			durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
		}
		// Calculate display for currentTime
		const currentMinutes = Math.floor(currentTime / 60);
		let currentSeconds = Math.floor(currentTime % 60);
		if (currentSeconds < 10) {
			currentSeconds = `0${currentSeconds}`;
		}
		currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
	}
}

// Set Progress Bar
function setProgressBar(e) {
	const width = this.clientWidth;
	const clickX = e.offsetX;
	const { duration } = music;
	music.currentTime = (clickX / width) * duration;
}

// Event Listeners
prevButton.addEventListener('click', prevSong);
nextButton.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);
