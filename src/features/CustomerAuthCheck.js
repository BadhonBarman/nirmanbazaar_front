import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { loginSuccess, logout } from './authSlice';

const CustomerAuthCheck = () => {
    const base_domain = import.meta.env.VITE_APP_SOURCE_DOMAIN;
    const dispatch = useDispatch();

    // Utility function to get cookie value
    const getCookie = (name) => {
        const nameEQ = `${name}=`;
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    };

    useEffect(() => {
        const checkAuthStatus = async () => {
        try {
            const response = await axios.post(
                `${base_domain}/customer_auth_status/`,
                {}, // No body needed for this request
                {headers: {
                    'Content-Type': 'application/json',
                    'Authorization': getCookie('sessionid'),
                    'X-CSRFToken': getCookie('csrftoken'), // Include the CSRF token if needed
                }
                }
            );
            console.log('auth utils :: '+ response.data)
            if (response.data && response.status === 200) {
            dispatch(loginSuccess(response.data));
            } else {
            dispatch(logout());
            }
        } catch (error) {
            dispatch(logout());
        }
        };

        checkAuthStatus();
    }, [dispatch, base_domain]);
};

export default CustomerAuthCheck;
