const container = document.querySelector(".container"),
mainVideo = container.querySelector("video"),
videoTimeline = container.querySelector(".video-timeline"),
progressBar = container.querySelector(".progress-bar"),
volumeBtn = container.querySelector(".volume i"),
volumeSlider = container.querySelector(".left input");
currentVidTime = container.querySelector(".current-time"),
videoDuration = container.querySelector(".video-duration"),
skipBackward = container.querySelector(".skip-backward i"),
skipForward = container.querySelector(".skip-forward i"),
playPauseBtn = container.querySelector(".play-pause i"),
fullScreenBtn = container.querySelector(".fullscreen i");
let timer;

/* Unfortunately while following the tutorial, I ran into some fine tuning problems when
   attempting to make a minimalist experience that correlated with the original features of
   the first media player. I noticed when attempting to remove some of the expanded features, 
   that the entire javascript would break due to something occuring in the above 13 lines of code. 
   Despite my decision to leave the above in, the rest of the code successfully works
   for the experience I want to communicate */

/* Here we have the fundamental script which calculates the newly added feature for the project. 
   I felt a precise timeline calculator would be the most important feature to add, when factoring in
   that fullscreen can be made with CSS, and that the page's only content is the video. I also felt that
   a volume slider wouldn't be the best decision when a user can already adjust the volume of their own
   device during the video experience. While thinking about the user interactivity with the video, I frequently
   found myself struggling to fully engage with the timeline since I could not navigate to the exact points I found
   interesting. This lead to my decision to add a precise time feature to the project. The underneath two scripts
   demonstrates the calculation and feedback loop for the video to recognise how far through the videos duration is 
   without resorting to excessive amounts of numbers being displayed. This is followed by an event listener which
   displays how the movement of the mouse will corrolate with the width of the progress bar, calculating it's position based on the video duration. */

const formatTime = time => {
    let seconds = Math.floor(time % 60),
    minutes = Math.floor(time / 60) % 60,
    hours = Math.floor(time / 3600);

    seconds = seconds < 10 ? `0${seconds}` : seconds;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    hours = hours < 10 ? `0${hours}` : hours;

    if(hours == 0) {
        return `${minutes}:${seconds}`
    }
    return `${hours}:${minutes}:${seconds}`;
}

videoTimeline.addEventListener("mousemove", e => {
    let timelineWidth = videoTimeline.clientWidth;
    let offsetX = e.offsetX;
    let percent = Math.floor((offsetX / timelineWidth) * mainVideo.duration);
    const progressTime = videoTimeline.querySelector("span");
    offsetX = offsetX < 20 ? 20 : (offsetX > timelineWidth - 20) ? timelineWidth - 20 : offsetX;
    progressTime.style.left = `${offsetX}px`;
    progressTime.innerText = formatTime(percent);
});

/* For this script, we are allowing the user to click a position on the timeline, and moving the current position
  of the video to where the user has defined, which is done by calculating the offset of the new location being divided by the 
  total of the timeline, and being multiplied by the total duration of said video */
  
  videoTimeline.addEventListener("click", e => {
    let timelineWidth = videoTimeline.clientWidth;
    mainVideo.currentTime = (e.offsetX / timelineWidth) * mainVideo.duration;
});

/* The next three scripts serve the most important role in translating the above inputs into loading the video. 
  This is achieved by defining the current position, and then moving via percentages in order to load the video
  while updating it's duration. Ensuring that the current time feature being displayed will be utilised to it's 
  best capacity. */

mainVideo.addEventListener("timeupdate", e => {
    let {currentTime, duration} = e.target;
    let percent = (currentTime / duration) * 100;
    progressBar.style.width = `${percent}%`;
    currentVidTime.innerText = formatTime(currentTime);
});

mainVideo.addEventListener("loadeddata", () => {
    videoDuration.innerText = formatTime(mainVideo.duration);
});

const draggableProgressBar = e => {
    let timelineWidth = videoTimeline.clientWidth;
    progressBar.style.width = `${e.offsetX}px`;
    mainVideo.currentTime = (e.offsetX / timelineWidth) * mainVideo.duration;
    currentVidTime.innerText = formatTime(mainVideo.currentTime);
}

/* Here we have the volume adjustment. This was originally made with a full volume slider feature, enabling a scenario
   where if the volume was fully decreased, it would display a mute icon. The underneath code has been left in the instance
   of being readded in the future */
volumeBtn.addEventListener("click", () => {
    if(!volumeBtn.classList.contains("fa-volume-high")) {
        mainVideo.volume = 0.5;
        volumeBtn.classList.replace("fa-volume-xmark", "fa-volume-high");
    } else {
        mainVideo.volume = 0.0;
        volumeBtn.classList.replace("fa-volume-high", "fa-volume-xmark");
    }
    volumeSlider.value = mainVideo.volume;
});


mainVideo.addEventListener("play", () => playPauseBtn.classList.replace("fa-play", "fa-pause"));
mainVideo.addEventListener("pause", () => playPauseBtn.classList.replace("fa-pause", "fa-play"));
playPauseBtn.addEventListener("click", () => mainVideo.paused ? mainVideo.play() : mainVideo.pause());
videoTimeline.addEventListener("mousedown", () => videoTimeline.addEventListener("mousemove", draggableProgressBar));
document.addEventListener("mouseup", () => videoTimeline.removeEventListener("mousemove", draggableProgressBar));