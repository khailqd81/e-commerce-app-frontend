import React, { useState, useEffect } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom"
import { AiOutlineCheckCircle } from "react-icons/ai"
import { ImCross } from "react-icons/im"
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import ReactLoading from 'react-loading';
// Redux
import { useDispatch } from "react-redux";
import { updateCart } from "../store/features/cart/cartSlice";
//
import InputAmount from "./InputAmount"
import isLogin from "../utils/isLogin"
import moneyFormatter from "../utils/moneyFormat"
// import { useStore, actions } from "../store"
function ProductCart() {
    const [products, setProducts] = useState([]);
    const [showBox, setShowBox] = useState({
        check: false,
        response: false,
        message: ""
    });
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingBtn, setIsLoadingBtn] = useState(false);
    const dispatch = useDispatch();
    let navigate = useNavigate();

    useEffect(() => {
        async function getCart() {
            setIsLoading(true);
            const authorization = await isLogin();
            if (authorization === "NotLogin") {
                return navigate("/", { replace: true });
            }
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_API}/cart`, {
                headers: {
                    authorization: authorization
                }
            });
            // const accessToken = localStorage.getItem("accessToken");
            // let authorization = "Bearer " + accessToken;
            // let response = await axios.get(`${process.env.REACT_APP_BACKEND_API}/cart`, {
            //     headers: {
            //         authorization: authorization
            //     }
            // });
            // if (response.status !== 200) {
            //     const refreshToken = localStorage.getItem("refreshToken");
            //     const token = await axios.post(`${process.env.REACT_APP_BACKEND_API}/refresh-token`, {
            //       refreshToken
            //     })
            //     if (token.status === 200) {
            //       localStorage.setItem("accessToken", token.data.accessToken);
            //       authorization = "Bearer " + token.data.accessToken;
            //       response = await axios.get(`${process.env.REACT_APP_BACKEND_API}/cart`, {
            //         headers: {
            //             authorization: authorization
            //         }
            //     });
            //     }
            //   }
            if (response.status === 200) {
                setProducts(response.data.products);
            }
            else {
                setProducts([])
            }
            setIsLoading(false)
        }
        getCart();
    }, [navigate])

    useEffect(() => {
        let timerID;
        if (showBox.check) {
            timerID = setTimeout(() => {
                setShowBox({
                    check: false,
                    response: false,
                    message: ""
                });
            }, 3000)
        }

        return () => { clearTimeout(timerID) };
    }, [showBox.check])
    // var formatter = new Intl.NumberFormat('vi-VN', {
    //     style: 'currency',
    //     currency: 'VND',
    // });

    const handleDecrease = async (index) => {
        const newAmount = products[index].amount - 1;
        const authorization = await isLogin();
        const response = await axios.patch(`${process.env.REACT_APP_BACKEND_API}/cart/update`, {
            product_id: products[index].product_id,
            amount: newAmount,
        }, {
            headers: {
                authorization: authorization
            },
        })
        if (response.status === 200) {
            setProducts(response.data.products);
        }
    }
    const handleIncrease = async (index) => {
        const newAmount = products[index].amount + 1;
        const authorization = await isLogin();
        const response = await axios.patch(`${process.env.REACT_APP_BACKEND_API}/cart/update`, {
            product_id: products[index].product_id,
            amount: newAmount,
        }, {
            headers: {
                authorization: authorization
            },
        })
        if (response.status === 200) {
            setProducts(response.data.products);
        }
    }

    const handleOnInputChange = async (index, value) => {
        const newAmount = value;
        const authorization = await isLogin();
        const response = await axios.patch(`${process.env.REACT_APP_BACKEND_API}/cart/update`, {
            product_id: products[index].product_id,
            amount: newAmount,
        }, {
            headers: {
                authorization: authorization
            },
        })
        if (response.status === 200) {
            setProducts(response.data.products);
        }
    }

    const handleRemoveFromCart = async (product_id) => {
        const authorization = await isLogin();

        const response = await axios.delete(`${process.env.REACT_APP_BACKEND_API}/cart/remove`, {
            headers: {
                authorization: authorization
            },
            data: {
                product_id: product_id

            }
        });
        if (response.status === 200) {
            dispatch(updateCart(response.data.products.length))
            setProducts(response.data.products);
        }
    }

    const handleAddOrder = async () => {
        setIsLoadingBtn(true);
        const productToDb = products.map((product) => {
            return {
                product_id: product.product_id,
                amount: product.amount,
                priced: product.price
            }
        })

        const authorization = await isLogin();
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_API}/order/add`,
            {
                products: productToDb
            },
            {
                headers: {
                    authorization
                }
            })
        if (response.status === 200) {
            dispatch(updateCart(0))
            setProducts([])
            setShowBox({
                check: true,
                response: true,
                message: response.data.message
            })
        } else {
            setShowBox({
                check: true,
                response: false,
                message: response.data.message
            })
        }
        setIsLoadingBtn(false);
    }

    const totalPayment = products.length === 0 ? 0 : products.reduce((total, product, index) => {
        return total + parseFloat(product.price * product.amount);
    }, 0);

    if (isLoading) {
        return (
            <div className="my-4 h-full max-w-screen-xl px-2 md:px-0 mx-auto">
                <p className="h-[10vh] mb-4"><Skeleton height={"10vh"} /></p>
                <div className="h-[40vh]">
                    <Skeleton height={"10vh"} />
                    <Skeleton height={"10vh"} />
                </div>
            </div>
        )
    }

    return (
        <div className="max-w-screen-xl mx-auto mt-8 mb-16">

            {products.length !== 0 ?
                <div className="p-2 lg:p-0">
                    <table className="hidden lg:table w-full shadow-md mb-6">
                        <thead className="h-[60px] border ">
                            <tr>
                                <th className="text-left pl-2">Sản phẩm</th>
                                <th>Đơn giá</th>
                                <th>Số lượng</th>
                                <th>Số tiền</th>
                                <th>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody className="border">
                            {products.map((product, index) => {
                                return (
                                    <tr key={product.product_id} className="border h-[140px]">
                                        <td>
                                            <div className="flex justify-start">
                                                <img src={product.image_url} alt={product.name} className="w-[80px]" />
                                                <span className="ml-8 self-center">{product.product_name}</span>
                                            </div>
                                        </td>
                                        <td className="text-center">{moneyFormatter.format(product.price)}</td>
                                        <td className="text-center">
                                            <InputAmount
                                                styleContainer={"flex justify-center"}
                                                amount={product.amount}
                                                onIncrease={(index) => handleIncrease(index)}
                                                onDecrease={() => handleDecrease(index)}
                                                onChange={handleOnInputChange}
                                                quantity={product.quantity}
                                                index={index}
                                            />
                                        </td>
                                        <td className="text-right text-red-500 font-semibold pr-20">{moneyFormatter.format(product.price * product.amount)}</td>
                                        <td className="text-center">
                                            <button className="hover:text-gray-500 p-3" onClick={() => handleRemoveFromCart(product.product_id)}>Xóa</button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    <ul className="lg:hidden">
                        {products.map((product, index) => {
                            return (
                                <li key={product.product_id} className="flex mb-4 pb-4 border-b">
                                    <div className="basis-1/4">
                                        <img src={product.image_url} alt={product.name} className="max-w-full" />
                                    </div>
                                    <div className="basis-3/4 text-left ml-4">
                                        <div className="pb-2">{product.product_name}</div>
                                        <div className="text-left text-red-500 pb-2">{moneyFormatter.format(product.price)}</div>
                                        <InputAmount
                                            styleContainer={"flex pb-2"}
                                            amount={product.amount}
                                            onIncrease={() => handleIncrease(index)}
                                            onDecrease={() => handleDecrease(index)}
                                            onChange={handleOnInputChange}
                                            quantity={product.quantity}
                                            index={index}
                                        />
                                        <div className="flex justify-end">
                                            <button className="text-gray-400 hover:text-gray-500 p-3" onClick={() => handleRemoveFromCart(product.product_id)}>Xóa</button>
                                        </div>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                    <div className="flex flex-wrap lg:justify-end">
                        <p className="text-lg self-center basis-full lg:basis-auto">Tổng thanh toán: <span className="text-red-500 font-semibold">{moneyFormatter.format(totalPayment)}</span></p>
                        <button className="flex items-center justify-center border bg-green-500 hover:bg-green-400 px-16 py-2 lg:ml-4 mt-4 lg:mt-0 rounded text-white basis-full lg:basis-auto" onClick={handleAddOrder}>
                            Mua hàng
                            {isLoadingBtn && <ReactLoading className="ml-2" type={"spin"} color={"white"} height={20} width={20} />}
                        </button>
                    </div>
                </div>
                : <p className="text-red-500 font-semibold py-4 text-center min-h-[400px]">Không có sản phẩm nào trong giỏ hàng</p>}

            {showBox.check ?
                showBox.response ?
                    <div className="transition-opacity ease-in duration-300 flex flex-col items-center justify-center px-4 fixed w-[80vw] md-[30vw] h-[30vh] left-2/4 top-2/4 -translate-x-1/2 -translate-y-1/2 bg-white border-2 border-green-500 rounded-2xl shadow-2xl">
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

export default ProductCart;
