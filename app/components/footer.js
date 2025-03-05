"use client";
import React from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Youtube, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-HoverGreen mt-20 text-white py-10 px-5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        
        {/* About Us */}
        <div>
          <h3 className="text-xl font-bold border-l-4 border-lightGreen pl-2 mb-4">About Us</h3>
          <p className="text-sm leading-relaxed">
          Siratul Salah is dedicated to guiding individuals on the path of righteousness through the beauty of Salah (prayer). Our mission is to educate, inspire, and support Muslims in perfecting their prayers, understanding their significance, and strengthening their connection with Allah.   </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-bold border-l-4 border-lightGreen pl-2 mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-HoverGreen">About Us</a></li>
            <li><a href="#" className="hover:text-HoverGreen">Terms of Services</a></li>
            <li><a href="#" className="hover:text-HoverGreen">Contact Us</a></li>
          </ul>
        </div>

        {/* Short Links */}
     

        {/* Contact Us */}
        <div>
          <h3 className="text-xl font-bold border-l-4 border-lightGreen pl-2 mb-4">Contact Us</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center">
              <Mail className="mr-2 w-5 h-5" /> Ayesharafiq151342@gmail.com
            </li>
            <li className="flex items-center">
              <Phone className="mr-2 w-5 h-5" /> +0323751475
            </li>
          
            <li className="flex items-start">
              <MapPin className="mr-2 w-5 h-5 mt-1" />
              6th floor Legacy tower city  Faisalabad, Pakistan
            </li>
          </ul>

          {/* Social Icons */}
          <div className="flex space-x-4 mt-4 text-xl">
            <a href="#" className="hover:text-HoverGreen"><Facebook className="w-5 h-5" /></a>
            <a href="#" className="hover:text-HoverGreen"><Twitter className="w-5 h-5" /></a>
            <a href="#" className="hover:text-HoverGreen"><Youtube className="w-5 h-5" /></a>
            <a href="#" className="hover:text-HoverGreen"><Linkedin className="w-5 h-5" /></a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
