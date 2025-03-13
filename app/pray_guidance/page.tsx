'use client';

import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

interface Post {
  _id: string;
  category: string;
  description: string;
  path?: string;  // ✅ Optional property
}

export default function SavedPost() {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchSavedPosts = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/users/guidance");
        console.log("📥 API Response:", response.data); // Debugging
        setPosts(response.data); // ✅ Set posts from API response
      } catch (error) {
        console.error("❌ Error fetching posts:", error);
      }
      setIsLoading(false);
    };

    fetchSavedPosts();
  }, []);

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (posts.length === 0) return <p className="text-center mt-10">❌ No posts found.</p>;
  const prayers = [
    { name: "Fajr", before: "2", fard: "2*", after: "", id: 1 },
    { name: "Dhuhr", before: "2 + 2", fard: "4*", after: "2 or (2 + 2)", id: 2 },
    { name: "Asr", before: "2", fard: "4*", after: "", id: 3 },
    { name: "Maghrib", before: "2", fard: "3*", after: "2", id: 4 },
    { name: "Isha", before: "2", fard: "4*", after: "2", id: 5 },
  ];
  return (
   <><div className="bg-darkGreen">
  <Navbar/> <section
   className="w-full lg:h-screen h-96 flex flex-col items-center justify-center bg-cover bg-center text-center px-4"
   style={{ backgroundImage: `linear-gradient(rgba(4, 50, 50, 0.75) , rgba(4, 50, 50, 0.75)), url('/pray.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
 >
   <h1 className="lg:text-3xl sm:text-4xl  mt-20  lg:mt-0 md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
    My Prayer 
   </h1>

   <h2 className="text-base sm:text-lg md:text-xl text-white max-w-2xl mb-6">
   قال رسول الله ﷺ
   </h2>
   <h2 className="text-base sm:text-lg md:text-xl text-white max-w-2xl mb-6">

   إِنَّ أَوَّلَ مَا يُحَاسَبُ بِهِ العَبْدُ يَوْمَ القِيَامَةِ الصَّلَاةُ، فَإِنْ صَلُحَتْ، صَلُحَ سَائِرُ عَمَلِهِ، وَإِنْ فَسَدَتْ، فَسَدَ سَائِرُ عَمَلِهِ

</h2>

<h2 className="text-base sm:text-lg md:text-xl text-white max-w-2xl mb-6">

Translation: The first thing a person will be held accountable for on the Day of Judgment is prayer. If it is correct, then the rest of his deeds will be correct. If it is corrupt, then the rest of his deeds will be corrupt.
</h2> </section>
<div className="flex flex-col md:flex-row items-start lg:mt-20 p-6 w-9/12 mx-auto">
  {/* Left Side - Content */}
  <div className="md:w-2/3 p-4">
    <h1 className="text-2xl font-bold text-Start lg:mb-6 text-white mb-4">
      The Compulsory (Fard) & Non-Compulsory Prayers (Sunnah)
    </h1>

    {/* Table */}
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border border-gray-300">
        <thead className="border-darkGreen bg-darkGreen text-white">
          <tr>
            <th className="p-3 border">Prayer</th>
            <th className="p-3 border">Before (Sunnah)</th>
            <th className="p-3 border">Compulsory (Fard)</th>
            <th className="p-3 border">After (Sunnah)</th>
          </tr>
        </thead>
        <tbody>
          {prayers.map((prayer) => (
            <tr key={prayer.id} className="text-center bg-gray-100">
              <td className="p-3 border">{prayer.name}</td>
              <td className="p-3 border">{prayer.before}</td>
              <td className="p-3 border font-semibold text-red-600">{prayer.fard}</td>
              <td className="p-3 border">{prayer.after}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* Hadith Section */}
    <div className="mt-6 p-4 bg-gray-100 border-l-4 border-darkGreen">
      <p className="text-lg italic">
        <strong>Umm Habeebah (رضي الله عنها)</strong>, the wife of the Prophet ﷺ said:
      </p>
      <p className="mt-2 text-gray-700">
        I heard the Messenger of Allah ﷺ say: <br />
        <span className="text-darkGreen font-semibold">
          There is no Muslim slave who prays twelve rakahs to Allah each
          day, voluntarily, apart from the obligatory prayers, but Allah will
          build for him a house in Paradise.
        </span>
      </p>
      <p className="mt-2 text-sm text-gray-600">📖 (Tirmidhi)</p>
    </div>

    {/* Prayer Tip Section */}
    <div className="mt-6 p-4 bg-HoverGreen text-white border-l-4 border-darkGreen">
      <h2 className="text-lg font-bold text-white">🌟 Prayer Tips for Staying Consistent</h2>
      <ul className="mt-2 text-white list-disc pl-5">
        <li><strong>Use a Prayer Tracker App 📱</strong> - Apps like <em>Muslim Pro, Athan, or My Prayer Times</em> help set reminders for each Salah.</li>
        <li><strong>Follow a Prayer Schedule 🗓️</strong> - Keep a printed or digital Salah timetable based on your local Masjid’s timings.</li>
        <li><strong>Pray in Congregation (Jama’ah) 🕌</strong> - Praying together multiplies rewards by 27 times! 📖 (Sahih Muslim, 650)</li>
        <li><strong>Avoid Distractions Before Salah 🚫</strong> - Try not to use social media or get too engaged in work just before prayer times.</li>
        <li><strong>Make Du’a for Consistency 🤲</strong> - Ask Allah to keep you steadfast in your prayers:<br/>
          <span className="italic text-white">“O Allah, help me remember You, thank You, and worship You in the best way.”</span>
          📖 (Abu Dawood, 1522)
        </li>
      </ul>
    </div>
  </div>

  {/* Right Side - Image */}
  <div className="md:w-1/3 ml-20 flex justify-center">
    <img 
      src="/prayer next step by step.jpg" 
      alt="Prayer Illustration" 
      className="w-full lg:h-[800] h-auto rounded-lg lg:mt-20 lg:mb-24 shadow-md"
    />
  </div>
</div>
<div className="lg:w-9/12 lg:m-auto mt-32 mx-auto p-6  min-h-screen">
  <h1 className="text-xl font-bold mb-4 text-Start text-white">📌 Saved Posts</h1>

  <div className="grid grid-cols-1 md:grid-cols-4 w-full m-auto gap-6">
    {posts.map((post, index) => (
      <div key={post._id || `post-${index}`} className="bg-white p-4 rounded-lg shadow-lg border border-gray-300">
        {/* Display Image */}
        <img 
          src={post.path ? `http://localhost:4000${post.path}` : '/placeholder.jpg'}  
          alt={post.category} 
          className='w-full h-64 object-cover mt-2 rounded-lg' 
        />
        
        {/* Post Details */}
        <h3 className="text-HoverGreen font-semibold text-lg mt-2">{post.category}</h3>
        <p className="text-gray-700 text-sm mt-1">{post.description}</p>
      </div>
    ))}
  </div>



</div>
<Footer/> </div>
</>
  );
}
