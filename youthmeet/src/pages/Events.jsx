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

  // Function to filter events based on search criteria
  const handleFilter = (tags, distance) => {
    const filtered = events.filter(event => {
      const matchesTags = tags.length === 0 || tags.some(tag => event.tags.includes(tag));
      const matchesDistance = event.distance <= distance; // Assuming event has a distance property
      return matchesTags && matchesDistance;
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
            onJoin={() => navigate(`/event/${event.idevent}`)} // Navigate to event page
          />
        ))}
      </div>
    </div>
  );
}
