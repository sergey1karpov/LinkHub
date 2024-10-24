import { useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import axios from "axios";
import GiphyInput from "./GiphyInput"
import LinkDemo from "./LinkDemo";
import config from "../../config";

export default function EditLink() {
    const params = useParams() //useParams возвращает все параметры маршрута, в params записываем их

    const [linkText, setLinkText] = useState('') //Текст ссылки
    const [linkUrl, setLinkUrl] = useState('') //Ссылка
    const [linkContent, setLinkContent] = useState('') //Доб контент если есть
    const [img, setImg] = useState('') //Загружаемое изображение
    const [viewThumbnail, setViewThumbnail] = useState('') //Превью загружаемого изображения(НЕ сохранияем в бд)
    const [giphy, setGiphy] = useState('') //Гифка с giphy.com
    const [errors, setErrors] = useState([]) //Ошибки валидации если есть

    const [isLinkAdded, setIsLinkAdded] = useState(false) //Маркер об успешном изменении ссылки

    //Получаем тукущие изображение и гифку, если они есть у редактируемой ссылки
    const [currentImg, setCurrentImg] = useState('') 
    const [currentGiphy, setCurrentGiphy] = useState('')

    //Ошибки валидации
    const renderErrors = (field) => (
        errors?.[field]?.map((error, index) => (
            <div key={index} className="text-gray-100 bg-red-400 mt-2 rounded bg-danger">
                {error}
            </div>
        ))
    )

    //Создание превью картинки для демо ссылки
    function handleResizeImage(event) {
        const file = event.target.files[0]

        if(file) {
            const reader = new FileReader()
            reader.onload = (e) => {
                setImg(file)
                setViewThumbnail(e.target.result)
            }
            reader.readAsDataURL(file)
        }

        event.target.value = ''
    }

    //Изменение ссылки
    async function handleEditLink(event) {
        event.preventDefault()

        let data = new FormData()
        data.append("link_text", linkText)
        data.append("link_url", linkUrl)
        data.append("link_content", linkContent ? linkContent : '')

        //Если загружена гифка с giphy.com
        if (giphy) {
            data.append("img_href", giphy) //Устанавливаем гифку в data

            //Отправляем запрос на сервер с удалением img, если она есть, так img и giphy не могут быть вместе. Либо то, либо это
            const clearData = new FormData()
            await axios.post(`${config.BACKEND_API_URL}/profile/${params.link}/clear-image`, clearData)
                .then((response) => {
                    console.log(response)
                })
                .catch((error) => {
                    console.log(error)
                })
        }

        //Если загружено изображение
        if (img) {
            data.append("img_src", img)

            //Отправляем запрос на удаление гифки с giphy.com
            const clearData = new FormData()
            await axios.post(`${config.BACKEND_API_URL}/profile/${params.link}/clear-giphy`, clearData)
                .then((response) => {
                    console.log(response)
                })
                .catch((error) => {
                    console.log(error)
                })
        }

        try {
            //Выполняем сам запрос с отправкой данных на сервер
            await axios.post(`${config.BACKEND_API_URL}/profile/${params.link}/edit-link`, data)
                .then((response) => {

                    //Если запрос успешен, ставим маркер обновления
                    //!!!
                    //Переименовать, тк added это добавление = унифицировать
                    //!!!
                    if(response.status == 201) {
                        setIsLinkAdded(true)
                    }
                    setImg(img) //Устанавливаем изображение в img, если есть
                    setGiphy(giphy) //Устанавливаем gif в giphy, если есть
                })
                .catch((error) => {
                    setErrors(error.response.data.errors)
                    setImg('')
                    setGiphy('')
                })
        } catch (error) {
            setErrors(error.response.data.errors);
        }
    }

    //Во время рендера компонента делаем get запрос на сервер и получаем ссылку, которую хотим редактировать
    useEffect(() => {
        try {
            axios.get(`${config.BACKEND_API_URL}/profile/link/${params.link}`)
                .then((response) => {
                    //Устанвливаем данные для превью ссылки
                    setLinkText(response.data.data.link_text) //Ставим текст ссылки
                    setLinkUrl(response.data.data.link_url) //Ставим ссылку
                    setLinkContent(response.data.data.link_content) //Доп контент если есть
                    setCurrentImg(response.data.data.img_src) //Текущая картинка если есть
                    setCurrentGiphy(response.data.data.img_href) //Текущая гифка если есть
                })
                .catch((err) => console.log(err))
        } catch (error) {
            console.log(error)
        }
    }, [])

    return (
        <>
            {/* Компонент отрисовки превью созданной ссылки, того как она будет выглядеть после создания */}
            <LinkDemo 
                isLinkAdded={isLinkAdded} //Маркер что ссылка добавлена
                setIsLinkAdded={setIsLinkAdded} //Сеттер для маркера что ссылка добавлена
                alertText={'Updated!'} //Текс для маркера об успешном добавлении ссылки

                title={linkText} //Текст ссылки
                linkUrl={linkUrl} //Сама ссылка
                //Контент?
                img={img} //Загруженное изображение
                setImg={setImg} //Сеттер для загруженного изображения
                viewThumbnail={viewThumbnail} //Превью загруженного изображения
                setViewThumbnail={setViewThumbnail} //Сеттер для превью загруженного изображения
                giphy={giphy} //Гифка с giphy
                setGiphy={setGiphy} //Сеттер для giphy

                currentImg={currentImg} //Текущее загруженное изображение
                setCurrentImg={setCurrentImg} //Сеттер для текущего загруженного изображения
                currentGiphy={currentGiphy} //Текущая гифка с giphy.com
                setCurrentGiphy={setCurrentGiphy} //Сеттер для текущей гифки с giphy.com
            />
            <div className="max-w-full mx-auto pl-2 pr-2 mb-5 bg-[#08090a]"> 
                <div className="max-w-screen-xl mx-auto pl-2 pr-2 mb-5 bg-[#08090a]">  
                    <form onSubmit={(event) => handleEditLink(event)} encType="multipart/form-data">
                        <div className="text-center w-full">
                            {renderErrors('link_text')}
                            <input 
                                value={linkText} 
                                onChange={(e) => setLinkText(e.target.value)} 
                                placeholder="Link text" 
                                type="text" 
                                className={renderErrors('link_text') ? "text-gray-900 text-xl rounded-lg block w-full p-3.5 bg-red-300 mt-2" : "text-gray-900 text-lg rounded-lg block w-full p-3.5 mt-2" }
                            />
                        </div>  
                        <div className="text-center w-full">
                            {renderErrors('link_url')}
                            <input 
                                value={linkUrl} 
                                onChange={(e) => setLinkUrl(e.target.value)} 
                                placeholder="URL Address" 
                                type="text" 
                                className={renderErrors('link_url') ? "text-gray-900 text-xl rounded-lg block w-full p-3.5 bg-red-300 mt-2" : "text-gray-900 text-lg rounded-lg block w-full p-3.5 mt-2" }
                            />
                        </div> 
                        <div className="text-center w-full">
                            {renderErrors('link_content')}
                            <textarea 
                                value={linkContent ? linkContent : ''} 
                                onChange={(e) => setLinkContent(e.target.value)} 
                                placeholder="If you want to expand some content when you click on a link" 
                                type="text" 
                                className={renderErrors('link_content') ? "text-gray-900 text-xl rounded-lg block w-full p-3.5 bg-red-300 mt-2" : "text-gray-900 text-lg rounded-lg block w-full p-3.5 mt-2" }
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
                                        handleResizeImage(e) //Функция обработчик загружаемого изображения
                                        
                                        //После загрузки изображения очищаем giphy, текущую giphy и текущее изображение
                                        setGiphy('') 
                                        setCurrentImg('')
                                        setCurrentGiphy('')
                                    }}  
                                    placeholder="Upload image" 
                                    type="file" 
                                    id="dropzone-file"
                                    className={renderErrors('img_src') ? "text-gray-900 text-xl rounded-lg block w-full p-3.5 bg-red-300 mt-2 hidden" : "text-gray-900 text-lg rounded-lg block w-full p-3.5 mt-2 hidden" }
                                />
                            </label>
                        </div>  

                        {/* Компонент инпута поиска и подгрузки гиф с сервиса giphy.com */}
                        <GiphyInput 
                            setCurrentImg={setCurrentImg} //Сеттер текущей загружаемого изображения
                            setCurrentGiphy={setCurrentGiphy} //Сеттер текущей гифки с giphy.com
                            setViewThumbnail={setViewThumbnail} //Сеттер превью загружаемого изображения
                            setGiphy={setGiphy} //Сеттер для giphy.com
                            setImg={setImg} //Сеттер для загружаемого изображения
                        />

                        <div className="text-center">
                            <div className="text-lg font-normal text-gray-200 lg:text-xl dark:text-gray-400">
                                <div className="flex flex-wrap justify-start gap-6 mt-5">
                                    <button className="mb-5 rounded group relative inline-flex border border-green-500 focus:outline-none w-full sm:w-auto">
                                        <span className="rounded w-full inline-flex items-center justify-center self-stretch px-4 py-2 text-xl text-white text-center font-bold uppercase bg-green-500 ring-1 ring-green-500 ring-offset-1 ring-offset-greeen-500 transform transition-transform group-hover:-translate-y-1 group-hover:-translate-x-1 group-focus:-translate-y-1 group-focus:-translate-x-1">
                                            Edit link
                                        </span>
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