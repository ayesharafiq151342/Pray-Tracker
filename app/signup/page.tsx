"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type FormDataType = {
  name: string;
  email: string;
  password: string;
};

type ErrorsType = {
  name?: string;
  email?: string;
  password?: string;
};

export default function Signup() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormDataType>({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<ErrorsType>({});

  // Simple form validation
  const validateForm = (): boolean => {
    let valid = true;
    const newErrors: ErrorsType = {};
    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
      valid = false;
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
      valid = false;
    }
    if (!formData.password.trim()) {
      newErrors.password = "Password is required.";
      valid = false;
    }
    setErrors(newErrors);
    return valid;
  };

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please correct the errors in the form.");
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // include cookies if needed
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok && data.success) {
        toast.success("Signup successful! Redirecting to login...");
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        toast.error(data.message || "Signup failed!");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message || "An error occurred during signup.");
        console.error("Signup Error:", err);
      } else {
        toast.error("An error occurred during signup.");
        console.error("Signup Error:", err);
      }
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center bg-gray-100 min-h-screen">
      {/* Left Side - Image */}
      <div className="hidden md:block">
        <img
          src="/pray.webp"
          alt="Signup"
          className="w-full h-screen object-cover"
        />
      </div>
      {/* Right Side - Signup Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-3xl font-bold mb-6 text-center">Create Account</h2>
          <form onSubmit={handleSignup}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Enter your name"
                className="w-full p-2 border border-gray-300 rounded"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="Enter your email"
                className="w-full p-2 border border-gray-300 rounded"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Password</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                placeholder="Enter your password"
                className="w-full p-2 border border-gray-300 rounded"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-green-600 text-white rounded hover:bg-green-700 transition"
            >
              Signup
            </button>
          </form>
          <p className="mt-4 text-center">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-600 hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
