import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

// import './App.css'
import Navbar from "./components/Navbar";
import Hero from './components/Hero';
import Features from './components/Features';
import Footer from './components/Footer';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Navbar />
    <Hero />
    <Features />
    <Footer />
    </>
  )
}
export default App
