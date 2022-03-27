import { useState } from "react";
import { MdOutlineArrowBackIos, MdOutlineArrowForwardIos } from "react-icons/md"
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
function SlideShow() {
    const [currentSlide, setCurrentSlide] = useState(1);
    const handleShowSlide = (slideIndex) => {
        if (slideIndex < 0) {
            setCurrentSlide(5);
        } else if (slideIndex > 5) {
            setCurrentSlide(0);
        } else {
            setCurrentSlide(slideIndex)
        }
    }
    return (
        // <div className="relative max-w-screen-xl flex justify-center mx-auto">
        //     <img
        //         src="/img/A53-800-200-800x200.png"
        //         alt="slide1"
        //         className={currentSlide === 1
        //             ? "slide-animate"
        //             : "hidden"
        //         }
        //     />
        //     <img
        //         src="/img/800-200-800x200-75.png"
        //         alt="slide2"
        //         className={currentSlide === 2
        //             ? "slide-animate"
        //             : "hidden"
        //         }
        //     />
        //     <img
        //         src="/img/800-200-800x200-41.png"
        //         alt="slide2"
        //         className={currentSlide === 3
        //             ? "slide-animate"
        //             : "hidden"
        //         }
        //     />
        //     <img
        //         src="/img/real9proseri-800-200-800x200.png"
        //         alt="slide2"
        //         className={currentSlide === 4
        //             ? "slide-animate"
        //             : "hidden"
        //         }
        //     />
        //     <img
        //         src="/img/reno7-800-200-800x200-1.png"
        //         alt="slide2"
        //         className={currentSlide === 5
        //             ? "slide-animate"
        //             : "hidden"
        //         }
        //     />
        //     <img
        //         src="/img/S22-800-200-800x200-5.png"
        //         alt="slide2"
        //         className={currentSlide === 6
        //             ? "slide-animate"
        //             : "hidden"
        //         }
        //     />
        //     <div
        //         className="absolute top-[50%] -translate-y-2/4 left-1.5 opacity-60 hover:opacity-100 bg-gray-200 py-3 rounded-md text-gray-400 shadow-xl"
        //         onClick={() => handleShowSlide(currentSlide - 1)}
        //     >
        //         <MdOutlineArrowBackIos size={40} />
        //     </div>
        //     <div
        //         className="absolute top-[50%] -translate-y-2/4 right-1.5 opacity-60 hover:opacity-100 bg-gray-200 py-3 rounded-md text-gray-400 shadow-xl"
        //         onClick={() => handleShowSlide(currentSlide + 1)}
        //     >
        //         <MdOutlineArrowForwardIos size={40} />
        //     </div>

        // </div>
        <div className="relative max-w-screen-xl flex justify-center mx-auto">
            <Carousel
                selectedItem={currentSlide}
                onChange={(index, item) => setCurrentSlide(index)}
                autoPlay={true}
                showStatus={false}
                showThumbs={false}
                showIndicators={true}
                showArrows={false}
                infiniteLoop={true}
                transitionTime={500}
                useKeyboardArrows
            >
                <img
                    src="/img/A53-800-200-800x200.png"
                    alt="slide1"
                />
                <img
                    src="/img/800-200-800x200-75.png"
                    alt="slide2"
                />
                <img
                    src="/img/800-200-800x200-41.png"
                    alt="slide2"
                />
                <img
                    src="/img/real9proseri-800-200-800x200.png"
                    alt="slide2"
                />
                <img
                    src="/img/reno7-800-200-800x200-1.png"
                    alt="slide2"
                />
                <img
                    src="/img/S22-800-200-800x200-5.png"
                    alt="slide2"
                />
            </Carousel>
            <div
                className="absolute top-[50%] -translate-y-2/4 left-1.5 opacity-60 hover:opacity-100 bg-gray-200 py-3 rounded-md text-gray-400 shadow-xl"
                onClick={() => handleShowSlide(currentSlide - 1)}
            >
                <MdOutlineArrowBackIos size={40} />
            </div>
            <div
                className="absolute top-[50%] -translate-y-2/4 right-1.5 opacity-60 hover:opacity-100 bg-gray-200 py-3 rounded-md text-gray-400 shadow-xl"
                onClick={() => handleShowSlide(currentSlide + 1)}
            >
                <MdOutlineArrowForwardIos size={40} />
            </div>
        </div>
    )
}

export default SlideShow;
