import { NavLink } from "react-router-dom";

export default function SongCard({ element }) {

  function formatTime(seconds = 0) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  }

  function formatCount(num = 0) {
    if (num >= 1_000_000_000) return (num / 1e9).toFixed(1).replace(".0","") + "B";
    if (num >= 1_000_000) return (num / 1e6).toFixed(1).replace(".0","") + "M";
    if (num >= 1_000) return (num / 1e3).toFixed(1).replace(".0","") + "K";
    return num;
  }

  const cover =
    element.image?.[2]?.url ||
    element.image?.[1]?.url ||
    element.image?.[0]?.url;

  return (
   <NavLink to={`/song/${element.id}`}>
     <li className="song-card">
      
      <div className="cover-wrap">
        <img src={cover} alt={element.name} />
        <span className="duration">{formatTime(element.duration)}</span>
      </div>

      <div className="song-info">
        <h3 className="song-title">{element.name}</h3>

        <div className="artist-list">
          {element.artists?.primary?.map((a) => (
            <span key={a.id} className="artist-chip">
              {a.name}
            </span>
          ))}
        </div>

        <div className="song-meta">
          <span>📅 {element.year}</span>
          <span>▶ {formatCount(element.playCount)} plays</span>
        </div>
      </div>

    </li>
   </NavLink>
  );
}
