import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react'; // Added MessageCircle icon
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const placesData = [
  {
    id: 1,
    title: "Kerala",
    location: "India",
    price: 40000,
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=2070&auto=format&fit=crop",
    category: ["DESTINATION", "STAYS"] 
  },
  {
    id: 2,
    title: "Delhi Agra",
    location: "India",
    price: 2000,
    image: "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=2076&auto=format&fit=crop",
    category: ["DESTINATION", "STAYS"] 
  },
  {
    id: 3,
    title: "Delhi Agra Jaipur",
    location: "India",
    price: 3500,
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=2070&auto=format&fit=crop",
    category: ["DESTINATION", "STAYS"] 
  },
  {
    id: 4,
    title: "Kullu Manali",
    location: "India",
    price: 18000,
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=2070&auto=format&fit=crop",
    category: ["DESTINATION", "STAYS"]
  },
  {
    id: 5,
    title: "Meghalaya",
    location: "India",
    price: 18000,
    image: "https://images.unsplash.com/photo-1637043765564-a071ff91a09f?q=80&w=987&auto=format&fit=crop",
    category: ["STAYS", "DESTINATION"]
  },
  {
    id: 6,
    title: "Kashmir",
    location: "India",
    price: 24000,
    image: "https://images.unsplash.com/photo-1627894485200-b92fb4353967?q=80&w=2070&auto=format&fit=crop",
    category: ["STAYS", "DESTINATION"]
  },
  {
    id: 7,
    title: "Ootty",
    location: "India",
    price: 48000,
    image: "https://images.unsplash.com/photo-1707655315272-33a54a771068?q=80&w=987&auto=format&fit=crop",
    category: ["DESTINATION", "STAYS"] 
  },
  {
    id: 8,
    title: "Kodaikkanal",
    location: "India",
    price: 26000,
    image: "https://kodaikingtravels.com/wp-content/uploads/2023/09/hills-tour3.jpg",
    category: ["DESTINATION", "STAYS"] 
  }
];

const tabs = ["DESTINATION", "STAYS", "ACTIVITIES"];

// Reusable Empty State Component
const EmptyState = ({ tabName }) => {
  const handleWhatsAppClick = () => {
    const phoneNumber = "8138099941"; 
    const message = `Hello, I'm looking for information regarding ${tabName.toLowerCase()} experiences.`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center bg-gray-50 rounded-[32px] border-2 border-dashed border-gray-200">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <MapPin size={32} className="text-gray-400" />
      </div>
      <h3 className="text-xl font-messiri font-bold text-gray-800 mb-2">No {tabName.toLowerCase()} listed yet</h3>
      <p className="text-gray-500 max-w-xs mx-auto mb-8 text-sm">
        We are currently updating our curated list. Connect with us directly to plan your custom itinerary.
      </p>
      <button 
        onClick={handleWhatsAppClick}
        className="flex items-center gap-2 bg-[#25D366] text-white px-8 py-3 rounded-full font-medium hover:bg-[#20ba5a] transition-all transform hover:scale-105 active:scale-95 shadow-lg"
      >
        <MessageCircle size={20} />
        Chat on WhatsApp
      </button>
    </div>
  );
};

const PlaceCard = ({ place }) => {
  const handleCardClick = () => {
    const phoneNumber = "8138099941"; 
    const message = `Hello, I am interested in knowing more about ${place.title}.`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div 
      onClick={handleCardClick}
      className="group relative h-full w-full rounded-[32px] overflow-hidden cursor-pointer shadow-sm bg-gray-200"
    >
      <img
        src={place.image}
        alt={place.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90" />
      <div className="absolute bottom-0 left-0 w-full p-6 flex justify-between items-end text-white z-10">
        <div className="flex flex-col gap-1">
          <h3 className="text-2xl font-bold tracking-wide font-messiri">{place.title}</h3>
          <div className="flex items-center gap-1.5 text-gray-300 text-sm">
            <MapPin size={16} className="text-gray-300" />
            <span>{place.location}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const FinePlace = () => {
  const [activeTab, setActiveTab] = useState("DESTINATION");

  const filteredPlaces = placesData.filter(place => 
    place.category.includes(activeTab)
  );

  return (
    <div className="w-full min-h-screen bg-white py-16 text-slate-800">
      <div className="w-11/12 mx-auto">
        
        <div className="text-center mb-5 lg:mb-12">
          <h1 className="text-4xl md:text-5xl font-messiri font-medium text-black mb-4 tracking-tight">
            Travel Through the<br/> Soul of India
          </h1>
          <p className="text-gray-500 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
            Plan your trip with the best tour operators in Kerala, and step into journeys designed with clarity, comfort, and the right pace.
          </p>
        </div>

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

        {/* --- MOBILE VIEW --- */}
        <div className="block md:hidden relative">
          {filteredPlaces.length > 0 ? (
            <>
              <Swiper
                key={activeTab}
                modules={[Navigation, Pagination]}
                spaceBetween={16}
                slidesPerView={1}
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
                    <div className="w-full h-full">
                      <PlaceCard place={place} />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

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
                  <button className="swiper-custom-prev w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                    <ChevronLeft size={20} />
                  </button>
                  <button className="swiper-custom-next w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <EmptyState tabName={activeTab} />
          )}
        </div>

        {/* --- DESKTOP VIEW --- */}
        <div className="hidden md:block">
          {filteredPlaces.length > 0 ? (
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
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
          ) : (
            <EmptyState tabName={activeTab} />
          )}
        </div>

      </div>
    </div>
  );
};

export default FinePlace;