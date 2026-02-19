import React from "react";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">

        {/* brand */}
        <div className="footer-brand">
          <h3>🔥 Vibe Music , Where dark beats live.</h3>

          {/* disclaimer */}
          <p className="footer-disclaimer">
            Disclaimer: This website is a personal project created for learning
            and demonstration purposes. Music data and search functionality are
            powered by the public API provided by{" "}
            <a
              href="https://saavn.sumit.co"
              target="_blank"
              rel="noopener noreferrer"
            >
              saavn.sumit.co
            </a>
            . All music rights belong to their respective owners.
          </p>
        </div>

        {/* links */}
        <ul className="footer-links">
          <li>Songs</li>
          <li>Artists</li>
          <li>About</li>
          <li>Contact</li>
        </ul>

      </div>

      {/* bottom */}
      <div className="footer-bottom">
        © {new Date().getFullYear()} Vibe Music — All rights reserved
      </div>
    </footer>
  );
}
