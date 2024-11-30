import React from 'react'
import { Link } from 'react-router-dom';

export default function BottomBar() {
  return (
    <>
    <div className="fixed bottom-0 z-[99] left-0 right-0 hidden max-lg:block bg-white border-t border-gray-200 shadow-lg">
      <div className="flex justify-around items-center h-16">
        
        {/* Home Icon */}
        <Link to={'/'} className="flex flex-col items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-500 hover:text-blue-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 9.75L12 4.5l9 5.25V20a1.5 1.5 0 01-1.5 1.5h-15A1.5 1.5 0 013 20V9.75z"
            />
          </svg>
          <span className="text-xs text-gray-500">Home</span>
        </Link>

        {/* Category Icon */}
        <Link to={'/all-category/'} className="flex flex-col items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-500 hover:text-blue-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10 6h4v4h-4V6zM4 6h4v4H4V6zM16 6h4v4h-4V6zM4 14h4v4H4v-4zM10 14h4v4h-4v-4zM16 14h4v4h-4v-4z"
            />
          </svg>
          <span className="text-xs text-gray-500">Categories</span>
        </Link>

        {/* Notification Icon */}
        <Link to={'/dashboard/notifications/'} className="flex flex-col items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-500 hover:text-blue-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 17h5l-1.405-1.405C18.343 14.613 18 13.11 18 11.5V9a6 6 0 00-12 0v2.5c0 1.61-.343 3.113-.595 4.095L4 17h5m6 0v1a2 2 0 11-4 0v-1m4 0H9"
            />
          </svg>
          <span className="text-xs text-gray-500">Notifications</span>
        </Link>

        {/* Profile Icon */}
        <Link to={'/dashboard/'} className="flex flex-col items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-500 hover:text-blue-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v1h16v-1c0-2.66-5.33-4-8-4z"
            />
          </svg>
          <span className="text-xs text-gray-500">Profile</span>
        </Link>
      </div>
    </div>
    </>
  )
}
