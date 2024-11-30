import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import CustomerAuthCheck from '../features/CustomerAuthCheck';
import api from '../features/PrivateApiCall';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

export default function SendReq() {
  document.title = "Send Requirements";

  CustomerAuthCheck();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  
  // State to manage the dynamic item rows
  const [items, setItems] = useState([{ itemName: '', quantity: '' }]);
  const base_domain = import.meta.env.VITE_APP_SOURCE_DOMAIN;
  const [Addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null); // State for selected address
  
  // State to manage name, phone, and urgency inputs
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    urgency: 'Normal', // Default urgency
  });

  // Function to handle the change of item inputs
  const handleItemChange = (index, event) => {
    const { name, value } = event.target;
    const updatedItems = [...items];
    updatedItems[index][name] = value;
    setItems(updatedItems);
  };

  // Function to add a new row for items
  const addItemRow = () => {
    setItems([...items, { itemName: '', quantity: '' }]);
  };

  // Function to delete a row for items (except the first row)
  const deleteItemRow = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  // Function to handle form data (name, phone, urgency) change
  const handleFormDataChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Function to handle address selection
  const handleAddressChange = (event) => {
    setSelectedAddress(event.target.value);
  };

  useEffect(() => {
    const fetchAddressData = async () => {
      try {
        const response = await api.post('/address_book/');
        setAddresses(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching address data:', error);
      }
    };

    fetchAddressData();
  }, [base_domain]);

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Prepare the data to be sent
    const requirementData = {
      // customer: { name: formData.name, phone: formData.phone },
      items: items.map(item => ({
        item: item.itemName,
        qty: item.quantity,
      })),
      address_id: selectedAddress, // Send the selected address ID
      urgency: formData.urgency,    // Include urgency in the submitted data
    };

    try {
      // Send the data to the Django API
      const response = await api.post('/requirements/', requirementData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Data submitted successfully:', response.data);
      toast.success('Requirement submitted sucessfully.')
      // Optionally reset the form or show a success message
      setFormData({ name: '', phone: '', urgency: 'Normal' });
      setItems([{ itemName: '', quantity: '' }]);
      setSelectedAddress(null); // Reset selected address
    } catch (error) {
      console.error('Error submitting data:', error);
      // Handle error (show message, etc.)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-md-8">
          <div className="grid grid-cols-1 gap-2">
            {/* Loop through items and render inputs dynamically */}
            {items.map((item, index) => (
              <div key={index} className="grid grid-cols-12 gap-2 mb-2 items-center">
                <div className="col-span-9">
                  <input
                    type="text"
                    name="itemName"
                    className="w-full rounded"
                    placeholder="Item Name"
                    value={item.itemName}
                    onChange={(event) => handleItemChange(index, event)}
                  />
                </div>
                <div className="col-span-3 flex w-full gap-2">
                  <input
                    type="number"
                    name="quantity"
                    className="w-full rounded"
                    placeholder="Quantity"
                    value={item.quantity}
                    onChange={(event) => handleItemChange(index, event)}
                  />
                  
                  {/* Show delete button only for rows except the first one */}
                  {index > 0 && (
                    <button
                      type="button"
                      className="px-2.5 py-2 bg-red-500 text-white rounded"
                      onClick={() => deleteItemRow(index)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" height={18} width={18} viewBox="0 0 448 512">
                        <path className='fill-white' d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0L284.2 0c12.1 0 23.2 6.8 28.6 17.7L320 32l96 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 96C14.3 96 0 81.7 0 64S14.3 32 32 32l96 0 7.2-14.3zM32 128l384 0 0 320c0 35.3-28.7 64-64 64L96 512c-35.3 0-64-28.7-64-64l0-320zm96 64c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16z"/>
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Button to add a new row, placed at the bottom */}
          <div className="mt-2">
            <button
              type="button"
              onClick={addItemRow}
              className="px-4 py-2.5 primary_bg text-white rounded w-full"
            >
              Add More Item
            </button>
          </div>
        </div>
           
        {isAuthenticated ? (
        <div className="col-md-4">
          <div className="rounded border border-gray-100 p-3.5">
            <div className="w-full">
              <label htmlFor="name">Select Address</label> <br />
              <select
                name="location"
                id="location"
                className='w-full rounded'
                value={selectedAddress}
                onChange={handleAddressChange} // Add this line to handle address selection
              >
                <option value="" disabled>Select Address</option>
                {Addresses.map(data => (
                  <option key={data.id} value={data.id}>
                    {data.address}, {data.zip_code}, {data.division}
                  </option>
                ))}
              </select>

              <label htmlFor="urgency" className='mt-2.5'>Urgency</label> <br />
              <select name="urgency"
                id="urgency"
                className='w-full rounded'
                value={formData.urgency}
                onChange={handleFormDataChange} // Update urgency in form data
              >
                <option value="Normal">Normal</option>
                <option value="Moderate">Moderate</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>
        </div>):(
          <div className="col-md-3">
          <div className="rounded border border-gray-100 p-3.5">
            <p className='alert alert-warning'>Please Login or Create account first.</p>
            <div className='flex justify-center'>
              <Link to={'/login/'} className='primary_bg text-white rounded w-full text-center py-2.5'>Login</Link>
            </div>
            {/* <div className="w-full">
              <label htmlFor="name">Your Name</label> <br />
              <input
                id="name"
                name="name"
                type="text"
                className="w-full rounded"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleFormDataChange}
              />

              <label htmlFor="phone" className="mt-2.5">
                Phone Number
              </label>{" "}
              <br />
              <input
                id="phone"
                name="phone"
                type="text"
                className="w-full rounded"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleFormDataChange}
              />

              <label htmlFor="urgency" className='mt-2.5'>Urgency</label> <br />
              <select name="urgency"
                id="urgency"
                className='w-full rounded'
                value={formData.urgency}
                onChange={handleFormDataChange} // Update urgency in form data
              >
                <option value="Normal">Normal</option>
                <option value="Moderate">Moderate</option>
                <option value="High">High</option>
              </select>
            </div> */}
          </div>
        </div>)}
      </div>

      {/* Submit button */}
      
      <div className="mt-4">
      {isAuthenticated ? (
        <button type="submit" className="primary_bg px-6 py-2.5 rounded text-white w-full">
          Send Request
        </button>):(
          <button type="button" className="bg-gray-400 px-6 py-2.5 !cursor-not-allowed rounded text-white w-full">
          Send Request
        </button>
        )}
      </div>
    </form>
  );
}
