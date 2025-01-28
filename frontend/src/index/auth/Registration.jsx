import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom';

import axios from "axios";
import config from "../../config";
import TextInput from "../../inputs/TextInput";
import SquareWithShadowButton from "../../buttons/SquareWithShadow";
import GoogleButton from "../../buttons/GoogleButton";

export default function Registration() {
    //Устанавливаем начальное состояние для переменных => [переменная, функция установщик состояния(setter)]
    const [firstname, setFirstName] = useState('')
    const [lastname, setLastName] = useState('')
    const [username, setUserName] = useState('')
    const [slug, setSlug] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState([]) //Состояние для ошибок валидации, по дефолту пустой массив

    const navigate = useNavigate(); //Для редиректа

    useEffect(() => {
        document.title = 'Registration'
    }, [])

    //Функция обработчик формы регистрации
    async function handleRegistration(event) {
        event.preventDefault() //Отменяем привычное состояние кнопки(перезагрузка при нажатии)

        let data = {firstname, lastname, username, slug, email, password} //Формируем объект данных для отправки на серве

        try {
            //Отправляем данные, получаем в ответ токен, юзернейм и id изера
            const result = await axios.post(`${config.BACKEND_API_URL}/registration`, data);

            //Полученные данные записываем в localStorage
            localStorage.setItem('chrry-userId', result.data.userId)
            localStorage.setItem('chrry-username', result.data.username)
            localStorage.setItem('chrry-api-token', result.data.token)

            navigate(`/profile/dashboard`); //Редирект в личный кабинет после успешной регистрации 
        } catch (error) {
            setErrors(error.response.data.errors); //Если есть ошибки валидации, записывем их в errors через сеттер setErrors[field => error]
        }
    }

    //Обработка валидационных ошибок
    //Example: передаем поле(field) = 'firstname', если в errors есть ошибка по ключу 'firstname', то итерируемся
    //по ней field => error и выводим над инпутом
    const renderErrors = (field) => (
        errors?.[field]?.map((error, index) => ( //Если ошибки есть, итерируемся по каждой [field => error] и записываем в renderErrors
            <div key={index} className="text-red-500 mb-1 rounded bg-danger">
                {error}
            </div>
        ))
    )

    return (
        <div className="m-4">  
            <h1 className="mb-4 text-4xl font-extrabold text-gray-200 dark:text-white md:text-5xl lg:text-6xl">
                <img width={`450px`} height={`450px`} src="https://i.ibb.co/PxFfD29/lhb.png"  alt={`LinkHub`}/>
                    Registration for free
            </h1>

            <div className="mt-5">
                <form onSubmit={(event) => handleRegistration(event)}>
                    <div className="mb-6 text-center">
                        {renderErrors('firstname')} {/* Если есть ошибка в firstname, то выводим ее */}
                        <TextInput
                            value={firstname}
                            placeholder="First Name"
                            type="text"
                            onChangeHandler={(e) => setFirstName(e.target.value)}
                            validationError={renderErrors('firstname')}
                        />
                    </div>
                    <div className="mb-6 text-center">
                        {renderErrors('lastname')}
                        <TextInput
                            value={lastname}
                            placeholder="Last Name"
                            type="text"
                            onChangeHandler={(e) => setLastName(e.target.value)}
                            validationError={renderErrors('lastname')}
                        />
                    </div>
                    <div className="mb-6 text-center">
                        {renderErrors('username')}
                        <TextInput
                            value={username}
                            placeholder="Username"
                            type="text"
                            onChangeHandler={(e) => setUserName(e.target.value)}
                            validationError={renderErrors('username')}
                        />
                    </div>
                    <div className="mb-6 text-center">
                        {renderErrors('slug')}
                        <TextInput
                            value={slug}
                            placeholder="Slug"
                            type="text"
                            onChangeHandler={(e) => setSlug(e.target.value)}
                            validationError={renderErrors('slug')}
                        />
                    </div>
                    <div className="mb-6 text-center">
                        {renderErrors('email')}
                        <TextInput
                            value={email}
                            placeholder="Email"
                            type="email"
                            onChangeHandler={(e) => setEmail(e.target.value)}
                            validationError={renderErrors('email')}
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
                                <SquareWithShadowButton>Join to us</SquareWithShadowButton>
                            </div>
                        </div>
                    </div>
                </form>
                <div>
                    <GoogleButton/>
                </div>
            </div>
        </div>
    )
}