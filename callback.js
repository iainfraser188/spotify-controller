const clientId = '';
const tokenEndpoint = 'https://accounts.spotify.com/api/token';
const redirectUri = chrome.runtime.getURL("callback.html");

(async () => {
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");

  const { code_verifier } = await chrome.storage.local.get("code_verifier");

  const body = new URLSearchParams({
    grant_type: 'authorization_code',
    code,
    redirect_uri: redirectUri,
    client_id: clientId,
    code_verifier
  });

  const res = await fetch(tokenEndpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body
  });

  const data = await res.json();

  const expires = new Date(Date.now() + data.expires_in * 1000);
  await chrome.storage.local.set({
    access_token: data.access_token,
    refresh_token: data.refresh_token,
    expires: expires.toISOString()
  });

  window.close();
})();
