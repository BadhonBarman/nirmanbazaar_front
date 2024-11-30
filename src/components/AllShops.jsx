import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';


export default function AllShops() {
  const base_domain = import.meta.env.VITE_APP_SOURCE_DOMAIN;
  document.title = "All Shop";

  const [brands, setBrands] = useState([])
  
  useEffect(() => {
    const banner_data = async () => {
    try {
        const response = await axios.post(`${base_domain}/all_shops/`);
        setBrands(response.data);
    }
    catch (error) {
        console.error(error);
    }
    };

    banner_data();
}, [base_domain]);


  

  return (
    <>
    <div className="grid max-sm:grid-cols-2 max-lg:grid-cols-3 grid-cols-6 gap-2 mt-8">
     {brands.map((data, index)=>(
       <Link key={data.id} className='w-full h-[102px] p-[20px] flex justify-center items-center bg-white rounded border border-gray-50 hover:shadow-md duration-75 ease-in-out' to={`/shop-page/${data.slug}`} >
          <img className='max-h-full max-w-full' src={`${base_domain}${data.logo}`} alt="" />
      </Link>
     ))}
      
    </div>
    </>
  )
}
