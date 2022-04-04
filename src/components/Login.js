import { SiAzurefunctions } from "react-icons/si";
import { useState } from "react"
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
// import { useStore, actions } from "../store"
import {useDispatch} from "react-redux"
import {setLogin, setRole} from "../store/features/account/accountSlice"
import {setCategory} from "../store/features/category/categorySlice"
function Login({ onClick }) {
    const dispatch = useDispatch();
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState({
        username: "",
        password: ""
    });
    const [inputs, setInputs] = useState({
        username: "",
        password: ""
    });
    const navigate = useNavigate();

    const handleInputsChange = (e) => {
        setInputs(prevState => ({
            ...prevState,
            [e.target.id]: e.target.value
        }))
    }

    const handleBlur = (e) => {
        if (e.target.value?.length <= 0) {
            if (e.target.id === "username") {
                setMessages(prevState => ({
                    ...prevState,
                    username: "Tên đăng nhập không được để trống."
                }))
            }
            if (e.target.id === "password") {
                setMessages(prevState => ({
                    ...prevState,
                    password: "Mật khẩu không được để trống."
                }))
            }
        }
    }

    const handleFocus = (e) => {
        setMessages(prevState => ({
            ...prevState,
            [e.target.id]: ""
        }))
    } 
    const handleSubmit = (e) => {
        e.preventDefault();
        let checkFormOk = true;
        if (inputs.username?.length <= 0) {
            checkFormOk = false;
            setMessages(prevState => ({
                ...prevState,
                username: "Tên đăng nhập không được để trống."
            }))
        }
        if (inputs.password?.length <= 0) {
            checkFormOk = false;
            setMessages(prevState => ({
                ...prevState,
                password: "Mật khẩu không được để trống."
            }))
        }
        if (checkFormOk) {
            axios.post(`${process.env.REACT_APP_BACKEND_API}/account/signin`, {
                username: inputs.username,
                password: inputs.password
            })
                .then(async (response) => {
                    if (response.status === 200) {
                        const data = response.data;
                        localStorage.setItem("accessToken", data.accessToken);
                        localStorage.setItem("refreshToken", data.refreshToken);
                        const accountResponse = await axios.get(`${process.env.REACT_APP_BACKEND_API}/account/id`, {
                            headers: {
                                authorization: "Bearer " + data.accessToken
                            }
                        });
                        if (accountResponse.status === 200) {
                            dispatch(setRole(accountResponse.data.role));
                            dispatch(setLogin(true));
                            console.log("Role: ", accountResponse.data.role)
                        }
                        // const cookies = new Cookies();
                        // cookies.set('accessToken', data.accessToken, { path: '/' });
                        // cookies.set('refreshToken', data.refreshToken, { path: '/' });
                        navigate("/");
                    }
                    else {
                        setMessage(response.data.message)
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }
    let classNames = "block border focus:border-green-400 mt-2 p-3 md:w-[40vw] w-full outline-none"
    return (
        <form
            onSubmit={handleSubmit}
            className="my-auto flex flex-col bg-white shadow-2xl rounded-lg pt-10 pb-5 px-8"
        >
            <div className="flex w-full justify-center font-semibold text-2xl">
                Đăng nhập vào PaTiKa
                <SiAzurefunctions size={40} className="ml-2 text-green-500" />
            </div>
            <div className="mt-8">
                <label htmlFor="username" className="font-semibold">Tên đăng nhập</label>
                <input
                    className={messages.username?.length > 0 ? classNames + " border-red-400" : classNames + " border-gray-200 hover:border-gray-300 "}
                    id="username"
                    placeholder="Nhập tên đăng nhập"
                    value={inputs.username}
                    onChange={handleInputsChange}
                    onBlur={handleBlur}
                    onFocus={handleFocus}
                />
                {messages.username?.length > 0 && <p className="mt-1 text-red-400">{messages.username}</p>}
            </div>
            <div className="mt-8">
                <label htmlFor="password" className="font-semibold">Mật khẩu</label>
                <input
                    className={messages.password?.length > 0 ? classNames + " border-red-400" : classNames + " border-gray-200 hover:border-gray-300 "}
                    id="password"
                    placeholder="Nhập mật khẩu"
                    value={inputs.password}
                    onChange={handleInputsChange}
                    onBlur={handleBlur}
                    onFocus={handleFocus}
                    type="password"
                />
                {messages.password?.length > 0 && <p className="mt-1 text-red-400">{messages.password}</p>}
            </div>
            {
                message.length !== 0 ? <p className="mt-8 w-full text-red-700 text-center py-3 bg-red-100 border-red-700 border rounded-md">{message}</p> : <p></p>
            }
            <p className="mt-8 w-full text-gray-400">Bạn chưa có tài khoản ? <span className="text-blue-500 hover:text-blue-400 cursor-pointer" onClick={onClick}>Đăng ký ngay</span></p>
            <Link to="/" onClick={() => { dispatch(setCategory("Điện thoại")) }} className="w-full cursor-pointer mt-8">
                <p className="text-blue-500 hover:text-blue-400">Quay về trang chủ</p>
            </Link>
            <button className="mt-8 bg-green-500 hover:bg-green-400 p-3 w-full text-white rounded-lg" type="submit">Đăng nhập</button>
        </form>
    )
}

export default Login;