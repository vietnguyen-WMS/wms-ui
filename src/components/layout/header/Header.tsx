const Header = () => {
  return (
    <>
      <div className="px-3 h-12 flex items-center justify-end bg-gray-800">
        <div className="flex space-x-3">
          <div className="w-8 h-8 rounded-full overflow-hidden">
            <img
              src="https://placehold.jp/60/f59b00/ffffff/150x150.png?text=V"
              alt="User"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
