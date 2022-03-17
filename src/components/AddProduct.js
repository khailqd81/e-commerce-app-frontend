import axios from "axios";
import { useEffect, useState } from "react"
import isLogin from "../utils/isLogin"
import add_image from "../add-image.png"
import { handleUpload } from "../utils/firebaseUpload"
function AddProduct() {
    const [inputs, setInputs] = useState({
        image: "",
        product_name: "",
        description: "",
        price: "",
        quantity: "",
        image_file: "",
        category_id: 1001,
    });
    const [categoryList, setCategoryList] = useState([]);

    const [messages, setMessages] = useState({
        image: "",
        product_name: "",
        description: "",
        price: "",
        quantity: "",
    });
    const [globalMessage, setGlobalMessage] = useState({
        success: true,
        message: ""
    });
    const [imageUrl, setImageUrl] = useState("");

    useEffect(() => {
        async function getCategoryList() {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_API}/category`);
            if (response) {
                console.log(response.data)
                setCategoryList(response.data);
            }
            else {
                setCategoryList([]);
            }
        }
        getCategoryList();
    }, [])
    const onInputChange = (e, keyName) => {
        if ((e.target.value).trim().length === 0) {
            setMessages(prev => ({
                ...prev,
                [keyName]: "Vui lòng không để trống trường này."
            }))
        } else {
            setMessages(prev => ({
                ...prev,
                [keyName]: ""
            }))
        }
        setInputs(prev => ({
            ...prev,
            [keyName]: e.target.value
        }))
    }

    const onInputNumberChange = (e, keyName) => {
        if ((e.target.value).trim().length === 0) {
            setMessages(prev => ({
                ...prev,
                [keyName]: "Vui lòng không để trống trường này."
            }))
        } else {
            setMessages(prev => ({
                ...prev,
                [keyName]: ""
            }))
        }
        if (parseFloat(e.target.value) >= 0) {
            setInputs(prev => ({
                ...prev,
                [keyName]: e.target.value
            }))
        } else {
            setInputs(prev => ({
                ...prev,
                [keyName]: ""
            }))
            setMessages(prev => ({
                ...prev,
                [keyName]: "Vui lòng không nhập số âm."
            }))
        }

    }
    const onInputBlur = (e, keyName) => {
        if ((e.target.value).trim().length === 0) {
            setMessages(prev => ({
                ...prev,
                [keyName]: "Vui lòng không để trống trường này."
            }))
        }
    }
    const onInputFocus = (keyName) => {
        setMessages(prev => ({
            ...prev,
            [keyName]: ""
        }))
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        let check = false;
        for (var property in inputs) {
            if (property.toString() === "category_id") {
                continue;
            }
            if (inputs[property].toString().trim().length === 0) {
                messages[property] = "Vui lòng không để trống trường này."
                check = true;
            }
        }
        if (check) {
            return;
        }
        const authorization = await isLogin();
        const imageUrl = await handleUpload(inputs.image_file);
        console.log("image: ", imageUrl)
        const data = JSON.stringify({
            product_name: inputs.product_name,
            description: inputs.description,
            price: inputs.price,
            quantity: inputs.quantity,
            category_id: inputs.category_id,
            image_url: imageUrl
        })
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_API}/products/add`, {
            data: data
        }, {
            headers: {
                authorization,
            }
        })
        if (response.status === 200) {
            setGlobalMessage({
                success: true,
                message: "Thêm sản phẩm thành công."
            });
            setInputs({
                image: "",
                product_name: "",
                description: "",
                price: "",
                quantity: "",
                image_file: "",
                category_id: 1001,
            })
            setImageUrl("")
        }
        else {
            setGlobalMessage({
                success: false,
                message: "Thêm sản phẩm thất bại."
            });
        }
        setInterval(() => {
            setGlobalMessage({
                success: true,
                message: ""
            })
        }, 4000)
    }
    return (
        <form
            className="flex flex-col items-center max-w-screen-md mx-auto my-8 border shadow-lg"
            encType="multipart/form-data"
            onSubmit={handleSubmit}
        >
            <div className="flex items-center my-4 pb-4 border-b w-full justify-center text-lg font-semibold">
                Thêm sản phẩm vào cửa hàng của bạn
            </div>
            <div className="flex flex-col items-center my-4">
                <label htmlFor="proName" className="cursor-pointer flex justify-center">
                    <img src={imageUrl || add_image} className={imageUrl ? "max-w-[30%] max-h-[30%]" : "max-w-full opacity-40"} alt="add" />
                </label>
                {imageUrl
                    && <div
                        className="border border-red-300 px-2 py-1 cursor-pointer mt-2"
                        onClick={() => {
                            setInputs(prev => ({ ...prev, image: "", image_file: "" }))
                            setImageUrl("")
                        }}
                    >
                        X
                    </div>
                }
                <div className="flex items-center mt-6">
                    <label className="min-w-[200px] text-right mr-4 cursor-pointer" htmlFor="proName">Thêm hình ảnh sản phẩm</label>
                    <input
                        id="proName"
                        className="px-4 py-2 outline-none min-w-[500px] cursor-pointer"
                        type="file"
                        value={inputs.image}
                        accept="image/*"
                        onChange={(e) => {
                            console.log(e.target.files[0]);
                            if (e.target.files[0]) {
                                setImageUrl(URL.createObjectURL(e.target.files[0]));
                                setInputs(prev => ({
                                    ...prev,
                                    image: e.target.value,
                                    image_file: e.target.files[0]
                                }))
                            } else {
                                setImageUrl("");
                                setInputs(prev => ({
                                    ...prev,
                                    image: "",
                                    image_file: ""
                                }))
                            }

                        }}
                        onFocus={() => {
                            onInputFocus("image")
                        }}
                    />
                </div>
                {messages.image && <p className="mt-2 pl-[218px] text-red-400 text-sm w-full">{messages.image}</p>}

            </div>
            <div className="flex flex-col my-4">
                <div className="flex items-center">
                    <label className="min-w-[200px] text-right mr-4">Tên sản phẩm</label>
                    <input
                        className={messages.product_name
                            ? "px-4 py-2 border border-red-400 focus:border-red-400 outline-none min-w-[500px]"
                            : "px-4 py-2 border focus:border-green-500 outline-none min-w-[500px]"}
                        placeholder="Nhập tên sản phẩm"
                        type="text"
                        value={inputs.product_name}
                        onChange={(e) => {
                            onInputChange(e, "product_name")
                        }}
                        onBlur={(e) => {
                            onInputBlur(e, "product_name")
                        }}
                        onFocus={() => {
                            onInputFocus("product_name")
                        }}
                    />
                </div>

                {messages.product_name && <p className="mt-2 pl-[218px] text-red-400 text-sm">{messages.product_name}</p>}
            </div>
            <div className="flex flex-col my-4">
                <div className="flex items-center">
                    <label className="min-w-[200px] text-right mr-4">Mô tả</label>
                    <textarea
                        className={messages.description
                            ? "px-4 py-2 border border-red-400 focus:border-red-400 outline-none min-w-[500px]"
                            : "px-4 py-2 border focus:border-green-500 outline-none min-w-[500px]"}
                        placeholder="Nhập mô tả sản phẩm"
                        value={inputs.description}
                        onChange={(e) => {
                            onInputChange(e, "description")
                        }}
                        onBlur={(e) => {
                            onInputBlur(e, "description")
                        }}
                        onFocus={() => {
                            onInputFocus("description")
                        }}
                    ></textarea>
                </div>

                {messages.description && <p className="mt-2 pl-[218px] text-red-400 text-sm">{messages.description}</p>}

            </div>
            <div className="flex flex-col my-4">
                <div className="flex items-center">
                    <label className="min-w-[200px] text-right mr-4">Loại</label>
                    <select
                        className="px-4 py-2 border focus:border-green-500 outline-none min-w-[500px]"
                        onChange={(e) => {
                            if (e.target.value) {
                                setInputs(prev => ({
                                    ...prev,
                                    category_id: e.target.value
                                }))
                            }

                        }}
                        value={inputs.category_id}
                    >
                        {categoryList.map((category) => (
                            <option
                                key={category.category_id}
                                value={category.category_id}
                            >
                                {category.category_name}
                            </option>
                        ))}
                    </select>
                </div>

            </div>
            <div className="flex flex-col my-4">
                <div className="flex items-center">
                    <label className="min-w-[200px] text-right mr-4">Giá tiền</label>
                    <input
                        className={messages.price
                            ? "px-4 py-2 border border-red-400 focus:border-red-400 outline-none min-w-[500px]"
                            : "px-4 py-2 border focus:border-green-500 outline-none min-w-[500px]"}
                        placeholder="Nhập giá sản phẩm (VNĐ)"
                        type="number"
                        value={inputs.price}
                        onChange={(e) => {
                            onInputNumberChange(e, "price")
                        }}
                        onBlur={(e) => {
                            onInputBlur(e, "price")
                        }}
                        onFocus={() => {
                            onInputFocus("price")
                        }}
                    />
                </div>
                {messages.price && <p className="mt-2 pl-[218px] text-red-400 text-sm">{messages.price}</p>}


            </div>
            <div className="flex flex-col my-4">
                <div className="flex items-center">
                    <label className="min-w-[200px] text-right mr-4">Số lượng</label>
                    <input
                        className={messages.quantity
                            ? "px-4 py-2 border border-red-400 focus:border-red-400 outline-none min-w-[500px]"
                            : "px-4 py-2 border focus:border-green-500 outline-none min-w-[500px]"}
                        placeholder="Nhập số lượng sản phẩm"
                        type="number"
                        value={inputs.quantity}
                        onChange={(e) => {
                            onInputNumberChange(e, "quantity")
                        }}
                        onBlur={(e) => {
                            onInputBlur(e, "quantity")
                        }}
                        onFocus={() => {
                            onInputFocus("quantity")
                        }}
                    />
                </div>
                {messages.quantity && <p className="mt-2 pl-[218px] text-red-400 text-sm">{messages.quantity}</p>}

            </div>
            <button
                className="my-4 px-8 py-4 bg-green-500 hover:bg-green-400 text-white max-w-[200px] rounded "
                type="submit"
            >
                Thêm sản phẩm
            </button>
            {globalMessage.message &&
                <div
                    className={globalMessage.success
                        ? "fixed z-20 bg-white border border-green-400 text-green-500 py-8 px-16 top-[50%] shadow-xl rounded"
                        : "fixed z-20 bg-white border border-red-400 text-red-500 py-8 px-16 top-[50%] shadow-xl rounded"}
                >{globalMessage.message}
                </div>}
        </form>
    )
}

export default AddProduct;