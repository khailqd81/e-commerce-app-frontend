import axios from "axios";

async function isLogin() {
    const accessToken = localStorage.getItem("accessToken");
    const authorization = "Bearer " + accessToken;

    const response = await axios.get(`${process.env.REACT_APP_BACKEND_API}/is-signin`, {
        headers: {
            authorization
        }
    });
    if (response.status !== 200) {
        const refreshToken = localStorage.getItem("refreshToken");
        const token = await axios.get(`${process.env.REACT_APP_BACKEND_API}/refresh-token`, {
            headers: {
                authorization:refreshToken
            }
        });
        if (token.status !== 200) {
            return "Bearer ";
        }
        localStorage.setItem("accessToken", token.data.accessToken);
        console.log("Bearer " + token.data.accessToken)
        return "Bearer " + token.data.accessToken;
    }
    return authorization;
}

export default isLogin;
