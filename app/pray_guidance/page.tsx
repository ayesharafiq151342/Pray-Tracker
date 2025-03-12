"use client";

import { useState, useEffect } from "react";
import axios from "axios";

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
   <> <section
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
<div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-center text-HoverGreen mb-4">
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
          "I heard the Messenger of Allah ﷺ say: <br />
          <span className="text-darkGreen font-semibold">
            'There is no Muslim slave who prays twelve rak'ahs to Allah each
            day, voluntarily, apart from the obligatory prayers, but Allah will
            build for him a house in Paradise.'
          </span>"
        </p>
        <p className="mt-2 text-sm text-gray-600">📖 (Tirmidhi)</p>
      </div>

      {/* Prayer Tip Section */}
      <div className="mt-6 p-4 bg-lightGreen border-l-4 border-darkGreen">
        <h2 className="text-lg font-bold text-darkGreen">Prayer Tip - Using Prayer Calendars</h2>
        <p className="mt-2 text-gray-700">
          It is advised that you refer to an Islamic prayer timetable published
          by one of the local Islamic centers in your city. You can also use
          recommended prayer apps to stay updated with correct prayer times for
          your location.
        </p>
      </div>
    </div>
   <div className="max-w-5xl mx-auto p-6 bg-gray-100 min-h-screen">
     <h1 className="text-xl font-bold mb-4">📌 Saved Posts</h1>

     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
       {posts.map((post, index) => (
         <div key={post._id || `post-${index}`} className="bg-white p-4 rounded-lg shadow">
           

           {/* ✅ Display Image */}
         <img 
 src={post.path ? `http://localhost:4000${post.path}` : '/placeholder.jpg'}  
 alt={post.category} 
 className='w-full h-60 object-cover mt-2 rounded' 
/>

           <h3 className="text-HoverGreen font-semibold">{post.category}</h3>
           {/* ✅ Display Video */}
           

           <p className="text-gray-700">{post.description}</p>
         </div>
       ))}
     </div>
   </div></>
  );
}
