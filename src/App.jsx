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
import SignUp from './pages/Auth/SignUp'
import LogIn from './pages/Auth/LogIn'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './pages/Auth/ProtectedRoute'
import PlaylistPage from './pages/PlaylistPage'
import PlaylistDetail from './pages/PlaylistDetail'


function AppInner() {
    const {audio}=useContext(GlobalPlayerContext);
    const audioref=audio.current
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route index element={<Hero />} />
            <Route path="song" element={<ProtectedRoute><SongPage /></ProtectedRoute>} />
            <Route path="song/:id" element={<ProtectedRoute><SongPlayPage /></ProtectedRoute>} />
            <Route path="about" element={<About />} />
            <Route path="/sign-up" element={<SignUp/>} />
            <Route path="/log-in" element={<LogIn/>} />
            <Route path="/playlists" element={<ProtectedRoute><PlaylistPage/></ProtectedRoute>} />
            <Route path="playlist/:id" element={<ProtectedRoute><PlaylistDetail/></ProtectedRoute>} />

          </Route>
        </Routes>
      </BrowserRouter>

      {audioref.src && <PlayerModal />}
    </>
  );
}
export default function App() {
  return (
    <AuthProvider>
    <GlobalPlayerProvider>
    <SongProvider>
    <AppInner/>
    </SongProvider>
    </GlobalPlayerProvider>
    </AuthProvider>
  )
}
