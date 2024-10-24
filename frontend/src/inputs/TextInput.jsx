export default function TextInput({value, placeholder, type, onChangeHandler, validationError}) {
    return (
        <>
            <input 
                value={value} 
                onChange={onChangeHandler} 
                placeholder={placeholder} 
                type={type}
                className={validationError ? 
                    "border-transparent focus:border-transparent focus:ring-0 placeholder-white text-white text-xl rounded-lg block w-full p-3.5 bg-red-500" : 
                    "border-transparent focus:border-transparent focus:ring-0 text-gray-900 text-xl rounded-lg block w-full p-3.5" 
                }
            />
        </>
    )
}