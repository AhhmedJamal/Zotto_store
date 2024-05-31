import Image from "/assets/notFound.svg";
const NotFoundPage = () => {
  return (
    <div className="w-[300px] h-[100vh] m-auto flex justify-center items-center flex-col">
      <img src={Image} alt="Page Not Found" />
      <span className=" text-dark-200 font-bold text-[20px]">
        Not Found Page !
      </span>
    </div>
  );
};

export default NotFoundPage;
