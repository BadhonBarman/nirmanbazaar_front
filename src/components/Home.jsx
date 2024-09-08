import React, { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import axios from 'axios'
import Footer from './sub-components/Footer';
import Header from './sub-components/Header';

export default function Home() {

    const base_domain = import.meta.env.VITE_APP_SOURCE_DOMAIN;

    const [banners, setBanners] = useState([])
    const [category, setCategory] = useState([])
    const [products, setProducts] = useState([])
  
  
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

  return (
    <>



  <div className="landing_content">
      
          <div id="carouselExampleFade" className="carousel slide carousel-fade hero_slider" data-bs-ride="carousel" data-bs-interval="3000">
            <div className="carousel-inner">

            {banners.map((banner, index) => (
              <div   key={banner.id} className={`w-full carousel-item ${index === 0 ? 'active' : ''}`}>
                <img src={`${base_domain}${banner.image}`} className="h-[344px] w-[988px] m-auto d-block" alt={banner.altText || "Banner image"} />
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
  </div>
          
  <div className="section">
       
      <div className="section_title">
          <h4 className='text-2xl text-gray-800 font-medium'>Featured Categories</h4>
      </div>
        
          
        <div className='category_buttons mt-4'>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6  gap-1 mt-4">
            {category.map((data, index) => (
              <div key={index + 1} className="flex flex-col items-center">
                <Link to={`category/${data.slug}`}>
                  <div className='py-3 px-4 border border-gray-200 rounded-lg text-center'>
                    <img src={`${base_domain}${data.icon}`} className='m-auto' alt={data.title} />
                    <h4 className='text-sm font-medium py-2'>{data.title}</h4>
                  </div>
                </Link>
              </div>
            ))}
          </div>

        </div>
   
  </div>


  <div className="section">
      <div className="section_title">
          <h4 className='text-2xl text-gray-800 font-medium'>Popular Products</h4>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-1 mt-4">
        {products.map((data, index) => (
          <div key={data.id} className="px-1 my-2">
            <div className="product_card border border-gray-200 max-md:h-[252px] h-[292px]  rounded-lg ">
              <Link to={`product/${data.slug}`}>
                <img
                  className="w-full max-md:h-32 h-48 object-cover rounded-t-lg"
                  src={`${base_domain}${data.image}`}
                  alt={data.title}
                />
                <div className="product_card_text p-2">
                  <h4 className="text-sm text-start font-medium">{data.title}</h4>
                  <p className="text-md font-medium text-right mt-2">{data.price} tk</p>
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>


  </div>







    
    </>
  )
}
