import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom";

import ProductCard from "./ProductCard"
import { useStore } from "../store";

function ListProduct() {
    const [products, setProducts] = useState([]);
    const [state,] = useStore();
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
                setProducts(data.sort((a, b) => (a.product_name > b.product_name) ? 1 : -1));
            })
    }, [category]);

    let listClassName = `flex flex-wrap max-w-screen-xl mx-auto my-[20px]`;
    if (products.length === 0) {
        listClassName += " justify-center";
    }
    return (
        <div>
            {
                products.length !== 0 ?
                    <ul className="flex max-w-screen-xl mx-auto my-[20px]">
                        <li className="py-2 px-6 border bg-gray-50 text-gray-600 rounded-lg mr-2">Sắp xếp</li>
                        <li
                            className="py-2 px-6 border bg-gray-50 text-gray-600 rounded-lg cursor-pointer mr-2"
                            onClick={() => {
                                const newProducts = [...products];
                                newProducts.sort((a, b) => (a.product_name > b.product_name) ? 1 : -1)
                                setProducts(newProducts)
                            }}
                        >
                            Từ A tới Z
                        </li>
                        <li
                            className="py-2 px-6 border bg-gray-50 text-gray-600 rounded-lg cursor-pointer mr-2"
                            onClick={() => {
                                const newProducts = [...products];
                                newProducts.sort((a, b) => (a.product_name > b.product_name) ? -1 : 1)
                                setProducts(newProducts)
                            }}
                        >
                            Từ Z tới A
                        </li>
                        <li
                            className="py-2 px-6 border bg-gray-50 text-gray-600 rounded-lg cursor-pointer mr-2"
                            onClick={() => {
                                const newProducts = [...products];
                                newProducts.sort((a, b) => a.price - b.price)
                                setProducts(newProducts)
                            }}
                        >
                            Giá tăng dần
                        </li>
                        <li
                            className="py-2 px-6 border bg-gray-50 text-gray-600 rounded-lg cursor-pointer mr-2"
                            onClick={() => {
                                const newProducts = [...products];
                                newProducts.sort((a, b) => b.price - a.price)
                                setProducts(newProducts)
                            }}
                        >
                            Giá giảm dần
                        </li>
                    </ul>
                    : <div></div>
            }


            <div className={listClassName}>
                {
                    products.length !== 0 ?
                        products.map((product) => {
                            return (
                                <ProductCard
                                    key={product.product_id}
                                    product={product}
                                />
                            )
                        })
                        : <p className="text-red-500 font-semibold py-4">Không có sản phẩm nào thuộc danh mục này</p>
                }
            </div>
        </div>

    )
}

export default ListProduct;
