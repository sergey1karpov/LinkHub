export default function SquareWithShadowButton({children}) {
    return (
        <>
            <button type="submit" className="relative w-full">
                <span 
                    className="absolute top-0 left-0 mt-2 ml-2 h-full w-full rounded bg-fuchsia-600"
                ></span>
                <span 
                    className="fold-bold relative inline-block h-full w-full rounded border-2 border-gray-100 bg-black px-7 py-3 text-2xl font-bold text-white transition duration-100 hover:bg-black hover:text-fuchsia-600">
                        {children}
                </span>
            </button>
        </>
    )
}