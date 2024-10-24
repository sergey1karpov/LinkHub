import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom';

import axios from "axios";
import config from "../../config";
import TextInput from "../../inputs/TextInput";
import DangerAlertButton from "../../buttons/DangerAlert";
import SquareWithShadowButton from "../../buttons/SquareWithShadow";

export default function Login() {
    const [emailOrUsername, setEmailOrUsername] = useState('') //Начальное состояние для username или email = ''
    const [password, setPassword] = useState('') //Начальное состояние для пароля ''
    const [errors, setErrors] = useState([]) //Начальное состояние для валидационных ошибок = []
    const [authError, setAuthError] = useState('') //Начальное состояние для ошибки авторизации('User not found' и 'Invalid password')

    const navigate = useNavigate(); //Редирект

    useEffect(() => {
        document.title = 'Log in'
    }, [])

    async function handleLogin(event) {
        event.preventDefault()

        let data = {emailOrUsername, password}

        try {
            const result = await axios.post(`${config.BACKEND_API_URL}/login`, data); //Отправляем данные на сервер

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
            <div key={index} className="text-red-500 mb-1 rounded bg-danger">
                {error}
            </div>
        ))
    )

    return (
        <div className="m-4">  
            <h1 className="mb-4 text-4xl font-extrabold text-gray-200 dark:text-white md:text-5xl lg:text-6xl">
                <img width={`450px`} height={`450px`} src="https://i.ibb.co/PxFfD29/lhb.png" />
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
                        <TextInput 
                            value={emailOrUsername}
                            placeholder="Email or Username"
                            type="text" 
                            onChangeHandler={(e) => setEmailOrUsername(e.target.value)}
                            validationError={renderErrors('emailOrUsername')}
                        />
                    </div>   
                    <div className="mb-6 text-center">
                        {renderErrors('password')}
                        <TextInput 
                            value={password}
                            placeholder="Password"
                            type="password" 
                            onChangeHandler={(e) => setPassword(e.target.value)}
                            validationError={renderErrors('password')}
                        />
                    </div> 
                    <div className="mb-6 text-center">
                        <div className="text-lg font-normal text-gray-200 lg:text-xl dark:text-gray-400">
                            <div className="flex flex-wrap justify-start gap-6 mt-5">
                                <SquareWithShadowButton>Log in NOW!</SquareWithShadowButton>
                                <DangerAlertButton>Click, if you forgot password</DangerAlertButton>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}