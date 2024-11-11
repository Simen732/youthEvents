import { useEffect, useState } from "react";

export default function LandingPage() {
  const [isHighResLoaded, setHighResLoaded] = useState(false);

  useEffect(() => {
    const highResImage = new Image();
    highResImage.src = '/img/peopleTogether.webp'; // High-res image URL, without the /public prefix
    highResImage.onload = () => {
      setHighResLoaded(true); // Update state when high-res image is loaded
    };
  }, []);

  return (
    <div className={`${isHighResLoaded ? 'main-bg' : 'lowres-main-bg'} flex flex-col justify-center items-center h-screen`}>
      <h1 className="m-16 max-sm:text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-oranienbaum z-10 text-white">Find events near you</h1>
      <a className=" max-sm:px-8 m-16 bg-primary px-24 py-4 rounded-xl text-2xl duration-200 ease-in-out hover:bg-primary hover:brightness-110 z-10" href="/events">Discover events</a>
    </div>
  );
}