import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';

import MainBase from './index/MainBase';
import Registration from './index/auth/Registration';
import Login from './index/auth/Login'
import Index from './index/Index';
import ProfileBase from './profile/ProfileBase';
import 'flowbite';
import Profile from './profile/Profile';
import AuthUserContext from './contexts/AuthUserContext';
import EditProfile from './profile/EditProfile';
import axios from "axios";
import { useEffect, useState } from 'react';
import ProtectedRoute from './middleware/ProtectedRoute';
import RestorePassword from './index/auth/RestorePassword';
import EditPassword from './index/auth/EditPassword';
import AddLink from './profile/Links/AddLink';

function App() {
    const [userData, setUserData] = useState({})
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('chrry-api-token') !== null) {
            try {
                axios.get(`http://localhost/api/profile/${localStorage.getItem('chrry-userId')}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('chrry-api-token')}`,
                    }
                })
                .then((userData) => setUserData(userData.data))
                .catch((err) => {
                    console.error(err)
                    navigate(`/`); 
                })
            } catch (error) {
                console.log(error)
            }
        } 
    }, [])

    if(userData === null) {
        return <div>Loading from app js</div>
    }

    return (
        <>
            <AuthUserContext.Provider value={userData}>
                <Routes>
                    <Route element={<MainBase />}>
                        <Route path="/" index element={<Index />} />
                        <Route element={<ProtectedRoute />}>
                            <Route path="/auth/registration" element={<Registration />} />
                            <Route path="/auth/login" element={<Login />} />
                            <Route path="/auth/restore-password" element={<RestorePassword />} />
                            <Route path="/auth/change-password" element={<EditPassword />} />
                        </Route>    
                    </Route>
                    <Route element={<ProfileBase />}>
                        <Route path="/profile/dashboard" element={<Profile />} />
                        <Route path="profile/edit" element={<EditProfile />} />
                        <Route path="profile/add-link" element={<AddLink />} />
                    </Route>
                </Routes>
            </AuthUserContext.Provider>
        </>
    );
}

export default App;
