import React from 'react';
import { Twitter, Disc as Discord, Github } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-zinc-950 border-t border-white/5 py-16">
      <div className="container mx-auto px-6 flex flex-col items-center">
        
        <div className="mb-8">
            <span className="text-3xl font-serif font-bold tracking-widest text-white">
                ONI<span className="text-oni-red">MON</span>
            </span>
        </div>

        <div className="flex gap-8 mb-12">
            <a href="#" className="text-gray-500 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-500 hover:text-white transition-colors">
                <Discord className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-500 hover:text-white transition-colors">
                <Github className="w-5 h-5" />
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