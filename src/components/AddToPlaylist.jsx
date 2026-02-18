import React, { useContext, useEffect, useState } from "react";
import { GlobalPlayerContext } from "../context/GlobalPlayerContext";

export default function AddToPlaylist(props) {
  const open=props.data.open;
  const setOpen=props.data.setOpen;

  const { data } = useContext(GlobalPlayerContext);
  const [playlists,setPlaylists] = useState([]);

  const songId = data?.[0]?.id;

  const fetchPlaylists = async ()=>{
      try{
        const res = await fetch(
          `${import.meta.env.VITE_API_URI}/song/playlists`,
          { credentials:"include" }
        );
        const result = await res.json();
        if(res.ok) setPlaylists(result.data || []);
      }catch(err){
        console.log(err);
      }
    };
  useEffect(()=>{
    fetchPlaylists();
  },[]);

  const addSong = async (playlistId)=>{
    try{
      const res = await fetch(
        `${import.meta.env.VITE_API_URI}/song/playlist/add-song`,
        {
          method:"PUT",
          headers:{ "Content-Type":"application/json" },
          credentials:"include",
          body: JSON.stringify({
            playlistId,
            id: songId,
            songName:data?.[0]?.name,
            image:data?.[0]?.image[2].url,
            release:data?.[0]?.year,
            artist:data?.[0]?.artists.primary[0].name
          })
        }
      );

      const result = await res.json();

      if(res.ok){
        setOpen(false);
        alert("Added to playlist");
      }else{
        alert(result.message);
      }

    }catch(err){
      console.log(err);
    }
  };

  if(!songId) return null;

  return (
    <div className="add-playlist-wrapper"  onClick={()=>{setOpen(!open)
            fetchPlaylists()
        }}>

      <button 
        className="add-playlist-btn"
        onClick={()=>{setOpen(!open)
            fetchPlaylists()
        }}
      >
        + Add to Playlist
      </button>

      {open && (
        <div className="playlist-dropdown">

          <h4>Select Playlist</h4>

          {playlists.length === 0 ? (
            <p>No playlist found</p>
          ):(
            playlists.map(pl=>(
              <div
                key={pl._id}
                className="playlist-option"
                onClick={()=>addSong(pl._id)}
              >
                🎵 {pl.title}
              </div>
            ))
          )}

        </div>
      )}

    </div>
  );
}
