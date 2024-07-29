import Link from "next/link";

const Banner = () => {
  return (
    <div className="relative flex flex-col items-center justify-center bg-gradient-to-r from-purple-800 to-indigo-900 p-6 shadow-lg">
      <div className="absolute inset-0 bg-blue-600 opacity-10"></div>
      <div className="relative z-10 max-w-4xl mx-auto p-6 bg-white/20 backdrop-blur-md rounded-md text-center">
        <h1 className="text-4xl font-bold mb-2">Welcome to the MTG Pack Simulator</h1>
        <p className="text-2xl mb-4">Discover the newest staples!</p>
        <div className="flex space-x-3 justify-center">
          <Link href="/sets"
							className="px-6 py-3 bg-white/70 text-black rounded-md hover:bg-indigo-600 hover:text-white transition duration-300 ease-in-out">
              Explore Sets

          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
