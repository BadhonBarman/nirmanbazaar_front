import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { loginSuccess, logout } from '../features/authSlice';

export default function Register() {
  const base_domain = import.meta.env.VITE_APP_SOURCE_DOMAIN;
  document.title = "Create Account";

  const navigate = useNavigate(); 
  // Initialize userData with expected fields
  const [userData, setUserData] = useState({
    name: '',
    phone: '',
    password: '',
    zip_code: '',
    address: '',
    division: 'Dhaka',
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
      const response = await axios.post(`${base_domain}/customer_registration/`, {
        userData: userData,
      });
      
      if (response.status === 201){
        console.log('Registration successful:', response.data);

        setCookie('sessionid', response.data.sessionid, 7);

        toast.success('Registration successful!');
        
        // Dispatch the loginSuccess action with the user data
        dispatch(loginSuccess(response.data.data));
        navigate('/dashboard');

        console.log(response.data.data);
      }
      // Handle success (e.g., redirect user, store token)
    } catch (error) {
      console.error('Login failed:', error.response); // Log the error response


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

  console.log(userData);

  return (
    <div className="max-w-md mx-auto border px-4 py-8 rounded mt-32">
      <div className='mb-4'>
        <h4 className='text-2xl font-bold'>Sign Up to NirmanBazaar</h4>
        <p>Enter your address and other details carefully.</p>
      </div>

      <form onSubmit={handleLoginSubmit}>
        <input
          type="text"
          id="name"
          onChange={handleChange}
          placeholder='Your Name'
          className="bg-gray-50 border mb-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />
        
        <input
          type="tel"
          id="phone"
          onChange={handleChange}
          placeholder='Phone'
          className="bg-gray-50 border mb-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />


        <input
          type="number"
          id="zip_code"
          onChange={handleChange}
          placeholder='post code'
          className="bg-gray-50 border mb-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />

        <input
          type="text"
          id="address"
          onChange={handleChange}
          placeholder='address'
          className="bg-gray-50 border mb-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />

        <select className='w-full rounded mb-2 p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm' name="division" id="division" onChange={handleChange}>
               
          <option value="Barishal">Barishal</option>
          <option value="Chattogram">Chattogram</option>
          <option value="Dhaka" selected>Dhaka</option>

          <option value="Khulna">Khulna</option>
          <option value="Mymensingh">Mymensingh</option>
          <option value="Rajshahi">Rajshahi</option>
          
          <option value="Rangpur">Rangpur</option>
          <option value="Sylhet">Sylhet</option>


        </select>

        <input
          type="password"
          placeholder='Password'
          onChange={handleChange}
          id="password"
          className="bg-gray-50 mb-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />


        
        <button type="submit" className="text-white primary_bg font-semibold rounded-lg text-sm w-full px-5 py-2.5 text-center">
          Sign Up
        </button>
      </form>

      <p className='mt-2 text-sm'>Already have an account? <Link to={'/login'} className='primary_txt'>Sign In</Link></p>
    </div>
  );
}
