import React from 'react';
import { Star, Share2, Heart, MapPin } from 'lucide-react';

const ShopCard = () => {
    return (
        <div className="group flex flex-col md:flex-row w-full bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm transition-all duration-300 cursor-pointer">
            {/* Image Section */}
            <div className="md:w-[320px] h-64 md:h-auto shrink-0 relative overflow-hidden">
                <img 
                    src="https://img.freepik.com/free-photo/type-entertainment-complex-popular-resort-with-pools-water-parks-turkey-with-more-than-5-million-visitors-year-amara-dolce-vita-luxury-hotel-resort-tekirova-kemer_146671-18728.jpg?t=st=1774436330~exp=1774439930~hmac=768d70475284718709cd8ec6ce135c2d7280528a210b8d097bc2df71ab5dffec&w=1000" 
                    alt="The Tall Trees" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <img 
                    src="https://img.freepik.com/free-photo/luxury-bedroom-hotel_1150-10836.jpg?t=st=1774437512~exp=1774441112~hmac=9387e599d7ff04588f314efb562be8b22a8fa3c21d02a9633b432970b3e14913&w=1480" 
                    alt="The Tall Trees Room" 
                    className="w-full h-full object-cover absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700 group-hover:scale-110"
                />
            </div>

            {/* Content Section */}
            <div className="flex flex-col md:flex-row flex-1 p-6 md:p-5 gap-6">
                {/* Left side of content (Details) */}
                <div className="flex-1 flex flex-col justify-start">
               

                    {/* Title */}
                    <h2 className="text-[26px] font-bold text-gray-900 mb-2 leading-tight">The Tall Trees</h2>

                    {/* Location */}
                    <div className="flex items-start gap-2 mb-6">
                        <MapPin size={20} fill="#1F2937" stroke="white" className="shrink-0 mt-1" />
                        <p className="text-gray-500 text-[15px] leading-relaxed max-w-[90%]">
                            The Tall Trees P.B.No.40 Bison Valley Road,<br />
                            Munnar 685612Kerala, Kerala Munnar
                        </p>
                    </div>

                    {/* Amenities Tags */}
                    <div className="flex items-center flex-wrap gap-3 mt-auto pt-4">
                        <span className="bg-[#F3F4F6] text-gray-600 text-[13px] px-4 py-1.5 rounded-full font-medium">Restaurant</span>
                        <span className="bg-[#F3F4F6] text-gray-600 text-[13px] px-4 py-1.5 rounded-full font-medium">Gift shops or newsstand</span>
                        <span className="text-[#0B0B7A] font-bold text-sm ml-1">& More</span>
                    </div>
                </div>

                {/* Right side of content (Pricing & Actions) */}
                <div className="flex flex-col justify-between items-end md:w-[240px] shrink-0 border-t md:border-t-0 md:border-l border-gray-100 pt-6 md:pt-0 md:pl-6">
                    {/* Share & Like icons */}
                    <div className="flex items-center gap-3 w-full justify-end mb-4 md:mb-0">
                        <button className="p-2 border border-gray-200 rounded-[10px] text-black hover:bg-gray-50 transition-colors shadow-sm">
                            <Share2 size={20} strokeWidth={2} />
                        </button>
                      
                    </div>

                    {/* Pricing */}
                    <div className="text-right mt-auto w-full ">
                        <div className="text-3xl font-extrabold text-gray-900 mb-1.5 leading-none">₹8,699.77</div>
                        <button className="w-full mt-2 hover:bg-primary border-[1px] border-primary hover:border-primary hover:bg-primary text-primary hover:text-white font-bold text-[15px] py-3.5 px-6 rounded-xl transition-all shadow-md">
                            Book Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShopCard;