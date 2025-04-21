import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'


export default function Header() {

    const base_domain = import.meta.env.VITE_APP_SOURCE_DOMAIN;
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const [cart, setCart] = useState([])
    const [skipItem, setSkipItem] = useState([])
    const [compares, setCompares] = useState(() => {
      // Retrieve the 'compares' from localStorage and parse it, or use an empty array as fallback
      return JSON.parse(localStorage.getItem('compares')) || [];
    });
    
    

    const [categories, setCategory] = useState([])
    const [subCategories , setSubCategory] = useState([])
    const [subSubCategories , setSubSubCategory] = useState([])

    const [menuOpen, setMenuOpen] = useState(false); // Controls the dropdown menu
    const [openCategory, setOpenCategory] = useState(null);
    const [openSubCategory, setOpenSubCategory] = useState(null);

    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    
    const [noResults, setNoResults] = useState(false);
    const [searchKeyword, setSearchKeyword] = useState(null);
    const [suggestedData, setSuggestedData] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const dropdownRef = useRef(null);  // Ref for the dropdown div
    
  
    const isSmallScreen = false;

    useEffect(() => {
      const fetchProductData = async () => {
        try {
          // Retrieve the cart data from localStorage
          const savedCart = localStorage.getItem('cart');
          if (savedCart) {
            const cartData = JSON.parse(savedCart);
  
            // Extract product IDs
            const productIds = Object.values(cartData).map(item => item.prod_id);
  
            // Send the product IDs to the API
            const response = await axios.post(`${base_domain}/cart_data/`, { data: productIds });
            setCart(response.data.products);
            setSkipItem(response.data.skipped_ids)
            console.log("cart data :", response.data);
          } else {
            console.log('No cart data found in localStorage');
          }
        } catch (error) {
          console.error('Error fetching product data:', error);
        }
      };
  
      fetchProductData();

       // 🔥 Listen for cart updates
    const handleStorageChange = () => fetchProductData();

    window.addEventListener("cartUpdated", handleStorageChange);

    return () => {
      window.removeEventListener("cartUpdated", handleStorageChange);
    };
    }, [base_domain, window.location.pathname, ]);

    useEffect(() => {
      const categoryData = async () => {
      try {
          const response = await axios.get(`${base_domain}/categories/`);
          console.log('category response : ', response.data)
          setCategory(response.data.categories);
          setSubCategory(response.data.sub_categories);
          setSubSubCategory(response.data.sub_sub_categories);
      }
      catch (error) {
          console.error(error);
      }
      };

      categoryData();
  }, [base_domain, window.location.pathname]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.post(`${base_domain}/search_products/`,{
            slug:searchKeyword,
          });
  
          setSuggestedData(response.data);
          setShowSuggestions(true);
          setNoResults(response.data);
          console.log(response.data)
        } catch (error) {
          setSuggestedData([]);
          setShowSuggestions(false);
          setNoResults(false);
        }
      };
  
      fetchData();
    }, [searchKeyword]);

    const handleSearchChange = (event) => {
      const keyword = event.target.value;
      setSearchKeyword(keyword);
      
    };

    const [total, setTotal] = useState(0);





    const [Qcart, setQCart] = useState(() => {
      const savedCart = localStorage.getItem('cart');
      return savedCart ? JSON.parse(savedCart) : [];
    });

    console.log('qcart : ', Qcart)


    useEffect(() => {
      
      const calculateTotal = () => {
        return cart.reduce((total, data) => {
          const itemTotal = 
            data.product.price * (Qcart[data.product.id]?.qty || 0);
          return total + itemTotal;
        }, 0); // Initialize the accumulator to 0
      };
      
      // Update total state
      setTotal(calculateTotal());
    }, [cart, Qcart]); // Dependency array


     // Listen for clicks outside the dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false);  // Close dropdown if clicked outside
      }
    };

    // Add event listener
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  // Handle item removal and dispatch custom event
  const handleRemoveItem = (itemId) => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      const cartData = JSON.parse(savedCart);
      delete cartData[itemId];

      // Update localStorage
      localStorage.setItem('cart', JSON.stringify(cartData));

      // Dispatch custom event
      window.dispatchEvent(new Event('cartUpdated'));

      // Update state to remove item from cart
      setCart(prevCart => prevCart.filter(item => item.id !== itemId));
    }
  };
  const navigate = useNavigate();
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && searchKeyword.trim()) {
      setDropdownVisible(false);
      navigate(`/search/${searchKeyword}`);
    }else if(searchKeyword.trim()){
      setDropdownVisible(true);
    }
  };
  
   

    
  console.log('this is cart data : ', cart)
  
    

  return (
    <>



    <div className="offcanvas offcanvas-end" data-bs-scroll="true" tabindex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
      <div className="offcanvas-header border-b">
        <h5 className="offcanvas-title font-bold text-lg" id="offcanvasWithBothOptionsLabel">Shopping Cart</h5>
        <button type="button" className="btn-close text-gray-800" data-bs-dismiss="offcanvas" aria-label="Close">
          <svg  className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6"/>
          </svg>
        </button>
      </div>
      <div className="offcanvas-body relative">
        <div className='h-full overflow-x-scroll'>
          {cart.length === 0 ? (<div className='flex h-full items-center justify-center'><p>Your shopping cart is empty!</p></div>):(
          <ul className='space-y-2'>
            {skipItem.map((data, index)=>(
              <li key={data.id} className='flex justify-between bg-red-200 p-2.5 rounded-lg'>
              <Link to={`product/${data.slug}`} className='flex items-center'>
                <img  height={64} width={64} className='rounded-lg' src={`${base_domain}${data.image}`} alt="" />
                  <div className='pl-2 '>
                    <div className='opacity-80'>
                      <h4 className='text-sm'>{data.title}</h4>
                      
                      {/* {data.offer_price ? (<h6 className='text-sm text-gray-800 font-semibold'><del className='text-gray-400'>৳{data.price}</del> ৳{data.offer_price} </h6>):(<h6 className='text-sm text-gray-800 font-semibold'>৳ {data.price}</h6>)} */}
                    </div>
                    <p className='text-xs font-bold text-red-800'>This Product Not Available</p>
                  </div>
              </Link>

              <button onClick={() => handleRemoveItem(data.id)} className="ml-4 text-red-500">
            Remove
          </button>
              </li>
            ))}

            {cart.map((data, index)=>(
              <li key={data.id} className='flex justify-between p-2.5 rounded-lg bg-gray-100'>
              <Link to={`product/${data.product.slug}`} className='flex items-center'>
                <img  height={64} width={64} className='rounded-sm' src={`${base_domain}${data.product.image}`} alt="" />
                  <div className='pl-2'>
                    <h4 className='text-sm'>{data.product.title}</h4>
                    {data.offer_price ? (<h6 className=' flex items-center text-sm text-gray-800 font-semibold'><del className='text-gray-400'>৳{data.product.price}</del> ৳{data.offer_price} </h6>):(<h6 className='text-sm flex items-center gap-1 text-gray-800 font-semibold'>৳ {data.product.price}
                      <span>x</span> <span>{Qcart[data.product.id]?.qty} = {data.product.price*Qcart[data.product.id]?.qty}</span>
                    </h6>)}
                    
                  </div>
              </Link>

              <button onClick={() => handleRemoveItem(data.product.id)} className="ml-4 text-red-500">
            Remove
          </button>
              </li>
            ))}
          </ul>
          )}
        </div>
        
        <div className='sticky flex justify-between items-center bottom-0 bg-[#f3f4f6dc] backdrop-blur-sm p-2 rounded w-full'>
            <p className='font-medium'>
              <span>Total Item : {cart.length}</span> <br />
              <span>Total Price: {total} BDT</span>
            </p>
            <Link 
              to={'/dashboard/my-cart/'}  
              className='primary_bg text-white font-medium px-3.5 py-1.5 rounded-md'
              onClick={() => {
                // Close the modal by simulating a click on the close button
                document.querySelector('[data-bs-dismiss="offcanvas"]').click();
              }}
            >
              Check Out
            </Link>
          </div>
        </div>

    </div>
    
    <header className="py-2 w-full px-3 border-b border-gray-200 pb-3 sticky top-0 backdrop:blur-lg bg-[#fffffff2] z-[999]">
      <div className="container py-2 flex justify-between items-center">
        {/* Left: Logo */}
        <div className="text-gray-800 text-lg font-bold">
          
       <Link className='flex justify-end' to={'/'}>
       <img src="/images/nirmanbazar.png" width={108} alt="" />
       </Link>

        </div>

        {/* Middle: Search Bar */}
         
        <div className="relative" ref={dropdownRef}>
      <div onClick={()=>(setDropdownVisible(true))}  className="flex w-full items-center rounded px-2 max-xl:w-full max-md:hidden visible  xl:w-[540px] border border-gray-300 bg-white">
        <button>
          <svg xmlns="http://www.w3.org/2000/svg" height={24} width={24} viewBox="0 0 512 512">
            <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/>
          </svg>
        </button>

        <input
          type="text"
          placeholder="Search for products"
        
            id="search"
         
            name="keyword"

          className="w-full text-lg px-4 py-2 border-none bg-inherit focus:border-none focus:shadow-none"
          style={{'boxShadow':'none'}}
          onChange={handleSearchChange}
          onKeyDown={handleKeyDown}
        />
        
      </div>
      
      {isDropdownVisible && (
        <div className="absolute z-[9999] overflow-y-scroll w-full mt-2 h-80 bg-white border border-gray-300 rounded shadow-lg">


          {showSuggestions && suggestedData.length > 0 && (
        <ul className="suggestions px-4 py-2">
          {suggestedData.map(data => (
            <li key={data.id}>
              <Link 
                to={`/product/${data.slug}`} 
                className="suggestion-item"
                onClick={()=>(setDropdownVisible(false))}
                state={{ fromSearchSuggestion: true }} // Pass the state
              >
              <div className='suggest_img flex items-center justify-between'>
                <img className='h-20' src={`${base_domain}${data.image}`} alt="" />
              
              
              
                {data.title}
              </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
        {noResults && suggestedData.length <= 0 &&(
          <div className='h-full flex justify-center items-center'>
            <h4 className='text-lg bng_font'>No Item Found !</h4>
          </div>
        )}
      {!showSuggestions && (
            <div className='h-full flex justify-center items-center'>
            <h4 className='text-lg'>Search Item...</h4>
          </div>
          
          )}

        </div>
      )}
    </div>

   

        {/* Right: User Login Button */}
        <div className="header_link flex gap-3">

           {/* Search icon for small screens */}
    <div className="md:hidden">
        <button
          type="button"
          className="flex items-center"
          data-bs-toggle="modal"
          data-bs-target="#searchModal"
        >
          <svg xmlns="http://www.w3.org/2000/svg" height={24} width={24} viewBox="0 0 512 512">
            <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/>
          </svg>
        </button>

        {/* Bootstrap Modal without backdrop */}
        <div
          className="modal fade"
          id="searchModal"
          tabIndex="-1"
          aria-labelledby="searchModalLabel"
          aria-hidden="true"
          data-bs-backdrop="false"  // Disables the backdrop
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="searchModalLabel">Search for products</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  placeholder="Search for products"
                  className="form-control"
                  onChange={handleSearchChange}
                />
                <div className="mt-4 overflow-y-scroll h-40">
                  {showSuggestions && suggestedData.length > 0 ? (
                    <ul className="list-group">
                      {suggestedData.map(data => (
                        <li key={data.id} className="list-group-item">
                          <Link
                            to={`/product/${data.slug}`}
                            className="suggestion-item"
                            onClick={() => document.querySelector('[data-bs-dismiss="modal"]').click()} // Close modal on selection
                            state={{ fromSearchSuggestion: true }}
                          >
                            <div className="suggest_img flex items-center justify-between">
                              <img className="h-20" src={`${base_domain}${data.image}`} alt="" />
                              {data.title}
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : noResults ? (
                    <div className='h-full flex justify-center items-center'>
                      <h4 className='text-lg bng_font'>No Item Found!</h4>
                    </div>
                  ) : (
                    <div className='h-full flex justify-center items-center'>
                      <h4 className='text-lg'>Search Item...</h4>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

        <Link to={'/dashboard/wishlist'}>
        <svg xmlns="http://www.w3.org/2000/svg" height={24} width={24} viewBox="0 0 512 512"><path d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8l0-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5l0 3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20-.1-.1s0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5l0 3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2l0-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z"/></svg>
        </Link>

        <Link to={'/compare/'} className="relative inline-flex items-center text-sm font-medium text-center rounded-full">

        <svg height={26} width={26} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.651 7.65a7.131 7.131 0 0 0-12.68 3.15M18.001 4v4h-4m-7.652 8.35a7.13 7.13 0 0 0 12.68-3.15M6 20v-4h4"/>
        </svg>
        <div  className="absolute inline-flex items-center justify-center w-5 h-5 text-xs  text-white bg-red-500 border-2 border-white font-normal rounded-full -top-3 -end-3 dark:border-gray-900">{Object.keys(compares || {}).length}</div>

        </Link>

                  
        <button type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions"  className="relative inline-flex items-center text-sm font-medium text-center rounded-full">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="24" 
              height="24">
          <path d="M253.3 35.1c6.1-11.8 1.5-26.3-10.2-32.4s-26.3-1.5-32.4 10.2L117.6 192 32 192c-17.7 0-32 14.3-32 32s14.3 32 32 32L83.9 463.5C91 492 116.6 512 146 512L430 512c29.4 0 55-20 62.1-48.5L544 256c17.7 0 32-14.3 32-32s-14.3-32-32-32l-85.6 0L365.3 12.9C359.2 1.2 344.7-3.4 332.9 2.7s-16.3 20.6-10.2 32.4L404.3 192l-232.6 0L253.3 35.1zM192 304l0 96c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-96c0-8.8 7.2-16 16-16s16 7.2 16 16zm96-16c8.8 0 16 7.2 16 16l0 96c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-96c0-8.8 7.2-16 16-16zm128 16l0 96c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-96c0-8.8 7.2-16 16-16s16 7.2 16 16z"/>
          </svg>
     
          <div  className="absolute inline-flex items-center justify-center w-5 h-5 text-xs  text-white bg-red-500 border-2 border-white font-normal rounded-full -top-3 -end-3 dark:border-gray-900">{cart.length}</div>
        </button>


        <Link to={isAuthenticated ? ('dashboard'):('login')}> 
          <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 448 512" 
              width="24" 
              height="24" // You can adjust the size as needed
          >
              <path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464l349.5 0c-8.9-63.3-63.3-112-129-112l-91.4 0c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304l91.4 0C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7L29.7 512C13.3 512 0 498.7 0 482.3z"/>
          </svg>
      </Link>

        </div>
      </div>

      <div className="container max-md:hidden visible">
        <ul className='flex items-center'>
        <li className="category-button">
                
        <div className="relative">
            {/* Button to toggle menu */}
            <div className="dropdown">
                <button
                    onClick={() => {setMenuOpen(!menuOpen)
                      setOpenCategory(null);
                      setOpenSubCategory(null);}
                    }
                    className="primary_bg text-white py-2.5 px-8 min-w-fit flex items-center gap-2 rounded-tl rounded-bl"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <rect x="3" y="3" width="7" height="7"></rect>
                        <rect x="14" y="3" width="7" height="7"></rect>
                        <rect x="14" y="14" width="7" height="7"></rect>
                        <rect x="3" y="14" width="7" height="7"></rect>
                    </svg>
                    <span>All Categories</span>
                </button>
            </div>

            {/* Category Dropdown */}
            <div className="relative">
  {menuOpen && (
    <ul className="absolute left-0 mt-2 bg-white text-black shadow-lg rounded-md w-64 p-2 z-10 max-h-96 overflow-y-auto">
      {categories.map((category) => (
        <li
          key={category.id}
          className="relative group"
          onMouseEnter={() => {
            setOpenCategory(category.id);
            setOpenSubCategory(null);
          }}
        >
          <Link
            to={`/category/${category.slug}`}
            onClick={() => {
              setMenuOpen(false);
              setOpenCategory(null);
              setOpenSubCategory(null);
            }}
            className="px-4 py-2 hover:bg-gray-200 flex items-center"
          >
            {category.title}
          </Link>
        </li>
      ))}
    </ul>
  )}

  {/* Subcategory Dropdown */}
  {openCategory && (
    <ul
      className={`absolute ${
        isSmallScreen ? 'top-full left-0' : 'left-64 top-[0.5rem]'
      } mt-0 w-48 bg-white text-black shadow-lg rounded-md max-h-60 overflow-y-auto z-20`}
    >
      {subCategories
        .filter((sub) => sub.category.id === openCategory)
        .map((sub) => (
          <li
            key={sub.id}
            className="relative group"
            onMouseEnter={() => setOpenSubCategory(sub.id)}
          >
            <Link
              to={`/category/${categories.find((c) => c.id === openCategory)?.slug}/${sub.slug}`}
              onClick={() => {
                setMenuOpen(false);
                setOpenCategory(null);
                setOpenSubCategory(null);
              }}
              className="block px-4 py-2 hover:bg-gray-200"
            >
              {sub.title}
            </Link>
          </li>
        ))}
    </ul>
  )}

  {/* Sub-Subcategory Dropdown */}
  {openSubCategory && (
    <ul
      className={`absolute ${
        isSmallScreen ? 'top-[9rem] left-0' : 'left-[28.1rem] top-[0.5rem]'
      } w-48 bg-white text-black shadow-lg rounded-md max-h-60 overflow-y-auto z-30`}
    >
      {subSubCategories
        .filter((subSub) => subSub.sub_category.id === openSubCategory)
        .map((subSub) => (
          <li key={subSub.id}>
            <Link
              to={`/category/${categories.find((c) => c.id === openCategory)?.slug}/${subCategories.find((s) => s.id === openSubCategory)?.slug}/${subSub.slug}`}
              onClick={() => {
                setMenuOpen(false);
                setOpenCategory(null);
                setOpenSubCategory(null);
              }}
              className="block px-4 py-2 hover:bg-gray-200"
            >
              {subSub.title}
            </Link>
          </li>
        ))}
    </ul>
  )}
</div>

            
        </div>       
    </li>
          
          <ul className='header-menu flex gap-4 bg-[#ecf6ee8a] backdrop-blur-2xl w-full py-2 !px-2.5 rounded-tr rounded-br'>
            <li><Link to={'/all-brands/'}>All Brands</Link></li>
            <li><Link to={'/all-shops/'}>All Shops</Link></li>
            <li><Link to={'send-requirements/'}>Send Requirement</Link></li>
            <li><Link to={'calculator/'}>Calculator</Link></li>
            <li><Link to={'blogs/'}>Blog</Link></li>
            <li><Link to={'become-vendor/'}>Become a Seller</Link></li>
          </ul>
        </ul>
      </div>

      {/* Mobile View: Search Bar */}
      {/* <div className="md:hidden max-md:!mt-2 mt-4">
        <input
          type="text"
          placeholder="Search..."
          className="w-full px-4 py-2 rounded-md border border-gray-300"
        />
      </div> */}
    </header>

    </>
  )
}
