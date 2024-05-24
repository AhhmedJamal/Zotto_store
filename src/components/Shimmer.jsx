import { motion } from "framer-motion";

// eslint-disable-next-line react/prop-types
const ShimmerDetails = ({ is }) => {
  const shimmer = (
    <motion.div
      initial={{ opacity: 0.5, scaleX: 0, translateX: "-100%" }}
      animate={{ opacity: 1, scaleX: 1, translateX: "100%" }}
      transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
      style={{
        width: "100%",
        height: "100%",
        background: "linear-gradient(90deg, transparent, #e0e0e0, transparent)",
        position: "absolute",
      }}
    />
  );

  return (
    <>
      {is ? (
        // cart shimmer for details product
        <div
          className={`h-[60vh]  lg:w-[100%] flex flex-col lg:flex-row lg:gap-10 lg:items-end  justify-between w-full relative overflow-hidden rounded-[8px]`}
        >
          <div className="w-full relative mb-[16px] overflow-hidden rounded-[8px]">
            {shimmer}
            {/* Your card content goes here */}
            <div className="bg-[#f0f0f0] p[16px] z-[1] h-[200px] lg:h-[60vh]"></div>
          </div>
          {/*  */}
          <div className="h-[25vh] lg:h-[40vh] flex flex-col justify-between   lg:w-[40%]">
            <div className="w-full relative  overflow-hidden rounded-[8px]">
              {shimmer}
              {/* Your card content goes here */}
              <div className="bg-[#f0f0f0] p[16px] z-[1] h-[15px]"></div>
            </div>
            {/*  */}
            <div className="w-full relative  overflow-hidden rounded-[8px]">
              {shimmer}
              {/* Your card content goes here */}
              <div className="bg-[#f0f0f0] p[16px] z-[1] h-[15px]"></div>
            </div>
            {/*  */}
            <div className="w-full relative mb-[30px]  overflow-hidden rounded-[8px]">
              {shimmer}
              {/* Your card content goes here */}
              <div className="bg-[#f0f0f0] p[16px] z-[1] h-[15px]"></div>
            </div>
            {/*  */}
            <div className="w-full relative mb-[16px] overflow-hidden rounded-[8px]">
              {shimmer}
              {/* Your card content goes here */}
              <div className="bg-[#f0f0f0] p[16px] z-[1] h-[40px]"></div>
            </div>
          </div>
        </div>
      ) : (
        // cart shimmer for product
        <div
          className={` flex flex-col justify-between w-full relative overflow-hidden rounded-[8px]`}
        >
          <div className="w-full relative mb-[16px] overflow-hidden rounded-[8px]">
            {shimmer}
            {/* Your card content goes here */}
            <div className="bg-[#f0f0f0] p[16px] z-[1] h-[100px]"></div>
          </div>
          {/*  */}
          <div className="w-full relative mb-[16px] overflow-hidden rounded-[8px]">
            {shimmer}
            {/* Your card content goes here */}
            <div className="bg-[#f0f0f0] p[16px] z-[1] h-[10px]"></div>
          </div>
          {/*  */}
          <div className="w-full relative mb-[16px] overflow-hidden rounded-[8px]">
            {shimmer}
            {/* Your card content goes here */}
            <div className="bg-[#f0f0f0] p[16px] z-[1] h-[10px]"></div>
          </div>
          {/*  */}
        </div>
      )}
    </>
  );
};

export default ShimmerDetails;
