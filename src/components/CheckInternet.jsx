import { useEffect, useState } from "react";
import { MdSignalWifiConnectedNoInternet2 } from "react-icons/md";
// eslint-disable-next-line react/prop-types
const CheckInternet = ({ children }) => {
  const [internet, setInternet] = useState(true);

  useEffect(() => {
    const handleOnline = () => setInternet(true);
    const handleOffline = () => setInternet(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [internet]);

  return (
    <>
      {internet ? (
        <>{children}</>
      ) : (
        <div className="flex flex-col justify-center items-center h-[90vh]">
          <MdSignalWifiConnectedNoInternet2
            size={100}
            className="text-primary"
          />
          <h1 className="font-bold text-center text-dark-200">
            You{"'"}re offline !!
          </h1>
        </div>
      )}
    </>
  );
};

export default CheckInternet;
