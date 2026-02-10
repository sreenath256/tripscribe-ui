import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const destinations = [
  {
    id: 1,
    country: "Thailand",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1938&auto=format&fit=crop", 
    label: "VISIT",
    url: '/contact'
  },
  {
    id: 2,
    country: "Malaysia",
    image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=2039&auto=format&fit=crop",
    label: "VISIT",
    url: '/contact'
  },
  {
    id: 3,
    country: "Bali",
    image: "https://images.unsplash.com/photo-1641128324972-af3212f0f6bd?q=80&w=2070&auto=format&fit=crop",
    label: "VISIT",
    url: '/contact'
  },
  {
    id: 4,
    country: "Vietnam",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2070&auto=format&fit=crop",
    label: "VISIT",
    url: '/contact'
  },
  {
    id: 5,
    country: "Azerbaijan",
    image: "https://images.unsplash.com/photo-1607207685852-51dd32267d26?q=80&w=1974&auto=format&fit=crop",
    label: "VISIT",
    url: '/contact'
  },
  {
    id: 6,
    country: "Kazakhstan", 
    image: "https://images.unsplash.com/photo-1677475191981-653bcfcc3cd2?q=80&w=2093&auto=format&fit=crop",
    label: "VISIT",
    url: '/contact'
  },
  {
    id: 7,
    country: "Georgia",
    image: "https://images.unsplash.com/photo-1565008576549-57569a49371d?q=80&w=2070&auto=format&fit=crop",
    label: "VISIT",
    url: '/contact'
  },
];

const FullScreenGallery = () => {
  const [activeIndex, setActiveIndex] = useState(0); 
  const [isPaused, setIsPaused] = useState(false); // New state to handle pausing

  // --- AUTO-PLAY FUNCTIONALITY ---
  useEffect(() => {
    // If user is hovering (paused), do not set interval
    if (isPaused) return;

    const interval = setInterval(() => {
      setActiveIndex((current) => {
        // If we are at the end (index 4), go back to 0, otherwise add 1
        return current === destinations.length - 1 ? 0 : current + 1;
      });
    }, 4000); // Change slides every 4 seconds

    // Cleanup interval on unmount or when paused changes
    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    // Changed h-screen to h-[100dvh] for better mobile browser support
    <section className='bg-black w-full h-full'>
    {/* <h3 className='text-4xl md:text-4xl xl:text-5xl font-messiri px-10 pb-10 text-center text-white'>Adventures Around the Globe</h3> */}
    <div className="relative w-full h-screen md:h-[50vh] xl:h-[100dvh] bg-black overflow-hidden font-sans">
      
      {/* --- BACKGROUND LAYER --- */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode='popLayout'>
            {destinations.map((item, index) => (
                <motion.div
                    key={item.id}
                    initial={{ opacity: 0 }}
                    animate={{ 
                        opacity: activeIndex === index ? 1 : 0,
                        scale: activeIndex === index ? 1.05 : 1 
                    }}
                    transition={{ 
                        opacity: { duration: 0.8, ease: "easeInOut" },
                        scale: { duration: 6, ease: "linear" } 
                    }}
                    className={`absolute inset-0 w-full h-full ${activeIndex === index ? 'z-10' : 'z-0'}`}
                >
                    <img 
                        src={item.image} 
                        alt={item.country} 
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 md:bg-black/30" />
                </motion.div>
            ))}
        </AnimatePresence>
      </div>

      {/* --- FOREGROUND COLUMNS (Navigation) --- */}
      <div className="relative z-20 w-full h-full grid grid-cols-1 md:grid-cols-7">
        {destinations.map((item, index) => (
          <div
            key={item.id}
            // Logic: Set active, and pause timer so it doesn't jump while reading
            onMouseEnter={() => {
              setActiveIndex(index);
              setIsPaused(true);
            }}
            // Logic: Resume timer when mouse leaves
            onMouseLeave={() => setIsPaused(false)}
            onClick={() => setActiveIndex(index)}
            className={`
                relative h-full cursor-pointer 
                transition-colors duration-300 hover:bg-white/5
                group flex flex-row md:flex-col justify-between items-center
                px-6 md:px-0 py-0 md:py-12
                
                /* Border Logic: Bottom on mobile, Right on desktop */
                border-b md:border-b-0 md:border-r border-white/20 
                last:border-b-0 md:last:border-r-0
            `}
          >
            {/* Top Text Group */}
            <div className="flex flex-col items-start md:items-center gap-2 md:gap-4 md:mt-16 transition-all duration-300 transform group-hover:-translate-y-2">
                <span className="text-[10px] md:text-xs tracking-[0.2em] uppercase text-white/70">
                    {item.label}
                </span>
                <h2 className="text-xl md:text-2xl lg:text-3xl font-messiri text-white tracking-wide">
                    {item.country}
                </h2>
            </div>

            {/* Bottom "View More" */}
            <div className={`
                flex flex-row md:flex-col items-center gap-2 md:mb-12 transition-all duration-500
                ${activeIndex === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 md:translate-y-4'}
            `}>
                 <span className="hidden md:block text-[10px] tracking-[0.2em] font-bold uppercase text-white">
                    View More
                </span>
                <Link to={'/contact'} className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-white/40 flex items-center justify-center text-white backdrop-blur-md">
                    <ArrowRight size={16} />
                </Link>
            </div>

            {/* Active Indicator Line */}
            {activeIndex === index && (
                <motion.div 
                    layoutId="active-line"
                    className="absolute left-0 bottom-0 md:left-0 md:bottom-0 w-1 h-full md:w-full md:h-1 bg-primary"
                />
            )}
          </div>
        ))}
      </div>

    </div>
    </section>
  );
};

export default FullScreenGallery;