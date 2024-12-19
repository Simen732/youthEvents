import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function UserEvents() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user's events
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/user/events`, { credentials: 'include' })
      .then(response => response.json())
      .then(data => setEvents(data))
      .catch(error => console.error('Error fetching events:', error));
  }, []);

  const handleDelete = (eventId) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/api/events/${eventId}`, {
        method: 'DELETE',
        credentials: 'include'
      })
        .then(response => {
          if (response.ok) {
            setEvents(prevEvents => prevEvents.filter(event => event.idevent !== eventId));
          } else {
            console.error('Failed to delete event');
          }
        })
        .catch(error => console.error('Error deleting event:', error));
    }
  };

  const handleEdit = (eventId) => {
    // Navigate to the create event page with the event ID
    navigate(`/create-event/${eventId}`);
  };

  return (
    <div className="bg-gray-100 min-h-screen font-lato mt-16">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-oranienbaum text-primary">My Events</h1>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
    <Section title="Manage Your Events">
      {Array.isArray(events) && events.length > 0 ? (
        events.map(event => (
          <EventCard 
            key={event.idevent} 
            event={event} 
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ))
      ) : (
        <p>No events found.</p> // Handle case where there are no events
      )}
    </Section>
  </div>
      </main>
    </div>
  );
}

const Section = ({ title, children }) => (
  <section className="bg-white shadow rounded-lg">
    <div className="px-6 py-5">
      <h2 className="text-2xl font-poppins text-primary mb-4">{title}</h2>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  </section>
);

const EventCard = ({ event, onEdit, onDelete }) => (
  <div className="bg-gray-50 rounded-lg p-4 flex justify-between items-center">
    <div>
      <h3 className="text-lg font-semibold">{event.eventName}</h3>
      <p className="text-sm text-gray-600">Date: {new Date(event.eventDate).toLocaleDateString()}</p>
    </div>
    <div className="space-x-2">
      <button 
        onClick={() => onEdit(event.idevent)}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600 transition duration-300"
      >
        Edit
      </button>
      <button 
        onClick={() => onDelete(event.idevent)}
        className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-600 transition duration-300"
      >
        Delete
      </button>
    </div>
  </div>
);
