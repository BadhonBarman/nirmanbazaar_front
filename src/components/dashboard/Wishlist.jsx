import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../features/PrivateApiCall';

export default function Wishlist() {
  const base_domain = import.meta.env.VITE_APP_SOURCE_DOMAIN;
  const [Products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await api.post('/wishlist/');
        setProducts(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchProductData();
  }, [base_domain]);

  return (
    <>
      <div className="">
        <div className="border border-gray-300 rounded p-4">
          {Products.length === 0 ? (
            <div className="flex h-full items-center justify-center">
              <p>Your Wishlist is empty!</p>
            </div>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {Products.map((item, index) => (
                  <tr key={item.product.id}>
                    <td>
                      <Link to={`/product/${item.product.slug}`} className="flex items-center mb-2">
                        <img
                          height={44}
                          width={44}
                          className="rounded-sm"
                          src={`${base_domain}${item.product.image}`}  // Accessing product image
                          alt={item.product.title}
                        />
                        <div className="pl-2">
                          <h4 className="text-sm font-medium">{item.product.title}</h4>
                        </div>
                      </Link>
                    </td>
                    <td>
                      {item.product.offer_price ? (
                        <h6 className="text-sm text-gray-800 font-semibold">৳ {item.product.offer_price}</h6>
                      ) : (
                        <h6 className="text-sm text-gray-800 font-semibold">৳ {item.product.price}</h6>
                      )}
                    </td>
                    <td>
                      <h6 className="text-sm text-gray-800 font-semibold green_badge rounded-full">
                        In Stock
                      </h6>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}
