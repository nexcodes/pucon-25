'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Trees, User, LogOut } from 'lucide-react';
import { useCurrentUser } from '@/app/hooks/use-current-user';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

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
  const { user } = useCurrentUser();
  const router = useRouter();
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
              <NavLink href="/Community" label="Community" />
              <NavLink href="/Personal Space" label="Personal Space" />

              {/* Auth Button - Desktop */}
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger className="focus:outline-none">
                    <Avatar className="h-9 w-9 transition-transform hover:scale-105">
                      <AvatarImage src={user?.image || ''} />
                      <AvatarFallback className="bg-gradient-to-r from-green-600 to-green-700 text-gray-100">
                        {user.name?.charAt(0) || 'U'}
                      </AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-gray-900 border border-green-800 shadow-xl">
                    <DropdownMenuItem 
                      className="text-green-300 hover:text-green-100 hover:bg-green-900/50 focus:bg-green-900/50 cursor-pointer"
                      onClick={() => authClient.signOut()}
                    >
                      <LogOut size={16} className="mr-2" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <button 
                  onClick={() => router.push('/auth/sign-in')}
                  className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-gray-100 font-medium py-2 px-4 rounded-md transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 border border-green-500/30 flex items-center"
                >
                  <User size={16} className="mr-2" />
                  Sign In
                </button>
              )}
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
              <MobileNavLink href="/Community" label="Communities" onClick={toggleMenu} />
              <MobileNavLink href="/personal Space" label="Personal Space" onClick={toggleMenu} />
             
              {/* Auth Button - Mobile */}
              {user ? (
                <div className="flex justify-between items-center px-2 py-2 border-t border-green-900/50">
                  <span className="text-green-300">Hi, {user.name?.split(' ')[0] || 'User'}</span>
                  <button
                    onClick={() => {
                      authClient.signOut();
                      toggleMenu();
                    }}
                    className="bg-gradient-to-r from-green-700 to-green-800 hover:from-green-600 hover:to-green-700 text-gray-100 font-medium py-1.5 px-3 rounded-md transition-all duration-300 flex items-center text-sm"
                  >
                    <LogOut size={14} className="mr-1.5" />
                    Sign Out
                  </button>
                </div>
              ) : (
                <Link
                  href="/auth/sign-in"  
                  className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-gray-100 font-medium py-2 px-4 rounded-md transition-all duration-300 w-full text-center block mt-2 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 border border-green-600/30 flex items-center justify-center"
                  onClick={toggleMenu}
                >
                  <User size={16} className="mr-2" />
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;