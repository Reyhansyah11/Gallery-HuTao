import React, { useState } from 'react';
import GalleryPage from './partials/GalleryPage';
import UserPage from './partials/UserPage';

const AdminDashboard = () => {
  const [activePage, setActivePage] = useState('gallery'); // State untuk halaman aktif

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      {/* Breadcrumb */}
      <nav className="mb-4">
        <ul className="flex space-x-4 text-blue-500">
          <li>
            <button
              className={`hover:underline ${activePage === 'gallery' ? 'font-bold text-blue-700' : ''}`}
              onClick={() => setActivePage('gallery')}
            >
              Gallery
            </button>
          </li>
          <li>|</li>
          <li>
            <button
              className={`hover:underline ${activePage === 'user' ? 'font-bold text-blue-700' : ''}`}
              onClick={() => setActivePage('user')}
            >
              User
            </button>
          </li>
        </ul>
      </nav>

      {/* Halaman Aktif */}
      <div>
        {activePage === 'gallery' && <GalleryPage />}
        {activePage === 'user' && <UserPage />}
      </div>
    </div>
  );
};

export default AdminDashboard;
