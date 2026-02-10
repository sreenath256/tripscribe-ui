import React from 'react';
import { motion } from 'framer-motion';

const Preloader = () => {
  const brandName = "tripscribe";

  // Wave animation variants for each letter (stays the same)
  const letterVariants = {
    initial: { y: 0, opacity: 0 },
    animate: (i) => ({
      y: [0, -20, 0],
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.3,
        repeat: Infinity,
        repeatDelay: 1.5,
        ease: "easeOut"
      }
    })
  };

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-white z-[9999]"
      
      // --- THE CHANGE IS HERE ---
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0, 
        // y: -50, <--- Removed this line. Now it's just a pure fade.
        transition: { duration: 0.8, ease: "easeInOut" } 
      }}
      // --------------------------
    >
      <motion.div className="flex flex-col items-center">
        <div className="flex">
          {brandName.split('').map((letter, i) => (
            <motion.span
              key={i}
              className="text-2xl md:text-3xl xl:text-4xl font-Relieo text-black tracking-widest"
              custom={i}
              variants={letterVariants}
              initial="initial"
              animate="animate"
            >
              {letter === ' ' ? '\u00A0' : letter}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Preloader;