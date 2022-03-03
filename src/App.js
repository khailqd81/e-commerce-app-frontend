import { Outlet } from "react-router-dom";
import { useLayoutEffect } from "react";
import axios from "axios";

import { useStore, actions } from "./store"
function App() {
  const [state, dispatch] = useStore();
  useLayoutEffect(() => {
    async function checkIsLogin() {
      const accessToken = localStorage.getItem("accessToken");
      const authorization = "Bearer " + accessToken;
      const checkToken = await axios.get(`${process.env.REACT_APP_BACKEND_API}/is-signin`, {
        headers: {
          Authorization: authorization
        }
      })
      if (checkToken.status !== 200) {
        const refreshToken = localStorage.getItem("refreshToken");
        const token = await axios.post(`${process.env.REACT_APP_BACKEND_API}/refresh-token`, {
          refreshToken
        })
        if (token.status !== 200) {
          dispatch(actions.setLogin(false));
        }
        else {
          localStorage.setItem("accessToken", token.data.accessToken);
          dispatch(actions.setLogin(true));
        }
      }
      else {
        dispatch(actions.setLogin(true));
      }
    }
    checkIsLogin();
  },[dispatch]);
  console.log("login state: ", state.isLogin);
  return (
    <div className="font-roboto">
      <Outlet />
    </div>
  )
}
export default App;
