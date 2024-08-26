import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import axios from "axios";

export default function AllLinks() {
    const [links, setLinks] = useState([]) //Состояние для ссылок, по дефолту пустой массив

    const config = {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('chrry-api-token')}`,
            'content-type': 'multipart/form-data',
            'Accept': 'application/json'
        }
    }

    //Удаление ссылки
    async function handleDeleteLink(event, linkId) {
        event.preventDefault()
        try {
            await axios.delete(`http://localhost/api/profile/${linkId}/delete-link`, config)
                .then((response) => console.log(response.data))
                .catch((err) => console.log(err))
        } catch (error) {
            console.log(error)
        }
    }

    //При отрисовки компонента делаем запрос на сервер для получения всех ссылок юзера
    useEffect(() => {
        try {
            axios.get(`http://localhost/api/profile/${localStorage.getItem('chrry-userId')}/all-links`, config)
                .then((response) => setLinks(response.data)) //Устанавливаем полученные ссылки в links
                .catch((err) => console.log(err))
        } catch (error) {
            console.log(error)
        }
    }, [links])

    return (
        <div className="mt-24">
            {links && links.map((link) => { {/*Итерация по ссылкам через map js */}
                return (
                    <div key={link.id} className="max-w-full mx-auto pl-2 pr-2 bg-[#08090a]"> 
                        <div className="bg-[#08090a] rounded-b-lg mt-1 mx-auto max-w-screen-xl px-4 pt-4 pb-4 sm:px-6 lg:px-8">
                            <table className="table w-full">
                                <tbody>
                                    <tr data-index="" data-position="">
                                        <td>
                                            <div id="block" className="justify-center text-center bg-[#08090a]" data-index="" data-position="">
                                                <div className="lg:flex lg:justify-center">
                                                    <div className={`row card ms-1 me-1 lg:w-2/4 bg-green-100`} id="background"
                                                        style={{
                                                            'animationDuration': '2s',
                                                            'backgroundPosition': 'center',
                                                            'marginRight': '5px',
                                                        }}>
                                                        <div className="flex align-center justify-between"
                                                            style={{'paddingLeft': '4px', 'paddingRight': '4px'}}>
                                                            {/* !!! */}
                                                            {/* Задать базовые стили для div для отображение img */}
                                                            {/* !!! */}
                                                            <div className="col-span-1 flex items-center flex-none">
                                                                {link.img_src && <img className="mt-1 mb-1"
                                                                    src={`http://localhost/${link.img_src}`}
                                                                    id="avatar-user"
                                                                    style={{'width':'50px', 'borderRadius': '10px'}} />} 
                                                                {link.img_href && <img className="mt-1 mb-1"
                                                                    src={link.img_href}
                                                                    id="avatar-user"
                                                                    style={{'width':'50px', 'borderRadius': '10px'}} />}   
                                                            </div>
                                                            <button type="submit"
                                                                    style={{
                                                                        'border': 0,
                                                                        'padding': 0,
                                                                        'backgroundColor': 'rgba(0, 125, 215, 0)',
                                                                    }}>
                                                                <div className="col-span-10 text-center flex items-center">
                                                                    <div className="ml-3 mr-3">
                                                                        <h4 id="title-text" className="drop-shadow-md text-ellipsis"
                                                                            style={{'margin': '0 0 0 5px'}}>
                                                                                {link.link_text}
                                                                        </h4>
                                                                    </div>
                                                                </div>
                                                            </button>
                                                            <div className="col-span-1 flex items-center flex-none mt-1 mb-1"
                                                                style={{'opacity': 0, 'width': '50px', 'height': '50px',}}>
                                                                <div href=""
                                                                    className="text-indigo-900  border-indigo-900 hover:bg-indigo-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-indigo-900 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-indigo-900 dark:text-indigo-900 dark:hover:text-white dark:focus:ring-indigo-900">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                                        viewBox="0 0 24 24" strokeWidth="1.5"
                                                                        stroke="currentColor" className="w-7 h-7">
                                                                        <path strokeLinecap="round" strokeLinejoin="round"
                                                                            d="M7.864 4.243A7.5 7.5 0 0119.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 004.5 10.5a7.464 7.464 0 01-1.15 3.993m1.989 3.559A11.209 11.209 0 008.25 10.5a3.75 3.75 0 117.5 0c0 .527-.021 1.049-.064 1.565M12 10.5a14.94 14.94 0 01-3.6 9.75m6.633-4.596a18.666 18.666 0 01-2.485 5.33" />
                                                                    </svg>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="inline-flex rounded-md shadow-sm mt-2" role="group">
                                                    <button type="button" className="px-4 py-2 text-sm font-medium text-gray-900 bg-white rounded-l-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white">
                                                        <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 20V7m0 13-4-4m4 4 4-4m4-12v13m0-13 4 4m-4-4-4 4"/>
                                                        </svg>
                                                    </button>
                                                    <Link to={`../../profile/links/${link.id}/edit`} className="px-4 py-2 text-sm font-medium text-gray-900 bg-white hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white">
                                                        <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                            <path stroke="currentColor" strokeLinecap="square" strokeLinejoin="round" strokeWidth="2" d="M10 19H5a1 1 0 0 1-1-1v-1a3 3 0 0 1 3-3h2m10 1a3 3 0 0 1-3 3m3-3a3 3 0 0 0-3-3m3 3h1m-4 3a3 3 0 0 1-3-3m3 3v1m-3-4a3 3 0 0 1 3-3m-3 3h-1m4-3v-1m-2.121 1.879-.707-.707m5.656 5.656-.707-.707m-4.242 0-.707.707m5.656-5.656-.707.707M12 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                                                        </svg>
                                                    </Link>
                                                    <button type="button" className="px-4 py-2 text-sm font-medium text-gray-900 bg-white hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white">
                                                        <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v15a1 1 0 0 0 1 1h15M8 16l2.5-5.5 3 3L17.273 7 20 9.667"/>
                                                        </svg>
                                                    </button>
                                                    <button onClick={(event) => handleDeleteLink(event, link.id)} type="button" className="px-4 py-2 text-sm font-medium text-gray-900 bg-white rounded-r-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white">
                                                        <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) 
            })}   
        </div>
    )
}