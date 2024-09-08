import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export default function MyCart() {

    const base_domain = import.meta.env.VITE_APP_SOURCE_DOMAIN;
    const [cart, setCart] = useState([])

    const [total, setTotal] = useState(0);





    const [Qcart, setQCart] = useState(() => {
      const savedCart = localStorage.getItem('cart');
      return savedCart ? JSON.parse(savedCart) : [];
    });





    


    useEffect(() => {
      const fetchProductData = async () => {
        try {
          // Retrieve the cart data from localStorage
          const savedCart = localStorage.getItem('cart');
          if (savedCart) {
            const cartData = JSON.parse(savedCart);
  
            // Extract product IDs
            const productIds = Object.values(cartData).map(item => item.prod_id);
  
            // Send the product IDs to the API
            const response = await axios.post(`${base_domain}/cart_data/`, { data: productIds });
            setCart(response.data);
            console.log(response.data);
          } else {
            console.log('No cart data found in localStorage');
          }
        } catch (error) {
          console.error('Error fetching product data:', error);
        }
      };
  
      fetchProductData();
    }, [base_domain]);


    useEffect(() => {
      
      const calculateTotal = () => {
        return cart.reduce((total, data) => {
          const itemTotal = data.offer_price 
            ? data.offer_price * (Qcart[data.id]?.qty || 0)
            : data.price * (Qcart[data.id]?.qty || 0);
      
          return total + itemTotal;
        }, 0); // Initialize the accumulator to 0
      };
      
      // Update total state
      setTotal(calculateTotal());
    }, [cart, Qcart]); // Dependency array


  return (
    <>

      <div className="row">
        <div className="col-md-8">
          <div className='border border-gray-300 rounded p-4'>
          {cart.length === 0 ? (<div className='flex h-full items-center justify-center'><p>Your shopping cart is empty!</p></div>):(
          <table className='table'>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Subtotal</th>
            </tr>
            {cart.map((data, index)=>(
              <tr key={data.id}>
                
                <td>
                  <Link to={`/product/${data.slug}`} className='flex border-none items-center mb-2'>
                    <img  height={64} width={64} className='rounded-sm' src={`${base_domain}${data.image}`} alt="" />
                      <div className='pl-2'>
                        <h4 className='text-sm'>{data.title}</h4>
                      </div>
                    </Link>
                </td>
                <td>
                {data.offer_price ? (<h6 className='text-sm border-none text-gray-800 font-semibold'>৳{data.offer_price} </h6>):(<h6 className='text-sm border-none text-gray-800 font-semibold'>৳ {data.price}</h6>)}
                </td>
                <td>
                  {Qcart[data.id].qty}
                </td>

                <td>
                {data.offer_price ? (<h6 className='text-sm text-gray-800 border-none font-semibold'>৳{data.offer_price * Qcart[data.id].qty} </h6>):(<h6 className='text-sm border-none text-gray-800 font-semibold'>৳ {data.price * Qcart[data.id].qty}</h6>)}
                </td>

              </tr>

              
            ))}
          </table>
          )}
          </div>
        </div>
        
        <div className="col-md-4">
          <div className="border border-gray-300 rounded p-4">
            <h2 className='text-2xl font-semibold text-gray-800'>Cart Total</h2>
            <ul>

              <li className='flex justify-between items-center'>
                <p>Subtotal</p>
                <p>2379</p>
              </li>

              
              <li className='flex justify-between items-center'>
                <p>Delivery Charge</p>
                <p>120</p>
              </li>

              <li className='flex justify-between items-center'>
                <p>Total</p>
                <p>{total}</p>
              </li>
            </ul>
            <div className="coupon_box flex items-center justify-between">
              <input type="text" className='rounded' placeholder='Coupon Code' />
              <button className='py-2 mx-2 w-full text-white rounded my-4 bg-green-600'>Apply</button>
            </div>
            <button className='py-2 w-full text-white rounded bg-green-600'>Proceed To Checkout</button>
            </div>
        </div>
      
      </div>
    
      
    </>
  )
}
