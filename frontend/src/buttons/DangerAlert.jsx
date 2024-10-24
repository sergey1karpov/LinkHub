import { Link } from "react-router-dom"

export default function DangerAlertButton({children}) {
    return (
        <>
            <Link to="../../auth/restore-password" className="rounded group relative inline-flex border border-red-500 focus:outline-none w-full sm:w-auto">
                <span className="rounded w-full inline-flex items-center justify-center self-stretch px-4 py-2 text-sm text-white text-center font-bold uppercase bg-red-500 ring-1 ring-red-500 ring-offset-1 ring-offset-red-500 transform transition-transform group-hover:-translate-y-2 group-hover:-translate-x-2 group-focus:-translate-y-2 group-focus:-translate-x-2">
                    {children}
                </span>
            </Link>
        </>
    )
}