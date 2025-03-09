"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Button from "../ui/butons"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { X, Menu } from "lucide-react"

const Navbar = () => {
  const router = useRouter()

  // Manage active link and mobile menu state
  const [activeLink, setActiveLink] = useState("")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // On component mount, check if a token exists in localStorage
  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      setIsAuthenticated(true)
    }
  }, [])

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  // Set active link and close mobile menu
  const handleLinkClick = (link) => {
    setActiveLink(link)
    setIsMobileMenuOpen(false)
  }

  // Handle logout: call backend logout endpoint, clear token, and update auth state
  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      })
      const data = await response.json()
      if (data.success) {
        localStorage.removeItem("token")
        setIsAuthenticated(false)
        toast.success("Logged Out Successfully")
        router.push("/")
      } else {
        toast.error(data.message || "Logout failed")
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Error logging out")
    }
  }

  return (
    <nav className="bg-darkGreen border-b fixed top-0 left-0 right-0 z-50 border-gray-300 dark:bg-gray-900 dark:border-gray-700 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
        {/* Logo/Brand */}
        <Link href="/" onClick={() => handleLinkClick("home")} className="text-white text-xl font-bold">
          PrayTracker
        </Link>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden text-white p-2 rounded-lg focus:ring-2 focus:ring-lightGreen"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Navbar Links */}
        <div
          className={`${
            isMobileMenuOpen ? "flex" : "hidden"
          } md:flex flex-col md:flex-row absolute md:relative top-16 md:top-0 left-0 right-0 md:left-auto md:right-auto bg-darkGreen md:bg-transparent shadow-lg md:shadow-none z-50 p-4 md:p-0 space-y-4 md:space-y-0 md:items-center md:space-x-6`}
        >
          <ul className="flex flex-col md:flex-row md:space-x-8 space-y-2 md:space-y-0">
            <li>
              <Link
                href="/"
                onClick={() => handleLinkClick("home")}
                className={`block px-3 py-2 rounded-lg ${
                  activeLink === "home"
                    ? "bg-lightGreen text-white"
                    : "text-white hover:bg-lightGreen hover:bg-opacity-70"
                }`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                onClick={() => handleLinkClick("about")}
                className={`block px-3 py-2 rounded-lg ${
                  activeLink === "about"
                    ? "bg-lightGreen text-white"
                    : "text-white hover:bg-lightGreen hover:bg-opacity-70"
                }`}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                onClick={() => handleLinkClick("contact")}
                className={`block px-3 py-2 rounded-lg ${
                  activeLink === "contact"
                    ? "bg-lightGreen text-white"
                    : "text-white hover:bg-lightGreen hover:bg-opacity-70"
                }`}
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                href="/praytracker"
                onClick={() => handleLinkClick("praytracker")}
                className={`block px-3 py-2 rounded-lg ${
                  activeLink === "praytracker"
                    ? "bg-lightGreen text-white"
                    : "text-white hover:bg-lightGreen hover:bg-opacity-70"
                }`}
              >
                Pray Tracker
              </Link>
            </li>
          </ul>

          {/* Authentication Buttons */}
          <div className="mt-4 md:mt-0 flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-3">
            {isAuthenticated ? (
              <Button onClick={handleLogout} variant="destructive" className="w-full md:w-auto">
                Logout
              </Button>
            ) : (
              <>
                <Link href="/login" className="w-full md:w-auto">
                  <Button variant="default" className="w-full bg-lightGreen hover:bg-lightGreen/90">
                    Login
                  </Button>
                </Link>
                <Link href="/signup" className="w-full md:w-auto">
                  <Button
                    variant="outline"
                    className="w-full text-white border-white hover:bg-white hover:text-darkGreen"
                  >
                    Signup
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </nav>
  )
}

export default Navbar

