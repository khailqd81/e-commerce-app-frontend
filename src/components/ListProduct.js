import axios from "axios";
import { useEffect, useState } from "react"
import ProductCard from "./ProductCard"

function ListProduct(props) {
    const [Products, setProducts] = useState([]);

    useEffect(() => {
        const config = {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            headers: {
              'Content-Type': 'application/json'
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
          }
        let api = `${process.env.REACT_APP_BACKEND_API}/products`;
        fetch(api, {
            method: 'POST', // or 'PUT'
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                categoryName: "Điện thoại"
            }),
          })
            .then(response => response.json())
            .then(data => {
                setProducts(data);
            })
    }, []);

    return (
        <div className="flex flex-wrap max-w-screen-xl mx-auto my-[20px] ">
            {
                Products.map((product, index) => {
                    return (
                        <ProductCard key={index} name={product.product_name} image_url={product.image_url} price={product.price} />
                    )
                })
            }
        </div>
    )
}

export default ListProduct