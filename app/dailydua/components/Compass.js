import React, { useState, useEffect } from "react";

// Kaaba Coordinates (fixed)
const KAABA_LAT = 21.4225;
const KAABA_LNG = 39.8262;

const Compass = () => {
  const [angle, setAngle] = useState(0);

  useEffect(() => {
    // Check if geolocation is available
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        const bearing = calculateBearing(latitude, longitude, KAABA_LAT, KAABA_LNG);
        setAngle(bearing);
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }, []);

  // Calculate bearing using Haversine formula
  const calculateBearing = (lat1, lon1, lat2, lon2) => {
    const rad = Math.PI / 180;
    lat1 = lat1 * rad;
    lon1 = lon1 * rad;
    lat2 = lat2 * rad;
    lon2 = lon2 * rad;

    const dLon = lon2 - lon1;
    const y = Math.sin(dLon) * Math.cos(lat2);
    const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);
    let bearing = Math.atan2(y, x);

    bearing = (bearing * 180) / Math.PI;
    bearing = (bearing + 360) % 360;  // Ensure the bearing is between 0 and 360 degrees
    return bearing;
  };

  return (
    <div className="text-center mt-8">
      <div className="relative w-44 h-44 rounded-full border-[6px] border-gray-800 bg-gradient-to-br from-gray-100 to-gray-300 shadow-2xl mx-auto">
        {/* Cardinal Directions */}
        <span className="absolute top-2 left-1/2 -translate-x-1/2 text-sm font-bold text-red-700">N</span>
        <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-sm font-bold text-gray-800">S</span>
        <span className="absolute left-2 top-1/2 -translate-y-1/2 text-sm font-bold text-gray-800">W</span>
        <span className="absolute right-2 top-1/2 -translate-y-1/2 text-sm font-bold text-gray-800">E</span>

        {/* Needle with Kaaba */}
        <div
          className="absolute w-1.5 h-20 bg-gradient-to-b from-red-600 to-red-400 rounded-full shadow-md origin-bottom left-1/2 top-6 transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateX(-50%) rotate(${angle}deg)`,
          }}
        >
          {/* Kaaba emoji at needle tip */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-xl">🕋</div>
        </div>

        {/* Center Pin */}
        <div className="absolute w-5 h-5 bg-black rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white z-10" />
      </div>

      {/* Angle display */}
      <p className="mt-5 text-xl font-semibold text-gray-800">
        Kibla Direction: <span className="text-blue-600">{angle.toFixed(2)}°</span>
      </p>
    </div>
  );
};

export default Compass;
