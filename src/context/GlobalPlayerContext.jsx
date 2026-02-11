import React, { createContext, useRef, useState } from 'react'
export const GlobalPlayerContext=createContext()
export function GlobalPlayerProvider({children}) {
    const[pause,setPause]=useState(false)
    const audio=useRef(new Audio());
    const [data,setData]=useState([]);
    const [currentTime,setCurrentTime]=useState(0);
    const [playing,setPlaying]=useState(false);
  return (
    <GlobalPlayerContext.Provider value={{audio,currentTime,setCurrentTime,playing,setPlaying,data,setData,pause,setPause}}>
        {children}
    </GlobalPlayerContext.Provider>
    
  )
}
