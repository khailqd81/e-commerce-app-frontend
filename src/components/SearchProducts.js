import axios from "axios";
import { useLayoutEffect, useState } from "react"
import { useLocation } from "react-router-dom";

import ProductCard from "./ProductCard"

function SearchProducts() {
    const [products, setProducts] = useState([]);
    const location = useLocation();
    const search = (location.search).slice(6, location.search.length);
    console.log(search)
    useLayoutEffect(() => {
        async function getSearchProducts() {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_API}/products/search`, {
                params: {
                    productName: search
                }
            })
            if (response.data) {
                setProducts(response.data);
            }
            else {
                setProducts([]);
            }
        }
        getSearchProducts();
    }, [search])
    // let category = state.type;

    // if (location.pathname !== "/" && state.type !== localStorage.getItem("category")) {
    //     category = localStorage.getItem("category");
    // }    

    // useEffect(() => {
    //     let api = `${process.env.REACT_APP_BACKEND_API}/category/${category}`;
    //     fetch(api)
    //         .then(response => response.json())
    //         .then(data => {
    //             setProducts(data);
    //         })
    // }, [category]);

    let listClassName = `flex flex-wrap max-w-screen-xl mx-auto my-[20px]`;
    if (products.length === 0) {
        listClassName += " justify-center";
    }
    return (
        <div className="max-w-screen-xl mx-auto my-[20px]">
            {
                products.length !== 0 ?
                    <div className="py-4 text-left">
                        Tìm thấy <span className="font-bold">{products.length} </span>
                        sản phẩm với từ khóa <span className="font-bold">"{search}"</span>
                    </div>
                    : <div></div>
            }

            <div className={listClassName}>

                {
                    products.length !== 0
                        ?
                        products.map((product) => {
                            return (
                                <ProductCard
                                    key={product.product_id}
                                    product={product}
                                />
                            )
                        })
                        :
                        <p className="text-red-500 font-semibold py-4">
                            Không tìm thấy sản phẩm nào với từ khóa
                            <span>"{search}"</span>
                        </p>
                }
            </div>
        </div>

    )
}

export default SearchProducts;
