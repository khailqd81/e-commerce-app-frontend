import axios from "axios";

async function isLogin() {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
        return "NotLogin";
    }
    const authorization = "Bearer " + accessToken;

    const response = await axios.get(`${process.env.REACT_APP_BACKEND_API}/is-signin`, {
        headers: {
            authorization
        }
    });
    if (response.status !== 200) {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) {
            return "NotLogin";
        }
        const token = await axios.get(`${process.env.REACT_APP_BACKEND_API}/refresh-token`, {
            headers: {
                authorization:refreshToken
            }
        });
        if (token.status !== 200) {
            return "NotLogin";
        }
        localStorage.setItem("accessToken", token.data.accessToken);
        return "Bearer " + token.data.accessToken;
    }
    return authorization;
}

export default isLogin;
