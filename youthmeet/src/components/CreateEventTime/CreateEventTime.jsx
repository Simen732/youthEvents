// CreateEventTime.js
import React, { useEffect, useState } from 'react';

export default function CreateEventTime({ eventDate, setEventDate, eventTime, setEventTime, eventDuration, setEventDuration }) {
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

  const getMaxDuration = () => {
    const startDateTime = new Date(`${eventDate}T${eventTime}`);
    const endOfDay = new Date(startDateTime);
    endOfDay.setHours(24, 0, 0); // Set to the end of the day at 24:00

    const maxDurationInMinutes = Math.floor((endOfDay - startDateTime) / (1000 * 60)); // Calculate remaining minutes until end of day
    return Math.min(maxDurationInMinutes, 1440); // Ensure it does not exceed 1440 minutes (24 hours)
  };

  const handleIncrement = () => {
    setEventDuration(prev => {
      const maxDuration = getMaxDuration();
      return Math.min(prev + 15, maxDuration); // Max duration based on remaining time
    });
  };

  const handleDecrement = () => {
    setEventDuration(prev => Math.max(prev - 15, 0)); // Min duration of 0 minutes
  };

  const formatDuration = (duration) => {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return `${hours}:${String(minutes).padStart(2, '0')}`; // Display as HH:MM
  };

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-col sm:flex-row sm:space-x-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700">Date</label>
          <input
            type="date"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            min={new Date().toISOString().split('T')[0]} // Prevent past dates
            required
          />
        </div>

        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700">Time</label>
          <input
            type="time"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
            value={eventTime}
            onChange={(e) => {
              // Ensure only valid time inputs are accepted in increments of 15 minutes
              const selectedTime = e.target.value;
              const [hours, minutes] = selectedTime.split(':').map(Number);
              if (minutes % 15 === 0) {
                setEventTime(selectedTime);
              } else {
                // Calculate the nearest valid time in increments of 15 minutes
                const newMinutes = Math.round(minutes / 15) * 15;
                const adjustedHours = newMinutes === 60 ? (hours + 1) % 24 : hours;
                setEventTime(`${String(adjustedHours).padStart(2, '0')}:${String(newMinutes).padStart(2, '0')}`);
              }
            }}
            step={900} // Allow only increments of 15 minutes
            required
          />
        </div>

        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700">Duration</label>
          <div className="flex items-center pt-1">
            <button type="button" onClick={handleDecrement} className="px-2 py-2 bg-white text-primary rounded-l-md focus:outline-none border border-gray-300">−</button>
            <input
              type="text"
              value={formatDuration(eventDuration)}
              readOnly
              className="w-full text-center border-t border-b px-3 py-2 focus:outline-none"
            />
            <button type="button" onClick={handleIncrement} className="px-2 py-2 bg-white text-primary rounded-r-md focus:outline-none border border-gray-300">+</button>
          </div>
        </div>
      </div>

      {eventSummary && (
        <p className="text-sm text-gray-600 mt-4">{eventSummary}</p> // Ensure it's below inputs for mobile friendliness
      )}
    </div>
  );
}