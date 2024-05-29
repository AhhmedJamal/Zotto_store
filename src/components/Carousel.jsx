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

const imageArrayMobile = [
  {
    src: "https://i.pinimg.com/564x/f0/f9/e4/f0f9e45724771f16745ad3f6f640d3ce.jpg",
    alt: "image 1",
  },
  {
    src: "https://i.pinimg.com/564x/42/b6/7a/42b67aacb13100865a792a92c8123efd.jpg",
    alt: "image 2",
  },
  {
    src: "https://i.pinimg.com/564x/c6/4e/1b/c64e1b69ce92c0ccde06e5742134987a.jpg",
    alt: "image 3",
  },
  {
    src: "https://i.pinimg.com/564x/81/1a/f3/811af3e70144ef80e15d62bde4c4e6d8.jpg",
    alt: "image 4",
  },
  {
    src: "https://i.pinimg.com/564x/20/83/f2/2083f216fce13c4bd3746ebf103c647d.jpg",
    alt: "image 5",
  },
  {
    src: "https://i.pinimg.com/564x/f5/21/04/f521044695cb1387908f78628f2e44b9.jpg",
    alt: "image 6",
  },
  {
    src: "https://i.pinimg.com/564x/35/e3/9c/35e39c81408d7cb5c74ccb04c66d951d.jpg",
    alt: "image 7",
  },
];
const imageArrayDesktop = [
  {
    src: "https://f.nooncdn.com/mpcms/EN0003/assets/cbe2617c-7d2d-4f72-b054-702e50bdd0db.png?format=avif",
    alt: "image 1",
  },
  {
    src: "https://f.nooncdn.com/mpcms/EN0003/assets/26fd166d-f77f-4620-9224-1ef24189add2.png?format=avif",
    alt: "image 2",
  },
  {
    src: "https://f.nooncdn.com/mpcms/EN0003/assets/b21858ee-8135-49a0-9119-89f73a33eea4.png?format=avif",
    alt: "image 3",
  },
  {
    src: "https://f.nooncdn.com/mpcms/EN0003/assets/77d33bc4-c614-4cc9-bbd6-20cccbf59559.png?format=avif",
    alt: "image 4",
  },
  {
    src: "https://f.nooncdn.com/ads/banner-1440x1440/ar_dk_eg-hero-01-hp%20(1).1716470567.970489.png?format=avif",
    alt: "image 5",
  },
  {
    src: "https://f.nooncdn.com/mpcms/EN0003/assets/bacf7fd3-3bf0-460c-a819-5e6f279582bf.png?format=avif",
    alt: "image 6",
  },
];

const Carousel = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 769);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const imagesToShow = isMobile ? imageArrayMobile : imageArrayDesktop;

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
      className="py-3 px-7 h-[200px] md:h-[250px]  lg:h-fit "
    >
      {imagesToShow.map((image, index) => (
        <SwiperSlide key={index}>
          <img
            src={image.src}
            alt={image.alt}
            className="w-full h-full object-coverf lg:object-contain "
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Carousel;
