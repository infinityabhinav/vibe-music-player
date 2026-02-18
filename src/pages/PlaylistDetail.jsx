import React, { useEffect, useState } from "react"
import { NavLink, useNavigate, useParams } from "react-router-dom"

export default function PlaylistDetail() {
const navigate=useNavigate()
  const { id } = useParams()
  const [playlistData,setPlaylistData] = useState(null)
  const [loading,setLoading] = useState(true)



  const fetchPlaylist = async ()=>{
    try{
      const res = await fetch(
        `${import.meta.env.VITE_API_URI}/song/playlists/${id}`,
        { credentials:"include" }
      )
      
      const data = await res.json()
      
      if(res.ok){
        setPlaylistData(data.data)
      }
      
    }catch(err){
      console.log(err)
    }finally{
      setLoading(false)
    }
  }
  useEffect(()=>{
    fetchPlaylist()
  },[id])

  const handleRemove = async (playlistId, songId) => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URI}/song/playlist/remove-song`,
      {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          playlistId: playlistId,
          id: songId
        })
      }
    );

    const message = await res.json();
    console.log(message.message);

    // refresh playlist
    fetchPlaylist();

  } catch (err) {
    console.log(err);
  }
};


  if(loading) return <h2 className="center-text">Loading...</h2>
  if(!playlistData) return <h2 className="center-text">Playlist not found</h2>

  return (
    <div className="playlist-detail">

      {/* HEADER */}
      <div className="playlist-header">
        <div className="playlist-cover">🎵</div>

        <div className="playlist-info">
          <h1>{playlistData.title}</h1>
          <p>{playlistData.description || "No description"}</p>
          <span>{playlistData.songs?.length || 0} songs</span>
        </div>
      </div>

      {/* GRID SONG LIST */}
      <div className="songs-grid">

        {playlistData.songs?.length === 0 ? (
          <p className="empty-text">No songs added yet</p>
        ) : (
          playlistData.songs.map((song,index)=>(
      
             <div key={index} className="song-card">

              <div className="song-img-wrapper" onClick={()=>navigate(`/song/${song.songId}`)}>
                <img src={song.image} alt={song.songName} />
              </div>

           
              <div className="song-card-body">
                <h3>{song.songName || "Song"}</h3>
                <p><strong>Release:</strong> {song.release || "NA"}</p>
                <p><strong>Artist:</strong> {song.artist || "Unknown"}</p>
              </div>

              <button className="remove-btn" onClick={()=>{
                handleRemove(playlistData._id,song.songId)

              }}>
                Remove
              </button>

            </div>
          ))
        )}

      </div>

    </div>
  )
}
