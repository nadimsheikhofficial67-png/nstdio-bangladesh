import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BackgroundAudio } from './components/BackgroundAudio';

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div id="portfolio-app" className="relative min-h-screen w-full bg-black text-white selection:bg-[#F598F2] selection:text-black">
      <BackgroundAudio />
      <Navbar
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
      <Hero isMobileMenuOpen={isMobileMenuOpen} />
    </div>
  );
}
