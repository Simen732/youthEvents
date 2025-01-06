import React, { useState, useRef, useEffect } from 'react';

export default function EventSearch({ onFilter }) {
    const [eventName, setEventName] = useState('');
    const [date, setDate] = useState('');
    const [tag, setTag] = useState('');
    const [isExpanded, setIsExpanded] = useState(false);
    const searchButtonRef = useRef(null);

    useEffect(() => {
        const handleKeyDown = (event) => {
          if (event.key === 'Enter') {
            console.log('Enter key pressed');
            handleSearch();
          }
        };
      
        document.addEventListener('keydown', handleKeyDown);
      
        return () => {
          document.removeEventListener('keydown', handleKeyDown);
        };
      }, [eventName, date, tag]); // Add dependencies here
      
      const handleSearch = () => {
        console.log('Search function called');
        console.log('Search params:', { eventName, date, tag });
        onFilter({ eventName, date, tag });
      };

      

    return (
        <div className="w-full flex flex-col items-center justify-center py-12 px-4">
            <input 
                className="font-lato transition border-2 outline-none hover:border-primary focus:border-primary rounded-xl p-2 mt-2 w-full max-w-[900px]" 
                name="eventName" 
                type="text" 
                placeholder="Event" 
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
            />
            <button 
                onClick={() => setIsExpanded(!isExpanded)}
                className="mt-4 bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition"
            >
                {isExpanded ? 'Collapse' : 'Expand'} Search Options
            </button>
            <div className={`w-full max-w-[900px] mt-4 transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
                    <input 
                        className="font-lato transition border-2 outline-none hover:border-primary focus:border-primary rounded-xl p-2 flex-1"  
                        type="date" 
                        name="date" 
                        id="date" 
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                    <input 
                        className="font-lato transition border-2 outline-none hover:border-primary focus:border-primary rounded-xl p-2 flex-1"  
                        type="text" 
                        name="tag" 
                        id="tag" 
                        placeholder="Enter Tag"
                        value={tag}
                        onChange={(e) => setTag(e.target.value)}
                    />
                </div>
            </div>
            <button 
                onClick={handleSearch}
                className="mt-4 bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-dark transition"
                >
                Search
            </button>
        </div>
    );
}
