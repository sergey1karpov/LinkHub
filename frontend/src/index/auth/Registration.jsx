import { useState } from "react"
import { useNavigate } from 'react-router-dom';
import axios from "axios";

export default function Registration() {
    const [firstname, setFirstName] = useState('')
    const [lastname, setLastName] = useState('')
    const [username, setUserName] = useState('')
    const [slug, setSlug] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState([])

    const navigate = useNavigate();

    async function handleRegistration(event) {
        event.preventDefault()

        let data = {firstname, lastname, username, slug, email, password}

        try {
            const result = await axios.post('http://localhost/api/registration', data);

            localStorage.setItem('chrry-userId', result.data.userId)
            localStorage.setItem('chrry-username', result.data.username)
            localStorage.setItem('chrry-api-token', result.data.token)

            navigate(`/profile/dashboard`); 
        } catch (error) {
            setErrors(error.response.data.errors);
        }
    }

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
                    Registration for free
            </h1>

            <div className="mt-5">
                <form onSubmit={(event) => handleRegistration(event)}>
                <div className="mb-6 text-center">
                        {renderErrors('firstname')}
                        <input 
                            value={firstname} 
                            onChange={(e) => setFirstName(e.target.value)} 
                            placeholder="First Name" 
                            type="text" 
                            className={renderErrors('firstname') ? "text-gray-900 text-xl rounded-lg block w-full p-3.5 bg-red-300" : "text-gray-900 text-xl rounded-lg block w-full p-3.5" }
                        />
                    </div>   
                    <div className="mb-6 text-center">
                        {renderErrors('lastname')}
                        <input 
                            value={lastname}  
                            onChange={(e) => setLastName(e.target.value)} 
                            placeholder="Last Name" 
                            type="text" 
                            className={renderErrors('lastname') ? "text-gray-900 text-xl rounded-lg block w-full p-3.5 bg-red-300" : "text-gray-900 text-xl rounded-lg block w-full p-3.5" }
                        />
                    </div> 
                    <div className="mb-6 text-center">
                        {renderErrors('username')}
                        <input 
                            value={username}
                            onChange={(e) => setUserName(e.target.value)} 
                            placeholder="Username" 
                            type="text" 
                            className={renderErrors('username') ? "text-gray-900 text-xl rounded-lg block w-full p-3.5 bg-red-300" : "text-gray-900 text-xl rounded-lg block w-full p-3.5" }
                        />
                    </div> 
                    <div className="mb-6 text-center">
                        {renderErrors('slug')}
                        <input 
                            value={slug}  
                            onChange={(e) => setSlug(e.target.value)} 
                            placeholder="Slug" 
                            type="text" 
                            className={renderErrors('slug') ? "text-gray-900 text-xl rounded-lg block w-full p-3.5 bg-red-300" : "text-gray-900 text-xl rounded-lg block w-full p-3.5" } 
                        />
                    </div> 
                    <div className="mb-6 text-center">
                        {renderErrors('email')}
                        <input 
                            value={email}  
                            onChange={(e) => setEmail(e.target.value)} 
                            placeholder="Email" 
                            type="email" 
                            className={renderErrors('email') ? "text-gray-900 text-xl rounded-lg block w-full p-3.5 bg-red-300" : "text-gray-900 text-xl rounded-lg block w-full p-3.5" } 
                        />
                    </div> 
                    <div className="mb-6 text-center">
                        {renderErrors('password')}
                        <input 
                            value={password}  
                            onChange={(e) => setPassword(e.target.value)} 
                            placeholder="Password" 
                            type="password" 
                            className={renderErrors('password') ? "text-gray-900 text-xl rounded-lg block w-full p-3.5 bg-red-300" : "text-gray-900 text-xl rounded-lg block w-full p-3.5" }
                        />
                    </div>
                    <div className="mb-6 text-center">
                        <div className="text-lg font-normal text-gray-200 lg:text-xl dark:text-gray-400">
                            <div className="flex flex-wrap justify-start gap-6 mt-5">
                                <button type="submit" className="relative">
                                    <span className="absolute top-0 left-0 mt-2 ml-2 h-full w-full rounded bg-gray-400"></span>
                                    <span className="fold-bold relative inline-block h-full w-full rounded border-2 border-gray-100 bg-black px-7 py-3 text-2xl font-bold text-white transition duration-100 hover:bg-black hover:text-yellow-500">Join to us</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>



        // <div className="md:w-auto w-full m-4">
        //     <div className="text-center">  
        //         <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-200 md:text-5xl lg:text-6xl dark:text-white">Join to 
        //             <span className="text-transparent bg-clip-text bg-gradient-to-r to-rose-600 from-rose-400 ml-2">
        //                 CHRRY.ME
        //             </span> 
        //         </h1>
        //         <form onSubmit={(event) => handleRegistration(event)}>
        //             <div className="mb-6 text-center">
        //                 {renderErrors('firstname')}
        //                 <input 
        //                     value={firstname} 
        //                     onChange={(e) => setFirstName(e.target.value)} 
        //                     placeholder="First Name" 
        //                     type="text" 
        //                     className={renderErrors('firstname') ? "text-gray-900 text-sm rounded-lg block w-full p-2.5 bg-red-300" : "text-gray-900 text-sm rounded-lg block w-full p-2.5" }
        //                 />
        //             </div>   
        //             <div className="mb-6 text-center">
        //                 {renderErrors('lastname')}
        //                 <input 
        //                     value={lastname}  
        //                     onChange={(e) => setLastName(e.target.value)} 
        //                     placeholder="Last Name" 
        //                     type="text" 
        //                     className={renderErrors('lastname') ? "text-gray-900 text-sm rounded-lg block w-full p-2.5 bg-red-300" : "text-gray-900 text-sm rounded-lg block w-full p-2.5" }
        //                 />
        //             </div> 
        //             <div className="mb-6 text-center">
        //                 {renderErrors('username')}
        //                 <input 
        //                     value={username}
        //                     onChange={(e) => setUserName(e.target.value)} 
        //                     placeholder="Username" 
        //                     type="text" 
        //                     className={renderErrors('username') ? "text-gray-900 text-sm rounded-lg block w-full p-2.5 bg-red-300" : "text-gray-900 text-sm rounded-lg block w-full p-2.5" }
        //                 />
        //             </div> 
        //             <div className="mb-6 text-center">
        //                 {renderErrors('slug')}
        //                 <input 
        //                     value={slug}  
        //                     onChange={(e) => setSlug(e.target.value)} 
        //                     placeholder="Slug" 
        //                     type="text" 
        //                     className={renderErrors('slug') ? "text-gray-900 text-sm rounded-lg block w-full p-2.5 bg-red-300" : "text-gray-900 text-sm rounded-lg block w-full p-2.5" } 
        //                 />
        //             </div> 
        //             <div className="mb-6 text-center">
        //                 {renderErrors('email')}
        //                 <input 
        //                     value={email}  
        //                     onChange={(e) => setEmail(e.target.value)} 
        //                     placeholder="Email" 
        //                     type="email" 
        //                     className={renderErrors('email') ? "text-gray-900 text-sm rounded-lg block w-full p-2.5 bg-red-300" : "text-gray-900 text-sm rounded-lg block w-full p-2.5" } 
        //                 />
        //             </div> 
        //             <div className="mb-6 text-center">
        //                 {renderErrors('password')}
        //                 <input 
        //                     value={password}  
        //                     onChange={(e) => setPassword(e.target.value)} 
        //                     placeholder="Password" 
        //                     type="password" 
        //                     className={renderErrors('password') ? "text-gray-900 text-sm rounded-lg block w-full p-2.5 bg-red-300" : "text-gray-900 text-sm rounded-lg block w-full p-2.5" }
        //                 />
        //             </div> 
        //             <div className="mb-6 text-center">
        //                 <button 
        //                     type="submit" 
        //                     className="mb-5 text-white text-xl bg-gradient-to-br from-rose-500 to-rose-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        //                 >
        //                     Register
        //                 </button>
        //             </div>
        //         </form>
        //     </div>
        // </div>
    )
}