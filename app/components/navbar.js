"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Button from "../ui/butons"; // Adjust the import path as needed
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  const router = useRouter();

  // Mobile menu state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // Active link for styling
  const [activeLink, setActiveLink] = useState("");
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // On component mount, check if a token exists in localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
    setActiveLink(window.location.pathname.toLowerCase());
  }, []);

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Set active link and close mobile menu
  const handleLinkClick = (link) => {
    setActiveLink(link.toLowerCase());
    setIsMobileMenuOpen(false);
  };

  // Handle logout: no event parameter needed
  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const data = await response.json();
      console.log("Logout Response:", data);
      if (data.success) {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        toast.success("Logged Out");
        router.push("/signup");
      } else {
        toast.error(data.message || "Logout failed");
      }
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error("Error logging out");
    }
  };

  // Helper function for link styling
  const linkClass = (link) =>
    `block px-3 py-2 text-white dark:text-white hover:bg-lightGreen rounded-lg ${
      activeLink === link.toLowerCase() ? "bg-lightGreen" : ""
    }`;

  return (
    <nav className="bg-darkGreen border-b fixed top-0 left-0 right-0 z-50 shadow-md">
      <div className="w-3/4 mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <Link href="/signup" onClick={() => handleLinkClick("/home")}>
          <img
            src="/logo.jpg"
            alt="Prayer Tracker Logo"
            className="h-12 w-auto rounded-lg transition-all duration-300 hover:scale-105"
          />
        </Link>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden text-lightGreen dark:text-lightGreen p-2 rounded-lg focus:ring-2"
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          )}
        </button>

        {/* Navbar Links */}
        <div
          className={`${
            isMobileMenuOpen ? "block" : "hidden"
          } md:flex md:items-center md:space-x-6 w-full md:w-auto absolute md:relative top-16 md:top-0 left-0 bg-darkGreen md:bg-transparent shadow-lg md:shadow-none z-50 p-4 md:p-0`}
        >
          <ul className="flex flex-col md:flex-row md:space-x-8 border md:border-0 rounded-lg bg-darkGreen md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
            <li>
              <Link href="/Home" onClick={() => handleLinkClick("/home")} className={linkClass("/home")}>
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" onClick={() => handleLinkClick("/about")} className={linkClass("/about")}>
                About
              </Link>
            </li>
            <li>
              <Link href="/praytracker" onClick={() => handleLinkClick("/praytracker")} className={linkClass("/praytracker")}>
                Pray Tracker
              </Link>
            </li>
            <li>
              <Link href="/pray_guidance" onClick={() => handleLinkClick("/pray_guidance")} className={linkClass("/pray_guidance")}>
              Pray guidance
              </Link>
            </li>
            <li>
             
            </li>
            <li>
              <Link href="/contactus" onClick={() => handleLinkClick("/contactus")} className={linkClass("/contactus")}>
                Contact
              </Link>
            </li>
    <li><img
                    src="/iamgedp.webp"
                    alt="Default Avatar"
                    className="h-10  w-10 lg:ml:0 ml-3 rounded-full border border-gray-300"
                  /></li>
            <div className="mt-4 md:mt-0 flex items-center space-x-3">
            {isAuthenticated ? (
           <>
           <Link href="/login">
             <Button text="Login" variant="primary" className="shadow-lg" />
           </Link>
           <Link href="/signup">
             <Button text="Signup" variant="primary" className="shadow-lg" />
           </Link>
         </>   
            ) : (
              <Button
                text="Logout"
                variant="primary"
                className="shadow-lg"
                onClick={handleLogout}
              />
              
            )}
          </div> 
        
                  </ul>

      
                       {/* Authentication Buttons */}
         
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
