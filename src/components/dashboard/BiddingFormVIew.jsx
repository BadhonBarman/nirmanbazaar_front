import React, { useEffect, useState } from 'react';
import api from '../../features/PrivateApiCall';
import { Link, useParams } from 'react-router-dom';

export default function BiddingFormView() {
  const base_domain = import.meta.env.VITE_APP_SOURCE_DOMAIN;
  const [bidding, setBidding] = useState({});
  const [biddingItems, setBiddingItems] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.post(`bidding_form_view/`, { id });
        console.log('response data : ', response.data);
        setBidding(response.data.bidding);
        setBiddingItems(response.data.bidding_items);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [base_domain, id]);

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-4">Bidding Details</h2>
        <div className="flex flex-col md:flex-row gap-4">
          <img
            src={`${base_domain}${bidding?.user?.image}`}
            alt={bidding?.user?.name}
            className="w-24 h-24 rounded-full shadow-sm"
          />
          <div>
            <h3 className="text-xl font-bold">{bidding?.user?.name}</h3>
            <p className="text-gray-600">{bidding?.user?.email}</p>
            <p className="text-gray-600">{bidding?.user?.phone}</p>
          </div>
        </div>
        <div className="mt-4">
          <p><strong>Budget:</strong> {bidding?.budget} ৳</p>
          <p><strong>Note:</strong> {bidding?.note}</p>
          <p><strong>Created:</strong> {new Date(bidding?.created).toLocaleDateString()}</p>
        </div>
      </div>
      

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-semibold mb-4">Bidding Items</h2>
        <div className="overflow-x-auto">
          <table className="table-auto min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border-b">#</th>
                <th className="py-2 px-4 border-b">Item</th>
                <th className="py-2 px-4 border-b">Quantity</th>
                <th className="py-2 px-4 border-b">Created</th>
              </tr>
            </thead>
            <tbody>
              {biddingItems.map((item, index) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{index + 1}</td>
                  <td className="py-2 px-4 border-b">{item.item}</td>
                  <td className="py-2 px-4 border-b">{item.qty}</td>
                  <td className="py-2 px-4 border-b">{new Date(item.created).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="text-right mt-4">
        <Link to="/dashboard/bidding-portal/" className="btn btn-primary">
          Back to Bidding List
        </Link>
      </div>
    </div>
  );
}
