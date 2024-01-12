import { useState } from "react";
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const Categories = () => {
  const [path] = useState(["/", "phones", "home", "electroics"]);
  const [categories] = useState([
    "Mix Products",
    "Phones",
    "Home Tools",
    "Electronics",
  ]);

  return (
    <div className="flex justify-between gap-4 overflow-y-scroll h-[40px]  px-2  border mt-[72px] sm:mt-[93px]  bg-white">
    
      {categories &&
        categories.map((item, index) => {
          return (
            <Link
              key={index}
              s
              to={path[index]}
              className="flex flex-col text-[3px] justify-center p-[5px]  items-center hover:cursor-pointer"
            >
              {/* <img src={icon[index]} width={20}  /> */}
              <span className="text-[12px] ">{item}</span>
            </Link>
          );
        })}
    </div>
  );
};

export default Categories;
