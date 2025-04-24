import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../features/PrivateApiCall';
import { toast } from 'react-toastify'; // Import toast
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles

export default function MyCart() {
  const base_domain = import.meta.env.VITE_APP_SOURCE_DOMAIN;
  const [cart, setCart] = useState([]);
  const [reject, setReject] = useState([]);
  const [total, setTotal] = useState(0);
  const [DelCharge, setDelCharge] = useState(0);

  const [Qcart, setQCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [Addresses, setAddresses] = useState([]);
  const [selectedAdr, setAdr] = useState(null);
  const [payMethod, setPayMethod] = useState('bkash'); // Default to bank transfer
  const [fileUpload, setFileUpload] = useState(null); // To handle file upload for bank transfer
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await api.post('/address_book/');
        setAddresses(response.data);
        const primaryAddress = response.data.find(address => address.primary);
        if (primaryAddress) {
          setAdr(primaryAddress.id);
        }
      } catch (error) {
        console.error('Error fetching address data:', error);
      }
    };

    fetchProductData();
  }, [base_domain, Qcart]);

  console.log('address : ', selectedAdr)

  

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
          const cartData = JSON.parse(savedCart);
          const productIds = Object.values(cartData).map(item => item.prod_id);
          const shopIds = Object.values(cartData).map(item => item.shop);
          console.log("cart shop ids :", shopIds)
          const response = await api.post(`/mycart_data/`, { data: productIds, addr_id:selectedAdr, shop:shopIds });
          setCart(response.data.available);
          setReject(response.data.not_available)
          setDelCharge(response.data.delivery_charge)
          console.log('this is response : ', response.data)
        } else {
          console.log('No cart data found in localStorage');
        }
      } catch (error) {
        setCart([])
        console.error('Error fetching product data:', error);
      }
    };

    fetchProductData();
  }, [base_domain, selectedAdr, Qcart]);

  useEffect(() => {
    const calculateTotal = () => {
      return cart.reduce((total, data) => {
        const itemTotal = 
          data.price * (Qcart[data.product.id]?.qty || 0);
        return total + itemTotal;
      }, 0);
    };

    setTotal(calculateTotal());
  }, [cart, Qcart, selectedAdr]);


  const handleRemoveItem = (itemId) => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      const cartData = JSON.parse(savedCart);
      delete cartData[itemId];
  
      // Update localStorage
      localStorage.setItem('cart', JSON.stringify(cartData));
  
      // Update state only if prevCart is an array
      setQCart(prevCart => {
        if (Array.isArray(prevCart)) {
          return prevCart.filter(item => item.id !== itemId);
        } else {
          return [];
        }
      });
    }
  };
  

  const handleSubmit = async () => {
    const savedCart = localStorage.getItem('cart');
    const cartData = JSON.parse(savedCart);
    const formData = new FormData();
    formData.append('data', JSON.stringify(cartData));
    formData.append('address', selectedAdr);
    formData.append('pay_method', payMethod);

    if (payMethod === 'bank' && fileUpload) {
      formData.append('payment_receipt', fileUpload); // Attach the uploaded file
    }

    try {
      const response = await api.post(`${base_domain}/generate_order/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data) {
        window.location = response.data.redirect
        // toast.success('Order placed successfully!');

        // Clear cart after successful order
        // localStorage.removeItem('cart');
        // setQCart([]);
        // setCart([]);
        // setTotal(0);

      } else {
        toast.error('Failed to place the order.');
      }
    } catch (error) {
      console.log(error.response.data)
      toast.error(error.response.data.error);
      console.log(error);
    }
  };

  const handleAdrSelect = (event) => {
    setAdr(event.target.value);
  };

  const handlePayMethodSelect = (event) => {
    setPayMethod(event.target.value);
  };

  const handleFileChange = (event) => {
    setFileUpload(event.target.files[0]); // Get the uploaded file
  };

  console.log(cart)

  return (
    <>
      <div className="row">
        <div className="col-md-8">
          <div className='border border-gray-300 rounded p-4 overflow-x-auto custom-scrollbar'>
            {cart.length === 0 ? (
              <div className='flex h-full items-center justify-center'><p>Your shopping cart is empty!</p></div>
            ) : (
              <table className='table'>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Subtotal</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                {reject.map((data) => (
                    <tr key={data.id} className='bg-red-100'>
                      <td>
                        <Link to={`/product/${data.slug}`} className='flex  border-none items-center mb-2'>
                          <img height={64} width={64} className='opacity-40 rounded-sm' src={`${base_domain}${data.image}`} alt="" />
                          <div className='pl-2'>
                            <h4 className='text-sm opacity-40'>{data.title}</h4>
                            <span className='text-sm text-red-800'>Please contact us for order. This product not available in your area.</span>
                          </div>
                        </Link>
                      </td>
                      <td>
                        --
                      </td>
                      <td className='opacity-40'>
                        {Qcart[data.id]?.qty || 0}
                      </td>
                      <td>
                        --
                      </td>
                    </tr>
                  ))}

                  {cart.map((data) => (
                    <tr key={data.id}>
                      <td className='!min-w-[14rem]'>
                        <Link to={`/product/${data.product.slug}`} className='flex border-none items-center mb-2'>
                          <img height={64} width={64} className='rounded-sm' src={`${base_domain}${data.product.image}`} alt="" />
                          <div className='pl-2'>
                            <h4 className='text-sm'>{data.product.title}</h4>
                          </div>
                        </Link>
                      </td>
                      <td>
                        {data.offer_price ? (
                          <h6 className='text-sm border-none text-gray-800 font-semibold'>৳{data.offer_price}</h6>
                        ) : (
                          <h6 className='text-sm border-none text-gray-800 font-semibold'>৳{data.price}</h6>
                        )}
                      </td>
                      <td>
                        {Qcart[data.product.id]?.qty || 0}
                      </td>
                      <td>
                        {data.offer_price ? (
                          <h6 className='text-sm text-gray-800 border-none font-semibold'>৳{data.offer_price * (Qcart[data.product.id]?.qty || 0)}</h6>
                        ) : (
                          <h6 className='text-sm border-none text-gray-800 font-semibold'>৳{data.price * (Qcart[data.product.id]?.qty || 0)}</h6>
                        )}
                      </td>
                      <td>
                        <button onClick={() => handleRemoveItem(data.product.id)}>
                          <svg className='h-5 w-5 fill-red-600' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                
              </table>
            )}
            
            <p className='text-green-700 text-sm block lg:hidden'>**scroll left to right for preview</p>
          </div>
          
        </div>

        <div className="col-md-4 mt-2.5 lg:mt-0">
          <div className="border border-gray-300 mb-2 rounded p-3.5">
            <h2 className='text-xl mb-2 font-semibold text-gray-800'>Shipping Address</h2>
            <select name="location" id="location" onChange={handleAdrSelect} value={selectedAdr || ''} className='w-full rounded'>
              {Addresses.map(data => (
                <option key={data.id} value={data.id}>
                  {data.address}, {data.zip_code}, {data.division}
                </option>
              ))}
            </select>
            <p className='text-yellow-700 italic text-sm block lg:hidden mt-1'>Delivery charges may vary based on your preferred location.</p>
          </div>

          <div className="border border-gray-300 rounded p-3.5">
            <h2 className='text-xl font-semibold text-gray-800'>Cart Total</h2>
            <ul>
              <li className='flex justify-between items-center'>
                <p>Subtotal</p>
                <p>৳{total}</p>
              </li>
              <li className='flex justify-between items-center'>
                <p>Delivery Charge</p>
                <p>৳<span>{DelCharge}</span></p>
              </li>
              <li className='flex justify-between items-center'>
                <p>Total</p>
                <p>৳{total + DelCharge}</p>
              </li>
            </ul>

            <label htmlFor="pay_method" className='mt-3'>Select Pay Method</label>
            <select name="pay_method" id="pay_method" className="border-gray-300 rounded p-2.5 w-full" value={payMethod} onChange={handlePayMethodSelect}>
              <option value="bank">Bank Transfer/Deposite</option>
              <option value="bkash">Bkash</option>
            </select>

            {/* Conditionally render file upload input for bank transfer */}
            {payMethod === 'bank' && (
              <div className='mt-3'>
                <label htmlFor="payment_receipt">Upload Payment Receipt</label>
                <input type="file" id="payment_receipt" className="w-full mt-2 p-2 border rounded" onChange={handleFileChange} />
              </div>
            )}

            <button className='py-2 mt-2.5 w-full text-white rounded bg-green-600' onClick={handleSubmit}>Proceed To Checkout</button>
          </div>
        </div>
      </div>
    </>
  );
}
