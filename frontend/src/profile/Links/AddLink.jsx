import { useState, useContext } from "react"
import GiphyInput from "./GiphyInput"
import AuthUserContext from "../../contexts/AuthUserContext"
import axios from "axios";

export default function AddLink() {
    const authUserData = useContext(AuthUserContext)

    const [linkText, setLinkText] = useState('')
    const [linkUrl, setLinkUrl] = useState('')
    const [linkContent, setLinkContent] = useState('')
    const [img, setImg] = useState('')
    const [giphy, setGiphy] = useState('')
    const [errors, setErrors] = useState([])

    const renderErrors = (field) => (
        errors?.[field]?.map((error, index) => (
            <div key={index} className="text-rose-500 mb-1 rounded bg-danger">
                {error}
            </div>
        ))
    )

    async function handleAddLink(event) {
        event.preventDefault()

        let data = new FormData()
        data.append("link_text", linkText)
        data.append("link_url", linkUrl)
        data.append("link_content", linkContent)
        data.append("img_src", img)
        data.append("img_href", giphy)
        data.append("user_id", authUserData.id)

        console.log(`http://localhost/api/profile/${localStorage.getItem('chrry-userId')}/add-link`)

        const config = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('chrry-api-token')}`,
                'content-type': 'multipart/form-data',
                'Accept': 'application/json'
            }
        }

        try {
            await axios.post(`http://localhost/api/profile/${localStorage.getItem('chrry-userId')}/add-link`, data, config)
                .then((response) => console.log(response))
                .catch((err) => console.log(err))
        } catch (error) {
            setErrors(error.response.data.errors);
        }
    }

    return ( 
        <div className="mt-24 max-w-full mx-auto pl-2 pr-2 mb-5 bg-[#08090a]"> 
            <div className="mt-24 max-w-screen-xl mx-auto pl-2 pr-2 mb-5 bg-[#08090a]">  
                <form onSubmit={(event) => handleAddLink(event)}>
                    <div className="text-center w-full">
                        {renderErrors('linkText')}
                        <input 
                            value={linkText} 
                            onChange={(e) => setLinkText(e.target.value)} 
                            placeholder="Link text" 
                            type="text" 
                            className={renderErrors('linkText') ? "text-gray-900 text-xl rounded-lg block w-full p-3.5 bg-red-300 mt-24" : "text-gray-900 text-lg rounded-lg block w-full p-3.5 mt-24" }
                        />
                    </div>  
                    <div className="text-center w-full">
                        {renderErrors('linkUrl')}
                        <input 
                            value={linkUrl} 
                            onChange={(e) => setLinkUrl(e.target.value)} 
                            placeholder="URL Address" 
                            type="text" 
                            className={renderErrors('linkUrl') ? "text-gray-900 text-xl rounded-lg block w-full p-3.5 bg-red-300 mt-2" : "text-gray-900 text-lg rounded-lg block w-full p-3.5 mt-2" }
                        />
                    </div> 
                    <div className="text-center w-full">
                        {renderErrors('linkContent')}
                        <textarea 
                            value={linkContent} 
                            onChange={(e) => setLinkContent(e.target.value)} 
                            placeholder="If you want to expand some content when you click on a link" 
                            type="text" 
                            className={renderErrors('linkContent') ? "text-gray-900 text-xl rounded-lg block w-full p-3.5 bg-red-300 mt-2" : "text-gray-900 text-lg rounded-lg block w-full p-3.5 mt-2" }
                        />
                    </div> 
                    <div className="text-center w-full">
                        {renderErrors('img')}
                        <label htmlFor="dropzone-file" className="mt-2 flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                </svg>
                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload image</span> or drag and drop</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                            </div>
                            <input 
                                value={img} 
                                onChange={(e) => setImg(e.target.value)} 
                                placeholder="Upload image" 
                                type="file" 
                                id="dropzone-file"
                                className={renderErrors('img') ? "text-gray-900 text-xl rounded-lg block w-full p-3.5 bg-red-300 mt-2 hidden" : "text-gray-900 text-lg rounded-lg block w-full p-3.5 mt-2 hidden" }
                            />
                        </label>
                    </div>  

                    <GiphyInput giphy={giphy} setGiphy={setGiphy}/>

                    <div className="text-center">
                        <div className="text-lg font-normal text-gray-200 lg:text-xl dark:text-gray-400">
                            <div className="flex flex-wrap justify-start gap-6 mt-5">
                                <button className="mb-5 rounded group relative inline-flex border border-green-500 focus:outline-none w-full sm:w-auto">
                                    <span className="rounded w-full inline-flex items-center justify-center self-stretch px-4 py-2 text-xl text-white text-center font-bold uppercase bg-green-500 ring-1 ring-green-500 ring-offset-1 ring-offset-greeen-500 transform transition-transform group-hover:-translate-y-1 group-hover:-translate-x-1 group-focus:-translate-y-1 group-focus:-translate-x-1">
                                        Add new super link
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}