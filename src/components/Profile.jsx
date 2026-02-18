import React, { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"

export default function Profile() {

  const { userAuth, setUserAuth,loading} = useContext(AuthContext)
  const navigate = useNavigate()
  const [open,setOpen] = useState(false)

  
  useEffect(()=>{
    if(!userAuth && !loading){
      navigate("/log-in")
      // return;
    }
  },[userAuth,navigate,loading])
  if(!userAuth) return null   

  // logout
  const handleLogout = async ()=>{
    await fetch(`${import.meta.env.VITE_API_URI}/user/log-out`,{
      method:"GET",
      credentials:"include"
    })

    setUserAuth(null)
    navigate("/log-in")
  }

  return (
    <>
    {userAuth &&(<div className="playlist-container" onClick={()=>navigate("/playlists")}>Playlists</div>)}
    <div className="profile-container">

      {/* profile icon */}
      <div 
        className="profile-icon"
        onClick={()=>setOpen(!open)}
      >
        {userAuth.firstName?.[0]?.toUpperCase()}
      </div>

      {/* dropdown */}
      {open && (
        <div className="profile-dropdown">
          
          <p className="profile-name">{userAuth.firstName} {userAuth.lastName}</p>
          <p className="profile-email">{userAuth.email}</p>

          <hr />

          <button 
            onClick={handleLogout}
            className="logout-btn"
          >
            Logout
          </button>
        </div>
      )}
    </div>
    </>
  )
}
