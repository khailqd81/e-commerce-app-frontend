import axios from "axios";
import { useState } from "react"
import { SiAzurefunctions } from "react-icons/si";
import InputForm from "./InputForm";
function Signup({ onClick }) {
    
    const [inputs, setInputs] = useState({
        username: "",
        password: "",
        fullname: "",
        rePassword: "",
        email: "",
    });
    const [message, setMessage] = useState("")
    const handleInputsChange = (e) => {
        setInputs(prevState => ({
            ...prevState,
            [e.target.id]: e.target.value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
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
    return (
        <form onSubmit={handleSubmit} className="my-auto bg-white shadow-2xl rounded-lg pt-10 pb-5 px-8 my-10 w-full md:w-auto">
            <div className="flex w-full justify-center font-semibold text-2xl">
                Tham gia PaTiKa
                <SiAzurefunctions size={40} className="ml-2 text-green-500" />
            </div>
            <InputForm
                label="Tên đăng nhập"
                id="username"
                placeholder="Nhập tên đăng nhập"
                value={inputs.username}
                onChange={handleInputsChange}
            />
            <InputForm
                label="Email"
                id="email"
                placeholder="Nhập email"
                value={inputs.email}
                onChange={handleInputsChange}
                type="email"
            />
            <InputForm
                label="Họ và tên"
                id="fullname"
                placeholder="Nhập họ và tên"
                value={inputs.fullname}
                onChange={handleInputsChange}
            />
            <InputForm
                label="Mật khẩu"
                id="password"
                placeholder="Nhập mật khẩu"
                value={inputs.password}
                onChange={handleInputsChange}
                type="password"
            />
            <InputForm
                label="Nhập lại mật khẩu"
                id="rePassword"
                placeholder="Nhập lại mật khẩu"
                value={inputs.rePassword}
                onChange={handleInputsChange}
                type="password"
            />
            {
                message.length !== 0 ? <p className="mt-8 w-full text-red-700 text-center py-3 bg-red-100 border-red-700 border rounded-md">{message}</p> : <p></p>
            }
            <p className="mt-8 w-full text-gray-400">Bạn đã có tài khoản <span className="text-blue-500 hover:text-blue-400 cursor-pointer" onClick={onClick}>Đăng nhập ngay</span></p>
            <button className="mt-8 bg-green-500 hover:bg-green-400 p-3 w-full text-white rounded-lg" type="submit">Đăng ký</button>
        </form>
    )
}

export default Signup;