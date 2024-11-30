import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export default function CategoryList() {

    const base_domain = import.meta.env.VITE_APP_SOURCE_DOMAIN;
    const [category, setCategory] = useState([])

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
  
  return (
    <>

            <ul className="px-2.5">
                {category.map((data, index)=>(
                  <li className="my-2.5 text-md" ><Link to={`/category/${data.slug}`} >{data.title}</Link></li>
                ))}
            
            </ul>

    </>
  )
}
