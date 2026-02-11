import React, { useContext } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import SongPage from './pages/SongPage'
import About from './pages/About'
import Hero from './components/Hero'
import { SongProvider } from './context/SongContext'
import SongPlayPage from './pages/SongPlayPage'
import PlayerModal from './components/PlayerModal'
import { GlobalPlayerContext, GlobalPlayerProvider } from './context/GlobalPlayerContext'


function AppInner() {
    const {audio}=useContext(GlobalPlayerContext);
    const audioref=audio.current
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route index element={<Hero />} />
            <Route path="song" element={<SongPage />} />
            <Route path="song/:id" element={<SongPlayPage />} />
            <Route path="about" element={<About />} />
          </Route>
        </Routes>
      </BrowserRouter>

      {audioref.src && <PlayerModal />}
    </>
  );
}
export default function App() {
  return (
    <GlobalPlayerProvider>
    <SongProvider>
    <AppInner/>
    </SongProvider>
    </GlobalPlayerProvider>
  )
}
