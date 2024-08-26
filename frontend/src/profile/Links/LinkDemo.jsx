import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import axios from "axios";

//Компонент превью ссылки
export default function LinkDemo(props) {
    const params = useParams()

    const [isChecked, setIsChecked] = useState(false); //Состояние дня/ночи для фона
    const [alertColor, setAlertColor] = useState('') //Состояние для цвета успеха при добавлении/изменении ссылки
    const [alertText, setAlertText] = useState('') //Состояние для текста при успешном добавлении/изменении ссылки

    //Функция очистки(удаления) изображения/giphy
    async function clearImage(event) {
        //Если есть текущее изображение, текущая giphy, изображение у ссылки или giphy
        if(props.currentImg || props.currentGiphy || props.img || props.giphy) {
            event.preventDefault()

            const config = {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('chrry-api-token')}`,
                    'content-type': 'multipart/form-data',
                    'Accept': 'application/json'
                }
            }

            let data = new FormData()

            try {
                //Делаем запрос на сервер с удалением из ссылки img и giphy
                await axios.post(`http://localhost/api/profile/${params.link}/delete-image`, data, config)
                    .then(() => {
                        //Очищаем все
                        props.setCurrentImg('')
                        props.setCurrentGiphy('')
                        props.setImg('')
                        props.setGiphy('')
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            } catch (error) {
                console.log(error);
            }
        }

        //Если у поста нет ни прикрипленного ихображения, ни giphy, но есть превью img и giphy => просто очищаем 
        props.setViewThumbnail('')
        props.setGiphy('')
    }

    //Переключение цвета фона ссылки для удобства под стили
    function dayVsNight(event) {
        setIsChecked(event.target.checked);
    }

    useEffect(() => {
        //Если isLinkAdded == true, то зыпускаем зеленыую вспышку об успещном действии
        if(props.isLinkAdded) {
            setAlertColor('bg-green-400 flash-effect')
            setAlertText(`${props.alertText}`)
            const timeoutId = setTimeout(() => {
                setAlertColor('')
                setAlertText('')
                props.setIsLinkAdded(false)
            }, 3000)

            return () => clearTimeout(timeoutId)
        }
    }, [props.isLinkAdded])

    return (
        <div className="fixed mt-24 w-full mx-auto max-w-screen-xl z-50" style={{'position': 'sticky', 'top': 0}}>
            <div id="matureBlock" className={ `${isChecked ? 'bg-[#08090a]' : 'bg-white'} mt-24 rounded-b-lg mt-1 mx-auto max-w-screen-xl px-4 pt-4 pb-4 sm:px-6 lg:px-8` } >
                    <div className="group block">
                        <table className="table w-full">
                            <tbody>
                            <tr data-index="" data-position="">
                                <td>
                                    <div id="block" className="justify-center text-center" data-index="" data-position="">
                                        <div className="lg:flex lg:justify-center">
                                            <div className={`${alertColor} row card ms-1 me-1 lg:w-2/4`} id="background"
                                                style={{
                                                    'animationDuration': '2s',
                                                    'backgroundPosition': 'center',
                                                    'marginRight': '5px',
                                                }}>
                                                <div className="flex align-center justify-between"
                                                    style={{'paddingLeft': '4px', 'paddingRight': '4px'}}>
                                                    <div className="col-span-1 flex items-center flex-none" style={{'width':'50px'}}> 
                                                        {/* Если есть текущее изображение, то отображаем его */}
                                                        {props.currentImg && <img className="mt-1 mb-1"
                                                            src={`http://localhost/${props.currentImg}`}
                                                            id="avatar-user"
                                                            style={{'width':'50px', 'borderRadius': '10px'}} />}
                                                        {/* Если есть текущее giphy, то отображаем его */} 
                                                        {props.currentGiphy && <img className="mt-1 mb-1"
                                                            src={props.currentGiphy}
                                                            id="avatar-user"
                                                            style={{'width':'50px', 'borderRadius': '10px'}} />}       
                                                        {/* Если мы зашрузили свое изображение, оно обработалось в превью и мы отображаем его */}
                                                        {props.viewThumbnail && <img className="mt-1 mb-1"
                                                            src={props.viewThumbnail}
                                                            id="avatar-user"
                                                            style={props.viewThumbnail.split(',')[0] === 'data:image/gif;base64' ? 
                                                                {'width':'50px', 'borderRadius': '10px'} : 
                                                                {'width':'50px', 'borderRadius': '10px', 'height': '50px', 'objectFit': 'cover', 'display': 'block'}
                                                            }/>}  
                                                        {/* Если мы загрузили giphy и оно в превью     */}
                                                        {props.giphy && <img className="mt-1 mb-1"
                                                            src={props.giphy}
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
                                                                        {props.title && props.title} <span style={{color: 'white', fontWeight: 'bold'}}>{alertText}</span>
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
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                {/* </div> */}
                <div>
                    <div className="flex justify-center items-center mt-4">
                        <button onClick={(event) => clearImage(event)} type="button" className="mr-2 px-3 py-2 text-xs font-medium text-center inline-flex items-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Clear images
                        </button>
                        <div className="ml-2 mt-1 mr-3">
                            <span className="material-symbols-outlined" style={{'color': 'white'}}>Day</span>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input onChange={(event) => dayVsNight(event)} checked={isChecked} type="checkbox" value={true} className="sr-only peer" id="switch-bg" />
                            <div className="w-11 h-6 bg-gray-200  rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
                        </label>
                        <div className="mt-1 ml-3">
                            <span className="material-symbols-outlined">Night</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}