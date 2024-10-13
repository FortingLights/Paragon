const audio = new Audio();
const playButton = document.getElementById("play");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const trackList = document.getElementById("track-list");
const playbar = document.getElementById("playbar");
const volumeControl = document.getElementById("volume");
let isRepeating = false; // Variable to track repeat state


// Track details
const tracks = [
    { title: "Who We Are", src: "file:///D:/PBEATS%20SITE/Audio%20Files/Who%20We%20Are2.mp3" },
    { title: "Maybe", src: "file:///D:/PBEATS%20SITE/Audio%20Files/Maybe.mp3" },
    { title: "Fell Apart", src: "file:///D:/PBEATS%20SITE/Audio%20Files/Fell%20Apart.mp3" },
    { title: "What Went Wrong? (Interlude)", src: "file:///D:/PBEATS%20SITE/Audio%20Files/What%20Went%20Wrong%20(Interlude).mp3" },
    { title: "Lose Control", src: "file:///D:/PBEATS%20SITE/Audio%20Files/Lose%20Control.mp3" },
    { title: "Legend Of Heartbreak", src: "file:///D:/PBEATS%20SITE/Audio%20Files/Legend%20Of%20Heartbreak.mp3" },
    { title: "New Ways Pt 2.", src: "file:///D:/PBEATS%20SITE/Audio%20Files/New%20Ways%20pt%202..mp3" },
    { title: "Strangers/Haters (Interlude)", src: "file:///D:/PBEATS%20SITE/Audio%20Files/Strangers,%20Haters.mp3" },
    { title: "Last Message", src: "file:///D:/PBEATS%20SITE/Audio%20Files/Last%20Message.mp3" },
    { title: "Never Go.", src: "file:///D:/PBEATS%20SITE/Audio%20Files/Never%20Go..mp3" },
    { title: "Paragon", src: "file:///D:/PBEATS%20SITE/Audio%20Files/Paragon.mp3" }
];

let currentTrackIndex = 0;

// Function to load the current track
function loadTrack(index) {
    audio.src = tracks[index].src;
    audio.load(); // Preload the audio
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

// Preload next track
function preloadNextTrack() {
    const nextIndex = (currentTrackIndex + 1) % tracks.length;
    const nextAudio = new Audio(tracks[nextIndex].src);
    nextAudio.load();
}

// Autoplay next track when the current one ends
audio.addEventListener('ended', () => {
    preloadNextTrack(); // Preload the next track
    currentTrackIndex = (currentTrackIndex + 1) % tracks.length; // Move to the next track
    loadTrack(currentTrackIndex); // Load the next track
    audio.play(); // Start playing the next track
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
    playbar.value = (audio.currentTime / audio.duration) * 100; // Update playbar position
});

// Seek functionality for playbar
playbar.addEventListener("input", (event) => {
    audio.currentTime = (audio.duration * event.target.value) / 100; // Seek to the selected position
});

