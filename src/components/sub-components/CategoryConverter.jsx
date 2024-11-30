import React, { useEffect, useState } from 'react';
import axios from 'axios';


export default function CategoryConverter({id}) {
  const root_domain = import.meta.env.VITE_APP_SOURCE_DOMAIN;
  const [Data, setData] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(`${root_domain}/get_category/`,{'id':id});
        setData(response.data); // Assuming response.data is an array of products
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [root_domain]);

  return (
    <>
    <span>{Data.title}</span>
    </>
  )
}