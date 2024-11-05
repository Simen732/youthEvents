export default function LandingPage() {
  return (
    <div className="flex flex-col justify-center items-center bg-[url('/public/img/peopleTogether.webp')] bg-cover bg-center  h-screen"> 
            <h1 className="m-16 max-sm:text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-oranienbaum z-50 text-black">Find events near you</h1>
        <button className="m-16 bg-primary px-24 py-4 rounded-xl text-2xl">Discover events</button>
    </div>
  );
}