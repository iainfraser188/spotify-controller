async function getCurrentPlayingTrack(token) {
  const res = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
     method: "Get",
    headers: {Authorization: `Bearer ${token}` }
  });
   if (!res.ok) {
    console.error("Failed to fetch currently playing track", res.status);
    return null;
  }

  const data = await res.json();
  console.log("Track data:", data);
  return data;
}

export async function updateNowPlaying(token) {
  const trackdata = await getCurrentPlayingTrack(token);
  if(trackdata){
    const artistName = trackdata.item.artists[0].name;
    const trackName = trackdata.item.name;
    console.log("artistName", artistName);
    console.log("trackName", trackName);

    document.getElementById("artist").textContent = `Artist: ${artistName}`;
    document.getElementById("song-title").textContent = `Song: ${trackName}`;
  }
}
