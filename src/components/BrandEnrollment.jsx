import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

export default function BrandEnrollment() {
  const base_domain = import.meta.env.VITE_APP_SOURCE_DOMAIN    
  const [formData, setFormData] = useState({
    brandName: '',
    productCategory: '',
    contactPersonName: '',
    designation: '',        // Add designation
    phoneNumber: '',        // Add phone number
    contactEmail: '',
    officeAddress: '',
    brandDetails: '',
    brandWebsite: '',
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
    Object.keys(formData).forEach(key => {
      data.append(key, formData[key])
    })

    try {
      const response = await axios.post(`${base_domain}/brand_enrollment_request/`, data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      toast.success('Brand enrollment request submitted successfully!')
      setFormData({
        brandName: '',
        productCategory: '',
        contactPersonName: '',
        designation: '',        // Add designation
        phoneNumber: '',        // Add phone number
        contactEmail: '',
        officeAddress: '',
        brandDetails: '',
        brandWebsite: '',
        tradeLicense: null
      })
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error submitting request')
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6">Brand Enrollment</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Brand Name</label>
              <input
                type="text"
                name="brandName"
                value={formData.brandName}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Product Category</label>
              <input
                type="text"
                name="productCategory"
                value={formData.productCategory}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Contact Person Name</label>
              <input
                type="text"
                name="contactPersonName"
                value={formData.contactPersonName}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Designation</label>
              <input
                type="text"
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Phone Number</label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="+880 1XXX-XXXXXX"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Contact Email</label>
              <input
                type="email"
                name="contactEmail"
                value={formData.contactEmail}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Office Address</label>
              <textarea
                name="officeAddress"
                value={formData.officeAddress}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
                rows="3"
                required
              ></textarea>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Brand Details</label>
              <textarea
                name="brandDetails"
                value={formData.brandDetails}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
                rows="4"
                placeholder="Tell us about your Brand..."
                required
              ></textarea>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Brand Website</label>
              <input
                type="text"
                name="brandWebsite"
                value={formData.brandWebsite}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="https://example.com"
              />
            </div>

            {/* <div className="mb-4">
              <label className="block text-gray-700 mb-2">Trade License</label>
              <input
                type="file"
                onChange={handleFileChange}
                className="w-full px-3 py-2 border rounded-md"
                accept=".pdf,.doc,.docx"
                required
              />
            </div> */}

            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
            >
              Submit Request
            </button>
          </form>
        </div>

        <div className="flex items-center justify-center bg-gray-50 p-8 rounded-lg">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Become a Part of Our Brand Network</h3>
            <p className="text-gray-600">
              Empower your brand and reach new heights by joining our exclusive network. Partner with us to connect with a thriving marketplace, showcase your expertise, and unlock unparalleled growth opportunities.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}