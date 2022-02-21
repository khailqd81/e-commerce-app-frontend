import { Link } from "react-router-dom"
import { SiAzurefunctions } from "react-icons/si";
import { VscAccount } from "react-icons/vsc";
import { BsSearch } from "react-icons/bs";
import { AiOutlineShoppingCart } from "react-icons/ai"
import { AiOutlineTablet } from "react-icons/ai"
import { AiOutlineLaptop } from "react-icons/ai"
import { BsSmartwatch } from "react-icons/bs"
import { GiSmartphone } from "react-icons/gi"
function Header() {
    return (
        <div>
            <div className="w-full bg-green-600">
                <nav className="flex h-[50px] max-w-screen-xl  items-center text-white justify-between p-[14px] mx-auto">
                    <div className="flex items-center cursor-pointer">
                        <SiAzurefunctions size={40} />
                        <p className="text-xl font-bold ml-[8px]">PaTiKa</p>
                    </div>
                    <div className="hidden sm:flex items-center bg-white px-[10px] py-[6px] rounded">
                        <input className="outline-none text-black placeholder-gray-400 min-w-[360px] pr-20" placeholder="Nhập tên sản phẩm cần tìm ..." type="text" />
                        <BsSearch className="text-gray-400" size={20}/>
                    </div>
                    <div className="flex items-center ">
                        <a className="flex items-center mr-[16px] cursor-pointer">
                            <AiOutlineShoppingCart size={30} className="mr-[8px] text-white" />
                            Giỏ hàng
                        </a>
                        <a className="flex items-center cursor-pointer">
                            <VscAccount size={25} className="mr-[8px] text-white font-bold" />
                            Thông tin tài khoản
                        </a>
                    </div>
                </nav>
            </div>

            <div className="w-full bg-green-400">
                <div className="flex max-w-screen-xl items-center text-white mx-auto px-[14px] py-2">
                    <ul className="flex">
                        <li>
                            <a href="#" className="flex items-center mr-4">
                                <GiSmartphone size={20}/>
                                <span className="ml-1">Điện thoại</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center mr-4">
                                <AiOutlineTablet size={20}/>
                                <span className="ml-1">Tablet</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center mr-4">
                                <AiOutlineLaptop size={20}/>
                                <span className="ml-1">Laptop</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center mr-4">
                                <BsSmartwatch size={20}/>
                                <span className="ml-1">Đồng hồ thông minh</span>
                            </a>
                        </li>

                    </ul>
                </div>
            </div>

        </div>

    )
}

export default Header;