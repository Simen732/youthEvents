import React, { useState, useRef, useEffect } from 'react';
import UserAvatar from "./UserAvatar/UserAvatar";
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/AuthContext';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const mobileMenuRef = useRef(null);
  const location = useLocation();
  let lastScrollY = window.scrollY;

  const { isAuthenticated, username } = useAuth();

  useEffect(() => {

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(currentScrollY < lastScrollY || currentScrollY < 10);
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuRef.current) {
      mobileMenuRef.current.style.maxHeight = isMenuOpen 
        ? `${mobileMenuRef.current.scrollHeight}px` 
        : '0px';
    }
  }, [isMenuOpen]);

  const navItems = [
    { path: '/events', label: 'Events' },
    { path: '/createEvent', label: 'Create Event' },
    ...(isAuthenticated ? [] : [
      { path: '/login', label: 'Login' },
      { path: '/signUp', label: 'Sign Up' },
    ]),
  ];

  return (
    <nav className={`fixed w-full z-50 top-0 left-0 transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
      <div className="bg-gradient-to-r from-orange-500 to-green-500 bg-opacity-80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <a className="font-oranienbaum text-4xl text-white" href="/">YouthMeet</a>
            </div>
            <div className="hidden md:flex">
              <div className="ml-10 flex items-stretch space-x-4">
                {navItems.map((item, index) => (
                  <a 
                    key={index}
                    href={item.path} 
                    className={`text-white hover:bg-white hover:bg-opacity-20 flex items-center px-3 py-2 rounded-md text-sm font-medium transition duration-300 ${location.pathname === item.path ? 'bg-white bg-opacity-20' : ''}`}
                  >
                    {item.label}
                  </a>
                ))}
                {isAuthenticated && (
                  <a href="/userPage" className="flex items-center overflow-visible ml-4">
                    <UserAvatar name={username} /> {/* Show avatar if authenticated */}
                  </a>
                )}
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setIsMenuOpen(prevState => !prevState)}
                type="button"
                className="bg-white bg-opacity-20 inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-opacity-30 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded={isMenuOpen}
              >
                <span className="sr-only">Toggle main menu</span>
                {isMenuOpen ? (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div 
          ref={mobileMenuRef}
          className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden bg-gradient-to-r from-orange-500 to-green-500 bg-opacity-80 backdrop-blur-md`}
          style={{ maxHeight: '0px' }}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item, index) => (
              <a 
                key={index}
                href={item.path} 
                className={`text-white hover:bg-white hover:bg-opacity-20 block px-3 py-2 rounded-md text-base font-medium ${location.pathname === item.path ? 'bg-white bg-opacity-20' : ''}`}
              >
                {item.label}
              </a>
            ))}
            {isAuthenticated && (
              <a href="/userPage" className="flex items-center px-3 py-2">
                <UserAvatar name={username} /> {/* Show avatar in mobile menu if authenticated */}
                <span className="ml-3 text-white">Profile</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
