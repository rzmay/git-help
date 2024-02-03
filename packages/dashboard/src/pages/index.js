const HomePage = () => {
  return (
    <nav className="bg-blue-200 p-4 shadow-md">
    <div className="container mx-auto flex justify-between items-center">
      <a href="#" className="text-xl font-semibold text-blue-800">BrandName</a>
      <div className="flex space-x-4">
        <a href="#" className="text-blue-700 hover:text-blue-900">Home</a>
        <a href="#" className="text-blue-700 hover:text-blue-900">Features</a>
        <a href="#" className="text-blue-700 hover:text-blue-900">About</a>
        <a href="#" className="text-blue-700 hover:text-blue-900">Contact</a>
      </div>
    </div>
  </nav>
  );
};

export default HomePage;
