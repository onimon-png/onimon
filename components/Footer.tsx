import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-zinc-950 border-t border-white/5 py-16">
      <div className="container mx-auto px-6 flex flex-col items-center">
        
        {/* Social Links */}
        <div className="flex gap-8 mb-12">
            <a href="https://x.com/onimonNft" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors group">
                {/* X Logo SVG */}
                <svg viewBox="0 0 24 24" aria-hidden="true" className="w-6 h-6 fill-current group-hover:scale-110 transition-transform">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                </svg>
            </a>
        </div>

        <div className="text-center text-xs text-gray-600 font-mono uppercase tracking-widest space-y-2">
            <p>&copy; {new Date().getFullYear()} Onimon. All rights reserved.</p>
            <p>Forged in the shadow of the seven gods.</p>
        </div>

      </div>
    </footer>
  );
};
