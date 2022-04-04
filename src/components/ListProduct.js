import axios from "axios";
import React, { useEffect, useState } from "react"
import { useLocation } from "react-router-dom";
import { BsFillArrowUpCircleFill } from "react-icons/bs"
// Redux
import { useSelector } from "react-redux";
//
import ProductCard from "./ProductCard"
import SlideShow from "./SlideShow";
import { urlFormat } from "../utils/urlFormat";

function ListProduct() {
    const [products, setProducts] = useState([]);
    const [showGoTo, setShowGoTo] = useState(false);
    const [cateUrl, setCateUrl] = useState("dien-thoai");
    const location = useLocation();
    let category = useSelector(state => state.category.value);
    // Lấy category theo localStorage
    if (location.pathname !== "/" && category !== localStorage.getItem("category")) {
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
    }, [category]);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 800) {
                setShowGoTo(true);
            } else {
                setShowGoTo(false);
            }
        }
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    }, [])

    let listClassName = `flex flex-wrap max-w-screen-xl mx-auto my-[20px]`;

    if (products.length === 0) {
        listClassName += " justify-center";
    }

    return (
        <div className="mt-4">
            <SlideShow />
            {
                products.length !== 0
                    ?
                    <ul className="flex flex-wrap max-w-screen-xl mx-auto my-[20px] px-2 overflow-x-auto no-scrollbar">
                        <li className="text-center py-2 px-1 md:px-6 border bg-gray-50 text-gray-600 rounded-lg mt-2 md:mt-0 mr-2">Sắp xếp</li>
                        <li
                            className="text-center py-2 px-1 md:px-6 border bg-gray-50 text-gray-600 rounded-lg cursor-pointer mt-2 md:mt-0 mr-2"
                            onClick={() => {
                                const newProducts = [...products];
                                newProducts.sort((a, b) => (a.product_name > b.product_name) ? 1 : -1)
                                setProducts(newProducts)
                            }}
                        >
                            Từ A tới Z
                        </li>
                        <li
                            className="text-center py-2 px-1 md:px-6 border bg-gray-50 text-gray-600 rounded-lg cursor-pointer mt-2 md:mt-0 mr-2"
                            onClick={() => {
                                const newProducts = [...products];
                                newProducts.sort((a, b) => (a.product_name > b.product_name) ? -1 : 1)
                                setProducts(newProducts)
                            }}
                        >
                            Từ Z tới A
                        </li>
                        <li
                            className="text-center py-2 px-1 md:px-6 border bg-gray-50 text-gray-600 rounded-lg cursor-pointer mt-2 md:mt-0 mr-2"
                            onClick={() => {
                                const newProducts = [...products];
                                newProducts.sort((a, b) => a.price - b.price)
                                setProducts(newProducts)
                            }}
                        >
                            Giá tăng dần
                        </li>
                        <li
                            className="text-center py-2 px-1 md:px-6 border bg-gray-50 text-gray-600 rounded-lg cursor-pointer mt-2 md:mt-0 mr-2"
                            onClick={() => {
                                const newProducts = [...products];
                                newProducts.sort((a, b) => b.price - a.price)
                                setProducts(newProducts)
                            }}
                        >
                            Giá giảm dần
                        </li>
                    </ul>
                    :
                    <div></div>
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

            {showGoTo &&
                <div
                    className="md:hidden fixed right-2 bottom-8"
                    onClick={() => {
                        window.scrollTo({
                            top: 0,
                            left: 0,
                            behavior: 'smooth'
                        });
                    }}>
                    <BsFillArrowUpCircleFill size={60} className="text-green-500" />
                </div>}
        </div>

    )
}

export default ListProduct;
