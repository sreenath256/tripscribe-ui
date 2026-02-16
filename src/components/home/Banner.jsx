import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FiArrowRight,
  FiUser,
  FiSend,
} from "react-icons/fi";
import { IoMailUnreadOutline } from "react-icons/io5";
import { MdOutlineMarkChatUnread } from "react-icons/md";
import { Link } from "react-router-dom";

const Banner = () => {
  // Background images array
  const images = [
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=50&w=2070&auto=format&fit=crop", // Mountains
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=50&w=2070&auto=format&fit=crop", // Hills
    "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=50&w=2070&auto=format&fit=crop", // Valley
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Cycle through images every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative min-h-screen md:h-screen w-full overflow-hidden bg-gray-900 text-white font-sans">
      {/* --- BACKGROUND LAYER (Ken Burns Effect) --- */}
      <div className="absolute inset-0 z-0">
        {images.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-[1500ms] ease-in-out ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={img}
              alt={`Slide ${index}`}
              className={`h-full w-full object-cover transform transition-transform duration-[10000ms] ease-linear ${
                index === currentIndex ? "scale-125" : "scale-100"
              }`}
            />
            {/* Dark Overlay for text readability */}
            <div className="absolute inset-0 bg-black/30" />
          </div>
        ))}
      </div>

      {/* --- CONTENT LAYER --- */}
      <div className="relative py-10 pt-40 md:pt-0 md:py-0 z-10 w-11/12 mx-auto h-full ">
        {/* LAYOUT FIX: Used Grid to separate Left (Text) and Right (Form) */}
        <div className="grid grid-cols-1 md:grid-cols-2 h-full items-center">
          
          {/* 1. Left Content Area */}
          <div className="flex flex-col justify-center space-y-5 pr-0 lg:pr-10">
            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="font-messiri text-5xl xl:text-7xl leading-none"
            >
              Best Travel<br /> Agency in Kerala
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Looking for the best travel agency in Kerala to plan your journey
              with ease and confidence? TripScribe ensures every detail is
              managed professionally, delivering smooth, well-organized travel
              experiences from start to finish.
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <Link
                to={"/contact"}
                className="w-fit group flex items-center gap-3 rounded-full bg-primary hover:bg-white text-white hover:text-black transition duration-200 px-8 py-4 "
              >
                <span className="text-xs tracking-widest">GET STARTED</span>
                <FiArrowRight
                  size={15}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            </motion.div>
          </div>

          {/* 2. Right Side: Glass Contact Form */}
          <div className="mt-10 md:mt-0 flex justify-center items-center h-full">
            <GlassContactForm />
          </div>
        </div>
      </div>
    </div>
  );
};

const GlassContactForm = () => {
  // 1. State for form inputs
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // 2. Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 3. Handle Form Submission (WhatsApp Integration)
  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill in all fields before sending.");
      return;
    }

    // Format the message
    // %0a creates a new line in WhatsApp
    const phoneNumber = "8137099941";
    const text = `*New Inquiry from tripscribe Website*%0a%0a*Name:* ${formData.name}%0a*Email:* ${formData.email}%0a*Message:* ${formData.message}`;

    // Create the WhatsApp URL
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${text}`;

    // Open WhatsApp in a new tab
    window.open(whatsappUrl, "_blank");

    // 🔄 Reset form
  setFormData({
    name: "",
    email: "",
    message: "",
  });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="w-full max-w-md font-Quicksand p-8 xl:p-10 xl:py-16 rounded-3xl border border-white/20 bg-white/20 backdrop-blur-[6px] shadow-2xl relative overflow-hidden"
    >
      {/* Decorative gradient blob inside the glass card */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-500/30 rounded-full blur-3xl pointer-events-none"></div>

      <h3 className="text-4xl font-messiri mb-2 text-white">Get in Touch</h3>
      <p className="text-gray-200 text-sm md:text-base mb-6">
        Fill out the form below to start your journey.
      </p>

      <form className="space-y-5" onSubmit={handleSubmit}>
        {/* Name Input */}
        <div className="relative group">
          <FiUser className="absolute left-0 top-3 text-gray-300 group-focus-within:text-white transition-colors text-lg" />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="w-full bg-transparent border-b border-white/20 py-3 pl-8 pr-4 text-sm text-white placeholder:text-gray-300 focus:outline-none focus:border-white transition-all"
          />
        </div>

        {/* Email Input */}
        <div className="relative group">
          <IoMailUnreadOutline className="absolute left-0 top-3 text-gray-300 group-focus-within:text-white transition-colors text-lg" />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
            className="w-full bg-transparent border-b border-white/20 py-3 pl-8 pr-4 text-sm text-white placeholder:text-gray-300 focus:outline-none focus:border-white transition-all"
          />
        </div>

        {/* Message Input */}
        <div className="relative group">
          <MdOutlineMarkChatUnread className="absolute left-0 top-3 text-gray-300 group-focus-within:text-white transition-colors text-lg" />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="3"
            placeholder="How can we help?"
            className="w-full bg-transparent border-b border-white/20 py-3 pl-8 pr-4 text-sm text-white placeholder:text-gray-300 focus:outline-none focus:border-white transition-all resize-none"
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full text-sm mt-2 bg-primary hover:bg-white text-white hover:text-black duration-200 py-3 cursor-pointer rounded-full border border-white/30 transition-all transform active:scale-95 shadow-lg flex justify-center items-center gap-2"
        >
          <span>Send Message</span>
          <FiSend />
        </button>
      </form>
    </motion.div>
  );
};

export default Banner;