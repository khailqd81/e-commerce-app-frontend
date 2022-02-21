import samsung from "../samsung-galaxy-s21-ultra-bac-600x600-1-200x200.jpg"
function ProductCard(props) {
    return (
        <a href="#" className="basis-[100%] sm:basis-[25%] md:basis-[20%] p-1 text-md">
            <div className="rounded px-4 pt-4 pb-6 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-transform" >
                <img src={samsung} className="h-[200px] mx-auto mb-4" />
                <div>
                    <p className="font-bold my-2">Name: {props.name}</p>
                    <p className="font-bold text-red-500">Price: {props.price}</p>
                </div>
            </div>
        </a>

    )
}

export default ProductCard;
