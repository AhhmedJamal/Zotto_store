import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  EffectCoverflow,
  Navigation,
  Pagination,
} from "swiper/modules";

const Carousel = () => {
  return (
    <Swiper
      spaceBetween={5}
      effect={"coverflow"}
      grabCursor={true}
      loop={true}
      speed={900}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      slidesPerView={1}
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
      className="p-5 h-[200px] sm:h-fit "
    >
      <SwiperSlide>
        <img
          src="https://i.pinimg.com/564x/f0/f9/e4/f0f9e45724771f16745ad3f6f640d3ce.jpg"
          alt="image 1"
          className="w-full h-full object-cover "
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="https://i.pinimg.com/564x/42/b6/7a/42b67aacb13100865a792a92c8123efd.jpg"
          alt="image 2"
          className="w-full h-full object-cover "
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="https://i.pinimg.com/564x/c6/4e/1b/c64e1b69ce92c0ccde06e5742134987a.jpg"
          alt="image 3"
          className="w-full h-full object-cover "
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="https://i.pinimg.com/564x/81/1a/f3/811af3e70144ef80e15d62bde4c4e6d8.jpg"
          alt="image 6"
          className="w-full h-full object-cover "
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="https://i.pinimg.com/564x/20/83/f2/2083f216fce13c4bd3746ebf103c647d.jpg"
          alt="image 4"
          className="w-full h-full object-cover "
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="https://i.pinimg.com/564x/35/e3/9c/35e39c81408d7cb5c74ccb04c66d951d.jpg"
          alt="image 5"
          className="w-full h-full object-cover "
        />
      </SwiperSlide>
    </Swiper>
  );
};

export default Carousel;
