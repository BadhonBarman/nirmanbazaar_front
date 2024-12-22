import React, { useEffect, useState } from 'react'
import publicapi from '../features/PublicApiCall';
import { Link } from 'react-router-dom';

export default function Experthire() {
    const base_domain = import.meta.env.VITE_APP_SOURCE_DOMAIN
    const [Data, setData] = useState([])
    useEffect(() => {
        const fetchData = async () => {
          try {
            
              const response = await publicapi.post(`/expert_category/`);
              console.log(response.data);
                setData(response.data)
          } catch (error) {
            console.error('Error fetching product data:', error);
          }
        };
    
        fetchData();
      }, [base_domain]);

  return (
    <>
      <div className="w-full">
        <div className="flex flex-col items-center justify-center text-center h-fit bg-gray-100 p-4 rounded-md">
          <div className="mb-6">
            <h4 className="text-2xl md:text-4xl font-bold mb-4">
              Simplify Your Life
            </h4>
            <p className="text-lg md:text-xl text-gray-600">
              Explore and access the services you need, all in one place.
            </p>
          </div>
          <div className="flex w-full max-w-lg items-center border border-gray-300 rounded-md overflow-hidden">
            <input
              type="text"
              placeholder="Search for services..."
              className="flex-grow p-2.5 text-gray-700 outline-none border-none"
            />
            <button className="primary_bg text-white px-4 py-2.5">Search</button>
          </div>
        </div>
      </div>

    <div>
        <h4 className='mt-4 text-xl'>Featured Services</h4>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 mt-2'>
            {Data.map((data,index)=>(
                <Link to={`/expert-hire/${data.slug}`} className='p-4 border text-center border-gray-200 rounded-md'>
                        <img className='m-auto' height={68} width={68} src={`${base_domain}${data.icon}`} alt="" />
                        <h6 className='mt-2.5 text-base'>{data.title}</h6>
                </Link>
            ))}
        </div>
    </div>

    </>
  );
}
