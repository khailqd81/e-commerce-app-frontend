import { useState } from "react";
import samsung from "../samsung-galaxy-s21-ultra-bac-600x600-1-200x200.jpg"
function ProductDetail(props) {
    const [amount, setAmount] = useState(1);
    const [active, setActive] = useState(true);
    var formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    })
    return (
        <div className="flex m-8 shadow-xl px-4 py-8 rounded">
            <div>
                <img src={samsung} className="w-[600px] border-r" />
            </div>
            <div className="flex flex-col pl-4">
                <p className="text-3xl">Xiaomi 11T 5G</p>
                <div className="flex text-gray-500">
                    <p className="mr-4">Số lượng: 20</p>
                    <p>Đã bán: 0</p>
                </div>
                <p className="my-4">Đặc điểm: Thiết kế vô cùng trẻ trung, màn hình AMOLED, bộ 3 camera sắc nét và viên pin lớn,
                    thỏa mãn mọi nhu cầu giải trí, làm việc và là niềm đam mê sáng tạo của bạn.</p>
                <p>Giá: <span className="text-red-500 text-4xl">{formatter.format(6490000)}</span></p>
                <div className="mt-6">
                    <p>Số lượng mua: </p>
                    <div className="flex mt-2">
                        <button
                            onClick={() => setAmount(amount - 1)}
                            className={amount === 1 ? "px-2 border text-2xl text-gray-300":"px-2 border text-2xl"}
                            disabled={amount === 1 ? true : false}
                        >-</button>
                        <p className="px-4 border text-xl font-light">{amount}</p>
                        <button 
                            onClick={() => setAmount(amount + 1)} 
                            className={amount >= 20 ? "px-2 border text-2xl text-gray-300":"px-2 border text-2xl"}
                            disabled={amount >= 20 ? true : false}
                        >+</button>
                    </div>
                </div>
                <button className="bg-green-600 hover:bg-green-500 py-4 px-6 text-white rounded-md mt-auto max-w-[200px]">Thêm vào giỏ hàng</button>
            </div>


        </div>
    )
}

export default ProductDetail;
