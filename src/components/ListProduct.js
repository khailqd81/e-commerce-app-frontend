import { useEffect, useState, useContext } from "react"
import { useLocation } from "react-router-dom";

import ProductCard from "./ProductCard"
import TypeContext from "../store/TypeContext";

function ListProduct() {
    const [Products, setProducts] = useState([]);
    const [state, ] = useContext(TypeContext);
    const location = useLocation();
    let category = state.type;

    if (location.pathname !== "/" && state.type !== localStorage.getItem("category")) {
        category = localStorage.getItem("category");
    }    

    useEffect(() => {
        let api = `${process.env.REACT_APP_BACKEND_API}/category/${category}`;
        fetch(api)
            .then(response => response.json())
            .then(data => {
                setProducts(data);
            })
    }, [category]);

    let listClassName = `flex flex-wrap max-w-screen-xl mx-auto my-[20px]`;
    if (Products.length === 0) {
        listClassName += " justify-center";
    }
    return (
        <div className={listClassName}>
            {
                Products.length !== 0 ?
                    Products.map((product, index) => {
                        return (
                            <ProductCard
                                key={index}
                                product={product}
                                // name={product.product_name}
                                // image_url={product.image_url}
                                // price={product.price}
                                // type={state.type}
                            />
                        )
                    })
                    : <p className="text-red-500 font-semibold py-4">Không có sản phẩm nào thuộc danh mục này</p>
            }
        </div>
    )
}

export default ListProduct;
