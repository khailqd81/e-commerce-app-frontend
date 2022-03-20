import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import isLogin from "../utils/isLogin";
import AccountInfo from "./AccountInfo";

function UserInfo() {
    let navigate = useNavigate();
    const [accInfo, setAccInfo] = useState({});
    let param = useParams();
    useEffect(() => {
        async function getInfo() {
            const authorization = await isLogin();
            console.log(authorization)
            console.log(param.itemid)
            if (authorization === "NotLogin") {
                return navigate("/")
            }
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_API}/account/info`,{
                params: {
                    account_id: param.itemid
                },
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
    }, [navigate, param.itemid])
    return (
        <AccountInfo accInfo={accInfo}/>
    )
}

export default UserInfo;