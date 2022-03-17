function AccountInfo({ accInfo }) {
    return (
        <div className="max-w-screen-sm flex justify-center mx-auto my-8">
            {
                Object.keys(accInfo).length !== 0
                    ?
                    (<div className="w-[60%] py-4 px-8 border rounded shadow-2xl">
                            <p className="py-4 border-b">Thông tin tài khoản</p>
                            <div className="flex mb-8 mt-8">
                                <p className="text-gray-400 text-right min-w-[110px]">Tên đăng nhập</p>
                                <p className="pl-4">{accInfo.username}</p>
                            </div>
                            <div className="flex mb-8">
                                <p className="text-gray-400 text-right min-w-[110px]">Tên</p>
                                <p className="pl-4">{accInfo.fullname}</p>
                            </div>
                            <div className="flex mb-8">
                                <p className="text-gray-400 text-right min-w-[110px]">Email</p>
                                <p className="pl-4">{accInfo.email}</p>
                            </div>
                        </div>)
                    :
                    (<div className="text-red">Không lấy được thông tin tài khoản</div>)
            }
        </div>
    )
}

export default AccountInfo;
