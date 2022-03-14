import axios from "axios";
import { useLayoutEffect, useState, useEffect } from "react";
import { useStore, actions } from "../store";
import isLogin from "../utils/isLogin";
import { AiOutlineCheckCircle } from "react-icons/ai"
import { ImCross } from "react-icons/im"
import InputAmount from "./InputAmount";
import moneyFormatter from "../utils/moneyFormat";
// import samsung from "../samsung-galaxy-s21-ultra-bac-600x600-1-200x200.jpg"
function ProductDetail() {
    const [amount, setAmount] = useState(1);
    const [state, dispatch] = useStore();
    const [showBox, setShowBox] = useState({
        check: false,
        response: false,
        message: ""
    });
    const [product, setProduct] = useState(state.product);

    useLayoutEffect(() => {
        if (Object.keys(product).length === 0 || product.product_id !== state.product.product_id) {
            const productId = localStorage.getItem("productId");
            let api = `${process.env.REACT_APP_BACKEND_API}/products/id?productId=${productId}`;
            fetch(api)
                .then(response => response.json())
                .then(data => {
                    setProduct(data);
                })
        }
    }, [product, state.product]);

    useEffect(() => {
        let timerID;
        if (showBox.check) {
            timerID = setTimeout(() => {
                setShowBox(prevState => ({
                    check: false,
                    message: ""
                }));
            }, 3000)
        }

        return () => { clearTimeout(timerID) };
    }, [showBox.check])

    const handleDecrease = () => {
        setAmount(prevState => prevState - 1)
    }

    const handleIncrease = () => {
        setAmount(prevState => prevState + 1)
    }

    const handleOnInputChange = (index, value) => {
        setAmount(value)
    }

    const handleAddToCart = async (productId) => {
        const authorization = await isLogin();
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_API}/cart/add`, {
            product_id: product.product_id,
            amount: amount,
        }, {
            headers: {
                authorization: authorization
            },
        })
        console.log(response.data);
        if (response.status === 200) {

            const newResponse = await axios.get(`${process.env.REACT_APP_BACKEND_API}/cart`, {
                headers: {
                    authorization: authorization
                }
            });
            if (newResponse.status === 200) {
                dispatch(actions.setProductInCart(newResponse.data.products.length));
                setShowBox({
                    check: true,
                    response: true,
                    message: "Sản phẩm đã được thêm vào giỏ hàng."
                });
                console.log("Ok")
            }
        } else {
            setShowBox({
                check: true,
                response: false,
                message: response.data.message
            });
            console.log("Not ok")
        }
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
                <p>Giá: <span className="text-red-500 text-4xl">{moneyFormatter.format(product.price)}</span></p>
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
                </div>
                <button
                    className="bg-green-600 hover:bg-green-500 py-4 px-6 text-white rounded-md mt-auto max-w-[200px] outline-none border-none"
                    onClick={() => handleAddToCart(product.product_id)}
                >
                    Thêm vào giỏ hàng
                </button>
            </div>
            {showBox.check ?
                showBox.response ?
                    <div className="transition-opacity ease-in duration-300 flex flex-col items-center justify-center px-4 fixed w-[30vw] h-[30vh] left-2/4 top-2/4 -translate-x-1/2 -translate-y-1/2 bg-white border-2 border-green-500 rounded-2xl shadow-2xl">
                        <AiOutlineCheckCircle size={60} className="text-green-500 text-bold" />
                        <div className="mt-4 text-center text-black text-lg">{showBox.message}</div>
                    </div>
                    : 
                    <div className="transition-opacity ease-in duration-300 flex flex-col items-center justify-center px-4 fixed w-[30vw] h-[30vh] left-2/4 top-2/4 -translate-x-1/2 -translate-y-1/2 bg-white border-2 border-red-500 rounded-2xl shadow-2xl">
                        <ImCross size={60} className="text-red-500 text-bold" />
                        <div className="mt-4 text-center text-black text-lg">{showBox.message}</div>
                    </div>
                : 
                <div></div>
            }

        </div>
    )
}

export default ProductDetail;
