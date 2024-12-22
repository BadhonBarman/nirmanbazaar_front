import axios from 'axios';

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

// Create an Axios instance
const publicapi = axios.create({
  baseURL: import.meta.env.VITE_APP_SOURCE_DOMAIN,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Set up an interceptor to include cookies and other headers
publicapi.interceptors.request.use(
  (config) => {
    const sessionid = getCookie('sessionid');
    const csrftoken = getCookie('csrftoken');

    
    if (csrftoken) {
      config.headers['X-CSRFToken'] = csrftoken;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default publicapi;
