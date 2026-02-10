import React from 'react';

const Blog = () => {
  // Data for the right-side list items
  const blogPosts = [
    {
      id: 1,
      title: "Budget Travel Tips: How to Travel More for Less",
      description: "Learn smart ways to save money on flights, hotels, food, and activities without compromising your travel experience.",
      image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800", // Mountain/Hiking
    },
    {
      id: 2,
      title: "Best Time to Visit Popular Tourist Places",
      description: "A seasonal guide to help you plan trips perfectly by avoiding crowds and getting the best weather and deals.",
      image: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&q=80&w=800", // Coastal/Bali
    },
    {
      id: 3,
      title: "Solo Travel Guide: Safety Tips and Best Destinations",
      description: "Everything you need to know about solo travel, including safety advice, packing tips, and beginner-friendly destinations.",
      image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&q=80&w=800", // Temple/City
    },
  ];

  return (
    <section className="bg-white py-16">
      <div className="w-11/12 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-10">
          
          {/* --- Left Column --- */}
          <div className="flex flex-col justify-between h-full">
            
            {/* Header Text Section */}
            <div className="mb-5">
              <h2 className="text-4xl md:text-4xl xl:text-5xl font-messiri font-medium text-black leading-[1.15] mb-5">
                Travel Insights &<br/> Inspiration
              </h2>
              <p className="text-gray-500 text-base md:text-lg leading-relaxed max-w-lg">
              Read about destinations, planning advice, and travel ideas designed to make every journey
              easy and enjoyable.</p>
            </div>

            {/* Featured Big Card */}
            <div className="hidden xl:block relative w-full aspect-video rounded-3xl overflow-hidden group cursor-pointer">
              <img 
                src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1200" 
                alt="Tropical Bliss" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              
              {/* Card Content */}
              <div className="absolute bottom-0 left-0 p-5 md:p-7 w-full">
                <h3 className="text-2xl md:text-3xl font-messiri text-white mb-3 leading-tight max-w-sm">
                  Top 10 Must-Visit Destinations in 2026
                </h3>
                <button className="flex items-center text-white text-xs uppercase tracking-widest hover:text-gray-200 transition-colors">
                  Read More 
                  <ArrowRight className="ml-2 w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* --- Right Column (List) --- */}
          <div className="flex flex-col justify-between h-full gap-5">
            {blogPosts.map((post) => (
              <div key={post.id} className="flex flex-col md:flex-row gap-3 items-center group cursor-pointer">
                {/* Image Wrapper */}
                <div className="w-full md:w-1/2 overflow-hidden rounded-3xl aspect-video">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                
                {/* Text Content */}
                <div className="w-full md:w-1/2 flex flex-col gap-2 justify-center py-2">
                  <h3 className="md:text-lg font-messiri font-medium text-black leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">
                    {post.description}
                  </p>
                  <button className="flex items-center text-black text-xs tracking-widest uppercase hover:opacity-70 transition-opacity self-start">
                    Read More 
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}

// Simple Arrow SVG Component
const ArrowRight = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
)

export default Blog