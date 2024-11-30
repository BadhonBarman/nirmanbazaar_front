import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import TextShorter from './helpers/TextShorter';
import DOMPurify from 'dompurify';
import DateTimeFormat from './helpers/DateTimeFormat';

export default function BlogView() {


const base_domain = import.meta.env.VITE_APP_SOURCE_DOMAIN;
  const [Data, setData] = useState([])
  const {id} = useParams();

  
  useEffect(() => {
    const fetchData = async () => {
    try {
        const response = await axios.post(`${base_domain}/vendor/blog_view/`, {'id': id});
        setData(response.data);
        console.log(response.data)
    }
    catch (error) {
        console.error(error);
    }
    };

    fetchData();
}, [base_domain]);

document.title = Data.title



useEffect(() => {
    if (Data?.title) {
      const metaKeyword = document.querySelector('meta[name="keywords"]');
      if (metaKeyword) {
        // If the meta tag exists, update the content
        metaKeyword.setAttribute('content', Data.title);
      } else {
        // If the meta tag doesn't exist, create it
        const meta = document.createElement('meta');
        meta.name = 'keywords';
        meta.content = Data.title;
        document.head.appendChild(meta);
      }
    }
  }, [Data]);

const sanitizeHtml = (html) => {
    return { __html: DOMPurify.sanitize(html) };
  };


  return (
    <>
        <div className="section_title">
            <h4 className='text-2xl text-gray-800 font-medium'>{Data.title}</h4>
            <p className='bng_font'>Published: <DateTimeFormat dateTime={Data.listed}/></p>
        </div>
      <div className='flex items-center gap-2 bng_font'>
                    <p>Share: </p>
                    <Link target='_blank' to={`https://www.facebook.com/sharer.php?u=${window.location}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="28" width="28" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve"><path fill="#1877F2" d="M16,0L16,0c8.837,0,16,7.163,16,16l0,0c0,8.837-7.163,16-16,16l0,0C7.163,32,0,24.837,0,16l0,0 C0,7.163,7.163,0,16,0z"></path><path fill="#FFFFFF" d="M18,17.5h2.5l1-4H18v-2c0-1.03,0-2,2-2h1.5V6.14C21.174,6.097,19.943,6,18.643,6C15.928,6,14,7.657,14,10.7 v2.8h-3v4h3V26h4V17.5z"></path></svg>
                    </Link>

                    <Link>
                        <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 28 28" width="28" height="28"><circle id="Ellipse_3" fill="#4AC959" cx="14" cy="14" r="13.5"></circle><path id="Path_525" fill="#ffffff" d="M19.6,8.3c-3.1-3.1-8.1-3.1-11.2,0c-2.5,2.5-3,6.5-1.3,9.6L6,22l4.2-1.1c1.2,0.6,2.5,1,3.8,1l0,0 c4.4,0.1,7.9-3.4,8-7.8C22,11.9,21.2,9.8,19.6,8.3L19.6,8.3z M14,20.5c-1.2,0-2.3-0.3-3.4-0.9l-0.2-0.1l-2.5,0.7l0.7-2.4l-0.2-0.2 c-1.9-3.1-0.9-7.2,2.2-9.1c3.1-1.9,7.2-0.9,9.1,2.2c0.6,1,0.9,2.2,1,3.3C20.6,17.6,17.7,20.5,14,20.5z M17.6,15.6 c-0.2-0.1-1.2-0.6-1.4-0.6s-0.3-0.1-0.4,0.1s-0.5,0.6-0.6,0.8S15,16,14.8,15.9c-1.1-0.5-2.1-1.3-2.7-2.4c-0.2-0.4,0.2-0.3,0.6-1.1 c0.1-0.1,0-0.2,0-0.3C12.6,12,12.2,11,12,10.6s-0.3-0.3-0.4-0.3s-0.2,0-0.4,0c-0.2,0-0.4,0.1-0.5,0.2c-0.5,0.4-0.7,1-0.7,1.7 c0.1,0.7,0.3,1.5,0.8,2.1c0.9,1.3,2,2.3,3.4,3c0.7,0.4,1.6,0.6,2.4,0.5c0.6-0.1,1-0.5,1.3-0.9c0.1-0.3,0.2-0.6,0.1-0.9 C17.9,15.7,17.8,15.7,17.6,15.6L17.6,15.6z"></path></svg>
                    </Link>

                    <Link>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve" height="28" width="28"><circle fill="#0F1419" cx="12" cy="12" r="12"></circle><path fill="#FFFFFF" d="M15.531,7h1.662l-3.63,4.236L17.833,17h-3.343l-2.62-3.495L8.876,17H7.212l3.882-4.531L7,7h3.427
                        l2.366,3.195L15.531,7z M14.947,15.986h0.92L9.926,7.962H8.937L14.947,15.986z"></path></svg>
                    </Link>

                    <Link>
                        <svg height="28" width="28" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" enable-background="new 0 0 32 32" xml:space="preserve"><path fill="#FFCDD2" d="M16,0L16,0c8.837,0,16,7.163,16,16l0,0c0,8.837-7.163,16-16,16l0,0C7.163,32,0,24.837,0,16l0,0 C0,7.163,7.163,0,16,0z"></path><path fill="#D60000" d="M15.75,18.625H14c-1.435,0-2.844,0.391-4.072,1.133c-1.229,0.742-2.231,1.805-2.9,3.076 C7.009,22.598,7,22.361,7,22.125c0-4.833,3.917-8.75,8.75-8.75V9l8.75,7l-8.75,7V18.625z"></path></svg>
                    </Link>
      </div>


      <div className='mt-4' dangerouslySetInnerHTML={sanitizeHtml(Data.article)} />
      
    </>
  )
}
