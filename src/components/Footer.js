import {GrFacebook} from "react-icons/gr"
import {FcGoogle} from "react-icons/fc"
function Footer() {
    return (
        <div className="min-h-48 bg-zinc-200 px-16 py-10 text-center">
            <div className="font-semibold">
                Copyright © 2022 PhamTienKhai
            </div>

            <div className="mt-3">
                <p>Liên hệ</p>
                <a href="#" className="flex items-center justify-center my-3 text-sky-600">
                    <p className="mr-4">Facebook: Phạm Tiến Khải</p>
                    <GrFacebook size={30} color="blue"/>
                </a>
                <a href="#" className="flex items-center justify-center my-3 text-sky-600">
                    <p className="mr-4">Google: khailqd81@gmail.com</p>
                    <FcGoogle  size={30}/>
                </a>
            </div>

        </div>
    )
}

export default Footer;