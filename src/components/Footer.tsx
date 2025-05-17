'use client';

import React from 'react';
import Link from 'next/link';
import { Leaf, Mail, Phone, MapPin, Instagram, Twitter, Facebook, Linkedin, ArrowUpRight, Send } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="relative w-full bg-gray-900 pt-16 pb-6 overflow-hidden z-10">
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-black/30 to-transparent"></div>
        <div className="absolute top-0 left-0 w-1/3 h-64 bg-green-500 rounded-full filter blur-[100px] opacity-5"></div>
        <div className="absolute bottom-0 right-0 w-1/4 h-64 bg-green-400 rounded-full filter blur-[100px] opacity-5"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Top section with logo, description and newsletter */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-12 border-b border-green-900/30">
          {/* Logo and description */}
          <div className="lg:col-span-4">
            <Link href="/">
              <div className="flex items-center mb-6">
                <div className="bg-gradient-to-br from-green-500 to-green-700 p-1.5 rounded-full mr-2 shadow-lg border border-green-600/30">
                  <Leaf size={24} className="text-gray-900 filter drop-shadow-sm" />
                </div>
                <span className="bg-gradient-to-r from-green-400 to-green-300 bg-clip-text text-transparent font-bold text-xl tracking-wide drop-shadow-md">EcoMate</span>
              </div>
            </Link>
            
            <p className="mb-6 text-gray-400 text-sm leading-relaxed">
              EcoMate is dedicated to creating a sustainable future through innovative green solutions. 
              Our mission is to help individuals and businesses reduce their environmental impact 
              while building a healthier planet for generations to come.
            </p>
            
            <div className="flex space-x-4">
              <a href="#" className="w-8 h-8 rounded-full bg-gray-800 hover:bg-green-800 flex items-center justify-center transition-colors duration-300 border border-green-900/50">
                <Instagram size={16} className="text-green-400" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-gray-800 hover:bg-green-800 flex items-center justify-center transition-colors duration-300 border border-green-900/50">
                <Twitter size={16} className="text-green-400" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-gray-800 hover:bg-green-800 flex items-center justify-center transition-colors duration-300 border border-green-900/50">
                <Facebook size={16} className="text-green-400" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-gray-800 hover:bg-green-800 flex items-center justify-center transition-colors duration-300 border border-green-900/50">
                <Linkedin size={16} className="text-green-400" />
              </a>
            </div>
          </div>
          
          {/* Quick links */}
          <div className="lg:col-span-2 md:col-span-1">
            <h3 className="text-green-300 font-semibold mb-4 text-sm uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-green-400 text-sm flex items-center transition-colors duration-300">
                  <ArrowUpRight size={14} className="mr-2 text-green-700" />
                  Home
                </Link>
              </li>
              <li>
                <Link href="/Aboutus" className="text-gray-400 hover:text-green-400 text-sm flex items-center transition-colors duration-300">
                  <ArrowUpRight size={14} className="mr-2 text-green-700" />
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/Contactus" className="text-gray-400 hover:text-green-400 text-sm flex items-center transition-colors duration-300">
                  <ArrowUpRight size={14} className="mr-2 text-green-700" />
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/Blog" className="text-gray-400 hover:text-green-400 text-sm flex items-center transition-colors duration-300">
                  <ArrowUpRight size={14} className="mr-2 text-green-700" />
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Services */}
          <div className="lg:col-span-2">
            <h3 className="text-green-300 font-semibold mb-4 text-sm uppercase tracking-wider">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/recycling" className="text-gray-400 hover:text-green-400 text-sm flex items-center transition-colors duration-300">
                  <ArrowUpRight size={14} className="mr-2 text-green-700" />
                  Recycling
                </Link>
              </li>
              <li>
                <Link href="/renewable-energy" className="text-gray-400 hover:text-green-400 text-sm flex items-center transition-colors duration-300">
                  <ArrowUpRight size={14} className="mr-2 text-green-700" />
                  Renewable Energy
                </Link>
              </li>
              <li>
                <Link href="/water-conservation" className="text-gray-400 hover:text-green-400 text-sm flex items-center transition-colors duration-300">
                  <ArrowUpRight size={14} className="mr-2 text-green-700" />
                  Water Conservation
                </Link>
              </li>
              <li>
                <Link href="/carbon-footprint" className="text-gray-400 hover:text-green-400 text-sm flex items-center transition-colors duration-300">
                  <ArrowUpRight size={14} className="mr-2 text-green-700" />
                  Carbon Footprint
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact info */}
          <div className="lg:col-span-2">
            <h3 className="text-green-300 font-semibold mb-4 text-sm uppercase tracking-wider">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Mail size={16} className="text-green-500 mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-400 text-sm">info@ecomate.com</span>
              </li>
              <li className="flex items-start">
                <Phone size={16} className="text-green-500 mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-400 text-sm">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start">
                <MapPin size={16} className="text-green-500 mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-400 text-sm">123 Green Street<br />Eco City, EC 12345</span>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div className="lg:col-span-2">
            <h3 className="text-green-300 font-semibold mb-4 text-sm uppercase tracking-wider">Newsletter</h3>
            <p className="text-gray-400 text-sm mb-4">Stay updated with our latest news and offers.</p>
            
            <form className="relative">
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-4 py-2 pr-10 rounded-md bg-gray-800 border border-green-900/30 focus:border-green-600 focus:outline-none focus:ring-1 focus:ring-green-600 text-gray-300 text-sm placeholder-gray-500"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-green-500 hover:text-green-400 transition-colors duration-300"
              >
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>
        
        {/* Bottom section with copyright */}
        <div className="pt-8 pb-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              © {currentYear} EcoMate. All rights reserved.
            </p>
            
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm text-gray-500">
              <Link href="/privacy-policy" className="hover:text-green-400 transition-colors duration-300">
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" className="hover:text-green-400 transition-colors duration-300">
                Terms of Service
              </Link>
              <Link href="/cookies" className="hover:text-green-400 transition-colors duration-300">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;