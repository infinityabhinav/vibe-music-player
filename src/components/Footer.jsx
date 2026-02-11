import React from "react";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">

        <div className="footer-brand">
          <h3>🔥 Vibe Music</h3>
          <p>Where dark beats live.</p>
        </div>

        <ul className="footer-links">
          <li>Songs</li>
          <li>Artists</li>
          <li>About</li>
          <li>Contact</li>
        </ul>

      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} Vibe Music — All rights reserved
      </div>
    </footer>
  );
}
