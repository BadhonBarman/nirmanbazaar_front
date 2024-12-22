import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'; // Corrected import statement
import api from '../../features/PrivateApiCall';
import { toast } from 'react-toastify';

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  
  

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const response = await api.post('/order_history/'); // Adjust the API endpoint as necessary
        setOrders(response.data);
        console.log(response.data);
      } catch (err) {
        setError('No orders history found..'); // Handle the error as needed
      } finally {
        setLoading(false);
      }
    };

    fetchOrderHistory();
  }, []);

  useEffect(() => {
    const { state } = location;

    console.log('state : ',state)
    if(state === "successful"){
      toast.success("Purchase Successful.")
      navigate({ pathname: location.pathname }, { replace: true });

    }
    else if (state === "purchace_cancel") {
      toast.error("Purchase Cancelled.");
      navigate({ pathname: location.pathname }, { replace: true });
    }
    else if(state === "purchace_failed"){
      toast.error("Purchase Failed.");
      navigate({ pathname: location.pathname }, { replace: true });
    }
  }, [location.pathname]); // Include toast in dependencies


  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <h2 className='text-xl font-semibold mb-2'>Order History</h2>
      <div className="card">
        <div className="card-body">
          <div className="responsive_table">
          {orders.length > 0 ? (
            <table className="table-auto w-full">
              <thead>
                <tr>
                  <th className="px-4 py-2 border-t border-b">Order ID</th>
           
                  <th className="px-4 py-2 border-t border-b">Amount</th>
                  <th className="px-4 py-2 border-t border-b">Paid</th>
                  <th className="px-4 py-2 border-t border-b">Status</th>
                  <th className="px-4 py-2 border-t border-b">Created</th>
                  <th className="px-4 py-2 border-t border-b">Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <tr key={order.invoice_id} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
                    <td className="border-t border-b px-4 py-2"># {order.id}</td>
              
              
                    <td className="border-t border-b px-4 py-2">{order.amount} TK</td>
                    <td className="border-t border-b px-4 py-2">{order.paid ? 'Yes' : 'No'}</td>
                    <td className="border-t border-b px-4 py-2">{order.status}</td>
                    <td className="border-t border-b px-4 py-2">{new Date(order.created).toLocaleDateString()}</td>
                    <td className="border-t border-b px-4 py-2">
                      <Link to={`/dashboard/order/${order.invoice_id}`} className="primary_bg text-white px-3.5 py-1.5 rounded">View</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
          ) : (
            <p>No orders found.</p>
          )}
          </div>
        </div>
      </div>
    </>
  );
}
