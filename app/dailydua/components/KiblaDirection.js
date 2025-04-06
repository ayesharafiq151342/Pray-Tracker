"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Compass from "./Compass"; // ✅ NO curly braces here


const KiblaDirection = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [kiblaDirection, setKiblaDirection] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (latitude === null || longitude === null) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
          },
          () => {
            setError("Unable to retrieve location.");
          }
        );
      } else {
        setError("Geolocation is not supported by this browser.");
      }
    }
  }, [latitude, longitude]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (latitude === null || longitude === null) {
      setError("Please allow location access.");
      return;
    }

    setLoading(true);
    setError(null);
    setKiblaDirection(null);

    try {
      const response = await axios.get(
        `https://api.aladhan.com/v1/qibla/${latitude}/${longitude}`
      );

      if (
        response?.data?.code === 200 &&
        response?.data?.data?.direction !== undefined
      ) {
        setKiblaDirection(response.data.data.direction);
      } else {
        setError("Invalid response from API.");
      }
    } catch (err) {
      setError("Failed to fetch Qibla direction."+ err) ;
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto mt-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-center">Qibla Direction</h2>

      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Latitude:
          </label>
          <input
            type="number"
            value={latitude || ""}
            readOnly
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Longitude:
          </label>
          <input
            type="number"
            value={longitude || ""}
            readOnly
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Get Qibla Direction
        </button>
      </form>

      {loading && <p className="text-center text-blue-500 mt-4">Loading...</p>}
      {error && <p className="text-center text-red-500 mt-4">{error}</p>}
      {!loading && kiblaDirection && (
  <Compass angle={kiblaDirection} />
      )}
    </div>
  );
};

export default KiblaDirection;
