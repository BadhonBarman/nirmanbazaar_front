import React, { useEffect, useMemo, useState } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Ensure Flowbite's JS is included
import 'flowbite/dist/flowbite.min.css';


import { initFlowbite } from 'flowbite';
import 'flowbite';


import './css/App.css'
import './css/index.css'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from './components/Home';
import ProductView from './components/ProductView';
import MainContainer from './components/MainContainer';
import Login from './components/Login';
import Register from './components/Register';
import DashboardContainer from './components/dashboard/sub-elements/DashboardContainer';
import CustomerAuthCheck from './features/CustomerAuthCheck';
import { useSelector } from 'react-redux';
import Dashboard from './components/dashboard/Dashboard';
import OrderHistory from './components/dashboard/OrderHistory';
import MyCart from './components/dashboard/MyCart';
import Wishlist from './components/dashboard/Wishlist';
import CategoryPage from './components/dashboard/CategoryPage';
import Adresses from './components/dashboard/Addresses';



export default function App() {
  
  document.title = "Ecommerce Shop";

  CustomerAuthCheck();
  const isAuthenticated = useSelector((state)=>state.auth.isAuthenticated)

  console.log(isAuthenticated)

  


  


    
      
    
  


  return (
    <>
    
    <ToastContainer position="top-center" />





      <Router>

        <Routes>

        
          
          <Route path="/*" element={<MainContainer />}>
            <Route path="" element={<Home />} />
            <Route path="category/:category" element={<CategoryPage />} />
            
            {isAuthenticated ? (
              <Route path="login" element={<Navigate to="/dashboard" />} />
            ) : (
              <Route path="login" element={<Login />} />
            )}


            <Route path="register" element={<Register />} />
            <Route path="product/:slug" element={<ProductView />} />
          </Route>

          <Route path="/dashboard/*" element={<DashboardContainer />}>
            <Route path="" element={<Dashboard />} />
            <Route path="order-history" element={<OrderHistory />} />
            <Route path="my-cart" element={<MyCart />} />
            <Route path="wishlist" element={<Wishlist />} />
            <Route path="addresses" element={<Adresses />} />
          </Route>

        </Routes>
     
      </Router>




    </>
  )
}
