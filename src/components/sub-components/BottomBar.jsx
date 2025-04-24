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


        {/* All Shop Icon */}
        <Link to={'/all-shops/'} className="flex flex-col items-center">
          <svg className="h-6 w-6 fill-gray-500 hover:fill-blue-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M36.8 192l566.3 0c20.3 0 36.8-16.5 36.8-36.8c0-7.3-2.2-14.4-6.2-20.4L558.2 21.4C549.3 8 534.4 0 518.3 0L121.7 0c-16 0-31 8-39.9 21.4L6.2 134.7c-4 6.1-6.2 13.2-6.2 20.4C0 175.5 16.5 192 36.8 192zM64 224l0 160 0 80c0 26.5 21.5 48 48 48l224 0c26.5 0 48-21.5 48-48l0-80 0-160-64 0 0 160-192 0 0-160-64 0zm448 0l0 256c0 17.7 14.3 32 32 32s32-14.3 32-32l0-256-64 0z"/></svg>
          <span className="text-xs text-gray-500">All Shop</span>
        </Link>

        {/* All Brand Icon */}
        <Link to={'/all-brands/'} className="flex flex-col items-center">
          <svg className="h-6 w-6 fill-gray-500 hover:fill-blue-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M248 0L208 0c-26.5 0-48 21.5-48 48l0 112c0 35.3 28.7 64 64 64l128 0c35.3 0 64-28.7 64-64l0-112c0-26.5-21.5-48-48-48L328 0l0 80c0 8.8-7.2 16-16 16l-48 0c-8.8 0-16-7.2-16-16l0-80zM64 256c-35.3 0-64 28.7-64 64L0 448c0 35.3 28.7 64 64 64l160 0c35.3 0 64-28.7 64-64l0-128c0-35.3-28.7-64-64-64l-40 0 0 80c0 8.8-7.2 16-16 16l-48 0c-8.8 0-16-7.2-16-16l0-80-40 0zM352 512l160 0c35.3 0 64-28.7 64-64l0-128c0-35.3-28.7-64-64-64l-40 0 0 80c0 8.8-7.2 16-16 16l-48 0c-8.8 0-16-7.2-16-16l0-80-40 0c-15 0-28.8 5.1-39.7 13.8c4.9 10.4 7.7 22 7.7 34.2l0 160c0 12.2-2.8 23.8-7.7 34.2C323.2 506.9 337 512 352 512z"/></svg>
          <span className="text-xs text-gray-500">All Brand</span>
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
