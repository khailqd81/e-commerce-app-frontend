import axios from "axios";
import { useLayoutEffect, useState } from "react"

import isLogin from "../utils/isLogin"
import moneyFormatter from "../utils/moneyFormat";
function Order() {
    const [orderDetails, setOrderDetails] = useState([]);
    useLayoutEffect(() => {
        async function getOrder() {
            const authorization = await isLogin();
            const orders = await axios.get(`${process.env.REACT_APP_BACKEND_API}/order`, {
                headers: {
                    authorization
                }
            })
            if (orders) {
                console.log(orders.data.orderDetails[0].products)
                setOrderDetails(orders.data.orderDetails.reverse());
            }
        }
        getOrder();
    }, [])
    let totalPayment = 0
    return (
        <div className="flex flex-col max-w-screen-xl my-8 mx-auto">
            {
                orderDetails.length !== 0 ?
                    orderDetails.map((orderDetail) => {
                        totalPayment = 0
                        return (
                            <div key={orderDetail.order_id} className="flex flex-col mb-4 rounded-lg shadow-lg">
                                <div className="flex justify-between py-4 px-6 bg-gray-400 text-white">
                                    <p>Mã đơn hàng: {orderDetail.order_id}</p>
                                    <p>Thời gian: {new Date(orderDetail.date_created).toLocaleString("vi-VN")}</p>
                                </div>
                                <ul className="pt-4 ">
                                    {
                                        (orderDetail.products).map((product) => {
                                            totalPayment += product.buyAmount * product.priced;
                                            return (
                                                <li className="flex justify-between px-6 py-4 first:border-t border-b border-gray-200" key={product.product_id}>
                                                    <div className="flex">
                                                        <img
                                                            src={product.image_url}
                                                            alt={product.product_name}
                                                            className="w-16 mr-4"
                                                        />
                                                        <div className="flex flex-col">
                                                            <p>{product.product_name}</p>
                                                            <p>x <span>{product.buyAmount}</span></p>
                                                        </div>
                                                    </div>

                                                    <p className="self-center ">Giá: <span className="text-red-500">{moneyFormatter.format(product.priced)}</span></p>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                                <p className="text-right px-6 py-4 ">Tổng thanh toán: <span className="text-2xl font-bold text-red-500">{moneyFormatter.format(totalPayment)}</span></p>
                            </div>
                        )
                    })
                    :
                    <div className="text-red-500 text-center font-semibold">Lịch sử mua hàng trống</div>
            }
        </div>
    )
}

export default Order;