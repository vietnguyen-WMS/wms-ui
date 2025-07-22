const GlobalLoading = () => {
  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="w-10 h-10 border-[5px] border-blue-500 border-t-gray-300/50 rounded-full animate-spin"></div>
    </div>
  );
};

export default GlobalLoading;
