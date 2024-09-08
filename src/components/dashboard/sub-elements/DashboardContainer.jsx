import React, { useEffect } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux';

import { initFlowbite } from 'flowbite';

export default function DashboardContainer() {
   const base_domain = import.meta.env.VITE_APP_SOURCE_DOMAIN
   const user = useSelector((state) => state.auth.user);
   initFlowbite()
   
   useEffect(()=>{
      initFlowbite()
   },[window.location.pathname])
   
   
  return user ? (
    <>
    


    <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
  <div className="px-3 py-3 lg:px-5 lg:pl-3">
    <div className="flex items-center justify-between">
      <div className="flex items-center justify-start rtl:justify-end">
        <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
            <span className="sr-only">Open sidebar</span>
            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
               <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
            </svg>
         </button>
        <Link to={'/dashboard'} className="">
          <svg xmlns="http://www.w3.org/2000/svg" width="137" height="28" viewBox="0 0 137 28" className="fill-black"><g id="Group 808"><path id="Union" fillRule="evenodd" clipRule="evenodd" d="M19.05 22.7867C22.7002 20.6792 24.5566 16.6579 24.0834 12.722L20.4589 14.8146C20.1973 16.7645 19.0665 18.5762 17.2309 19.636C14.0882 21.4505 10.0695 20.3737 8.25507 17.2309C6.4406 14.0882 7.51741 10.0696 10.6601 8.25509C13.1378 6.82462 16.1598 7.19116 18.2171 8.9503L12.6254 12.1787L11.7302 16.9392L20.2325 12.0304L22.6289 10.6468L23.4362 10.1807C23.255 9.72561 23.0388 9.27792 22.7867 8.84114C19.9676 3.95832 13.7239 2.28534 8.84112 5.10444C3.95828 7.92355 2.28533 14.1672 5.10442 19.05C7.92352 23.9328 14.1671 25.6058 19.05 22.7867Z" fill=""></path><path id="Subtract" fillRule="evenodd" clipRule="evenodd" d="M116.866 6.59013V15.489C116.866 16.7933 116.373 17.9032 115.372 18.8798C114.369 19.8263 113.259 20.2781 111.946 20.2781C110.628 20.2781 109.487 19.8229 108.487 18.8798C107.494 17.911 107.026 16.804 107.026 15.489V4.22456L103.005 6.54606V15.2046C103.005 17.7176 103.849 19.8653 105.522 21.5629L105.524 21.5657L105.527 21.5685C107.235 23.2652 109.381 24.1291 111.946 24.1291C114.508 24.1291 116.657 23.2669 118.335 21.5657C120.043 19.8669 120.887 17.7169 120.887 15.2046V4.26863L116.866 6.59013ZM47.9885 16.8971L47.2093 18.5088L47.1992 18.527C46.1704 20.3799 44.838 21.7915 43.1947 22.7315C41.5516 23.6714 39.6424 24.1142 37.5 24.0975L37.497 24.0975C34.6103 24.0636 32.1219 23.0741 30.0357 21.1448C27.9374 19.2043 26.8801 16.8012 26.8452 14.0129C26.8102 11.186 27.8355 8.78087 29.9289 6.77699L29.9312 6.77484L29.9334 6.77272C32.0454 4.78419 34.5653 3.72347 37.4953 3.68909C39.5942 3.65537 41.5532 4.20277 43.3581 5.28399L43.3621 5.28641L43.3661 5.28887C45.0537 6.32815 46.3391 7.63168 47.0947 9.278L47.0956 9.27992L47.9231 11.1107H43.5308L43.3101 10.7459C42.0519 8.66659 40.1877 7.59799 37.5884 7.53991C35.8898 7.5124 34.3893 8.09152 32.9948 9.3624L32.9921 9.36482L32.9895 9.36722C31.5477 10.6562 30.8661 12.1678 30.8661 13.9091C30.8661 15.6587 31.5228 17.1473 32.8474 18.4381C34.1666 19.6925 35.7242 20.3065 37.5263 20.2782L37.5282 20.2782L37.53 20.2781C40.1787 20.2492 42.0728 19.2277 43.354 17.2435L43.5777 16.8971H47.9885ZM59.5057 3.75275C62.2646 3.85473 64.6625 4.88289 66.588 6.89255C68.5037 8.86009 69.4887 11.2211 69.4887 13.9407C69.4887 16.7356 68.4292 19.1654 66.3445 21.1948C64.2876 23.197 61.782 24.1987 58.9015 24.0972C56.1374 24.0281 53.7398 22.9974 51.8161 21.0227C49.8943 19.0499 48.9457 16.6862 48.9457 13.9723C48.9457 11.1526 50.0001 8.69041 52.0551 6.68885C54.1139 4.65181 56.6234 3.6501 59.5057 3.75275ZM58.9885 20.2471L58.9937 20.2473C60.8177 20.3319 62.3212 19.7523 63.5957 18.4271L63.5986 18.424L63.6016 18.421C64.9236 17.0769 65.5281 15.5603 65.5004 13.7694C65.4405 12.0621 64.8039 10.6246 63.6005 9.39601C62.4111 8.18173 61.0186 7.60325 59.347 7.60325H59.3408L59.3346 7.60315C57.5725 7.57503 56.1124 8.18333 54.8537 9.40862C53.6017 10.6274 52.9959 12.0537 52.9665 13.7948C52.9372 15.5095 53.4882 16.9995 54.6834 18.2764C55.8807 19.5557 57.2799 20.1907 58.9833 20.2469L58.9885 20.2471ZM100.231 23.6868H96.1451V11.8868C96.1451 10.6511 95.7736 9.61807 95.0802 8.78109C94.4177 7.98144 93.5346 7.57165 92.4264 7.57165C91.2534 7.57165 90.2627 7.94503 89.3926 8.68112C88.5851 9.39057 88.1883 10.2623 88.1883 11.3496V23.6868H84.07V11.3496C84.07 10.2622 83.6737 9.39367 82.838 8.68505L82.8333 8.6811L82.8287 8.67706C81.9959 7.94741 81.009 7.57165 79.832 7.57165C78.7303 7.57165 77.8772 7.97653 77.2106 8.78109C76.5236 9.61037 76.1782 10.6085 76.1782 11.8868V23.6868H72.0923V12.1712C72.0923 9.78662 72.7855 7.75587 74.2788 6.22909C75.656 4.78446 77.4628 3.98908 79.6396 3.81791C81.1179 3.69678 82.4764 3.94775 83.6899 4.58313C84.6088 5.06429 85.4199 5.75283 86.1292 6.62587C86.8384 5.75283 87.6495 5.06429 88.5684 4.58313C89.7819 3.94775 91.1404 3.69678 92.6187 3.81791C94.799 3.98935 96.6018 4.78623 98.0083 6.22521C99.4989 7.74706 100.231 9.77562 100.231 12.1712V23.6868ZM127.829 16.8655V18.2064C127.829 18.5162 128.018 18.9689 128.645 19.5787C129.21 20.1295 129.76 20.3315 130.282 20.3103L130.286 20.3102L130.29 20.3101C131.191 20.2826 131.798 20.0432 132.243 19.6103C132.62 19.2435 132.836 18.719 132.864 17.9645C132.876 17.3487 132.705 16.8828 132.387 16.5125C132.058 16.1285 131.52 15.7881 130.7 15.5312L130.698 15.5305L128.528 14.8685C127.276 14.4854 126.263 13.8572 125.552 12.9586C124.841 12.0597 124.479 10.9479 124.425 9.67432C124.351 8.07452 124.921 6.6732 126.075 5.54904L126.08 5.54488L126.084 5.54079C127.251 4.44017 128.658 3.82509 130.31 3.75306C131.786 3.68001 133.134 4.16601 134.329 5.11685C135.583 6.0879 136.282 7.31418 136.396 8.79796L136.396 8.80391L136.477 10.1311H132.312V8.97975C132.312 8.61901 132.134 8.29437 131.786 8.03741C131.431 7.77541 130.918 7.60506 130.355 7.60326C129.338 7.63045 128.533 8.38232 128.51 9.34415L128.51 9.36278L128.508 9.38137C128.473 9.85003 128.598 10.2084 128.858 10.5083C129.135 10.827 129.61 11.1307 130.36 11.3738L132.505 12.0699L132.508 12.0708C133.846 12.5165 134.928 13.1946 135.699 14.1287C136.471 15.065 136.89 16.2099 136.98 17.5208C137.128 19.3703 136.443 21.0044 134.993 22.3456L134.989 22.3489L134.985 22.3523C133.543 23.651 131.85 24.2665 129.945 24.1595L129.944 24.1594L129.942 24.1593C128.178 24.0519 126.702 23.3283 125.508 22.0955L125.504 22.0914L125.5 22.0872C124.329 20.8398 123.743 19.3326 123.743 17.6061V16.8655H127.829Z"></path></g></svg>
        </Link>
      </div>
      <div className="flex items-center">
          <div className="flex items-center ms-3">
            <div>
              <button type="button" className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" aria-expanded="false" data-dropdown-toggle="dropdown-user">
                <span className="sr-only">Open user menu</span>
                <img className="w-8 h-8 rounded-full" src={`${base_domain}${user.image}`} alt="user photo"/>
              </button>
            </div>
            <div className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600" id="dropdown-user">
              <div className="px-4 py-3" role="none">
                <p className="text-sm text-gray-900 dark:text-white" role="none">
                  {user.name}
                </p>
                <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-300" role="none">
                  Phone: {user.phone}
                </p>
              </div>
              <ul className="py-1" role="none">
                <li>
                  <Link to={'.'} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Dashboard</Link>
                </li>

                <li>
                  <Link to={'wishlist'} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Wishlist</Link>
                </li>

                <li>
                  <Link to={'orders'} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Orders</Link>
                </li>
               
              </ul>
            </div>
          </div>
        </div>
    </div>
  </div>
</nav>

<aside id="logo-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700" aria-label="Sidebar">
   <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
      <ul className="space-y-2 font-medium">
         <li>
            <NavLink to={"."} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
               <svg className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                  <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"/>
                  <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"/>
               </svg>
               <span className="ms-3">Dashboard</span>
            </NavLink>
         </li>
         <li>
            <NavLink to={'order-history'} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
               <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                  <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z"/>
               </svg>
               <span className="flex-1 ms-3 whitespace-nowrap">Order History</span>
               <span className="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">Pro</span>
            </NavLink>
         </li>
         <li>
            <NavLink to={'my-cart'} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
               <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                  <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z"/>
               </svg>
               <span className="flex-1 ms-3 whitespace-nowrap">My Cart</span>
            </NavLink>
         </li>
         <li>
            <NavLink to={'wishlist'} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
               <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z"/>
               </svg>
               <span className="flex-1 ms-3 whitespace-nowrap">Wishlist</span>
               <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">3</span>
            </NavLink>
         </li>
         <li>
            <NavLink to={'addresses'} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
               <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                  <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z"/>
               </svg>
               <span className="flex-1 ms-3 whitespace-nowrap">Account Details</span>
            </NavLink>
         </li>
         <li>
            <NavLink to={'addresses'} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
               <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                  <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z"/>
               </svg>
               <span className="flex-1 ms-3 whitespace-nowrap">Addresses</span>
            </NavLink>
         </li>
         <li>
            <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
               <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                  <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z"/>
               </svg>
               <span className="flex-1 ms-3 whitespace-nowrap">Support</span>
            </a>
         </li>
         <li>
            <Link to={'/'} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
               <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"/>
               </svg>
               <span className="flex-1 ms-3 whitespace-nowrap">Shop More</span>
            </Link>
         </li>
         <li>
            <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
               <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Z"/>
                  <path d="M6.737 11.061a2.961 2.961 0 0 1 .81-1.515l6.117-6.116A4.839 4.839 0 0 1 16 2.141V2a1.97 1.97 0 0 0-1.933-2H7v5a2 2 0 0 1-2 2H0v11a1.969 1.969 0 0 0 1.933 2h12.134A1.97 1.97 0 0 0 16 18v-3.093l-1.546 1.546c-.413.413-.94.695-1.513.81l-3.4.679a2.947 2.947 0 0 1-1.85-.227 2.96 2.96 0 0 1-1.635-3.257l.681-3.397Z"/>
                  <path d="M8.961 16a.93.93 0 0 0 .189-.019l3.4-.679a.961.961 0 0 0 .49-.263l6.118-6.117a2.884 2.884 0 0 0-4.079-4.078l-6.117 6.117a.96.96 0 0 0-.263.491l-.679 3.4A.961.961 0 0 0 8.961 16Zm7.477-9.8a.958.958 0 0 1 .68-.281.961.961 0 0 1 .682 1.644l-.315.315-1.36-1.36.313-.318Zm-5.911 5.911 4.236-4.236 1.359 1.359-4.236 4.237-1.7.339.341-1.699Z"/>
               </svg>
               <span className="flex-1 ms-3 whitespace-nowrap">Logout</span>
            </a>
         </li>
      </ul>
   </div>
</aside>

<div className="p-4 sm:ml-64">
   <div className="p-4 mt-14">
      
      <Outlet/>

   </div>
</div>


    </>
  ) : ''
}
