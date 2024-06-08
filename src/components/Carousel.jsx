import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  EffectCoverflow,
  Navigation,
  Pagination,
} from "swiper/modules";
import useGetData from "../hooks/getData";

const Carousel = () => {
  const [isMobile, setIsMobile] = useState(false);

  const { products } = useGetData("Carousel");
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 769);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const imagesToShow = isMobile
    ? products[0]?.images.imageMobile
    : products[0]?.images.imageDesktop;

  return (
    <>
      {products.length === 0 ? (
        <div className="w-[90%] h-[176px] md:h-[220px] bg-[#e0e0e0] m-auto flex animate-pulse my-3"></div>
      ) : (
        <Swiper
          spaceBetween={5}
          effect={"coverflow"}
          grabCursor={true}
          slidesPerView={1}
          slidesPerGroup={1}
          loop={true}
          speed={900}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2.5,
            scale: 0.9,
          }}
          modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
          navigation={{
            nextEl: "",
            prevEl: "",
          }}
          pagination={{ el: "", clickable: true }}
          className="py-3 px-7 md:px-11 h-[200px] md:h-[250px] lg:h-fit"
        >
          <>
            {imagesToShow?.map((image, index) => (
              <SwiperSlide key={index}>
                <img
                  loading="lazy"
                  src={image}
                  alt={`image Carousel ${index}`}
                  className="w-full h-full"
                />
              </SwiperSlide>
            ))}
          </>
        </Swiper>
      )}
    </>
  );
};

export default Carousel;
