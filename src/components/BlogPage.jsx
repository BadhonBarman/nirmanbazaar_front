import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import TextShorter from './helpers/TextShorter';

export default function BlogPage() {

    document.title = "Blogs";

const base_domain = import.meta.env.VITE_APP_SOURCE_DOMAIN;
  const [Data, setData] = useState([])
  
  useEffect(() => {
    const fetchData = async () => {
    try {
        const response = await axios.post(`${base_domain}/vendor/all_blog/`);
        setData(response.data);
        console.log(response.data)
    }
    catch (error) {
        console.error(error);
    }
    };

    fetchData();
}, [base_domain]);




  return (
    <>
    <div className="section_title">
          <h4 className='text-2xl text-gray-800 font-medium'>Blogs</h4>
      </div>
      
    <div className='grid max-md:grid-cols-1 gap-3 grid-cols-4'>
    {Data.map((data, index)=>(
        <Link className='border border-gray-100 rounded p-2.5' key={index} to={`/blogs/${data.id}`}>
        <img
          className="w-full max-md:h-32 h-48 object-cover rounded-t-lg"
          src={`${base_domain}${data.thumbnail}`}
          alt={data.title}
        />
        <div className="product_card_text p-2">
          <h4 className="text-sm text-start font-medium">
            <TextShorter text={data.title} range={55} />
        
          </h4>
        </div>
      </Link>
    ))}
    </div>
    </>
  )
}
