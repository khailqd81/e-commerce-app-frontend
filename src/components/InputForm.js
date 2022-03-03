function InputForm({ label, id, placeholder, value, onChange, type }) {
    return (
        <div className="mt-8">
            <label htmlFor="accountname" className="font-semibold">{label}</label>
            <input
                className="block border border-gray-200 hover:border-gray-300 focus:border-blue-400 mt-2 p-3 md:w-[40vw] w-full outline-none"
                id={id}
                type={type || "text"}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        </div>
    )
}

export default InputForm;
