const audio = new Audio();
const playButton = document.getElementById("play");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const trackList = document.getElementById("track-list");
const playbar = document.getElementById("playbar");
const volumeControl = document.getElementById("volume");
const currentTrackDisplay = document.getElementById("current-track");
let isRepeating = false;

// Track details
const tracks = [
    { title: "Who We Are", src: "Audio Files/Who We Are2.mp3" },
    { title: "Maybe", src: "Audio Files/Maybe.mp3" },
    { title: "Fell Apart", src: "Audio Files/Fell Apart.mp3" },
    { title: "What Went Wrong? (Interlude)", src: "Audio Files/What Went Wrong (Interlude).mp3" },
    { title: "Lose Control", src: "Audio Files/Lose Control.mp3" },
    { title: "Legend Of Heartbreak", src: "Audio Files/Legend Of Heartbreak.mp3" },
    { title: "New Ways Pt 2.", src: "Audio Files/New Ways pt 2..mp3" },
    { title: "Strangers/Haters (Interlude)", src: "Audio Files/Strangers, Haters.mp3" },
    { title: "Last Message", src: "Audio Files/Last Message.mp3" },
    { title: "Never Go.", src: "Audio Files/Never Go..mp3" },
    { title: "Paragon", src: "Audio Files/Paragon.mp3" }
];

let currentTrackIndex = 0;

// Function to load the current track
function loadTrack(index) {
    audio.src = tracks[index].src;
    audio.load(); // Preload the audio
    currentTrackDisplay.innerText = tracks[index].title; // Update Now Playing display
}

// Function to populate track list
function populateTrackList() {
    tracks.forEach((track, index) => {
        const trackItem = document.createElement("div");
        trackItem.className = "track-item";
        trackItem.innerText = track.title;
        trackItem.addEventListener("click", () => {
            currentTrackIndex = index;
            loadTrack(currentTrackIndex);
            audio.play();
            playButton.innerHTML = "&#10074;&#10074;"; // Pause icon
        });
        trackList.appendChild(trackItem);
    });
}

// Play/Pause functionality
playButton.addEventListener("click", () => {
    if (audio.paused) {
        audio.play();
        playButton.innerHTML = "&#10074;&#10074;"; // Pause icon
    } else {
        audio.pause();
        playButton.innerHTML = "&#9654;"; // Play icon
    }
});

// Previous Track
prevButton.addEventListener("click", () => {
    currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    loadTrack(currentTrackIndex);
    audio.play();
    playButton.innerHTML = "&#10074;&#10074;"; // Pause icon
});

// Next Track
nextButton.addEventListener("click", () => {
    currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
    loadTrack(currentTrackIndex);
    audio.play();
    playButton.innerHTML = "&#10074;&#10074;"; // Pause icon
});

// Autoplay next track when the current one ends
audio.addEventListener('ended', () => {
    if (!isRepeating) {
        currentTrackIndex = (currentTrackIndex + 1) % tracks.length; // Move to the next track
        loadTrack(currentTrackIndex); // Load the next track
        audio.play(); // Start playing the next track
    } else {
        audio.currentTime = 0; // Replay the current track
        audio.play();
    }
});

// Load the first track on page load
loadTrack(currentTrackIndex);
populateTrackList();

// Volume Control
volumeControl.addEventListener("input", (event) => {
    audio.volume = event.target.value / 100; // Set audio volume (0 to 1)
});

// Update Playbar
audio.addEventListener("timeupdate", () => {
    if (audio.duration) {
        playbar.value = (audio.currentTime / audio.duration) * 100; // Update playbar position
    }
});

// Seek functionality for playbar
playbar.addEventListener("input", (event) => {
    audio.currentTime = (audio.duration * event.target.value) / 100; // Seek to the selected position
});

// Error handling for audio
audio.addEventListener("error", (e) => {
    console.error("Error occurred while playing audio: ", e);
    // Optionally load the next track on error
    nextButton.click();
});
