import React, { useState } from 'react';
import axios from "axios";
import CreateEventTime from "../components/CreateEventTime/CreateEventTime";
import { useNavigate } from 'react-router-dom';

export default function CreateEvent() {
  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventPrice, setEventPrice] = useState(0);
  const [eventDate, setEventDate] = useState(new Date().toISOString().split('T')[0]);
  const [eventTime, setEventTime] = useState(getCurrentTime());
  const [eventDuration, setEventDuration] = useState(120); // Default duration of 2 hours
  const [eventTag, setEventTag] = useState('')
  const [eventLocation, setEventLocation] = useState('');
  const [eventImage, setEventImage] = useState(null);
  const navigate = useNavigate();

  function getCurrentTime() {
    const now = new Date();
    now.setMinutes(Math.ceil(now.getMinutes() / 15) * 15); // Round up to nearest 15 minutes
    return now.toTimeString().slice(0, 5); // Format as HH:MM
  }

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setEventImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare form data for submission
    const formData = new FormData();
    formData.append('name', eventName);
    formData.append('description', eventDescription);
    formData.append('price', eventPrice);
    formData.append('date', eventDate);
    formData.append('time', eventTime);
    formData.append('duration', eventDuration);
    formData.append('tag', eventTag)
    formData.append('location', eventLocation);
    if (eventImage) {
      formData.append('image', eventImage);
    }

    try {
      // Send data to backend
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/event/createEvent`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true // This line enables sending credentials with the request
      });

      if (response.status === 200) {
        alert('Event created successfully!');
        navigate("/events")
      } else {
        alert('Failed to create event.');
        console.log(response);
      }
    } catch (error) {
      console.error('Error creating event:', error);
      alert('An error occurred while creating the event.');
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg mt-24">
      <h1 className="text-4xl font-oranienbaum text-orange-500 mb-4">Create Event</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Event Name</label>
          <input
            type="text"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
            placeholder="Enter event name"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Event Description</label>
          <textarea
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
            placeholder="Enter event description"
            value={eventDescription}
            onChange={(e) => setEventDescription(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Price</label>
          <input
            type="number"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
            placeholder="0"
            value={eventPrice}
            min="0" // Prevents typing values below 0
            onChange={(e) => {
              const value = Math.max(0, Number(e.target.value)); // Ensures value is not less than 0
              setEventPrice(value);
            }}
          />
        </div>

        {/* Include the CreateEventTime component */}
        <CreateEventTime 
          eventDate={eventDate}
          setEventDate={setEventDate}
          eventTime={eventTime}
          setEventTime={setEventTime}
          eventDuration={eventDuration}
          setEventDuration={setEventDuration}
        />

        <div>
          <label className="block text-sm font-medium text-gray-700">Tag</label>
          <input
            type="text"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
            placeholder="Tag"
            value={eventTag}
            onChange={(e) => setEventTag(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Location</label>
          <input
            type="text"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
            placeholder="Input location"
            value={eventLocation}
            onChange={(e) => setEventLocation(e.target.value)}
            required
          />
        </div>

       

        <div>
          <label className="block text-sm font-medium text-gray-700">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            className="mt-1 block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer focus:outline-none"
            onChange={handleImageChange}
          />
        </div>

        <div className="flex justify-end space-x-4">
          <button type="button" onClick={() => console.log("Cancel")} className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400">
            Cancel
          </button>
          <button type="submit" className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600">
            Create Event
          </button>
        </div>
      </form>
    </div>
  );
}