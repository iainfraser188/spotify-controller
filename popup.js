import { getAccessToken, loginWithSpotify } from './auth.js';
import { playTrack, pauseTrack, nextTrack, previousTrack} from './player/controls.js';
import { updateNowPlaying } from './player/playerInfo.js';

async function init() {
  const token = await getAccessToken();

  if (token) {
    showAppUI();

    document.getElementById("play").addEventListener("click", () => {
      playTrack(token);
      document.getElementById("play").classList.add("flash");
      setTimeout(() => {
        document.getElementById("play").classList.remove("flash");
      },150);
    });

    document.getElementById("pause").addEventListener("click", () => {
      pauseTrack(token);
       document.getElementById("pause").classList.add("flash");
      setTimeout(() => {
        document.getElementById("pause").classList.remove("flash");
      },150);
    });

    document.getElementById("next").addEventListener("click", async () =>{
        await nextTrack(token);      
         document.getElementById("next").classList.add("flash");
        setTimeout(() => {
          document.getElementById("next").classList.remove("flash");
        },150);
        setTimeout(() => updateNowPlaying(token), 500);
    });

    document.getElementById("previous").addEventListener("click", async () => {
        await previousTrack(token);
         document.getElementById("previous").classList.add("flash");
        setTimeout(() => {
          document.getElementById("previous").classList.remove("flash");
        },150);
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
