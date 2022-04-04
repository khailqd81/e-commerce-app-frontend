import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import { ImCross } from "react-icons/im"
import { BiBlock } from "react-icons/bi"
import { FiKey } from "react-icons/fi"
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
            if (response.data.users) {
                setAccounts(response.data.users);
            }
            else {
                setAccounts([]);
            }
        }
        getAllAccount()
    }, [])

    const handleDeleteUser = async (accId) => {
        if (accId === 100) {
            return;
        }
        const authorization = await isLogin();
        const response = await axios.delete(`${process.env.REACT_APP_BACKEND_API}/account/block`, {
            headers: {
                authorization
            },
            data: {
                account_id: accId
            }
        })
        console.log(response.data)
        if (response.status === 200) {
            const newAccounts = accounts.filter(item => item.account_id !== accId)
            setAccounts(newAccounts);
        }
    }

    const handleBlockUser = async (accId, is_blocked) => {
        if (accId === 100) {
            return;
        }
        const authorization = await isLogin();
        const response = await axios.patch(`${process.env.REACT_APP_BACKEND_API}/account/block`, {
            account_id: accId,
            block: !is_blocked
        }, {
            headers: {
                authorization
            },
        })
        console.log("response in listAcc: ", response.data);
        if (response.status === 200) {
            const blockUserIndex = accounts.findIndex(item => item.account_id === accId);
            console.log("index: ", blockUserIndex);
            let newAccounts = [...accounts];
            console.log(newAccounts);
            newAccounts[blockUserIndex] = {
                ...response.data.user
            }
            setAccounts(newAccounts);
        }

    }

    return (
        <div className="my-8 max-w-screen-md mx-auto">
            <table className="w-full">
                <thead>
                    <tr>
                        <th scope="col" className="py-4 px-8 ">STT</th>
                        <th scope="col" className="py-4 px-8 ">ID tài khoản</th>
                        <th scope="col" className="py-4 px-8 ">Tên đăng nhập</th>
                        <th scope="col" className="py-4 px-8 ">Khóa tài khoản</th>
                        <th scope="col" className="py-4 px-8 ">Xóa tài khoản</th>
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
                                {acc.account_id !== 100 &&
                                    <td
                                        className="py-4 px-8 text-red-500 cursor-pointer"
                                        onClick={() => handleBlockUser(acc.account_id, acc.is_blocked)}
                                    >
                                        {acc.is_blocked
                                            ? <FiKey size={30} className="mx-auto text-green-500" /> : <BiBlock size={30} className="mx-auto" />}
                                    </td>}
                                {acc.account_id !== 100 &&
                                    <td
                                        className="py-4 px-8 text-red-500 cursor-pointer"
                                        onClick={() => handleDeleteUser(acc.account_id)}
                                    >
                                        <ImCross className="mx-auto" />
                                    </td>}

                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default ListAccount;
