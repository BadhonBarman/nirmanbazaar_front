import React, { useEffect, useState } from 'react';
import api from '../../features/PrivateApiCall';

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
            <h1>Requirements List</h1>
            {error && <p>{error}</p>}
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Track ID</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Urgency</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Created</th>
                    </tr>
                </thead>
                <tbody>
                    {requirements.map(requirement => (
                        <tr key={requirement.track_id}>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{requirement.track_id}</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{requirement.urgency}</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{requirement.created}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default RequirementsLog;
