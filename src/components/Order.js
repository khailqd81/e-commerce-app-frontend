import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import StarRatings from 'react-star-ratings';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import ReactLoading from 'react-loading';
import isLogin from "../utils/isLogin"
import moneyFormatter from "../utils/moneyFormat";
function Order() {
    const [orderDetails, setOrderDetails] = useState([]);
    const [starRating, setStarRating] = useState(0);
    const [content, setContent] = useState("");
    const [refresh, setRefresh] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingBtn, setIsLoadingBtn] = useState(false);
    const [disabledBtn, setDisabledBtn] = useState(false);

    let navigate = useNavigate();
    useEffect(() => {
        async function getOrder() {
            setIsLoading(true);
            const authorization = await isLogin();
            if (authorization === "NotLogin") {
                navigate("/", { replace: true });
            }
            else {
                const orders = await axios.get(`${process.env.REACT_APP_BACKEND_API}/order`, {
                    headers: {
                        authorization
                    }
                })
                if (orders.data.orderDetails) {
                    console.log(orders.data.orderDetails)
                    setOrderDetails(orders.data.orderDetails.reverse());
                }
            }
            setIsLoading(false);
        }
        getOrder();
    }, [navigate, refresh])
    let totalPayment = 0;

    const changeRating = (newRating, name) => {
        setStarRating(newRating)
    }

    const handleSubmit = async (e, product_id, order_id) => {
        e.preventDefault();
        if (starRating === 0) {
            alert("Vui lòng chọn số sao cho sản phẩm");
            return;
        }
        setDisabledBtn(true);
        setIsLoadingBtn(true);
        const authorization = await isLogin();
        await axios.post(`${process.env.REACT_APP_BACKEND_API}/comment/add`, {
            order_id,
            product_id,
            rating: starRating,
            content
        }, {
            headers: {
                authorization
            }
        })
        setIsLoadingBtn(false);
        setDisabledBtn(false);
        setStarRating(0);
        setContent("");
        setRefresh(!refresh);
        e.target.style.display = "none";
    }

    if (isLoading) {
        return (
            <div className="my-4 h-full max-w-screen-md px-2 md:px-0 mx-auto">
                <p className="h-[10vh] mb-4"><Skeleton height={"10vh"} /></p>
                <div className="h-[40vh]">
                    <Skeleton height={"10vh"} />
                    <Skeleton height={"10vh"} />
                    <Skeleton height={"10vh"} />
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col max-w-screen-sm my-8 mx-auto">
            {
                orderDetails.length !== 0 ?
                    orderDetails.map((orderDetail) => {
                        totalPayment = 0
                        return (
                            <div key={orderDetail.order_id} className="flex flex-col mb-6 rounded-lg shadow-2xl">
                                <div className="flex flex-wrap justify-between py-4 px-6 bg-gray-400 text-white">
                                    <p>Mã đơn hàng: {orderDetail.order_id}</p>
                                    <p>Thời gian: {new Date(orderDetail.date_created).toLocaleString("vi-VN")}</p>
                                </div>
                                <ul className="pt-4 ">
                                    {
                                        (orderDetail.products).map((product) => {
                                            totalPayment += product.buyAmount * product.priced;
                                            return (
                                                <li className="flex flex-col px-6 py-4 first:border-t border-b border-gray-200" key={product.product_id}>
                                                    <div className="flex flex-wrap justify-between ">
                                                        <div className="flex max-w-full">
                                                            <div className="basis-1/4 mr-2 md:mr-4">
                                                                <img
                                                                    src={product.image_url}
                                                                    alt={product.product_name}
                                                                    className="max-w-full md:w-16"
                                                                />
                                                            </div>

                                                            <div className="flex flex-col basis-3/4">
                                                                <p>{product.product_name}</p>
                                                                <p>x <span>{product.buyAmount}</span></p>
                                                            </div>
                                                        </div>

                                                        <p className="self-center mt-2 md:mt-0">Giá: <span className="text-red-500">{moneyFormatter.format(product.priced)}</span></p>
                                                    </div>
                                                    {product.is_comment
                                                        ? <p className="mt-8 text-green-500 self-end">Đã đánh giá</p>
                                                        : <div className="self-end">
                                                            <button
                                                                className="text-white bg-green-500 hover:bg-green-600 py-2 px-8 rounded mt-8 max-w-[160px] "
                                                                onClick={(e) => {
                                                                    const form = e.target.nextElementSibling;
                                                                    if (form.style.display === "block") {
                                                                        form.style.display = "none";
                                                                    } else {
                                                                        form.style.display = "block";
                                                                    }
                                                                }}
                                                            >
                                                                Đánh giá
                                                            </button>
                                                            <form
                                                                className="hidden fixed top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[86vw] lg:w-[50vw] rounded bg-white shadow-2xl py-4 px-4 md:px-8"
                                                                onSubmit={(e) => { handleSubmit(e, product.product_id, orderDetail.order_id) }}
                                                            >
                                                                <div className="flex justify-between font-semibold">
                                                                    Đánh giá sản phẩm
                                                                    <span
                                                                        className="border border-red-500 text-red-500 px-2 py-1 cursor-pointer"
                                                                        onClick={(e) => {
                                                                            e.target.parentNode.parentNode.style.display = "none"
                                                                            setStarRating(0);
                                                                            setContent("")
                                                                        }}
                                                                    >
                                                                        X
                                                                    </span>
                                                                </div>
                                                                <div className="py-4">Tên sản phẩm: <span className="font-bold">{product.product_name}</span></div>
                                                                <div>
                                                                    <StarRatings
                                                                        rating={starRating}
                                                                        starRatedColor="yellow"
                                                                        changeRating={changeRating}
                                                                        numberOfStars={5}
                                                                        name='rating'
                                                                    />
                                                                </div>
                                                                <div className="flex flex-col">
                                                                    <label htmlFor="content" className="py-4">Nội dung</label>
                                                                    <textarea
                                                                        id="content"
                                                                        className="outline-none p-2 border border-gray-500 focus:border-green-400"
                                                                        rows={4}
                                                                        placeholder="Nhập nội dung đánh giá"
                                                                        value={content}
                                                                        onChange={(e) => setContent(e.target.value)}
                                                                    ></textarea>
                                                                </div>

                                                                <button
                                                                    className="flex items-center justify-center ml-auto text-white disabled:bg-green-300 bg-green-600 hover:bg-green-500 py-2 px-8 rounded mt-8 max-w-[200px] "
                                                                    type="submit"
                                                                    disabled={disabledBtn}
                                                                >
                                                                    <span>Gửi đánh giá</span>
                                                                    {isLoadingBtn &&
                                                                        <div className="ml-2 min-w-[20px]">
                                                                            <ReactLoading type={'spin'} color={'white'} height={'100%'} width={'100%'} />
                                                                        </div>}
                                                                </button>
                                                            </form>
                                                        </div>}

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