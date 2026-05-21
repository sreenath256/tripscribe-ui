import React from 'react';
import Marquee from 'react-fast-marquee';

const testimonials = [
  {
    id: 1,
    text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.",
    name: "Joe Marshall",
    role: "Designation",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1887&auto=format&fit=crop"
  },
  {
    id: 2,
    text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.",
    name: "Luna Muller",
    role: "Designation",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop"
  },
  {
    id: 3,
    text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.",
    name: "Roy Franklin",
    role: "Designation",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop"
  },
  {
    id: 4,
    text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.",
    name: "Gary Howard",
    role: "Designation",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop"
  }
];

const TestimonialMarquee = () => {
  return (
    <div className="w-full bg-[#0a0a0a] py-20 relative">
      
      {/* Optional: Left/Right Fade Gradients for smooth entrance/exit */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none" />

      <Marquee
        gradient={false} // We typically disable the default gradient to use our custom CSS ones above
        speed={40}       // Adjust scrolling speed
        pauseOnHover={true}
        className="py-4"
      >
        {testimonials.map((item) => (
          <div 
            key={item.id} 
            className="mx-4 w-[350px] md:w-[400px] flex-shrink-0 rounded-2xl bg-[#141414] p-8 transition-colors duration-300 hover:bg-[#1a1a1a]"
          >
            {/* Body Text */}
            <p className="text-sm leading-relaxed text-gray-400 mb-8 font-light">
              " {item.text} "
            </p>

            {/* Footer: Avatar & Info */}
            <div className="flex items-center gap-4">
              {/* Avatar */}
              <div className="h-12 w-12 rounded-full overflow-hidden flex-shrink-0 border border-white/10">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Text Info */}
              <div className="flex flex-col">
                <p className="text-base font-messiri font-medium text-white tracking-wide">
                  {item.name}
                </p>
                <span className="text-[10px] uppercase tracking-wider text-gray-400">
                  {item.role}
                </span>
              </div>
            </div>
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default TestimonialMarquee;