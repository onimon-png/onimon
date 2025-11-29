import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const TOTAL_SUPPLY = 1212;
const ITEMS_PER_PAGE = 6; // Changed to 6 items per page
const TOTAL_PAGES = Math.ceil(TOTAL_SUPPLY / ITEMS_PER_PAGE);

// --- SMART CACHING COMPONENT ---
const CachedOnimonCard: React.FC<{ id: number }> = ({ id }) => {
  const originalUrl = `https://bafybeidzlge64nofxvhup64ytzdxtn6lf4bmse6dab5zqgfktpczefub74.ipfs.w3s.link/${id}.png`;
  const [imgSrc, setImgSrc] = useState<string>(originalUrl);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let isActive = true;

    const loadAndCache = async () => {
      // 1. Check if Cache API is supported
      if (!('caches' in window)) return;

      try {
        const cacheName = 'onimon-vault-v1';
        const cache = await caches.open(cacheName);
        
        // 2. Check if we already have this image on disk
        const cachedResponse = await cache.match(originalUrl);

        if (cachedResponse) {
          // HIT! Load from cache (Instant)
          const blob = await cachedResponse.blob();
          const objectUrl = URL.createObjectURL(blob);
          if (isActive) {
            setImgSrc(objectUrl);
            setIsLoaded(true); // Mark as ready immediately
          }
        } else {
          // MISS! We must fetch it from IPFS
          // We let the <img> tag handle the display via originalUrl initially to be fast,
          // BUT we fetch in background to save it for next time.
          try {
            const response = await fetch(originalUrl, { mode: 'cors' });
            if (response.ok && isActive) {
              await cache.put(originalUrl, response.clone());
            }
          } catch (err) {
            // Ignore network errors, fallback to standard img behavior
          }
        }
      } catch (err) {
        console.error("Caching error:", err);
      }
    };

    loadAndCache();

    return () => {
      isActive = false;
      // Cleanup object URLs to avoid memory leaks if we created them
      if (imgSrc.startsWith('blob:')) {
        URL.revokeObjectURL(imgSrc);
      }
    };
  }, [originalUrl]);

  return (
    <div className="group relative aspect-square bg-black border border-white/5 overflow-hidden hover:border-oni-red/50 transition-colors interactive">
      {/* Loading Skeleton */}
      <div className={`absolute inset-0 bg-white/5 animate-pulse transition-opacity duration-500 ${isLoaded ? 'opacity-0' : 'opacity-100'}`}></div>
      
      <img 
        src={imgSrc}
        alt={`Onimon #${id}`}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        className={`w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      />
      
      {/* ID Overlay */}
      <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span className="text-xs font-mono text-white">#{id.toString().padStart(4, '0')}</span>
      </div>
    </div>
  );
};

export const Gallery: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [shuffledIds, setShuffledIds] = useState<number[]>([]);

  // Initialize and shuffle IDs once on mount
  useEffect(() => {
    const ids = Array.from({ length: TOTAL_SUPPLY }, (_, i) => i + 1);
    
    // Fisher-Yates Shuffle Algorithm
    for (let i = ids.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [ids[i], ids[j]] = [ids[j], ids[i]];
    }
    
    setShuffledIds(ids);
  }, []);

  // Scroll to top of gallery when page changes
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= TOTAL_PAGES) {
      setCurrentPage(newPage);
      const galleryElement = document.getElementById('archive-section');
      if (galleryElement) {
        galleryElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Filter items logic
  const getDisplayedItems = () => {
    // If searching, ignore shuffle and pagination, show exact ID
    if (searchTerm) {
      const num = parseInt(searchTerm);
      if (!isNaN(num) && num > 0 && num <= TOTAL_SUPPLY) {
        return [num];
      }
      return [];
    }

    // Pagination Logic based on Shuffled Array
    if (shuffledIds.length === 0) return [];

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return shuffledIds.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  };

  const displayedIds = getDisplayedItems();

  return (
    <section id="archive-section" className="py-20 bg-oni-dark border-t border-white/5 relative min-h-screen">
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6 reveal">
            <div>
                <h2 className="text-4xl md:text-5xl font-serif font-black text-white uppercase mb-2">
                    The Archive
                </h2>
                <p className="text-gray-500 text-sm font-mono">
                    PAGE <span className="text-oni-red">{currentPage}</span> / {TOTAL_PAGES}
                </p>
            </div>

            {/* Search / Filter */}
            <div className="relative w-full md:w-64 interactive">
                <input 
                    type="number" 
                    placeholder="Search ID (1-1212)..."
                    className="w-full bg-black/50 border border-white/10 text-white px-4 py-2 focus:outline-none focus:border-oni-red transition-colors placeholder-gray-700 text-sm font-mono"
                    onChange={(e) => setSearchTerm(e.target.value)}
                    min="1"
                    max="1212"
                />
            </div>
        </div>

        {/* The Wall of Souls Grid - Updated to use CachedOnimonCard */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 min-h-[400px] content-start">
            {displayedIds.map((id) => (
                <CachedOnimonCard key={id} id={id} />
            ))}
        </div>

        {/* Empty Search State */}
        {displayedIds.length === 0 && searchTerm && (
            <div className="text-center py-20 text-gray-600 font-mono">
                NO SOUL FOUND WITH THAT ID.
            </div>
        )}

        {/* Pagination Controls */}
        {!searchTerm && (
            <div className="flex justify-center items-center gap-8 mt-16 reveal">
                <button 
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="group flex items-center gap-2 text-gray-500 hover:text-oni-red disabled:opacity-30 disabled:hover:text-gray-500 transition-colors interactive"
                >
                    <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    <span className="font-mono text-sm tracking-widest">PREV</span>
                </button>

                <div className="h-px w-12 bg-white/10"></div>

                <button 
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === TOTAL_PAGES}
                    className="group flex items-center gap-2 text-gray-500 hover:text-oni-red disabled:opacity-30 disabled:hover:text-gray-500 transition-colors interactive"
                >
                    <span className="font-mono text-sm tracking-widest">NEXT</span>
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
        )}

      </div>
    </section>
  );
};
