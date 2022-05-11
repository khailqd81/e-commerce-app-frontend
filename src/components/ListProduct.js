import axios from "axios";
import React, { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { BsFillArrowUpCircleFill } from "react-icons/bs"
import { AiOutlineTablet, AiOutlineLaptop, AiOutlinePlus } from "react-icons/ai"
import { BsSmartwatch } from "react-icons/bs"
import { GiSmartphone } from "react-icons/gi"
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import ReactLoading from 'react-loading';
// Redux
import { useSelector, useDispatch } from "react-redux";
import { setCategory } from "../store/features/category/categorySlice"
//
import ProductCard from "./ProductCard"
import SlideShow from "./SlideShow";
import { urlFormat } from "../utils/urlFormat";

function ListProduct() {
    const [products, setProducts] = useState([]);
    const [showGoTo, setShowGoTo] = useState(false);
    const [cateUrl, setCateUrl] = useState("dien-thoai");
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();
    const location = useLocation();
    let category = useSelector(state => state.category.value);
    const account = useSelector(state => state.account);
    // Lấy category theo localStorage
    if (location.pathname !== "/" && category !== localStorage.getItem("category")) {
        category = localStorage.getItem("category");
    }

    useEffect(() => {
        async function getAllProducts() {
            setIsLoading(true)
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_API}/category/${category}`);
            const data = response.data;
            setCateUrl(urlFormat(category));
            setProducts(data.sort((a, b) => (a.product_name > b.product_name) ? 1 : -1));
            setIsLoading(false)
        }
        getAllProducts();
    }, [category]);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 800) {
                setShowGoTo(true);
            } else {
                setShowGoTo(false);
            }
        }
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    }, [])

    let listClassName = `flex flex-wrap max-w-screen-xl mx-auto my-[20px]`;

    if (products.length === 0) {
        listClassName += " justify-center";
    }

    if (isLoading) {
        if (account && account.isLogin && account.role === "admin") {
            console.log("skeleton run")
            return (
                <div className="min-h-[60vh] basis-[80%] flex justify-center items-center">
                    <ReactLoading className="mx-auto" type={"spin"} color={"green"} height={50} width={50} />
                </div>
            )
        }
        return (
            <div className="my-8 h-full max-w-screen-xl px-2 md:px-0 mx-auto">
                <p className="h-[20vh] mb-4"><Skeleton height={"20vh"} /></p>
                <div className="h-[40vh]">
                    <Skeleton height={"40vh"} />
                </div>
            </div>
        )
    }
    let rootClass = "mt-4"
    if (account && account.isLogin && account.role === "admin") {
        rootClass += " md:basis-[80%]"
    }
    return (
        <div className={rootClass}>
            {account?.role === "admin"
                ?
                <div className="flex-col">
                    <div
                        className="z-20 fixed right-2 bottom-8"
                    >
                        <Link to="/add-product" className="block shadow-lg hover:scale-105 rounded-full bg-green-500 p-2">
                            <AiOutlinePlus size={50} className="text-white" />
                        </Link>
                    </div>
                    <ul className="flex flex-wrap w-full ml-2">
                        <li className="basis-2/4 md:basis-auto">
                            <NavLink
                                to="/dien-thoai"
                                onClick={() => { dispatch(setCategory("Điện thoại")) }}
                                className={({ isActive }) =>
                                    isActive ? "flex items-center md:mr-4 bg-green-500 text-white p-2 justify-center" : "flex items-center md:mr-4 hover:bg-green-500 hover:text-white p-2 justify-center"}>
                                <GiSmartphone size={20} />
                                <span className="ml-1">Điện thoại</span>
                            </NavLink>
                        </li>
                        <li className="basis-2/4 md:basis-auto">
                            <NavLink
                                to="/tablet"
                                onClick={() => { dispatch(setCategory("Tablet")) }}
                                className={({ isActive }) =>
                                    isActive ? "flex items-center md:mr-4 bg-green-500 text-white p-2 justify-center" : "flex items-center md:mr-4 hover:bg-green-500 hover:text-white p-2 justify-center"}>
                                <AiOutlineTablet size={20} />
                                <span className="ml-1">Tablet</span>
                            </NavLink>
                        </li>
                        <li className="basis-2/4 md:basis-auto">
                            <NavLink
                                to="/laptop"
                                onClick={() => { dispatch(setCategory("Laptop")) }}
                                className={({ isActive }) =>
                                    isActive ? "flex items-center md:mr-4 bg-green-500 text-white p-2 justify-center h-full" : "flex items-center md:mr-4 hover:bg-green-500 hover:text-white p-2 justify-center h-full"}>
                                <AiOutlineLaptop size={20} />
                                <span className="ml-1">Laptop</span>
                            </NavLink>
                        </li>
                        <li className="basis-2/4 md:basis-auto text-center">
                            <NavLink
                                to="/dong-ho-thong-minh"
                                onClick={() => { dispatch(setCategory("Đồng hồ thông minh")) }}
                                className={({ isActive }) =>
                                    isActive ? "flex items-center bg-green-500 text-white p-2 justify-center" : "flex items-center hover:bg-green-500 hover:text-white p-2 justify-center"}>
                                <BsSmartwatch size={20} />
                                <span className="ml-1 hidden md:block">Đồng hồ thông minh</span>
                                <span className="ml-1 md:hidden">Đồng hồ</span>
                            </NavLink>
                        </li>
                    </ul>
                </div>
                : <SlideShow />
            }
            {
                products.length !== 0
                    ?
                    <ul className="flex flex-wrap max-w-screen-xl mx-auto my-[20px] px-2 overflow-x-auto no-scrollbar">
                        <li className="text-center py-2 px-1 md:px-6 border bg-gray-50 text-gray-600 rounded-lg mt-2 md:mt-0 mr-2">Sắp xếp</li>
                        <li
                            className="text-center py-2 px-1 md:px-6 border bg-gray-50 text-gray-600 rounded-lg cursor-pointer mt-2 md:mt-0 mr-2"
                            onClick={() => {
                                const newProducts = [...products];
                                newProducts.sort((a, b) => (a.product_name > b.product_name) ? 1 : -1)
                                setProducts(newProducts)
                            }}
                        >
                            Từ A tới Z
                        </li>
                        <li
                            className="text-center py-2 px-1 md:px-6 border bg-gray-50 text-gray-600 rounded-lg cursor-pointer mt-2 md:mt-0 mr-2"
                            onClick={() => {
                                const newProducts = [...products];
                                newProducts.sort((a, b) => (a.product_name > b.product_name) ? -1 : 1)
                                setProducts(newProducts)
                            }}
                        >
                            Từ Z tới A
                        </li>
                        <li
                            className="text-center py-2 px-1 md:px-6 border bg-gray-50 text-gray-600 rounded-lg cursor-pointer mt-2 md:mt-0 mr-2"
                            onClick={() => {
                                const newProducts = [...products];
                                newProducts.sort((a, b) => a.price - b.price)
                                setProducts(newProducts)
                            }}
                        >
                            Giá tăng dần
                        </li>
                        <li
                            className="text-center py-2 px-1 md:px-6 border bg-gray-50 text-gray-600 rounded-lg cursor-pointer mt-2 md:mt-0 mr-2"
                            onClick={() => {
                                const newProducts = [...products];
                                newProducts.sort((a, b) => b.price - a.price)
                                setProducts(newProducts)
                            }}
                        >
                            Giá giảm dần
                        </li>
                    </ul>
                    :
                    <div></div>
            }


            <div className={listClassName}>
                {
                    products.length !== 0
                        ?
                        <React.Fragment>
                            {products.map((product) => {
                                return (
                                    <ProductCard
                                        key={product.product_id}
                                        product={product}
                                        cateUrl={cateUrl}
                                    />
                                )
                            })}
                        </React.Fragment>
                        :
                        <p className="text-red-500 font-semibold py-4">Không có sản phẩm nào thuộc danh mục này</p>
                }
            </div>

            {
                showGoTo &&
                <div
                    className="md:hidden fixed right-2 bottom-8"
                    onClick={() => {
                        window.scrollTo({
                            top: 0,
                            left: 0,
                            behavior: 'smooth'
                        });
                    }}>
                    <BsFillArrowUpCircleFill size={60} className="text-green-500" />
                </div>
            }
        </div >

    )
}

export default ListProduct;
