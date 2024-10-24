import { useRef, useState } from "react"
import { GiphyFetch } from '@giphy/js-fetch-api'
import config from "../../config"

export default function GiphyInput(props) {
    const [searchGif, setSearchGif] = useState('')
    const [gifs, setGifs] = useState([])
    const [page, setPage] = useState(0)

    const gifInputRef = useRef() //Ссылка на поле ввода для giphy <textarea>

    //!!!
    //Вынести в env
    //!!!
    const gf = new GiphyFetch(config.GIPHY_APY_KEY)

    //Функция подгрузки giphy c giphy.com
    async function loadGifs(term, page) {
        const {data} = await gf.search(term, {limit:10, offset: page * 10}) //Получаем данные {10 записей и кол-во сколько: стр * 10}
        setGifs((prevGifs) => [...prevGifs, ...data]) //Записываем их в gifs через сеттер
    }

    //Подшрузка еще giphy
    function handleLoadMore(event) {
        event.preventDefault()
        const nextPage = page + 1 //nextPage = текущая стр + 1
        setPage(nextPage) //Установка новой страницы
        loadGifs(searchGif, nextPage) //Вызываем функцию подшрузки с искомой частью, которую установили в handleInputChange и страницей
    }

    //Обработчик поля ввода
    function handleInputChange(event) {
        const term = event.target.value //Часть слова по которой ищем gif. Напр.: 'Micky mo...'
        setSearchGif(term) //Устанавливаем искомую часть гифки в состояние searchGif
        loadGifs(term, 0) //Передаем искомую часть гифки в функцию loadGifs
    }

    return (
        <div className="mt-2">
            <div>
                <textarea
                    maxLength={15}
                    ref={gifInputRef}
                    type="text"
                    onChange={handleInputChange}
                    placeholder="Search gif..."
                    className="text-gray-900 text-lg rounded-lg block w-full p-3.5 mt-2"
                    style={{
                        backgroundOrigin: 'content-box', 
                        backgroundImage: `url("https://upload.wikimedia.org/wikipedia/commons/8/82/Giphy-logo.svg")`, 
                        backgroundSize: '150px', 
                        backgroundRepeat: 'no-repeat', 
                        backgroundPosition: 'right center',
                    }}
                />

                <div className="w-full" style={{ display: 'flex', flexWrap: 'wrap', backgroundColor: '#08090a' }}>
                    {gifs.map((gif, idx) => (
                        <div key={idx} style={{ marginTop: '8px' }}>
                            <img
                                src={gif.images.fixed_height.url}
                                alt={gif.title}
                                onClick={() => {
                                    props.setGiphy(gif.images.original.url)  //Устанавливаем в giphy url выбранной гифки
                                    props.setViewThumbnail('') //Очищаем превью изображения если есть
                                    setGifs([]) //Очищаем все подгруженные гифки
                                    props.setImg('')
                                    //Часть отрабатывает при обновлении ссылки
                                    if(props.setCurrentImg) {
                                        props.setCurrentImg('')
                                        props.setCurrentGiphy('')
                                    }
                                }}
                                style={{ cursor: 'pointer' }}
                            />
                        </div>
                    ))}
                </div>
                {/* Кнопка подгрузки еще 10 giphy */}
                {gifs.length > 0 && (
                    <button onClick={(e) => handleLoadMore(e)} className="mt-2 w-full px-4 py-2 bg-gray-100 border flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150">
                        <img className="w-20 h-7" src="https://upload.wikimedia.org/wikipedia/commons/8/82/Giphy-logo.svg" loading="lazy" alt="google logo" />
                        <span className="font-bold text-lg">Load more gifs...</span>
                    </button>
                )}
            </div> 
        </div>
    )
}