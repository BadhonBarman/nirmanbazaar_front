import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  document.title = "Page Not Found!";

  return (
    <div className="flex items-center justify-center mt-16">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-gray-800">404</h1>
        <p className="text-2xl font-medium text-gray-600 mt-4">
          Oops! The page you're looking for doesn't exist.
        </p>
        <p className="text-gray-500 mt-2">
          It seems you may have taken a wrong turn. Let's get you back on track.
        </p>
        <Link to="/" className="mt-6 inline-block px-6 py-3 primary_bg text-white font-medium rounded-md hover:bg-green-400 transition">
          Back to Homepage
        </Link>
      </div>
    </div>
  );
}
