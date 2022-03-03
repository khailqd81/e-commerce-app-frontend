import { Outlet } from "react-router-dom";
import { useEffect, useLayoutEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProductCart from "./components/ProductCart";

import axios from "axios";
import { useStore, actions } from "./store"
function App() {
  const [state, dispatch] = useStore();
  useLayoutEffect(() => {
    async function checkIsLogin() {
      const accessToken = localStorage.getItem("accessToken");
      const authorization = "Bearer " + accessToken;
      console.log("Author in app.js: ", authorization);
      const checkToken = await axios.get(`${process.env.REACT_APP_BACKEND_API}/is-signin`, {
        headers: {
          Authorization: authorization
        }
      })
      console.log("checktoken: ", checkToken);
      if (checkToken.status !== 200) {
        const refreshToken = localStorage.getItem("refreshToken");
        const token = await axios.post(`${process.env.REACT_APP_BACKEND_API}/account/refresh-token`, {
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

  }, []);
  console.log("login state: ", state.isLogin);
  return (
    <div className="font-roboto">
      <Outlet />
    </div>
  )
}
export default App;
