/* Get Our Elements */
const player = document.querySelector ('.player');
const video = player.querySelector ('.viewer');
const progress = player.querySelector ('.progress');
const progressBar = player.querySelector ('.progress__filled');
const toggle = player.querySelector ('.toggle');
const skipButtons = player.querySelectorAll ('[data-skip]');
const ranges = player.querySelectorAll ('.player__slider');
const fs = player.querySelector ('#fullscreen');

function togglePlay () {
  if (video.paused) {
    video.play ();
    toggle.textContent = '❚ ❚';
  } else {
    video.pause ();
    toggle.textContent = '►';
  }
}

function toggleFullscreen () {
  video.requestFullscreen ();
}

function rangeHandler () {
  video[this.name] = this.value;
}

function skipHandler (e) {
  const skipButtonValue = e.target.getAttribute ('data-skip');
  video.currentTime = video.currentTime + parseInt (skipButtonValue);
}

function progressHandler () {
  const percent = video.currentTime / video.duration * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub (e) {
  const scrubTime = e.offsetX / progress.offsetWidth * video.duration;
  video.currentTime = scrubTime;
}

toggle.addEventListener ('click', togglePlay);
video.addEventListener ('click', togglePlay);
video.addEventListener ('timeupdate', progressHandler);
ranges.forEach (range => {
  range.addEventListener ('change', rangeHandler);
});
skipButtons.forEach (button => {
  button.addEventListener ('click', skipHandler);
});

let mousedown = false;
progress.addEventListener ('click', scrub);
progress.addEventListener ('mousemove', e => mousedown && scrub (e));
progress.addEventListener ('mousedown', () => (mousedown = true));
progress.addEventListener ('mouseup', () => (mousedown = false));
fs.addEventListener ('click', toggleFullscreen);
