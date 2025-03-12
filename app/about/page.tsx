"use client";
import { FaCheckCircle } from "react-icons/fa";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

const Page = () => {
  return (
    <div className="bg-darkGreen">
      <Navbar />
      <div className="w-full lg:h-screen h-f\ flex items-center justify-center mb-8">
  <video
    src="/video2.mp4"
    autoPlay
    loop
    muted
    playsInline
    className="w-full lg:h-full object-cover rounded-lg shadow-lg"
  />
</div>

      <div className="min-h-screen bg-darkGreen flex flex-col items-center justify-center p-6">
     

        <div className="max-w-4xl bg-white/80 backdrop-blur-md shadow-xl rounded-2xl p-10 text-center border border-gray-200">
          {/* Title */}
          <h1 className="text-4xl font-extrabold text-darkGreen mb-6 drop-shadow-md">
            About <span className="text-lightGreen">Prayer Tracker</span>
          </h1>
          <p className="text-lg text-gray-700 leading-relaxed">
            <strong>Prayer Tracker</strong> is a beautifully crafted platform designed to help you stay consistent with your daily prayers. 
            Easily track your prayers, monitor missed (Qaza) prayers, and stay spiritually aligned.
          </p>

          {/* Features Section */}
          <div className="mt-8 text-left space-y-4">
            <h2 className="text-2xl font-semibold text-darkGreen">✨ Key Features</h2>
            <div className="grid md:grid-cols-2 gap-6 mt-4">
              <FeatureItem text="Track daily and missed (Qaza) prayers" />
              <FeatureItem text="Set goals & reminders for consistency" />
              <FeatureItem text="Detailed insights on prayer habits" />
              <FeatureItem text="Minimalist and easy-to-use interface" />
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-10">
            <a
              href="/Praytracker"
              className="bg-darkGreen text-white px-6 py-3 rounded-full text-lg font-semibold shadow-lg hover:bg-lightGreen transition-all duration-300"
            >
              Start Tracking Now 🚀
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

// Define props type
interface FeatureItemProps {
  text: string;
}

// Feature Item Component
const FeatureItem: React.FC<FeatureItemProps> = ({ text }) => (
  <div className="flex items-center space-x-3 bg-white/60 backdrop-blur-md p-3 rounded-lg shadow-sm">
    <FaCheckCircle className="text-lightGreen text-xl" />
    <span className="text-gray-800 font-medium">{text}</span>
  </div>
);

export default Page;
