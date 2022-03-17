import { SiAzurefunctions } from "react-icons/si";
import { useState } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useStore, actions } from "../store"


function Login({ onClick }) {
    const [, dispatch] = useStore();
    const [message, setMessage] = useState("");
    const [inputs, setInputs] = useState(["", ""]);
    const navigate = useNavigate();

    const handleInputsChange = (e, index) => {
        let newState = [...inputs];
        newState[index] = e.target.value;
        setInputs(newState);
    }

    const handleSubmit =  (e) => {
        e.preventDefault();
        console.log("inputs: ", inputs);
        axios.post(`${process.env.REACT_APP_BACKEND_API}/account/signin`, {
            username: inputs[0],
            password: inputs[1]
        })
            .then( async (response) => {
                if (response.status === 200) {
                    const data = response.data;
                    localStorage.setItem("accessToken", data.accessToken);
                    localStorage.setItem("refreshToken", data.refreshToken);
                    const accountResponse = await axios.get(`${process.env.REACT_APP_BACKEND_API}/account/id`, {
                        headers: {
                          authorization:  "Bearer " + data.accessToken
                        }
                      });
                      if (accountResponse.status === 200) {
                        dispatch(actions.setRole(accountResponse.data.role));
                        dispatch(actions.setLogin(true));
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

    return (
        <form
            onSubmit={handleSubmit}
            className="my-auto bg-white shadow-2xl rounded-lg pt-10 pb-5 px-8"
        >
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
                    type="password"
                />
            </div>
            {
                message.length !== 0 ? <p className="mt-8 w-full text-red-700 text-center py-3 bg-red-100 border-red-700 border rounded-md">{message}</p> : <p></p>
            }
            <p className="mt-8 w-full text-gray-400">Bạn chưa có tài khoản <span className="text-blue-500 hover:text-blue-400 cursor-pointer" onClick={onClick}>Đăng ký ngay</span></p>
            <button className="mt-8 bg-green-500 hover:bg-green-400 p-3 w-full text-white rounded-lg" type="submit">Đăng nhập</button>
        </form>
    )
}

export default Login;