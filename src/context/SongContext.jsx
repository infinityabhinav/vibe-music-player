import React, { createContext, useState } from 'react'
export const SongContext=createContext();
export  function SongProvider({children}) {
    const[song,setSong]=useState({
          search:"",
          songs:[],
          loading:false,
          error:""
        })
  return (
    <SongContext.Provider value={{song,setSong}}>
        {children}
    </SongContext.Provider>
  )
}
