function InputAmount({ styleContainer, amount, onIncrease, onDecrease, onChange, quantity, index }) {
    const isOnlyDigits = (value) => {
        var er = /^-?[0-9]+$/;
        return er.test(value);
    }

    return (
        <div className={styleContainer}>
            <button
                onClick={onDecrease}
                className={amount === 1 ? "px-2 border text-2xl text-gray-300" : "px-2 border text-2xl"}
                disabled={amount === 1 ? true : false}
            >
                -
            </button>
            <input
                className="text-center block px-4 outline-none max-w-[80px] border text-xl font-light"
                value={amount}
                onChange={e => {
                    const inputValue = parseInt(e.target.value);
                    if (isOnlyDigits(e.target.value)
                        && Number.isInteger(inputValue)
                        && inputValue <= quantity) {
                        onChange(index = 0, inputValue)
                    }
                }}
            />
            <button
                onClick={onIncrease}
                className={amount >= quantity ? "px-2 border text-2xl text-gray-300" : "px-2 border text-2xl"}
                disabled={amount >= quantity ? true : false}
            >
                +
            </button>
        </div>
    )
}

export default InputAmount;