"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileAccordion, setMobileAccordion] = useState({});
  const pathname = usePathname();
  const router = useRouter();
  const handleAboutLinkClick = (e, targetId) => {
    // If we are already on the about page
    if (pathname === '/about') {
      e.preventDefault(); // Stop the link from navigating
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start', // Ensures the top of the section aligns with the top of the viewport
        });
      }
    }
    // If we are on any other page, do nothing and let the <Link> handle navigation.
    // The code in Step 2 will handle the smooth scroll on the about page.
  };

  // Handle scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle body scroll lock for mobile menu
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleDropdownEnter = (dropdown) => {
    setActiveDropdown(dropdown);
  };

  const handleDropdownLeave = () => {
    setActiveDropdown(null);
  };
  const handleMobileLinkclick = ()=>{
    setIsMobileMenuOpen(false);
  }

  const toggleMobileAccordion = (section) => {
    setMobileAccordion(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const dropdownItems = {
    'About Us': [
      { name: 'Our History', id: 'history' },
      { name: 'From the Managing Director\'s Desk', id: 'director' },
      { name: 'Our Vision', id: 'vision' }
    ],
    'Businesses': [
    { name: 'Real Estate', path: '/real-estate' },
    { name: 'Entertainment', path: '/entertainment' },
    { name: 'Finance', path: '/finance' },
    { name: 'Retail', path: '/retail' }
  ]
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? 'bg-white text-black backdrop-blur-md shadow-lg'
        : 'bg-transparent'
        }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            <div className="flex-shrink-0 p-3 flex items-center h-full">
              <div className="text-white text-xl font-bold">
                <Link href="/">
                  <Image src="/logo.png" alt="Company Logo" width={80} height={80} className="p-4" />
                </Link>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-8">
              <Link href="/" className={`${isScrolled ? 'text-black' : 'text-white'} hover:text-gray-300 transition-colors duration-200`}>
                Home
              </Link>

              {/* About Us Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => handleDropdownEnter('About Us')}
                onMouseLeave={handleDropdownLeave}
              >
                <button className={`${isScrolled ? 'text-black' : 'text-white'} hover:text-gray-300 transition-colors duration-200 flex items-center`}>
                  <Link href="/about">About Us</Link>
                  <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* About Us Dropdown Menu */}
                <div className={`absolute top-full left-0 mt-2 w-64 bg-transparent backdrop-blur-md rounded-md shadow-lg transition-all duration-300 ${activeDropdown === 'About Us'
                  ? 'opacity-100 visible transform translate-y-0'
                  : 'opacity-0 invisible transform translate-y-2'
                  }`}>
                  <div className="py-2">
                    {dropdownItems['About Us'].map((item, index) => (
                      <Link
                        key={index}
                        href={`/about#${item.id}`}
                        onClick={(e) => handleAboutLinkClick(e, item.id)} // <-- USE THE NEW HANDLER
                        className="block w-full text-left px-4 py-2 text-white hover:bg-gray-800/50 transition-colors duration-200"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Businesses Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => handleDropdownEnter('Businesses')}
                onMouseLeave={handleDropdownLeave}
              >
                <Link href="#" className={`${isScrolled ? 'text-black' : 'text-white'} hover:text-gray-300 transition-colors duration-200 flex items-center`}>
                  Businesses
                  <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </Link>

                {/* Businesses Dropdown Menu */}
                <div className={`absolute top-full left-0 mt-2 w-48 bg-gray-900/90 backdrop-blur-md rounded-md shadow-lg transition-all duration-300 ${activeDropdown === 'Businesses'
                  ? 'opacity-100 visible transform translate-y-0'
                  : 'opacity-0 invisible transform translate-y-2'
                  }`}>
                  <div className="py-2">
                    {dropdownItems['Businesses'].map((item, index) => (
                      <Link
                        key={index}
                        href={item.path}
                        className="block px-4 py-2 text-white hover:bg-gray-800/50 transition-colors duration-200"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <Link href="/social-responsibility" className={`${isScrolled ? 'text-black' : 'text-white'} hover:text-gray-300 transition-colors duration-200`}>
                Social Responsibility
              </Link>
              <Link href="#" className={`${isScrolled ? 'text-black' : 'text-white'} hover:text-gray-300 transition-colors duration-200`}>
                Contact Us
              </Link>
            </div>

            {/* Desktop Search Icon */}
            <div className="hidden lg:flex items-center">
              <button className={`${isScrolled ? 'text-black' : 'text-white'} hover:text-gray-300 transition-colors duration-200`}>
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>

            {/* Mobile Hamburger Menu */}
            <div className="lg:hidden">
              <button
                onClick={toggleMobileMenu}
                className="text-white hover:text-gray-300 transition-colors duration-200"
              >
                {isMobileMenuOpen ? (
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${isMobileMenuOpen
        ? 'opacity-100 visible'
        : 'opacity-0 invisible'
        }`}>
        <div className={`absolute inset-0 bg-gray-900/90 backdrop-blur-md transition-transform duration-300 ${isMobileMenuOpen ? 'transform translate-x-0' : 'transform translate-x-full'
          }`}>
          <div className="flex flex-col h-full">
            {/* Close Button */}
            <div className="flex justify-end p-4">
              <button
                onClick={toggleMobileMenu}
                className="text-white hover:text-gray-300 transition-colors duration-200"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Mobile Navigation Links */}
            <div className="flex-1 px-6 py-4 space-y-4">
              <Link href="#" className="block text-white text-xl font-medium hover:text-gray-300 transition-colors duration-200">
                Home
              </Link>

              {/* About Us Accordion */}
              <div>
                <button
                  onClick={() => {toggleMobileAccordion('About Us');router.push('/about'); handleMobileLinkclick(); }}
                  className="flex items-center justify-between w-full text-white text-xl font-medium hover:text-gray-300 transition-colors duration-200"
                >
                  About Us
                  <svg className={`h-5 w-5 transition-transform duration-200 ${mobileAccordion['About Us'] ? 'rotate-180' : ''
                    }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className={`mt-2 ml-4 space-y-2 transition-all duration-300 ${mobileAccordion['About Us'] ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
                  }`}>
                  {dropdownItems['About Us'].map((item, index) => (
                    <Link
                      key={index}
                      href={`/about#${item.id}`}
                      onClick={(e) => {handleAboutLinkClick(e, item.id); handleMobileLinkclick();}}
                      className="block w-full text-left text-gray-300 text-lg hover:text-white transition-colors duration-200"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Businesses Accordion */}
              <div>
                <button
                  onClick={() => {toggleMobileAccordion('Businesses'); handleMobileLinkclick();}}
                  className="flex items-center justify-between w-full text-white text-xl font-medium hover:text-gray-300 transition-colors duration-200"
                >
                  Businesses
                  <svg className={`h-5 w-5 transition-transform duration-200 ${mobileAccordion['Businesses'] ? 'rotate-180' : ''
                    }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className={`mt-2 ml-4 space-y-2 transition-all duration-300 ${mobileAccordion['Businesses'] ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
                  }`}>
                  {dropdownItems['Businesses'].map((item, index) => (
                    <Link
                      key={index}
                      href={item.path}
                      onClick={() => handleMobileLinkclick()}
                      className="block text-gray-300 text-lg hover:text-white transition-colors duration-200"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>

              <Link href="#" className="block text-white text-xl font-medium hover:text-gray-300 transition-colors duration-200">
                Social Responsibility
              </Link>
              <Link href="#" className="block text-white text-xl font-medium hover:text-gray-300 transition-colors duration-200">
                Contact Us
              </Link>

              {/* Mobile Search */}
              <div className="pt-4 border-t border-gray-700">
                <button className="flex items-center text-white text-xl font-medium hover:text-gray-300 transition-colors duration-200">
                  <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;