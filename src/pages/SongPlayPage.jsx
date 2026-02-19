import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GlobalPlayerContext } from "../context/GlobalPlayerContext";
import PlayerModal from "../components/PlayerModal";
import AddToPlaylist from "../components/AddToPlaylist";

export default function SongPlayPage() {
  const { id } = useParams();
  const { audio, setData, data,pause,setPause} = useContext(GlobalPlayerContext);
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    async function load() {
      setLoading(true);

      const res = await fetch(`https://saavn.sumit.co/api/songs/${id}`);
      const result = await res.json();

      const songData = result.data || [];
      setData(songData);

      if (songData.length > 0) {
        audio.current.src = songData[0].downloadUrl[4].url;
      }

      setLoading(false);
    }

    load();
  }, [id, audio, setData]);

  if (loading) return <p className="state-text">Loading song…</p>;
  if (!data || data.length === 0)
    return <p className="state-text">❌ Invalid song Id</p>;

  const song = data[0];
  const artists = song.artists?.primary?.map(a => a.name).join(", ");

  return (
    <div className="player-page">
      {/* HERO */}
      <div className="player-hero">
        <div className="cover-wrap">
          <img src={song.image?.[2]?.url} alt={song.name} />
        </div>


        <div className="hero-info">
          <span className="badge">🎵 Now Playing</span>

          <h1>{song.name}</h1>
          <h3>{artists}</h3>
          <p className="album-name">{song.album?.name}</p>

          <button
            className="hero-play"
            onClick={() => {
                !pause?audio.current.play():audio.current.pause()
                setPause((prev)=>!pause)
            }}
          >
           { !pause?"▶ Play " :"⏸️ Pause "}
          </button>
          

          <p className="song-desc">
            Experience <strong>{song.name}</strong> — a beautifully crafted
            track from the album <strong>{song.album?.name}</strong>.  
            Enjoy high-quality streaming, rich vocals, and immersive sound.
            Perfect for focused listening and repeat plays.
          </p>
        </div>
      </div>

      {/* META SECTION */}
      <div className="song-meta">
        <div><span>Release</span>{song.year}</div>
        <div><span>Language</span>{song.language}</div>
        <div><span>Duration</span>{Math.floor(song.duration/60)} min</div>
        <div><span>Label</span>{song.label}</div>
      </div>

      <PlayerModal />
    </div>
  );
}
