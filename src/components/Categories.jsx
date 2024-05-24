import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const Categories = () => {
  const { pathname } = useLocation();
  const [path] = useState(["/", "/phones", "/home", "/electroics"]);
  const [categories] = useState([
    "Mix Products",
    "Phones",
    "Home Tools",
    "Electronics",
  ]);

  return (
    <div className="flex justify-between gap-4 h-[40px] px-2 border mt-[75px] shadow-sm  relative bg-white">
      <span className="absolute bottom-1 bg-primary h-[4px] w-[75px] left-[25%]"></span>
      {categories &&
        categories.map((item, index) => {
          return (
            <Link
              key={index}
              to={path[index]}
              className={`flex flex-col text-[3px] justify-center p-[5px] items-center hover:cursor-pointer ${
                pathname == `${path[index]}` && "text-primary"
              }`}
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
