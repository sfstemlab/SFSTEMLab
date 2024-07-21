import Banner from "@/components/banner";
import Sidebar from "@/components/sidebar";

export default function Home() {
  return (
    <div className="flex bg-gradient-to-br from-black to-indigo-900/60 min-h-screen">
      <Sidebar />
      <div className="w-full text-white z-30">
        <Banner />
        <div className="container mx-auto px-6 py-12">
          <div className="rounded-lg shadow-lg flex flex-col items-center justify-center bg-white/10 backdrop-blur-md p-6">
            <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-6">
              Simulate Your Experience
            </h2>
            <iframe
              src="/sets"
              height="500"
              width="100%"
              className="rounded-lg shadow-md mb-6"
              scrolling="no"
            ></iframe>
          </div>
        </div>
        <div className="container mx-auto px-6 py-12">
          <div className="rounded-lg shadow-lg flex flex-col items-center justify-center bg-white/10 backdrop-blur-md p-6">
            <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-6">
              About Our Platform
            </h2>
            <p className="text-lg md:text-xl text-center mb-6">
              Discover amazing features and join our vibrant community.
            </p>
            {/* <Image
              src="/path/to/your/image.jpg" // Replace with your image path
              alt="Amazing Feature"
              className="rounded-lg shadow-lg"
              width={600}
              height={400}
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
