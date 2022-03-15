import { SiAzurefunctions } from "react-icons/si";
import { VscAccount } from "react-icons/vsc";
import { BsSearch } from "react-icons/bs";
import { AiOutlineTablet, AiOutlineLaptop, AiOutlineShoppingCart, AiOutlinePlusCircle } from "react-icons/ai"
import { BsSmartwatch } from "react-icons/bs"
import { GiSmartphone } from "react-icons/gi"
import { RiLoginBoxLine, RiGlobalLine } from "react-icons/ri"
import { useState, useLayoutEffect } from "react";

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
            <div className="w-full bg-green-600">
                <nav className="flex h-[50px] max-w-screen-xl  items-center text-white justify-between py-[14px] mx-auto">
                    <Link to="/" onClick={() => { dispatch(actions.setType("Điện thoại")) }} className="flex items-center cursor-pointer">
                        <SiAzurefunctions size={40} />
                        <p className="text-xl font-bold ml-[8px]">PaTiKa</p>
                    </Link>
                    <div
                        className="relative hidden sm:flex items-center bg-white px-3 py-2 rounded"
                    >
                        <input
                            className="outline-none text-black placeholder-gray-400 min-w-[360px] pr-20"
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
                        <BsSearch className="text-gray-400" size={20} />
                        {
                            searchInput.length !== 0 ?
                                searchProducts.length !== 0 ?
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
                                    <div className="absolute top-[calc(100%+4px)] left-0 w-full px-3 py-2 text-center text-red-500 bg-white shadow-xl rounded z-10">Không tìm thấy sản phẩm phù hợp</div>
                                : <div></div>
                        }
                    </div>

                    {state.isLogin
                        ? (<div className="flex items-center ">
                            {state.role === "admin" &&
                                (<Link to="/add-product" className="relative nav-item flex items-center mr-7 cursor-pointer hover:text-neutral-200">
                                    <AiOutlinePlusCircle size={30} className="mr-[8px] text-white" />
                                    Thêm sản phẩm
                                </Link>)
                            }
                            <Link to="/cart" className="relative nav-item flex items-center mr-4 cursor-pointer hover:text-neutral-200">
                                <AiOutlineShoppingCart size={30} className="mr-[8px] text-white" />
                                <span className="absolute bg-red-400 text-white rounded-3xl z-10 px-2 left-[-20%] top-[-20%] border">{state.productInCart}</span>
                                Giỏ hàng
                            </Link>
                            <div className="relative account-item nav-item flex items-center cursor-pointer hover:text-neutral-200">
                                <VscAccount size={25} className="mr-[8px] text-white" />
                                <span>{username}</span>
                                <ul className="account-item__list hidden absolute top-[calc(100%+6px)] bg-white right-0 shadow-2xl rounded z-10 min-w-[180px]">
                                    <li className="text-black py-2 px-4 hover:bg-gray-300 cursor-pointer"><Link to="/order">Lịch sử mua hàng</Link></li>
                                    <li className="text-black py-2 px-4 hover:bg-gray-300 cursor-pointer"><Link to="/account">Thông tin tài khoản</Link></li>
                                    <li className="text-black py-2 px-4 hover:bg-gray-300 cursor-pointer" onClick={handleLogout}>Đăng xuất</li>
                                </ul>
                            </div>
                        </div>)
                        : (<div className="flex items-center ">
                            <Link to="/signup" className="nav-item flex items-center mr-4 cursor-pointer hover:text-neutral-200">
                                <RiGlobalLine size={30} className="mr-[8px] text-white" />
                                Đăng ký
                            </Link>
                            <Link to="/login" className="nav-item flex items-center cursor-pointer hover:text-neutral-200">
                                <RiLoginBoxLine size={25} className="mr-[8px] text-white" />
                                Đăng nhập
                            </Link>
                        </div>)}
                    {/* <Link to="/signup" className="nav-item flex items-center mr-[16px] cursor-pointer hover:text-neutral-200">
                        <RiGlobalLine size={30} className="mr-[8px] text-white" />
                        Đăng ký
                    </Link>
                    <Link to="/login" className="nav-item flex items-center cursor-pointer hover:text-neutral-200">
                        <RiLoginBoxLine size={25} className="mr-[8px] text-white" />
                        Đăng nhập
                    </Link> */}
                    {/* <Link to="/cart" className="nav-item flex items-center mr-[16px] cursor-pointer hover:text-neutral-200">
                            <AiOutlineShoppingCart size={30} className="mr-[8px] text-white" />
                            Giỏ hàng
                        </Link>
                        <Link to="/account" className="nav-item flex items-center cursor-pointer hover:text-neutral-200">
                            <VscAccount size={25} className="mr-[8px] text-white" />
                            Thông tin tài khoản
                        </Link> */}
                </nav>
            </div>

            <div className="w-full bg-green-400">
                <div className="flex max-w-screen-xl items-center text-white mx-auto">
                    <ul className="flex">
                        <li>
                            <NavLink
                                to="/dien-thoai"
                                onClick={() => { dispatch(actions.setType("Điện thoại")) }}
                                className={({ isActive }) =>
                                    isActive ? "flex items-center mr-4 bg-green-500 p-2" : "flex items-center mr-4 hover:bg-green-500 p-2"}>
                                <GiSmartphone size={20} />
                                <span className="ml-1">Điện thoại</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/tablet"
                                onClick={() => { dispatch(actions.setType("Tablet")) }}
                                className={({ isActive }) =>
                                    isActive ? "flex items-center mr-4 bg-green-500 p-2" : "flex items-center mr-4 hover:bg-green-500 p-2"}>
                                <AiOutlineTablet size={20} />
                                <span className="ml-1">Tablet</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/laptop"
                                onClick={() => { dispatch(actions.setType("Laptop")) }}
                                className={({ isActive }) =>
                                    isActive ? "flex items-center mr-4 bg-green-500 p-2" : "flex items-center mr-4 hover:bg-green-500 p-2"}>
                                <AiOutlineLaptop size={20} />
                                <span className="ml-1">Laptop</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/dong-ho-thong-minh"
                                onClick={() => { dispatch(actions.setType("Đồng hồ thông minh")) }}
                                className={({ isActive }) =>
                                    isActive ? "flex items-center mr-4 bg-green-500 p-2" : "flex items-center mr-4 hover:bg-green-500 p-2"}>
                                <BsSmartwatch size={20} />
                                <span className="ml-1">Đồng hồ thông minh</span>
                            </NavLink>
                        </li>

                    </ul>
                </div>
            </div>

        </div>

    )
}

export default Header;