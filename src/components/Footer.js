import { GrFacebook } from "react-icons/gr"
import { FcGoogle } from "react-icons/fc"
function Footer() {
    return (
        <div className="min-h-48 bg-gradient-to-b from-green-500 to-green-200 px-16 py-10 text-center">
            <div className="font-semibold text-slate-200">
                Copyright © 2022 PhamTienKhai
            </div>

            <div className="mt-3">
                <p className="text-slate-200">Liên hệ</p>
                <div className="flex flex-col mx-auto">
                    <a href="https://www.facebook.com/profile.php?id=100008103409073" className="flex items-center justify-center my-3 text-sky-600">
                        <GrFacebook size={30} className="mr-4" color="blue" />
                        <p><span className="hidden md:inline-block">Facebook:</span> Phạm Tiến Khải</p>
                    </a>
                    <a href="mailto:khailqd81@gmail.com" className="flex items-center justify-center my-3 text-sky-600">
                        <FcGoogle size={30} className="mr-4" />
                        <p href="mailto:khailqd81@gmail.com"><span className="hidden md:inline-block">Google:</span> khailqd81@gmail.com</p>
                    </a>
                </div>

            </div>

        </div>
    )
}

export default Footer;