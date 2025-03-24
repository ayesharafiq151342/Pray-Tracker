"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/navbar";

interface Surah {
  number: number;
  englishName: string;
  name: string;
  numberOfAyahs: number;
}

interface Ayah {
  number: number;
  numberInSurah: number;
  text: string;
}

const SurahPage = () => {
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [filteredSurahs, setFilteredSurahs] = useState<Surah[]>([]);
  const [selectedSurah, setSelectedSurah] = useState<Surah | null>(null);
  const [ayahs, setAyahs] = useState<Ayah[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  // ✅ Fetch All Surahs
  useEffect(() => {
    fetch("https://api.alquran.cloud/v1/surah")
      .then((response) => response.json())
      .then((data) => {
        setSurahs(data.data);
        setFilteredSurahs(data.data);
      })
      .catch(() => setError("Failed to load Surahs"));
  }, []);

  // ✅ Filter Surahs based on search
  useEffect(() => {
    if (search.trim() === "") {
      setFilteredSurahs(surahs);
    } else {
      const lowerSearch = search.toLowerCase();
      setFilteredSurahs(
        surahs.filter(
          (surah) =>
            surah.englishName.toLowerCase().includes(lowerSearch) ||
            surah.name.includes(search) ||
            surah.number.toString().includes(search)
        )
      );
    }
  }, [search, surahs]);

  // ✅ Fetch Ayahs for selected Surah
  const fetchAyahs = (surah: Surah) => {
    setLoading(true);
    setError("");
    fetch(`https://api.alquran.cloud/v1/surah/${surah.number}`)
      .then((response) => response.json())
      .then((data) => {
        if (!data.data) throw new Error("Invalid response");
        setSelectedSurah(surah);
        setAyahs(data.data.ayahs);
      })
      .catch(() => setError("Failed to load Ayahs"))
      .finally(() => setLoading(false));
  };

  return (
    <>
      {/* ✅ Navbar Fixed at Top */}
      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar />
      </div>

      {/* ✅ Sidebar & Content Wrapper (Minus Navbar Height) */}
      <div className="flex pt-16 h-full bg-darkGreen">
        {/* ✅ Sidebar: Surah List */}
        <div className="w-72 bg-darkGreen text-white p-4 border-r border-gray-300 overflow-y-auto">
          <h2 className="text-xl font-bold mb-2">Surah List</h2>

          {/* ✅ Search Bar */}
          <input
            type="text"
            placeholder="Search Surah..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-2 mb-3 text-black rounded-lg"
          />

          <ul className="space-y-2">
            {filteredSurahs.map((surah) => (
              <li
                key={surah.number}
                className={`cursor-pointer p-2 rounded-lg transition duration-200 ${
                  selectedSurah?.number === surah.number
                    ? "bg-lightGreen text-white"
                    : "hover:bg-HoverGreen"
                }`}
                onClick={() => fetchAyahs(surah)}
              >
                <span className="font-semibold">{surah.englishName}</span> <br />
                <span className="text-sm text-gray-300">{surah.numberOfAyahs} Ayahs</span>
              </li>
            ))}
          </ul>

          {filteredSurahs.length === 0 && (
            <p className="text-gray-400 mt-2">No Surahs found</p>
          )}
        </div>

        {/* ✅ Main Content: Ayahs */}
        <div className="flex-1 p-6 overflow-y-auto text-white">
          {error && <p className="text-red-500">{error}</p>}

          {selectedSurah ? (
            <div className="bg-darkGreen p-6 rounded-lg">
              <h1 className="text-3xl font-bold">{selectedSurah.englishName} ({selectedSurah.name})</h1>
              <p className="bg-darkGreen">{selectedSurah.numberOfAyahs} Ayahs</p>

              {loading ? (
                <p className="mt-4 text-white animate-pulse">Loading Ayahs...</p>
              ) : (
                <div className="mt-4 bg-darkGreen p-4 rounded-lg space-y-4">
                  {/* ✅ Show Bismillah Image (Except Surah Taubah) */}
                  {selectedSurah.number !== 9 && (
                    <div className="flex justify-center mb-4">
                      {/* <img src="/bismillah.jpg" alt="Bismillah" className="w-96" /> */}
                    </div> 
                   )}

                  {ayahs.map((ayah) => (
                    <div
                      key={`${selectedSurah?.number}-${ayah.number}`}
                      className="flex justify-end items-center mb-2 border-b border-gray-500 pb-2"
                    >
                      <span className="text-white text-right font-arabic text-2xl">{ayah.text}</span>
                      <strong className="text-white ml-2">({ayah.numberInSurah})</strong>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <p className="text-center text-gray-300">Select a Surah to see its Ayahs.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default SurahPage;
