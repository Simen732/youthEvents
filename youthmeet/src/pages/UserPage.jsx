import React, { useState } from 'react';
import UserSettings from '../components/UserSettings/UserSettings';
import UserEvents from '../components/UserSettings/UserEvents';
import UserStatus from '../components/UserSettings/UserStatus';
import { Navigate } from 'react-router-dom';
import { useUserData } from '../hooks/useUserState';

export default function UserPage() {
  const [activeComponent, setActiveComponent] = useState('settings');

  const { user, loading } = useUserData();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user || !user.authenticated) {
    return <Navigate to="/login" />;
  }

  const renderComponent = () => {
    switch (activeComponent) {
      case 'settings':
        return <UserSettings />;
      case 'events':
        return <UserEvents/>; // Placeholder for Profile component
      case 'status':
        return <UserStatus/>; // Placeholder for Preferences component
      default:
        return <UserSettings />;
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen font-lato mt-16 flex">
      {/* Sidebar */}
      <aside className="bg-white shadow-md w-64">
        <ul className="py-4">
          <li>
            <button
              onClick={() => setActiveComponent('settings')}
              className="block w-full text-left px-4 py-2 hover:bg-gray-200"
            >
              User Settings
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveComponent('events')}
              className="block w-full text-left px-4 py-2 hover:bg-gray-200"
            >
              Events
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveComponent('status')}
              className="block w-full text-left px-4 py-2 hover:bg-gray-200"
            >
              Status
            </button>
          </li>
        </ul>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow p-6">
        {renderComponent()}
      </main>
    </div>
  );
};