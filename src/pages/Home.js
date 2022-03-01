import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
// import ListProduct from "../components/ListProduct";
function Home(props) {
    return (
        <div>
            <Header />
            <Outlet />
            <Footer />
            {/* <ListProduct categoryName={props.categoryName} /> */}
        </div>
    )
}

export default Home;
