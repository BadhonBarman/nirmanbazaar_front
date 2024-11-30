import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function ComparePage() {
  const base_domain = import.meta.env.VITE_APP_SOURCE_DOMAIN;
  document.title = 'Compare Product';

  const [compares, setCompares] = useState(() => {
    // Retrieve the 'compares' from localStorage and parse it, or use an empty array as fallback
    return JSON.parse(localStorage.getItem('compares')) || [];
  });

  const [data, setData] = useState([]);

  // Fetch data based on compares keys
  const fetchData = async () => {
    try {
      const keys = Object.keys(compares);
      if (keys.length > 0) {
        const response = await axios.post(`${base_domain}/compare_data/`, { keys });
        setData(response.data);
      } else {
        setData([]); // Clear the data if there are no items to compare
      }
    } catch (error) {
      console.error('Error fetching data from API:', error);
    }
  };

  // Effect to fetch data when compares change
  useEffect(() => {
    fetchData();
  }, [compares]);

  const removeItem = (key) => {
    // Remove the key from compares object
    const updatedCompares = { ...compares };
    delete updatedCompares[key]; // Remove the product ID from compares

    // Update state and localStorage
    setCompares(updatedCompares);
    localStorage.setItem('compares', JSON.stringify(updatedCompares));
  };

  return (
    <>
      {Object.keys(compares || {}).length === 0 && (
        <div className="card mt-20">
          <div className="card-body text-center">
            <p className="font-semibold text-lg">No Item Found into Compare List</p>
          </div>
        </div>
      )}

      {data.length > 0 && (
        <div className="card mt-8 overflow-x-auto">
          <div className="card-body">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  {data.slice(0, 3).map((info, index) => (
                    <th
                      key={index}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Product {index + 1}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap font-bold">Product View</td>
                  {data.slice(0, 3).map((info, index) => (
                    <td key={index} className="px-6 py-4 whitespace-nowrap">
                      <img className="h-32 w-32 object-cover" src={`${base_domain}${info.image}`} alt={info.title} />
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap font-bold">Product Name</td>
                  {data.slice(0, 3).map((info, index) => (
                    <td key={index} className="px-6 py-4 whitespace-nowrap">
                      <p className="text-sm font-medium text-gray-900">{info.title}</p>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap font-bold">Pricing</td>
                  {data.slice(0, 3).map((info, index) => (
                    <td key={index} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {info.price} BDT
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap font-bold">Category</td>
                  {data.slice(0, 3).map((info, index) => (
                    <td key={index} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {info.category}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap font-bold">Shop & Brand</td>
                  {data.slice(0, 3).map((info, index) => (
                    <td key={index} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {info.shop}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap font-bold">Stock Status</td>
                  {data.slice(0, 3).map((info, index) => (
                    <td key={index} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {info.unit}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap font-bold">Remove Item</td>
                  {data.slice(0, 3).map((info, index) => (
                    <td key={index} className="px-6 py-4 whitespace-nowrap text-sm">
                      <button
                        onClick={() => removeItem(Object.keys(compares)[index])} // Remove by key (ID)
                        className="text-red-600 hover:text-red-900"
                      >
                        Remove
                      </button>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}
