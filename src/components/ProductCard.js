import { Link, useLocation } from "react-router-dom"
import { useContext } from "react"
import { TypeContext } from "../store"
import "../index.css"
// import samsung from "../samsung-galaxy-s21-ultra-bac-600x600-1-200x200.jpg"
import {actions} from "../store"
import moneyFormatter from "../utils/moneyFormat"
function ProductCard({product}) {
    const [, dispatch] = useContext(TypeContext);

    let location = useLocation();
    if (location.pathname === "/") {
        location.pathname = "/dien-thoai";
    }

    // Hàm bỏ dấu tiếng việt tham khảo https://www.tunglt.com/2018/11/bo-dau-tieng-viet-javascript-es6/
    const removeAccents = (str) => {
        return str.normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/đ/g, 'd').replace(/Đ/g, 'D');
    }

    // Hàm chuyển sang dạng kebabCase tham khảo https://www.w3resource.com/javascript-exercises/fundamental/javascript-fundamental-exercise-123.php
    const toKebabCase = str =>
        str &&
        str
            .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
            .map(x => x.toLowerCase())
            .join('-');

    const urlName = toKebabCase(removeAccents(product.product_name));
    return (
        <Link 
            to={`${location.pathname}/${urlName}`} 
            className="basis-[100%] sm:basis-[25%] md:basis-[20%] p-1 text-md "
            onClick={() => dispatch(actions.setProduct(product))}
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
    )
}

export default ProductCard;
