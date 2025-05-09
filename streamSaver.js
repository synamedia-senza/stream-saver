const STREAM_SAVER_VIDEO = "https://d1pam9p7j3k6m8.cloudfront.net/streamsaver/hyperscale_1/dash/index.mpd";
const STREAM_SAVER_SECONDS = 30;

window.addEventListener("load", async () => {
  try {
    await senza.init();

    countdown();

    senza.remotePlayer.addEventListener("ended", () => {
      senza.lifecycle.moveToForeground();
      countdown();
    });

    await senza.remotePlayer.load(STREAM_SAVER_VIDEO);
    senza.uiReady();
  } catch (error) {
    console.error(error);
  }
});

document.addEventListener("keydown", async (event) => {
  const currentState = await senza.lifecycle.getState();
  if (currentState == "background" || currentState == "inTransitionToBackground") {
    senza.lifecycle.moveToForeground();
  }
	countdown();
  event.preventDefault();
});

let interval = null;
function countdown() {
  clearInterval(interval);
  let counter = STREAM_SAVER_SECONDS;
  showNumber(counter);
  
  interval = setInterval(() => {
    counter--;
    showNumber(counter);

    if (counter == 0) {
      clearInterval(interval);
      showStreamSaver();
    }
  }, 1000);
}

function showNumber(counter) {
  let ten = Math.floor(counter / 10);
  let one = Math.round(counter % 10);
  number10.src = `digits/${ten}.jpg`;
  number1.src = `digits/${one}.jpg`;
}

function showStreamSaver() {
  senza.remotePlayer.currentTime = 0;
  senza.remotePlayer.play();
  senza.lifecycle.moveToBackground();
}

function preloadImages() {
  for (let i = 0; i < 10; i++) {
    let img = new Image();
    img.src = `digits/${i}.jpg`;
  }
}

preloadImages();
