import {RiFacebookFill, RiGoogleFill, RiGithubFill} from "react-icons/ri"
import "../index.css"
function Footer() {
    return (
        <div className="min-h-48 bg-green-900 px-16 py-10 text-center">
            
            <div className="mt-3">
                <div className="flex flex-col flex-wrap md:justify-between md:flex-row mx-auto">
                    <a href="https://www.facebook.com/profile.php?id=100008103409073" target="_blank" className="flex flex-wrap items-center justify-center my-3 text-white">
                        <div className="rounded-full p-3 border-2 border-green-300 footer-icon">
                            <RiFacebookFill size={40} className="text-green-300" />
                        </div>
                        <p className="ml-4 mt-2 md:mt-0 basis-full md:basis-auto">
                            Phạm Tiến Khải
                        </p>
                    </a>
                    <a href="mailto:khailqd81@gmail.com" target="_blank" className="flex flex-wrap items-center justify-center my-3 text-white">
                        <div className="rounded-full p-3 border-2 border-green-300 footer-icon">
                            <RiGoogleFill size={40} className="text-green-300" />
                        </div>
                        <p className="ml-4 mt-2 md:mt-0 basis-full md:basis-auto">
                            khailqd81@gmail.com
                        </p>
                    </a>
                    <a href="https://github.com/khailqd81" target="_blank" className="flex flex-wrap items-center justify-center my-3 text-white">
                        <div className="rounded-full p-3 border-2 border-green-300 footer-icon">
                            <RiGithubFill size={40} className="text-green-300" />
                        </div>
                        <p className="ml-4 mt-2 md:mt-0 basis-full md:basis-auto">
                            https://github.com/khailqd81
                        </p>
                    </a>
                </div>
            </div>
            <div className="font-light text-slate-200 mt-4">
                Copyright © 2022 PhamTienKhai, Faculty Information Technology of University of Science
            </div>
            {/* <div className="mt-3">
                <p className="text-slate-200">Liên hệ</p>
                <div className="flex flex-col mx-auto">
                    <a href="https://www.facebook.com/profile.php?id=100008103409073" className="flex items-center justify-center my-3 text-sky-600">
                        <GrFacebook size={30} className="mr-4" color="blue" />
                        <p>
                            <span className="hidden md:inline-block">Facebook:</span> Phạm Tiến Khải
                        </p>
                    </a>
                    <a href="mailto:khailqd81@gmail.com" className="flex items-center justify-center my-3 text-sky-600">
                        <FcGoogle size={30} className="mr-4" />
                        <p>
                            <span className="hidden md:inline-block">Google:</span> khailqd81@gmail.com
                        </p>
                    </a>
                </div>
            </div> */}
        </div>
    )
}

export default Footer;