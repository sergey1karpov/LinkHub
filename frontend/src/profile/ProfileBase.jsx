import AuthUserContext from '../contexts/AuthUserContext';
import { useContext } from 'react';
import { Link, Outlet } from "react-router-dom"

//Базовый компонент профиля
export default function ProfileBase() {
    const authUserData = useContext(AuthUserContext) //Подключаем контекст
    
    return (
        <>
            <nav className="bg-[#08090a] border-gray-200 dark:bg-gray-900 fixed w-full z-20 top-0 start-0">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <Link to="/profile/dashboard" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <img className="w-16 h-16 rounded-full" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?fm=jpg&w=3000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" alt="user photo" />
                    </Link>
                    <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                        <button type="submit" className="relative">
                            <span className="absolute top-0 left-0 mt-2 ml-2 h-full w-full rounded bg-gray-400"></span>
                            <span className="fold-bold relative inline-block h-full w-full rounded border-2 border-gray-100 bg-black px-7 py-3 text-2xl font-bold text-white transition duration-100 hover:bg-black hover:text-yellow-500">
                                {`@${authUserData.slug}`}
                            </span>
                        </button>
                    </div>
                </div>
            </nav>

            <div style={{backgroundColor: '#08090a', height: '100vh'}}>
                {/* Все страницы профиля будут отображаться в Outlet */}
                <Outlet />
            </div>
        </>
    )
}