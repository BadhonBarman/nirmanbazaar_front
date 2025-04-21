import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import ProductCard from './sub-components/ProductCard';

export default function ShopPage() {
  const { slug } = useParams();
  const base_domain = import.meta.env.VITE_APP_SOURCE_DOMAIN;
  
  const [Products, setProducts] = useState([]);
  const [brandInfo, setBrand] = useState(null);
  const [TotalProducts, setTotal] = useState(0);

   const navigate = useNavigate();
   const location = useLocation();
   const queryParams = new URLSearchParams(location.search);
   const initialPage = parseInt(queryParams.get('page')) || 1;
   const [CurrentPage, setCurrentPage] = useState(initialPage);
   const productsPerPage = 8;
   const totalPages = Math.ceil(TotalProducts / productsPerPage);

   const initialKeyword = queryParams.get('q') || '';
  const [searchKeyword, setSearchKeyword] = useState(initialKeyword);
   
   useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(`${base_domain}/shop_products/`, {
          slug: slug,
          page: CurrentPage,
          items_per_page: productsPerPage,
          search:searchKeyword,
        });
        setProducts(response.data.products);
        setBrand(response.data.brand);
        setTotal(response.data.total_count);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [base_domain, slug, CurrentPage, totalPages, searchKeyword]);


    // Get the current page from the URL or default to 1

    useEffect(() => {
          // Update the URL whenever the page changes
          if (CurrentPage > totalPages){
            setCurrentPage(1)
          }
          else if(CurrentPage===1){
            return
          }
          else{
            queryParams.set('page', CurrentPage);
          }
          navigate(`${location.pathname}?${queryParams.toString()}`, { replace: true });
    }, [CurrentPage, navigate, location.pathname, Products]);
        
    

       // Update URL whenever the search keyword changes
      useEffect(() => {
        if (searchKeyword) {
          queryParams.set('q', searchKeyword);
        } else {
          queryParams.delete('q');
        }
        navigate(`${location.pathname}?${queryParams.toString()}`, { replace: true });
      }, [searchKeyword, navigate, location.pathname]);

      const handleSearch = (e) => {
        setSearchKeyword(e.target.value);
      }; 
      

  
  const handlePrevPage = () => {
    if (CurrentPage > 1) setCurrentPage(CurrentPage - 1);
  };

  const handleNextPage = () => {
    if (CurrentPage < totalPages) setCurrentPage(CurrentPage + 1);
  };

  return (
    <div className="mt-4">
      <div className="row">
        <div className="col-md-3">
          <div className='border-gray-200 rounded-md p-4 border'>
            <img className='h-[48px]' src={`${base_domain}${brandInfo?.logo}`} alt="" />
            <h4 className='text-lg font-bold mt-2'>{brandInfo?.name}</h4>
          </div>
        </div>
        <div className="col-md-9">
          <div className="py-8 px-4 flex justify-between items-center rounded bg-gray-100">
            <h2 className='font-semibold text-gray-800 text-2xl'>
              {brandInfo?.name?.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase())}
            </h2>
            <input type="text" placeholder={`Search ${brandInfo?.name}`} value={searchKeyword} 
        onChange={handleSearch}  className='rounded' />
          </div>
          <div className="row py-4">
            <div className="col-md-3">
              <p className='text-md'><span className='font-semibold'>{TotalProducts}</span> Products Found</p>
            </div>
          </div>
          <div className="grid gap-2.5 max-md:grid-cols-2 grid-cols-4">
            {Products.map((data, index) => (
              <ProductCard key={index} data={data} />
            ))}
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
    </div>
  );
}
