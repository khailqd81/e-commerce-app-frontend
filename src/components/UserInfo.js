import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import isLogin from "../utils/isLogin";
import AccountInfo from "./AccountInfo";

function UserInfo() {
    const [isLoading, setIsLoading] = useState(true);
    let navigate = useNavigate();
    const [accInfo, setAccInfo] = useState({});
    useEffect(() => {
        async function getInfo() {
            setIsLoading(true);
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
            setIsLoading(false);
        }
        getInfo();
    }, [navigate])

    if (isLoading) {
        return (
            <div className="my-4 h-full max-w-screen-sm px-2 md:px-0 mx-auto">
                <p className="h-[10vh] mb-4"><Skeleton height={"10vh"} /></p>
                <div className="h-[40vh]">
                    <Skeleton height={"10vh"} />
                    <Skeleton height={"10vh"} />
                    <Skeleton height={"10vh"} />
                </div>
            </div>
        )
    }

    return (
        <AccountInfo accInfo={accInfo}/>
    )
}

export default UserInfo;