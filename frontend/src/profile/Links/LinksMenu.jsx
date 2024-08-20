import { Link } from 'react-router-dom';

export default function LinksMenu() {
    return (
        <>
            <div style={{backgroundColor: '#08090a'}} className="mt-24 max-w-screen-xl flex flex-wrap items-center justify-center mx-auto pl-2 pr-2">
                <Link to="../../profile/links/add" className="block m-2 p-6 bg-gray-900 rounded-lg shadow hover:bg-gray-800 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 w-full">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-200 dark:text-white">Add new link</h5>
                    <p className="font-normal text-gray-300 dark:text-gray-400">Here you can create a new link</p>
                </Link>
            </div>
            <div style={{backgroundColor: '#08090a'}} className="max-w-screen-xl flex flex-wrap items-center justify-center mx-auto pl-2 pr-2">
                <Link to="../../profile/links/all-links" className="block m-2 p-6 bg-gray-900 rounded-lg shadow hover:bg-gray-800 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 w-full">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-200 dark:text-white">All links</h5>
                    <p className="font-normal text-gray-300 dark:text-gray-400">Here you can manage your links, edit link, search stats</p>
                </Link>
            </div>
        </>
    )
}