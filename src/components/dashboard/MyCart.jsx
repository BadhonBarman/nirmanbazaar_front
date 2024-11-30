import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../features/PrivateApiCall';
import { toast } from 'react-toastify'; // Import toast
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles

export default function MyCart() {
  const base_domain = import.meta.env.VITE_APP_SOURCE_DOMAIN;
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [Qcart, setQCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [Addresses, setAddresses] = useState([]);
  const [selectedAdr, setAdr] = useState(null);
  const [payMethod, setPayMethod] = useState('bank'); // Default to bank transfer
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
  }, [base_domain]);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
          const cartData = JSON.parse(savedCart);
          const productIds = Object.values(cartData).map(item => item.prod_id);
          const response = await axios.post(`${base_domain}/cart_data/`, { data: productIds });
          setCart(response.data);
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
      }, 0);
    };

    setTotal(calculateTotal());
  }, [cart, Qcart]);

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

      if (response.data.successfull) {
        toast.success('Order placed successfully!');

        // Clear cart after successful order
        localStorage.removeItem('cart');
        setQCart([]);
        setCart([]);
        setTotal(0);

        // Redirect to another page or show the order summary if necessary
        navigate('/dashboard/order-history');
      } else {
        toast.error('Failed to place the order.');
      }
    } catch (error) {
      toast.error('Error placing the order.');
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

  return (
    <>
      <div className="row">
        <div className="col-md-8">
          <div className='border border-gray-300 rounded p-4'>
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
                  </tr>
                </thead>
                <tbody>
                  {cart.map((data) => (
                    <tr key={data.id}>
                      <td>
                        <Link to={`/product/${data.slug}`} className='flex border-none items-center mb-2'>
                          <img height={64} width={64} className='rounded-sm' src={`${base_domain}${data.image}`} alt="" />
                          <div className='pl-2'>
                            <h4 className='text-sm'>{data.title}</h4>
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
                        {Qcart[data.id]?.qty || 0}
                      </td>
                      <td>
                        {data.offer_price ? (
                          <h6 className='text-sm text-gray-800 border-none font-semibold'>৳{data.offer_price * (Qcart[data.id]?.qty || 0)}</h6>
                        ) : (
                          <h6 className='text-sm border-none text-gray-800 font-semibold'>৳{data.price * (Qcart[data.id]?.qty || 0)}</h6>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        <div className="col-md-4">
          <div className="border border-gray-300 mb-2 rounded p-3.5">
            <h2 className='text-xl mb-2 font-semibold text-gray-800'>Shipping Address</h2>
            <select name="location" id="location" onChange={handleAdrSelect} value={selectedAdr || ''} className='w-full rounded'>
              {Addresses.map(data => (
                <option key={data.id} value={data.id}>
                  {data.address}, {data.zip_code}, {data.division}
                </option>
              ))}
            </select>
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
                <p>৳120</p>
              </li>
              <li className='flex justify-between items-center'>
                <p>Total</p>
                <p>৳{total + 120}</p>
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
