import { Carousel } from "@material-tailwind/react";

const CarouselDefault = () => {
  return (
    <Carousel
      className=" mt-[5px] h-[120px] sm:h-fit"
      autoplay={true}
      loop={true}
      navigation={({ setActiveIndex, activeIndex, length }) => (
        <div className="absolute bottom-1 left-2/4  flex -translate-x-2/4 gap-2">
          {new Array(length).fill("").map((_, i) => (
            <span
              key={i}
              className={`block h-[2px] cursor-pointer rounded-2xl transition-all content-['']  ${
                activeIndex === i ? "w-4 bg-primary" : "w-2 bg-gray-100"
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
        className=" w-full h-full object-cover"
      />
      <img
        src="https://f.nooncdn.com/mpcms/EN0003/assets/faae9ee4-beaf-4abe-b465-b8f5c0ccf728.png?format=avif"
        alt="image 1"
        className=" w-full h-full object-cover"
      />
      <img
        src="https://f.nooncdn.com/mpcms/EN0003/assets/66d013e3-3502-4b49-bd1b-cbaae4eff1b4.png?format=avif"
        alt="image 2"
        className=" w-full h-full object-cover"
      />
      <img
        src="https://f.nooncdn.com/mpcms/EN0003/assets/17498f7d-bd94-468c-acd4-4a67ee52fd6a.png?format=avif"
        alt="image 3"
        className=" w-full h-full object-cover"
      />
      <img
        src="https://f.nooncdn.com/mpcms/EN0003/assets/8fdc9bbc-74ae-45f7-8fda-a9bee1c6f86a.gif?format=avif"
        alt="image 4"
        className=" w-full h-full object-cover"
      />
      <img
        src="https://f.nooncdn.com/mpcms/EN0003/assets/33ba9c58-f2c4-4a3e-8bc6-95e419acb9db.png?format=avif"
        alt="image 5"
        className=" w-full h-full object-cover"
      />
    </Carousel>
  );
};

export default CarouselDefault;
