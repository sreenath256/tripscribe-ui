import React from 'react';
import { FiArrowUpRight, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { section } from 'framer-motion/client';
import { KashmirImage, KeralaDest, KulluManaliDest, MeghalayaDest } from '../../assets';

const destinations = [
  {
    id: 1,
    title: 'Kerala',
    location: 'God\'s Own Country, India',
    imageUrl: KeralaDest, // Houseboat/Backwaters
    className: 'md:col-span-1 md:row-span-2', // Tall card on the left
  },
  {
    id: 2,
    title: 'Kullu Manali',
    location: 'Himachal Pradesh',
    imageUrl: KulluManaliDest, // Snow/Mountains
    className: 'md:col-span-1', // Top-right card 1
  },
  {
    id: 3,
    title: 'Meghalaya',
    location: 'North East India',
    imageUrl: MeghalayaDest, // Lush Green/Nature
    className: 'md:col-span-1', // Top-right card 2
  },
  {
    id: 4,
    title: 'Kashmir',
    location: 'Jammu & Kashmir',
    imageUrl: KashmirImage, // Dal Lake/Shikara
    className: 'md:col-span-2', // Bottom-right wide card
  },
];

const DestinationCard = ({ title, location, imageUrl, className }) => {
  return (
    <div className={`relative rounded-3xl overflow-hidden group w-full h-full ${className}`}>
      {/* Image with hover zoom effect */}
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-90"></div>
      
      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 flex justify-between items-end text-white">
        <div>
          <h5 className="text-xl font-semibold mb-1 font-messiri tracking-wide">{title}</h5>
          <p className="text-sm text-gray-300">{location}</p>
        </div>
        {/* Arrow Icon */}
        <div className="w-10 h-10 rounded-full border border-white/50 flex items-center justify-center text-white transition-colors duration-300 hover:bg-white/20 cursor-pointer">
          <FiArrowUpRight size={20} />
        </div>
      </div>
    </div>
  );
};

const DestinationGallery = () => {
  return (
    <section className='w-full bg-black'>
      <div className="w-11/12 mx-auto py-10 xl:py-20">
      
      {/* --- MOBILE VIEW: SWIPER CAROUSEL --- */}
      <div className="block md:hidden relative">
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={16}
          slidesPerView={1}
          loop={true}
          className="rounded-3xl h-[400px] w-full"
          // Link Swiper to our custom controls
          navigation={{
            nextEl: '.custom-next-btn',
            prevEl: '.custom-prev-btn',
          }}
          pagination={{
            el: '.custom-pagination',
            clickable: true,
          }}
        >
          {destinations.map((dest) => (
            <SwiperSlide key={dest.id}>
              {/* Force height to match desktop row height */}
              <div className="h-full w-full"> 
                <DestinationCard
                  title={dest.title}
                  location={dest.location}
                  imageUrl={dest.imageUrl}
                  className="" // Remove grid classes for mobile
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Controls Container */}
        <div className="flex items-center justify-between mt-6 px-2">
          
          {/* Custom Pagination Dots (Styled via CSS/Tailwind) */}
          <div className="custom-pagination flex gap-2 !w-auto [&_.swiper-pagination-bullet]:w-2.5 [&_.swiper-pagination-bullet]:h-2.5 [&_.swiper-pagination-bullet]:!bg-gray-300 [&_.swiper-pagination-bullet-active]:!bg-white [&_.swiper-pagination-bullet-active]:w-6 [&_.swiper-pagination-bullet]:rounded-full [&_.swiper-pagination-bullet]:transition-all"></div>

          {/* Custom Navigation Arrows */}
          <div className="flex gap-3">
            <button aria-label="Previous slide" className="custom-prev-btn w-10 h-10 rounded-full border border-gray-300 flex items-center bg-white justify-center hover:bg-primary hover:text-white  transition-all duration-300 active:scale-95 disabled:opacity-50">
              <FiChevronLeft size={22} />
            </button>
            <button aria-label="Next slide" className="custom-next-btn w-10 h-10 rounded-full border border-gray-300 flex items-center bg-white justify-center hover:bg-primary hover:text-white  transition-all duration-300 active:scale-95 disabled:opacity-50">
              <FiChevronRight size={22} />
            </button>
          </div>
        </div>
      </div>

      {/* --- DESKTOP VIEW: ORIGINAL GRID --- */}
      <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-6 md:auto-rows-[200px] xl:auto-rows-[400px]">
        {destinations.map((dest) => (
          <DestinationCard
            key={dest.id}
            title={dest.title}
            location={dest.location}
            imageUrl={dest.imageUrl}
            className={dest.className}
          />
        ))}
      </div>

    </div>
    </section>
  );
};

export default DestinationGallery;