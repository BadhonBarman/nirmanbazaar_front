import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ReactSlider from 'react-slider';

export default function CategoryPage() {
    const base_domain = import.meta.env.VITE_APP_SOURCE_DOMAIN;
    const {category} = useParams()
    const [CategoryName, setCategoryName] = useState(category)
    const [Products, setProducts] = useState([])
    const [TotalProducts, setTotal] = useState(0)
    
    const [range, setRange] = useState([0, 100]);

    useEffect(()=>{
            const fetchData = async () => {
                try {
                    const response = await axios.post(`${base_domain}/category_items/`, {
                        slug:category,
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
    }, [base_domain, window.location.pathname])

    const handleSliderChange = (value) => {
        setRange(value);
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
                <h2 className='font-semibold text-gray-800 text-2xl'>
                    {CategoryName.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase())}
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
            <div className="row">
                {Products.length === 0 ? (<p className='m-auto w-full text-center border border-gray-100 py-4 rounded'>No Product Found !</p>):(Products.map((data, index)=>(
                    <div key={data.id} className="col-md-3 px-1">
                        <div className="product_card h-[318px] border border-gray-100 rounded-lg">
                            <Link to={`/product/${data.slug}`}>
                                <img className='w-full rounded-lg rounded-b-none' src={`${base_domain}${data.image}`} alt="" />

                                <div className="product_card_text p-2">
                                <h4 className='text-sm text-center font-medium'>{data.title}</h4>
                                <p className='text-md font-medium text-end mt-2'>{data.price} tk</p>
                                </div>
                            </Link>
                            
                        </div>
                                
                    </div>
                )))}
            </div>
        </div>
    </div>
    </>
  )
}
