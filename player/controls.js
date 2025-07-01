export async function playTrack(token) {
  const res = await fetch("https://api.spotify.com/v1/me/player/play", {
     method: "PUT",
    headers: { Authorization: `Bearer ${token}` }
  });
   if (!res.ok) {
    console.error("Failed to play track:", res.status);
  }
}

export async function pauseTrack(token) {
  const res = await fetch("https://api.spotify.com/v1/me/player/pause", {
     method: "PUT",
    headers: { Authorization: `Bearer ${token}` }
  });
   if (!res.ok) {
    console.error("Failed to pause track:", res.status);
  }
}

export async function nextTrack(token) {
  const res = await fetch("https://api.spotify.com/v1/me/player/next", {
     method: "POST",
    headers: { Authorization: `Bearer ${token}` }
  });
   if (!res.ok) {
    console.error("Failed to skip track:", res.status);
  }
}

export async function previousTrack(token) {
  const res = await fetch("https://api.spotify.com/v1/me/player/previous", {
     method: "POST",
    headers: { Authorization: `Bearer ${token}` }
  });
   if (!res.ok) {
    console.error("Failed to skip track:", res.status);
  }
}