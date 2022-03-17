import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import isLogin from "../utils/isLogin";

function ListAccount() {
    const [accounts, setAccounts] = useState([]);
    useEffect(() => {
        async function getAllAccount() {
            const authorization = await isLogin();
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_API}/account`, {
                headers: {
                    authorization
                }
            });
            console.log(response.data.users);
            if (response.data.users) {
                setAccounts(response.data.users);
            }
            else {
                setAccounts([]);
            }
        }
        getAllAccount()
    }, [])
    return (
        <div className="my-8 max-w-screen-md mx-auto">
            <table className="w-full">
                <thead>
                    <tr>
                        <th scope="col" className="py-4 px-8 ">STT</th>
                        <th scope="col" className="py-4 px-8 ">ID tài khoản</th>
                        <th scope="col" className="py-4 px-8 ">Tên đăng nhập</th>
                    </tr>
                </thead>
                <tbody className="">
                    {accounts.map((acc, index) => {
                        return (
                            <tr
                                key={acc.account_id}
                                className="border-b first:border-t text-center even:bg-gray-300 "
                            >
                                <th
                                    scope="row"
                                    className="py-4 px-8 "
                                >
                                    {index + 1}
                                </th>
                                <td className="py-4 px-8 "><Link to={`/users/${acc.account_id}`}>{acc.account_id}</Link></td>
                                <td className="py-4 px-8 "><Link to={`/users/${acc.account_id}`}>{acc.username}</Link></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default ListAccount;