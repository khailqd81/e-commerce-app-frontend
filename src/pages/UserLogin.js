import { useLayoutEffect, useState } from "react";
import Login from "../components/Login";
import Signup from "../components/Signup";
function UserLogin(props) {
    const [isFormLogin, setIsFormLogin] = useState(true);
    useLayoutEffect(() => {
        if (props.signup) {
            setIsFormLogin(false)
        }
    }, [props.signup])

    const handleSwitch = () => {
        setIsFormLogin(!isFormLogin);
    }

    const classStyle = "flex justify-center bg-gray-100" + (isFormLogin ? " h-screen" : " ");
    return (
        <div className={classStyle}>
            {isFormLogin ? <Login onClick={handleSwitch} /> : <Signup onClick={handleSwitch} />}
        </div>

    )
}

export default UserLogin;