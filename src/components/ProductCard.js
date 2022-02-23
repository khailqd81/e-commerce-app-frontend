import "../index.css"
import samsung from "../samsung-galaxy-s21-ultra-bac-600x600-1-200x200.jpg"
function ProductCard(props) {
    var formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    })

    return (
        <a href="#" className="basis-[100%] sm:basis-[25%] md:basis-[20%] p-1 text-md ">
            <div className="rounded px-4 pt-4 pb-6 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-transform bg-white" >
                <img src={props.image_url} className="h-[200px] mx-auto mb-4" />
                <div>
                    <p className="font-bold my-2 text-center product-item-name">{props.name}</p>
                    <p className="font-bold text-red-500 text-center">
                        {formatter.format(props.price)}
                    </p>
                </div>
            </div>
        </a>

    )
}

export default ProductCard;
