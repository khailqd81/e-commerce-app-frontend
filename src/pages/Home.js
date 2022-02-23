import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ListProduct from "../components/ListProduct";
function Home(props) {
    return (
        <div>
            <ListProduct categoryName={props.categoryName}/>
        </div>
    )
}

export default Home;
