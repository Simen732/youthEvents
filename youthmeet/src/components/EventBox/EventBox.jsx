import React from "react";

export default function EventBox() {
    
    const dateTime = "02.11.2024, 14.14";
    const address = "Brendsrudveien 22, 1383 Asker";
    const interested = 49;
    const price = "0";

    const getDisplayPrice = () => {
        return price > 0 ? `${price}kr` : "FREE";
    };

    const displayPrice = getDisplayPrice();
    
    return (

    <div className="flex justify-center flex-col rounded-3xl overflow-hidden shadow-xl">

        <div className="relative">
            <img className="w-full shadow-lg " src="https://placehold.co/600x300" alt="Event" />
            <div className="absolute bottom-0 right-0 transform translate-y-1/2 w-[120px] h-12 bg-primary flex justify-center items-center rounded-l-full text-white">
                <p className="font-poppins text-2xl">{displayPrice}</p>
            </div>
        </div>
        
        <h2 className="text-5xl font-oranienbaum p-4">DnD Meeting</h2>
        <div className="p-3">
            <div className="flex p-2 font-lato">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                </svg>
                <p className="pl-2 text-xl">{dateTime}</p>
            </div>
            <div className="flex p-2 font-lato">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
                <p className="pl-2 text-xl">{address}</p>
            </div>
            <div className="flex p-2 font-lato">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                </svg>
                <p className="pl-2 text-xl">{interested}</p>
            </div>
        </div>
        <button className="p-2 m-2 mb-8 bg-primary self-center rounded-xl w-3/5 text-2xl font-lato">Join Event</button>
    </div>
    
    )
}