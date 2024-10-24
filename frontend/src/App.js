import { Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import 'flowbite';
import './App.css';
import axios from "axios";
import './AlertEffect.css';
import Index from './index/Index';
import Login from './index/auth/Login';
import Profile from './profile/Profile';
import MainBase from './index/MainBase';
import AddLink from './profile/Links/AddLink';
import AllLinks from './profile/Links/AllLinks';
import EditLink from './profile/Links/EditLink';
import ProfileBase from './profile/ProfileBase';
import EditProfile from './profile/EditProfile';
import LinksMenu from './profile/Links/LinksMenu';
import EditPassword from './index/auth/EditPassword';
import Registration from './index/auth/Registration';
import AuthUserContext from './contexts/AuthUserContext';
import ProtectedRoute from './middleware/ProtectedRoute';
import RestorePassword from './index/auth/RestorePassword';

function App() {
    const [userData, setUserData] = useState({}) //Состояние хранит объект user'a
    const navigate = useNavigate(); //редирект

    //При отрисовки компонента App(главный) 
    useEffect(() => {
        if (localStorage.getItem('chrry-api-token') !== null) { //Чекаем есть ли токен в localStorage
            try {
                axios.get(`http://localhost/api/profile/${localStorage.getItem('chrry-userId')}`) //Если есть, делаем запрос на сервер
                .then((userData) => {
                    setUserData(userData.data)
                    if(userData.data == null) {
                        return <div>Loading user data...</div>
                    }
                }) //Получаем пользователя по токену и записывем его в useData
                .catch((err) => {
                    console.error(err)
                    navigate(`/`); //В случае ошибки редиректим на главную
                })
            } catch (error) {
                console.log(error)
            }
        } 
    }, [])

    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('chrry-api-token')}`
    axios.defaults.headers.common['Accept'] = 'application/json'

    return (
        <>
            
                <Routes>
                    <Route element={
                        <AuthUserContext.Provider value={userData}> {/* ???В базовый шаблон прокидываем контекст с юзером для хедера, боди и футера??? */}
                            <MainBase /> {/* Базовый компонент оборачивает дочерние для index страниц сайта */}
                        </AuthUserContext.Provider>}> 
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
            
        </>
    );
}

export default App;
