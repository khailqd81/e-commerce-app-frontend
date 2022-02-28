import { Outlet } from "react-router-dom";
// import ListProduct from "../components/ListProduct";
function Home(props) {
    return (
        <div>
            <Outlet/>
            {/* <ListProduct categoryName={props.categoryName} /> */}
        </div>
    )
}

export default Home;
