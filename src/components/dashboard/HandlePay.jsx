import React, { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';


export default function HandlePay() {
    const { code } = useParams();
    console.log('code  : ', code);
    const navigate = useNavigate();
        useEffect(() => {
            if(code === "200200"){
                localStorage.removeItem('cart');
                toast.success('Purchase successful');
                navigate('/dashboard/order-history', { state: "successful" });
            }
            else if (code === "404404"){
                toast.error('Purchase cancelled'); 
                navigate('/dashboard/order-history', { state: "purchace_cancel" });
            }
            else if(code === "401401"){
                toast.error('Purchase failed');
                navigate('/dashboard/order-history', { state: "purchace_failed" });
            }
        }, [code]);
}
