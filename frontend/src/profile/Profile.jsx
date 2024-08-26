import { Link } from 'react-router-dom';
import AuthUserContext from '../contexts/AuthUserContext';
import { useContext } from 'react';

const styles = {
    backgroundColor: '#08090a'
}

export default function Profile() {

    const authUserData = useContext(AuthUserContext)

    return (
        <>
            <div style={styles} className="mt-24 max-w-screen-xl flex flex-wrap items-center justify-center mx-auto pl-2 pr-2">
                <Link to="../../profile/links" className="block m-2 p-6 bg-gray-900 rounded-lg shadow hover:bg-gray-800 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 w-full">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-200 dark:text-white">Links</h5>
                    <p className="font-normal text-gray-300 dark:text-gray-400">Here you can create a new link with an individual design, customize existing links and track link click statistics</p>
                </Link>
            </div>
            <div style={styles} className="max-w-screen-xl flex flex-wrap items-center justify-center mx-auto pl-2 pr-2">
                <a href="#" className="block m-2 p-6 bg-gray-900 rounded-lg shadow hover:bg-gray-800 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 w-full">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-200 dark:text-white">Events</h5>
                    <p className="font-normal text-gray-300 dark:text-gray-400">Here you can create a new link with an individual design, customize existing links and track link click statistics</p>
                </a>
            </div>
            <div style={styles} className="max-w-screen-xl flex flex-wrap items-center justify-center mx-auto pl-2 pr-2">
                <a href="#" className="block m-2 p-6 bg-gray-900 rounded-lg shadow hover:bg-gray-800 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 w-full">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-200 dark:text-white">Market</h5>
                    <p className="font-normal text-gray-300 dark:text-gray-400">Here you can c</p>
                </a>
            </div>
            <div style={styles} className="max-w-screen-xl flex flex-wrap items-center justify-center mx-auto pl-2 pr-2">
                <a href="#" className="block m-2 p-6 bg-gray-900 rounded-lg shadow hover:bg-gray-800 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 w-full">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-200 dark:text-white">Profile stats</h5>
                    <p className="font-normal text-gray-300 dark:text-gray-400">Here you can create a new link with an individual design, customize existing links and track link click statistics</p>
                </a>
            </div>
            <div style={styles} className="mb-24 max-w-screen-xl flex flex-wrap items-center justify-center mx-auto pl-2 pr-2">
                <a href="#" className="block m-2 p-6 bg-gray-900 rounded-lg shadow hover:bg-gray-800 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 w-full">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-200 dark:text-white">Profile settings</h5>
                    <p className="font-normal text-gray-300 dark:text-gray-400">Here you can create a new link with an individual design, customize existing links and track link click statistics</p>
                </a>
            </div>
        </>
    )
}