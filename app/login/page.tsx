"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const router = useRouter(); // Initialize the router
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let errorMessages = {};
    if (!user.email) errorMessages.email = "Email is required.";
    if (!user.password) errorMessages.password = "Password is required.";

    setErrors(errorMessages);
    return Object.keys(errorMessages).length === 0;
  };

  const OnLogin = async () => {
    const isValid = validateForm();
    if (!isValid) {
      toast.error("Form is invalid! Please correct the errors.");
      return;
    }

    toast.success("Login successful! Redirecting to home...");

    // Redirect to home after 2 seconds
    setTimeout(() => {
      router.push("/Home");
    }, 2000);
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center bg-gray-100 min-h-screen">
      {/* Left Side - Image */}
      <div className="hidden md:block">
        <img src="/login.jpg" alt="Login" className="w-full h-screen object-cover" />
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Login Account</h2>

          <div className="space-y-4">
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
              onClick={OnLogin}
              className="w-full py-3 px-4 bg-green-900 text-white rounded-lg text-lg font-semibold hover:bg-green-800 transition duration-300"
            >
              Login
            </button>

            <div className="text-center">
              <p className="text-gray-600 text-sm">
                {/* Don't have an account?{" "} */}
                <Link href="/signup" className="text-blue-500 hover:underline">
                  Signup here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
