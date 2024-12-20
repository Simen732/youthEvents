import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import MapFrame from "../components/MapFrame/MapFrame";

export default function OpenEvent() {
  const { idevent } = useParams();
  const [eventData, setEventData] = useState(null);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

  useEffect(() => {
    let lastScrollY = window.scrollY;
  
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsNavbarVisible(currentScrollY < lastScrollY || currentScrollY < 10);
      lastScrollY = currentScrollY;
    };
  
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/events/${idevent}`, { withCredentials: true });
        setEventData(response.data);
      } catch (error) {
        console.error('Error fetching event data:', error);
      }
    };
    fetchEventData();
  }, [idevent]);

  if (!eventData) return <div className='mt-16'>Loading...</div>;

  const { eventImage, eventName, eventDate, eventLocation, interested, price, eventTag, eventDescription, duration } = eventData;
  const displayInterested = interested > 0 ? `${interested} people` : "None";

  

  return (
    <div className="container mx-auto mt-20 p-4 max-w-5xl mb-16 font-lato">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <img
            className="w-full h-64 object-cover rounded-lg shadow-md mb-4"
            src={eventImage || "https://placehold.co/600x300"}
            alt="Event"
          />
          <h1 className="font-oranienbaum text-3xl md:text-4xl font-bold mb-4">{eventName}</h1>
          
          <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-6">
            <h2 className="font-oranienbaum font-bold text-xl mb-3">Event Description</h2>
            <p>
              {eventDescription.length > 200
                ? (showFullDescription
                    ? eventDescription
                    : `${eventDescription.slice(0, 200)}...`)
                : eventDescription}
            </p>
            {eventDescription.length > 200 && (
              <button
                onClick={() => setShowFullDescription(!showFullDescription)}
                className="text-blue-500 mt-2 hover:underline"
              >
                {showFullDescription ? "Show less" : "Show more"}
              </button>
            )}
          </div>

        </div>


        <div className="md:col-span-1">
          {/* Full-height background container */}
          <div className="bg-gray-100 h-full p-4 rounded-lg shadow-md">
            {/* Sticky content inside */}
            <div
              className={`sticky transition-all duration-300 ease-in-out`}
              style={{
                top: isNavbarVisible ? '80px' : '16px',
              }}
            >
              <h2 className="font-oranienbaum font-bold text-xl mb-3">Event Details</h2>
              <DetailItem icon="calendar" text={`Date & Time: ${eventDate}`} />
              <DetailItem icon="clock" text={`Duration: ${duration / 60} hours`} />
              <DetailItem icon="location" text={`Address: ${eventLocation}`} />
              <DetailItem icon="users" text={`Interested: ${displayInterested}`} />
              <DetailItem icon="tag" text={`Tags: ${eventTag}`} />
              <DetailItem icon="currency" text={`Price: ${price > 0 ? `${price}kr` : "FREE"}`} />
            </div>
          </div>
        </div>
        


        <div className="md:col-span-3">
          <MapFrame eventLocation={eventLocation} />
        </div>
      </div>
    </div>
  );
}

function DetailItem({ icon, text }) {
  const iconMap = {
    calendar: <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />,
    clock: <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />,
    location: <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />,
    users: <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />,
    tag: <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z M6 6h.008v.008H6V6z" />,
    currency: <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />,
  };

  return (
    <div className="flex items-center mb-4">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-600 mr-2">
        {iconMap[icon]}
      </svg>
      <p className="text-sm text-gray-800">{text}</p>
    </div>
  );
}
