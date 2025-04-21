import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import ReactSlider from 'react-slider';

export default function CategoryPage() {
    const base_domain = import.meta.env.VITE_APP_SOURCE_DOMAIN;
    const {category, sub, subsub} = useParams()
    const [CategoryName, setCategoryName] = useState("")
    const [SubCategoryName, setSubCategoryName] = useState("")
    const [SubSubCategoryName, setSubSubCategoryName] = useState("")
    const [Products, setProducts] = useState([])
    const [TotalProducts, setTotal] = useState(0)

   const navigate = useNavigate();
      const location = useLocation();
      const queryParams = new URLSearchParams(location.search);
      const initialPage = parseInt(queryParams.get('page')) || 1;
      const [CurrentPage, setCurrentPage] = useState(initialPage);
      const productsPerPage = 8;
      const totalPages = Math.ceil(TotalProducts / productsPerPage);

    
    const [range, setRange] = useState([0, 100]);

    useEffect(()=>{
            const fetchData = async () => {
                try {
                    const response = await axios.post(`${base_domain}/category_items/`, {
                        slug:category,
                        sub:sub,
                        subsub:subsub,
                        page: CurrentPage,
                        items_per_page: productsPerPage,
                    });
                    console.log(response.data)
                    setProducts(response.data.products);
                    setTotal(response.data.total_count);
                }
                catch (error) {
                    console.error(error);
                }
            }
    fetchData()
    }, [base_domain,category, sub,subsub, CurrentPage ,window.location.pathname])


    
        useEffect(() => {
          // Check if CurrentPage exceeds totalPages and reset to 1 if needed
          if (CurrentPage > totalPages) {
            setCurrentPage(1);
            return;
          }
          
          // Update the URL based on the current page
          if (CurrentPage === 1) {
            navigate(location.pathname, { replace: true }); // Remove the page parameter for the first page
          } else {
            queryParams.set('page', CurrentPage);
            navigate(`${location.pathname}?${queryParams.toString()}`, { replace: true });
          }
        }, [CurrentPage, totalPages, navigate, location.pathname]);
        
          
            

    const handleSliderChange = (value) => {
        setRange(value);
      };


  const handlePrevPage = () => {
    if (CurrentPage > 1) setCurrentPage(CurrentPage - 1);
  };

  const handleNextPage = () => {
    if (CurrentPage < totalPages) setCurrentPage(CurrentPage + 1);
  };

    const fill_start = (
        <svg class="w-4 h-4 ms-1 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"></path>
        </svg>
    )

    const blank_start = (
        <svg class="w-4 h-4 ms-1 text-gray-300 dark:text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"></path>
        </svg>
    )


    useEffect(()=>{
        setCategoryName(category)
        setSubCategoryName(sub)
        setSubSubCategoryName(subsub)
    }, [category, sub, subsub])
    
    document.title = CategoryName.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase())

   
  return (
    <>
    <div className="row mt-2.5">
        <div className="col-md-3">
            <div className="filter_sidebar">

               <div>
                    <h4 className='font-medium py-3'>Price Range</h4>
                    <div className="dual-range-slider">
                        <ReactSlider
                            className="horizontal-slider"
                            thumbClassName="slider-thumb"
                            trackClassName="slider-track"
                            min={0}
                            max={100}
                            value={range}
                            onChange={handleSliderChange}
                            minDistance={1}  // Ensure min and max don't overlap
                            withTracks={true}
                            pearling={true}  // Allows you to drag both handles together
                            renderThumb={(props, state) => <div className='shadow-sm' {...props}></div>}  // Display value inside the thumb
                        />
                        <p> Price: {range[0]} - {range[1]} </p>
                    </div>
               </div>
                
                <div className='mt-4'>
                    <h4 className='font-medium py-3'>Rating</h4>
                    
                    <div className='flex my-2 items-center'>
                        <input id='five' type="checkbox" className='rounded-sm h-4 w-4 mr-1 shadow_none focus:!accent-pink-500' />

                        <label htmlFor="five">
                            <ul className='flex items-center'>
                                <li>{fill_start}</li>
                                <li>{fill_start}</li>
                                <li>{fill_start}</li>
                                <li>{fill_start}</li>
                                <li>{fill_start}</li>
                            </ul>
                        </label>
                    </div>

                    <div className='flex my-2 items-center'>
                        <input type="checkbox" id='four' className='rounded-sm h-4 w-4 mr-1 shadow_none focus:!accent-pink-500' />

                        <label htmlFor="four">
                            <ul className='flex items-center'>
                                <li>{fill_start}</li>
                                <li>{fill_start}</li>
                                <li>{fill_start}</li>
                                <li>{fill_start}</li>
                                <li>{blank_start}</li>
                            </ul>
                        </label>
                    </div>

                    <div className='flex my-2 items-center'>
                        <input type="checkbox" id='three' className='rounded-sm h-4 w-4 mr-1 shadow_none focus:!accent-pink-500' />

                        <label htmlFor="three">
                            <ul className='flex items-center'>
                                <li>{fill_start}</li>
                                <li>{fill_start}</li>
                                <li>{fill_start}</li>
                                <li>{blank_start}</li>
                                <li>{blank_start}</li>
                            </ul>
                        </label>
                    </div>

                    <div className='flex items-center'>
                        <input type="checkbox" id='two' className='rounded-sm h-4 w-4 mr-1 shadow_none focus:!accent-pink-500' />

                        <label htmlFor="two">
                            <ul className='flex my-2 items-center'>
                                <li>{fill_start}</li>
                                <li>{fill_start}</li>
                                <li>{blank_start}</li>
                                <li>{blank_start}</li>
                                <li>{blank_start}</li>
                            </ul>
                        </label>
                    </div>

                    <div className='flex my-2 items-center'>
                        <input type="checkbox" id='one' className='rounded-sm h-4 w-4 mr-1 shadow_none focus:!accent-pink-500' />
                        <label htmlFor="one">
                            <ul className='flex items-center'>
                                <li>{fill_start}</li>
                                <li>{blank_start}</li>
                                <li>{blank_start}</li>
                                <li>{blank_start}</li>
                                <li>{blank_start}</li>
                            </ul>
                        </label>
                    </div>
                    
                </div>

            </div>
        </div>

        <div className="col-md-9">
            <div className="py-8 px-4 rounded bg-gray-100">
                <h2 className='font-semibold text-gray-800 text-lg lg:text-2xl flex items-center gap-2 lg:gap-2.5'>
                    {CategoryName.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase())} 
                    
                    {SubCategoryName && 
                    <>
                        <span>
                            <svg className='h-4' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
                        </span>
                        {SubCategoryName.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase())}
                        </>
                    }

                    {SubSubCategoryName && 
                        <>
                        <span>
                            <svg className='h-4' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
                        </span>
                        {SubSubCategoryName.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase())}
                        </>
                    }
                </h2>
            </div>
            <div className="row py-4">
                <div className="col-md-3">
                    <p className='text-md'><span className='font-semibold'>{TotalProducts}</span> Products Found</p>
                </div>
                <div className="col-md-9">
                    <div className="flex justify-end items-center">
                        
                        <select className='rounded-md' name="sorting" id="sorting">
                            <option value="featured">Sort by: Newest</option>
                            <option value="featured">Sort by: Oldest</option>
                            <option value="featured">Price: Low to High</option>
                            <option value="featured">Price: High to Low</option>
                            <option value="featured">Avg. Rating</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                {Products.length === 0 ? (<p className='m-auto w-full text-center border border-gray-100 py-4 rounded'>No Product Found !</p>):(Products.map((data, index)=>(
                    <div key={data.id} className="">
                        <div className="product_card h-[318px] border border-gray-100 rounded-lg">
                            <Link to={`/product/${data.slug}`}>
                                <img className='w-full max-md:h-32 !h-48 object-cover rounded-lg' src={`${base_domain}${data.image}`} alt="" />

                                <div className="product_card_text p-2">
                                <h4 className='text-sm text-start font-medium'>{data.title}</h4>
                                {data.price > 0 ? (
                    <p className="text-md font-medium text-right mt-2 text-green-500">{data.price} tk</p>
                  ):(<p className="text-md font-medium text-right mt-2 text-red-500">TBA</p>)}
                                </div>
                            </Link>
                            
                        </div>
                                
                    </div>
                )))}
            </div>

            {/* Pagination */}
          <div className="flex justify-center mt-6">
            <button onClick={handlePrevPage} disabled={CurrentPage === 1} className="p-3.5 mx-1 bg-gray-300 rounded-full disabled:opacity-50">
                <svg className='h-4 w-4' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/></svg>
            </button>
            <span className="px-4 py-2 mx-2">Page {CurrentPage} of {totalPages}</span>
            <button onClick={handleNextPage} disabled={CurrentPage === totalPages} className="p-3.5 mx-1 bg-gray-300 rounded-full disabled:opacity-50">
                <svg className='h-4 w-4' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
            </button>
          </div>
          
        </div>
    </div>
    </>
  )
}
