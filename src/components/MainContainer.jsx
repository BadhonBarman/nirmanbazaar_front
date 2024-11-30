import React, { useEffect } from 'react';
import Header from './sub-components/Header';
import { Outlet } from 'react-router-dom';
import Footer from './sub-components/Footer';
import ThinHeader from './sub-components/ThinHeader';
import BottomBar from './sub-components/BottomBar';

export default function MainContainer() {
  useEffect(() => {
    // Start of Tawk.to Script
    var Tawk_API = Tawk_API || {},
      Tawk_LoadStart = new Date();
    (function () {
  
var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
(function(){
var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
s1.async=true;
s1.src='https://embed.tawk.to/6706e270cec6d0125df44984/1i9pfb390';
s1.charset='UTF-8';
s1.setAttribute('crossorigin','*');
s0.parentNode.insertBefore(s1,s0);
})();

    })();
    // End of Tawk.to Script
  }, []); 


  useEffect(() => {
    // Google Analytics Setup
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = 'https://www.googletagmanager.com/gtag/js?id=G-YVJH6CJ3F7';
    document.head.appendChild(script1);

    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-YVJH6CJ3F7');
  }, []);

  return (
    <>
      <ThinHeader />
      <Header />
      <div className="container mt-2">
        <Outlet />
      </div>
      <BottomBar />
      <Footer />
    </>
  );
}
