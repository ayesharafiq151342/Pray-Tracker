"use client";

import { useEffect, useState } from "react";
import { Sun, Moon, Bell } from "lucide-react";
const PrayerTimings = () => {
  const [timings, setTimings] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchPrayerTimings(latitude, longitude);
        },
        (err) => {
          console.error("Geolocation error:", err);
          setError("Unable to fetch location. Please allow location access.");
          setLoading(false);
        }
      );
    } else {
      setError("Geolocation is not supported by your browser.");
      setLoading(false);
    }
  }, []);

  const fetchPrayerTimings = (lat: number, lon: number) => {
    const apiUrl = `https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lon}&method=2`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setTimings(data.data.timings);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching prayer timings:", error);
        setError("Failed to load prayer timings.");
        setLoading(false);
      });
  };
  const prayerIcons: { [key: string]: JSX.Element } = {
    Fajr: <Moon className="w-5 h-5 text-blue-500" />, 
    Sunrise: <Sun className="w-5 h-5 text-yellow-500" />, 
    Dhuhr: <Sun className="w-5 h-5 text-orange-500" />, 
    Asr: <Sun className="w-5 h-5 text-red-500" />, 
    Maghrib: <Moon className="w-5 h-5 text-purple-500" />, 
    Isha: <Moon className="w-5 h-5 text-gray-500" />, 
  };
  return (
    <div className="w-full  bg-white shadow-lg rounded-xl p-6 flex flex-col md:flex-row gap-6">
    {/* Left Side - Image */}
    <div className="w-[700px] flex flex-col justify-center text-center md:text-left">
      <img src="/praytime.jpg" alt="Prayer Times" className="w-full h-96" />
    </div>

    {/* Right Side - Prayer Timings Table */}
    <div className="md:w-6/12 mx-auto">
      {loading ? (
        <p className="text-center text-gray-500">Fetching prayer times...</p>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        <table className="w-full text-sm text-left text-gray-600">
          <thead>
            <tr className="text-gray-800 font-semibold border-b">
              <th className="py-2">Salah</th>
              <th className="py-2">Start</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(timings).map(([key, value]) => (
              <tr key={key} className="border-b">
                <td className="py-2 px-4 flex items-center gap-2">
                  {prayerIcons[key] || <Bell className="w-5 h-5 text-gray-500" />}
                  <span className="font-medium">{key}</span>
                </td>
                <td className="py-2 px-4 text-right">{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  </div>
  );
};

export default PrayerTimings;
