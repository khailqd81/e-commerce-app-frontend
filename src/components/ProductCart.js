import InputAmount from "./InputAmount"
import samsung from "../samsung-galaxy-s21-ultra-bac-600x600-1-200x200.jpg"
import { useState, useLayoutEffect } from "react"
import { useNavigate } from "react-router-dom";
import axios from "axios";

import  isLogin  from "../utils/isLogin"
function ProductCart() {
    // const [amounts, setAmounts] = useState([1, 1]);
    const [products, setProducts] = useState([])
    const navigate = useNavigate();
    // const products = [
    //     {
    //         product_name: "Samsung A52",
    //         product_id: "1",
    //         price: "1000000",
    //         image_url: samsung,
    //         quantity: 25
    //     },
    //     {
    //         product_name: "Samsung S8",
    //         product_id: "2",
    //         price: "10000000",
    //         image_url: samsung,
    //         quantity: 15

    //     }
    // ]

    useLayoutEffect(() => {
        async function getCart() {
            const authorization = await isLogin();
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
                console.log(response.data.products);
                setProducts(response.data.products);
            }
            else {
                console.log(response.data);
                setProducts([])
            }
        }
        getCart();
    }, [])

    var formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });

    const handleDecrease = async (index) => {
        const newAmount = products[index].amount - 1;
        const authorization = await isLogin();
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_API}/cart/update`, {
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
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_API}/cart/update`, {
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
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_API}/cart/update`, {
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

    const totalPayment = products.length === 0 ? 0 : products.reduce((total, product, index) => {
        return total + parseFloat(product.price * product.amount);
    }, 0);

    return (
        <div className="max-w-screen-xl mx-auto mt-8 mb-16">
            {products.length !== 0 ?
                <div>
                    <table className="w-full shadow-md mb-6">
                        <thead className="h-[60px] border ">
                            <tr >
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
                                        <td className="text-center">{formatter.format(product.price)}</td>
                                        <td className="text-center">
                                            <InputAmount
                                                styleContainer={"flex justify-center"}
                                                amount={product.amount}
                                                onIncrease={() => handleIncrease(index)}
                                                onDecrease={() => handleDecrease(index)}
                                                onChange={handleOnInputChange}
                                                quantity={product.quantity}
                                                index={index}
                                            />
                                        </td>
                                        <td className="text-right text-red-500 font-semibold pr-20">{formatter.format(product.price * product.amount)}</td>
                                        <td className="text-center">Xóa</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    <div className="flex justify-end">
                        <p className="text-lg self-center">Tổng thanh toán: <span className="text-red-500 font-semibold">{formatter.format(totalPayment)}</span></p>
                        <button className="border bg-green-500 hover:bg-green-400 px-16 py-2 ml-4 rounded text-white">Mua hàng</button>
                    </div>
                </div>
                : <p className="text-red-500 font-semibold py-4 text-center">Không có sản phẩm nào trong giỏ hàng</p>}


        </div>
    )
}

export default ProductCart;
