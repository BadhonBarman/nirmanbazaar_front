import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../../features/PrivateApiCall';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default function OrderItems() {
  const { invID } = useParams();
  const base_domain = import.meta.env.VITE_APP_SOURCE_DOMAIN;
  const [Data, setData] = useState([]);
  const [invdata, setInvData] = useState({});
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await api.post('/order_view/', { invID: invID });
        setInvData(response.data.invoice);
        setData(response.data.invoice_items);

        // Calculate total amount
        const total = response.data.invoice_items.reduce(
          (sum, item) => sum + parseFloat(item.amount),
          0
        );
        setTotalAmount(total);

        console.log('this is order view: ', response.data);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchProductData();
  }, [base_domain]);

  const generatePDF = () => {
    const doc = new jsPDF();

    // Invoice Title
    doc.setFontSize(18);
    doc.text('Invoice', 105, 20, null, null, 'center');

    // Invoice Details
    doc.setFontSize(12);
    doc.text(`Invoice ID: # ${invdata.id}`, 20, 40);
    doc.text(`Customer Name: ${invdata.customer?.name}`, 20, 50);
    doc.text(`Customer Phone: ${invdata.customer?.phone}`, 20, 60);
    doc.text(`Address: ${invdata.address?.address}`, 20, 70);
    doc.text(`Paid: ${invdata.paid ? 'Yes' : 'No'}`, 20, 80);
    doc.text(`Status: ${invdata.status}`, 20, 90);
    doc.text(`Due Date: ${new Date(invdata.created).toLocaleDateString()}`, 20, 100);

    // Table data for order items
    const tableColumn = ['#', 'Product Name', 'Qty', 'Amount', 'Status'];
    const tableRows = [];

    Data.forEach((item, index) => {
      const itemData = [
        index + 1, // Indexing (1, 2, 3, etc.)
        item.product.title,
        item.qty,
        item.amount,
        item.status,
      ];
      tableRows.push(itemData);
    });

    // AutoTable with light green header background and black text
    doc.autoTable({
      startY: 110, // Where the table starts vertically on the page
      head: [tableColumn],
      body: tableRows,
      theme: 'grid',
      headStyles: {
        fillColor: [144, 238, 144], // Light green background
        textColor: [0, 0, 0], // Black text color for headers
      },
      styles: {
        cellPadding: 3,
        fontSize: 10,
      },
    });

    // Add space between items table and total amount table
    const finalY = doc.autoTable.previous.finalY || 120; // Final Y position after the table

    // Total Amount table (right-aligned, two columns only with borders)
    doc.autoTable({
      startY: finalY + 10, // Some space between tables
      body: [
        ['Total Amount:', totalAmount.toFixed(2)], // Two columns for total amount
      ],
      theme: 'plain', // No borders except the total row
      styles: {
        fontSize: 12,
        halign: 'right', // Align text to the right
        lineWidth: 0.1, // Border for total amount columns
        cellPadding: 3,
      },
      tableWidth: 'wrap', // Make the table only as wide as the content
      margin: { right: 20 }, // Right margin to push the table left
    });

    // Save PDF
    doc.save(`invoice_${invdata.invoice_id}.pdf`);
  };

  return (
    <>
      <div className="border mb-4 border-gray-100 rounded p-3.5 w-full overflow-auto custom-scrollbar">
        <h2>Order Status: <span className='green_badge rounded-xl'>{invdata.status}</span></h2>
        <h2 className='mt-2.5'>Payment Status: {invdata.paid ? (<span className='green_badge rounded-xl'>Completed</span>):(<span className='red_badge rounded-xl'>Pending</span>)}</h2>
        {!invdata.paid && <p className='text-red-600 text-sm font-semibold my-2'>This order will not be processed until the payment is completed.</p>}
        <div className="flex flex-wrap gap-2">
          <div>
            <label>Invoice ID</label> <br />
            <input
              type="text"
              className="rounded border-gray-200"
              value={`# ${invdata?.id}`}
              readOnly
            />
          </div>

          <div>
            <label>Name</label> <br />
            <input
              type="text"
              className="rounded border-gray-200"
              value={invdata.customer?.name || ''}
              readOnly
            />
          </div>
        </div>
      </div>

      <div>
        <div className="w-full overflow-auto custom-scrollbar">
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2">ID</th>
                <th className="border border-gray-300 px-4 py-2">Product Name</th>
                <th className="border border-gray-300 px-4 py-2">Qty</th>
                <th className="border border-gray-300 px-4 py-2">Amount</th>
                <th className="border border-gray-300 px-4 py-2">Order Status</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {Data.length > 0 ? (
                Data.map((data, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="p-2">{index + 1}</td> {/* Using index instead of ID */}
                    <td className="border min-w-[14rem] border-gray-300 px-4 py-2">{data.product.title}</td>
                    <td className="border border-gray-300 px-4 py-2">{data.qty}</td>
                    <td className="border border-gray-300 px-4 py-2">{data.amount}</td>
                    <td className="border min-w-[10rem] border-gray-300 px-4 py-2"><span className='green_badge rounded-xl'>{data.status}</span></td>
                    <td className="border border-gray-300 px-4 py-2">
                      <div className="dropdown-center">
                        <button type="button" data-bs-toggle="dropdown" aria-expanded="false">
                          <svg
                            className="w-[29px] h-[29px]"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeWidth="3"
                              d="M12 6h.01M12 12h.01M12 18h.01"
                            />
                          </svg>
                        </button>
                        <ul className="dropdown-menu">
                          <li>
                            <Link className="dropdown-item">
                              Update Status
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="text-center py-4" colSpan="6">
                    No data available
                  </td>
                </tr>
              )}

              <tr className="bg-gray-100">
                <td colSpan="4"></td>
                <td className="border border-gray-300 px-4 py-2 font-bold">Total:</td>
                <td className="border border-gray-300 px-4 py-2 font-bold">{totalAmount.toFixed(2)}</td>
                <td></td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={6}><p className='text-green-700 text-sm block lg:hidden w-full'>**scroll left to right for preview</p></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      <button
        onClick={generatePDF}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Download Invoice PDF
      </button>
    </>
  );
}
