import React, { useEffect, useState } from 'react';
import EventBox from "../components/EventBox/EventBox";
import EventSearch from "../components/EventSearch/EventSearch";

export default function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/api/events', { credentials: 'include' })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setEvents(data))
      .catch(error => console.error('Error fetching events:', error));
  }, []);

  return (
    <div className="flex items-center flex-col my-12 pt-16">
      <h1 className="text-8xl font-oranienbaum">Events</h1>
      <EventSearch />
      <div className="w-5/6 sm:mx-4 grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {events.map(event => (
          <EventBox key={event.idevent} event={event} />
        ))}
      </div>
    </div>
  );
}