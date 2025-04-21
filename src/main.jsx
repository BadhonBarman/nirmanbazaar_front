import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux';
import store from './store/store.js'


// Disable console logs in production using Vite's environment variables
if (import.meta.env.PROD) {
  console.log = () => {}
  console.error = () => {}
  console.debug = () => {}
  console.info = () => {}
  console.warn = () => {}
}


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
