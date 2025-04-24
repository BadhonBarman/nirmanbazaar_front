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

      <div className="overflow-x-auto custom-scrollbar">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">ID</th>
              {/* <th className="py-2 px-4 border-b">User</th> */}
              <th className="py-2 px-4 border-b">Budget</th>
              <th className="py-2 px-4 border-b">Created</th>
              <th className="py-2 px-4 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {biddings.map((bid) => (
              <tr key={bid.id} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b">#{bid.id}</td>
                {/* <td className="py-2 px-4 border-b">
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
                </td> */}
                <td className="py-2 px-4 border-b">{bid.budget} ৳</td>
                <td className="py-2 px-4 border-b">{new Date(bid.created).toLocaleDateString()}</td>
                <td className="py-2 px-4 border-b">
                  <div className='w-full flex flex-row items-center justify-center gap-2'>
                    <Link 
                      to={`form/${bid.id}`} 
                      className="text-blue-500 hover:underline"
                    >
                      <svg className='h-5 fill-green-700' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"/></svg>
                      
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className='text-green-700 text-sm block my-2.5 lg:hidden'>**scroll left to right for preview</p>
      </div>
    </>
  );
}
