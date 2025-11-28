import React from 'react';

export const Lore: React.FC = () => {
  return (
    <div className="w-full bg-oni-dark overflow-hidden py-20 relative">
      
      {/* Moving Marquee */}
      <div className="relative flex overflow-x-hidden mb-16 opacity-30 hover:opacity-50 transition-opacity duration-500">
        <div className="py-2 animate-marquee whitespace-nowrap">
          <span className="text-7xl md:text-9xl font-black text-transparent stroke-text font-serif mx-4">
            SHADOW OF THE SEVEN GODS
          </span>
          <span className="text-7xl md:text-9xl font-black text-transparent stroke-text font-serif mx-4">
             THE GOLDEN SCROLLS
          </span>
        </div>
        <div className="absolute top-0 py-2 animate-marquee2 whitespace-nowrap">
          <span className="text-7xl md:text-9xl font-black text-transparent stroke-text font-serif mx-4">
            SHADOW OF THE SEVEN GODS
          </span>
          <span className="text-7xl md:text-9xl font-black text-transparent stroke-text font-serif mx-4">
             THE GOLDEN SCROLLS
          </span>
        </div>
      </div>

      {/* Narrative Section - Scrollytelling feel */}
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
        <div className="hidden md:block h-full w-px bg-gradient-to-b from-transparent via-oni-red to-transparent mx-auto opacity-30 reveal"></div>
        
        <div className="space-y-12">
            <div className="reveal">
                <h3 className="text-oni-red text-sm tracking-[0.5em] mb-4 uppercase">The Prologue</h3>
                <p className="text-2xl md:text-3xl font-serif text-white leading-relaxed">
                    In the shadow of the <span className="text-oni-gold">Seven Gods</span>, the ancient Oni bloodline endures the cursed Trials.
                </p>
            </div>
            
            <div className="reveal delay-200 pl-8 border-l border-white/10">
                <p className="text-gray-400 text-lg">
                    They seek the Golden Scrolls that promise ascension as the <span className="text-white font-bold">8th Celestial God</span>.
                    It is not just a myth. It is a path forged in fire and shadow.
                </p>
            </div>
        </div>
      </div>
      
      <style>{`
        .stroke-text {
          -webkit-text-stroke: 1px #555;
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .animate-marquee2 {
          animation: marquee2 30s linear infinite;
        }
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-100%); }
        }
        @keyframes marquee2 {
          0% { transform: translateX(100%); }
          100% { transform: translateX(0%); }
        }
      `}</style>
    </div>
  );
};