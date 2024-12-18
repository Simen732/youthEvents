import React from "react";

export default function EventBox({ event, onDelete }) {
    const {
        eventName: title,
        eventDate: dateTime,
        eventLocation: address,
        interested,
        price,
        eventImage: imageUrl,
    } = event;

    const getDisplayPrice = () => {
        return price > 0 ? `${price}kr` : "FREE";
    };

    const displayPrice = getDisplayPrice();

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this event?')) {
            onDelete(event.idevent);
        }
    };
    
    return (
        <div className="bg-white rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl">
            <div className="relative">
                <img 
                    className="w-full h-48 object-cover" 
                    src={imageUrl || "https://placehold.co/600x300"} 
                    alt={title} 
                />
                <div className="absolute top-0 left-0 bg-black bg-opacity-50 text-white px-2 py-1 m-2 rounded text-sm">
                    {new Date(dateTime).toLocaleDateString()}
                </div>
                <div className="absolute bottom-0 right-0 bg-primary text-white px-4 py-2 rounded-tl-lg font-bold">
                    {displayPrice}
                </div>
            </div>
            
            <div className="p-4">
                <h2 className="text-2xl font-oranienbaum font-bold mb-2 truncate">{title}</h2>
                
                <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p>{new Date(dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                    </div>
                    <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <p className="truncate">{address}</p>
                    </div>
                    <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <p>{interested} interested</p>
                    </div>
                </div>
            </div>
            
            <div className="px-4 pb-4">
                <a 
                    href="/openEvent" 
                    className="block w-full bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out text-center"
                >
                    Join Event
                </a>
                <button 
                    onClick={handleDelete}
                    className="block w-1/5 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
                >
                    Delete
                </button>
            </div>
        </div>
    );
}