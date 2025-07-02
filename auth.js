const clientId = '';
const redirectUri = chrome.runtime.getURL("callback.html");
const authEndpoint = 'https://accounts.spotify.com/authorize';
const tokenEndpoint = 'https://accounts.spotify.com/api/token';
const scope = 'user-read-private user-read-email user-modify-playback-state user-read-currently-playing';

export async function loginWithSpotify() {
  const verifier = generateCodeVerifier();
  const challenge = await generateCodeChallenge(verifier);

  await chrome.storage.local.set({ code_verifier: verifier });

  const authUrl = `${authEndpoint}?${new URLSearchParams({
    response_type: 'code',
    client_id: clientId,
    redirect_uri: redirectUri,
    code_challenge_method: 'S256',
    code_challenge: challenge,
    scope
  })}`;

  chrome.tabs.create({ url: authUrl });
}

export async function getAccessToken() {
  return new Promise(resolve => {
    chrome.storage.local.get(['access_token', 'expires'], (result) => {
      if (result.access_token && new Date(result.expires) > new Date()) {
        resolve(result.access_token);
      } else {
        resolve(null);
      }
    });
  });
}

export async function getUserProfile(token) {
  const res = await fetch("https://api.spotify.com/v1/me", {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.json();
}

function generateCodeVerifier(length = 128) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  return [...crypto.getRandomValues(new Uint8Array(length))]
    .map(x => chars.charAt(x % chars.length)).join('');
}

async function generateCodeChallenge(verifier) {
  const data = new TextEncoder().encode(verifier);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return btoa(String.fromCharCode(...new Uint8Array(digest)))
    .replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}
