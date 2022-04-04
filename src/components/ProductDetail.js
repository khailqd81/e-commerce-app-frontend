import axios from "axios";
import { useState, useEffect } from "react";
// Redux toolkit
import { useSelector, useDispatch } from "react-redux";
import { updateCart } from "../store/features/cart/cartSlice";
//
import isLogin from "../utils/isLogin";
import { AiOutlineCheckCircle, AiFillCheckCircle } from "react-icons/ai"
import { ImCross } from "react-icons/im"
import { MdStars } from "react-icons/md"
import StarRatings from 'react-star-ratings';
import InputAmount from "./InputAmount";
import moneyFormatter from "../utils/moneyFormat";
// import samsung from "../samsung-galaxy-s21-ultra-bac-600x600-1-200x200.jpg"
function ProductDetail() {
    const dispatch = useDispatch();
    const productFromStore = useSelector(state => state.product.product);
    const isUserLogin = useSelector(state => state.account.isLogin);
    const [amount, setAmount] = useState(1);
    const [rating, setRating] = useState(5);
    const [comments, setComments] = useState({
        list: [],
        star: 6
    });
    // Số lượng sao từ 1 sao đến 5 sao
    const [starRatings, setStarRatings] = useState([0, 0, 0, 0, 0]);
    const [showBox, setShowBox] = useState({
        check: false,
        response: false,
        message: ""
    });
    const [product, setProduct] = useState(productFromStore);

    useEffect(() => {
        async function getProductDetail() {
            window.scrollTo(0, 0);
            // if (Object.keys(product).length === 0 || product.product_id !== state.product.product_id) {
            const productId = localStorage.getItem("productId");
            let api = `${process.env.REACT_APP_BACKEND_API}/products/id?productId=${productId}`;
            const response = await axios.get(api);
            if (response.data) {
                const comments = response.data.comments;
                const starArr = [];
                let sum = 0;
                for (let i = 1; i <= 5; i++) {
                    let amount = (comments.filter(comment => comment.rating === i)).length;
                    sum += amount * i;
                    starArr.push(amount);
                }
                const averageRating = sum / comments.length;
                if (!Number.isNaN(averageRating)) {
                    setRating(averageRating)
                }

                setStarRatings(starArr);
                console.log(response.data)
                setProduct(response.data);
                setComments({
                    list: response.data.comments.reverse(),
                    star: 6
                })
            }
        }
        getProductDetail()
    }, [productFromStore]);

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
        if (response.status === 200) {

            const newResponse = await axios.get(`${process.env.REACT_APP_BACKEND_API}/cart`, {
                headers: {
                    authorization: authorization
                }
            });
            if (newResponse.status === 200) {
                dispatch(updateCart(newResponse.data.products.length));
                setShowBox({
                    check: true,
                    response: true,
                    message: "Sản phẩm đã được thêm vào giỏ hàng."
                });
            }
        } else {
            setShowBox({
                check: true,
                response: false,
                message: response.data.message
            });
        }
    }

    const handleFilterComment = (star) => {
        if (star !== 6) {
            const commentsList = product.comments.filter(comment => comment.rating === star);
            setComments({
                list: commentsList,
                star
            })
        } else {
            setComments({
                list: [...product.comments],
                star
            })
        }

    }
    return (
        <div className="flex flex-col max-w-screen-xl mx-auto mt-8">
            <div className="flex flex-wrap px-4 py-8 rounded shadow-xl">
                <div className="basis-full md:basis-1/2 pb-8 md:pb-0">
                    <img src={product.image_url} className="max-w-full max-h-full md:border-r" alt={product.product_name} />
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
                    {isUserLogin &&
                        <button
                            className="text-white bg-green-600 hover:bg-green-500 disabled:bg-green-500 max-w-[200px] py-4 px-6 mt-4 md:mt-auto rounded-md outline-none border-none"
                            onClick={() => handleAddToCart(product.product_id)}
                            disabled={product.quantity <= 0 ? true : false}
                        >
                            Thêm vào giỏ hàng
                        </button>}
                    {product.quantity <= 0 && <p className="text-red-500 mt-4">Sản phẩm hiện đang hết hàng</p>}
                </div>
                {showBox.check
                    ? showBox.response
                        ?
                        <div className="transition-opacity ease-in duration-300 flex flex-col items-center justify-center px-4 fixed w-[80vw] md:w-[30vw] h-[30vh] left-2/4 top-2/4 -translate-x-1/2 -translate-y-1/2 bg-white border-2 border-green-500 rounded-2xl shadow-2xl">
                            <AiOutlineCheckCircle size={60} className="text-green-500 text-bold" />
                            <div className="mt-4 text-center text-black text-lg">{showBox.message}</div>
                        </div>
                        :
                        <div className="transition-opacity ease-in duration-300 flex flex-col items-center justify-center px-4 fixed w-[80vw] md:w-[30vw] h-[30vh] left-2/4 top-2/4 -translate-x-1/2 -translate-y-1/2 bg-white border-2 border-red-500 rounded-2xl shadow-2xl">
                            <ImCross size={60} className="text-red-500 text-bold" />
                            <div className="mt-4 text-center text-black text-lg">{showBox.message}</div>
                        </div>
                    : <div></div>
                }

            </div>
            {product.comments && product.comments.length !== 0
                ?
                <div className="text-center py-8 md:px-4 my-8 bg-white shadow-lg ">
                    <p className="pb-8 text-xl">ĐÁNH GIÁ SẢN PHẨM</p>
                    <div className="flex flex-wrap py-8 px-4 bg-green-50 border border-green-400">
                        <div className="flex flex-col basis-full md:basis-1/4 pb-6">
                            <p className=" self-center text-lg text-red-500 pb-6"><span className="text-4xl font-semibold">{rating.toFixed(1)}</span> trên 5</p>
                            <StarRatings
                                rating={rating}
                                starRatedColor="yellow"
                                numberOfStars={5}
                                name='rating'
                                starDimension="40px"
                                starSpacing="10px"
                            />
                        </div>
                        <div>
                            <button
                                className={comments.star === 6
                                    ? "min-w-[104px] ml-2 my-1 md:my-0 py-2 px-4 border border-green-500 text-green-500"
                                    : "min-w-[104px] ml-2 my-1 md:my-0 py-2 px-4 border border-gray-300"}
                                onClick={() => handleFilterComment(6)}
                            >
                                Tất cả <span>({starRatings.reduce((total, item) => total + item, 0)})</span>
                            </button>
                            <button
                                className={comments.star === 5
                                    ? "min-w-[104px] ml-2 my-1 md:my-0 py-2 px-4 border border-green-500 text-green-500"
                                    : "min-w-[104px] ml-2 my-1 md:my-0 py-2 px-4 border border-gray-300"}
                                onClick={() => handleFilterComment(5)}
                            >
                                5 sao <span>({starRatings[4]})</span>
                            </button>
                            <button
                                className={comments.star === 4
                                    ? "min-w-[104px] ml-2 my-1 md:my-0 py-2 px-4 border border-green-500 text-green-500"
                                    : "min-w-[104px] ml-2 my-1 md:my-0 py-2 px-4 border border-gray-300"}
                                onClick={() => handleFilterComment(4)}

                            >
                                4 sao <span>({starRatings[3]})</span>
                            </button>
                            <button
                                className={comments.star === 3
                                    ? "min-w-[104px] ml-2 my-1 md:my-0 py-2 px-4 border border-green-500 text-green-500"
                                    : "min-w-[104px] ml-2 my-1 md:my-0 py-2 px-4 border border-gray-300"}
                                onClick={() => handleFilterComment(3)}

                            >
                                3 sao <span>({starRatings[2]})</span>
                            </button>
                            <button
                                className={comments.star === 2
                                    ? "min-w-[104px] ml-2 my-1 md:my-0 py-2 px-4 border border-green-500 text-green-500"
                                    : "min-w-[104px] ml-2 my-1 md:my-0 py-2 px-4 border border-gray-300"}
                                onClick={() => handleFilterComment(2)}
                            >
                                2 sao <span>({starRatings[1]})</span>
                            </button>
                            <button
                                className={comments.star === 1
                                    ? "min-w-[104px] ml-2 my-1 md:my-0 py-2 px-4 border border-green-500 text-green-500"
                                    : "min-w-[104px] ml-2 my-1 md:my-0 py-2 px-4 border border-gray-300"}
                                onClick={() => handleFilterComment(1)}
                            >
                                1 sao <span>({starRatings[0]})</span>
                            </button>
                        </div>
                    </div>
                    {comments.list.length !== 0
                        ?
                        <ul className="mt-8">
                            {comments.list.map(comment => {
                                return (<li key={comment.cmt_id} className="flex flex-wrap text-left border-t px-4 py-6">
                                    <div className="flex basis-full md:basis-1/4">
                                        <span className="self-center text-lg max-h-[48px] rounded-full bg-gray-300 py-3 px-4 text-gray-500">{comment.username[0].toUpperCase()}</span>
                                        <p className="ml-4 self-center">{comment.username}</p>
                                    </div>
                                    <div className="flex flex-col md:basis-3/4">
                                        <StarRatings
                                            rating={comment.rating}
                                            starRatedColor="yellow"
                                            numberOfStars={5}
                                            name={`${comment.cmt_id}name`}
                                            starDimension="20px"
                                            starSpacing="1px"
                                        />
                                        <div className="flex text-green-500 my-2">
                                            <AiFillCheckCircle size={20} />
                                            <span className="ml-2">Đã mua hàng</span>
                                        </div>
                                        <p className="mb-4 text-gray-400">{new Date(comment.create_date).toLocaleString("vi-VN")}</p>
                                        <p>{comment.content}</p>
                                    </div>

                                </li>)
                            })}
                        </ul>
                        :
                        <div>
                            <MdStars className="flex mx-auto text-gray-500 my-4" size={50} />
                            <p className="text-center text-gray-500">Chưa có đánh giá {comments.star} sao nào cho sản phẩm này</p>
                        </div>
                    }
                </div>
                :
                <div className="py-8 px-4 my-8 bg-white shadow-lg ">
                    <p className="pb-8 text-xl">ĐÁNH GIÁ SẢN PHẨM</p>
                    <MdStars className="flex mx-auto text-gray-500 my-4" size={50} />
                    <p className="text-center text-gray-500">Chưa có đánh giá nào cho sản phẩm này</p>
                </div>
            }
        </div>
    )
}

export default ProductDetail;
