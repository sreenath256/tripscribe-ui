import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

// --- Data ---
const faqData = [
  {
    id: 1,
    question: "What makes a travel agency reliable for planning holidays?",
    answer: `A dependable travel agency in Kerala offers clear communication, transparent
              pricing, well-structured itineraries, and support throughout the trip. Reliability comes
              from proper coordination of stays, transport, and experiences without last-minute
              issues.`
  },
  {
    id: 2,
    question: "Do tour operators help with hotel bookings and transportation?",
    answer: `Yes, professional tour operators in Kerala arrange accommodations, local transport,
and sightseeing as part of the travel plan. This ensures smoother movement between
destinations and a more comfortable overall journey.`
  },
  {
    id: 3,
    question: "Can my trip be customized instead of choosing a fixed package?",
    answer: `Yes, the tour operators in Kerala focus on creating personalized travel plans based
on your interests, schedule, and budget, rather than offering one-size-fits-all
packages.`
  },
  {
    id: 4,
    question: "Is it possible to book international trips through a local agency?",
    answer: `Yes, choosing the best international tour operators in Kerala gives you access to
expert support for destination planning, visa guidance, accommodations, and
complete travel coordination for a smooth overseas journey.`
  },
  {
    id: 5,
    question: "Why book with a travel agency instead of planning it yourself?",
    answer: `Working with a travel agency in Kerala saves time, avoids booking errors, and
ensures better travel coordination. Reputed tours and travels in Kerala provide
structured plans and reliable support throughout your journey.`
  },
];

// --- Individual Item (Stateless) ---
// Now accepts `isOpen` and `onClick` from parent
const FAQItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="border-b last:border-b-0 border-white/20">
      <button
        onClick={onClick}
        className="flex items-center justify-between w-full py-6 text-left focus:outline-none group"
      >
        <span className={`text-base xl:text-lg font-medium transition-colors ${isOpen ? "text-white" : "text-white/80 group-hover:text-white"}`}>
          {question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="ml-4 text-white"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth={2} 
            stroke="currentColor" 
            className="w-5 h-5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </motion.span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-gray-400 text-sm xl:text-base leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Main Component (State Manager) ---
const FaqList = () => {
  // State checks which ID is currently open. null means all closed.
  const [openId, setOpenId] = useState(null);

  // Toggle logic: if clicking the one already open, close it (set null). 
  // Otherwise, open the new one.
  const handleToggle = (id) => {
    setOpenId(openId === id ? null : id);
  };

  const leftColumnData = faqData.slice(0, 3);
  const rightColumnData = faqData.slice(3, 6);

  return (
    <section className="bg-black min-h-screen py-16">
      <div className="w-11/12 mx-auto">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start mb-5 lg:mb-16 gap-5 lg:gap-8">
          <div className="lg:w-1/2">
            <h2 className="text-4xl md:text-4xl xl:text-5xl text-white font-messiri leading-tight">
              Questions to Ask the<br/> Best Travel Agency<br/> in Kerala
            </h2>
          </div>
          <div className="lg:w-1/3 flex flex-col items-start space-y-6">
            <p className="text-gray-400 leading-relaxed">
              Planning a trip often comes with many questions about destinations, bookings, and travel
              arrangements. Here are clear answers to some of the most common doubts travelers have
              before starting their journey.
            </p>
             <Link
              to={"/"}
              className="w-fit group flex items-center gap-3 rounded-full bg-primary hover:bg-white text-white hover:text-black transition duration-200 px-8 py-4 "
            >
              <span className="text-xs tracking-widest">GET STARTED</span>
              <FiArrowRight
                size={15}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>

        {/* FAQ Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-4 mb-5 xl:mb-20">
          <div>
            {leftColumnData.map((item) => (
              <FAQItem 
                key={item.id} 
                {...item}
                // Pass true if this item's ID matches the state
                isOpen={openId === item.id}
                // Pass the toggle function
                onClick={() => handleToggle(item.id)}
              />
            ))}
          </div>

          <div>
            {rightColumnData.map((item) => (
              <FAQItem 
                key={item.id} 
                {...item}
                isOpen={openId === item.id}
                onClick={() => handleToggle(item.id)}
              />
            ))}
          </div>
        </div>

        {/* Video Section */}
        <div className="w-full relative h-[300px] xl:h-[600px] rounded-[3rem] overflow-hidden group">
          <div className="absolute inset-0 bg-black/20 z-10 pointer-events-none"></div>
          <video
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
            autoPlay
            loop
            muted
            playsInline
            src="https://videos.pexels.com/video-files/2169880/2169880-uhd_2560_1440_30fps.mp4"
          />
          <div className="absolute inset-0 z-20 flex items-center justify-center">
            <button className="bg-white/10 backdrop-blur-md p-6 rounded-full border border-white/20 group-hover:bg-white/20 transition-all">
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-white">
                  <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                </svg>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default FaqList;