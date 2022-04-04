function InputForm({ classNames, label, id, placeholder, value, onChange, type, message, onFocus, onBlur }) {
    return (
        <div className="mt-8">
            <label htmlFor="accountname" className="font-semibold">{label}</label>
            <input
                className={classNames}
                id={id}
                type={type || "text"}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                onFocus={onFocus}
                onBlur={onBlur}
            />
            {message && message.length > 0 && <p className="mt-1 text-red-400">{message}</p>}
        </div>
    )
}

export default InputForm;
