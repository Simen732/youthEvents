import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import MapFrame from "../components/MapFrame/MapFrame";

export default function OpenEvent() {
  const { idevent } = useParams(); // Get event ID from URL
  const [eventData, setEventData] = useState(null);

  useEffect(() => {
    // Fetch event data from backend using ID
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

  const { host, title, dateTime, address, interested, price, tags, description } = eventData;

  return (
    <div className="container mx-auto mt-16 p-4 max-w-6xl mb-24 font-lato">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Image and Title */}
        <div className="lg:col-span-2">
          <img
            className="w-full h-64 object-cover rounded-lg shadow-lg mb-4"
            src={eventData.image || "https://placehold.co/600x300"}
            alt="Event"
          />
          <h1 className="font-oranienbaum text-4xl sm:text-5xl font-bold mb-4">{title}</h1>
        </div>

        {/* Event Details */}
        <div className="relative h-screen">
          <div className="order-first lg:order-none sticky top-5 max-h-[calc(100vh-40px)] overflow-y-auto">
            <div className="bg-gray-100 p-6 rounded-lg shadow-lg mb-8">
              <h2 className="font-oranienbaum font-bold text-2xl mb-4">Event Details</h2>
              <p><strong>Host:</strong> {host}</p>
              <p><strong>Date & Time:</strong> {dateTime}</p>
              <p><strong>Address:</strong> {address}</p>
              <p><strong>Interested:</strong> {interested} people</p>
              <p><strong>Tags:</strong> {tags.join(", ")}</p>
              <p><strong>Price:</strong> {price > 0 ? `${price}kr` : "FREE"}</p>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="lg:col-span-2">
          <div className="bg-gray-100 p-6 rounded-lg shadow-lg mb-8">
            <h2 className="font-oranienbaum font-bold text-2xl mb-4">Event Description</h2>
            <p>{description}</p>
          </div>
        </div>

        {/* Map */}
        <div className="lg:col-span-3">
          <h2 className="font-oranienbaum font-bold text-2xl mb-4">Event Location</h2>
          <MapFrame address={address} />
        </div>
      </div>
    </div>
  );
}


function DetailItem({ icon, text }) {
    const iconMap = {
        user: (
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
        ),
        calendar: (
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
        ),
        location: (
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
        ),
        users: (
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
        ),
        tag: (
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z M6 6h.008v.008H6V6z" />
        ),
        currency: (
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        ),
    };

    return (
        <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-600 mr-2">
                {iconMap[icon]}
            </svg>
            <p className="text-gray-800">{text}</p>
        </div>
    );
}