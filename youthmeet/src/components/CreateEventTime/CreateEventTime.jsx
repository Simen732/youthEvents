import React, { useState, useEffect } from 'react';

export default function CreateEvent() {
  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventDate, setEventDate] = useState(new Date().toISOString().split('T')[0]);
  const [eventTime, setEventTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  const [eventDuration, setEventDuration] = useState(120); // 2 hours
  const [eventLocation, setEventLocation] = useState('');
  const [eventImage, setEventImage] = useState(null);
  const [eventSummary, setEventSummary] = useState('');

  useEffect(() => {
    updateEventSummary();
  }, [eventDate, eventTime, eventDuration]);

  const updateEventSummary = () => {
    if (eventDate && eventTime) {
      const startDateTime = new Date(`${eventDate}T${eventTime}`);
      const endDateTime = new Date(startDateTime.getTime() + eventDuration * 60000);

      const formattedDate = startDateTime.toLocaleDateString();
      const formattedStartTime = startDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const formattedEndTime = endDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      setEventSummary(`This event will take place on ${formattedDate} from ${formattedStartTime} to ${formattedEndTime}`);
    }
  };

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
  };

  const handleIncrement = () => {
    setEventDuration(prev => Math.min(prev + 15, 1440)); // Max 24 hours
  };

  const handleDecrement = () => {
    setEventDuration(prev => Math.max(prev - 15, 0)); // Min 0 hours
  };

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
    formData.append('date', eventDate);
    formData.append('time', eventTime);
    formData.append('duration', formatDuration(eventDuration));
    formData.append('location', eventLocation);
    if (eventImage) {
      formData.append('image', eventImage);
    }

    try {
      // Send data to backend
      const response = await fetch('http://localhost:4000/api/events', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('Event created successfully!');
        // Reset the form or redirect as needed
      } else {
        alert('Failed to create event.');
      }
    } catch (error) {
      console.error('Error creating event:', error);
      alert('An error occurred while creating the event.');
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold text-orange-500 mb-4">Create Event</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Event Name</label>
          <input
            type="text"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
            placeholder="Enter event name"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Event Description</label>
          <textarea
            className="min-h-10 mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
            placeholder="Enter event description"
            value={eventDescription}
            onChange={(e) => setEventDescription(e.target.value)}
          />
        </div>

        <div className="flex space-x-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Date</label>
            <input
              type="date"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Time</label>
            <input
              type="time"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
              value={eventTime}
              onChange={(e) => setEventTime(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Duration</label>
            <div className="flex items-center mt-1">
              <button type="button" onClick={handleDecrement} className="px-2 py-1 border rounded-l bg-orange-500 text-white">−</button>
              <input
                type="text"
                value={formatDuration(eventDuration)}
                readOnly
                className="w-full text-center border-t border-b px-3 py-2"
              />
              <button type="button" onClick={handleIncrement} className="px-2 py-1 border rounded-r bg-orange-500 text-white">+</button>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Location</label>
          <input
            type="text"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
            placeholder="Input location"
            value={eventLocation}
            onChange={(e) => setEventLocation(e.target.value)}
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

        {eventSummary && (
          <p className="text-sm text-gray-600">{eventSummary}</p>
        )}

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