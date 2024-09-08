import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'


export default function Header() {

    const base_domain = import.meta.env.VITE_APP_SOURCE_DOMAIN;
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const [cart, setCart] = useState([])
    const [category, setCategory] = useState([])

    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    
    const [noResults, setNoResults] = useState(false);
    const [searchKeyword, setSearchKeyword] = useState(null);
    const [suggestedData, setSuggestedData] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
  

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
            setCart(response.data);
            console.log(response.data);
          } else {
            console.log('No cart data found in localStorage');
          }
        } catch (error) {
          console.error('Error fetching product data:', error);
        }
      };
  
      fetchProductData();
    }, [base_domain]);

    useEffect(() => {
      const categoryData = async () => {
      try {
          const response = await axios.get(`${base_domain}/categories/`);
          setCategory(response.data);
      }
      catch (error) {
          console.error(error);
      }
      };

      categoryData();
  }, [base_domain]);

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
      <div className="offcanvas-body">
        {cart.length === 0 ? (<div className='flex h-full items-center justify-center'><p>Your shopping cart is empty!</p></div>):(
        <ul>
          {cart.map((data, index)=>(
            <li key={data.id}>
             <Link to={`product/${data.slug}`} className='flex items-center mb-2'>
              <img  height={64} width={64} className='rounded-sm' src={`${base_domain}${data.image}`} alt="" />
                <div className='pl-2'>
                  <h4 className='text-sm'>{data.title}</h4>
                  {data.offer_price ? (<h6 className='text-sm text-gray-800 font-semibold'><del className='text-gray-400'>৳{data.price}</del> ৳{data.offer_price} </h6>):(<h6 className='text-sm text-gray-800 font-semibold'>৳ {data.price}</h6>)}
                </div>
             </Link>
            </li>
          ))}
        </ul>
         )}
      </div>
    </div>
    
    <header className="py-2 w-full px-3 border-b border-gray-200 pb-3 sticky top-0 backdrop:blur-lg bg-[#fffffff2] z-[999]">
      <div className="container py-2 flex justify-between items-center">
        {/* Left: Logo */}
        <div className="text-gray-800 text-lg font-bold">
          
       <Link to={'/'}>
       <svg xmlns="http://www.w3.org/2000/svg" width="137"  height="28" viewBox="0 0 137 28" className='fill-black'>
          <g id="Group 808">
          <path id="Union" fillRule="evenodd" clipRule="evenodd" d="M19.05 22.7867C22.7002 20.6792 24.5566 16.6579 24.0834 12.722L20.4589 14.8146C20.1973 16.7645 19.0665 18.5762 17.2309 19.636C14.0882 21.4505 10.0695 20.3737 8.25507 17.2309C6.4406 14.0882 7.51741 10.0696 10.6601 8.25509C13.1378 6.82462 16.1598 7.19116 18.2171 8.9503L12.6254 12.1787L11.7302 16.9392L20.2325 12.0304L22.6289 10.6468L23.4362 10.1807C23.255 9.72561 23.0388 9.27792 22.7867 8.84114C19.9676 3.95832 13.7239 2.28534 8.84112 5.10444C3.95828 7.92355 2.28533 14.1672 5.10442 19.05C7.92352 23.9328 14.1671 25.6058 19.05 22.7867Z" fill=""/>
          <path id="Subtract" fillRule="evenodd" clipRule="evenodd" d="M116.866 6.59013V15.489C116.866 16.7933 116.373 17.9032 115.372 18.8798C114.369 19.8263 113.259 20.2781 111.946 20.2781C110.628 20.2781 109.487 19.8229 108.487 18.8798C107.494 17.911 107.026 16.804 107.026 15.489V4.22456L103.005 6.54606V15.2046C103.005 17.7176 103.849 19.8653 105.522 21.5629L105.524 21.5657L105.527 21.5685C107.235 23.2652 109.381 24.1291 111.946 24.1291C114.508 24.1291 116.657 23.2669 118.335 21.5657C120.043 19.8669 120.887 17.7169 120.887 15.2046V4.26863L116.866 6.59013ZM47.9885 16.8971L47.2093 18.5088L47.1992 18.527C46.1704 20.3799 44.838 21.7915 43.1947 22.7315C41.5516 23.6714 39.6424 24.1142 37.5 24.0975L37.497 24.0975C34.6103 24.0636 32.1219 23.0741 30.0357 21.1448C27.9374 19.2043 26.8801 16.8012 26.8452 14.0129C26.8102 11.186 27.8355 8.78087 29.9289 6.77699L29.9312 6.77484L29.9334 6.77272C32.0454 4.78419 34.5653 3.72347 37.4953 3.68909C39.5942 3.65537 41.5532 4.20277 43.3581 5.28399L43.3621 5.28641L43.3661 5.28887C45.0537 6.32815 46.3391 7.63168 47.0947 9.278L47.0956 9.27992L47.9231 11.1107H43.5308L43.3101 10.7459C42.0519 8.66659 40.1877 7.59799 37.5884 7.53991C35.8898 7.5124 34.3893 8.09152 32.9948 9.3624L32.9921 9.36482L32.9895 9.36722C31.5477 10.6562 30.8661 12.1678 30.8661 13.9091C30.8661 15.6587 31.5228 17.1473 32.8474 18.4381C34.1666 19.6925 35.7242 20.3065 37.5263 20.2782L37.5282 20.2782L37.53 20.2781C40.1787 20.2492 42.0728 19.2277 43.354 17.2435L43.5777 16.8971H47.9885ZM59.5057 3.75275C62.2646 3.85473 64.6625 4.88289 66.588 6.89255C68.5037 8.86009 69.4887 11.2211 69.4887 13.9407C69.4887 16.7356 68.4292 19.1654 66.3445 21.1948C64.2876 23.197 61.782 24.1987 58.9015 24.0972C56.1374 24.0281 53.7398 22.9974 51.8161 21.0227C49.8943 19.0499 48.9457 16.6862 48.9457 13.9723C48.9457 11.1526 50.0001 8.69041 52.0551 6.68885C54.1139 4.65181 56.6234 3.6501 59.5057 3.75275ZM58.9885 20.2471L58.9937 20.2473C60.8177 20.3319 62.3212 19.7523 63.5957 18.4271L63.5986 18.424L63.6016 18.421C64.9236 17.0769 65.5281 15.5603 65.5004 13.7694C65.4405 12.0621 64.8039 10.6246 63.6005 9.39601C62.4111 8.18173 61.0186 7.60325 59.347 7.60325H59.3408L59.3346 7.60315C57.5725 7.57503 56.1124 8.18333 54.8537 9.40862C53.6017 10.6274 52.9959 12.0537 52.9665 13.7948C52.9372 15.5095 53.4882 16.9995 54.6834 18.2764C55.8807 19.5557 57.2799 20.1907 58.9833 20.2469L58.9885 20.2471ZM100.231 23.6868H96.1451V11.8868C96.1451 10.6511 95.7736 9.61807 95.0802 8.78109C94.4177 7.98144 93.5346 7.57165 92.4264 7.57165C91.2534 7.57165 90.2627 7.94503 89.3926 8.68112C88.5851 9.39057 88.1883 10.2623 88.1883 11.3496V23.6868H84.07V11.3496C84.07 10.2622 83.6737 9.39367 82.838 8.68505L82.8333 8.6811L82.8287 8.67706C81.9959 7.94741 81.009 7.57165 79.832 7.57165C78.7303 7.57165 77.8772 7.97653 77.2106 8.78109C76.5236 9.61037 76.1782 10.6085 76.1782 11.8868V23.6868H72.0923V12.1712C72.0923 9.78662 72.7855 7.75587 74.2788 6.22909C75.656 4.78446 77.4628 3.98908 79.6396 3.81791C81.1179 3.69678 82.4764 3.94775 83.6899 4.58313C84.6088 5.06429 85.4199 5.75283 86.1292 6.62587C86.8384 5.75283 87.6495 5.06429 88.5684 4.58313C89.7819 3.94775 91.1404 3.69678 92.6187 3.81791C94.799 3.98935 96.6018 4.78623 98.0083 6.22521C99.4989 7.74706 100.231 9.77562 100.231 12.1712V23.6868ZM127.829 16.8655V18.2064C127.829 18.5162 128.018 18.9689 128.645 19.5787C129.21 20.1295 129.76 20.3315 130.282 20.3103L130.286 20.3102L130.29 20.3101C131.191 20.2826 131.798 20.0432 132.243 19.6103C132.62 19.2435 132.836 18.719 132.864 17.9645C132.876 17.3487 132.705 16.8828 132.387 16.5125C132.058 16.1285 131.52 15.7881 130.7 15.5312L130.698 15.5305L128.528 14.8685C127.276 14.4854 126.263 13.8572 125.552 12.9586C124.841 12.0597 124.479 10.9479 124.425 9.67432C124.351 8.07452 124.921 6.6732 126.075 5.54904L126.08 5.54488L126.084 5.54079C127.251 4.44017 128.658 3.82509 130.31 3.75306C131.786 3.68001 133.134 4.16601 134.329 5.11685C135.583 6.0879 136.282 7.31418 136.396 8.79796L136.396 8.80391L136.477 10.1311H132.312V8.97975C132.312 8.61901 132.134 8.29437 131.786 8.03741C131.431 7.77541 130.918 7.60506 130.355 7.60326C129.338 7.63045 128.533 8.38232 128.51 9.34415L128.51 9.36278L128.508 9.38137C128.473 9.85003 128.598 10.2084 128.858 10.5083C129.135 10.827 129.61 11.1307 130.36 11.3738L132.505 12.0699L132.508 12.0708C133.846 12.5165 134.928 13.1946 135.699 14.1287C136.471 15.065 136.89 16.2099 136.98 17.5208C137.128 19.3703 136.443 21.0044 134.993 22.3456L134.989 22.3489L134.985 22.3523C133.543 23.651 131.85 24.2665 129.945 24.1595L129.944 24.1594L129.942 24.1593C128.178 24.0519 126.702 23.3283 125.508 22.0955L125.504 22.0914L125.5 22.0872C124.329 20.8398 123.743 19.3326 123.743 17.6061V16.8655H127.829Z" />
          </g>
        </svg>
       </Link>

        </div>

        {/* Middle: Search Bar */}
         
        <div className="relative">
      <div onClick={()=>(setDropdownVisible(true))} onBlur={()=>(setDropdownVisible(false))} className="flex w-full items-center rounded px-2 max-xl:w-full max-md:hidden visible  xl:w-[540px] border border-gray-300 bg-white">
        <svg xmlns="http://www.w3.org/2000/svg" height={24} width={24} viewBox="0 0 512 512">
          <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/>
        </svg>
        <input
          type="text"
          placeholder="Search for products"
        
            id="search"
         
            name="keyword"

          className="w-full text-lg px-4 py-2 border-none bg-inherit focus:border-none focus:shadow-none"
          style={{'boxShadow':'none'}}
          onChange={handleSearchChange}
        />
      </div>
      
      {isDropdownVisible && (
        <div className="absolute z-[9999] w-full mt-2 h-80 bg-white border border-gray-300 rounded shadow-lg">


          {showSuggestions && suggestedData.length > 0 && (
        <ul className="suggestions">
          {suggestedData.map(data => (
            <li key={data.id} className="flex items-center justify-between">
              <div className='suggest_img'>
                <img className='h-20' src={`${base_domain}${data.image}`} alt="" />
              </div>
              
              <Link 
                to={`/product/${data.slug}`} 
                className="suggestion-item"
              >
                {data.title}
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

        <Link to={'/dashboard/wishlist'}>
        <svg xmlns="http://www.w3.org/2000/svg" height={24} width={24} viewBox="0 0 512 512"><path d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8l0-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5l0 3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20-.1-.1s0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5l0 3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2l0-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z"/></svg>
        </Link>

        <Link to={'/dashboard/wishlist'}>

        <svg height={26} width={26} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.651 7.65a7.131 7.131 0 0 0-12.68 3.15M18.001 4v4h-4m-7.652 8.35a7.13 7.13 0 0 0 12.68-3.15M6 20v-4h4"/>
        </svg>

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
        <ul className='flex gap-4 items-center'>
          <li>
         
          <div className="dropdown">
          <button data-bs-toggle="dropdown" aria-expanded="false" className='primary_bg text-white py-2.5 px-8 flex items-center gap-2 rounded'>
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                                 <rect x="3" y="3" width="7" height="7"></rect>
                                 <rect x="14" y="3" width="7" height="7"></rect>
                                 <rect x="14" y="14" width="7" height="7"></rect>
                                 <rect x="3" y="14" width="7" height="7"></rect>
                              </svg> <span>All Categories</span>
            </button>
            <ul className="dropdown-menu">
              {category.map((data, index)=>(
                <li><Link className="dropdown-item" to={`category/${data.slug}`} >{data.title}</Link></li>
              ))}
          
            </ul>
          </div>
          </li>
          

          <li><Link>Home</Link></li>
          <li><Link>Flash Sale</Link></li>
          <li><Link>Brands & Store</Link></li>
        </ul>
      </div>

      {/* Mobile View: Search Bar */}
      <div className="md:hidden max-md:!mt-2 mt-4">
        <input
          type="text"
          placeholder="Search..."
          className="w-full px-4 py-2 rounded-md border border-gray-300"
        />
      </div>
    </header>

    </>
  )
}
