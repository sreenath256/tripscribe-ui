import React from "react";
import {
  About,
  Banner,
  Blog,
  Country,
  Destination,
  Faq,
  FinePlace,
  Testimonisal,
} from "../components";
import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";

const index = () => {
  return (
    <>
      <article>
        <title>Best Travel Agency in Kerala | Tours and Travels in Kerala | TripScribe</title>
        <meta name="description" content="Looking for the Best Travel Agency in Kerala? Experience professional Tours and Travels in Kerala with TripScribe, where every journey is carefully planned for comfort, value, and unforgettable memories." />
        <meta property="og:title" content="Best Travel Agency in Kerala | Tours and Travels in Kerala | TripScribe" />
        <meta property="og:description" content="Looking for the Best Travel Agency in Kerala? Experience professional Tours and Travels in Kerala with TripScribe, where every journey is carefully planned for comfort, value, and unforgettable memories." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.tripscribe.in" />
        <meta property="og:image" content="https://www.tripscribe.in/images/tripscribe-logo-white.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Best Travel Agency in Kerala | Tours and Travels in Kerala | TripScribe" />
        <meta property="og:site_name" content="TripScribe" />
        <meta property="og:locale" content="en_US" />
      </article>
      <div>
        <Banner />
        <Destination />
        <About />
        <div className="bg-black text-white py-20">
          <div className="w-11/12 mx-auto grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-10">
            <div>
              <h2 className="text-3xl md:text-4xl xl:text-5xl font-messiri">
                Travel Better with the<br /> Best Travel Agency<br /> in Kerala
              </h2>
            </div>
            <div className="flex flex-col gap-5">
              <p>
                {" "}
                Let the best travel agency in Kerala turn your travel plans into a smooth and memorable
                journey. From choosing the right destination to arranging stays, transport, and experiences,
                every detail is handled with care so you can relax and look forward to the adventure ahead.
              </p>
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
            </div>
          </div>

        </div>
        <Country />
        {/* <Testimonisal /> */}
        <FinePlace />
        <Faq />
        <Blog />
      </div>
    </>
  );
};

export default index;
