import React, { useEffect, useState } from 'react';
import api from '../../features/PrivateApiCall';
import DOMPurify from 'dompurify';

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [currentNotification, setCurrentNotification] = useState(null);

  const fetchNotifications = async () => {
    try {
      const response = await api.post('/customer_notifications/');
      setNotifications(response.data);
      setError(''); // Clear error if the fetch is successful
    } catch (err) {
      setError(err.response?.data?.detail || 'Error fetching notifications');
    }
  };

  useEffect(() => {
    fetchNotifications(); // Initial fetch when component mounts

    const intervalId = setInterval(fetchNotifications, 15000); // Fetch every 15 seconds

    return () => {
      clearInterval(intervalId); // Clean up on component unmount
    };
  }, []);

  const handleReadNotification = (notification) => {
    setCurrentNotification(notification);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentNotification(null);
  };

  const handleBackdropClick = (e) => {
    // Close modal if backdrop is clicked
    if (e.target.classList.contains('modal')) {
      handleCloseModal();
    }
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
  };

  return (
    <div>
      <div className='flex justify-between align-middle'>
      <h2 className='text-xl'>All Notifications</h2>
        <button onClick={fetchNotifications} className="p-2 rounded-full bg-slate-400 mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" height={22} className='fill-white' viewBox="0 0 512 512">
                <path d="M386.3 160L336 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l128 0c17.7 0 32-14.3 32-32l0-128c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 51.2L414.4 97.6c-87.5-87.5-229.3-87.5-316.8 0s-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3s163.8-62.5 226.3 0L386.3 160z"/>
            </svg>
        </button>
      </div>
      {error ? (
        <div className="alert alert-danger">{error}</div>
      ) : (
        notifications.length > 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Subject</th>
                <th>Date & Time</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {notifications.map((notification, index) => (
                <tr key={notification.id}>
                  <td>{index + 1}</td>
                  <td>{notification.subject}</td>
                  <td>{formatDateTime(notification.created)}</td>
                  <td>
                    <button 
                      className="btn primary_bg text-white hover:bg-green-500" 
                      onClick={() => handleReadNotification(notification)}
                    >
                      Read
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div>No notifications found.</div>
        )
      )}

      {/* Modal for displaying notification text */}
      {showModal && (
        <div 
          className="modal fade show" 
          style={{ display: 'block', zIndex: 1050 }} // Set zIndex to ensure it's above other elements
          tabIndex="-1" 
          role="dialog" 
          aria-labelledby="exampleModalLabel" 
          aria-hidden="true" 
          onClick={handleBackdropClick} // Close modal on backdrop click
        >
          <div className="modal-dialog modal-dialog-centered" role="document"> {/* Centered Modal */}
            <div className="modal-content">
              <div className="modal-header py-2">
                <h5 className="text-lg" id="exampleModalLabel">Notification Details</h5>
              </div>
              <div className="modal-body">
                {currentNotification && (
                  <div 
                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(currentNotification.text) }} 
                  />
                )}
              </div>
              <div className="modal-footer border-none">
                <button type="button" className="btn btn-danger bg-red-700" onClick={handleCloseModal}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Backdrop */}
      {showModal && <div className="modal-backdrop fade show" style={{ zIndex: 1040 }}></div>} {/* Adjusted zIndex */}
    </div>
  );
}
