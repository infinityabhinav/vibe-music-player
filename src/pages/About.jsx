
export default function About() {
  return (
    <section className="about">
      <div className="about-container">

        <h1>
          About <span>Vibe Music</span>
        </h1>

        <p className="about-lead">
          Vibe Music is a dark-themed modern music platform designed for
          listeners who love deep beats, underground tracks, and immersive
          sound experiences.
        </p>

        <div className="about-grid">

          <div className="about-card">
            <h3>🔥 Curated Tracks</h3>
            <p>
              Hand-picked songs across genres so you always discover
              something powerful and fresh.
            </p>
          </div>

          <div className="about-card">
            <h3>🌙 Dark Experience</h3>
            <p>
              Designed with a premium dark UI that keeps focus on music
              and reduces visual fatigue.
            </p>
          </div>

          <div className="about-card">
            <h3>⚡ Fast & Modern</h3>
            <p>
              Built with modern React architecture for smooth,
              responsive performance.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
