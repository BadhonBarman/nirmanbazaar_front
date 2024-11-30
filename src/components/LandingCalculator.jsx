import React, { useState } from 'react';

export default function LandingCalculator() {
  // Define states for the inputs
  const [sqft, setSqft] = useState('');
  const [floors, setFloors] = useState('');
  const [costPerSqft, setCostPerSqft] = useState('');
  const [totalCost, setTotalCost] = useState(null);

  // Function to calculate the total cost
  const calculateCost = () => {
    if (sqft && floors && costPerSqft) {
      const cost = sqft * floors * costPerSqft;
      setTotalCost(cost);
    } else {
      alert('Please fill in all fields.');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg">
      <div className="grid grid-cols-1 gap-2">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Total Square Feet (per floor):</label>
          <input
            type="number"
            value={sqft}
            onChange={(e) => setSqft(e.target.value)}
            placeholder="Enter total sqft"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Number of Floors:</label>
          <input
            type="number"
            value={floors}
            onChange={(e) => setFloors(e.target.value)}
            placeholder="Enter number of floors"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Cost per Square Foot:</label>
          <input
            type="number"
            value={costPerSqft}
            onChange={(e) => setCostPerSqft(e.target.value)}
            placeholder="Enter cost per sqft"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>

        <div className="text-center mt-4">
          <button
            onClick={calculateCost}
            className="w-full primary_bg text-white py-2 rounded-md "
          >
            Calculate Total Cost
          </button>
        </div>
      </div>

      {totalCost !== null && (
        <div className="mt-6 text-center">
          <h5 className="text-lg font-semibold text-green-600">Total Building Cost: ৳{totalCost}</h5>
        </div>
      )}
    </div>
  );
}
