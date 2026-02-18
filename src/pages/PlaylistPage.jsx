import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { NavLink, useNavigate } from "react-router-dom";

export default function PlaylistPage() {
  const { userAuth } = useContext(AuthContext);
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);

  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [creating, setCreating] = useState(false);

  const navigate = useNavigate();
  const fetchPlaylists = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URI}/song/playlists`,
        { credentials: "include" },
      );

      const result = await res.json();

      if (res.ok) {
        setPlaylists(result.data || []);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userAuth) {
      fetchPlaylists();
    }
  }, [userAuth]);

  const handleCreate = async () => {
    if (!title.trim()) return alert("Playlist title required");

    try {
      setCreating(true);

      const res = await fetch(
        `${import.meta.env.VITE_API_URI}/song/playlists`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ title, description }),
        },
      );

      if (res.ok) {
        setTitle("");
        setDescription("");
        setOpen(false);
        fetchPlaylists(); // refresh list
      }
    } catch (err) {
      console.log(err);
    } finally {
      setCreating(false);
    }
  };
  const handleRemove = async (playlistId) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URI}/song/playlist/${playlistId}`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );

      const data = await res.json();

      alert(data.message); // show backend message

      fetchPlaylists(); // refresh list
    } catch (err) {
      console.log(err);
    }
  };

  if (!userAuth) return null;
  if (loading) return <h2 style={{ color: "white" }}>Loading playlists...</h2>;

  return (
    <div className="playlist-page">
      <h1 className="playlist-title">Your Playlists</h1>

      {playlists.length === 0 ? (
        <p className="no-playlist">No playlist created yet</p>
      ) : (
        <div className="playlist-grid">
          {playlists.map((pl) => (
            <div key={pl._id} className="playlist-card">
              <div className="playlist-card-topcontainer">
                <div>🎵</div>
                <p className="rmv-btn" onClick={() => handleRemove(pl._id)}>
                  🗑️ Remove
                </p>
              </div>
              <h3>{pl.title}</h3>
              <p>{pl.description || "No description"}</p>
              <span>{pl.songs?.length || 0} songs</span>
              <button onClick={() => navigate(`/playlist/${pl._id}`)}>
                View And Explore
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Create Playlist Button */}
      <div className="make-playlist" onClick={() => setOpen(true)}>
        + Create Playlist
      </div>

      {/* Modal */}
      {open && (
        <div className="playlist-modal-overlay">
          <div className="playlist-modal">
            <h2>Create Playlist</h2>

            <input
              type="text"
              placeholder="Playlist title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <textarea
              placeholder="Description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <div className="playlist-modal-btns">
              <button className="cancel-btn" onClick={() => setOpen(false)}>
                Cancel
              </button>

              <button className="create-btn" onClick={handleCreate}>
                {creating ? "Creating..." : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
