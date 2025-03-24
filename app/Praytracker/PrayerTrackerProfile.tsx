'use client';
import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import PrayerTimings from "../timing/page";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

// Dummy user id; in a real app, get this from auth context
const userId = "testUser123";

function PrayerTrackerProfile() {
  const [date, setDate] = useState(new Date());
  // Local state for prayer records per day.
  const [prayers, setPrayers] = useState<Record<string, Record<string, string>>>({});
  const [chartData, setChartData] = useState<
    { name: string; count: number; fill: string }[]
  >([]);

  const prayerTypes = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];

  // Fetch the daily prayer record from backend for a given date
  const fetchDailyRecord = async () => {
    try {
      console.log("Fetching daily record for:", date.toISOString());
      
      const response = await fetch(
        `http://localhost:4000/api/prayers?userId=${userId}&date=${date.toISOString()}`
      );
      
      const data = await response.json();
      console.log("Daily record response:", data);
      
      const dayKey = date.toDateString();
  
      if (data.success && data.record) {
        console.log("Updating prayers state:", data.record.prayers);
        setPrayers((prev) => ({
          ...prev,
          [dayKey]: data.record.prayers || {},
        }));
      } else {
        console.log("No record found for this date.");
        setPrayers((prev) => ({
          ...prev,
          [dayKey]: {},
        }));
      }
    } catch (error) {
      console.error("Error fetching daily record:", error);
      toast.error("Error fetching daily record.");
    }
  };
  

  // Update prayer record in backend
  const updatePrayerRecord = async (prayer: string, status: string) => {
    try {
      const response = await fetch("http://localhost:4000/api/prayers/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          date: date.toISOString(),
          prayer,
          status,
        }),
      });
      const data = await response.json();
      console.log("Update prayer response:", data);
      if (!data.success) {
        toast.error(data.message || "Failed to update prayer record.");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message || "Error updating prayer record.");
      } else {
        toast.error("Error updating prayer record.");
      }
    }
  };

  // Handle toggling a prayer status, update local state and then backend
 const handlePrayerToggle = async (prayer: string, status: string) => {
  const dayKey = date.toDateString();
  const newPrayers = {
    ...prayers,
    [dayKey]: {
      ...(prayers[dayKey] || {}),
      [prayer]: status,
    },
  };
  setPrayers(newPrayers);

  // ✅ Pehle local summary update karo (UI me delay na ho)
  setChartData((prev) => {
    return prev.map((entry) => {
      if (entry.name.toLowerCase() === status) {
        return { ...entry, count: entry.count + 1 };
      }
      return entry;
    });
  });

  // ✅ Backend update karo, phir latest data fetch karo
  await updatePrayerRecord(prayer, status);
  
};

  // Reset progress: call backend to delete all records for the user
  const resetProgress = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/prayers/reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });
      const data = await response.json();
      console.log("Reset progress response:", data);
      if (data.success) {
        setPrayers({});
        toast.info("Progress reset successfully!");
        fetchSummary();
      } else {
        toast.error(data.message || "Failed to reset progress.");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message || "Error resetting progress.");
      } else {
        toast.error("Error resetting progress.");
      }
    }
  };

  const fetchSummary = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/prayers/summary?userId=${userId}`);
      const data = await response.json();
      console.log("Summary response:", data);
  
      if (data.success && data.summary) {
        setChartData([]); // Force re-render before setting new data
        setTimeout(() => { // Small delay to ensure UI update
          setChartData([
            { name: "Completed", count: data.summary.completed, fill: "#22c55e" },
            { name: "Missed", count: data.summary.missed, fill: "#ef4444" },
            { name: "Qaza", count: data.summary.qaza, fill: "#eab308" },
          ]);
        }, 100);
      } else {
        toast.error(data.message || "Failed to fetch summary.");
      }
    } catch (error) {
      console.error("Error in fetchSummary:", error);
      toast.error("Error fetching summary.");
    }
  };
  
  // Fetch summary on component mount
  useEffect(() => {
    fetchSummary();
  }, []);

  // Fetch daily record when the selected date changes
  useEffect(() => {
    fetchDailyRecord();
  }, [date]);

  return (
    <div className="p-4 md:p-6 bg-darkGreen w-full min-h-screen flex flex-col items-center">
      <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-6 shadow-md p-3 rounded-lg bg-darkGreen">
        Pray Tracker
      </h2>

      <div className="bg-darkGreen border border-white rounded-lg p-4 md:p-6 w-full lg:w-9/12 flex flex-col lg:flex-row gap-6 text-white shadow-xl">
        <div className="w-full lg:w-full">
          <img
            src="/namz.jpg"
            alt="Namaz"
            className="w-full h-64 md:h-96 object-cover rounded-lg"
          />
          
        </div>
       
        <div className="w-full lg:w-full">
          <p className="text-sm md:text-base text-justify text-white leading-relaxed">
          Prayer is the soul of religion. It is the breath of faith, the essence of devotion, and the gateway to divine wisdom. It is through prayer that the restless heart finds peace, the weary soul gains strength, and the lost find their way back to the light. Where there is no prayer, there can be no purification of the heart, no awakening of the conscience, and no true connection with the Divine.

A man who does not pray is like a lamp without oil—dim, directionless, and vulnerable to the darkness of despair. Prayer is not merely an obligation or a routine; it is the very heartbeat of the soul, a sacred dialogue between the created and the Creator. It is through prayer that the heart softens, the mind clears, and the spirit rises above the distractions of the world.

If prayer were removed from the world, faith would wither like a tree deprived of water. Religion would become an empty shell, devoid of its essence, for it is through prayer that man becomes truly aware of Allah  presence. Prayer teaches humility in times of success, patience in times of hardship, and gratitude in every moment.

In prayer, the burdens of the world become lighter, and the heart finds solace in the remembrance of its Lord. It is in the stillness of prayer that man hears the whispers of divine guidance, experiences the warmth of mercy, and discovers the boundless love of the Creator.

Prayer is not only an act of worship   </p>
        </div>
      </div>
      <div className="bg-darkGreen border border-white rounded-lg p-4 md:p-6 w-full lg:w-9/12 flex flex-col lg:flex-row gap-6  shadow-xl">

      <PrayerTimings/>

 
        
      </div>
  
      {/* Daily Tracker */}
      <div className="p-4 md:p-6 mt-6 bg-darkGreen border border-white rounded-lg w-full lg:w-9/12 flex flex-col gap-6">
        <h3 className="text-lg md:text-xl font-semibold text-white">
          Daily Prayer Tracker - {date.toDateString()}
        </h3>

        {/* Calendar & Prayer List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="flex justify-center">
          
            <Calendar
              onChange={(value) => setDate(value as Date)}
              value={date}
              className="w-full max-w-xs md:max-w-sm p-3 rounded-lg shadow-md"
            />
          </div>

          <div className="space-y-3">
            {prayerTypes.map((prayer) => (
              <div
                key={prayer}
                className="flex justify-between items-center p-3 md:p-4 bg-gray-50 rounded-lg shadow-sm"
              >
                <span className="text-gray-700 font-medium">{prayer}</span>
                <div className="space-x-1">
                  <button
                    className={`px-3 py-2 rounded-lg text-white ${
                      prayers[date.toDateString()]?.[prayer] === "completed"
                        ? "bg-green-600"
                        : "bg-gray-400 hover:bg-green-500"
                    }`}
                    onClick={() => handlePrayerToggle(prayer, "completed")}
                  >
                    ✅
                  </button>
                  <button
                    className={`px-3 py-2 rounded-lg text-white ${
                      prayers[date.toDateString()]?.[prayer] === "missed"
                        ? "bg-red-600"
                        : "bg-gray-400 hover:bg-red-500"
                    }`}
                    onClick={() => handlePrayerToggle(prayer, "missed")}
                  >
                    ❌
                  </button>
                  <button
                    className={`px-3 py-2 rounded-lg text-white ${
                      prayers[date.toDateString()]?.[prayer] === "qaza"
                        ? "bg-yellow-600"
                        : "bg-gray-400 hover:bg-yellow-500"
                    }`}
                    onClick={() => handlePrayerToggle(prayer, "qaza")}
                  >
                    ⏳
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Prayer Summary Chart */}
      <div className="p-4 md:p-6 mt-10 bg-darkGreen border border-white rounded-lg w-full lg:w-9/12 shadow-xl">
        <h3 className="text-lg md:text-xl font-bold text-white mb-4">
          📊 Prayer Summary (Overall)
        </h3>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData} barCategoryGap="20%">
            <XAxis dataKey="name" tick={{ fill: "#fff", fontSize: 12 }} />
            <YAxis tick={{ fill: "#fff", fontSize: 12 }} />
            <Tooltip cursor={{ fill: "#f3f4f6" }} />
            <Bar dataKey="count" radius={[8, 8, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>

        {/* Legend */}
        <div className="mt-4 flex flex-wrap justify-center gap-3">
          {chartData.map((item) => (
            <div key={item.name} className="flex items-center space-x-2">
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: item.fill }}
              ></div>
              <span className="text-sm md:text-base text-white font-medium">
                {item.name}: {item.count}
              </span>
            </div>
          ))}
        </div>

        {/* Reset Progress Button */}
        <div className="flex justify-center mt-6">
          <button
            onClick={resetProgress}
            className="px-5 py-3 bg-red-600 text-white font-bold rounded-lg shadow-lg hover:bg-red-700 transition-all"
          >
            Reset Progress
          </button>
        </div>
      </div>
    </div>
  );
}

export default PrayerTrackerProfile; 