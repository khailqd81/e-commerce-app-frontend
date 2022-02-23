import { useEffect, useState, useContext } from "react"
import ProductCard from "./ProductCard"
import TypeContext from "../store/TypeContext";
function ListProduct(props) {
    const [Products, setProducts] = useState([]);
    const [state, dispatch] = useContext(TypeContext);
    //const [type, setType] = useState("Điện thoại");
    useEffect(() => {
        let api = `${process.env.REACT_APP_BACKEND_API}/products`;
        console.log("Type: ",state.type);
        if (state.type !== "All") {
            api = api + `/type`;
        }
        console.log(api);
        fetch(api, {
            method: 'POST',
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                categoryName: state.type
            }),
          })
            .then(response => response.json())
            .then(data => {
                setProducts(data);
            })
    }, [state.type]);

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
                        <ProductCard key={index} name={product.product_name} image_url={product.image_url} price={product.price} />
                    )
                })
                :<p className="text-red-500 font-semibold py-4">Không có sản phẩm nào thuộc danh mục này</p>
            }
        </div>
    )
}

export default ListProduct;
