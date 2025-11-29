import React, { useState, useRef, useEffect } from 'react';

// Procedural Lore Generator based on ID
const getSpiritAffinity = (id: number) => {
  const factions = [
    { name: "THE VOID WALKER", element: "Celestial", color: "text-purple-400", quote: "Silence is the loudest scream." },
    { name: "EMBER OF KAGUTSUCHI", element: "Fire", color: "text-orange-500", quote: "Burn away the impurities." },
    { name: "SHADOW OF IGRIS", element: "Darkness", color: "text-gray-400", quote: "Serve the monarch in death." },
    { name: "TIDE OF RYUJIN", element: "Water", color: "text-blue-400", quote: "Flow like blood, crash like waves." },
    { name: "THUNDER OF RAIJIN", element: "Lightning", color: "text-yellow-400", quote: "Strike before the sound arrives." },
    { name: "BREATH OF FUJIN", element: "Wind", color: "text-emerald-400", quote: "Unseen, yet felt by all." },
    { name: "ROOT OF GAIA", element: "Earth", color: "text-amber-700", quote: "Stand firm against the chaos." },
  ];
  return factions[id % 7];
};

export const Summoning: React.FC = () => {
  const [isCharging, setIsCharging] = useState(false);
  const [summonedId, setSummonedId] = useState<number | null>(null);
  const [showReveal, setShowReveal] = useState(false);
  const [progress, setProgress] = useState(0);
  
  // Caching State
  const [cachedImgSrc, setCachedImgSrc] = useState<string>('');
  
  const intervalRef = useRef<number | null>(null);
  const pressStartTime = useRef<number>(0);

  // Constants
  const HOLD_DURATION_MS = 800; // Fast response

  // Smart Cache Effect for Summoned Image
  useEffect(() => {
    if (!summonedId) return;
    
    const url = `https://bafybeidzlge64nofxvhup64ytzdxtn6lf4bmse6dab5zqgfktpczefub74.ipfs.w3s.link/${summonedId}.png`;
    // Set default initially
    setCachedImgSrc(url);

    let isActive = true;
    const cacheImage = async () => {
        if (!('caches' in window)) return;
        try {
            const cache = await caches.open('onimon-vault-v1');
            const cachedRes = await cache.match(url);
            
            if (cachedRes) {
                const blob = await cachedRes.blob();
                if (isActive) setCachedImgSrc(URL.createObjectURL(blob));
            } else {
                // Fetch in background to cache for future
                fetch(url, { mode: 'cors' }).then(res => {
                    if (res.ok) cache.put(url, res.clone());
                }).catch(() => {});
            }
        } catch (e) { console.error(e); }
    };
    cacheImage();
    
    return () => { isActive = false; };
  }, [summonedId]);


  const startCharging = () => {
    if (summonedId) return; 
    setIsCharging(true);
    pressStartTime.current = Date.now();
    
    intervalRef.current = window.setInterval(() => {
      const elapsed = Date.now() - pressStartTime.current;
      const newProgress = Math.min((elapsed / HOLD_DURATION_MS) * 100, 100); 
      setProgress(newProgress);

      if (newProgress >= 100) {
        completeSummon();
      }
    }, 10);
  };

  const stopCharging = () => {
    if (showReveal) return;
    setIsCharging(false);
    setProgress(0);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const completeSummon = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setIsCharging(false);
    
    // Generate Random ID 1 - 1212
    const randomId = Math.floor(Math.random() * 1212) + 1;
    setSummonedId(randomId);
    setShowReveal(true);
  };

  const resetSummon = () => {
    setShowReveal(false);
    setSummonedId(null);
    setProgress(0);
    setCachedImgSrc('');
  };

  const affinity = summonedId ? getSpiritAffinity(summonedId) : null;

  return (
    <section className="py-24 bg-black relative overflow-hidden flex flex-col items-center justify-center min-h-[80vh]">
      
      {/* Background Effects */}
      <div className={`absolute inset-0 transition-opacity duration-1000 ${showReveal ? 'opacity-20' : 'opacity-0'}`}>
         {affinity && (
             <div className={`absolute inset-0 bg-gradient-to-b from-transparent via-${affinity.color.split('-')[1]}-900/20 to-transparent`}></div>
         )}
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        
        {!showReveal ? (
          <div className="animate-fade-in-up flex flex-col items-center">
            <h2 className="text-3xl md:text-5xl font-serif text-white mb-8">THE SPIRIT RESONANCE</h2>
            <p className="text-gray-400 mb-16 max-w-md mx-auto">
              The archive holds 1,212 spirits. You do not choose them. They choose you.
            </p>

            {/* THE ORIGINAL CIRCLE BUTTON */}
            <div className="relative group interactive">
                {/* Outer Glow Ring */}
                <div className={`absolute inset-0 rounded-full bg-oni-red blur-2xl transition-opacity duration-300 ${isCharging ? 'opacity-40' : 'opacity-0'}`}></div>

                {/* Progress Ring SVG */}
                <div className="absolute -inset-4 pointer-events-none transform -rotate-90">
                    <svg className="w-full h-full">
                        <circle
                          cx="50%"
                          cy="50%"
                          r="46%"
                          stroke="currentColor"
                          strokeWidth="2"
                          fill="transparent"
                          className="text-gray-800"
                        />
                        <circle
                          cx="50%"
                          cy="50%"
                          r="46%"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="transparent"
                          className={`text-oni-red transition-all duration-75 ease-linear ${isCharging ? 'opacity-100' : 'opacity-0'}`}
                          strokeDasharray={400} 
                          strokeDashoffset={400 - (400 * progress) / 100}
                          strokeLinecap="round"
                        />
                    </svg>
                </div>

                {/* Main Button */}
                <button
                    onMouseDown={startCharging}
                    onMouseUp={stopCharging}
                    onMouseLeave={stopCharging}
                    onTouchStart={startCharging}
                    onTouchEnd={stopCharging}
                    className={`
                        relative z-10 w-32 h-32 md:w-40 md:h-40 rounded-full 
                        bg-oni-dark border-2 border-white/20 
                        flex flex-col items-center justify-center 
                        transition-all duration-100
                        ${isCharging ? 'scale-95 border-oni-red bg-oni-dark/80' : 'hover:scale-105 hover:border-white hover:bg-white/5'}
                        ${isCharging ? 'animate-pulse' : ''}
                    `}
                >
                    <span className={`text-4xl md:text-5xl font-black mb-1 transition-colors ${isCharging ? 'text-oni-red' : 'text-white'}`}>
                        鬼
                    </span>
                    <span className="text-[10px] uppercase tracking-widest text-gray-500 font-mono">
                        {isCharging ? 'HOLD...' : 'SUMMON'}
                    </span>
                </button>
            </div>
            
            <p className={`mt-12 text-xs tracking-[0.5em] text-oni-red transition-opacity duration-300 ${isCharging ? 'opacity-100' : 'opacity-0'}`}>
                SYNCHRONIZING SOUL...
            </p>
          </div>
        ) : (
          // The Reveal Card
          <div className="animate-fade-in-up flex flex-col items-center">
            <div className="relative p-1 bg-gradient-to-b from-oni-red via-transparent to-transparent mb-8 max-w-sm mx-auto shadow-2xl shadow-oni-red/20 transform hover:scale-105 transition-transform duration-500">
              <div className="bg-oni-dark p-6 border border-white/10">
                <div className="aspect-square w-full mb-6 overflow-hidden relative group">
                    <img src={cachedImgSrc || `https://bafybeidzlge64nofxvhup64ytzdxtn6lf4bmse6dab5zqgfktpczefub74.ipfs.w3s.link/${summonedId}.png`} alt="Summoned Onimon" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute top-2 right-2 px-2 py-1 bg-black/80 text-white text-xs font-mono border border-white/20">
                        #{summonedId?.toString().padStart(4, '0')}
                    </div>
                </div>
                
                <div className="text-center space-y-2">
                    <div className="text-xs font-mono text-gray-500 uppercase tracking-widest">Your Patron Spirit</div>
                    <h3 className={`text-2xl font-serif font-black uppercase ${affinity?.color}`}>
                        {affinity?.name}
                    </h3>
                    <div className="w-12 h-px bg-white/20 mx-auto my-4"></div>
                    <p className="text-sm text-gray-400 italic font-serif">"{affinity?.quote}"</p>
                </div>
              </div>
            </div>

            <button 
                onClick={resetSummon}
                className="px-8 py-3 bg-transparent border border-white/20 hover:bg-white hover:text-black hover:border-white transition-all duration-300 uppercase tracking-widest text-xs interactive"
            >
                Summon Again
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
