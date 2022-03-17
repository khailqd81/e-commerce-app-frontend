import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import isLogin from "../utils/isLogin";
import AccountInfo from "./AccountInfo";

function UserInfo() {
    let navigate = useNavigate();
    const [accInfo, setAccInfo] = useState({});
    useEffect(() => {
        async function getInfo() {
            const authorization = await isLogin();
            if (authorization === "NotLogin") {
                return navigate("/")
            }
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_API}/account/id`, {
                headers: {
                    authorization
                }
            })
            if (response.status === 200) {
                console.log(response.data)
                setAccInfo({ ...response.data });
            }
            else {
                console.log(response.data)
                setAccInfo({});
            }
        }
        getInfo();
    }, [navigate])
    return (
        <AccountInfo accInfo={accInfo}/>
    )
}

export default UserInfo;