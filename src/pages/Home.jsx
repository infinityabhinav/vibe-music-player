import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Hero from '../components/Hero'
import { Outlet } from 'react-router-dom'

export default function Home() {
  return (
    <>
    <Header/>
    <Outlet/>
    <Footer/>
    </>
  )
}
