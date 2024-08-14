import { NavLink } from "react-router-dom"

export default function Index() {
    return (
        <div className="m-4">  
            <h1 className="mb-4 text-4xl font-extrabold text-gray-200 dark:text-white md:text-5xl lg:text-6xl">
                <img width={`450px`} height={`450px`} src="https://i.ibb.co/kQdGDSs/logosize.png" />
                    Put all your links in one place
            </h1>
            <div className="text-lg font-normal text-gray-200 lg:text-xl dark:text-gray-400">
                <div className="flex flex-wrap justify-start gap-6 mt-5">
                    <NavLink to="auth/registration" className="relative">
                        <span className="absolute top-0 left-0 mt-2 ml-2 h-full w-full rounded bg-gray-400"></span>
                        <span className="fold-bold relative inline-block h-full w-full rounded border-2 border-gray-100 bg-black px-7 py-3 text-2xl font-bold text-white transition duration-100 hover:bg-black hover:text-yellow-500">Get started for free</span>
                    </NavLink>
                </div>
            </div>
        </div>
    )
}