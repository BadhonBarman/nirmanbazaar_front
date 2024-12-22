import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import api from '../../features/PrivateApiCall'

export default function Dashboard() {

    const base_domain = import.meta.env.VITE_APP_SOURCE_DOMAIN;
  
    
    const [wishlist, setWishlist] = useState(0);
    const [order, setOrder] = useState(0);
    document.title = "Dashboard";


    useEffect(() => {
        const fetchProductData = async () => {
        try {
            const response = await api.post('/wishlist_count/');
            setWishlist(response.data.count);
        } catch (error) {
            console.error('Error fetching product data:', error);
        }
        };

        fetchProductData();
    }, [base_domain]);


    useEffect(() => {
        const fetchProductData = async () => {
        try {
            const response = await api.post('/count_data/');
            setOrder(response.data.total_order);
        } catch (error) {
            console.error('Error fetching product data:', error);
        }
        };

        fetchProductData();
    }, [base_domain]);


  return (
    <>
    <div className="grid max-lg:grid-cols-2 grid-cols-4 gap-2.5">

        <div >
            <div className='bg-gradient-to-b from-green-50 to-green-100 p-8  rounded text-gray-800'>
                <Link to={'order-history/'}>
                    <h4 className='xl:text-xl font-semibold'>Total Order</h4>
                    <p className='text-lg'>{order}</p>
                </Link>
            </div>
        </div>

        <div  >
            <div className='bg-gradient-to-r from-indigo-50 to-violet-100 p-8  rounded text-gray-800'>
                <Link to={'wishlist/'}>
                    <h4 className='xl:text-xl font-semibold'>Wishlist</h4>
                    <p className='text-lg'>{wishlist} item</p>
                </Link>
            </div>
        </div>


        <div  >
            <div className='bg-gradient-to-r from-yellow-50 to-yellow-100 p-8  rounded text-gray-800'>
               <Link to={'my-cart/'}>
                <h4 className='xl:text-xl font-semibold'>My Cart</h4>
                <p className='text-lg'> {Object.keys(JSON.parse(localStorage.getItem('cart') || '{}')).length} item</p>
               </Link>
            </div>
        </div>

    </div>
    </>
  )
}
