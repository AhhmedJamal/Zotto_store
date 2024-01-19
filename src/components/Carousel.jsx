import { Carousel } from "@material-tailwind/react";

const CarouselDefault = () => {
  return (
  
      <Carousel
        className=" mt-[6px] sm:h-fit h-[100px] "
        autoplay={true}
        loop={true}
        navigation={({ setActiveIndex, activeIndex, length }) => (
          <div className="absolute bottom-1 left-2/4  flex -translate-x-2/4 gap-2">
            {new Array(length).fill("").map((_, i) => (
              <span
                key={i}
                className={`block h-[2px] cursor-pointer rounded-2xl transition-all content-['']  ${
                  activeIndex === i ? "w-4 bg-primary" : "w-2 bg-gray-400"
                }`}
                onClick={() => setActiveIndex(i)}
              />
            ))}
          </div>
        )}
      >
        <img
          src="https://f.nooncdn.com/mpcms/EN0003/assets/be624cc1-e554-4feb-8e46-feba65ab9bba.png?format=avif"
          alt="image 1"
          className="h-full w-full "
        />
        <img
          src="https://f.nooncdn.com/mpcms/EN0003/assets/66d013e3-3502-4b49-bd1b-cbaae4eff1b4.png?format=avif"
          alt="image 2"
          className="h-full w-full "
        />
        <img
          src="https://f.nooncdn.com/mpcms/EN0003/assets/17498f7d-bd94-468c-acd4-4a67ee52fd6a.png?format=avif"
          alt="image 3"
          className="h-full w-full "
        />
        <img
          src="https://f.nooncdn.com/mpcms/EN0003/assets/47fecc11-490d-4039-a1ca-8b8962640ea4.png?format=avif"
          alt="image 3"
          className="h-full w-full "
        />
        <img
          src="https://f.nooncdn.com/mpcms/EN0003/assets/33ba9c58-f2c4-4a3e-8bc6-95e419acb9db.png?format=avif"
          alt="image 3"
          className="h-full w-full "
        />
      </Carousel>
   
  );
};

export default CarouselDefault;
