import React, { useEffect, useState } from 'react';

import { initFlowbite } from 'flowbite';
import axios from 'axios';
import api from '../features/PrivateApiCall';

import DOMPurify from 'dompurify';
import Header from './sub-components/Header';
import { Link, useParams } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';

export default function ProductView() {
  const base_domain = import.meta.env.VITE_APP_SOURCE_DOMAIN;
  const { slug } = useParams(); // Use useParams directly
  const [product, setProduct] = useState(null);
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : {};
  });
  const [quantity, setQuantity] = useState(1);
  initFlowbite()
  useEffect(() => {
    
    const fetchProductData = async () => {
      try {
        const response = await axios.post(`${base_domain}/product_view/`, {
          slug: slug,
        });
        setProduct(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProductData();
  }, [base_domain, slug]); // Add slug to the dependency array

  const sanitizeHtml = (html) => {
    return { __html: DOMPurify.sanitize(html) };
  };

  const handleAddCart = () => {
    // Retrieve existing cart data from localStorage
    const existingCart = JSON.parse(localStorage.getItem('cart')) || {};
    

    // Update cart with the new item
    const updatedCart = {
      ...existingCart,
      [product.id]: {
        prod_id: product.id,
        qty:  quantity,
      },
    };

    

    // Update state with the new cart data
    setCart(updatedCart);
    toast.success('Item added successfully!');
  };

  useEffect(() => {
    // Save the updated cart data to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

  }, [cart]);

  const targetProdId = product?.id; // Replace with the prod_id you want to find

  useEffect(() => {
    // Find and log the item with the specific prod_id
    const item = Object.values(cart).find(item => item.prod_id === targetProdId);
    if (item) {
      console.log(`Item with prod_id ${targetProdId}:`, item);
      setQuantity(item.qty)
    } else {
      console.log(`Item with prod_id ${targetProdId} not found`);
    }
  }, [targetProdId]);


  const handleBookmarkClick = async (prodID) => {
    try {
        
        const response = await api.post('/set_wishlist/', { prodID });
        if (response.status === 200) {
           toast.success('Item Added into Wishlist ')
        }

    } catch (error) {
        // If using Axios or Fetch, status might be in error.response
        const status = error.response ? error.response.status : error.status;
    
        if (status === 406) {
            toast.warning('Item Already Exists');
        } else if (status === 401) {
            toast.warning('Login Required');
        } else {
            toast.error('Failed to add item');
        }
    

    }
};



  console.log(cart)

  return product ? (
    <>

      <div className="product_display p-4">
        <div className="row">
            <div className="col-md-4">
                <div className="product_img">
                <img className='rounded' src={`${base_domain}${product.image}`} alt="" />
                </div>            
            </div>
            <div className="col-md-8">
                <div className="product_info mt-8">
                    <p className='text-green-500 text-lg'>Personal Care</p>
                    <h4 className='text-3xl font-bold eng_font'>{product.title}</h4>

                    

                        <div className="flex items-center my-3">
                            <svg className="w-4 h-4 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                            </svg>
                            <p className="ms-2 text-md font-bold text-gray-900 dark:text-white">4.95</p>
                            <span className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"></span>
                            <Link className="text-md font-medium text-gray-900 no-underline dark:text-white">(73 reviews)</Link>
                        </div>

                    
                    <div className="mt-2">
                        {product.offer_price ? (<h6 className='text-2xl text-gray-800 font-semibold'><del className='text-gray-400'>৳{product.price}</del> ৳{product.offer_price} </h6>):(<h6 className='text-2xl text-gray-800 font-semibold'>৳ {product.price}</h6>)}
                    </div>
                    
                    <div className='mt-4'>
                        {product.qty !== 0 ? (<p className='green_badge text-lg rounded'>In Stock</p>):(<p className='red_badge text-lg rounded'>Stock Out</p>)}
                    </div>

                    <label htmlFor="quantity-input" className="block mb-2 mt-8 text-lg font-medium text-gray-900 dark:text-white">Choose quantity:</label>
                    <div className="flex items-center gap-8">
                        <div className="relative flex items-center max-w-[8rem]">
                            <button type="button" disabled={quantity===1} onClick={(e) => setQuantity(quantity-1)} id="decrement-button" data-input-counter-decrement="quantity-input" className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                                <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                    <path stroke="currentColor" strokeLinecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16"/>
                                </svg>
                            </button>
                            <input type="text" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} id="quantity-input" data-input-counter aria-describedby="helper-text-explanation" className=" bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-lg focus:ring-blue-500 focus:border-blue-500 block w-14 py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            <button type="button" disabled={quantity===product.qty} onClick={(e) => setQuantity(quantity+1)} id="increment-button" data-input-counter-increment="quantity-input" className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                                <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                    <path stroke="currentColor" strokeLinecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                    
                     
                    <div className="prod_btns mt-4 flex items-center">
                        <button onClick={handleAddCart} className='flex items-center primary_bg text-white  px-3 py-2 rounded text-lg'>
                            <svg className="w-6 h-6 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312"/>
                            </svg>
                            <span className='ml-2'>Add To Cart</span>
                        </button>

                        <button onClick={() => handleBookmarkClick(product.id)} className='text-lg ml-2 px-3 py-2 rounded bg-gray-100 border-none hover:bg-gray-200'>
                            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"/>
                            </svg>

                        </button>

                        <button className='px-3 py-2 rounded text-lg ml-2  bg-gray-100 border-none hover:bg-gray-200'>
                            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" stroke-width="2" d="m16 10 3-3m0 0-3-3m3 3H5v3m3 4-3 3m0 0 3 3m-3-3h14v-3"/>
                            </svg>
                        </button>
                    </div>

                    <div className="share_btns mt-4">
                    <p className='text-md mb-2'>Share</p>
                        <button className='p-2 rounded-full text-lg bg-gray-100 border-none hover:bg-gray-200'>
                            <svg className="w-6 h-6 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                <path fillRule="evenodd" d="M13.135 6H15V3h-1.865a4.147 4.147 0 0 0-4.142 4.142V9H7v3h2v9.938h3V12h2.021l.592-3H12V6.591A.6.6 0 0 1 12.592 6h.543Z" clip-rule="evenodd"/>
                            </svg>
                        </button>

                        <button className='p-2 ml-2 rounded-full text-lg bg-gray-100 border-none hover:bg-gray-200'>
                        <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path fill="currentColor" fillRule="evenodd" d="M12 4a8 8 0 0 0-6.895 12.06l.569.718-.697 2.359 2.32-.648.379.243A8 8 0 1 0 12 4ZM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10a9.96 9.96 0 0 1-5.016-1.347l-4.948 1.382 1.426-4.829-.006-.007-.033-.055A9.958 9.958 0 0 1 2 12Z" clip-rule="evenodd"/>
                            <path fill="currentColor" d="M16.735 13.492c-.038-.018-1.497-.736-1.756-.83a1.008 1.008 0 0 0-.34-.075c-.196 0-.362.098-.49.291-.146.217-.587.732-.723.886-.018.02-.042.045-.057.045-.013 0-.239-.093-.307-.123-1.564-.68-2.751-2.313-2.914-2.589-.023-.04-.024-.057-.024-.057.005-.021.058-.074.085-.101.08-.079.166-.182.249-.283l.117-.14c.121-.14.175-.25.237-.375l.033-.066a.68.68 0 0 0-.02-.64c-.034-.069-.65-1.555-.715-1.711-.158-.377-.366-.552-.655-.552-.027 0 0 0-.112.005-.137.005-.883.104-1.213.311-.35.22-.94.924-.94 2.16 0 1.112.705 2.162 1.008 2.561l.041.06c1.161 1.695 2.608 2.951 4.074 3.537 1.412.564 2.081.63 2.461.63.16 0 .288-.013.4-.024l.072-.007c.488-.043 1.56-.599 1.804-1.276.192-.534.243-1.117.115-1.329-.088-.144-.239-.216-.43-.308Z"/>
                            </svg>

                        </button>

                        <button className='p-2 ml-2 rounded-full text-lg bg-gray-100 border-none hover:bg-gray-200'>
                            <svg className="w-6 h-6 text-gray-800 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                             <path fill="currentColor" fillRule="evenodd" d="M3 8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8Zm5-3a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H8Zm7.597 2.214a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2h-.01a1 1 0 0 1-1-1ZM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm-5 3a5 5 0 1 1 10 0 5 5 0 0 1-10 0Z" clip-rule="evenodd"/>
                            </svg>
                        </button>

                        <button className='p-2 ml-2 rounded-full text-lg bg-gray-100 border-none hover:bg-gray-200'>
                            <svg className="w-6 h-6 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M13.795 10.533 20.68 2h-3.073l-5.255 6.517L7.69 2H1l7.806 10.91L1.47 22h3.074l5.705-7.07L15.31 22H22l-8.205-11.467Zm-2.38 2.95L9.97 11.464 4.36 3.627h2.31l4.528 6.317 1.443 2.02 6.018 8.409h-2.31l-4.934-6.89Z"/>
                            </svg>
                        </button>

                    </div>


                </div>
            </div>
        </div>
      </div>

      

        

<div className="mb-4 border-b border-gray-200 dark:border-gray-700">
    <ul className="flex flex-wrap -mb-px text-sm font-medium text-center" id="default-tab" data-tabs-toggle="#default-tab-content" role="tablist">
        <li className="me-2" role="presentation">
            <button className="inline-block p-4 border-b-2 rounded-t-lg" id="profile-tab" data-tabs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">Details</button>
        </li>
        <li className="me-2" role="presentation">
            <button className="inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300" id="dashboard-tab" data-tabs-target="#dashboard" type="button" role="tab" aria-controls="dashboard" aria-selected="false">Reviews</button>
        </li>
    </ul>
</div>
<div id="default-tab-content">
    <div className="hidden p-4 rounded-lg" id="profile" role="tabpanel" aria-labelledby="profile-tab">
        <div dangerouslySetInnerHTML={sanitizeHtml(product.details)} />
    </div>
    <div className="hidden p-4 rounded-lg" id="dashboard" role="tabpanel" aria-labelledby="dashboard-tab">

        <div  className="flex items-center mb-2">
            <svg  className="w-4 h-4 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
            </svg>
            <svg  className="w-4 h-4 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
            </svg>
            <svg  className="w-4 h-4 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
            </svg>
            <svg  className="w-4 h-4 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
            </svg>
            <svg  className="w-4 h-4 text-gray-300 me-1 dark:text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
            </svg>
            <p  className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">4.95</p>
            <p  className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">out of</p>
            <p  className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">5</p>
        </div>
        <p  className="text-sm font-medium text-gray-500 dark:text-gray-400">1,745 global ratings</p>
        <div  className="flex items-center mt-4">
            <a href="#"  className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline">5 star</a>
            <div  className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                <div  className="h-5 bg-yellow-300 rounded" style={{ width: '70%' }} ></div>
            </div>
            <span  className="text-sm font-medium text-gray-500 dark:text-gray-400">70%</span>
        </div>
        <div  className="flex items-center mt-4">
            <a href="#"  className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline">4 star</a>
            <div  className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                <div  className="h-5 bg-yellow-300 rounded" style={{ width: '17%' }}></div>
            </div>
            <span  className="text-sm font-medium text-gray-500 dark:text-gray-400">17%</span>
        </div>
        <div  className="flex items-center mt-4">
            <a href="#"  className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline">3 star</a>
            <div  className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                <div  className="h-5 bg-yellow-300 rounded" style={{ width: '8%' }}></div>
            </div>
            <span  className="text-sm font-medium text-gray-500 dark:text-gray-400">8%</span>
        </div>
        <div  className="flex items-center mt-4">
            <a href="#"  className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline">2 star</a>
            <div  className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                <div  className="h-5 bg-yellow-300 rounded" style={{ width: '4%' }}></div>
            </div>
            <span  className="text-sm font-medium text-gray-500 dark:text-gray-400">4%</span>
        </div>
        <div  className="flex items-center mt-4">
            <a href="#"  className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline">1 star</a>
            <div  className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                <div  className="h-5 bg-yellow-300 rounded" style={{ width: '1%' }}></div>
            </div>
            <span  className="text-sm font-medium text-gray-500 dark:text-gray-400">1%</span>
        </div>   


    </div>
</div>

    




        
        </>
    
  ): 'loading...'
}
