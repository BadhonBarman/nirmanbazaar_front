import React from 'react'

export default function SupportToken() {
  return (
    <>
    <h2 className='text-xl font-semibold mb-2'>Support Ticket</h2>


    <div className="card">
      <div className="card-body">

      <div className="flex my-4 justify-between items-center">
        <select className='rounded' name="filter" id="filter">
          <option value="pending">Pending</option>
          <option value="answerd">Answerd</option>
        </select>

        <input type="text" className='rounded' placeholder='Search Ticket ID' />
      </div>

      <div class="overflow-x-auto">
        <table class="min-w-full table-auto border-collapse">
          <thead>
            <tr class="bg-gray-100">
              <th class=" border-gray-200 px-4 py-3 text-left">Ticket ID</th>
              <th class=" border-gray-200 px-4 py-3 text-left">Created at</th>
              <th class=" border-gray-200 px-4 py-3 text-left">Subject</th>
              <th class=" border-gray-200 px-4 py-3 text-left">Status</th>
              <th class=" border-gray-200 px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border-b border-gray-200 px-4 py-3">Row 1, Col 1</td>
              <td class="border-b border-gray-200 px-4 py-3">Row 1, Col 2</td>
              <td class="border-b border-gray-200 px-4 py-3">Row 1, Col 3</td>
              <td class="border-b border-gray-200 px-4 py-3">Row 1, Col 4</td>
              <td class="border-b border-gray-200 px-4 py-3">Row 1, Col 5</td>
            </tr>
            <tr>
              <td class="border-b border-gray-200 px-4 py-3">Row 2, Col 1</td>
              <td class="border-b border-gray-200 px-4 py-3">Row 2, Col 2</td>
              <td class="border-b border-gray-200 px-4 py-3">Row 2, Col 3</td>
              <td class="border-b border-gray-200 px-4 py-3">Row 2, Col 4</td>
              <td class="border-b border-gray-200 px-4 py-3">Row 2, Col 5</td>
            </tr>
          
          </tbody>
        </table>
      </div>


      </div>
    </div>


    </>
  )
}
