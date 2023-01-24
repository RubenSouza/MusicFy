import ReactLoading from "react-loading";

const Loader = ({ title, type, color }) => {
  return (
    <div
      className="text-white w-full h-screen flex flex-col 
      justify-center items-center space-y-4"
    >
      <ReactLoading type={type} height={200} width={200} />
      <p className="text-2xl font-semibold">{title}</p>
    </div>
  );
};

export default Loader;
