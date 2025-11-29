
import React, { useEffect, useState, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Lore } from './components/Lore';
import { Summoning } from './components/Summoning';
import { Manifesto } from './components/Manifesto';
import { Gallery } from './components/Gallery';
import { Footer } from './components/Footer';

export default function App() {
  const [loading, setLoading] = useState(true);
  
  // PERFORMANCE FIX: Use refs instead of state for high-frequency updates
  const cursorRef = useRef<HTMLDivElement>(null);

  // Intro Animation Timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  // Optimized Custom Cursor Logic (No React Re-renders)
  useEffect(() => {
    // Only run on desktop
    if (window.matchMedia("(max-width: 768px)").matches) return;

    let mouseX = 0;
    let mouseY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      // Direct DOM manipulation - ultra fast, no React render cycle
      if (cursorRef.current) {
         cursorRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }
    };

    const onMouseOver = (e: MouseEvent) => {
      if (!cursorRef.current) return;
      
      if ((e.target as HTMLElement).closest('a, button, input, .interactive')) {
        cursorRef.current.classList.add('hovered');
      } else {
        cursorRef.current.classList.remove('hovered');
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseover', onMouseOver, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
    };
  }, []);

  // Scroll Reveal Logic
  useEffect(() => {
    if (loading) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          // Performance: Unobserve once revealed to save resources
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    const elements = document.querySelectorAll('.reveal');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [loading]);

  return (
    <div className="bg-oni-dark min-h-screen text-gray-100 font-sans relative selection:bg-oni-red selection:text-white">
      
      {/* Optimized Custom Cursor Element */}
      <div 
        ref={cursorRef}
        className="custom-cursor"
        // Initial position off-screen
        style={{ transform: 'translate3d(-100px, -100px, 0)' }}
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

       {/* Background noise - Optimized opacity to reduce compositing load */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-50 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] will-change-transform"></div>
      
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
