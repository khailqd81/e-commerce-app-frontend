import ListProduct from "../components/ListProduct";
function Home(props) {
    return (
        <ListProduct categoryName={props.categoryName} />
    )
}

export default Home;
