import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function UserStatus() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/user/status`, {
                    credentials: 'include'
                });
                if (response.ok) {
                    const userData = await response.json();
                    setUser(userData.authenticated ? userData : null);
                    console.log(response)
                } else {
                    console.error('Failed to fetch user data');
                    setUser(null);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
                setUser(null);
            }
        };
        

        fetchUserData();
    }, []);

    const handleLogout = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/logout`, {
                method: 'POST',
                credentials: 'include'
            });
            if (response.ok) {
                setUser(null);
                navigate('/');
            } else {
                console.error('Logout failed');
            }
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };
    

    return (
        <div className="bg-gray-100 min-h-screen font-lato mt-16">
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl font-oranienbaum text-primary">User Status</h1>
                </div>
            </header>
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <div className="grid grid-cols-1 gap-6">
                    <Section title="User Information">
                        <p className="text-lg"><strong>Status:</strong> {user ? 'Logged In' : 'Not Logged In'}</p>
                        {user && (
                            <>
                                <p className="text-lg"><strong>Username:</strong> {user.username}</p>
                                <p className="text-lg"><strong>Email:</strong> {user.email}</p>
                            </>
                        )}
                    </Section>

                    </div>
                    <div className="mt-6 flex justify-end">
                        <button
                            onClick={handleLogout}
                            className="bg-primary text-white px-8 py-3 rounded-lg text-lg font-poppins hover:brightness-110 transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                        >
                            Log Out
                        </button>
                    </div>
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
