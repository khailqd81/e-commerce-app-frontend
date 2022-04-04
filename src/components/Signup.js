import axios from "axios";
import { useState } from "react"
import { Link } from "react-router-dom";
import { SiAzurefunctions } from "react-icons/si";
// Redux
import { useDispatch } from "react-redux";
import {setCategory} from "../store/features/category/categorySlice"
//
import InputForm from "./InputForm";
// import { actions, useStore } from "../store";
function Signup({ onClick }) {
    // const [, dispatch] = useStore()
    const dispatch = useDispatch()
    const [inputs, setInputs] = useState({
        username: "",
        password: "",
        fullname: "",
        rePassword: "",
        email: "",
    });
    const [message, setMessage] = useState("")
    const [messageErr, setMessageErr] = useState({
        username: "",
        password: "",
        fullname: "",
        rePassword: "",
        email: "",
    });
    // Nguồn tham khảo https://www.w3resource.com/javascript/form/email-validation.php

    const validateEmail = (mail) => {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
            return (true)
        }
        return (false)
    }
    const handleInputsChange = (e) => {
        setInputs(prevState => ({
            ...prevState,
            [e.target.id]: e.target.value
        }))
    }

    const handleFocus = (e) => {
        setMessageErr(prevState => ({
            ...prevState,
            [e.target.id]: ""
        }))
    }

    const handleBlur = (e) => {
        if (e.target.value.length <= 0) {
            setMessageErr(prevState => ({
                ...prevState,
                [e.target.id]: "Vui lòng không để trống trường này"
            }))
        }
    }
    const handleBlurEmail = (e) => {
        if (e.target.value.length <= 0) {
            setMessageErr(prevState => ({
                ...prevState,
                [e.target.id]: "Vui lòng không để trống trường này"
            }))
        } else {
            if (!validateEmail(inputs.email)) {
                setMessageErr(prevState => ({
                    ...prevState,
                    email: "Trường này phải là email."
                }))
            }
        }

    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        let mess = {}
        let checkEmpty = false
        let checkFormOk = true
        for (let key of Object.keys(inputs)) {
            if (inputs[key].length <= 0) {
                mess[key] = "Vui lòng không để trống trường này"
                checkEmpty = true
            }
        }
        if (checkEmpty) {
            checkFormOk = false
            setMessageErr(mess)
        }
        if (inputs.email?.length > 0 && !validateEmail(inputs.email)) {
            checkFormOk = false;
            setMessageErr(prevState => ({
                ...prevState,
                email: "Trường này phải là email."
            }))
        }
        if (inputs.password?.length > 0 && inputs.password !== inputs.rePassword) {
            checkFormOk = false;
            setMessageErr(prevState => ({
                ...prevState,
                rePassword: "Vui lòng nhập lại đúng mật khẩu ở trên."
            }))
        }
        if (checkFormOk) {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_API}/account/signup`, {
                ...inputs
            })
            if (response.status === 200) {
                onClick();
            }
            else {
                setMessage(response.data.message)
            }
        }
    }
    let classNames = "block border focus:border-green-400 mt-2 p-3 md:w-[40vw] w-full outline-none";
    return (
        <form onSubmit={handleSubmit} className="my-auto bg-white shadow-2xl rounded-lg pt-10 pb-5 px-8 my-10 w-full md:w-auto">
            <div className="flex w-full justify-center font-semibold text-2xl">
                Tham gia PaTiKa
                <SiAzurefunctions size={40} className="ml-2 text-green-500" />
            </div>
            <InputForm
                classNames={messageErr.username?.length > 0 ? classNames + " border-red-400" : classNames + " border-gray-200 hover:border-gray-300 "}
                label="Tên đăng nhập"
                id="username"
                placeholder="Nhập tên đăng nhập"
                value={inputs.username}
                onChange={handleInputsChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                message={messageErr.username}
            />
            <InputForm
                classNames={messageErr.email?.length > 0 ? classNames + " border-red-400" : classNames + " border-gray-200 hover:border-gray-300 "}
                label="Email"
                id="email"
                placeholder="Nhập email"
                value={inputs.email}
                onChange={handleInputsChange}
                type="text"
                onFocus={handleFocus}
                onBlur={handleBlurEmail}
                message={messageErr.email}
            />
            <InputForm
                classNames={messageErr.fullname?.length > 0 ? classNames + " border-red-400" : classNames + " border-gray-200 hover:border-gray-300 "}
                label="Họ và tên"
                id="fullname"
                placeholder="Nhập họ và tên"
                value={inputs.fullname}
                onChange={handleInputsChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                message={messageErr.fullname}
            />
            <InputForm
                classNames={messageErr.password?.length > 0 ? classNames + " border-red-400" : classNames + " border-gray-200 hover:border-gray-300 "}
                label="Mật khẩu"
                id="password"
                placeholder="Nhập mật khẩu"
                value={inputs.password}
                onChange={handleInputsChange}
                type="password"
                onFocus={handleFocus}
                onBlur={handleBlur}
                message={messageErr.password}
            />
            <InputForm
                classNames={messageErr.rePassword?.length > 0 ? classNames + " border-red-400" : classNames + " border-gray-200 hover:border-gray-300 "}
                label="Nhập lại mật khẩu"
                id="rePassword"
                placeholder="Nhập lại mật khẩu"
                value={inputs.rePassword}
                onChange={handleInputsChange}
                type="password"
                onFocus={handleFocus}
                onBlur={handleBlur}
                message={messageErr.rePassword}
            />
            {
                message.length !== 0 ? <p className="mt-8 w-full text-red-700 text-center py-3 bg-red-100 border-red-700 border rounded-md">{message}</p> : <p></p>
            }
            <p className="mt-8 w-full text-gray-400">Bạn đã có tài khoản ? <span className="text-blue-500 hover:text-blue-400 cursor-pointer" onClick={onClick}>Đăng nhập ngay</span></p>
            <Link to="/" onClick={() => { dispatch(setCategory("Điện thoại")) }} className="block w-full cursor-pointer mt-8">
                <p className="text-blue-500 hover:text-blue-400">Quay về trang chủ</p>
            </Link>
            <button className="mt-8 bg-green-500 hover:bg-green-400 p-3 w-full text-white rounded-lg" type="submit">Đăng ký</button>
        </form>
    )
}

export default Signup;