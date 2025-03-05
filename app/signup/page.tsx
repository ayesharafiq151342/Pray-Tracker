"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter for navigation
import { Userschema } from "./validations/Loiginuserschema";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Signup() {
  const router = useRouter(); // Initialize the router
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [errors, setErrors] = useState({});

  const validateForm = async () => {
    try {
      await Userschema.validate(user, { abortEarly: false });
      setErrors({});
      return true;
    } catch (err) {
      const errorMessages = {};
      err.inner.forEach((e) => {
        errorMessages[e.path] = e.message;
      });
      setErrors(errorMessages);
      return false;
    }
  };

  const Onsignup = async () => {
    const isValid = await validateForm();
    if (!isValid) {
      toast.error("Form is invalid! Please correct the errors.");
      return;
    }

    toast.success("Signup successful! 🎉 Redirecting to login...");
    
    // Redirect user to the login page after a short delay
    setTimeout(() => {
      router.push("/login"); 
    }, 2000); // 2 seconds delay for a better UX
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center  bg-gray-100">
      {/* Left Side - Image */}
      <div className="hidden md:block">
        <img src="/pray.webp" alt="Signup" className="w-full h-screen object-cover" />
      </div>

      {/* Right Side - Signup Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Create Account</h2>

          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                placeholder="Enter your username"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                type="text"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                placeholder="Enter your email"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                placeholder="Enter your password"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>

            <button
              onClick={Onsignup}
              className="w-full py-3 px-4 bg-green-900 text-white rounded-lg text-lg font-semibold hover:bg-green-800 transition duration-300"
            >
              Signup
            </button>

            <div className="text-center">
              <p className="text-gray-600 text-sm">
                Already have an account?{" "}
                <Link href="/login" className="text-blue-500 hover:underline">
                  Login here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
