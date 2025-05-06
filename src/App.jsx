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
import scrollTop from './features/scrollTop.js';
import { useSelector } from 'react-redux';
import Dashboard from './components/dashboard/Dashboard';
import OrderHistory from './components/dashboard/OrderHistory';
import MyCart from './components/dashboard/MyCart';
import Wishlist from './components/dashboard/Wishlist';
import CategoryPage from './components/CategoryPage';
import Adresses from './components/dashboard/Addresses';
import AllBrands from './components/AllBrands';
import ProductRequest from './components/ProductRequest';
import ComparePage from './components/ComparePage';
import BrandPage from './components/BrandPage';
import SupportToken from './components/dashboard/SupportToken';
import Calculator from './components/Calculator';
import SendReq from './components/SendReq';
import AllShops from './components/AllShops';
import TermsCondition from './components/TermsCondition';
import ReturnPolicy from './components/ReturnPolicy';
import SupportPolicy from './components/SupportPolicy';

import AccountSettings from './components/dashboard/AccountSettings';
import CheckoutPage from './components/dashboard/CheckoutPage';
import OrderPlace from './components/dashboard/OrderPlace';
import Notifications from './components/dashboard/Notifications';
import OrderView from './components/dashboard/OrderView';
import CategoryList from './components/CategoryList';
import NotFound from './components/NotFound';
import RequirementsLog from './components/dashboard/RequirementsLog';
import ShopPage from './components/ShopPage';
import BlogPage from './components/BlogPage';
import BlogView from './components/BlogView';
import BecomeVendor from './components/BecomeVendor';
import Experthire from './components/Experthire';
import ExpertDisplay from './components/ExpertDisplay';
import HandlePay from './components/dashboard/HandlePay';
import BrandEnrollment from './components/BrandEnrollment';
import PrivacyPolicy from './components/PrivacyPolicyPage';
import PrivacyPolicyPage from './components/PrivacyPolicyPage';
import BiddingPortal from './components/dashboard/BiddingPortal';
import BiddingForm from './components/dashboard/BiddingForm';
import BiddingFormVIew from './components/dashboard/BiddingFormVIew';
import SearchPage from './components/SearchPage';




export default function App() {
  
  document.title = "Nirmanbazaar Bangladesh";

  CustomerAuthCheck();


  useEffect(()=>{
    scrollTop();
  },[window.location.pathname])


  const isAuthenticated = useSelector((state)=>state.auth.isAuthenticated)



  return (
    <>
    
    <ToastContainer position="top-center" />




      <Router>

        <Routes>

          

        
          
          <Route path="/*" element={<MainContainer />}>
            <Route path="" element={<Home />} />
            <Route path="all-category" element={<CategoryList />} />
            <Route path="compare/" element={<ComparePage />} />

            <Route path="search/:keyword" element={<SearchPage />} />

            <Route path="all-brands/" element={<AllBrands />} />
            <Route path="all-shops/" element={<AllShops />} />

            <Route path="product-request/" element={<ProductRequest />} />
            <Route path="category/:category" element={<CategoryPage />} />
            {/* <Route path="category/:category/:sub/" element={<CategoryPage />} />
            <Route path="category/:category/:sub/:subsub/" element={<CategoryPage />} /> */}

            <Route path="shop-page/:slug" element={<ShopPage />} />
            <Route path="brand-page/:slug" element={<BrandPage />} />
 
            <Route path="calculator/" element={<Calculator />} />
            <Route path="send-requirements/" element={<SendReq />} />

            <Route path="blogs/" element={<BlogPage />} />
            <Route path="blogs/:id" element={<BlogView />} />

            <Route path="become-vendor/" element={<BecomeVendor />} />
            <Route path="brand-enrollment/" element={<BrandEnrollment />} />

            <Route path="expert-hire/" element={<Experthire />} />

            <Route path="expert-hire/:slug" element={<ExpertDisplay />} />
            

            <Route path="terms-and-conditions/" element={<TermsCondition />} />
            <Route path="return-policy/" element={<ReturnPolicy />} />
            <Route path="support-policy/" element={<SupportPolicy />} />
            <Route path="privacy-policy/" element={<PrivacyPolicyPage />} />
      
           
            
            {isAuthenticated ? (
              <Route path="login" element={<Navigate to="/dashboard" />} />
            ) : (
              <Route path="login" element={<Login />} />
            )}


            <Route path="register" element={<Register />} />
            <Route path="product/:slug" element={<ProductView />} />
            <Route path="*" element={<NotFound />} />

          </Route>

          <Route path="/dashboard/*" element={<DashboardContainer />}>
            <Route path="" element={<Dashboard />} />
            <Route path="order-history" element={<OrderHistory />} />
            <Route path="order/:invID" element={<OrderView />} />

            <Route path="my-cart" element={<MyCart />} />
            <Route path="wishlist" element={<Wishlist />} />

            <Route path="requirements-log" element={<RequirementsLog />} />

            <Route path="account-settings" element={<AccountSettings />} />
            <Route path="addresses" element={<Adresses />} />

            <Route path="bidding-portal/" element={<BiddingPortal />} />
            <Route path="bidding-portal/form" element={<BiddingForm />} />
            <Route path="bidding-portal/form/:id" element={<BiddingFormVIew />} />

            <Route path="notifications" element={<Notifications />} />
            <Route path="support" element={<SupportToken />} />

            <Route path="checkout/:slug" element={<CheckoutPage />} />
            <Route path="order-confirmation/:slug" element={<OrderPlace />} />
            <Route path="handlepay/:code" element={<HandlePay />} />


          </Route>
          

        </Routes>
     
      </Router>




    </>
  )
}
