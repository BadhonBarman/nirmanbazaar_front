import React, { useEffect, useState, useRef } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import axios from 'axios'
import Footer from './sub-components/Footer';
import Header from './sub-components/Header';

import LandingCalculator from './LandingCalculator';
import { toast } from 'react-toastify';
import DisplayType1 from './sub-components/DisplayType1';
import ProductCard from './sub-components/ProductCard';

export default function Home() {

    const base_domain = import.meta.env.VITE_APP_SOURCE_DOMAIN;
    document.title = 'NimanBazaar BD'

    const [banners, setBanners] = useState([])
    const [promo, setPromo] = useState([])
    const [category, setCategory] = useState([])
    const [products, setProducts] = useState([])
    const [flashSaleProducts, setFlashSaleProducts] = useState([]);
    const [productCount, setProductCount] = useState(10);
    const [numProducts, setNumProducts] = useState(10);
    const [loading, setLoading] = useState(false);

    const productSectionRef = useRef(null);

    const handleLoadMore = () => {
        if (numProducts < 20) {
            setNumProducts(numProducts + 10);
        }
    };

    const handleLoadNewProducts = () => {
        setNumProducts(10);
        if (productSectionRef.current) {
            productSectionRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        const banner_data = async () => {
        try {
            const response = await axios.get(`${base_domain}/banners/`);
            setBanners(response.data);
        }
        catch (error) {
            console.error(error);
        }
        };

        banner_data();
    }, [base_domain]);


    useEffect(() => {
      const promo_data = async () => {
      try {
          const response = await axios.post(`${base_domain}/promo_banners/`);
          setPromo(response.data);
          console.log(response.data)
      }
      catch (error) {
          console.error(error);
      }
      };

      promo_data();
  }, [base_domain]);



    useEffect(() => {
        const banner_data = async () => {
        try {
            const response = await axios.get(`${base_domain}/categories/`);
            setCategory(response.data);
        }
        catch (error) {
            console.error(error);
        }
        };

        banner_data();
    }, [base_domain]);

    useEffect(() => {
      const banner_data = async () => {
      try {
          const response = await axios.post(`${base_domain}/product_display/`);
          setProducts(response.data);
      }
      catch (error) {
          console.error(error);
      }
      };

      banner_data();
  }, [base_domain]);

    useEffect(() => {
        const fetchFlashSaleProducts = async () => {
            try {
                const response = await axios.post(`${base_domain}/flash_sale/`);
                setFlashSaleProducts(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchFlashSaleProducts();
    }, [base_domain]);

    useEffect(() => {
        fetchProducts(numProducts);
    }, [numProducts]);

    const fetchProducts = async (count) => {
        setLoading(true);
        try {
            const response = await axios.post(`${base_domain}/product_display/`, { num_products: count });
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };


  


  return (
    <>



  <div className="landing_content grid max-md:grid-cols-1 grid-cols-3 gap-1.5">
      
          <div id="carouselExampleFade" className="carousel col-span-2 slide carousel-fade hero_slider" data-bs-ride="carousel" data-bs-interval="3000">
            <div className="carousel-inner">

            {banners.map((banner, index) => (
              <div   key={banner.id} className={`w-full carousel-item ${index === 0 ? 'active' : ''}`}>
                <img src={`${base_domain}${banner.image}`} className="h-[344px] max-md:h-auto w-[988px] m-auto d-block" alt={banner.altText || "Banner image"} />
              </div>
            ))}
            
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
            <div className="time-bar-container">
              <div className="time-bar"></div>
            </div>
          </div>
          <div className='border border-gray-200 rounded'>
            <LandingCalculator/>
          </div>
  </div>
          
  <div className="section">
       
      <div className="section_title mb-2.5">
          <h4 className='text-2xl text-white px-3.5 py-1.5 rounded-sm bg-gradient-to-r from-yellow-400 to-yellow-200 font-medium'>Featured Categories</h4>
      </div>
        
        

          <div className="grid gap-2 max-md:grid-cols-2 grid-cols-4">
            <Link  to={'/category/building-materials'} className='rounded overflow-hidden'>
              <img src="/images/1.jpg" alt="" />
            </Link>

            <Link to={'/category/construction-services'} className='rounded overflow-hidden'>
              <img src="/images/2.jpg" alt="" />
            </Link>

            <Link to={'/category/building-maintenance-management'} className='rounded overflow-hidden'>
              <img src="/images/3.jpg" alt="" />
            </Link>

            <Link to={'/category/gardening'} className='rounded overflow-hidden'>
              <img src="/images/4.jpg" alt="" />
            </Link>

            <Link to={'/category/industrial-accessories'} className='rounded overflow-hidden'>
              <img src="/images/5.jpg" alt="" />
            </Link>

            <Link to={'/expert-hire'} className='rounded overflow-hidden'>
              <img src="/images/6.jpg" alt="" />
            </Link>

            <Link  to={'/category/heavy-equipment-buy-rent'} className='rounded overflow-hidden'>
              <img src="/images/7.jpg" alt="" />
            </Link>

            <Link to={'/financial-loan-support'} className='rounded overflow-hidden'>
              <img src="/images/8.jpg" alt="" />
            </Link>
          </div>
   
  </div>


  <div className="section">
    <div className="section_title">
        <h4 className='text-2xl text-gray-800 font-medium'>Flash Sale</h4>
    </div>
    
    <div ref={productSectionRef} className="grid gap-2.5 grid-cols-5 max-sm:grid-cols-2 max-md:grid-cols-3 max-lg:grid-cols-3 mt-4">
        {flashSaleProducts.map((product, index) => (
            <ProductCard data={product} key={product.id} />
        ))}
    </div>
  </div>





  <div className="section">
      <div className="section_title">
          <h4 className='text-2xl text-gray-800 font-medium'>Just For You</h4>
      </div>
      
      <div className="grid gap-2.5 grid-cols-5 max-sm:grid-cols-2 max-md:grid-cols-3 max-lg:grid-cols-3 mt-4">
        {products.map((data, index) => (
          <ProductCard data={data} key={index} />
        ))}
      </div>

      <div className="flex justify-center mt-4">
        {loading ? (
          <p>Loading...</p>
        ) : numProducts < 20 ? (
          <button onClick={handleLoadMore} className="primary_bg text-white px-3.5 py-1.5 rounded">
            Load More
          </button>
        ) : (
          <button onClick={handleLoadNewProducts} className="primary_bg text-white px-3.5 py-1.5 rounded">
            Load New Products
          </button>
        )}
      </div>
  </div>

  <DisplayType1 title={'Interiors & Decorating'} category={'interiors-and-decorating'} />

  <DisplayType1 title={'Home & Living'} category={'home-living'} />

  <DisplayType1 title={'Security & Fire Safety'} category={'security-fire-safety'} />

  <DisplayType1 title={'Electrics & Lighting'} category={'electrics-lighting'} />

  <div className="section">
    <div className="grid grid-cols-2 max-md:grid-cols-1 gap-3 align-middle">
      {promo.map((data) => (
        <Link to={data.Link} key={data.id}>
          <img src={`${base_domain}${data.image}`} className='rounded-sm' alt={`Promo banner`} />
        </Link>
      ))}
    </div>
  </div>







    
    </>
  )
}
