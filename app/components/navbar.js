"use client";
import React, { useState } from "react";
import Link from "next/link";

import Button from "../ui/butons";

const Navbar = () => {

  const [activeLink, setActiveLink] = useState(""); 
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); 

  // Toggle dropdown menus

  // Toggle Mobile Menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setActiveDropdown(null);
  };

  // Set active link
  const handleLinkClick = (link) => {
    setActiveLink(link);
    setActiveDropdown(null);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-darkGreen border-b fixed top-0 left-0 text-lightGreen right-0 z-50 border-gray-300 dark:bg-gray-900 dark:border-gray-700 shadow-md">
      <div className="w-3/4 mx-auto flex items-center text-lightGreen justify-between p-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3">
          <span className="text-2xl font-semibold  dark:text-white">
          Siratul Salah
          </span>
        </Link>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden text-lightGreen dark:text-lightGreen p-2 rounded-lg focus:ring-2"
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
          } md:flex md:items-center md:space-x-6 w-full md:w-auto absolute md:relative top-16 md:top-0 left-0 bg-white md:bg-transparent shadow-lg md:shadow-none z-50`}
        >
          <ul className="flex flex-col \ md:flex-row md:space-x-8 border md:border-0 rounded-lg bg-gray-50 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
            
            {/* Home */}
            <li>
              <Link
                href="/"
                onClick={() => handleLinkClick("home")}
                className={`block px-3 py-2 ${
                  activeLink === "home" ? " text-white " : "text-white"
                } dark:text-white hover:bg-lightGreen rounded-lg`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/"
                onClick={() => handleLinkClick("home")}
                className={`block px-3 py-2 ${
                  activeLink === "home" ? "  text-white " : "text-white"
                } dark:text-white hover:bg-lightGreen rounded-lg`}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/"
                onClick={() => handleLinkClick("home")}
                className={`block px-3 py-2 ${
                  activeLink === "home" ? " text-white " : "text-white"
                } dark:text-white hover:bg-lightGreen rounded-lg`}
              >
                Contact
              </Link>
            </li>
            {/* Services Dropdown with Navigation */}
        
            <li>
              <Link
                href="/Praytracker"
                onClick={() => handleLinkClick("home")}
                className={`block px-3 py-2 ${
                  activeLink === "home" ? " text-white " : "text-white"
                } dark:text-white hover:bg-lightGreenrounded-lg`}
              >
                Pray Tracker
              </Link>
            </li>
          </ul>

          {/* Search & Button */}
          <div className="mt-4 md:mt-0 flex items-center space-x-3">
        
        <Link href='/login'> <Button text="login" variant="primary" className="shadow-lg" /></Link>
        <Link href='/signup'> <Button text="Signup" variant="primary" className="shadow-lg" /></Link>


          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
