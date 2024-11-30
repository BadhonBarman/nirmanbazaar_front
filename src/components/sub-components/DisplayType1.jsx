import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import ProductCard from './ProductCard';

export default function DisplayType1({title, category}) {
    const base_domain = import.meta.env.VITE_APP_SOURCE_DOMAIN;

    const [interiorproducts, setInterior] = useState([])
    const [interiorpromo, setInteriorPromo] = useState([])

    const [cart, setCart] = useState(() => {
      const savedCart = localStorage.getItem('cart');
      return savedCart ? JSON.parse(savedCart) : {};
    });
  
    const [compares, setCompares] = useState(() => {
      const savedCompare = localStorage.getItem('compares');
      return savedCompare ? JSON.parse(savedCompare) : {};
    });


    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await axios.post(`${base_domain}/landing_category_data/`, {'category':category});
            setInterior(response.data);
            console.log(response.data)
        }
        catch (error) {
            console.error(error);
        }
        };
    
        fetchData();
    }, [base_domain]);

    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await axios.post(`${base_domain}/landing_category_promo/`, {'category':category});
            setInteriorPromo(response.data);
            console.log(response.data)
        }
        catch (error) {
            console.error(error);
        }
        };
      
        fetchData();
      }, [base_domain]);


    const handleAddCart = (id) => {
        // Retrieve existing cart data from localStorage
        const existingCart = JSON.parse(localStorage.getItem('cart')) || {};
      
        // Check if the item already exists in the cart
        if (existingCart[id]) {
          // If it exists, show a warning toast
          toast.warning('Item already in the cart!');
        } else {
          // If it doesn't exist, update the cart with the new item
          const updatedCart = {
            ...existingCart,
            [id]: {
              prod_id: id,
              qty: 1,
            },
          };
      
          // Update the cart in localStorage
          localStorage.setItem('cart', JSON.stringify(updatedCart));
      
          // Update state with the new cart data
          setCart(updatedCart);
          toast.success('Item added successfully!');
        }
      };
      
      const handleAddCompare = (id) => {
        // Retrieve existing cart data from localStorage
        const existingData = JSON.parse(localStorage.getItem('compares')) || {};
      
        // Check if the item already exists in the cart
        if (existingData[id]) {
          // If it exists, show a warning toast
          toast.warning('Item already in the cart!');
        } else {
          // If it doesn't exist, update the cart with the new item
          const updatedData = {
            ...existingData,
            [id]: {
              prod_id: id,
            },
          };
      
          // Update the cart in localStorage
          localStorage.setItem('compares', JSON.stringify(updatedData));
      
          // Update state with the new cart data
          setCompares(updatedData);
          toast.success('Item added successfully!');
        }
      };
    
      useEffect(() => {
        // Save the updated cart data to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
    
      }, [cart]);

    


  return (
    <>

<div className="section">
      <div className="section_title flex justify-between items-center pb-2 border-b border-gray-200">
          <h4 className='text-2xl text-gray-800 font-medium'>{title}</h4>
          <Link to={`/category/${category}`} className='px-3.5 py-2 border border-gray-200 rounded'>View All</Link>
      </div>

      <div className="grid max-md:grid-cols-1 grid-cols-3">
        <div className='h-full w-full max-md:p-1 p-2'>
        {interiorpromo.map((data, index) => (
          <Link to={data.Link}>
            <img className='rounded-md' src={`${base_domain}${data.image}`} alt="" />
          </Link>
        ))}
        </div>
        <div className='col-span-2 p-2'>
            <div className='gap-2.5 grid max-md:grid-cols-2 grid-cols-3'>
                    {interiorproducts.map((data, index) => (
                        <ProductCard data={data} />
                    ))}
            </div>
        </div>
      </div>
  </div>

    </>
  )
}
