import { useState } from "react"
import { SiAzurefunctions } from "react-icons/si";
function Signup() {
    const [inputs, setInputs] = useState(["", "", "", ""]);
    const handleInputsChange = (e, index) => {
        let newState = [...inputs];
        newState[index] = e.target.value;
        setInputs(newState);
    }
    return (
        <div className="flex justify-center bg-gray-100">
            <form method="POST" className="my-auto bg-white shadow-2xl rounded-lg pt-10 pb-5 px-8 my-10">
                <div className="flex w-full justify-center font-semibold text-2xl">
                    Tham gia PaTiKa
                    <SiAzurefunctions size={40} className="ml-2 text-green-500" />
                </div>
                <div className="mt-8">
                    <label htmlFor="accountname" className="font-semibold">Họ và tên</label>
                    <input
                        className="block border border-gray-200 hover:border-gray-300 focus:border-blue-400 mt-2 p-3 w-[40vw] outline-none"
                        id="accountname"
                        placeholder="Nhập họ và tên"
                        value={inputs[0]}
                        onChange={(e) => handleInputsChange(e, 0)}
                    />
                </div>
                <div className="mt-8">
                    <label htmlFor="email" className="font-semibold">Email</label>
                    <input
                        className="block border border-gray-200 hover:border-gray-300 focus:border-blue-400 mt-2 p-3 w-[40vw] outline-none"
                        id="email"
                        placeholder="Nhập email"
                        onChange={(e) => handleInputsChange(e, 1)}
                    />
                </div>
                <div className="mt-8">
                    <label htmlFor="password" className="font-semibold">Mật khẩu</label>
                    <input
                        className="block border border-gray-200 hover:border-gray-300 focus:border-blue-400 mt-2 p-3 w-[40vw] outline-none"
                        id="password"
                        placeholder="Nhập mật khẩu"
                        onChange={(e) => handleInputsChange(e, 2)}
                    />
                </div>
                <div className="mt-8">
                    <label htmlFor="repassword" className="font-semibold">Nhập lại mật khẩu</label>
                    <input
                        className="block border border-gray-200 hover:border-gray-300 focus:border-blue-400 mt-2 p-3 w-[40vw] outline-none"
                        id="repassword"
                        placeholder="Nhập lại mật khẩu"
                        onChange={(e) => handleInputsChange(e, 3)}
                    />
                </div>
                <button className="mt-8 bg-green-500 hover:bg-green-400 p-3 w-full text-white rounded-lg" type="submit">Đăng ký</button>
            </form>
        </div>
    )
}

export default Signup;