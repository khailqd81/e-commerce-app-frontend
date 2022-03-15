import axios from "axios";
import { Outlet } from "react-router-dom";
import { useLayoutEffect } from "react";

import { useStore, actions } from "./store"
import isLogin from "./utils/isLogin";
function App() {
  const [state, dispatch] = useStore();
  useLayoutEffect(() => {
    async function checkIsLogin() {
      // const accessToken = localStorage.getItem("accessToken");

      // const authorization = "Bearer " + accessToken;
      // const checkToken = await axios.get(`${process.env.REACT_APP_BACKEND_API}/is-signin`, {
      //   headers: {
      //     Authorization: authorization
      //   }
      // })
      // if (checkToken.status !== 200) {
      //   const refreshToken = localStorage.getItem("refreshToken");
      //   const token = await axios.get(`${process.env.REACT_APP_BACKEND_API}/refresh-token`, {
      //     headers: {
      //       authorization: refreshToken
      //     }
      //   });
      //   if (token.status !== 200) {
      //     dispatch(actions.setLogin(false));
      //   }
      //   else {
      //     localStorage.setItem("accessToken", token.data.accessToken);
      //     dispatch(actions.setLogin(true));
      //   }
      // }
      // else {
      //   dispatch(actions.setLogin(true));
      // }
      const authorization = await isLogin();
      if (authorization.includes("Bearer")) {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_API}/account/id`, {
          headers: {
            authorization: authorization
          }
        });
        if (response.status === 200) {
          dispatch(actions.setRole(response.data.role));
          dispatch(actions.setLogin(true));
          console.log("Role: ", response.data.role)
        }
      }
      else {
        dispatch(actions.setRole(""));
        dispatch(actions.setLogin(false));
      }
    }
    checkIsLogin();
  }, [dispatch]);
  console.log("login state: ", state.isLogin);
  return (
    <div className="font-roboto">
      <Outlet />
    </div>
  )
}
export default App;
