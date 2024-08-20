import { useEffect, useState } from "react"
import axios from "axios";
import { Link } from "react-router-dom";

export default function AllLinks() {
    const [links, setLinks] = useState([])

    const config = {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('chrry-api-token')}`,
            'content-type': 'multipart/form-data',
            'Accept': 'application/json'
        }
    }

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

    useEffect(() => {
        try {
            axios.get(`http://localhost/api/profile/${localStorage.getItem('chrry-userId')}/all-links`, config)
                .then((response) => setLinks(response.data))
                .catch((err) => console.log(err))
        } catch (error) {
            console.log(error)
        }
    }, [links])

    return (
        <div className="mt-24">
            {links && links.map((link) => {
                return (
                    <div key={link.id} className="max-w-full mx-auto pl-2 pr-2 mb-5 bg-[#08090a]"> 
                        <div className="max-w-screen-xl mx-auto pl-2 pr-2 bg-[#08090a]">
                            <table className="table w-full">
                                <tbody>
                                    <tr data-index="" data-position="">
                                        <td>
                                            <div id="block" className="justify-center text-center bg-red-100" data-index="" data-position="">
                                                <div >
                                                    <div className="row card ms-1 me-1" id="background"
                                                        style={{
                                                            'animationDuration': '2s',
                                                            'backgroundPosition': 'center',
                                                            'marginRight': '5px',
                                                        }}>
                                                        <div className="flex align-center justify-between"
                                                            style={{'paddingLeft': '4px', 'paddingRight': '4px'}}>
                                                            <div className="col-span-1 flex items-center flex-none">
                                                                <img className="mt-1 mb-1"
                                                                    src=""
                                                                    id="avatar-user"
                                                                    style={{'width':'50px', 'borderRadius': '10px'}} />    
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
                                                            <div className="col-span-1 flex items-center flex-none"
                                                                style={{'opacity': 0}}>
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
                                            </div>
                                            <div className="inline-flex rounded-md shadow-sm" role="group">
                                                <Link to={`../../profile/links/${link.id}/edit`} className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white">
                                                    Edit
                                                </Link>
                                                <button onClick={(event) => handleDeleteLink(event, link.id)} type="button" className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white">
                                                    Delete
                                                </button>
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