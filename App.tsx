import React, { useEffect, useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Lore } from './components/Lore';
import { Summoning } from './components/Summoning';
import { Manifesto } from './components/Manifesto';
import { Gallery } from './components/Gallery';
import { Footer } from './components/Footer';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  // Intro Animation Timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  // Custom Cursor Logic
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    // Add hover listeners to interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest('a, button, .interactive')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  // Scroll Reveal Logic
  useEffect(() => {
    if (loading) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });

    const elements = document.querySelectorAll('.reveal');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [loading]);

  return (
    <div className="bg-oni-dark min-h-screen text-gray-100 font-sans relative selection:bg-oni-red selection:text-white">
      
      {/* Custom Cursor Element */}
      <div 
        className={`custom-cursor ${isHovering ? 'hovered' : ''}`}
        style={{ left: `${cursorPosition.x}px`, top: `${cursorPosition.y}px` }}
      ></div>

      {/* Opening Animation Overlay */}
      <div className={`fixed inset-0 z-[100] bg-black flex items-center justify-center transition-opacity duration-1000 ${loading ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="relative">
             <div className="text-oni-red text-6xl md:text-9xl font-black animate-pulse">鬼</div>
             <div className={`absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs tracking-[0.5em] text-gray-500 transition-opacity duration-500 ${loading ? 'opacity-100' : 'opacity-0'}`}>
                ENTERING THE MYTHOS
             </div>
        </div>
      </div>

       {/* Background noise/grain overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-50 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      
      <div className={`transition-opacity duration-1000 ${loading ? 'opacity-0' : 'opacity-100'}`}>
        <Navbar />
        <main>
          <Hero />
          <Lore />
          <Summoning />
          <Gallery />
          <Manifesto />
        </main>
        <Footer />
      </div>
    </div>
  );
}
