import { useState } from "react"
import axios from "axios";

//Компонент восставновления пароля
export default function RestorePassword() {
    const [email, setEmail] = useState('') //Начальное состояние для email
    const [errors, setErrors] = useState([]) //Начальное состояние для ошибок валидации если будут
    const [showAllert, setShowAllert] = useState(false) //alert для уведомления что письмо ушло на почту
    
    //Ошибки валидации данных
    const renderErrors = (field) => (
        errors?.[field]?.map((error, index) => (
            <div key={index} className="text-rose-500 mb-1 rounded bg-danger">
                {error}
            </div>
        ))
    )

    //Блок с алертом, об успешной отправке письма на почту
    const okAllert = <div className="text-green-500 mb-1 rounded bg-danger">
                        We have sent you an email and attached a link to reset your password
                    </div>

    //Функция обработчик восстановление пароля
    async function handleRestore(event) {
        event.preventDefault()

        try {
            const result = await axios.post('http://localhost/api/restore-password', {email});

            //Если после отправки данных получаем от сервера код 200, то showAllert устанавливаем в true и отображаем его
            if (result.status === 200) {
                setShowAllert(true)
            }
        } catch (error) {
            setErrors(error.response.data.errors);
        }
    }

    return (
        <>
            <div className="m-4">  
                <h1 className="mb-4 text-4xl font-extrabold text-gray-200 dark:text-white md:text-5xl lg:text-6xl">
                    <img width={`450px`} height={`450px`} src="https://i.ibb.co/kQdGDSs/logosize.png" />
                        Restore your password
                </h1>

                {/* Если showAllert == true, то отображаем содержимое okAllert */}
                {showAllert && okAllert}

                <div className="mt-5">
                    <form onSubmit={(event) => handleRestore(event)}>
                        <div className="mb-6 text-center">
                            {renderErrors('email')}
                            <input 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                placeholder="Email" 
                                type="email" 
                                className={renderErrors('email') ? "text-gray-900 text-xl rounded-lg block w-full p-3.5 bg-red-300" : "text-gray-900 text-lg rounded-lg block w-full p-3.5" }
                            />
                        </div>   
                        <div className="mb-6 text-center">
                            <div className="text-lg font-normal text-gray-200 lg:text-xl dark:text-gray-400">
                                <div className="flex flex-wrap justify-start gap-6 mt-5">
                                    <button type="submit" className="relative">
                                        <span className="absolute top-0 left-0 mt-2 ml-2 h-full w-full rounded bg-gray-400"></span>
                                        <span className="fold-bold relative inline-block h-full w-full rounded border-2 border-gray-100 bg-black px-7 py-3 text-2xl font-bold text-white transition duration-100 hover:bg-black hover:text-yellow-500">Restore password</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}