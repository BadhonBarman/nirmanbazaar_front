import React, { useEffect, useState } from 'react';
import api from '../../features/PrivateApiCall';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Adresses() {
  const base_domain = import.meta.env.VITE_APP_SOURCE_DOMAIN;
  const [Addresses, setAddresses] = useState([]);
  
  const [newAddress, setNewAddress] = useState({
    address: '',
    division: '',
    zip: '',
    city: '',
    phone: '',
    home: false,
    primary: false,
  });

  const [editAddress, setEditAddress] = useState({
    id: '',
    address: '',
    division: '',
    zip: '',
    city: '',
    phone: '',
    home: false,
    primary: false,
  });
  

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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewAddress((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/add_address/', newAddress); // Adjust the endpoint as necessary
      setAddresses((prev) => [...prev, response.data.address]); // Add the new address to the list
      setNewAddress({ address: '', division: '', zip: '', city: '', phone: '', home: false, primary: false }); // Reset the form
      console.log('Address added:', response.data);
      toast.success('New Address Added Successfully.')
    } catch (error) {
      console.error('Error adding address:', error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await api.put(`/update_address/${editAddress.id}/`, editAddress); // Adjust endpoint as necessary
      setAddresses((prev) =>
        prev.map((addr) => (addr.id === editAddress.id ? response.data.address : addr))
      );
      toast.success('Address updated successfully!');
      setEditAddress({ id: '', address: '', division: '', zip: '', city: '', phone: '', home: false, primary: false });
    } catch (error) {
      console.error('Error updating address:', error);
      toast.error('Failed to update address.');
    }
  };
  

  return (
    <>
      <div className='flex justify-end'>
        <button className='primary_bg text-white rounded px-3 py-2.5' data-bs-toggle="modal" data-bs-target="#exampleModal">Add Address</button>

        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">New Address</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className='grid grid-cols-2 gap-2 mb-2'>
                    <label htmlFor="home" className='border border-gray-100 rounded p-3 gap-2 flex justify-start items-center'>
                      <input type="radio" name='home' id='home' checked={newAddress.home} onChange={handleChange} />
                      <span>Home</span>
                    </label>
                    <label htmlFor="office" className='border border-gray-100 rounded p-3 gap-2 flex justify-start items-center'>
                      <input type="radio" name='home' id='office' checked={!newAddress.home} onChange={handleChange} />
                      <span>Office</span>
                    </label>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <input type="text" className='rounded w-full col-span-2' id='address' name='address' placeholder='Full Address' value={newAddress.address} onChange={handleChange} required />
                    <input type="text" className='rounded' id='zip' name='zip' placeholder='Zip Code' value={newAddress.zip} onChange={handleChange} />
                    <input type="text" className='rounded' id='city' name='city' placeholder='City' value={newAddress.city} onChange={handleChange} required />

                    <select className='rounded' name="division" id="division" value={newAddress.division} onChange={handleChange} required>
                      <option value="">Select Division</option>
                      <option value="Dhaka">Dhaka</option>
                      <option value="Barishal">Barishal</option>
                      <option value="Chattogram">Chattogram</option>
                      <option value="Khulna">Khulna</option>
                      <option value="Rajshahi">Rajshahi</option>
                      <option value="Rangpur">Rangpur</option>
                      <option value="Mymensingh">Mymensingh</option>
                      <option value="Sylhet">Sylhet</option>
                    </select>
                    <input type="text" className='rounded w-full' id='phone' name='phone' placeholder='Phone Number' value={newAddress.phone} onChange={handleChange} required />
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="px-3 py-2.5 rounded bg-red-600 text-white" data-bs-dismiss="modal">Close</button>
                    <button type="submit" className="px-3 py-2.5 rounded primary_bg text-white">Save changes</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {!Addresses.length && 
        <div className='mt-4'>
          <p className='text-center rounded border-gray-100 border py-3'>No Address data found!</p>
        </div>
      }



<div class="modal fade" id="editmodal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
  <form onSubmit={handleUpdate}>
    <div className="grid grid-cols-2 gap-2">
      <input 
        type="text" 
        className='rounded w-full col-span-2' 
        id='edit_address' 
        name='address' 
        placeholder='Full Address' 
        value={editAddress.address} 
        onChange={(e) => setEditAddress({ ...editAddress, address: e.target.value })} 
        required 
      />
      <input 
        type="text" 
        className='rounded' 
        id='edit_zip' 
        name='zip' 
        placeholder='Zip Code' 
        value={editAddress.zip} 
        onChange={(e) => setEditAddress({ ...editAddress, zip: e.target.value })} 
      />
      <input 
        type="text" 
        className='rounded' 
        id='edit_city' 
        name='city' 
        placeholder='City' 
        value={editAddress.city} 
        onChange={(e) => setEditAddress({ ...editAddress, city: e.target.value })} 
        required 
      />

      <select 
        className='rounded' 
        name="division" 
        id="edit_division" 
        value={editAddress.division} 
        onChange={(e) => setEditAddress({ ...editAddress, division: e.target.value })} 
        required
      >
        <option value="">Select Division</option>
        <option value="Dhaka">Dhaka</option>
        <option value="Barishal">Barishal</option>
        <option value="Chattogram">Chattogram</option>
        <option value="Khulna">Khulna</option>
        <option value="Rajshahi">Rajshahi</option>
        <option value="Rangpur">Rangpur</option>
        <option value="Mymensingh">Mymensingh</option>
        <option value="Sylhet">Sylhet</option>
      </select>
      <input 
        type="text" 
        className='rounded w-full' 
        id='edit_phone' 
        name='phone' 
        placeholder='Phone Number' 
        value={editAddress.phone} 
        onChange={(e) => setEditAddress({ ...editAddress, phone: e.target.value })} 
        required 
      />
    </div>

    <div class="modal-footer">
        <button type="button" class="btn bg-red-600 text-white" data-bs-dismiss="modal">Close</button>
        <button type="submit" class="btn primary_bg text-white">Save changes</button>
      </div>

  </form>
</div>
    </div>
  </div>
</div>
        

      <div className="card mt-4">
        <div className="card-body">
          <div className="grid max-md:grid-cols-1 grid-cols-3 gap-2">
            {Addresses.map((data) => (
              <div key={data.id} className='border border-gray-200 rounded-md p-4'>
                <div className="flex justify-between items-center mb-2">
                  {data.primary && <p className='green_badge rounded-full text-sm font-semibold'>Primary</p>}
                  <div className="dropdown-center">
                    <button type='button' className='p-2 px-3 rounded-full hover:bg-gray-50 duration-75 ease-in-out' data-bs-toggle="dropdown" aria-expanded="false">
                      <svg height={18} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 512"><path d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112z" fill="currentColor" /></svg>
                    </button>
                    <ul className="dropdown-menu">
                      <li> <button 
                            type='button' 
                            data-bs-toggle="modal" 
                            data-bs-target="#editmodal" 
                            className='dropdown-item' 
                            onClick={() => setEditAddress(data)}
                          >
                            Edit
                          </button></li>
                      <li><Link to="#" className='dropdown-item'>Delete</Link></li>
                    </ul>
                  </div>
                </div>
                <p>{data.address}</p>
                <p>{data.city}, {data.division} - {data.zip}</p>
                <p>{data.phone}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
