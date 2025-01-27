"use client";
import Link from "next/link";
import React from "react";

export default function Signup() {
  const [user, setUser] = React.useState({
    //Then, to access the useState hook, you use it through the React object, like this:
    email: "",
    password: ",",
    username: "",
  });
  const Onsignup = async () => {};
  return (
    <>
   

<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4">Hi, Signup</h2>
        
        {/* Username input */}
        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
            Username
        </label>
        <input
            id="username"
            type="text"
            value={user.username}
            onChange={(e) =>
                setUser({
                    ...user,
                    username: e.target.value,
                })
            }
            placeholder="Username"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        />
        
        {/* Email input */}
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email
        </label>
        <input
            id="email"
            type="text"
            value={user.email}
            onChange={(e) =>
                setUser({
                    ...user,
                    email: e.target.value,
                })
            }
            placeholder="Email"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        />

        {/* Password input */}
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
            Password
        </label>
        <input
            id="password"
            type="password"
            value={user.password}
            onChange={(e) =>
                setUser({
                    ...user,
                    password: e.target.value,
                })
            }
            placeholder="Password"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        />
        
        {/* Signup button */}
        <button
            onClick={Onsignup}
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
            Signup
        </button>

        {/* Link to login page */}
        <div className="mt-4 text-center">
            <Link href="/login" className="text-blue-500 hover:underline">
                Visit Login
            </Link>
        </div>
    </div>
</div>

      
    </>
  );
}
