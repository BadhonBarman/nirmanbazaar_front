import React, { useEffect, useState } from 'react';

import { initFlowbite } from 'flowbite';
import axios from 'axios';
import api from '../features/PrivateApiCall';

import DOMPurify from 'dompurify';
import Header from './sub-components/Header';
import { Link, useParams, useLocation } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import CategoryConverter from './sub-components/CategoryConverter';
import MeasureUnitConverter from './sub-components/MeasureUnitConverter';
import ProductCard from './sub-components/ProductCard';
import { Helmet } from 'react-helmet';


import 'lightbox2/dist/css/lightbox.min.css'; // Correct path for CSS
import 'lightbox2/dist/js/lightbox-plus-jquery.min.js'; // Correct path for JS


export default function ProductView() {
  const base_domain = import.meta.env.VITE_APP_SOURCE_DOMAIN;
  const { slug } = useParams(); // Use useParams directly
  const [product, setProduct] = useState(null);
  const [division, setDivision] = useState(null);
  const [district, setDistrict] = useState(null);
  const [related, setRelated] = useState([]);
  const [selectedShop, setSelectedShop] = useState(null);
  const [selectedQty, setSelectedQty] = useState(0);
  const [CustomError, setCustomError] = useState('');


    const divisions = [
        "Dhaka",
        "Chattogram",
        "Rajshahi",
        "Khulna",
        "Barishal",
        "Sylhet",
        "Rangpur",
        "Mymensingh",
    ];

    const dhaka_districts = ['Dhaka', 'Gazipur', 'Narayanganj', 'Tangail', 'Munshiganj', 'Narsingdi', 'Manikganj', 'Kishoreganj', 'Shariatpur', 'Narshingdi', 'Faridpur', 'Gopalganj', 'Madaripur', 'Rajbari', 'Tangail'];
    const chattogram_districts = ['Chattogram', 'Coxs Bazar', 'Rangamati', 'Khagrachari', 'Bandarban', 'Feni', 'Noakhali', 'Lakshmipur', 'Chandpur', 'Brahmanbaria'];
    const rajshahi_districts = ['Rajshahi', 'Bogra', 'Pabna', 'Joypurhat', 'Naogaon', 'Natore', 'Chapainawabganj', 'Sirajganj'];
    const khulna_districts = ['Khulna', 'Jessore', 'Satkhira', 'Meherpur', 'Narail', 'Chuadanga', 'Kushtia', 'Magura', 'Bagerhat', 'Jhenaidah'];
    const barishal_districts = ['Barishal', 'Barguna', 'Bhola', 'Jhalokati', 'Patuakhali', 'Pirojpur'];
    const sylhet_districts = ['Sylhet', 'Moulvibazar', 'Habiganj', 'Sunamganj'];
    const rangpur_districts = ['Rangpur', 'Dinajpur', 'Gaibandha', 'Kurigram', 'Lalmonirhat', 'Nilphamari', 'Panchagarh', 'Thakurgaon'];
    const mymensingh_districts = ['Mymensingh', 'Jamalpur', 'Netrokona', 'Sherpur'];
    
  const [prices, setPrices] = useState([]);
  const [isPriceCheck, setPriceCheck] = useState(false);
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : {};
  });

  const location = useLocation();

  const fromSearchSuggestion = location.state?.fromSearchSuggestion;

  useEffect(() => {
    if (fromSearchSuggestion) {
      console.log('Navigated from search suggestion');
      // You can perform additional actions here
    }
  }, [fromSearchSuggestion]);

  const [quantity, setQuantity] = useState(1);
  initFlowbite()

  useEffect(() => {  
    const fetchProductData = async () => {
      try {
        const response = await axios.post(`${base_domain}/product_view/`, {
          slug: slug,
          fromSearch:fromSearchSuggestion,
        });
        setProduct(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProductData();
  }, [base_domain, slug]); // Add slug to the dependency array



  useEffect(() => {  
    const fetchProductData = async () => {
      try {
        const response = await axios.post(`${base_domain}/related_product_view/`, {
          slug: slug,
        });
        setRelated(response.data);
        console.log("related product : ", response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProductData();
  }, [base_domain, slug]); // Add slug to the dependency array

  
  

  const handleSubmit = async () => {
    setPriceCheck(true)
    if (!division) {
        alert("Please select a division.");
        return;
    }
    if (!district) {
        alert("Please select a district.");
        return;
    }

    try {
        const response = await axios.post(`${base_domain}/product_source_data/`, {
            slug: slug,
            division: division,
            district: district,
        });
        console.log("This is source data:", response.data);
        setPrices(response.data)
        // Close modal programmatically
        document.getElementById("closeModalButton").click();
    } catch (error) {
        console.error("Error fetching product source:", error);
    }
};

  const sanitizeHtml = (html) => {
    return { __html: DOMPurify.sanitize(html) };
  };


  <Helmet>
    <meta property="og:title" content={product?.title} />
    <meta property="og:description" content={product?.details} />
    <meta property="og:image" content={`${base_domain}${product?.image}`} />
    <meta property="og:url" content={window.location.href} />
    <meta property="og:type" content="website" />
</Helmet>

  const handleAddCart = () => {
    // Retrieve existing cart data from localStorage
        const existingCart = JSON.parse(localStorage.getItem('cart')) || {};
        
        if (!selectedShop){
            toast.error('check avaliablity first & select your choice')
            setCustomError('Please check product availability at first & select your preferred shop deal.')
            return;
        }

        // Update cart with the new item
        const updatedCart = {
          ...existingCart,
          [product.id]: {
            prod_id: product.id,
            qty: quantity,
            shop:selectedShop,
          },
        };
      
        // Update localStorage
        localStorage.setItem('cart', JSON.stringify(updatedCart));
      
        // Dispatch custom event
        // window.dispatchEvent(new Event('cartUpdated'));
        window.location.reload()
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
      setSelectedShop(item.shop)
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


    document.title = product?.title



    useEffect(() => {
        if (product?.keyword) {
          const metaKeyword = document.querySelector('meta[name="keywords"]');
          if (metaKeyword) {
            // If the meta tag exists, update the content
            metaKeyword.setAttribute('content', product.keyword);
          } else {
            // If the meta tag doesn't exist, create it
            const meta = document.createElement('meta');
            meta.name = 'keywords';
            meta.content = product.keyword;
            document.head.appendChild(meta);
          }
        }
      }, [product]);

      // Function to strip HTML tags and return plain text
const stripHTML = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
  };
  
 
    useEffect(() => {
      if (product?.details) {
        // Strip HTML from product.details
        const safeDescription = stripHTML(product.details);
  
        const metaKeyword = document.querySelector('meta[name="description"]');
        if (metaKeyword) {
          // If the meta tag exists, update the content
          metaKeyword.setAttribute('content', safeDescription);
        } else {
          // If the meta tag doesn't exist, create it
          const meta = document.createElement('meta');
          meta.name = 'description';
          meta.content = safeDescription;
          document.head.appendChild(meta);
        }
      }
    }, [product]);


      

  console.log(cart)
  console.log('district:', district);

  


  return product ? (
    <>

      <div className="product_display p-4">
        <div className="row">
            <div className="col-md-4">
                <div className="product_img">
                <Link
                             to={`${base_domain}${product.image}`}
                             data-lightbox={`album-${product.id}`}
                             data-title={product.title}
                            className="col-4 rounded"
                         >
                        <img className='rounded' src={`${base_domain}${product.image}`} alt="" />
                </Link>

                <div className='grid grid-cols-4 gap-2'>
                    {product.images.map((data, index)=>(
                        <Link key={data.id}
                                to={`${base_domain}${data.image}`}
                                data-lightbox={`album-${data.id}${index}`}
                                data-title={product.title}
                            className="rounded"
                            >
                            <img className='w-full h-auto rounded'  src={`${base_domain}${data.image}`} alt="" />
                        </Link>
                    ))}
                </div>

                </div>            
            </div>
            <div className="col-md-8">
                <div className="product_info mt-8">
                    <p className='text-green-500 text-lg'><CategoryConverter id={product.category} /></p>
                    <div className="flex flex-row items-center gap-2 my-2.5">
                        {product?.brand && 
                        <div className='p-1.5 bg-lime-50 px-2 rounded-md'>
                        <img className='h-3.5 ' src={`${base_domain}${product?.brand?.logo}`} alt="" />
                        </div>
                        }
                    </div>
                    <h4 className='text-3xl font-bold eng_font'>{product.title}</h4>

                    

                        <div className="flex items-center my-3">
                            <svg className="w-4 h-4 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                            </svg>
                            <p className="ms-2 text-md font-bold text-gray-900 dark:text-white">4.95</p>
                            <span className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"></span>
                            <Link className="text-md font-medium text-gray-900 no-underline dark:text-white">(73 reviews)</Link>
                        </div>

                    
                    {/* <div className="mt-2">
                        {product.offer_price ? (<h6 className='text-2xl text-gray-800 font-semibold'><del className='text-gray-400'>৳{product.price}</del> ৳{product.offer_price} </h6>):(<h6 className='text-2xl text-gray-800 font-semibold'>৳ {product.price} <span className='text-sm'> / <MeasureUnitConverter id={product.unit} /> </span></h6>)}
                    </div> */}
                    
                    <p>**For Corporate Deal or Price, <Link to={'/dashboard/bidding-portal/'} className='underline text-yellow-400'>Please Use Bidding System. <span>click here</span></Link></p>
                    <div className="mt-2">
                        <button 
                        type="button"
                        className="primary_bg text-white px-3.5 py-2 rounded"
                        data-bs-toggle="modal"
                        data-bs-target="#divisionModal"
                        >Check Price & Availability</button>


                        <div
                            className="modal fade"
                            id="divisionModal"
                            tabIndex="-1"
                            aria-labelledby="divisionModalLabel"
                            aria-hidden="true"
                        >
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="divisionModalLabel">
                                            Select a Division
                                        </h5>
                                        <button
                                            type="button"
                                            className="btn-close"
                                            data-bs-dismiss="modal"
                                            aria-label="Close"
                                        ></button>
                                    </div>
                                    <div className="modal-body">
                                        <form>
                                            <div className="mb-3">
                                                <label htmlFor="divisionSelect" className="form-label">
                                                    Divisions of Bangladesh
                                                </label>
                                                <select
                                                    className="form-select"
                                                    id="divisionSelect"
                                                    value={division || ""}
                                                    onChange={(e) => setDivision(e.target.value)}
                                                >
                                                    <option value="" disabled>
                                                        Select a division
                                                    </option>
                                                    {divisions.map((div, index) => (
                                                        <option key={index} value={div}>
                                                            {div}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>

                                            <div className="mb-3">
                                                <label htmlFor="divisionSelect" className="form-label">
                                                     Disctrict of Bangladesh
                                                </label>
                                                {!division &&(
                                                    <select className='form-select'>
                                                        <option value="" disabled selected>Select a division first</option>
                                                    </select>
                                                )} 
                                                {division && (
                                                    <select
                                                        className="form-select"
                                                        id="districtSelect"
                                                        value={district || ""}
                                                        onChange={(e) => setDistrict(e.target.value)}
                                                    >
                                                        <option value="" disabled>Select a district</option>
                                                        {division === "Dhaka" && dhaka_districts.map((district, index) => (
                                                            <option key={index} value={district}>{district}</option>
                                                        ))}
                                                        {division === "Chattogram" && chattogram_districts.map((district, index) => (
                                                            <option key={index} value={district}>{district}</option>
                                                        ))}
                                                        {division === "Rajshahi" && rajshahi_districts.map((district, index) => (
                                                            <option key={index} value={district}>{district}</option>
                                                        ))}
                                                        {division === "Khulna" && khulna_districts.map((district, index) => (
                                                            <option key={index} value={district}>{district}</option>
                                                        ))}
                                                        {division === "Barishal" && barishal_districts.map((district, index) => (
                                                            <option key={index} value={district}>{district}</option>
                                                        ))}
                                                        {division === "Sylhet" && sylhet_districts.map((district, index) => (
                                                            <option key={index} value={district}>{district}</option>
                                                        ))}
                                                        {division === "Rangpur" && rangpur_districts.map((district, index) => (
                                                            <option key={index} value={district}>{district}</option>
                                                        ))}
                                                        {division === "Mymensingh" && mymensingh_districts.map((district, index) => (
                                                            <option key={index} value={district}>{district}</option>
                                                        ))}
                                                    </select>
                                                )}
                                            </div>
                                        </form>
                                    </div>
                                    <div className="modal-footer">
                                        <button
                                            type="button"
                                            className="bg-red-600 text-white px-3.5 py-2 rounded"
                                            data-bs-dismiss="modal"
                                            id="closeModalButton"
                                        >
                                            Close
                                        </button>
                                        <button
                                            type="button"
                                            className="primary_bg text-white px-3.5 py-2 rounded"
                                            onClick={handleSubmit}
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    
                    
                    {isPriceCheck === true && prices.length !== 0 ? (
                    <div className="mt-2">
                        <h4 className='my-2 font-medium'>Product Price & Availability</h4>
                        <table  className='table table-striped p-2'>
                                {prices.map((data, index)=>(
                                    <tr onClick={()=>{{
                                        setSelectedShop(data.shop.id)
                                        setSelectedQty(data.qty)
                                    }}} className='rounded-sm flex items-center border-b border-green-800 bg-green-100'>
                                        <input className='ml-2 rounded-sm border-green-500' checked={selectedShop===data.shop.id} type="checkbox" name="" id="" />
                                        <td className='p-2'>{data.shop.name}</td>
                                        <td className='p-2'>৳{data.price}</td>
                                        {/* <td className='p-2' >{data.qty}<MeasureUnitConverter id={product.unit} /></td> */}
                                    </tr>
                                ))}
                        </table>
                    </div>
                    ):(isPriceCheck === true && 
                        <div className="mt-2">
                        <h4 className='my-2 font-medium'>Product Price & Availability</h4>
                        <p className='alert alert-warning'>This Product may not availalbe in your location, please contact us.</p>
                    </div>
                    )
                    }

                    {/* <div className='mt-4'>
                        {product.qty !== 0 ? (<p className='green_badge text-lg rounded'>In Stock</p>):(<p className='red_badge text-lg rounded'>Stock Out</p>)}
                    </div> */}

                    <label htmlFor="quantity-input" className="block mb-2 mt-8 text-lg font-medium text-gray-900 dark:text-white">Choose quantity:</label>
                    <div className="flex items-center gap-8">
                    <div className="relative flex items-center max-w-[8rem]">
                    <button
                        type="button"
                        disabled={quantity <= 1}
                        onClick={() => {
                            if (!selectedShop) {
                                setCustomError('Check availability and select shop first');
                                return;
                            }
                            setCustomError('');
                            setQuantity(quantity - 1);
                        }}
                        className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                    >
                        <svg className="w-3 h-3 text-gray-900 dark:text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16" />
                        </svg>
                    </button>

                    <input
                        type="number"
                        value={quantity}
                        min={1}
                        max={selectedQty}
                        disabled={!selectedShop}
                        onChange={(e) => {
                            if (!selectedShop) {
                                setCustomError('Check availability and select shop first');
                                return;
                            }
                            const val = Number(e.target.value);
                            if (val >= 1 && val <= selectedQty) {
                                setCustomError('');
                                setQuantity(val);
                            }
                        }}
                        className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-lg focus:ring-blue-500 focus:border-blue-500 block w-14 py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                    />

                    <button
                         type="button"
                         disabled={quantity >= selectedQty && selectedShop}
                         onClick={() => {
                             if (!selectedShop) {
                                 setCustomError('Check availability and select shop first');
                                 return;
                             }
                             setCustomError('');
                             setQuantity(quantity + 1);
                         }}
                        className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                    >
                        <svg className="w-3 h-3 text-gray-900 dark:text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                        </svg>
                    </button>
                </div>

                    </div>

                    <div className='flex flex-row gap-2.5 mt-4'>
                        <Link to={'tel:+8801931110999'} className='flex gap-2 items-cente bg-gradient-to-r text-white px-2.5 py-2 rounded-md from-[#25d366cc] to-[#189d7f] '>
                            <svg className='fill-white h-6 w-6' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 48C141.1 48 48 141.1 48 256l0 40c0 13.3-10.7 24-24 24s-24-10.7-24-24l0-40C0 114.6 114.6 0 256 0S512 114.6 512 256l0 144.1c0 48.6-39.4 88-88.1 88L313.6 488c-8.3 14.3-23.8 24-41.6 24l-32 0c-26.5 0-48-21.5-48-48s21.5-48 48-48l32 0c17.8 0 33.3 9.7 41.6 24l110.4 .1c22.1 0 40-17.9 40-40L464 256c0-114.9-93.1-208-208-208zM144 208l16 0c17.7 0 32 14.3 32 32l0 112c0 17.7-14.3 32-32 32l-16 0c-35.3 0-64-28.7-64-64l0-48c0-35.3 28.7-64 64-64zm224 0c35.3 0 64 28.7 64 64l0 48c0 35.3-28.7 64-64 64l-16 0c-17.7 0-32-14.3-32-32l0-112c0-17.7 14.3-32 32-32l16 0z"/></svg>
                            <span >Call Us</span>
                        </Link>

                        <Link target='_blank' to={'https://api.whatsapp.com/send/?phone=%2B8801931110999'} className='flex gap-2 items-cente bg-gradient-to-r text-white px-2.5 py-2 rounded-md from-[#25d366cc] to-[#189d7f] '>
                            <svg className='fill-white h-6 w-6' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/></svg>
                            <span>Message on Whatsapp</span>
                        </Link>
                    </div>

                    {CustomError && <p className='mt-3.5 alert alert-danger'>{CustomError}</p>}
                    
                     
                    <div className="prod_btns mt-2 flex items-center">
                        <button onClick={handleAddCart} className='flex items-center primary_bg text-white  px-3 py-2 rounded text-lg'>
                            <svg className="w-6 h-6 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312"/>
                            </svg>
                            <span className='ml-2'>
                                {selectedShop ? 'Update Cart':'Add To Cart'}
                            </span>
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
                        <button  className='p-2 rounded-full text-lg bg-gray-100 border-none hover:bg-gray-200'>
                            <Link to={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`} rel="noopener noreferrer" target="_blank">
                            <svg className="w-6 h-6 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                <path fillRule="evenodd" d="M13.135 6H15V3h-1.865a4.147 4.147 0 0 0-4.142 4.142V9H7v3h2v9.938h3V12h2.021l.592-3H12V6.591A.6.6 0 0 1 12.592 6h.543Z" clip-rule="evenodd"/>
                            </svg>
                            </Link>
                        </button>

                        <button className='p-2 ml-2 rounded-full text-lg bg-gray-100 border-none hover:bg-gray-200'>
                            <Link to={`https://api.whatsapp.com/send?text=${encodeURIComponent(window.location.href)}`} 
                            target="_blank" 
                            rel="noopener noreferrer">
                                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path fill="currentColor" fillRule="evenodd" d="M12 4a8 8 0 0 0-6.895 12.06l.569.718-.697 2.359 2.32-.648.379.243A8 8 0 1 0 12 4ZM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10a9.96 9.96 0 0 1-5.016-1.347l-4.948 1.382 1.426-4.829-.006-.007-.033-.055A9.958 9.958 0 0 1 2 12Z" clip-rule="evenodd"/>
                                <path fill="currentColor" d="M16.735 13.492c-.038-.018-1.497-.736-1.756-.83a1.008 1.008 0 0 0-.34-.075c-.196 0-.362.098-.49.291-.146.217-.587.732-.723.886-.018.02-.042.045-.057.045-.013 0-.239-.093-.307-.123-1.564-.68-2.751-2.313-2.914-2.589-.023-.04-.024-.057-.024-.057.005-.021.058-.074.085-.101.08-.079.166-.182.249-.283l.117-.14c.121-.14.175-.25.237-.375l.033-.066a.68.68 0 0 0-.02-.64c-.034-.069-.65-1.555-.715-1.711-.158-.377-.366-.552-.655-.552-.027 0 0 0-.112.005-.137.005-.883.104-1.213.311-.35.22-.94.924-.94 2.16 0 1.112.705 2.162 1.008 2.561l.041.06c1.161 1.695 2.608 2.951 4.074 3.537 1.412.564 2.081.63 2.461.63.16 0 .288-.013.4-.024l.072-.007c.488-.043 1.56-.599 1.804-1.276.192-.534.243-1.117.115-1.329-.088-.144-.239-.216-.43-.308Z"/>
                                </svg>
                            </Link>

                        </button>

                        <button className='p-2 ml-2 rounded-full text-lg bg-gray-100 border-none hover:bg-gray-200'>
                            <Link to={`https://www.instagram.com/share?url=${encodeURIComponent(window.location.href)}`} 
                            target="_blank" 
                            rel="noopener noreferrer" >
                                <svg className="w-6 h-6 text-gray-800 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path fill="currentColor" fillRule="evenodd" d="M3 8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8Zm5-3a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H8Zm7.597 2.214a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2h-.01a1 1 0 0 1-1-1ZM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm-5 3a5 5 0 1 1 10 0 5 5 0 0 1-10 0Z" clip-rule="evenodd"/>
                                </svg>
                            </Link>
                        </button>

                        <button className='p-2 ml-2 rounded-full text-lg bg-gray-100 border-none hover:bg-gray-200'>
                            <Link to={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}`} 
                            target="_blank" rel="noopener noreferrer" >
                                <svg className="w-6 h-6 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M13.795 10.533 20.68 2h-3.073l-5.255 6.517L7.69 2H1l7.806 10.91L1.47 22h3.074l5.705-7.07L15.31 22H22l-8.205-11.467Zm-2.38 2.95L9.97 11.464 4.36 3.627h2.31l4.528 6.317 1.443 2.02 6.018 8.409h-2.31l-4.934-6.89Z"/>
                                </svg>
                            </Link>
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



<div className='container'>
    <div className='border-b border-gray-200 dark:border-gray-700 pb-2'>
        <h2 className='text-base lg:text-xl font-semibold'>Related Products</h2>
    </div>

    <div className="grid gap-2.5 grid-cols-5 max-sm:grid-cols-2 max-md:grid-cols-3 max-lg:grid-cols-3 mt-4">
        {related.map((data, index) => (
          <ProductCard data={data} key={index} />
        ))}
      </div>


</div>




        
        </>
    
  ): 'loading...'
}
