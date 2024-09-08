import React, { useEffect, useMemo } from 'react'



import Header from './sub-components/Header'
import { Outlet } from 'react-router-dom'
import Footer from './sub-components/Footer'


export default function MainContainer() {
  
        
        
  return (
    <>
    <Header/>
    <div className="container">
        <Outlet/>
    </div>
    <Footer/>
    
    </>
  )
}
