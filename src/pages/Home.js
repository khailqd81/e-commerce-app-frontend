import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import DashboardAdmin from "../components/DashboardAdmin";
//redux
import { useSelector } from 'react-redux'

function Home() {
    const account = useSelector(state => state.account);
    let rootClass = ""
    let checkIsAdmin = account?.isLogin && account.role === "admin"
    if (checkIsAdmin) {
        rootClass = "flex flex-wrap"
    }
    return (
        <div>
            <Header />
            <div className={rootClass}>
                {checkIsAdmin && (
                    <DashboardAdmin />
                )}
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}

export default Home;
