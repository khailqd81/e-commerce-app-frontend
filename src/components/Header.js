import { SiAzurefunctions } from "react-icons/si";
import { VscAccount } from "react-icons/vsc";
import { BsSearch } from "react-icons/bs";
import { AiOutlineTablet, AiOutlineLaptop, AiOutlineShoppingCart } from "react-icons/ai"
import { BsSmartwatch } from "react-icons/bs"
import { GiSmartphone } from "react-icons/gi"
import { RiLoginBoxLine, RiGlobalLine } from "react-icons/ri"
import React, { useState, useLayoutEffect } from "react";

import axios from "axios";
import { NavLink, Link, useNavigate } from "react-router-dom"

import "../index.css"
import { useStore, actions } from "../store";
import isLogin from "../utils/isLogin";
import { urlFormat } from "../utils/urlFormat";
function Header() {
    const [state, dispatch] = useStore();
    const [searchProducts, setSearchProducts] = useState([]);
    const [username, setUsername] = useState("username");
    // let [searchParams, setSearchParams] = useSearchParams();
    let [searchInput, setSearchInput] = useState("");

    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(actions.setLogin(false));
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        navigate("/");
    }

    useLayoutEffect(() => {
        async function getCart() {
            const authorization = await isLogin();
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_API}/cart`, {
                headers: {
                    authorization: authorization
                }
            });
            if (response.status === 200) {
                dispatch(actions.setProductInCart(response.data.products.length));
            }
        }
        getCart();
    }, [state.productInCart, dispatch])

    useLayoutEffect(() => {
        async function getUserInfo() {
            const authorization = await isLogin();
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_API}/account/id`, {
                headers: {
                    authorization: authorization
                }
            });
            if (response.status === 200) {
                setUsername(response.data.username);
            } else {
                setUsername("username");
            }
        }
        getUserInfo();
    }, [])

    const handleOnSearchChange = async (e) => {
        let search = e.target.value;
        if (search) {
            setSearchInput(search)
            if (search.trim().length !== 0) {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_API}/products/search`, {
                    params: {
                        productName: search
                    }
                })
                const products = response.data;
                if (products.length !== 0) {
                    // newProduct là mảng mới chứa các product mà có thêm trường category_name
                    let newProduct = [];

                    let maxCount = 0;
                    for (let product of products) {
                        maxCount++;
                        if (maxCount > 5) {
                            break;
                        }
                        const category = await axios.get(`${process.env.REACT_APP_BACKEND_API}/category/id/${product.category_id}`);
                        let productLink = "/" + urlFormat(category.data.category_name) + "/" + urlFormat(product.product_name);
                        newProduct.push({
                            ...product,
                            productLink
                        })
                    }
                    setSearchProducts(newProduct);
                } else {
                    setSearchProducts(products);
                }
            }
        } else {
            setSearchInput("");
            setSearchProducts([]);
        }
    }

    const handleSearch = () => {
        if (searchInput.trim().length !== 0) {
            setSearchInput("")
            const navigateStr = `/search?name=${searchInput}`;
            navigate(navigateStr);
        }

    }
    return (
        <div>
            <div className="w-full bg-green-600 md:px-2">
                <nav className="flex px-2 md:px-0 relative h-[50px] max-w-screen-xl items-center text-white justify-between py-[14px] mx-auto">
                    <Link to="/" onClick={() => { dispatch(actions.setType("Điện thoại")) }} className="flex items-center cursor-pointer">
                        <SiAzurefunctions className="hidden md:block" size={40} />
                        <SiAzurefunctions className="md:hidden" size={30} />
                        <p className="text-xl font-bold ml-[8px]">PaTiKa</p>
                    </Link>
                    <BsSearch
                        className="md:hidden text-white cursor-pointer"
                        size={25}
                        onClick={e => {
                            if (e.target.nextElementSibling && e.target.nextElementSibling.classList.contains("hidden")) {
                                e.target.nextElementSibling.classList.remove("hidden")
                                e.target.nextElementSibling.classList.add("flex")
                            } else if (e.target.nextElementSibling.classList.contains("flex")) {
                                e.target.nextElementSibling.classList.remove("flex")
                                e.target.nextElementSibling.classList.add("hidden")
                            }
                            // if (e.target.nextElementSibling && e.target.nextElementSibling.classList.contain("hidden")) {
                            //     e.target.nextElementSibling.style.display = "flex"
                            // } else if (e.target.nextElementSibling) {
                            //     e.target.nextElementSibling.style.display = "none"
                            // }
                        }}
                    />
                    <div
                        className="drop-search hidden md:flex justify-between items-center absolute w-full md:w-auto left-0 top-[100%] md:top-0 md:relative bg-white px-3 py-2 md:rounded"
                    >
                        <input
                            className="outline-none text-black placeholder-gray-400 basis-[80%] md:basis-auto md:min-w-[360px] md:pr-20"
                            placeholder="Nhập tên sản phẩm cần tìm ..."
                            type="text"
                            value={searchInput}
                            onChange={handleOnSearchChange}
                            onKeyUp={(e) => {
                                if (e.key === "Enter") {
                                    handleSearch()
                                }
                            }}
                        />
                        <BsSearch className={searchInput.length !== 0 ? "text-gray-400 cursor-pointer" : "text-gray-400"} size={20} onClick={handleSearch} />
                        {
                            searchInput.length !== 0 &&
                            (searchProducts.length !== 0 ?
                                <ul className="absolute top-[calc(100%+4px)] left-0 w-full bg-white shadow-xl rounded z-10">

                                    {
                                        searchProducts.map((searchProduct) => {
                                            return (
                                                <li key={searchProduct.product_id}>
                                                    <Link
                                                        to={searchProduct.productLink}
                                                        className="block text-black px-3 py-2 w-full bg-white hover:bg-gray-200"
                                                        onClick={() => {
                                                            dispatch(actions.setProduct(searchProduct))
                                                            setSearchInput("");
                                                        }}
                                                    >
                                                        {searchProduct.product_name}
                                                    </Link>
                                                </li>
                                            )
                                        })

                                    }
                                </ul>
                                :
                                <div className="absolute top-[calc(100%+4px)] left-0 w-full px-3 py-2 text-center text-red-500 bg-white shadow-xl rounded z-10">Không tìm thấy sản phẩm phù hợp</div>)
                        }
                    </div>

                    {state.isLogin
                        ? (<div className="flex items-center ">
                            {state.role === "customer" &&
                                (<Link to="/cart" className="relative nav-item flex items-center mr-4 cursor-pointer hover:text-neutral-200">
                                    <AiOutlineShoppingCart size={30} className="mr-[8px] text-white" />
                                    <span className="absolute bg-red-400 text-white rounded-3xl z-10 px-2 left-[-20%] top-[-20%] border">{state.productInCart}</span>
                                    <span className="hidden md:block">Giỏ hàng</span>
                                </Link>
                                )
                            }

                            <div 
                                className="relative account-item nav-item flex items-center cursor-pointer hover:text-neutral-200"
                                onClick={() => {}}
                            >
                                <VscAccount size={25} className="md:mr-[8px] text-white" />
                                <span className="hidden md:block">{username}</span>
                                <ul className="account-item__list hidden absolute top-[calc(100%+6px)] bg-white right-0 shadow-2xl rounded z-10 min-w-[180px]">
                                    {state.role === "admin"
                                        && (
                                            <React.Fragment>
                                                <li>
                                                    <Link to="/add-product" className="block text-black py-2 px-4 hover:bg-gray-300 cursor-pointer">
                                                        Thêm sản phẩm
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to="/users" className="block text-black py-2 px-4 hover:bg-gray-300 cursor-pointer">Quản lý người dùng</Link>
                                                </li>
                                            </React.Fragment>)}
                                    {state.role === "customer" && <li><Link to="/order" className="block text-black py-2 px-4 hover:bg-gray-300 cursor-pointer">Lịch sử mua hàng</Link></li>}
                                    <li><Link to="/account" className="block text-black py-2 px-4 hover:bg-gray-300 cursor-pointer">Thông tin tài khoản</Link></li>
                                    <li>
                                        <Link to="/statistic" className="block text-black py-2 px-4 hover:bg-gray-300 cursor-pointer">Xem thống kê</Link>
                                    </li>
                                    <li className="text-black py-2 px-4 hover:bg-gray-300 cursor-pointer" onClick={handleLogout}>Đăng xuất</li>
                                </ul>
                            </div>
                        </div>)
                        : (<div className="flex items-center ">
                            <Link to="/signup" className="hidden md:flex nav-item items-center mr-4 cursor-pointer hover:text-neutral-200">
                                <RiGlobalLine size={30} className="mr-[8px] text-white" />
                                Đăng ký
                            </Link>
                            <Link to="/login" className="nav-item flex items-center cursor-pointer hover:text-neutral-200">
                                <RiLoginBoxLine size={25} className="mr-[8px] text-white" />
                                Đăng nhập
                            </Link>
                        </div>)}
                </nav>
            </div>

            <div className="w-full bg-green-400">
                <div className="flex md:max-w-screen-xl items-center text-white mx-auto">
                    <ul className="flex flex-wrap w-full">
                        <li className="basis-2/4 md:basis-auto">
                            <NavLink
                                to="/dien-thoai"
                                onClick={() => { dispatch(actions.setType("Điện thoại")) }}
                                className={({ isActive }) =>
                                    isActive ? "flex items-center md:mr-4 bg-green-500 p-2 justify-center" : "flex items-center md:mr-4 hover:bg-green-500 p-2 justify-center"}>
                                <GiSmartphone size={20} />
                                <span className="ml-1">Điện thoại</span>
                            </NavLink>
                        </li>
                        <li className="basis-2/4 md:basis-auto">
                            <NavLink
                                to="/tablet"
                                onClick={() => { dispatch(actions.setType("Tablet")) }}
                                className={({ isActive }) =>
                                    isActive ? "flex items-center md:mr-4 bg-green-500 p-2 justify-center" : "flex items-center md:mr-4 hover:bg-green-500 p-2 justify-center"}>
                                <AiOutlineTablet size={20} />
                                <span className="ml-1">Tablet</span>
                            </NavLink>
                        </li>
                        <li className="basis-2/4 md:basis-auto">
                            <NavLink
                                to="/laptop"
                                onClick={() => { dispatch(actions.setType("Laptop")) }}
                                className={({ isActive }) =>
                                    isActive ? "flex items-center md:mr-4 bg-green-500 p-2 justify-center h-full" : "flex items-center md:mr-4 hover:bg-green-500 p-2 justify-center h-full"}>
                                <AiOutlineLaptop size={20} />
                                <span className="ml-1">Laptop</span>
                            </NavLink>
                        </li>
                        <li className="basis-2/4 md:basis-auto text-center">
                            <NavLink
                                to="/dong-ho-thong-minh"
                                onClick={() => { dispatch(actions.setType("Đồng hồ thông minh")) }}
                                className={({ isActive }) =>
                                    isActive ? "flex items-center bg-green-500 p-2 justify-center" : "flex items-center hover:bg-green-500 p-2 justify-center"}>
                                <BsSmartwatch size={20} />
                                <span className="ml-1 hidden md:block">Đồng hồ thông minh</span>
                                <span className="ml-1 md:hidden">Đồng hồ</span>
                            </NavLink>
                        </li>

                    </ul>
                </div>
            </div>

        </div>

    )
}

export default Header;