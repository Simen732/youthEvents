export default function LandingPage() {
  return (
    <div className="main-bg flex flex-col justify-center items-center h-screen"> 
      <h1 className="m-16 max-sm:text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-oranienbaum z-10 text-white">Find events near you</h1>
      <a className="m-16 bg-primary px-24 py-4 rounded-xl text-2xl duration-100 hover:bg-primary hover:brightness-110 z-10" href="/events">Discover events</a>
    </div>
  );
}