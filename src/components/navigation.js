import React from 'react';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const Navigation = () => {
  return (
    <div className="bg-gray-800 h-screen w-64 fixed left-0 top-0 overflow-y-auto">
      <div className="p-4">
        <h1 className="text-white text-lg font-semibold">Admin Panel</h1>
      </div>
      <nav>
        <ul className="space-y-2">
          <li>
            <a href="/designertasks" className="block p-4 text-gray-300 hover:bg-gray-700">Designers</a>
          </li>
          <li>
            <a href="#" className="block p-4 text-gray-300 hover:bg-gray-700">Pages</a>
          </li>
          <li>
            <a href="#" className="block p-4 text-gray-300 hover:bg-gray-700">Add User</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navigation;
