import InputAmount from "./InputAmount"
import samsung from "../samsung-galaxy-s21-ultra-bac-600x600-1-200x200.jpg"
import { useState } from "react"
function ProductCart() {
    const [amounts, setAmounts] = useState([1, 1]);
    const products = [
        {
            product_name: "Samsung A52",
            product_id: "1",
            price: "1000000",
            image_url: samsung,
            quantity: 25
        },
        {
            product_name: "Samsung S8",
            product_id: "2",
            price: "10000000",
            image_url: samsung,
            quantity: 15

        }
    ]

    var formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });

    const handleDecrease = (index) => {
        let newAmounts = [...amounts];
        newAmounts[index] = amounts[index] - 1;
        setAmounts(newAmounts);
    }
    const handleIncrease = (index) => {
        let newAmounts = [...amounts];
        newAmounts[index] = amounts[index] + 1;
        setAmounts(newAmounts);
    }

    const handleOnInputChange = (index, value) => {
        let newAmounts = [...amounts];
        newAmounts[index] = value;
        setAmounts(newAmounts);
    }

    const totalPayment = products.reduce((total, product, index) => {
        return total + parseFloat(product.price * amounts[index]);
    }, 0);

    return (
        <div className="max-w-screen-xl mx-auto mt-8 mb-16">
            <table className="w-full shadow-md mb-6">
                <thead className="h-[60px] border ">
                    <tr >
                        <th className="text-left pl-2">Sản phẩm</th>
                        <th>Đơn giá</th>
                        <th>Số lượng</th>
                        <th>Số tiền</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody className="border">
                    {products.map((product, index) => {
                        return (
                            <tr key={product.product_id} className="border h-[140px]">
                                <td>
                                    <div className="flex justify-start">
                                        <img src={product.image_url} alt={product.name} className="w-[80px]" />
                                        <span className="ml-8 self-center">{product.product_name}</span>
                                    </div>
                                </td>
                                <td className="text-center">{formatter.format(product.price)}</td>
                                <td className="text-center">
                                    <InputAmount
                                        styleContainer={"flex justify-center"}
                                        amount={amounts[index]}
                                        onIncrease={() => handleIncrease(index)}
                                        onDecrease={() => handleDecrease(index)}
                                        onChange={handleOnInputChange}
                                        quantity={product.quantity}
                                        index={index}
                                    />
                                </td>
                                <td className="text-right text-red-500 font-semibold pr-20">{formatter.format(product.price * amounts[index])}</td>
                                <td className="text-center">Xóa</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <div className="flex justify-end">
                <p className="text-lg self-center">Tổng thanh toán: <span className="text-red-500 font-semibold">{formatter.format(totalPayment)}</span></p>
                <button className="border bg-green-500 hover:bg-green-400 px-16 py-2 ml-4 rounded text-white">Mua hàng</button>
            </div>

        </div>
    )
}

export default ProductCart;
