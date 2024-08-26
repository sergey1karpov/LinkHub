import { Link, NavLink } from "react-router-dom"
import AuthUserContext from '../contexts/AuthUserContext';
import { useContext } from "react";

//Выход, очищаем localStorage и редиректим на главную
function Logout() {
    localStorage.removeItem('chrry-userId')
    localStorage.removeItem('chrry-username')
    localStorage.removeItem('chrry-api-token')
    window.location.replace("http://localhost:3000/");
}

//Закрытие шторки с меню на мобилках
function closeDrawer() {
    const elem = document.getElementById('drawer-btn')
    elem.click()
}

export default function Header() {
    // Достаем авторизированного пользователя из контекста
    const userData = useContext(AuthUserContext);

    //Компонент хедера
    return (
        <nav className="bg-[#08090a] border-gray-200 dark:bg-gray-900">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <NavLink to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img width={`100px`} height={`100px`} src="https://i.ibb.co/kQdGDSs/logosize.png" />
                </NavLink>
                <button data-drawer-target="drawer-example" data-drawer-show="drawer-example" aria-controls="drawer-example" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                    </svg>
                </button>
                <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                    {userData.email && <div>
                        <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-[#08090a] md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 bg-black dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            <li>
                                <Link to="/profile/dashboard" className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:p-0" aria-current="page">Profile</Link>
                            </li>
                            <li>
                                <Link to="/" onClick={Logout} className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:p-0">Logout</Link>
                            </li>
                        </ul>    
                    </div>}
                    {!userData.email && <div>
                        <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-[#08090a] md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 bg-black dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            <li>
                                <NavLink to="auth/login" className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:p-0">Login</NavLink>
                            </li>
                            <li>
                                <NavLink to="auth/registration" className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:p-0">Registration</NavLink>
                            </li>
                        </ul>    
                    </div>}
                </div>
                <div id="drawer-example" className="fixed top-0 left-0 z-40 h-screen p-4 overflow-y-auto transition-transform -translate-x-full bg-black w-full dark:bg-gray-800" tabIndex="-1" aria-labelledby="drawer-label">
                    <button id="drawer-btn" type="button" data-drawer-hide="drawer-example" aria-controls="drawer-example" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white" >
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                        <span className="sr-only">Close menu</span>
                    </button>
                    <div className="mt-10">
                        <div className="m-4">  
                            <h1 className="text-center mb-4 text-4xl font-extrabold text-gray-200 dark:text-white md:text-5xl lg:text-6xl">
                                    Menu
                            </h1>
                            <div className="text-center mt-10 w-full">
                                <div className="text-lg w-full font-normal text-gray-200 lg:text-xl dark:text-gray-400">
                                    <div className="flex flex-wrap justify-center gap-6 mt-5 w-full">
                                        <NavLink onClick={closeDrawer} to="auth/registration" className="relative">
                                            <span className="absolute top-0 left-0 mt-2 ml-2 h-full w-full rounded bg-gray-400"></span>
                                            <span className="fold-bold relative inline-block h-full w-full rounded border-2 border-gray-100 bg-black px-7 py-3 text-2xl font-bold text-white transition duration-100 hover:bg-black hover:text-yellow-500">Get started for free</span>
                                        </NavLink>
                                        <NavLink onClick={closeDrawer} to="auth/login" className="relative mt-5">
                                            <span className="absolute top-0 left-0 mt-2 ml-2 h-full w-full rounded bg-red-500"></span>
                                            <span className="fold-bold relative inline-block h-full w-full rounded border-2 border-gray-100 bg-black px-7 py-3 text-2xl font-bold text-red-500 transition duration-100 hover:bg-black hover:text-yellow-500">Log in now</span>
                                        </NavLink>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}