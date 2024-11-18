import React, { useState, useRef, useEffect } from 'react';
import UserAvatar from "../UserAvatar/UserAvatar";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    if (mobileMenuRef.current) {
      mobileMenuRef.current.style.maxHeight = isMenuOpen 
        ? `${mobileMenuRef.current.scrollHeight}px` 
        : '0px';
    }
  }, [isMenuOpen]);

  return (
    <nav className="fixed w-full z-50 top-0 left-0 bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <a className="font-oranienbaum text-4xl text-white" href="/">YouthMeet</a>
          </div>
          <div className="hidden md:flex">
            <div className="ml-10 flex items-stretch space-x-4">
              {['/events', '/community', '/login', '/signUp'].map((path, index) => (
                <a 
                  key={index}
                  href={path} 
                  className={`text-white hover:bg-pink-600 hover:text-white flex items-center px-3 rounded-md text-sm font-medium ${path === '/signUp' ? 'bg-pink-600 hover:bg-pink-700' : ''}`}
                >
                  {path === '/signUp' ? 'Sign Up' : path.charAt(1).toUpperCase() + path.slice(2)}
                </a>
              ))}
              <a href="/userPage" className="flex items-center overflow-visible">
                <UserAvatar name="Lukasz Brzozowski" />
              </a>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsMenuOpen(prevState => !prevState)}
              type="button"
              className="bg-pink-600 inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-pink-800 focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Toggle main menu</span>
              {isMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
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
        className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 rounded-b-xl`}
        style={{ maxHeight: '0px' }}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {['/events', '/community', '/login', '/signUp'].map((path, index) => (
            <a 
              key={index}
              href={path} 
              className={`text-white hover:bg-pink-600 block px-3 py-2 rounded-md text-base font-medium ${path === '/signUp' ? 'bg-pink-600 hover:bg-pink-700' : ''}`}
            >
              {path === '/signUp' ? 'Sign Up' : path.charAt(1).toUpperCase() + path.slice(2)}
            </a>
          ))}
          <a href="/userPage" className="flex items-center px-3 py-2">
            <UserAvatar name="Lukasz Brzozowski" />
            <span className="ml-3 text-white">Profile</span>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;