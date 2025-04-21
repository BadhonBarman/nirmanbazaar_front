import React, { useEffect, useState } from 'react';
import api from '../../features/PrivateApiCall';
import { Link } from 'react-router-dom';

export default function BiddingPortal() {
  const base_domain = import.meta.env.VITE_APP_SOURCE_DOMAIN;
  const [biddings, setBiddings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.post(`bidding_portal/`);
        console.log('response data : ', response.data);
        setBiddings(response.data.biddings);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [base_domain]);

  return (
    <>
      <div className='flex flex-wrap justify-between items-center mb-4'>
        <h2 className='text-xl font-semibold'>Bidding Portal</h2>
        <Link to={'form/'} className='primary_bg text-white px-4 py-2.5 rounded text-lg'>Create Bid</Link>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b">User</th>
              <th className="py-2 px-4 border-b">Budget</th>
              <th className="py-2 px-4 border-b">Created</th>
              <th className="py-2 px-4 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {biddings.map((bid) => (
              <tr key={bid.id} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b">{bid.id}</td>
                <td className="py-2 px-4 border-b">
                  <div className="flex items-center">
                    <img 
                      src={`${base_domain}${bid.user.image}`} 
                      alt={bid.user.name} 
                      className="w-10 h-10 rounded-full mr-2" 
                    />
                    <div>
                      <p className="font-medium">{bid.user.name}</p>
                      <p className="text-sm text-gray-500">{bid.user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="py-2 px-4 border-b">{bid.budget} ৳</td>
                <td className="py-2 px-4 border-b">{new Date(bid.created).toLocaleDateString()}</td>
                <td className="py-2 px-4 border-b">
                  <Link 
                    to={`form/${bid.id}`} 
                    className="text-blue-500 hover:underline"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
