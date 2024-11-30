import React from 'react'
import { useParams } from 'react-router-dom';

export default function CheckoutPage() {
    const { slug } = useParams();
    
  return (
    <>
    <p>{slug}</p>
    </>
  )
}
