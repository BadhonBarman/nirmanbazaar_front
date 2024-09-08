import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { loginSuccess, logout } from '../features/authSlice';

export default function Login() {

    const base_domain = import.meta.env.VITE_APP_SOURCE_DOMAIN;
  
  // Initialize userData with expected fields
  const [userData, setUserData] = useState({
    name: '',
    phone: '',
    password: '',
  });
  
  const dispatch = useDispatch();

  function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = `${name}=${value || ""}${expires}; path=/; SameSite=Strict; Secure`;
  }

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${base_domain}/customer_login/`, {
        userData: userData,
      });
      
      if (response.status === 201){
        console.log('Registration successful:', response.data);

        setCookie('sessionid', response.data.sessionid, 7);

        toast.success('Login successful!');
        
        // Dispatch the loginSuccess action with the user data
        dispatch(loginSuccess(response.data.data));

        console.log(response.data.data);
      }
      // Handle success (e.g., redirect user, store token)
    } catch (error) {
      console.error('Login failed:', error.response); // Log the error response
      dispatch(logout());

      // Show error message in toast
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error('Login failed. Please try again later.');
      }
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setUserData((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
  };




  return (
    <>
    

        <div className="max-w-md mx-auto border px-4 py-8 rounded mt-32">
            <div className='mb-8'>
                <h4 className='text-2xl font-bold'>Sign in to Ecomus</h4>
                <p>Welcome back ! Enter your Phone to get started.</p>
            </div>
            
      <form onSubmit={handleLoginSubmit}>
        <div className="mb-3">
            <input type="tel" onChange={handleChange} id="phone" className="bg-gray-50 border py-2.5 border-gray-300 text-gray-900 text-md rounded-md focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="Phone" required />
        </div>
        <div className="mb-3">
            <input type="password" placeholder='Password' id="password" onChange={handleChange} className="bg-gray-50 py-2.5 border border-gray-300 text-gray-900 text-md rounded-md focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" required />
        </div>
        
        <button type="submit" className="text-white primary_bg  font-semibold rounded-lg text-sm w-full px-5 py-2.5 mt-2.5 text-center">Sign In</button>

        <p className='mt-4 text-sm'>Don't have an account? <Link to={'/register'} className='primary_txt font-semibold'>Sign Up</Link></p>
        </form>
        </div>
        
    </>
  )
}
