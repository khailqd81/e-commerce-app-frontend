import React, { useEffect, useState } from "react"
import { useLocation } from "react-router-dom";
import ProductCard from "./ProductCard"
import { useStore } from "../store";
import SlideShow from "./SlideShow";
import axios from "axios";
import { urlFormat } from "../utils/urlFormat";
function ListProduct() {
    const [products, setProducts] = useState([]);
    const [cateUrl, setCateUrl] = useState("dien-thoai");
    const [state,] = useStore();
    const location = useLocation();
    let category = state.type;

    if (location.pathname !== "/" && state.type !== localStorage.getItem("category")) {
        category = localStorage.getItem("category");
    }

    useEffect(() => {
        async function getAllProducts() {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_API}/category/${category}`);
            const data = response.data;
            setCateUrl(urlFormat(category));
            setProducts(data.sort((a, b) => (a.product_name > b.product_name) ? 1 : -1));
        }
        getAllProducts();
    }, [category, state.type]);

    let listClassName = `flex flex-wrap max-w-screen-xl mx-auto my-[20px]`;
    if (products.length === 0) {
        listClassName += " justify-center";
    }
    return (
        <div className="mt-4">
            <SlideShow />
            {
                products.length !== 0 ?
                    <ul className="flex max-w-screen-xl mx-auto my-[20px] overflow-x-auto no-scrollbar">
                        <li className="text-center py-2 px-1 md:px-6 border bg-gray-50 text-gray-600 rounded-lg mr-2">Sắp xếp</li>
                        <li
                            className="text-center py-2 px-1 md:px-6 border bg-gray-50 text-gray-600 rounded-lg cursor-pointer mr-2"
                            onClick={() => {
                                const newProducts = [...products];
                                newProducts.sort((a, b) => (a.product_name > b.product_name) ? 1 : -1)
                                setProducts(newProducts)
                            }}
                        >
                            Từ A tới Z
                        </li>
                        <li
                            className="text-center py-2 px-1 md:px-6 border bg-gray-50 text-gray-600 rounded-lg cursor-pointer mr-2"
                            onClick={() => {
                                const newProducts = [...products];
                                newProducts.sort((a, b) => (a.product_name > b.product_name) ? -1 : 1)
                                setProducts(newProducts)
                            }}
                        >
                            Từ Z tới A
                        </li>
                        <li
                            className="text-center py-2 px-1 md:px-6 border bg-gray-50 text-gray-600 rounded-lg cursor-pointer mr-2"
                            onClick={() => {
                                const newProducts = [...products];
                                newProducts.sort((a, b) => a.price - b.price)
                                setProducts(newProducts)
                            }}
                        >
                            Giá tăng dần
                        </li>
                        <li
                            className="text-center py-2 px-1 md:px-6 border bg-gray-50 text-gray-600 rounded-lg cursor-pointer mr-2"
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
                    products.length !== 0
                        ?
                        <React.Fragment>
                            {products.map((product) => {
                                return (
                                    <ProductCard
                                        key={product.product_id}
                                        product={product}
                                        cateUrl={cateUrl}
                                    />
                                )
                            })}
                        </React.Fragment>
                        :
                        <p className="text-red-500 font-semibold py-4">Không có sản phẩm nào thuộc danh mục này</p>
                }
            </div>
        </div>

    )
}

export default ListProduct;
