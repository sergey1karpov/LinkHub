import { useState } from "react"
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { Link } from "react-router-dom"

export default function Login() {
    const [emailOrUsername, setEmailOrUsername] = useState('') //Начальное состояние для username или email = ''
    const [password, setPassword] = useState('') //Начальное состояние для пароля ''
    const [errors, setErrors] = useState([]) //Начальное состояние для валидационных ошибок = []
    const [authError, setAuthError] = useState('') //Начальное состояние для ошибки авторизации('User not found' и 'Invalid password')
    const navigate = useNavigate(); //Редирект

    async function handleLogin(event) {
        event.preventDefault()

        let data = {emailOrUsername, password}

        try {
            const result = await axios.post('http://localhost/api/login', data); //Отправляем данные на сервер

            //После логина записываем ответ от сервера в localStorage
            localStorage.setItem('chrry-userId', result.data.userId)
            localStorage.setItem('chrry-username', result.data.username)
            localStorage.setItem('chrry-api-token', result.data.token)

            navigate(`/profile/dashboard`); //Редиректим в личный кабинет
        } catch (error) {
            setErrors(error.response.data.errors);
            if(error.response.data['error']) { //Бекенд в 'error' записывает свои ошибки 'User not found' и 'Invalid password'
                setAuthError(error.response.data['error']) //Записываем эти ошибки в переменную authError через сеттер setAuthError
            }
        }
    }

    //Ошибки валидации данных, если они есть, кроме ошибок авторизации пользователя 'User not found' и 'Invalid password'
    const renderErrors = (field) => (
        errors?.[field]?.map((error, index) => (
            <div key={index} className="text-rose-500 mb-1 rounded bg-danger">
                {error}
            </div>
        ))
    )

    return (
        <div className="m-4">  
            <h1 className="mb-4 text-4xl font-extrabold text-gray-200 dark:text-white md:text-5xl lg:text-6xl">
                <img width={`450px`} height={`450px`} src="https://i.ibb.co/kQdGDSs/logosize.png" />
                    Login to the app now
            </h1>

            <div>
                {
                    //Если есть одна ошибка из 'User not found' и 'Invalid password', то выводим ее над формой
                    authError && <div className="text-rose-500 mb-1 rounded bg-danger">Sorry, {authError}</div>
                }
            </div>

            <div className="mt-5">
                <form onSubmit={(event) => handleLogin(event)}>
                    <div className="mb-6 text-center">
                        {renderErrors('emailOrUsername')}
                        <input 
                            value={emailOrUsername} 
                            onChange={(e) => setEmailOrUsername(e.target.value)} 
                            placeholder="Email or Username" 
                            type="text" 
                            className={renderErrors('emailOrUsername') ? "text-gray-900 text-xl rounded-lg block w-full p-3.5 bg-red-300" : "text-gray-900 text-lg rounded-lg block w-full p-3.5" }
                        />
                    </div>   
                    <div className="mb-6 text-center">
                        {renderErrors('password')}
                        <input 
                            value={password}  
                            onChange={(e) => setPassword(e.target.value)} 
                            placeholder="Password" 
                            type="password" 
                            id="default-input" 
                            className={renderErrors('password') ? "text-gray-900 text-xl rounded-lg block w-full p-3.5 bg-red-300" : "text-gray-900 text-lg rounded-lg block w-full p-3.5" }
                        />
                    </div> 
                    <div className="mb-6 text-center">
                        <div className="text-lg font-normal text-gray-200 lg:text-xl dark:text-gray-400">
                            <div className="flex flex-wrap justify-start gap-6 mt-5">
                                <button type="submit" className="relative">
                                    <span className="absolute top-0 left-0 mt-2 ml-2 h-full w-full rounded bg-gray-400"></span>
                                    <span className="fold-bold relative inline-block h-full w-full rounded border-2 border-gray-100 bg-black px-7 py-3 text-2xl font-bold text-white transition duration-100 hover:bg-black hover:text-yellow-500">Log in now</span>
                                </button>
                                <Link to="../../auth/restore-password" className="rounded group relative inline-flex border border-red-500 focus:outline-none w-full sm:w-auto">
                                    <span className="rounded w-full inline-flex items-center justify-center self-stretch px-4 py-2 text-sm text-white text-center font-bold uppercase bg-red-500 ring-1 ring-red-500 ring-offset-1 ring-offset-red-500 transform transition-transform group-hover:-translate-y-1 group-hover:-translate-x-1 group-focus:-translate-y-1 group-focus:-translate-x-1">
                                        Click, if you forgot password
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}