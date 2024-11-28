import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function LandingPage() {
  const [isHighResLoaded, setHighResLoaded] = useState(false);

  useEffect(() => {
    const highResImage = new Image();
    highResImage.src = '/img/peopleTogether.webp';
    highResImage.onload = () => {
      setHighResLoaded(true);
    };
  }, []);

  return (
    <div className={`${isHighResLoaded ? 'main-bg' : 'lowres-main-bg'} flex flex-col justify-center items-center h-screen relative overflow-hidden`}>
      <div className="absolute inset-0 bg-black opacity-50 z-0"></div>
      
      <motion.h1 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="m-8 max-sm:text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-oranienbaum z-10 text-white text-center leading-tight"
      >
        Find events <br/> near you
      </motion.h1>
      
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        className="z-10"
      >
        <a 
          className="inline-block m-8 bg-primary px-12 py-4 rounded-full text-2xl font-poppins text-white shadow-lg transition duration-300 ease-in-out hover:bg-primary hover:brightness-110 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
          href="/events"
        >
          Discover Events
        </a>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="absolute bottom-8 z-10 text-white text-center"
      >
        <p className="font-lato mb-2">Scroll to explore</p>
        <svg className="w-6 h-6 mx-auto animate-bounce" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </motion.div>
    </div>
  );
}