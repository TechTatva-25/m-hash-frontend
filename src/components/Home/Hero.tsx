"use client";

import React from 'react'
import Silk from '../ui/silk'

const Hero = () => {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 0 }}>
        <Silk
  speed={15}
  scale={1}
  color="#7B7481"
  noiseIntensity={1.5}
  rotation={0}
/>
      </div>
      <div style={{ 
        position: 'absolute', 
        top: '50%', 
        left: '50%', 
        transform: 'translate(-50%, -50%)', 
        zIndex: 1,
        textAlign: 'center',
        color: 'white',
        fontFamily: "'Poppins', sans-serif",
        textShadow: '0 2px 10px rgba(0,0,0,0.5)'
      }}>
        <h1 style={{ fontSize: 'clamp(2rem, 8vw, 5rem)', margin: '0', fontWeight: '800' }}>
          Manipal Hackathon
        </h1>
        <h2 style={{ fontSize: 'clamp(1.5rem, 5vw, 3rem)', margin: '0', fontWeight: '600' }}>
          2025
        </h2>
      </div>
    </div>
  )
}

export default Hero
