import React, { useContext, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { GlobalPlayerContext } from "../context/GlobalPlayerContext";

export default function PlayerModal() {
  const { audio, setCurrentTime, currentTime, data,pause,setPause } =
    useContext(GlobalPlayerContext);

  const [duration, setDuration] = useState(0);
  const song = data?.[0]; // ensure array length 1 safe

  useEffect(() => {
    const el = audio.current;
    if (!el) return;

    const update = () => setCurrentTime(el.currentTime);
    const loaded = () => setDuration(el.duration || 0);

    el.addEventListener("timeupdate", update);
    el.addEventListener("loadedmetadata", loaded);

    return () => {
      el.removeEventListener("timeupdate", update);
      el.removeEventListener("loadedmetadata", loaded);
    };
  }, [audio, setCurrentTime]);

  if (!song) return null;

  const image = song.image?.[2]?.url;
  const artistNames = song.artists?.primary
    ?.map((a) => a.name)
    .join(", ");

  const format = (sec) => {
    if (!sec) return "0:00";
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60)
      .toString()
      .padStart(2, "0");
    return `${m}:${s}`;
  };

  const progress = duration ? (currentTime / duration) * 100 : 0;

  return createPortal(
    <div className="bottom-player">
      {/* LEFT */}
      <div className="player-left">
        <img src={image} alt={song.name} />
        <div>
          <div className="title">{song.name}</div>
          <div className="artist">{artistNames}</div>
        </div>
      </div>

      {/* CENTER */}
      <div className="player-center">
        <button
            className="hero-play"
            onClick={() => {
                !pause?audio.current.play():audio.current.pause()
                setPause((prev)=>!pause)
            }}
          >
           {!pause?"▶":"⏸️"}
          </button>

        <div className="progress-row">
          <span>{format(currentTime)}</span>

          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={(e) => {
              const pct = e.target.value;
              audio.current.currentTime = (pct / 100) * duration;
            }}
          />

          <span>{format(duration)}</span>
        </div>
      </div>

      {/* RIGHT */}
      <div className="player-right">
        <div className="album">{song.album?.name}</div>
        <div className="year">{song.year}</div>
      </div>
    </div>,
    document.querySelector("#player-root")
  );
}
