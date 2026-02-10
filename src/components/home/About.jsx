import React from 'react';
import { FiShield, FiCamera, FiHome, FiPlay, FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { IoPricetagsOutline } from "react-icons/io5";
import { PiCarProfileLight } from "react-icons/pi";


const ExperienceSection = () => {
  return (
    <section className="w-11/12 mx-auto py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-20">
          <div>
            <h2 className="text-4xl md:text-4xl xl:text-5xl font-messiri">
              Experiences Crafted<br/> for Every Traveler
            </h2>
          </div>
          <div className="flex flex-col gap-5">
            <p className='font-medium'>
             As one of the best tours and travels in Kerala, TripScribe creates travel plans that go beyond basic bookings. Every trip is structured with attention to timing, comfort, and meaningful experiences, ensuring travelers enjoy each destination without feeling rushed or unprepared. The team specializes in international holidays, taking care of destination selection, visa assistance, accommodation, guided activities, and travel coordination across countries. With professional planning and reliable support, your global journey is handled by the best international tour operators in Kerala, making travel abroad simple, organized, and enjoyable.
            </p>
           
          </div>
        </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mt-10">
        
        {/* === LEFT CONTENT === */}
        <div className="space-y-8">
          {/* Heading */}
      

          {/* Features List */}
          <div className="space-y-6">
            <FeatureItem 
              icon={<PiCarProfileLight size={24} />} 
              title="Thoughtful Trip Planning" 
              desc="More than just a typical travel agency in Kerala, TripScribe focuses on structuring journeys
                    with the right flow, timing, and experiences. Every detail is arranged to make your trip
                    smooth, organized, and stress-free."
            />
            <FeatureItem 
              icon={<FiCamera size={24} />} 
              title="International Travel Expertise" 
              desc="Planning a trip abroad becomes easier with proper guidance on destinations, visas, stays,
              and activities. Every detail is handled with clarity so you can travel confidently across
              countries."
            />
            <FeatureItem 
              icon={<FiHome size={24} />} 
              title="Personalized Travel Plans" 
              desc="As one of the best tour operators in Kerala, the team designs trips based on your interests,
              comfort level, and travel pace instead of fixed, one-size-fits-all packages."
            />
            <FeatureItem 
              icon={<IoPricetagsOutline size={24} />} 
              title="Affordable Pricing" 
              desc="Well-planned travel doesn’t have to be expensive. You get quality arrangements, reliable
                  service, and memorable experiences at prices that suit your budget."
            />
          </div>
        </div>

        {/* === RIGHT IMAGERY === */}
        <div className="relative">
          {/* Main Large Image */}
          <div className="rounded-[2.5rem] overflow-hidden shadow-2xl h-[300px] lg:h-[600px] w-full">
            <img 
              src="https://images.unsplash.com/photo-1512100356356-de1b84283e18?q=80&w=1975&auto=format&fit=crop" 
              alt="Nature Landscape" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

      </div>
    </section>
  );
};

// --- Subcomponents ---

const FeatureItem = ({ icon, title, desc }) => (
  <div className="flex items-start gap-4">
    {/* Icon Circle */}
    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center mt-1">
      {icon}
    </div>
    {/* Text */}
    <div>
      <h3 className="text-xl md:text-2xl font-messiri text-gray-900 mb-1">
        {title}
      </h3>
      <p className=" text-gray-500 leading-relaxed ">
        {desc}
      </p>
    </div>
  </div>
);


export default ExperienceSection;