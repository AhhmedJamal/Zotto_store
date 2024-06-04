// import { Carousel, IconButton } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GoStarFill } from "react-icons/go";
import { addToCart, getFromLocal } from "../store/cart/cartSlice";
import { useParams, useNavigate } from "react-router-dom";
import Shimmer from "../components/Shimmer";
import { IoMdArrowBack } from "react-icons/io";
import { db } from "../config/firebase";
import { collection, getDocs } from "firebase/firestore";
const DetailsProduct = () => {
  const [product, setProduct] = useState({});
  const [loader, setLoader] = useState(false);
  const user = useSelector((state) => state.user);
  const [active, setActive] = useState("");
  const router = useNavigate();
  const { id, name } = useParams();
  const dispatch = useDispatch();

  const handleCart = () => {
    dispatch(addToCart({ product, id_user: user.id }));
  };

  const getData = async () => {
    const CollectionsRef = collection(db, `/${name}`);
    const getData = await getDocs(CollectionsRef);
    const data = getData.docs.map((doc) => doc.data());
    setProduct(...data.filter((item) => item.uid == id));
    data.filter((item) => {
      item.uid == id && setActive(item.img);
    });
  };

  useEffect(() => {
    getData();
    setTimeout(() => {
      setLoader(true);
    }, 1000);
    const items =
      JSON.parse(localStorage.getItem(`shoppingCart_${user?.id}`)) || [];
    dispatch(getFromLocal(items));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, dispatch, user]);

  return (
    <div className="bg-white py-1 mt-2 relative">
      {loader ? (
        <div className="p-3 pt-0 mt-4 lg:flex justify-around items-center lg:mt-[10px] ">
          <IoMdArrowBack
            size={30}
            className=" m-1 p-[2px] self-start top-0 left-0  rounded-lg absolute z-20 md:hidden"
            onClick={() => {
              router(-1);
            }}
          />
          <div className="flex flex-col md:flex-row-reverse  justify-around items-center  gap-5 md:gap-12">
            <div>
              <img
                className="h-[250px] sm:h-[300px]  md:h-[420px]"
                src={active}
                alt=""
              />
            </div>
            <div className="flex md:flex-col justify-center gap-4">
              {product.images?.map((img, index) => (
                <div key={index}>
                  <img
                    onClick={() => setActive(img)}
                    src={img}
                    className="h-24 max-w-full cursor-pointer rounded-lg  border"
                    alt="gallery-image"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="lg:w-[300px]  p-4  pb-0 rounded ">
            <div className="flex justify-between ">
              <h1 className="font-bold text-[20px]">{product.brand}</h1>
              <div className="flex items-center ">
                <p className="text-[16px] pt-[2px] mr-2">{product.rating}</p>
                <GoStarFill className="text-orange-400" />
              </div>
            </div>
            <p className="text-gray-600 text-[12px] lg:text-[15px] leading-4 line-clamp-none my-2">
              {product.description}
            </p>
            <p className="text-[15px] lg:text-[20px] font-bold">
              <span className="font-normal text-[11px] text-gray-700">EPG</span>{" "}
              {product.price?.toLocaleString("en-US")}
              {product.priceDis && (
                <del className="text-gray-500 ml-2 text-[12px] lg:text-[15px] font-normal">
                  {" "}
                  ${product.priceDis?.toLocaleString("en-US")}
                </del>
              )}
            </p>

            <button
              onClick={handleCart}
              className="bg-primary w-full text-white rounded-md my-3 p-1 "
            >
              Add To Cart
            </button>
          </div>
        </div>
      ) : (
        <div className="p-5 lg:p-0">
          <Shimmer is={true} />
        </div>
      )}
    </div>
  );
};

export default DetailsProduct;

{
  /* <Carousel
            className="rounded-xl  w-full h-[250px] bg-reds-300 lg:w-[600px] mb-3"
            navigation={({ setActiveIndex, activeIndex, length }) => (
              <div className="absolute bottom-1 left-2/4  flex -translate-x-2/4 gap-2">
                {new Array(length).fill("").map((_, i) => (
                  <span
                    key={i}
                    className={`block h-[4px] cursor-pointer rounded-2xl transition-all content-[''] ${
                      activeIndex === i ? "w-4 bg-primary" : "w-4 bg-gray-400"
                    }`}
                    onClick={() => setActiveIndex(i)}
                  />
                ))}
              </div>
            )}
            prevArrow={({ handlePrev }) => (
              <IconButton
                variant="text"
                color="white"
                size="lg"
                onClick={handlePrev}
                className={`!absolute top-2/4 left-0 lg:!left-2 -translate-y-2/4  ${
                  product?.images?.length == 1 && "hidden"
                }`}
              >
                <svg
                  className="w-6 h-6 text-primary"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 8 14"
                >
                  <path
                    stroke="currentColor"
                    d="M7 1 1.3 6.326a.91.91 0 0 0 0 1.348L7 13"
                  />
                </svg>
              </IconButton>
            )}
            nextArrow={({ handleNext }) => (
              <IconButton
                variant="text"
                color="white"
                size="lg"
                onClick={handleNext}
                className={`!absolute top-2/4 !right-0 lg:!right-6 -translate-y-2/4 ${
                  product?.images?.length == 1 && "hidden"
                }`}
              >
                <svg
                  className="w-6 h-6 text-primary"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 8 14"
                >
                  <path
                    stroke="currentColor"
                    d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1"
                  />
                </svg>
              </IconButton>
            )}
            loop={true}
          >
            {product.images?.map((item, index) => {
              return (
                <img
                  key={index}
                  src={item}
                  alt="image 1"
                  className="h-full  m-auto"
                />
              );
            })}
          </Carousel> */
}
