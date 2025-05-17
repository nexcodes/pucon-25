'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Trees } from 'lucide-react';

// Navigation link component for desktop
const NavLink = ({ 
  href, 
  label 
}: { 
  href: string; 
  label: string;
}) => (
  <Link 
    href={href}
    className="text-green-300 hover:text-green-400 font-medium transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-green-400 after:transition-all after:duration-300 hover:after:w-full"
  >
    {label}
  </Link>
);

// Navigation link component for mobile
const MobileNavLink = ({ 
  href, 
  label, 
  onClick 
}: { 
  href: string; 
  label: string;
  onClick: () => void;
}) => (
  <Link 
    href={href}
    className="text-green-300 hover:text-green-400 font-medium py-2 transition-colors duration-300 block"
    onClick={onClick}
  >
    {label}
  </Link>
);

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="fixed w-full z-50 transition-all duration-300">
      <div 
        className={`transition-all duration-300 ${
          isScrolled 
            ? 'shadow-lg shadow-green-900/30 py-3' 
            : 'py-4'
        }`}
        style={{
          backgroundImage: isScrolled 
            ? 'linear-gradient(135deg, rgba(6, 24, 14, 0.95) 0%, rgba(9, 32, 18, 0.95) 70%, rgba(11, 42, 23, 0.95) 100%), radial-gradient(circle at top right, rgba(52, 211, 153, 0.2) 0%, transparent 60%)' 
            : 'linear-gradient(135deg, rgba(6, 24, 14, 0.85) 0%, rgba(9, 32, 18, 0.85) 60%, rgba(11, 42, 23, 0.85) 100%), radial-gradient(circle at top left, rgba(52, 211, 153, 0.3) 0%, transparent 70%)'
        }}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="w-[220px] h-[60px]">
              <Link href="/">
                <div className="w-full h-full cursor-pointer flex items-center">
                  <div className="bg-gradient-to-br from-green-500 to-green-700 p-1.5 rounded-full mr-2 shadow-lg border border-green-600/30">
                    <Trees size={24} className="text-gray-900 filter drop-shadow-sm" />
                  </div>
                  <span className="bg-gradient-to-r from-green-400 to-green-300 bg-clip-text text-transparent font-bold text-xl tracking-wide drop-shadow-md">EcoMate</span>
                </div>
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <NavLink href="/" label="Home" />
              <NavLink href="/Aboutus" label="About Us" />

              <div className="relative group">
                <button className="text-green-300 hover:text-green-400 font-medium transition-colors duration-300 flex items-center relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-green-400 after:transition-all after:duration-300 group-hover:after:w-full">
                  Services 
                  <svg className="ml-1 w-4 h-4 transition-transform duration-300 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>
                <div className="absolute left-0 mt-2 w-48 rounded-md shadow-xl bg-gray-900/95 ring-1 ring-green-500/20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 transform -translate-y-1 group-hover:translate-y-0 border border-green-900/50">
                  <div className="py-1 rounded-md overflow-hidden backdrop-blur-lg">
                    <Link href="/recycling" className="block px-4 py-2 text-sm text-green-300 hover:bg-green-900/50 hover:text-green-400">Recycling</Link>
                    <Link href="/renewable-energy" className="block px-4 py-2 text-sm text-green-300 hover:bg-green-900/50 hover:text-green-400">Renewable Energy</Link>
                    <Link href="/water-conservation" className="block px-4 py-2 text-sm text-green-300 hover:bg-green-900/50 hover:text-green-400">Water Conservation</Link>
                    <Link href="/eco-consulting" className="block px-4 py-2 text-sm text-green-300 hover:bg-green-900/50 hover:text-green-400">Eco Consulting</Link>
                    <Link href="/green-building" className="block px-4 py-2 text-sm text-green-300 hover:bg-green-900/50 hover:text-green-400">Green Building</Link>
                    <Link href="/carbon-footprint" className="block px-4 py-2 text-sm text-green-300 hover:bg-green-900/50 hover:text-green-400">Carbon Footprint</Link>
                  </div>
                </div>
              </div>

              <Link href="/registration">
                <button className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-gray-900 font-medium py-2 px-4 rounded-md transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 border border-green-500/30">
                  <span className="text-gray-100">Registration</span>
                </button>
              </Link>
            </nav>
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button 
                onClick={toggleMenu}
                className="text-green-400 hover:text-green-300 focus:outline-none p-1.5 bg-green-900/30 rounded-md hover:bg-green-900/50 transition-all duration-300 border border-green-700/30"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <X size={24} />
                ) : (
                  <Menu size={24} />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-gradient-to-br from-gray-900 via-gray-900 to-green-900 shadow-lg backdrop-blur-sm bg-opacity-95 border-t border-green-900/50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col space-y-4">
              <MobileNavLink href="/" label="Home" onClick={toggleMenu} />
              <MobileNavLink href="/Aboutus" label="About Us" onClick={toggleMenu} />
              
              {/* Services dropdown for mobile */}
              <div className="relative">
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    const dropdown = e.currentTarget.nextElementSibling;
                    dropdown?.classList.toggle('hidden');
                    e.currentTarget.querySelector('svg')?.classList.toggle('rotate-180');
                  }}
                  className="text-green-300 hover:text-green-400 font-medium py-2 transition-colors duration-300 flex items-center justify-between w-full"
                >
                  Services
                  <svg className="w-4 h-4 ml-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>
                <div className="hidden pl-4 mt-2 mb-2 border-l-2 border-green-700">
                  <Link href="/recycling" className="block py-2 text-green-300 hover:text-green-400" onClick={toggleMenu}>Recycling</Link>
                  <Link href="/renewable-energy" className="block py-2 text-green-300 hover:text-green-400" onClick={toggleMenu}>Renewable Energy</Link>
                  <Link href="/water-conservation" className="block py-2 text-green-300 hover:text-green-400" onClick={toggleMenu}>Water Conservation</Link>
                  <Link href="/eco-consulting" className="block py-2 text-green-300 hover:text-green-400" onClick={toggleMenu}>Eco Consulting</Link>
                  <Link href="/green-building" className="block py-2 text-green-300 hover:text-green-400" onClick={toggleMenu}>Green Building</Link>
                  <Link href="/carbon-footprint" className="block py-2 text-green-300 hover:text-green-400" onClick={toggleMenu}>Carbon Footprint</Link>
                </div>
              </div>
              
              <Link
                href="/registration"  
                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-gray-100 font-medium py-2 px-4 rounded-md transition-all duration-300 w-full text-center block mt-2 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 border border-green-600/30"
                onClick={toggleMenu}
              >
                Registration
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;