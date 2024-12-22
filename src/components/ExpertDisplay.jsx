import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

export default function ExpertDisplay() {
    const {slug} = useParams()
    const base_domain = import.meta.env.VITE_APP_SOURCE_DOMAIN;

    const [services, setServices] = useState([]);
    

    useEffect(() => {
    
        const fetchProductData = async () => {
          try {
            const response = await axios.post(`${base_domain}/services_display/`, {
              slug: slug,
            });
            setServices(response.data);
            console.log(response.data);
          } catch (error) {
            console.error(error);
          }
        };
        fetchProductData();
      }, [base_domain, slug])
    


  return (
    <>

    <div>
        <div className="row">
            <div className="col-md-3">

                <h4 className='text-md font-semibold'>Filter By</h4>
                <div  className="flex items-center mb-2">
                        <svg  className="w-3.5 h-3.5 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                        </svg>
                        <svg  className="w-3.5 h-3.5 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                        </svg>
                        <svg  className="w-3.5 h-3.5 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                        </svg>
                        <svg  className="w-3.5 h-3.5 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                        </svg>
                        <svg  className="w-3.5 h-3.5 text-gray-300 me-1 dark:text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                        </svg>
                        <p  className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">4.95</p>
                        <p  className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">(3,400 reviews)</p>
                </div>

            </div>
            <div className="col-md-9">

            <div className="py-8 px-4 flex justify-between items-center rounded bg-gray-100">
                <h2 className='font-semibold text-gray-800 text-2xl'>
                    {slug.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase())}
                </h2>
{/* 
                <input type="text"  className='rounded' /> */}
            </div>

            <div className="row py-4">
                <div className="col-md-3">
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

            <div className="grid gap-2.5 max-md:grid-cols-2 grid-cols-3">
                        {services.map((data, index)=>(
                        <Link className='' to={`${data.slug}/`} key={data.id}>
                            <div className='flex gap-2.5 w-full border border-gray-200 p-2.5'>
                                <img height={80} width={80} className='rounded-sm' src={`${base_domain}${data.thumbnail}`} alt="" />
                                <div>
                                    <h4 className='text-md font-medium'>{data.title}</h4>
                                    <p className='text-sm'>{data.price} TK</p>
                                </div>
                            </div>
                        </Link>
                    ))}
            </div>

            </div>
        </div>
        
    </div>
    
    </>
  )
}
