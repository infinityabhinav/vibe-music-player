import React, { useContext, useEffect, useState } from "react";
import { SongContext } from "../context/SongContext";
import SongCard from "../components/SongCard";
import PlayerModal from "../components/PlayerModal";

export default function SongPage() {
  const { song, setSong } = useContext(SongContext);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  /* =========================
     FETCH SONGS
  ========================= */

  useEffect(() => {
    async function fetchData() {
      try {
        if (!song.search) return;

        setLoading(true);

        const res = await fetch(
          `https://saavn.sumit.co/api/search/songs?query=${song.search}&page=${page}&limit=20`
        );

        const result = await res.json();

        setSong((prev) => ({
          ...prev,
          songs:
            page === 1
              ? result.data.results
              : [...(prev.songs || []), ...result.data.results],
        }));
      } catch (err) {
        console.log(err);
        setSong((prev) => ({
          ...prev,
          error: err.message,
        }));
      } finally {
        setLoading(false);
      }
    }

    const timer = setTimeout(fetchData, 600);
    return () => clearTimeout(timer);
  }, [song.search, page, setSong]);

  /* =========================
     HANDLERS
  ========================= */

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setPage(1);
    setSong((prev) => ({ ...prev, search: value }));
  };

  const quickSearch = (term) => {
    setPage(1);
    setSong((prev) => ({ ...prev, search: term }));
  };

  /* =========================
     RENDER
  ========================= */

  return (
    <>
      <div className="song-container">
        {/* SEARCH */}
        <div className="search-box">
          <input
            type="text"
            value={song.search || ""}
            onChange={handleSearchChange}
            placeholder="Search songs, artists, albums..."
            onKeyDown={(e) => {
              if (e.key === "Enter") setPage(1);
            }}
          />
          <button onClick={() => setPage(1)}>🔍</button>
        </div>

        {/* EMPTY STATE */}
        {!song.search && (
          <div className="song-page-description">
            <h2>🎵 Discover Your Next Favorite Track</h2>

            <p>
              Search for songs, artists, or albums to explore powerful beats,
              chill vibes, and trending music. Start typing to see results
              instantly.
            </p>

            <div className="song-hints">
              <span>Try:</span>
              <button onClick={() => quickSearch("lofi")}>lofi</button>
              <button onClick={() => quickSearch("night drive")}>
                night drive
              </button>
              <button onClick={() => quickSearch("dark trap")}>
                dark trap
              </button>
            </div>
          </div>
        )}

        {/* RESULTS */}
        {song.search && (
          <div className="song-results">
            {/* HEADER */}
            <div className="results-header">
              <h3>
                Results for: <span>{song.search}</span>
                <br />
              </h3>
            </div>

            {/* GRID */}
            <ul className="song-grid">
              {song.songs?.map((item) => (
                <SongCard key={item.id} element={item} />
              ))}
            </ul>

            {/* STATES */}
            {loading && (
              <div className="loading-text">Loading more tracks…</div>
            )}

            {!loading && song.songs?.length === 0 && (
              <div className="loading-text">
                No songs found. Try another search.
              </div>
            )}

            {/* LOAD MORE */}
            {!loading && song.songs?.length > 0 && (
              <div className="load-more-wrap">
                <button
                  className="load-more-btn"
                  onClick={() => setPage((p) => p + 1)}
                >
                  Load More Songs
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* GLOBAL PLAYER */}
      <PlayerModal />
    </>
  );
}
