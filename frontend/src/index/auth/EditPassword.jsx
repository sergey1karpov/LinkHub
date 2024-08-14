import { useState } from "react"
import { useSearchParams } from "react-router-dom"
import axios from "axios";

export default function EditPassword() {
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const [errors, setErrors] = useState([])
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const [showAllert, setShowAllert] = useState(false)
    const [authError, setAuthError] = useState('')

    const renderErrors = (field) => (
        errors?.[field]?.map((error, index) => (
            <div key={index} className="text-rose-500 mb-1 rounded bg-danger">
                {error}
            </div>
        ))
    )

    const okAllert = <div className="text-green-500 mb-1 rounded bg-danger">
                        You have successfully set a new password. Login using it
                    </div>

    async function handleChangePassword(event) {
        event.preventDefault()

        let now = new Date();
        let timeToClickLink = now.getFullYear() + '-' +
            ('0' + (now.getMonth() + 1)).slice(-2) + '-' +
            ('0' + now.getDate()).slice(-2) + ' ' +    ('0' + now.getHours()).slice(-2) + ':' +
            ('0' + now.getMinutes()).slice(-2) + ':' +
            ('0' + now.getSeconds()).slice(-2);   

        try {
            const result = await axios.post(`http://localhost/api/change-password`, {password, repeatPassword, token, timeToClickLink});
            console.log(result.data)
            if(result.data) {
                setShowAllert(true)
            }
        } catch (error) {
            setErrors(error.response.data.errors);
            if(error.response.data['error']) {
                setAuthError(error.response.data['error'])
            }
        }
    }

    return (
        <div className="m-4"> 
            <h1 className="mb-4 text-4xl font-extrabold text-gray-200 dark:text-white md:text-5xl lg:text-6xl">
                <img width={`450px`} height={`450px`} src="https://i.ibb.co/kQdGDSs/logosize.png" />
                    Enter your new pass
            </h1>

            {showAllert && okAllert}
            <div>
                {
                    authError && <div className="text-rose-500 mb-1 rounded bg-danger">{authError}</div>
                }
            </div>

            <div className="mt-5">
                <form onSubmit={(event) => handleChangePassword(event)}>
                    <div className="mb-6 text-center">
                        {renderErrors('password')}
                        <input 
                            value={password}  
                            onChange={(e) => setPassword(e.target.value)} 
                            placeholder="Password" 
                            type="password" 
                            className={renderErrors('password') ? "text-gray-900 text-xl rounded-lg block w-full p-3.5 bg-red-300" : "text-gray-900 text-lg rounded-lg block w-full p-3.5" }
                        />
                    </div>   
                    <div className="mb-6 text-center">
                        {renderErrors('repeatPassword')}
                        <input 
                            value={repeatPassword}  
                            onChange={(e) => setRepeatPassword(e.target.value)} 
                            placeholder="Repeat password" 
                            type="password" 
                            className={renderErrors('password') ? "text-gray-900 text-xl rounded-lg block w-full p-3.5 bg-red-300" : "text-gray-900 text-lg rounded-lg block w-full p-3.5" }
                        />
                    </div> 
                    <div className="mb-6 text-center">
                        <div className="text-lg font-normal text-gray-200 lg:text-xl dark:text-gray-400">
                            <div className="flex flex-wrap justify-start gap-6 mt-5">
                                <button type="submit" className="relative">
                                    <span className="absolute top-0 left-0 mt-2 ml-2 h-full w-full rounded bg-gray-400"></span>
                                    <span className="fold-bold relative inline-block h-full w-full rounded border-2 border-gray-100 bg-black px-7 py-3 text-2xl font-bold text-white transition duration-100 hover:bg-black hover:text-yellow-500">Change password</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}