import { useEffect } from "react";
import ReactLoading from "react-loading";

const PageLoader = ({ title, type, color }) => {
  useEffect(() => {
    setTimeout(() => {
      window.location.href = "/";
    }, 2000);
  }, []);

  return (
    <div
      className="text-white w-full h-screen flex flex-col
      justify-center items-center space-y-4 bg-[#222222]"
    >
      <ReactLoading type="spinningBubbles" height={200} width={200} />
      <p className="text-2xl font-semibold">Loading</p>
    </div>
  );
};

export default PageLoader;
