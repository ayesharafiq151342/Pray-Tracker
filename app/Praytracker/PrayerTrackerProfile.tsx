'use client'
import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

function PrayerTrackerProfile() {
    const [date, setDate] = useState(new Date());
    const [prayers, setPrayers] = useState<Record<string, Record<string, string>>>({});

    const prayerTypes = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];

    const handlePrayerToggle = (prayer: string, status: string) => {
        setPrayers((prev) => ({
            ...prev,
            [date.toDateString()]: {
                ...(prev[date.toDateString()] || {}),
                [prayer]: status,
            },
        }));
    };

    const resetProgress = () => {
        setPrayers({});
        toast.info("Progress reset successfully!");
    };

    const totalCounts = prayerTypes.reduce(
        (acc, prayer) => {
            Object.values(prayers).forEach((day) => {
                if (day[prayer] === "completed") acc.completed++;
                if (day[prayer] === "missed") acc.missed++;
                if (day[prayer] === "qaza") acc.qaza++;
            });
            return acc;
        },
        { completed: 0, missed: 0, qaza: 0 }
    );

    const chartData = [
        { name: "Completed", count: totalCounts.completed, fill: "#22c55e" },
        { name: "Missed", count: totalCounts.missed, fill: "#ef4444" },
        { name: "Qaza", count: totalCounts.qaza, fill: "#eab308" },
    ];

    return (
        <div className="p-4 md:p-6 bg-darkGreen w-full min-h-screen flex flex-col items-center">
            <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-6 shadow-md p-3 rounded-lg bg-darkGreen">
                Pray Tracker
            </h2>

            <div className="bg-darkGreen border border-white rounded-lg p-4 md:p-6 w-full lg:w-9/12 flex flex-col lg:flex-row gap-6 text-white shadow-xl">
                <div className="w-full lg:w-full">
                    <img src="/namz.jpg" alt="Namaz" className="w-full h-64 md:h-96 object-cover rounded-lg" />
                </div>
                <div className="w-full lg:w-full">
                    <p className="text-sm md:text-base text-justify text-white leading-relaxed">
                        Prayer is the soul of religion. Where there is no prayer , there can be no purification of the soul. The non-praying man is rightly considered to be a soulless man. Take prayer out of the world, and it is all over with religion because it is with prayer that man has the consciousness of God and selfless love for humanity and inner sense of piety.Prayer is, therefore, the first, the highest, and the most solemn phenomenon and manifestation of religion.

                        The way in which prayer is offered and the words which are recited in it explain the true nature of religion of which it is the expression of mans contact with the Lord.

                        Prayer in Islam gives in a nutshell the teachings of Islam. The very first thing which comes into prominence in Islamic prayer is that it is accompanied by bodily movements. It implies that Islam lifts not only the soul to the spiritual height, but also illuminates the body of man with the light of God-consciousness.It aims at purifying both body and soul, for it finds no cleavage between them.Islam does not regard body and soul as two different entities opposed to each other, or body as the prison of the soul from which It yearns to secure freedom in order to soar to heavenly heights. The soul is an organ of the body which exploits it for physiological purposes, or body is an instrument of the sou
                        (Iqbal, Reconstruction of Religious Thought in Islam, p 105), and thus both need spiritual enlightenment.
                    </p>   </div>

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
                                        className={`px-3 py-2 rounded-lg text-white ${prayers[date.toDateString()]?.[prayer] === 'completed' ? 'bg-green-600' : 'bg-gray-400 hover:bg-green-500'}`}
                                        onClick={() => handlePrayerToggle(prayer, "completed")}
                                    >
                                        ✅
                                    </button>
                                    <button
                                        className={`px-3 py-2 rounded-lg text-white ${prayers[date.toDateString()]?.[prayer] === 'missed' ? 'bg-red-600' : 'bg-gray-400 hover:bg-red-500'}`}
                                        onClick={() => handlePrayerToggle(prayer, "missed")}
                                    >
                                        ❌
                                    </button>
                                    <button
                                        className={`px-3 py-2 rounded-lg text-white ${prayers[date.toDateString()]?.[prayer] === 'qaza' ? 'bg-yellow-600' : 'bg-gray-400 hover:bg-yellow-500'}`}
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
                <h3 className="text-lg md:text-xl font-bold text-white mb-4">📊 Prayer Summary (Overall)</h3>

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
                            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.fill }}></div>
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
