import React, { useState } from 'react';

export default function UserEvents() {
  const [events, setEvents] = useState([
    { id: 1, title: 'Tech Conference 2025', date: '2025-03-15'},
    { id: 2, title: 'Charity Gala', date: '2025-05-20'},
    { id: 3, title: 'Summer Music Festival', date: '2025-07-10'},
  ]);

  const deleteEvent = (id) => {
    setEvents(events.filter(event => event.id !== id));
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
            {events.map(event => (
              <EventCard 
                key={event.id} 
                event={event} 
                onDelete={deleteEvent} 
              />
            ))}
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

const EventCard = ({ event, onEdit, onDelete}) => (
  <div className="bg-gray-50 rounded-lg p-4 flex justify-between items-center">
    <div>
      <h3 className="text-lg font-semibold">{event.title}</h3>
      <p className="text-sm text-gray-600">Date: {event.date}</p>
    </div>
    <div className="space-x-2">
      <button 
        onClick={() => onEdit(event.id)}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600 transition duration-300"
      >
        Edit
      </button>
      <button 
        onClick={() => onDelete(event.id)}
        className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-600 transition duration-300"
      >
        Delete
      </button>
    </div>
  </div>
);