import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ProductCard from './sub-components/ProductCard';
import axios from 'axios';

export default function SearchPage() {
    const {keyword} = useParams()
    document.title = `Search - ${keyword}`
    const base_domain = import.meta.env.VITE_APP_SOURCE_DOMAIN;
    const [products, setProducts] = useState([])
    
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.post(`${base_domain}/search_products/`,{
              slug:keyword,
            });
    
            setProducts(response.data);
            console.log("search products", response.data);
          } catch (error) {
            setProducts([]);
          }
        };
    
        fetchData();
      }, [keyword]);


    return (
    <>
    <div className="container">
        <h2 className='text-2xl font-medium'>Search Results For: <span>{keyword}</span></h2>
        <p className='text-sm text-gray-500'>Total Items Found: <span className='font-semibold'>{products.length}</span></p>

        {products.length > 0 ? (
            <div className="grid gap-2.5 grid-cols-5 max-sm:grid-cols-2 max-md:grid-cols-3 max-lg:grid-cols-3 mt-4">
            {products.map((data, index) => (
                <ProductCard data={data} key={index} />
            ))}
        </div>
        ):(
            <div className="flex justify-center items-center mt-4">
                <h2 className='text-xl alert alert-warning w-full text-center'>No Products Found!</h2>
            </div>
        )}

    </div>
    </>
  )
}
