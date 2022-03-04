import { NavLink, Link, useNavigate } from "react-router-dom"
import { SiAzurefunctions } from "react-icons/si";
import { VscAccount } from "react-icons/vsc";
import { BsSearch } from "react-icons/bs";
import { AiOutlineTablet, AiOutlineLaptop, AiOutlineShoppingCart } from "react-icons/ai"
import { BsSmartwatch } from "react-icons/bs"
import { GiSmartphone } from "react-icons/gi"
import { RiLoginBoxLine, RiGlobalLine } from "react-icons/ri"
import { useContext, useState, useEffect } from "react";
import axios from "axios";

import "../index.css"
import TypeContext from '../store/TypeContext';
import { actions } from "../store";
import isLogin from "../utils/isLogin";
function Header() {
    const [state, dispatch] = useContext(TypeContext);
    const [searchInput, setSearchInput] = useState("");
    const navigate = useNavigate();
    const handleLogout = () => {
        dispatch(actions.setLogin(false));
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        navigate("/");
    }
    useEffect(() => {
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
    },[state.productInCart])

    return (
        <div>
            <div className="w-full bg-green-600">
                <nav className="flex h-[50px] max-w-screen-xl  items-center text-white justify-between p-[14px] mx-auto">
                    <Link to="/" onClick={() => { dispatch(actions.setType("Điện thoại")) }} className="flex items-center cursor-pointer">
                        <SiAzurefunctions size={40} />
                        <p className="text-xl font-bold ml-[8px]">PaTiKa</p>
                    </Link>
                    <div className="hidden sm:flex items-center bg-white px-[10px] py-[6px] rounded">
                        <input
                            className="outline-none text-black placeholder-gray-400 min-w-[360px] pr-20"
                            placeholder="Nhập tên sản phẩm cần tìm ..."
                            type="text"
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}

                        />
                        <BsSearch className="text-gray-400" size={20} />
                    </div>

                    {state.isLogin ?
                        (<div className="flex items-center ">
                            <Link to="/cart" className="relative nav-item flex items-center mr-[16px] cursor-pointer hover:text-neutral-200">
                                <AiOutlineShoppingCart size={30} className="mr-[8px] text-white" />
                                <span className="absolute bg-red-400 text-white rounded-3xl z-10 px-2 left-[-20%] top-[-20%] border">{state.productInCart}</span>
                                Giỏ hàng
                            </Link>
                            <div className="relative account-item nav-item flex items-center cursor-divointer hover:text-neutral-200">
                                <VscAccount size={25} className="mr-[8px] text-white" />
                                Thông tin tài khoản
                                <ul className="account-item__list hidden absolute top-[calc(100%+6px)] bg-white left-0 shadow-2xl rounded z-10">
                                    <li className="text-black py-2 px-4 hover:bg-gray-300 cursor-pointer"><Link to="/account">Lịch sử mua hàng</Link></li>
                                    <li className="text-black py-2 px-4 hover:bg-gray-300 cursor-pointer"><Link to="/account">Thông tin tài khoản</Link></li>
                                    <li className="text-black py-2 px-4 hover:bg-gray-300 cursor-pointer" onClick={handleLogout}>Đăng xuất</li>
                                </ul>
                            </div>
                        </div>)
                        : (<div className="flex items-center ">
                            <Link to="/signup" className="nav-item flex items-center mr-[16px] cursor-pointer hover:text-neutral-200">
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
                <div className="flex max-w-screen-xl items-center text-white mx-auto px-[14px]">
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