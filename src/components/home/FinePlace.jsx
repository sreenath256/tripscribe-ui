import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

// ⚠️ IMPORTANT: These styles must be imported for Swiper to work!
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Reliable Image Data
const placesData = [
  {
    id: 1,
    title: "Kerala",
    location: "India",
    price: 40000,
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=2070&auto=format&fit=crop",
    category: "DESTINATION"
  },
  {
    id: 2,
    title: "Delhi Agra",
    location: "India",
    price: 2000,
    image: "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=2076&auto=format&fit=crop",
    category: "DESTINATION"
  },
  {
    id: 3,
    title: "Delhi Agra Jaipur",
    location: "India",
    price: 3500,
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=2070&auto=format&fit=crop",
    category: "DESTINATION"
  },
  {
    id: 4,
    title: "Kullu Manali",
    location: "India",
    price: 18000,
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=2070&auto=format&fit=crop",
    category: "DESTINATION"
  },
  {
    id: 5,
    title: "Meghalaya",
    location: "India",
    price: 18000,
    image: "https://images.unsplash.com/photo-1723651682975-3a6a9101c47d?q=80&w=1037&auto=format&fit=crop",
    category: "ACCOMODATION"
  },
  {
    id: 6,
    title: "Kashmir",
    location: "India",
    price: 24000,
    image: "https://images.unsplash.com/photo-1595846519845-68e298c2edd8?q=80&w=2070&auto=format&fit=crop",
    category: "ACTIVITY"
  },
  {
    id: 7,
    title: "Ootty",
    location: "India",
    price: 48000,
    image: "https://images.unsplash.com/photo-1546948630-1149ea60dc86?q=80&w=2070&auto=format&fit=crop",
    category: "ACTIVITY"
  },
  {
    id: 8,
    title: "Kodaikkanal",
    location: "India",
    price: 26000,
    image: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?q=80&w=2070&auto=format&fit=crop",
    category: "DESTINATION"
  }
];

const tabs = ["DESTINATION", "ACCOMODATION", "ACTIVITY"];

// Reusable Card Component
const PlaceCard = ({ place }) => {
  return (
    <div className="group relative h-full w-full rounded-[32px] overflow-hidden cursor-pointer shadow-sm bg-gray-200">
      {/* Background Image */}
      <img
        src={place.image}
        alt={place.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 w-full p-6 flex justify-between items-end text-white z-10">
        {/* Left Side: Title & Loc */}
        <div className="flex flex-col gap-1">
          <h3 className="text-2xl font-bold tracking-wide font-messiri">{place.title}</h3>
          <div className="flex items-center gap-1.5 text-gray-300 text-sm">
            <MapPin size={16} className="text-gray-300" />
            <span className="">{place.location}</span>
          </div>
        </div>

        {/* Right Side: Price */}
        <div className="flex flex-col items-end">
          <span className="text-xs text-gray-300  mb-1">Start From</span>
          <span className="font-messiri text-lg">₹{place.price}</span>
        </div>
      </div>
    </div>
  );
};

const FinePlace = () => {
  const [activeTab, setActiveTab] = useState("DESTINATION");

  const filteredPlaces = activeTab === "DESTINATION"
    ? placesData
    : placesData.filter(place => place.category === activeTab);

  return (
    <div className="w-full min-h-screen bg-white py-16  text-slate-800">
      <div className="w-11/12 mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-5 lg:mb-12">
          <h1 className="text-4xl md:text-5xl font-messiri font-medium text-black mb-4 tracking-tight">
            Travel Through the<br/> Soul of India
          </h1>
          <p className="text-gray-500 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
            Plan your trip with the best tour operators in Kerala, and step into journeys designed with clarity, comfort, and the right pace. Every route, stay, and experience is arranged to help you explore more while worrying less.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="flex flex-col flex-wrap md:flex-nowrap md:flex-row w-full md:w-fit items-center gap-1 border border-gray-200 rounded-2xl md:rounded-full p-1.5 bg-white shadow-sm">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`
                  relative w-full px-6 py-2.5 text-sm rounded-full transition-colors duration-300 z-10 font-medium
                  ${activeTab === tab ? 'text-white' : 'text-gray-500 hover:text-gray-700'}
                `}
              >
                {activeTab === tab && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-primary rounded-full -z-10"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* --- MOBILE VIEW: SWIPER CAROUSEL (Hidden on md and up) --- */}
        <div className="block md:hidden relative">
          {/* Swiper Container */}
          <Swiper
            key={activeTab} // Force re-render on tab change
            modules={[Navigation, Pagination]}
            spaceBetween={16}
            slidesPerView={1}
            // ⚠️ FIX: Added h-[420px] explicitly so the container has height
            className="w-full h-[420px] rounded-[32px] z-0" 
            navigation={{
              nextEl: '.swiper-custom-next',
              prevEl: '.swiper-custom-prev',
            }}
            pagination={{
              el: '.swiper-custom-pagination',
              clickable: true,
            }}
          >
            {filteredPlaces.map((place) => (
              <SwiperSlide key={place.id}>
                {/* ⚠️ FIX: Ensure the slide content takes full height */}
                <div className="w-full h-full">
                  <PlaceCard place={place} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Controls */}
          <div className="flex items-center justify-between mt-6 px-2">
            <div className="swiper-custom-pagination flex gap-2 !w-auto 
              [&_.swiper-pagination-bullet]:w-2.5 
              [&_.swiper-pagination-bullet]:h-2.5 
              [&_.swiper-pagination-bullet]:bg-gray-300 
              [&_.swiper-pagination-bullet-active]:!bg-black 
              [&_.swiper-pagination-bullet-active]:w-8 
              [&_.swiper-pagination-bullet]:rounded-full 
              [&_.swiper-pagination-bullet]:transition-all">
            </div>

            <div className="flex gap-3">
              <button className="swiper-custom-prev w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-primary hover:text-white  transition-all duration-300 active:scale-95 disabled:opacity-50">
                <ChevronLeft size={20} />
              </button>
              <button className="swiper-custom-next w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-primary hover:text-white  transition-all duration-300 active:scale-95 disabled:opacity-50">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
          
          {filteredPlaces.length === 0 && (
             <div className="text-center py-10 text-gray-400">No items found.</div>
          )}
        </div>

        {/* --- DESKTOP VIEW: GRID (Hidden on mobile) --- */}
        <motion.div
          layout
          className="hidden md:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          <AnimatePresence mode='popLayout'>
            {filteredPlaces.map((place) => (
              <motion.div
                key={place.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="h-[420px] md:h-[300px] xl:h-[420px]"
              >
                <PlaceCard place={place} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        
        <div className="hidden md:block">
            {filteredPlaces.length === 0 && (
            <div className="text-center py-20 text-gray-400">
                No items found in this category.
            </div>
            )}
        </div>

      </div>
    </div>
  );
};

export default FinePlace;