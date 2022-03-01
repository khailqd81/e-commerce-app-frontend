import { useLayoutEffect, useState } from "react";
import { useStore } from "../store";

import InputAmount from "./InputAmount";
// import samsung from "../samsung-galaxy-s21-ultra-bac-600x600-1-200x200.jpg"
function ProductDetail() {
    const [amount, setAmount] = useState(1);
    const [state, ] = useStore();
    const [product, setProduct]= useState(state.product);


    useLayoutEffect(() => {
        if (Object.keys(product).length === 0) {
            console.log("Empty product")
            const productId = localStorage.getItem("productId");
            console.log(productId);
            let api = `${process.env.REACT_APP_BACKEND_API}/products/id?productId=${productId}`;
            console.log("api:",api);
            fetch(api)
                .then(response => response.json())
                .then(data => {
                    setProduct(data);
                })
        }
    }, [product]);

    var formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });

    const handleDecrease = () => {
        setAmount(prevState => prevState - 1)
    }
    const handleIncrease = () => {
        setAmount(prevState => prevState + 1)
    }

    const handleOnInputChange = (value) => {
        setAmount(value)
    }

    return (
        <div className="flex m-8 shadow-xl px-4 py-8 rounded">
            <div className="flex-[2]">
                <img src={product.image_url} className="max-w-full max-h-full border-r" alt={product.product_name} />
            </div>
            <div className="flex flex-col flex-[3] pl-4">
                <p className="text-3xl">{product.product_name}</p>
                <div className="flex text-gray-500">
                    <p className="mr-4">Số lượng: {product.quantity}</p>
                    <p>Đã bán: {product.sold}</p>
                </div>
                <p className="my-4">Đặc điểm: {product.description}</p>
                <p>Giá: <span className="text-red-500 text-4xl">{formatter.format(product.price)}</span></p>
                <div className="mt-6">
                    <p>Số lượng mua: </p>
                    <InputAmount
                        styleContainer={"flex my-2"}
                        amount={amount}
                        onIncrease={handleIncrease}
                        onDecrease={handleDecrease}
                        onChange={handleOnInputChange}
                        quantity={product.quantity}
                    />
                    {/* <div className="flex my-2">
                        <button
                            onClick={() => setAmount(prevState => prevState - 1)}
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
                                    && inputValue <= product.quantity) {
                                    setAmount(inputValue)
                                }
                            }} />
                        <button
                            onClick={() => setAmount(prevState => prevState + 1)}
                            className={amount >= product.quantity ? "px-2 border text-2xl text-gray-300" : "px-2 border text-2xl"}
                            disabled={amount >= product.quantity ? true : false}
                        >
                            +
                        </button>
                    </div> */}
                </div>
                <button className="bg-green-600 hover:bg-green-500 py-4 px-6 text-white rounded-md mt-auto max-w-[200px]">Thêm vào giỏ hàng</button>
            </div>


        </div>
    )
}

export default ProductDetail;
