import React, { useState } from 'react';
import { FaInstagram, FaTwitter, FaFacebookF, FaYoutube } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { LogoWhite } from '../assets';

const Footer = () => {
    // 1. State for form inputs
    const [formData, setFormData] = useState({
      email: "",
    });
  
    // 2. Handle input changes
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    // 3. Handle Form Submission (WhatsApp Integration)
    const handleSubmit = (e) => {
      e.preventDefault();
  
      // Basic validation
      if (!formData.email) {
        alert("Please fill in all fields before sending.");
        return;
      }
  
      // Format the message
      const phoneNumber = "8138099941";
      const text = `*New Inquiry from Tripscribe Website*%0a*Email:* ${formData.email}`;
  
      // Create the WhatsApp URL
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${text}`;
  
      // Open WhatsApp in a new tab
      window.open(whatsappUrl, "_blank");
  
      // 🔄 Reset form
    setFormData({
      email: "",
    });
  }
  return (
    <footer className="w-full font-Quicksand">
      
      {/* ==================== 1. CTA SECTION (Top) ==================== */}
      <div className="relative w-full h-[400px] xl:h-[500px] flex items-center justify-center bg-gray-900">
        {/* Background Image */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1776&auto=format&fit=crop')" 
          }}
        >
          {/* Dark Overlay for Text Readability */}
          <div className="absolute inset-0 bg-black/60" />
        </div>

        {/* Content */}
        <div className="relative z-10 px-6 text-center max-w-3xl mx-auto space-y-6">
          <h2 className="font-messiri text-4xl md:text-5xl lg:text-6xl text-white leading-tight">
            The Right Trip Starts<br/> With the Right Team
          </h2>
          <p className="text-gray-300 text-sm md:text-base leading-relaxed max-w-xl mx-auto">
            Connect with the best travel agency in Kerala and let us guide you from the first idea to the
final return, making every step of your journey smooth, clear, and perfectly arranged.
          </p>
          <Link to={'/contact'} className="mt-4 bg-primary hover:bg-white text-white hover:text-black transition duration-200 text-black px-10 py-4 rounded-full text-xs font-medium tracking-widest  uppercase">
            Contact Us
          </Link>
        </div>
      </div>


      {/* ==================== 2. MAIN FOOTER (Bottom) ==================== */}
      <div className=" bg-[#0b0502] text-white pt-20 pb-8 ">
        
        {/* Grid Container */}
        <div className="w-11/12 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-8 border-b border-white/10 pb-16">
          
          {/* Column 1: Brand & Address (Span 4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <Link to={'/'} className="text-4xl text-white tracking-wide cursor-pointer font-messiri transition-all duration-200">
                    <img className='-ml-4 h-16 object-contain transition-all duration-200' src={LogoWhite} alt="" />
            </Link>
            <div className="text-gray-400 text-sm leading-relaxed space-y-1 mt-5">
              <p>1st Floor, Ramaswami Complex,<br/>
                Cherooty Rd, Behind Basics,<br/>
                Kozhikode, Kerala</p>
            </div>
            {/* Social Icons */}
            <div className="flex items-center gap-6 pt-2">
              <a href="https://www.instagram.com/tripscribe.in?igsh=MW5tYnM5eTQyeWltZQ==" target='_blank'>
                  <SocialIcon icon={<FaInstagram size={18} />} />
              </a>
            </div>
          </div>

          {/* Column 2: Page Links (Span 2 cols) */}
          <div className="lg:col-span-2 space-y-6">
            <h4 className="text-2xl font-messiri text-white">Page</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <FooterLink text="About Us" />
              <FooterLink text="Services" />
              <FooterLink text="FAQ" />
              <FooterLink text="Contact Us" />
            </ul>
          </div>

          {/* Column 3: Important Links (Span 2 cols) */}
          <div className="lg:col-span-2 space-y-6">
            <h4 className="text-2xl font-messiri text-white">Important Link</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <FooterLink text="Privacy Policy" />
              <FooterLink text="Career" />
              <FooterLink text="Blog" />
              <FooterLink text="Term & Condition" />
            </ul>
          </div>

          {/* Column 4: Newsletter (Span 4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <h4 className="text-2xl font-messiri text-white">Contact Us</h4>
            <p className="text-sm text-gray-400 leading-relaxed">
              Join our travel community and stay updated with exciting destinations, special offers, and expert travel tips.
            </p>
            
            {/* Input Field with Button Inside */}
            <form onSubmit={handleSubmit} className="relative mt-2">
              <input 
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email Address" 
                className="w-full bg-transparent border border-white/20 rounded-full py-4 pl-6 pr-32 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-white/50 transition-colors"
              />
              <button 
                type="submit"
                className="absolute top-1/2 -translate-y-1/2 right-1.5 bg-primary hover:bg-white text-white hover:text-black transition duration-200  px-6 py-3.5 rounded-full text-[10px] tracking-widest  uppercase"
              >
                subscribe
              </button>
            </form>
          </div>

        </div>

        {/* Footer Bottom (Copyright) */}
        <div className="w-11/12 mx-auto flex flex-col md:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>Copyright © 2026. All rights reserved</p>
          <p><a className='hover:underline' href="https://dostudio.co.in" target='_blank'>Powered by Dostudio</a></p>
        </div>

      </div>
    </footer>
  );
};

// --- Subcomponents for cleaner code ---

const SocialIcon = ({ icon }) => (
  <span className="text-white hover:text-gray-300 transition-colors">
    {icon}
  </span>
);

const FooterLink = ({ text }) => (
  <li>
    <a href="#" className="hover:text-white transition-colors">
      {text}
    </a>
  </li>
);

export default Footer;