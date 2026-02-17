import React from 'react';
import { motion } from 'framer-motion';
import { Map, CarTaxiFront, School, ChevronRight } from 'lucide-react';
import { About, Faq } from '../components';

const statsData = [
  {
    id: 1,
    number: "928 +",
    label: "Travel Destination",
    icon: <Map strokeWidth={1} className="w-7 h-7 text-white" />,
  },
  {
    id: 2,
    number: "1,020 +",
    label: "Tour Partner",
    icon: <CarTaxiFront strokeWidth={1} className="w-7 h-7 text-white" />,
  },
  {
    id: 3,
    number: "540 +",
    label: "Hotel & Accomodation",
    icon: <School strokeWidth={1} className="w-7 h-7 text-white" />,
  },
];

const AboutPage = () => {
  // Animation variants for staggered reveal
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (

    <>
      <article>
        <title>Best Travel Agency in Kerala | Tours and Travels in Kerala | TripScribe</title>
        <meta name="description" content="Looking for the Best Travel Agency in Kerala? Experience professional Tours and Travels in Kerala with TripScribe, where every journey is carefully planned for comfort, value, and unforgettable memories." />
        <link rel="canonical" href="https://www.tripscribe.in/about" />
      </article>

      <div className="relative w-full h-[65vh] overflow-hidden">
        {/* --- Background Image --- */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1504730655501-24c39ac53f0e?q=80&w=2070&auto=format&fit=crop"
            alt="Traveler looking at ancient temples"
            className="w-full h-full object-cover"
            loading='lazy'
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
            className="w-fit pt-40"
          >
            <div className="inline-flex uppercase items-center gap-3 px-5 py-2 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 text-white text-xs tracking-wider transition-colors hover:bg-white/30 cursor-pointer">
              <span>Home</span>
              <div className="w-[1px] h-3 bg-gray-300"></div>
              <span>About</span>
            </div>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 text-4xl md:text-6xl font-messiri font-medium text-white leading-[1.1] max-w-4xl"
          >
            Your Gateway to <br />
            Extraordinary Travel <br />
            Experiences.
          </motion.h1>
        </div>
      </div>

      <div className="w-full bg-white pt-20 py-16  overflow-hidden ">
        <motion.div
          className="w-11/12 mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* --- Header Section --- */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-messiri font-bold text-gray-900 mb-3 leading-tight">
              We Are The Most Popular <br className="hidden md:block" />
              Travel & Tour Company
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto text-base">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
              ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis
              dis parturient montes, nascetur ridiculus mus.
            </p>
          </motion.div>

          {/* --- Stats Cards --- */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-10 mb-10">
            {statsData.map((stat) => (
              <motion.div
                key={stat.id}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="flex items-center p-5 py-7 bg-white border border-gray-100 rounded-[20px] shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="flex-shrink-0 w-16 h-16 bg-black rounded-full flex items-center justify-center mr-6">
                  {stat.icon}
                </div>
                <div className="flex flex-col">
                  <span className="text-3xl md:text-4xl font-messiri font-bold text-gray-900">
                    {stat.number}
                  </span>
                  <span className="text-gray-400 text-sm md:text-base">
                    {stat.label}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* --- Image Gallery --- */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-auto md:h-[400px]">
            {/* Left Image - Temple */}
            <motion.div
              variants={itemVariants}
              className="lg:col-span-7 h-[300px] md:h-full relative overflow-hidden rounded-[40px] hidden md:block"
            >
              <img
                src="https://images.unsplash.com/photo-1512100356356-de1b84283e18?q=80&w=1975&auto=format&fit=crop"
                alt="Woman at temple in Bali"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </motion.div>

            {/* Right Image - Scooter */}
            <motion.div
              variants={itemVariants}
              className="lg:col-span-5 h-[300px] md:h-full relative overflow-hidden rounded-[40px]"
            >
              <img
                src="https://images.unsplash.com/photo-1555400038-63f5ba517a47?q=80&w=2070&auto=format&fit=crop"
                alt="Woman on scooter with surfboard"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
      <Faq />
      <About />
    </>
  );
};

export default AboutPage;