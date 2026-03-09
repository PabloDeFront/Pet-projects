let parallaxX = 0;
let parallaxY = 0;
let isSeeking = false;
let isDragging = false;


const video = document.getElementById("bg-video");
const cover = document.getElementById("cover");
const card = document.querySelector(".audio-card");
const audio = document.getElementById("audio-player");
audio.volume = 0.5; 

const ROTATIONS_PER_SECOND = 33.3 / 60; 

function animate() {

    const angle = audio.currentTime * ROTATIONS_PER_SECOND * 80;

    cover.style.transform =
        `rotate(${angle}deg)
         translateX(${parallaxX}px)
         translateY(${parallaxY}px)
         rotateX(${-parallaxY}deg)
         rotateY(${parallaxX}deg)`;

    requestAnimationFrame(animate);
}

animate();

audio.addEventListener("play", () => {
    video.play();
    video.classList.add("video-active");
    cover.classList.add("playing");

    card.classList.add("move-right");
});

audio.addEventListener("pause", () => {

    video.pause();
    video.classList.remove("video-active");
    cover.classList.remove("playing");

    setTimeout(() => {
        if (audio.paused && !audio.seeking && !isDragging) {
            card.classList.remove("move-right");
        }
    }, 50);

});

audio.addEventListener("mousedown", () => {
    isDragging = true;
});

document.addEventListener("mouseup", () => {
    isDragging = false;
});

audio.addEventListener("ended", () => {
    if (!isDragging) {
        card.classList.remove("move-right");
    }
});

audio.addEventListener("seeking", () => {
    isSeeking = true;
});

audio.addEventListener("seeked", () => {
    isSeeking = false;
    video.currentTime = audio.currentTime;
});


document.addEventListener("mousemove", (e) => {

    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    parallaxX = (x - 0.5) * 12;
    parallaxY = (y - 0.5) * 12;

    cover.style.setProperty("--light-x", `${x * 100}%`);
    cover.style.setProperty("--light-y", `${y * 100}%`);

});