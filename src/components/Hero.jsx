import { useNavigate } from "react-router-dom";

export default function Hero() {
    const navigate=useNavigate();
  return (
    <section className="hero">
      <div className="hero-content">

        <h1>
          Feel The <span>Dark Beats</span>
        </h1>

        <p>
          Discover trending tracks, underground vibes, and nonstop rhythm —
          all in one place.
        </p>

        <div className="hero-actions">
          <button className="btn-primary" onClick={()=>navigate("/song")} >Explore Songs</button>
          <button className="btn-outline" onClick={()=>navigate("/song")}>Browse Artists</button>
        </div>

      </div>

      <div className="hero-glow" />
    </section>
  );
}
