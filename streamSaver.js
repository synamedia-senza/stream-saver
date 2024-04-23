const STREAM_SAVER_VIDEO = "https://d1pam9p7j3k6m8.cloudfront.net/streamsaver/hyperscale_1/dash/index.mpd";
const STREAM_SAVER_SECONDS = 30;

window.addEventListener("load", async () => {
  try {
    await hs.init();

    countdown();

    hs.remotePlayer.addEventListener("ended", () => {
      hs.lifecycle.moveToForeground();
      countdown();
    });

    await hs.remotePlayer.load(STREAM_SAVER_VIDEO);
    hs.uiReady();
  } catch (error) {
    console.error(error);
  }
});

document.addEventListener("keydown", async (event) => {
  const currentState = await hs.lifecycle.getState();
  if (currentState == "background" || currentState == "inTransitionToBackground") {
    hs.lifecycle.moveToForeground();
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
  hs.remotePlayer.currentTime = 0;
  hs.remotePlayer.play();
}

function preloadImages() {
  for (let i = 0; i < 10; i++) {
    let img = new Image();
    img.src = `digits/${i}.jpg`;
  }
}

preloadImages();
