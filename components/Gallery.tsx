import React from 'react';

const COLLECTION = [
  {
    img: "https://bafybeidzlge64nofxvhup64ytzdxtn6lf4bmse6dab5zqgfktpczefub74.ipfs.w3s.link/1.png",
    title: "THE MONKEY KING",
    desc: "One of the 7 celestial Gods of the Ryunivers"
  },
  {
    img: "https://bafybeidzlge64nofxvhup64ytzdxtn6lf4bmse6dab5zqgfktpczefub74.ipfs.w3s.link/2.png",
    title: "IGRIS",
    desc: "The Shadow Monarch's most loyal knight"
  },
  {
    img: "https://bafybeidzlge64nofxvhup64ytzdxtn6lf4bmse6dab5zqgfktpczefub74.ipfs.w3s.link/3.png",
    title: "THE SHINIGAMI",
    desc: "God of Death from the 7 celestial Gods of the Ryunivers"
  },
  {
    img: "https://bafybeidzlge64nofxvhup64ytzdxtn6lf4bmse6dab5zqgfktpczefub74.ipfs.w3s.link/4.png",
    title: "KAGUTSUCHI",
    desc: "The God of Fire, one of the 7 celestial Gods of the Ryunivers"
  }
];

export const Gallery: React.FC = () => {
  return (
    <section className="py-24 bg-oni-dark relative">
      <div className="container mx-auto px-6">
        
        <div className="flex items-end justify-between mb-12 reveal">
            <h2 className="text-5xl md:text-7xl font-serif font-black text-white/10 uppercase select-none">
                The Gods
            </h2>
            <div className="h-px bg-oni-red flex-1 ml-8 mb-4 opacity-50"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {COLLECTION.map((item, index) => (
                <div key={index} className="group relative aspect-square bg-black overflow-hidden border border-white/5 reveal interactive">
                    {/* Image */}
                    <img 
                        src={item.img} 
                        alt={item.title} 
                        className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105 group-hover:contrast-110 grayscale-[50%] group-hover:grayscale-0"
                    />
                    
                    {/* Dark Overlay for Text Readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
                    
                    {/* Content */}
                    <div className="absolute bottom-0 left-0 w-full p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <div className="overflow-hidden mb-2">
                             <span className="text-oni-red font-mono text-xs tracking-widest block transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 delay-100">
                                0{index + 1} // CELESTIAL
                            </span>
                        </div>
                        <h3 className="text-white font-serif text-3xl md:text-4xl uppercase font-bold tracking-wide mb-2">
                            {item.title}
                        </h3>
                        <div className="h-0 group-hover:h-auto overflow-hidden transition-all duration-500">
                             <p className="text-gray-300 font-light text-sm md:text-base border-l-2 border-oni-red pl-4 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-200">
                                {item.desc}
                            </p>
                        </div>
                    </div>

                    {/* Corner Accent */}
                    <div className="absolute top-4 right-4 w-2 h-2 bg-oni-red opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
};