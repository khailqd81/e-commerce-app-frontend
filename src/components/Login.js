import { SiAzurefunctions } from "react-icons/si";
import { useState } from "react"
function Login() {
    const [inputs, setInputs] = useState(["", ""]);
    const handleInputsChange = (e, index) => {
        let newState = [...inputs];
        newState[index] = e.target.value;
        setInputs(newState);
    }
    return (
        <div className="flex justify-center bg-gray-100 h-screen">
            <form method="POST" className="my-auto bg-white shadow-2xl rounded-lg pt-10 pb-5 px-8">
                <div className="flex w-full justify-center font-semibold text-2xl">
                    Đăng nhập vào PaTiKa
                    <SiAzurefunctions size={40} className="ml-2 text-green-500" />
                </div>
                <div className="mt-8">
                    <label htmlFor="username" className="font-semibold">Tên đăng nhập</label>
                    <input
                        className="block border border-gray-200 hover:border-gray-300 focus:border-blue-400 mt-2 p-3 w-[40vw] outline-none"
                        id="username"
                        placeholder="Nhập tên đăng nhập"
                        value={inputs[0]}
                        onChange={(e) => handleInputsChange(e, 0)}
                    />
                </div>
                <div className="mt-8">
                    <label htmlFor="password" className="font-semibold">Mật khẩu</label>
                    <input
                        className="block border border-gray-200 hover:border-gray-300 focus:border-blue-400 mt-2 p-3 w-[40vw] outline-none"
                        id="password"
                        placeholder="Nhập mật khẩu"
                        value={inputs[1]}
                        onChange={(e) => handleInputsChange(e, 1)}
                    />
                </div>
                <button className="mt-8 bg-green-500 hover:bg-green-400 p-3 w-full text-white rounded-lg" type="submit">Đăng nhập</button>
            </form>
        </div>
    )
}

export default Login;