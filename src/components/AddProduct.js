function AddProduct() {
    return (
        <form
            className="flex flex-col items-center max-w-screen-md mx-auto my-8"
            encType="multipart/form-data"
        >
            <div className="flex items-center my-4">
                <label className="min-w-[200px] text-right mr-4">Thêm hình ảnh sản phẩm</label>
                <input
                    className="px-4 py-2 outline-none min-w-[500px]"
                    type="file"
                />
            </div>
            <div className="flex items-center my-4">
                <label className="min-w-[200px] text-right mr-4">Tên sản phẩm</label>
                <input
                    className="px-4 py-2 border focus:border-green-500 outline-none min-w-[500px]"
                    placeholder="Nhập tên sản phẩm"

                />
            </div>
            <div className="flex items-center my-4">
                <label className="min-w-[200px] text-right mr-4">Giá tiền</label>
                <input
                    className="px-4 py-2 border focus:border-green-500 outline-none min-w-[500px]"
                    placeholder="Nhập giá sản phẩm (VNĐ)"
                    type="number"
                />
            </div>
            <div className="flex items-center my-4">
                <label className="min-w-[200px] text-right mr-4">Mô tả</label>
                <textarea
                    className="px-4 py-2 border focus:border-green-500 outline-none min-w-[500px]"
                    placeholder="Nhập mô tả sản phẩm"
                ></textarea>
            </div>
            <div className="flex items-center my-4">
                <label className="min-w-[200px] text-right mr-4">Số lượng</label>
                <input
                    className="px-4 py-2 border focus:border-green-500 outline-none min-w-[500px]"
                    placeholder="Nhập số lượng sản phẩm"

                />
            </div>
            <button className="my-4 px-8 py-4 bg-green-500 hover:bg-green-400 text-white max-w-[200px] rounded ">Thêm sản phẩm</button>
        </form>
    )
}

export default AddProduct;