function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">
            Support CRM
          </h1>

          <p className="text-blue-100 text-sm mt-1">
            Customer Support Dashboard
          </p>
        </div>

        <div className="hidden md:block text-right">
          <p className="text-sm text-blue-100">
            Welcome
          </p>

          <p className="font-semibold">
            Support Agent
          </p>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;