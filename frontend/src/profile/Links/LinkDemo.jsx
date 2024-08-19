export default function LinkDemo(props) {
    return (
        <div className="fixed mt-24 w-full mx-auto max-w-screen-xl z-50" style={{'position': 'sticky', 'top': 0}}>
            <div id="matureBlock" className="mt-24 rounded-b-lg mt-1 bg-white mx-auto max-w-screen-xl px-4 pt-4 pb-4 sm:px-6 lg:px-8">
                <div className="group block">
                    <table className="table w-full">
                        <tbody>
                        <tr data-index="" data-position="">
                            <td>
                                <div id="block" className="justify-center text-center" data-index="" data-position="">
                                    <div >
                                        <div className="row card ms-1 me-1" id="background"
                                            style={{
                                                'animation-duration': '2s',
                                                'background-position': 'center',
                                                'margin-right': '5px',
                                            }}>
                                            <div className="flex align-center justify-between"
                                                style={{'padding-left': '4px', 'padding-right': '4px'}}>
                                                <div className="col-span-1 flex items-center flex-none">
                                                    <img className="mt-1 mb-1"
                                                        src=""
                                                        id="avatar-user"
                                                        style={{'width':'50px', 'border-radius': '10px'}} />
                                                </div>
                                                <button type="submit"
                                                        style={{
                                                            'border': 0,
                                                            'padding': 0,
                                                            'background-color': 'rgba(0, 125, 215, 0)',
                                                        }}>
                                                    <div className="col-span-10 text-center flex items-center">
                                                        <div className="ml-3 mr-3">
                                                            <h4 id="title-text" className="drop-shadow-md text-ellipsis"
                                                                style={{'margin': '0 0 0 5px'}}>
                                                                    {props.title}
                                                            </h4>
                                                        </div>
                                                    </div>
                                                </button>
                                                <div className="col-span-1 flex items-center flex-none"
                                                    style={{'opacity': 0}}>
                                                    <div href=""
                                                        className="text-indigo-900  border-indigo-900 hover:bg-indigo-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-indigo-900 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-indigo-900 dark:text-indigo-900 dark:hover:text-white dark:focus:ring-indigo-900">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                            viewBox="0 0 24 24" stroke-width="1.5"
                                                            stroke="currentColor" className="w-7 h-7">
                                                            <path stroke-linecap="round" stroke-linejoin="round"
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
                <div className="flex justify-center items-center mt-4">
                    <div className="mt-1 mr-3">
                        <span className="material-symbols-outlined" style={{'color': 'white'}}>wb_sunny</span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" value="{{true}}" class="sr-only peer" id="switch-bg" />
                        <div className="w-11 h-6 bg-gray-200  rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
                    </label>
                    <div className="mt-1 ml-3">
                        <span className="material-symbols-outlined">dark_mode</span>
                    </div>
                </div>
            </div>
        </div>
    )
}