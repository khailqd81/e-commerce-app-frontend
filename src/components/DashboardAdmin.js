import { FaUserCog } from "react-icons/fa"
import { AiFillSetting } from "react-icons/ai"
import { BsFillBarChartLineFill } from "react-icons/bs"
import { NavLink } from "react-router-dom";
import {useDispatch} from "react-redux"
import {setCategory} from "../store/features/category/categorySlice"
function DashboardAdmin() {
    const dispatch = useDispatch();
    return (
        <div className="basis-[100%] md:basis-[20%] py-4 border-r shadow">
            <p className="text-center uppercase text-green-500 font-bold">Chức năng</p>
            <ul className="mt-4">
                <li className="">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive ? "flex py-3 bg-green-100 px-4" : "flex py-3 hover:bg-green-100 px-4 cursor-pointer"
                        }
                        onClick={() => { dispatch(setCategory("Điện thoại")) }}
                    >
                        <AiFillSetting className="mr-2 text-green-500" size={20} />
                        Quản lý sản phẩm
                    </NavLink>
                </li>
                <li className="">
                    <NavLink
                        to="/users"
                        className={({ isActive }) =>
                            isActive ? "flex py-3 bg-green-100 px-4" : "flex py-3 hover:bg-green-100 px-4 cursor-pointer"
                        }
                    >
                        <FaUserCog className="mr-2 text-green-500" size={20} />
                        Quản lý người dùng
                    </NavLink>
                </li>
                <li className="">
                    <NavLink
                        to="/statistic"
                        className={({ isActive }) =>
                            isActive ? "flex py-3 bg-green-100 px-4" : "flex py-3 hover:bg-green-100 px-4 cursor-pointer"
                        }
                    >
                        <BsFillBarChartLineFill className="mr-2 text-green-500" size={20} />
                        Xem thống kê sản phẩm
                    </NavLink>
                </li>
            </ul>
        </div>
    )
}

export default DashboardAdmin;
