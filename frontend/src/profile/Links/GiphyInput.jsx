import { useRef, useState } from "react"
import { GiphyFetch } from '@giphy/js-fetch-api'

export default function GiphyInput({giphy, setGiphy}) {
    const [searchTerm, setSearchTerm] = useState('')
    const [gifs, setGifs] = useState([])
    const [page, setPage] = useState(0)

    const gifInputRef = useRef()

    const gf = new GiphyFetch('BZ0VqcrcHsB6zJ6o4cCek2a9Hqy34JFJ')

    async function loadGifs(term, page) {
        const {data} = await gf.search(term, {limit:10, offset: page * 10})
        setGifs((prevGifs) => [...prevGifs, ...data])
    }

    function handleSearch(term) {
        if(!term) {
            setGifs([])
            setPage(0)
            return
        }

        setPage(0)
        setGifs([])
        loadGifs(term, 0)
    }

    function handleLoadMore(event) {
        event.preventDefault()
        const nextPage = page + 1
        setPage(nextPage)
        loadGifs(searchTerm, nextPage)
    }

    function handleInputChange(event) {
        const term = event.target.value
        setSearchTerm(term)
        handleSearch(term)
    }

    function handleGifClick(gifUrl) {
        // handleGifSelect(gifUrl)
        setGifs([])
        gifInputRef.current.value = gifUrl
        //Уст в пропс
        setGiphy(gifUrl)

        // console.log(gifInputRef.current)
    }

    return (
        <div className="mt-2">
            <div>
                <textarea
                    ref={gifInputRef}
                    type="text"
                    onChange={handleInputChange}
                    placeholder="Search gif..."
                    className="text-gray-900 text-lg rounded-lg block w-full p-3.5 mt-2"
                    style={{backgroundImage: `url("https://upload.wikimedia.org/wikipedia/commons/8/82/Giphy-logo.svg")`, backgroundSize: '150px', backgroundRepeat: 'no-repeat', backgroundPosition: 'right center'}}
                />
                <div className="w-full" style={{ display: 'flex', flexWrap: 'wrap', backgroundColor: '#08090a' }}>
                    {gifs.map((gif, idx) => (
                        <div key={idx} style={{ marginTop: '8px' }}>
                            <img
                                src={gif.images.fixed_height.url}
                                alt={gif.title}
                                onClick={() => handleGifClick(gif.images.original.url)}
                                style={{ cursor: 'pointer' }}
                            />
                        </div>
                    ))}
                </div>
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