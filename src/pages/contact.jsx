import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import {
  FaInstagram,
} from "react-icons/fa";

let SocailsLink = [
  {
    icon: <FaInstagram />,
    links: `https://www.instagram.com/tripscribe.in?igsh=MW5tYnM5eTQyeWltZQ==`,
  },
];

const Contact = () => {
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
    const phoneNumber = "8138099941";
    const text = `*New Inquiry from Tripscribe Website*%0a%0a*Name:* ${formData.name}%0a*Email:* ${formData.email}%0a*Message:* ${formData.message}`;

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
    <section className="w-full bg-white">
      <div className="relative w-full h-[40vh] xl:h-[65vh] overflow-hidden">
        {/* --- Background Image --- */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1504730655501-24c39ac53f0e?q=50&w=2070&auto=format&fit=crop"
            alt="Traveler looking at ancient temples"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          {/* Dark Overlay for Text Readability */}
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* --- Content Container --- */}
        <div className="relative z-10 w-11/12 mx-auto h-full  flex flex-col justify-center">
          {/* Breadcrumb / Tag */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-fit pt-20 xl:pt-40"
          >
            <div className="inline-flex uppercase items-center gap-3 px-5 py-2 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 text-white text-[10px] md:text-xs tracking-wider transition-colors hover:bg-white/30 cursor-pointer">
              <span>Home</span>
              <div className="w-[1px] h-3 bg-gray-300"></div>
              <span>Contact</span>
            </div>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 text-3xl md:text-6xl font-messiri font-medium text-white leading-[1.1] max-w-4xl"
          >
            Contact Us & Get<br /> Special Promo
          </motion.h1>
        </div>
      </div>
      {/* --- Top Text Section --- */}
      <div className="w-10/12 mx-auto py-10 xl:py-16">
        <div className="flex flex-col md:flex-row justify-start items-start xl:items-end gap-5 md:gap-20">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-messiri font-medium text-gray-900 shrink-0"
          >
            Get Closer With Us
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 text-base leading-relaxed"
          >
            Have questions about destinations, packages, or reservations? Contact
            our travel experts and let us help you create the perfect travel
            experience tailored to your needs.
          </motion.p>
        </div>
      </div>

      {/* --- Map & Form Section --- */}
      <div className="w-[95%] xl:w-10/12 pb-10 xl:pb-16 mx-auto relative flex items-center justify-center">
        {/* --- Contact Card --- */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative z-10 w-full bg-[#0A0500] rounded-[30px] p-8 md:p-12 lg:p-16 overflow-hidden shadow-2xl"
        >
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
            {/* Left Column: Contact Info */}
            <div className="flex-1 lg:border-r border-white/10 lg:pr-12 flex flex-col justify-between">
              <div className="space-y-6">
                {/* Address */}
                <div>
                  <h4 className="text-xs tracking-widest text-white/60 uppercase font-sans mb-3">
                    Office Address
                  </h4>
                  <p className=" md:text-2xl text-white font-messiri leading-snug">
                    1st Floor, Ramaswami Complex,<br />
                    Cherooty Rd, Behind Basics,<br />
                    Kozhikode, Kerala, India - 673001
                  </p>
                </div>

                {/* Phone */}
                <div>
                  <h4 className="text-xs tracking-widest text-white/60 uppercase font-sans mb-3">
                    Office Phone Number
                  </h4>
                  <a
                    href="tel:7994055541"
                    className="hover:underline  md:text-2xl text-white font-messiri"
                  >
                    +91 7994055541
                  </a>
                </div>

                {/* Email */}
                <div>
                  <h4 className="text-xs tracking-widest text-white/60 uppercase font-sans mb-3">
                    Email Address
                  </h4>
                  <a
                    href="mailto:marketing@tripscribe.in"
                    className="hover:underline  md:text-2xl text-white font-messiri"
                  >
                    marketing@tripscribe.in
                  </a>
                </div>
              </div>

              {/* Social Media */}
              <div className="mt-5 xl:mt-12 lg:mt-auto pt-8">
                <h4 className="text-xl md:text-2xl text-white font-messiri mb-6">
                  Follow Our Social Media
                </h4>
                <div className="flex gap-4">
                  {SocailsLink.map((dt, i) => (
                    <a
                      key={i}
                      href={dt.links}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-primary text-white w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-200 hover:text-black transition-transform hover:-translate-y-1 duration-300"
                    >
                      <span className="text-lg">{dt.icon}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Form */}
            <div className="flex-[1.3]">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Name & Email Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs tracking-widest text-white/60 uppercase font-sans">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your Name"
                      className="w-full bg-white/5 border border-white/10 rounded-xl p-3 md:p-4 text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 transition-colors"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs tracking-widest text-white/60 uppercase font-sans">
                      Email Address
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Your Email Address"
                        className="w-full bg-white/5 border border-white/10 rounded-xl p-3 md:p-4 pr-12 text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 transition-colors"
                      />
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 bg-teal-500/20 p-1 rounded">
                        <Mail size={16} className="text-gray-400" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs tracking-widest text-white/60 uppercase font-sans mb-4">
                    Comments / Questions
                  </label>
                  <textarea
                    rows="5"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your Message Here"
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 md:p-4 text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 transition-colors resize-none"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-white text-white hover:text-black transition duration-200 border border-white/10  cursor-pointer font-semibold text-sm tracking-wider uppercase py-4 rounded-xl  active:scale-[0.99] md:mt-4"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;