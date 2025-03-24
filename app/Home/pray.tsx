'use client'
import React from "react";
import Button from "../ui/butons";
import Link from "next/link";
import PrayerTimings from "../timing/page";
import { useRouter } from "next/navigation";
const PrayerTracker = () => {
  const router = useRouter();
  return (
    <><div className=" text-white">
    {/* Hero Section */}
    <section
      className="w-full lg:h-screen h-96 flex flex-col items-center justify-center bg-cover bg-center text-center px-4"
      style={{ backgroundImage: `linear-gradient(rgba(4, 50, 50, 0.75) , rgba(4, 50, 50, 0.75)), url('/bghome.png')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <h1 className="lg:text-3xl sm:text-4xl  mt-20  lg:mt-0 md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
        Welcome to Siratul Salah
      </h1>

      <p className="text-base sm:text-lg md:text-xl text-white max-w-2xl mb-6">
        Manage your prayers with us
      </p>
      <Link href='/' >
        <Button text="Show more" variant="primary" className="shadow-lg" />
      </Link>


    </section>
    
    {/* Info Section */}
    <section className="text-center lg:h-96 bg-darkGreen py-8 px-4">
      <p className="text-lg lg:mt-12 lg:text-4xl md:text-2xl max-w-2xl mx-auto">
        إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ
      </p>
      <p className="text-sm lg:text-lg md:text-xl mt-5  max-w-2xl mx-auto">
        Innamal a’malu binniyat (Indeed all actions are based on the intentions)

        At Prayer Tracker, we provide religious tools and a
        personalised stream of content & resources that
        engage, inspire, and support Muslims around
        the world. From prayer times and the
        prayer tracking - Prayer Tracker is your
        digital home for all things Muslim.
      </p>
    </section>

    {/* Stats Section */}
    <section className="flex flex-wrap justify-center bg-white gap-6 py-8">
  <div className="flex">
    <div>
      <p></p>
    </div>
  </div>
    </section>



    {/* Icons Section */}
    <section className="text-center bg-white py-5  lg:h-[550px] ">
      <h2 className="text-3xl font-bold mb-6 mb-20 text-black"> 
        Prayer Tracker provides accurate prayer times & Qibla direction to Muslims worldwide.
      </h2>
      <div className="flex flex-wrap justify-center gap-6">
        {[
          { title: "160+ million", subtitle: "downloads and growing!", image: "/Home-image(1).png" },
          { title: "9.7M users", subtitle: "on Day of Ramadan 2025", image: "/Home-image(2).png" },
          { title: "4.7 Stars", subtitle: "review on App Store", image: "/Home-image(3).png" },
          { title: "4.2 Stars", subtitle: "reviews on Play Store", image: "/Home-image(4).png" },
        ].map((item, index) => (
          <div
          key={index}
          className="w-80 h-80 bg-gradient-to-t from-green-900 to-transparent rounded-lg shadow-lg overflow-hidden  relative"
        >
          <div className="absolute w-full top-56 left-0  right-20 text-start ml-2 text-white z-10">
            <h3 className="text-sm font-bold  bg-opacity-50 inline-block px-2 py-1 rounded-md">{item.title}</h3>
            <p className="text-sm  w-full bg-opacity-50 inline-block px-2 py-1 rounded-md mt-1">{item.subtitle}</p>
          </div>
          <img src={item.image} alt={item.title} className="w-full h-80 object-cover" />
        </div>
        ))}
      </div>
    </section>
   


  </div>
  {/* //------------------------------------------------- */}
  <div className=" bg-darkGreen py-12 px-6">
  {/* Top Section with Image and Text */}
  <div className="lg:w-9/12 w-full  mx-auto  mb-12">
    <div className="flex flex-col md:flex-row items-center md:space-x-6">
      <img
        src="/image 6.png" // Replace with your actual image path
        alt="Prayer Tracker App"
        className="w-full md:w-96  "
      />
      <div className="text-left px-5    lg:px-20 ">
        <h2 className="text-2xl lg:w-[500px] md:text-3xl font-bold text-green-300">
        Get Verified Prayer Times, 
        Qibla & Adhan Notifications
        </h2>
        <p className="text-gray-200 lg:w-[600px] text-justify mt-2">
        Prayer Tracker is recognized as having the most accurate prayer times among Muslim lifestyle apps, being the first app to offer verified prayer times for major cities across the world.

Our platform ensures real-time accuracy by integrating with global prayer time databases and local Islamic centers.

You can set personalized Adhan notifications, so you never miss a prayer, no matter where you are.

Find nearby mosques effortlessly with our Mosque Finder, which provides directions and prayer schedules.

Keep track of your missed (Qaza) prayers and stay motivated to complete them with our built-in tracker.


 </p>
      </div>
    </div>
  </div>

  {/* Features Section */}
  <div className="grid grid-cols-2 w-9/12 m-auto text-white lg:h-[400px] items-center md:grid-cols-4 gap-6 text-center">
      <div
        className="cursor-pointer transition transform hover:scale-105"
        onClick={() => router.push("/daily-duas")}
      >
        <img src="/image 3.png" alt="Daily Duas" className="mx-auto w-54" />
        <p className="mt-7">Daily Duas</p>
      </div>

      <div
        className="cursor-pointer transition transform hover:scale-105"
        onClick={() => router.push("/Quran_Recitation")}
      >
        <img
          src="/QuranPak.jpg"
          alt="Quran Recitation"
          className="mx-auto w-44 rounded-full"
        />
        <p className="mt-7">Quran Recitation</p>
      </div>

      <div
        className="cursor-pointer transition transform hover:scale-105"
        onClick={() => router.push("/prayer-requests")}
      >
        <img src="/image 5.png" alt="Prayer Requests" className="mx-auto w-54" />
        <p className="mt-7">Prayer Requests</p>
      </div>

      <div
        className="cursor-pointer transition transform hover:scale-105"
        onClick={() => router.push("/hijri-calendar")}
      >
        <img src="/image.png" alt="Hijri Calendar" className="mx-auto w-54" />
        <p className="mt-7">Hijri Calendar</p>
      </div>
    </div>

  {/* Newsletter Subscription */}
  <div className="bg-transparent border border-white-5 p-6 rounded-lg mt-12 w-9/12 mx-auto shadow-lg">
    
{/* 
    <form className="space-y-4">
      <div>
        <label className="text-sm block text-gray-300">First Name: *</label>
        <input
          type="text"
          className="w-full p-2 border mt-4 border-white rounded-lg bg-white text-black"
          placeholder="Enter your name"
        />
      </div>
      <div>
        <label className="text-sm block text-gray-300">Email Address: *</label>
        <input
          type="email"
          className="w-full p-2 border mt-4  white rounded-lg bg-white text-black"
          placeholder="Enter your email"
        />
      </div>
      <div>
        <label className="text-sm block text-gray-300">Country: *</label>
        <input
          type="text"
          className="w-full p-2 border white mt-4 rounded-lg bg-white text-black"
          placeholder="Enter your country"
        />
      </div>
      <Button text="Show more" variant="primary" className="shadow-lg" />

    </form> */}
<PrayerTimings/>
   
  </div>
</div></>
  );
};

export default PrayerTracker;
