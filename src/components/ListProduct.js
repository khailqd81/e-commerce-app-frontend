import ProductCard from "./ProductCard"
const FakeProducts = [
    {
        name: "Samsung S8",
        price: "2000000"
    },
    {
        name: "Samsung A30",
        price: "20000000"
    },
    {
        name: "Oppo V3",
        price: "2000"
    },
    {
        name: "Xiaomi Bang 6",
        price: "4000"
    },
    {
        name: "Samsung S8",
        price: "7000"
    },
    {
        name: "Samsung S8",
        price: "1000000"
    },
    {
        name: "Samsung S8",
        price: "1000000"
    },
    {
        name: "Samsung S8",
        price: "1000000"
    },
]
function ListProduct() {
    return (
        <div className="flex flex-wrap max-w-screen-xl mx-auto my-[20px] ">
            {
                FakeProducts.map((product, index) => {
                    return (
                        <ProductCard key={index} name={product.name} price={product.price}/>
                    )
                })
            }
        </div>
    )
}

export default ListProduct