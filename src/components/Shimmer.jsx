import { motion } from "framer-motion";

// eslint-disable-next-line react/prop-types
const Shimmer = ({ title }) => {
  const shimmer = (
    <motion.div
      initial={{ opacity: 0.5, scaleX: 0, translateX: "-100%" }}
      animate={{ opacity: 1, scaleX: 1, translateX: "100%" }}
      transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
      className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent"
    />
  );

  return (
    <>
      {title === "carousel" && (
        <div className="flex items-center w-full relative overflow-hidden rounded-lg gap-2 py-3">
          <div className=" relative w-6 overflow-hidden ">
            {shimmer}
            <div className="bg-[#e0e0e0] h-[120px]"></div>
          </div>
          <div className="w-full relative  overflow-hidden rounded-lg">
            {shimmer}
            <div className="bg-[#e0e0e0] w-full h-[177px]"></div>
          </div>
          <div className=" relative w-6  overflow-hidden ">
            {shimmer}
            <div className="bg-[#e0e0e0] h-[120px]"></div>
          </div>
        </div>
      )}
      {title === "offerProducts" && (
        <div className="grid gap-3 grid-cols-2 md:grid-cols-4 place-items-center">
          <div className="w-full relative  overflow-hidden rounded-lg">
            {shimmer}
            <div className="bg-[#d8d8d8] w-full h-[105px]"></div>
          </div>
          <div className="w-full relative  overflow-hidden rounded-lg">
            {shimmer}
            <div className="bg-[#d8d8d8] w-full h-[105px]"></div>
          </div>
          <div className="w-full relative  overflow-hidden rounded-lg">
            {shimmer}
            <div className="bg-[#d8d8d8] w-full h-[105px]"></div>
          </div>
          <div className="w-full relative  overflow-hidden rounded-lg">
            {shimmer}
            <div className="bg-[#d8d8d8] w-full h-[105px]"></div>
          </div>
        </div>
      )}
      {title === "product" && (
        <div className="flex flex-col w-full relative overflow-hidden rounded-lg">
          <div className="w-full relative mb-4 overflow-hidden rounded-lg">
            {shimmer}
            <div className="bg-[#e0e0e0] h-[300px] flex flex-col justify-end p-4">
              <div className="w-fit mb-4 overflow-hidden rounded-full absolute top-4 left-3">
                {shimmer}
                <div className="bg-gray-100 w-[35px] h-[35px]"></div>
              </div>
              <div>
                <div className="w-fit absolute mb-4 overflow-hidden rounded-full bottom-[75px] right-4">
                  {shimmer}
                  <div className="bg-gray-100 w-[35px] h-[35px]"></div>
                </div>
                <div className="w-fit absolute mb-4 overflow-hidden rounded-lg bottom-20 left-4">
                  {shimmer}
                  <div className="bg-gray-100 w-[45px] h-[25px]"></div>
                </div>
              </div>
              {[...Array(2)].map((_, index) => (
                <div
                  key={index}
                  className="w-full relative mb-4 overflow-hidden rounded-lg"
                >
                  {shimmer}
                  <div className="bg-gray-100 h-[13px]"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {title === "detailsProduct" && (
        <div className="h-[100%]  flex flex-col lg:flex-row lg:gap-10 lg:items-center  w-full relative overflow-hidden rounded-lg">
          <div className="lg:w-[60%] lg:p-8 relative mb-4 overflow-hidden rounded-lg flex flex-col lg:flex-row-reverse justify-center items-center gap-5 lg:gap-10 ">
            {shimmer}
            <div className="bg-[#e0e0e0] h-[260px] lg:h-[300px] w-full lg:w-[60%]"></div>
            <div className="flex lg:flex-col justify-center gap-6 my-2">
              {[...Array(3)].map((_, index) => (
                <div
                  key={index}
                  className="w-fit relative overflow-hidden rounded-lg "
                >
                  {shimmer}
                  <div className="bg-[#e0e0e0] h-[100px] w-[60px] "></div>
                </div>
              ))}
            </div>
          </div>

          <div className="h-[20vh] flex flex-col justify-between lg:w-[30%] gap-2">
            {[...Array(2)].map((_, index) => (
              <div
                key={index}
                className="w-full relative mb-4 overflow-hidden rounded-lg"
              >
                {shimmer}
                <div className="bg-[#e0e0e0] h-[15px]"></div>
              </div>
            ))}
            <div className="w-full relative mb-4 overflow-hidden rounded-lg">
              {shimmer}
              <div className="bg-[#e0e0e0] h-[40px]"></div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Shimmer;
