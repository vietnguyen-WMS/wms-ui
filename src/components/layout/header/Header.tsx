import viteLogo from "/vite.svg";

const Header = () => {
  return (
    <>
      <div className="px-3 h-16 flex items-center justify-between bg-gray-800 text-white">
        <div className="flex space-x-2 items-center">
          <img src={viteLogo} className="logo" alt="Vite logo" />
          <h1 className="text-xl">WMS</h1>
        </div>
      </div>
    </>
  );
};

export default Header;
