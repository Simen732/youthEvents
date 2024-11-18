import MapFrame from "../components/MapFrame/MapFrame";

export default function OpenEvent() {
    const host = "Lukasz Brzozowski";
    const dateTime = "02.11.2024, 14.14";
    const address = "Brendsrudveien 22, 1383 Asker";
    const interested = 49;
    const price = 0;
    const tags = ["Board Games", "Friends", "Dice", "Friends", "Dice", "Friends", "Dice", "Friends", "Dice"];
  
    const getDisplayPrice = () => (price > 0 ? `${price}kr` : "FREE");
  
    return (
      <div className="flex flex-col justify-center items-center z-40 shadow-xl">
        <div className="mt-16 flex flex-col md:flex-row items-center md:items-start justify-center overflow-hidden  flex-wrap p-4">
          
          <div className="flex flex-col md:items-start md:mr-8">
            <img className="shadow-lg mb-4 md:mb-0 md:max-w-sm" src="https://placehold.co/600x300" alt="Event" />
            <h1 className="font-oranienbaum text-5xl sm:text-6xl py-4 text-center md:text-left">DnD Meeting</h1>
          </div>
          <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Event Location</h1>
            <MapFrame address={address} />
          </div>
    
          <div className="flex flex-col p-3">
            <div className="flex items-center p-2 font-lato">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
              </svg>
              <p className="pl-2 text-xl">{host}</p>
            </div>

            <div className="flex items-center p-2 font-lato">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
              </svg>
              <p className="pl-2 text-xl">{dateTime}</p>
            </div>

            <div className="flex items-center p-2 font-lato">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
              </svg>
              <p className="pl-2 text-xl">{address}</p>
            </div>

            <div className="flex items-center p-2 font-lato">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
              </svg>
              <p className="pl-2 text-xl">{interested}</p>
            </div>

            <div className="flex items-center p-2 font-lato">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6Z" />
              </svg>
              <p className="pl-2 text-lg w-5/6">{tags.join(" | ")}</p>
            </div>
          </div>
        </div>
        <button className="p-2 md:mt-0 bg-primary rounded-xl md:w-auto text-2xl font-lato mb-8 shadow-lg">Join Event | {getDisplayPrice()}</button>
        
      </div>
      
    );
  }