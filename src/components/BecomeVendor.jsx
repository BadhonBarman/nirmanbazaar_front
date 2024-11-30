import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

export default function BecomeVendor() {
    const base_domain = import.meta.env.VITE_APP_SOURCE_DOMAIN    
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    email: '',
    address: '',
    message: '',
    tradeLicense: null
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleFileChange = (e) => {
    setFormData(prev => ({
      ...prev,
      tradeLicense: e.target.files[0]
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const data = new FormData()
    data.append('name', formData.name)
    data.append('contact', formData.contact)
    data.append('email', formData.email)
    data.append('address', formData.address)
    data.append('message', formData.message)
    data.append('trade_license', formData.tradeLicense)

    try {
      await axios.post(`${base_domain}/become_vendor_request/`, data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      toast.success('Request submitted successfully!')
      setFormData({
        name: '',
        contact: '',
        email: '',
        address: '',
        message: '',
        tradeLicense: null
      })
    } catch (err) {
      toast.error('Error submitting request')
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        
        {/* Form Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6">Become a Vendor</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Contact Number</label>
              <input
                type="tel"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
                rows="3"
                required
              ></textarea>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
                rows="4"
                placeholder="Tell us about your business..."
              ></textarea>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Trade License</label>
              <input
                type="file"
                onChange={handleFileChange}
                className="w-full"
                accept=".pdf,.jpg,.jpeg,.png"
                required
              />
            </div>

            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
            >
              Submit Request
            </button>
          </form>
        </div>

        {/* Quote Section */}
        <div className="flex items-center justify-center bg-gray-50 p-8 rounded-lg">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Join Our Vendor Community</h3>
            <p className="text-gray-600">
              "Expand your business reach and grow with us. Join thousands of successful vendors who have transformed their business by becoming a part of our marketplace. We provide the platform, you bring your expertise."
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}
