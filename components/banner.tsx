import Link from "next/link";

const Banner = () => {
  return (
	<div className="relative flex items-center justify-center bg-gradient-to-r from-purple-800 to-indigo-900 p-4 shadow-lg shadow-black">
		<div className="absolute inset-0 bg-blue-600 opacity-40"></div>
		<div className="relative z-10 max-w-4xl mx-auto p-2 bg-white/30 backdrop-blur-sm rounded-md">
			<h1 className="text-2xl font-bold mb-2">
				Welcome to the MTG Pack Simulator
			</h1>
			<p className="text-center text-xl mb-4">Discover the newest staples!</p>
		</div>
		<div className = 'flex justify-center spce-x-3'>
			<Link className="px-6 py-3 z-20 rounded-md bg-white/60 text-black hover:bg-indigo-600 transition duration-300 ease-in-out"
                  href = {'/sets'}
            >
                Sets
            </Link>
		</div>
	</div>
  );
};

export default Banner;
