const videoElement = document.getElementById('video');
const button = document.getElementById('button');

// Prompt to select media stream, pass to video element, then play

async function selectMediaStream() {
	try {
		const mediaStream = await navigator.mediaDevices.getDisplayMedia();
		videoElement.srcObject = mediaStream;
		videoElement.onloadedmetadata = () => {
			videoElement.play();
		};
	} catch (error) {
		// catch error here
		console.log(`error: ${error}`);
	}
}

button.addEventListener('click', async () => {
	// Disable button
	button.disable = true;
	// start pip
	await videoElement.requestPictureInPicture();
	// Reset the button
	button.disable = false;
});

// On Load
selectMediaStream();
