import axios from "axios";
import { Outlet } from "react-router-dom";
import { useLayoutEffect } from "react";

// import { useStore, actions } from "./store"
import { useSelector, useDispatch } from "react-redux";
import { setLogin, setRole } from "./store/features/account/accountSlice";
import isLogin from "./utils/isLogin";
function App() {
  // const [state, dispatch] = useStore();
  const account = useSelector(state => state.account);
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    async function checkIsLogin() {
      const authorization = await isLogin();
      if (authorization.includes("Bearer")) {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_API}/account/id`, {
          headers: {
            authorization: authorization
          }
        });
        if (response.status === 200) {
          dispatch(setLogin(true));
          dispatch(setRole(response.data.role));
        }
      }
      else {
        dispatch(setLogin(false));
        dispatch(setRole(""));
      }
    }
    checkIsLogin();
  }, [dispatch]);
  console.log("login state: ", account.isLogin);
  console.log("role: ", account.role);
  return (
    <div className="font-roboto">
      <Outlet />
    </div>
  )
}
export default App;
