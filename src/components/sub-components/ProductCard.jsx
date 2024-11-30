import React, { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify';
import TextShorter from '../helpers/TextShorter';

export default function ProductCard({data}) {
    const base_domain = import.meta.env.VITE_APP_SOURCE_DOMAIN;

    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : {};
      });
    
      const [compares, setCompares] = useState(() => {
        const savedCompare = localStorage.getItem('compares');
        return savedCompare ? JSON.parse(savedCompare) : {};
      });
  
      
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

      const calculateTimeLeft = () => {
        const targetDate = new Date(data.offer_end); // Set your target date here
        const now = new Date();
        const difference = targetDate - now;

        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }

        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

  return (
    <>
            <div key={data.id} className="product_card relative border border-gray-200 max-md:h-[252px] h-[292px]  rounded-lg ">
              <div className="absolute product_card_overlay right-1.5 top-2">
                <div className="flex flex-col gap-1">
                  <button className='rounded-full shadow-sm bg-white p-2'>
                
                      <svg xmlns="http://www.w3.org/2000/svg" height={18} width={18} viewBox="0 0 512 512"><path d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8l0-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5l0 3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20-.1-.1s0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5l0 3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2l0-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z"/></svg>
       
                  </button>

                  

                  <button onClick={()=>(handleAddCompare(data.id))} className='rounded-full shadow-sm bg-white p-2'>
                    <svg height={18} width={18} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.651 7.65a7.131 7.131 0 0 0-12.68 3.15M18.001 4v4h-4m-7.652 8.35a7.13 7.13 0 0 0 12.68-3.15M6 20v-4h4"/>
                    </svg>
                  </button>

                  <button onClick={()=>(handleAddCart(data.id))} className='rounded-full shadow-sm bg-white p-2'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="18" 
                        height="18">
                    <path d="M253.3 35.1c6.1-11.8 1.5-26.3-10.2-32.4s-26.3-1.5-32.4 10.2L117.6 192 32 192c-17.7 0-32 14.3-32 32s14.3 32 32 32L83.9 463.5C91 492 116.6 512 146 512L430 512c29.4 0 55-20 62.1-48.5L544 256c17.7 0 32-14.3 32-32s-14.3-32-32-32l-85.6 0L365.3 12.9C359.2 1.2 344.7-3.4 332.9 2.7s-16.3 20.6-10.2 32.4L404.3 192l-232.6 0L253.3 35.1zM192 304l0 96c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-96c0-8.8 7.2-16 16-16s16 7.2 16 16zm96-16c8.8 0 16 7.2 16 16l0 96c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-96c0-8.8 7.2-16 16-16zm128 16l0 96c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-96c0-8.8 7.2-16 16-16s16 7.2 16 16z"/>
                    </svg>
                  </button>

                </div>
              </div>
              <Link to={`/product/${data.slug}`}>
                <img
                  className="w-full max-md:h-32 h-48 object-cover rounded-t-lg"
                  src={`${base_domain}${data.image}`}
                  alt={data.title}
                />
                <div className="product_card_text p-2">
                  <h4 className="text-sm text-start font-medium">
                    <TextShorter text={data.title} range={48} />
                  </h4>
                  <p className="text-md font-medium text-right mt-2 text-green-500">{data.price} tk</p>
                </div>

                <div className='w-full text-center bg-gray-100 letter-spacing-wide rounded'>
                {timeLeft.days > 0 || timeLeft.hours > 0 || timeLeft.minutes > 0 || timeLeft.seconds > 0 ? (
                  <span className="text-gray-700 text-sm font-semibold">
                    {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
                  </span>
                ) : null}
                </div>
              </Link>
            </div>
    
    </>
  )
}
