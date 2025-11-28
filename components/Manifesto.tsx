import React from 'react';

export const Manifesto: React.FC = () => {
  return (
    <section className="py-24 bg-black relative overflow-hidden">
      {/* Decorative lines */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-oni-red to-transparent opacity-50"></div>
      
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center space-y-12">
            
            <div className="space-y-2">
                <h3 className="text-oni-gold/80 tracking-[1em] text-xs uppercase">The Philosophy</h3>
                <h2 className="text-4xl md:text-6xl font-serif text-white">
                    ART OVER UTILITY.
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-y border-white/10 py-12">
                <div className="p-4">
                    <h4 className="text-oni-red font-bold text-xl mb-2">NO ROADMAP</h4>
                    <p className="text-gray-500 text-sm">We don't sell promises. We create visuals that stand the test of time.</p>
                </div>
                <div className="p-4 md:border-l md:border-r border-white/10">
                    <h4 className="text-oni-red font-bold text-xl mb-2">NO TOKEN</h4>
                    <p className="text-gray-500 text-sm">No staking, no farming. Just a masterpiece in your wallet.</p>
                </div>
                <div className="p-4">
                    <h4 className="text-oni-red font-bold text-xl mb-2">JUST CULTURE</h4>
                    <p className="text-gray-500 text-sm">A symbol for the 8th Celestial God. A badge of taste.</p>
                </div>
            </div>

            <div className="pt-8">
                <p className="text-2xl font-serif italic text-white/60">
                    "The collection holds one simple truth — it is pure art."
                </p>
            </div>

        </div>
      </div>
    </section>
  );
};