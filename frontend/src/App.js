import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import './AlertEffect.css'

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
import LinksMenu from './profile/Links/LinksMenu';
import AddLink from './profile/Links/AddLink';
import AllLinks from './profile/Links/AllLinks';
import EditLink from './profile/Links/EditLink';

function App() {
    const [userData, setUserData] = useState({}) //Состояние хранит объект user'a
    const navigate = useNavigate(); //педирект

    //При отрисовки компонента App(главный) 
    useEffect(() => {
        if (localStorage.getItem('chrry-api-token') !== null) { //Чекаем есть ли токен в localStorage
            try {
                axios.get(`http://localhost/api/profile/${localStorage.getItem('chrry-userId')}`, { //Если есть, делаем запрос на сервер
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('chrry-api-token')}`,
                    }
                })
                .then((userData) => setUserData(userData.data)) //Получаем пользователя по токену и записывем его в useData
                .catch((err) => {
                    console.error(err)
                    navigate(`/`); //В случае ошибки редиректим на главную
                })
            } catch (error) {
                console.log(error)
            }
        } 
    }, [])

    //Loader(Исправить)
    if(userData === null) {
        return <div>Loading from app js</div>
    }

    return (
        <>
            <AuthUserContext.Provider value={userData}> {/* Контекст, который передает userData всем обернутым в него компонентам */}
                <Routes>
                    <Route element={<MainBase />}> {/* Базовый компонент оборачивает дочерние */}
                        <Route path="/" index element={<Index />} /> {/* Главная страница */}
                        <Route element={<ProtectedRoute />}> {/* Компонент - посредник(Middleware), чекает если юзер уже авторизован, то на этих маршрутах идет редирект на главную */}
                            <Route path="/auth/registration" element={<Registration />} />
                            <Route path="/auth/login" element={<Login />} />
                            <Route path="/auth/restore-password" element={<RestorePassword />} />
                            <Route path="/auth/change-password" element={<EditPassword />} />
                        </Route>    
                    </Route>
                    <Route element={<ProfileBase />}> {/* Базовый компонент оборачивает дочерние */}
                        <Route path="/profile/dashboard" element={<Profile />} />
                        <Route path="profile/edit" element={<EditProfile />} />
                        <Route path="profile/links" element={<LinksMenu />} />
                        <Route path="profile/links/add" element={<AddLink />} />
                        <Route path="profile/links/all-links" element={<AllLinks />} />
                        <Route path="profile/links/:link/edit" element={<EditLink />} />
                    </Route>
                </Routes>
            </AuthUserContext.Provider>
        </>
    );
}

export default App;
