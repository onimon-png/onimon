import React from 'react';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen w-full flex flex-col justify-center overflow-hidden pt-20 pb-10">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 bg-oni-dark">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-oni-red/10 via-oni-dark to-oni-dark animate-pulse-slow"></div>
        {/* Giant Watermark Kanji */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[40vw] font-black text-white/[0.02] pointer-events-none select-none leading-none rotate-12">
            鬼
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Typography / Title */}
            <div className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left reveal">
                <h2 className="text-oni-red tracking-[0.5em] text-sm md:text-base font-bold uppercase mb-4 pl-1">
                    The 8th Celestial Collection
                </h2>
                <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif font-black text-white leading-[0.85] tracking-tighter mb-8">
                    PURE <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-400 to-gray-600">AESTHETIC</span> <br/>
                    <span className="text-oni-red">MYTHOS</span>
                </h1>
                
                <p className="text-gray-400 text-lg md:text-xl font-light max-w-lg mx-auto lg:mx-0 border-l-2 border-oni-red pl-6 py-2 interactive">
                    From this mythos rises the Onimon: a fusion of Oni spirit and <span className="text-white font-medium">Monad essence</span>.
                    Forged for those who appreciate the art, not the hype.
                </p>
            </div>

            {/* Hero Image Showcase */}
            <div className="lg:col-span-5 relative reveal delay-200">
                <div className="relative aspect-square w-full max-w-md mx-auto transform rotate-3 transition-transform duration-700 hover:rotate-0 interactive cursor-none">
                    <div className="absolute inset-0 bg-oni-red blur-3xl opacity-20 animate-pulse"></div>
                    <img 
                        src="https://bafybeidzlge64nofxvhup64ytzdxtn6lf4bmse6dab5zqgfktpczefub74.ipfs.w3s.link/1.png" 
                        alt="Onimon Hero" 
                        className="relative w-full h-full object-cover border border-white/10 shadow-2xl grayscale-[30%] hover:grayscale-0 transition-all duration-700"
                    />
                    {/* Decorative Japanese Text */}
                    <div className="absolute -right-8 top-0 text-vertical text-4xl font-black text-white/20 hidden md:block">
                        悪魔の芸術
                    </div>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};