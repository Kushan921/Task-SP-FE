import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const Navigation = () => {
  const location = useLocation();

  return (
    <div className="bg-gray-800 h-screen w-64 fixed left-0 top-0 overflow-y-auto">
      <div className="p-4">
        <h1 className="text-white text-lg font-semibold">Admin Panel</h1>
      </div>
      <nav>
        <ul className="space-y-2">
          <li>
            <Link
              to="/designertasks"
              className={`block p-4 text-gray-300 hover:bg-gray-700 ${location.pathname === '/designertasks' ? 'bg-gray-700' : ''}`}
              aria-label="Designers"
            >
              Designers
            </Link>
          </li>
          <li>
            <Link
              to="/pages"
              className={`block p-4 text-gray-300 hover:bg-gray-700 ${location.pathname === '/pages' ? 'bg-gray-700' : ''}`}
              aria-label="Pages"
            >
              Pages
            </Link>
          </li>
          <li>
            <Link
              to="/adduser"
              className={`block p-4 text-gray-300 hover:bg-gray-700 ${location.pathname === '/adduser' ? 'bg-gray-700' : ''}`}
              aria-label="Add User"
            >
              Add User
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navigation;
