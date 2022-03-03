import { useLayoutEffect, useState } from "react";
import Login from "../components/Login";
import Signup from "../components/Signup";
function UserLogin(props) {
    const [isFormLogin, setIsFormLogin] = useState(true);
    useLayoutEffect(() => {
        if (props.signup) {
            setIsFormLogin(false)
        }
        if (props.signin) {
            setIsFormLogin(true)
        }
    }, [])

    const handleSwitch = () => {
        setIsFormLogin(!isFormLogin);
    }

    const classStyle = "flex justify-center bg-gray-100" + (isFormLogin ? " h-screen" : " ");
    return (
        <div className={classStyle}>
            {/* <Link to="/" 
                onClick={() => { dispatch(actions.setType("Điện thoại")) }} 
                className="flex items-center cursor-pointer">
                <SiAzurefunctions size={40} />
                <p className="text-xl font-bold ml-[8px]">PaTiKa</p>
            </Link> */}
            {isFormLogin ? <Login onClick={handleSwitch} /> : <Signup onClick={handleSwitch} />}
        </div>

    )
}

export default UserLogin;