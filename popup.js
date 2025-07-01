import { getAccessToken, loginWithSpotify, getUserProfile } from './auth.js';
import { playTrack, pauseTrack, nextTrack, previousTrack} from './player/controls.js';
import { updateNowPlaying } from './player/playerInfo.js';

async function init() {
  const token = await getAccessToken();

  if (token) {
    showAppUI();

    document.getElementById("play").addEventListener("click", () => {
      playTrack(token);
    });

    document.getElementById("pause").addEventListener("click", () => {
      pauseTrack(token);
    });

    document.getElementById("next").addEventListener("click", async () =>{
        await nextTrack(token);
        setTimeout(() => updateNowPlaying(token), 800);
    });

    document.getElementById("previous").addEventListener("click", async () => {
        await previousTrack(token);
        setTimeout(() => updateNowPlaying(token), 800);
    });

    updateNowPlaying(token);
  } else {
    showLoginUI();
  }

  document.getElementById("login").addEventListener("click", loginWithSpotify);
}

function showAppUI() {
  document.getElementById("login-section").style.display = "none";
  document.getElementById("app-section").style.display = "flex";
  document.getElementById("playing-div").style.display = "flex";
}

function showLoginUI() {
  document.getElementById("login-section").style.display = "flex";
  document.getElementById("app-section").style.display = "none";
  document.getElementById("playing-div").style.display = "none";
}

init();
