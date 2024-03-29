import axios from "axios"
import { useLayoutEffect, useState } from "react"
import { Link } from "react-router-dom"
// import samsung from "../samsung-galaxy-s21-ultra-bac-600x600-1-200x200.jpg"
// Redux 
import { useDispatch, useSelector } from "react-redux"
import { setProduct } from "../store/features/product/productSlice"
import "../index.css"
// import { useStore } from "../store"
// import { actions } from "../store"
import moneyFormatter from "../utils/moneyFormat"
import { urlFormat } from "../utils/urlFormat"
function ProductCard({ product, cateUrl, handleDeleteProduct }) {
    const dispatch = useDispatch()
    const account = useSelector(state => state.account);
    const [urlName, setUrlName] = useState("/");
    useLayoutEffect(() => {
        async function getCategory() {
            if (cateUrl) {
                let newUrlName = "/" + cateUrl + "/" + urlFormat(product.product_name);
                setUrlName(newUrlName);
            } else {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_API}/category/id/${product.category_id}`);
                const category = response.data;
                let newUrlName;
                if (category.category_name) {
                    newUrlName = "/" + urlFormat(category.category_name) + "/" + urlFormat(product.product_name);
                }
                else {
                    newUrlName = "/dien-thoai" + urlFormat(product.product_name);
                }
                setUrlName(newUrlName);
            }

        }
        getCategory();
    }, [product.category_id, product.product_name, cateUrl])

    // let location = useLocation();
    // if (location.pathname === "/") {
    //     location.pathname = "/dien-thoai";
    // }


    return (
        <>
            {account.isLogin && account.role === "admin"
                ?
                <div className="flex flex-col basis-[100%] sm:basis-[50%] md:basis-[25%] lg:basis-[20%]">
                    <div className="flex self-start px-4 mb-2 mt-4 md:mt-0">
                        <Link
                            to="/update-product"
                            className="block text-md border text-white bg-green-500 p-2 rounded-lg mr-4"
                            onClick={() => dispatch(setProduct(product))}
                        >
                            Chỉnh sửa
                        </Link>
                        <div
                            className="block text-md border text-white bg-red-500 p-2 rounded-lg cursor-pointer hover:bg-red-400"
                            onClick={() => {
                                handleDeleteProduct(product)
                            }}
                        >
                            Xóa
                        </div>
                    </div>

                    <Link
                        to="/update-product"
                        className="p-1 text-md "
                        onClick={() => dispatch(setProduct(product))}
                    >
                        <div className="rounded px-4 pt-4 pb-6 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-transform bg-white" >
                            <img src={product.image_url} className="h-[200px] mx-auto mb-4" alt={product.product_name} />
                            <div>
                                <p className="font-bold my-2 text-center product-item-name">{product.product_name}</p>
                                <p className="font-bold text-red-500 text-center">
                                    {moneyFormatter.format(product.price)}
                                </p>
                            </div>
                        </div>
                    </Link>
                </div>

                :
                <Link
                    to={urlName}
                    className="basis-[100%] sm:basis-[50%] md:basis-[25%] lg:basis-[20%] p-1 text-md "
                    onClick={() => dispatch(setProduct(product))}
                >
                    <div className="rounded px-4 pt-4 pb-6 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-transform bg-white" >
                        <img src={product.image_url} className="h-[200px] mx-auto mb-4" alt={product.product_name} />
                        <div>
                            <p className="font-bold my-2 text-center product-item-name">{product.product_name}</p>
                            <p className="font-bold text-red-500 text-center">
                                {moneyFormatter.format(product.price)}
                            </p>
                        </div>
                    </div>
                </Link>
            }
        </>
    )
}

export default ProductCard;
