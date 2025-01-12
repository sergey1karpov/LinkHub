import {useState, useEffect} from "react"
import axios from "axios";
import LinkDemo from "./LinkDemo";
import GiphyInput from "./GiphyInput"
import config from "../../config";

export default function AddLink() {
    //const authUserData = useContext(AuthUserContext) //Подключаем контекст

    //LinkData
    const [linkText, setLinkText] = useState('') //Текст ссылки
    const [linkUrl, setLinkUrl] = useState('') //Ссылка
    const [linkContent, setLinkContent] = useState('') //Доп контент к ссылке если есть
    const [img, setImg] = useState('') //Загружаемое юзером изображение
    const [giphy, setGiphy] = useState('') //Вместо изображения можно подтянуть гифку с giphy.com

    const [viewThumbnail, setViewThumbnail] = useState('') //Изображение которое отображается в превью ссылки, не отправляется в бд!!!
    const [errors, setErrors] = useState([]) //Валидационные ошибки если есть
    const [isLinkAdded, setIsLinkAdded] = useState(false) //Маркер что ссылка добавлена

    useEffect(() => {
        document.title = 'Create link'
    }, [])

    //Рендер валидационных ошибок если есть
    const renderErrors = (field) => (
        errors?.[field]?.map((error, index) => (
            <div key={index} className="text-gray-100 bg-red-400 mt-2 rounded bg-danger">
                {error}
            </div>
        ))
    )

    //Функция ресайза изображения для превью\демо ссылки
    function handleResizeImage(event) {
        const file = event.target.files[0] //Берем загружаемый файл
        
        if(file) {
            const reader = new FileReader()
            reader.onload = (e) => {
                setImg(file) //Устанавливаем загруженный файл в img через сеттер setImg(отправляем в бд)
                setViewThumbnail(e.target.result) //Устанавливаем загруженный файл в превью(НЕ отправляем в бд)
            }
            reader.readAsDataURL(file)
        }

        event.target.value = '' //чистим кеш инпута
    }

    //Функция создания ссылки
    async function handleAddLink(event) {
        event.preventDefault()

        let data = new FormData()
        data.append("link_text", linkText)
        data.append("link_url", linkUrl)
        data.append("link_content", linkContent)
        data.append("img_src", img)
        data.append("img_href", giphy)
        data.append("user_id", localStorage.getItem('chrry-userId'))

        try {
            await axios.post(`${config.BACKEND_API_URL}/profile/${localStorage.getItem('chrry-userId')}/add-link`, data)
                .then((response) => {
                    //После успешной отправки данных очищаем поля формы
                    setLinkText('')
                    setLinkUrl('')
                    setLinkContent('')
                    setImg('')
                    setViewThumbnail('')
                    setGiphy('')

                    //Так же добавляем маркер что ссылка добавлена
                    if(response.status === 201) {
                        setIsLinkAdded(true)
                    }
                })
                .catch((error) => {
                    setErrors(error.response.data.errors)
                    setImg('')
                })
        } catch (error) {
            setErrors(error.response.data.errors);
        }
    }

    return ( 
        <div>
            {/* Компонент отрисовки превью созданной ссылки, того как она будет выглядеть после создания */}
            <LinkDemo 
                isLinkAdded={isLinkAdded} //Маркер что ссылка добавлена
                setIsLinkAdded={setIsLinkAdded} //Сеттер для маркера что ссылка добавлена
                alertText={'Link created!'} //Текс для маркера об успешном добавлении ссылки

                title={linkText} //Текст ссылки
                viewThumbnail={viewThumbnail} //Превью изображения, вместо реального изображения
                setViewThumbnail={setViewThumbnail} //Сеттер для превью
                giphy={giphy} //Гифка с giphy
                setGiphy={setGiphy} //Сеттер для giphy
            />
            <div className="max-w-full mx-auto pl-2 pr-2 mb-5 bg-[#08090a]"> 
                <div className="max-w-screen-xl mx-auto pl-2 pr-2 mb-5 bg-[#08090a]"> 
                    <form onSubmit={(event) => handleAddLink(event)} encType="multipart/form-data">
                        <div className="text-center w-full">
                            {renderErrors('link_text')}
                            <input 
                                value={linkText} 
                                onChange={(e) => setLinkText(e.target.value)} 
                                placeholder="Link text" 
                                type="text" 
                                className={renderErrors('linkText') ? "text-gray-900 text-xl rounded-lg block w-full p-3.5 bg-red-300 mt-2" : "text-gray-900 text-lg rounded-lg block w-full p-3.5 mt-2" }
                            />
                        </div>  
                        <div className="text-center w-full">
                            {renderErrors('link_url')}
                            <input 
                                maxLength={255}
                                value={linkUrl} 
                                onChange={(e) => setLinkUrl(e.target.value)} 
                                placeholder="URL Address" 
                                type="text" 
                                className={renderErrors('linkUrl') ? "text-gray-900 text-xl rounded-lg block w-full p-3.5 bg-red-300 mt-2" : "text-gray-900 text-lg rounded-lg block w-full p-3.5 mt-2" }
                            />
                        </div> 
                        <div className="text-center w-full">
                            {renderErrors('link_content')}
                            <textarea 
                                value={linkContent} 
                                onChange={(e) => setLinkContent(e.target.value)} 
                                placeholder="If you want to expand some content when you click on a link" 
                                type="text" 
                                className={renderErrors('linkContent') ? "text-gray-900 text-xl rounded-lg block w-full p-3.5 bg-red-300 mt-2" : "text-gray-900 text-lg rounded-lg block w-full p-3.5 mt-2" }
                            />
                        </div> 
                        <div className="text-center w-full">
                            {renderErrors('img_src')}
                            <label htmlFor="dropzone-file" className="mt-2 flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                    </svg>
                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload image</span> or drag and drop</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPEG, JPG or GIF (MAX. 2mb)</p>
                                </div>
                                <input 
                                    onChange={(e) => {
                                        handleResizeImage(e) //Функция обработчик для картинки превью
                                        setGiphy('') //В случае если у нас уже установлена гифка, и мы хотим загрузить картинку, то через setGiphy удаляем гифку
                                    }} 
                                    placeholder="Upload image" 
                                    type="file" 
                                    id="dropzone-file"
                                    className={renderErrors('img') ? "text-gray-900 text-xl rounded-lg block w-full p-3.5 bg-red-300 mt-2 hidden" : "text-gray-900 text-lg rounded-lg block w-full p-3.5 mt-2 hidden" }
                                />
                            </label>
                        </div>  

                        {/* Компонент инпута поиска и подгрузки гиф с сервиса giphy.com */}
                        {/* В компонент передаем 2 пропса: setViewThumbnail - установка изображения в превью, setGiphy - установка гифки */}
                        {/* Если у нас установлена картинка, то в превью отображается viewThumbnail, далее хотим заменить картинку на гифку с сервиса
                        и при выборе этой гифки мы очищаем viewThumbnail через setViewThumbnail и устанавливаем гифку setGiphy*/}
                        <GiphyInput setViewThumbnail={setViewThumbnail} setGiphy={setGiphy} setImg={setImg}/>

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
        </div>    
    )
}