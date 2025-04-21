import React, { useEffect, useState } from 'react';
import api from '../../features/PrivateApiCall';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function BiddingForm() {
  const [formData, setFormData] = useState({
    budget: '',
    note: '',
    items: [{ item: '', qty: 1 }]
  });
  const [Addresses, setAddresses] = useState([]);
  const [selectedAdr, setAdr] = useState(null);
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
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const newItems = [...formData.items];
    newItems[index][name] = value;
    setFormData({ ...formData, items: newItems });
  };

  const addItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { item: '', qty: 1 }],
      address: selectedAdr,
    });
  };

  const removeItem = (index) => {
    const newItems = formData.items.filter((_, i) => i !== index);
    setFormData({ ...formData, items: newItems });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('add_bidding/', formData);
      console.log('Response:', response.data);
      toast.success('Bidding added successfully!');
      setFormData({
        budget: '',
        note: '',
        items: [{ item: '', qty: 1 }]
      });
    } catch (error) {
      console.error(error);
      toast.error('Failed to add bidding.');
    }
  };

  const handleAdrSelect = (event) => {
    setAdr(event.target.value);
  };

  console.log('Addresses:', selectedAdr);

  return (
    <div className='max-w-3xl mx-auto p-4 bg-white shadow-md rounded-lg'>
      <h2 className='text-2xl font-semibold mb-4'>Bidding Form</h2>
      <form onSubmit={handleSubmit}>
        <div className='mb-4'>
          <label className='block text-gray-700'>Budget</label>
          <input
            type='number'
            name='budget'
            value={formData.budget}
            onChange={handleChange}
            className='form-control mt-2'
            placeholder='Enter your budget'
            required
          />
        </div>

        <select name="location" id="location" onChange={handleAdrSelect} value={selectedAdr || ''} className='w-full rounded'>
              {Addresses.map(data => (
                <option key={data.id} value={data.id}>
                  {data.address}, {data.zip_code}, {data.division}
                </option>
              ))}
            </select>

        <div className='mb-4'>
          <label className='block text-gray-700'>Note</label>
          <textarea
            name='note'
            value={formData.note}
            onChange={handleChange}
            className='form-control mt-2'
            placeholder='Enter any notes (optional)'
          />
        </div>

        <div className='mb-4'>
          <label className='block text-gray-700'>Items</label>
          {formData.items.map((item, index) => (
            <div key={index} className='flex items-center mb-2'>
              <input
                type='text'
                name='item'
                value={item.item}
                onChange={(e) => handleItemChange(index, e)}
                className='form-control mr-2'
                placeholder='Item name'
                required
              />
              <input
                type='number'
                name='qty'
                value={item.qty}
                onChange={(e) => handleItemChange(index, e)}
                className='form-control mr-2'
                min='1'
                placeholder='Quantity'
                required
              />
              <button
                type='button'
                onClick={() => removeItem(index)}
                className='btn bg-red-500 hover:bg-red-600 text-white'
                disabled={formData.items.length === 1}
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type='button'
            onClick={addItem}
            className='btn primary_bg text-white mt-2'
          >
            Add Item
          </button>
        </div>

        <button type='submit' className='btn primary_bg text-white'>
          Submit Bidding
        </button>
      </form>
    </div>
  );
}
