import React, { useEffect, useState } from 'react';
import api from '../../features/PrivateApiCall';
import { Link } from 'react-router-dom';

const RequirementsLog = () => {
    const [requirements, setRequirements] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRequirements = async () => {
            try {
                const response = await api.post('/requirement_log/'); // Update the URL as needed
                setRequirements(response.data);
                console.log(response.data, 'requirement data');
            } catch (err) {
                setError(err.response ? err.response.data : 'Error fetching requirements');
            }
        };

        fetchRequirements();
    }, []);

    return (
        <div>
            <h1 className='text-2xl mb-2.5'>Requirements List</h1>
            {error && <p>{error}</p>}
            <div className='w-full overflow-auto custom-scrollbar'>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Track ID</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Urgency</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Created</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requirements.map(requirement => (
                            <tr key={requirement.track_id}>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>#{requirement.id}</td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{requirement.urgency}</td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{requirement.created}</td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                                    <div className='w-full flex flex-row items-center justify-center gap-2'>
                                        <Link>
                                            <svg className='h-5 fill-green-700' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"/></svg>
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <p className='text-green-700 text-sm block lg:hidden my-2.5'>**scroll left to right for preview</p>
            </div>
        </div>
    );
};

export default RequirementsLog;
