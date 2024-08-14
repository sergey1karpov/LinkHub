import React, { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute() {
    const navigate = useNavigate();
    
    useEffect(() => {
        const user = localStorage.getItem('chrry-api-token')

        if(user !== null) {
            navigate('/profile/dashboard');
        }
    }, [])

    return <Outlet />;
}