'use client';
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const router = useRouter();

  // Login & OTP state variables
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [userId, setUserId] = useState<string | null>(null); // user ID received after login
  const [showOtp, setShowOtp] = useState<boolean>(false); // toggle OTP verification for login
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // Forgot Password state variables
  const [forgot, setForgot] = useState<boolean>(false); // toggle forgot password mode
  const [forgotStage, setForgotStage] = useState<"send" | "reset">("send"); // "send" OTP or "reset" password
  const [resetEmail, setResetEmail] = useState<string>("");
  const [resetOtp, setResetOtp] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");

  // Handler for login form submission
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      toast.error("Email and password are required!");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:4000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // include cookies for session handling
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (response.ok && data.success) {
        // If account is not verified, send OTP for verification.
        if (!data.isAccountVerified) {
          toast.info("Your account is not verified. Sending OTP...");
          setUserId(data.userId);
          const otpRes = await fetch("http://localhost:4000/api/auth/send-verify-otp", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include", // sends the token cookie if any
            body: JSON.stringify({ userId: data.userId }),
          });
          const otpData = await otpRes.json();
          if (otpData.success) {
            toast.success(otpData.message);
            setShowOtp(true);
          } else {
            toast.error(otpData.message || "Failed to send OTP");
          }
        } else {
          // If the account is already verified, redirect directly.
          toast.success("Login successful! Redirecting...");
          setTimeout(() => {
            router.push("/Home");
          }, 1500);
        }
      } else {
        setError(data.message || "Login failed!");
        toast.error(data.message || "Login failed!");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Login failed!");
        toast.error(err.message || "Login failed!");
      } else {
        setError("Login failed!");
        toast.error("Login failed!");
      }
    } finally {
      setLoading(false);
    }
  };

  // Handler for OTP verification (login) form submission
  const handleVerifyOtp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!otp.trim()) {
      toast.error("OTP is required!");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:4000/api/auth/verify-account", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ userId, otp }),
      });
      const result = await res.json();
      if (result.success) {
        toast.success(result.message);
        setTimeout(() => {
          router.push("/Admin");
        }, 1500);
      } else {
        toast.error(result.message);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message || "OTP verification failed!");
      } else {
        toast.error("OTP verification failed!");
      }
    } finally {
      setLoading(false);
    }
  };

  // Handler for sending reset OTP (forgot password)
  const handleSendResetOtp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!resetEmail.trim()) {
      toast.error("Email is required!");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("http://localhost:4000/api/auth/send-reset-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: resetEmail }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(data.message);
        setForgotStage("reset");
      } else {
        toast.error(data.message || "Failed to send OTP");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message || "Error sending OTP");
      } else {
        toast.error("Error sending OTP");
      }
    } finally {
      setLoading(false);
    }
  };

  // Handler for resetting password
  const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!resetEmail.trim() || !resetOtp.trim() || !newPassword.trim()) {
      toast.error("Email, OTP, and new password are required!");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("http://localhost:4000/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: resetEmail, otp: resetOtp, newPassword }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(data.message);
        // Reset forgot password state and go back to login mode
        setForgot(false);
        setForgotStage("send");
        setResetEmail("");
        setResetOtp("");
        setNewPassword("");
      } else {
        toast.error(data.message);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message || "Error resetting password");
      } else {
        toast.error("Error resetting password");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center bg-gray-100 min-h-screen">
      {/* Left Side - Image */}
      <div
        className="hidden md:block md:w-1/2 bg-cover bg-center h-screen"
        style={{ backgroundImage: 'url(/login5.jpg)' }}
      ></div>

      {/* Right Side */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2">
        {!forgot ? (
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}

            {/* Login Form */}
            {!showOtp ? (
              <form onSubmit={handleLogin}>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2 px-4 bg-green-600 text-white rounded hover:bg-green-700 transition"
                >
                  {loading ? "Processing..." : "Login"}
                </button>
              </form>
            ) : (
              // OTP Verification Form (for unverified login)
              <form onSubmit={handleVerifyOtp} className="mt-4">
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Enter OTP</label>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter the OTP sent to your email"
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2 px-4 bg-green-600 text-white rounded hover:bg-green-700 transition"
                >
                  {loading ? "Verifying..." : "Verify OTP"}
                </button>
              </form>
            )}

            <p className="mt-4 text-center">
              Dont have an account?{" "}
              <Link href="/signup" className="text-blue-600 hover:underline">
                Signup here
              </Link>
            </p>
            <p className="mt-2 text-center">
              <button
                onClick={() => setForgot(true)}
                className="text-blue-600 hover:underline"
              >
                Forgot Password?
              </button>
            </p>
          </div>
        ) : (
          // Forgot Password Section
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Forgot Password</h2>
            {forgotStage === "send" ? (
              <form onSubmit={handleSendResetOtp}>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2 px-4 bg-green-600 text-white rounded hover:bg-green-700 transition"
                >
                  {loading ? "Sending OTP..." : "Send Reset OTP"}
                </button>
              </form>
            ) : (
              <form onSubmit={handleResetPassword} className="mt-4">
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">OTP</label>
                  <input
                    type="text"
                    value={resetOtp}
                    onChange={(e) => setResetOtp(e.target.value)}
                    placeholder="Enter the OTP sent to your email"
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">New Password</label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter your new password"
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2 px-4 bg-green-600 text-white rounded hover:bg-green-700 transition"
                >
                  {loading ? "Resetting..." : "Reset Password"}
                </button>
              </form>
            )}
            <p className="mt-4 text-center">
              <button
                onClick={() => {
                  setForgot(false);
                  setForgotStage("send");
                }}
                className="text-blue-600 hover:underline"
              >
                Back to Login
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
