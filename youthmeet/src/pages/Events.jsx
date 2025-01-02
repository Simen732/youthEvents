import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EventBox from "../components/EventBox/EventBox";
import EventSearch from "../components/EventSearch/EventSearch";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const navigate = useNavigate();

  
  
  // Fetch all events once on component mount
  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/events/`, { credentials: 'include' })
    .then(response => response.json())
    .then(data => {
      setEvents(data);
      setFilteredEvents(data); // Initialize filtered events
    })
    .catch(error => console.error('Error fetching events:', error));
  }, []);

  const handleDelete = (eventId) => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/events/${eventId}`, {
      method: 'DELETE',
      credentials: 'include'
    })
      .then(response => {
        if (response.ok) {
          // Remove the event from both events and filteredEvents
          setEvents(prevEvents => prevEvents.filter(event => event.idevent !== eventId));
          setFilteredEvents(prevEvents => prevEvents.filter(event => event.idevent !== eventId));
        } else {
          console.error('Failed to delete event');
        }
      })
      .catch(error => console.error('Error deleting event:', error));
  };

  // Function to filter events based on search criteria
  const handleFilter = ({ eventName, date, tag }) => {
    const filtered = events.filter(event => {
        const nameMatch = event.eventName.toLowerCase().includes(eventName.toLowerCase());
        const dateMatch = !date || new Date(event.eventDate).toDateString() === new Date(date).toDateString();
        const tagMatch = !tag || (event.tags && event.tags.toLowerCase().includes(tag.toLowerCase())); // Check if event's tag includes the input tag (case insensitive)
        return nameMatch && dateMatch && tagMatch;
    });
    setFilteredEvents(filtered);
};






  return (
    <div className="flex items-center flex-col my-12 pt-16">
      <h1 className="text-8xl font-oranienbaum">Events</h1>
      <EventSearch onFilter={handleFilter} />
      <div className="w-5/6 sm:mx-4 grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {filteredEvents.map(event => (
          <EventBox
            key={event.idevent}
            event={event}
            onJoin={() => navigate(`/event/${event.idevent}`)}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}
