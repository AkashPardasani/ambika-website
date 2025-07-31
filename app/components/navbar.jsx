"use client";
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [aboutSelected, setAboutSelected] = useState(false);
  const [businessSelected, setBusinessSelected] = useState(false);
  const [mobileAccordion, setMobileAccordion] = useState({});
  const aboutRef = useRef(null);
  const businessRef = useRef(null);
  const navRef = useRef(null);
  const aboutTimeoutRef = useRef(null);
  const businessTimeoutRef = useRef(null);
  const pathname = usePathname();
  const router = useRouter();

  // Handle smooth scrolling for About Us links
  const handleAboutLinkClick = (e, targetId) => {
    e.preventDefault();
    setAboutSelected(false);
    
    if (pathname === '/about') {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    } else {
      router.push(`/about#${targetId}`);
    }
  };

  // Handle scroll behavior for navbar styling
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

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setAboutSelected(false);
        setBusinessSelected(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close dropdowns when pathname changes
  useEffect(() => {
    setAboutSelected(false);
    setBusinessSelected(false);
    setIsMobileMenuOpen(false);
    setMobileAccordion({});
  }, [pathname]);

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (aboutTimeoutRef.current) clearTimeout(aboutTimeoutRef.current);
      if (businessTimeoutRef.current) clearTimeout(businessTimeoutRef.current);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const handleMobileLinkClick = () => {
    setIsMobileMenuOpen(false);
    setMobileAccordion({});
  };

  const toggleMobileAccordion = (section) => {
    setMobileAccordion((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Enhanced dropdown handlers with proper delays
  const handleAboutMouseEnter = () => {
    if (businessTimeoutRef.current) clearTimeout(businessTimeoutRef.current);
    if (aboutTimeoutRef.current) clearTimeout(aboutTimeoutRef.current);
    
    setBusinessSelected(false);
    setAboutSelected(true);
  };

  const handleAboutMouseLeave = () => {
    aboutTimeoutRef.current = setTimeout(() => {
      setAboutSelected(false);
    }, 150);
  };

  const handleBusinessMouseEnter = () => {
    if (aboutTimeoutRef.current) clearTimeout(aboutTimeoutRef.current);
    if (businessTimeoutRef.current) clearTimeout(businessTimeoutRef.current);
    
    setAboutSelected(false);
    setBusinessSelected(true);
  };

  const handleBusinessMouseLeave = () => {
    businessTimeoutRef.current = setTimeout(() => {
      setBusinessSelected(false);
    }, 150);
  };

  const handleDropdownMouseEnter = (type) => {
    if (type === 'about' && aboutTimeoutRef.current) {
      clearTimeout(aboutTimeoutRef.current);
    }
    if (type === 'business' && businessTimeoutRef.current) {
      clearTimeout(businessTimeoutRef.current);
    }
  };

  const dropdownItems = {
    'About Us': [
      { name: 'Our History', id: 'history' },
      { name: 'From the Managing Director\'s Desk', id: 'director' },
      { name: 'Our Vision', id: 'vision' },
    ],
    'Businesses': [
      { name: 'Real Estate', path: '/real-estate' },
      { name: 'Entertainment', path: '/entertainment' },
      { name: 'Finance', path: '/finance' },
      { name: 'Retail', path: '/retail' },
    ],
  };

  const Bridge = () => (
    <div className="absolute -top-[8px] left-0 right-0 h-[8px] bg-transparent" />
  );

  const Nub = ({ tabId, contentId }) => {
    const [left, setLeft] = useState(0);

    useEffect(() => {
      const hoveredTab = document.getElementById(tabId);
      const overlayContent = document.getElementById(contentId);

      if (!hoveredTab || !overlayContent) return;

      const tabRect = hoveredTab.getBoundingClientRect();
      const { left: contentLeft } = overlayContent.getBoundingClientRect();

      const tabCenter = tabRect.left + tabRect.width / 2 - contentLeft;

      setLeft(tabCenter);
    }, [tabId, contentId, aboutSelected, businessSelected, isScrolled]);

    return (
      <motion.span
        style={{
          clipPath: "polygon(0 0, 100% 0, 50% 50%, 0% 100%)",
        }}
        animate={{ left }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        className={`absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-tl border ${
          isScrolled ? 'bg-white border-gray-300' : 'bg-gray-900/90 border-neutral-600'
        }`}
      />
    );
  };

  const wrapperVariants = {
    open: {
      scaleY: 1,
      opacity: 1,
      transition: {
        duration: 0.2,
        when: "beforeChildren",
        staggerChildren: 0.05,
      },
    },
    closed: {
      scaleY: 0,
      opacity: 0,
      transition: {
        duration: 0.15,
        when: "afterChildren",
        staggerChildren: 0.05,
      },
    },
  };

  const iconVariants = {
    open: { rotate: 180 },
    closed: { rotate: 0 },
  };

  const itemVariants = {
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.15,
      },
    },
    closed: {
      opacity: 0,
      y: -10,
      transition: {
        duration: 0.1,
      },
    },
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 text-black backdrop-blur-md shadow-lg border-b border-gray-200'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0 p-3 flex items-center h-full">
              <div className="text-white text-xl font-bold">
                <Link href="/">
                  <Image
                    src="/logo.png"
                    alt="Company Logo"
                    width={80}
                    height={80}
                    className="p-4"
                    priority
                  />
                </Link>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-8">
              <Link
                href="/"
                className={`${
                  isScrolled ? 'text-black' : 'text-white'
                } hover:text-gray-300 transition-colors duration-200 font-medium`}
              >
                Home
              </Link>

              {/* About Us Dropdown */}
              <div
                className="relative"
                ref={aboutRef}
                onMouseEnter={handleAboutMouseEnter}
                onMouseLeave={handleAboutMouseLeave}
              >
                <button
                  id="about-tab"
                  onClick={() => {
                    router.push('/about');
                  }}
                  className={`flex items-center gap-1 rounded-full px-3 py-1.5 text-sm font-medium transition-all duration-200 ${
                    aboutSelected
                      ? isScrolled
                        ? 'bg-gray-200 text-black'
                        : 'bg-neutral-800 text-neutral-100'
                      : isScrolled
                      ? 'text-black hover:bg-gray-100'
                      : 'text-white hover:bg-white/10'
                  }`}
                  aria-expanded={aboutSelected}
                  aria-haspopup="true"
                >
                  <span>About Us</span>
                  <motion.span
                    variants={iconVariants}
                    animate={aboutSelected ? 'open' : 'closed'}
                    transition={{ duration: 0.2 }}
                  >
                    <svg
                      className="ml-1 h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </motion.span>
                </button>

                <AnimatePresence mode="wait">
                  {aboutSelected && (
                    <motion.div
                      id="about-content"
                      initial="closed"
                      animate="open"
                      exit="closed"
                      variants={wrapperVariants}
                      style={{ originY: 'top', translateX: '-50%' }}
                      className={`absolute top-[calc(100%+8px)] left-[50%] w-64 rounded-lg shadow-xl border overflow-hidden z-50 ${
                        isScrolled
                          ? 'bg-white border-gray-300 text-black'
                          : 'bg-gray-900/95 backdrop-blur-md border-neutral-600 text-white'
                      }`}
                      onMouseEnter={() => handleDropdownMouseEnter('about')}
                      onMouseLeave={handleAboutMouseLeave}
                      role="menu"
                    >
                      <Bridge />
                      <Nub tabId="about-tab" contentId="about-content" />
                      <div className="p-2">
                        {dropdownItems['About Us'].map((item, index) => (
                          <motion.div
                            key={index}
                            variants={itemVariants}
                            className={`w-full p-2 text-sm font-medium rounded-md transition-colors cursor-pointer ${
                              isScrolled
                                ? 'hover:bg-gray-100 text-slate-700 hover:text-indigo-500'
                                : 'hover:bg-gray-800/50 text-white hover:text-indigo-300'
                            }`}
                            role="menuitem"
                          >
                            <button
                              onClick={(e) => handleAboutLinkClick(e, item.id)}
                              className="block w-full text-left"
                            >
                              {item.name}
                            </button>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Businesses Dropdown */}
              <div
                className="relative"
                ref={businessRef}
                onMouseEnter={handleBusinessMouseEnter}
                onMouseLeave={handleBusinessMouseLeave}
              >
                <button
                  id="business-tab"
                  className={`flex items-center gap-1 rounded-full px-3 py-1.5 text-sm font-medium transition-all duration-200 ${
                    businessSelected
                      ? isScrolled
                        ? 'bg-gray-200 text-black'
                        : 'bg-neutral-800 text-neutral-100'
                      : isScrolled
                      ? 'text-black hover:bg-gray-100'
                      : 'text-white hover:bg-white/10'
                  }`}
                  aria-expanded={businessSelected}
                  aria-haspopup="true"
                >
                  <span>Businesses</span>
                  <motion.span
                    variants={iconVariants}
                    animate={businessSelected ? 'open' : 'closed'}
                    transition={{ duration: 0.2 }}
                  >
                    <svg
                      className="ml-1 h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </motion.span>
                </button>

                <AnimatePresence mode="wait">
                  {businessSelected && (
                    <motion.div
                      id="business-content"
                      initial="closed"
                      animate="open"
                      exit="closed"
                      variants={wrapperVariants}
                      style={{ originY: 'top', translateX: '-50%' }}
                      className={`absolute top-[calc(100%+8px)] left-[50%] w-48 rounded-lg shadow-xl border overflow-hidden z-50 ${
                        isScrolled
                          ? 'bg-white border-gray-300 text-black'
                          : 'bg-gray-900/95 backdrop-blur-md border-neutral-600 text-white'
                      }`}
                      onMouseEnter={() => handleDropdownMouseEnter('business')}
                      onMouseLeave={handleBusinessMouseLeave}
                      role="menu"
                    >
                      <Bridge />
                      <Nub tabId="business-tab" contentId="business-content" />
                      <div className="p-2">
                        {dropdownItems['Businesses'].map((item, index) => (
                          <motion.div
                            key={index}
                            variants={itemVariants}
                            className={`w-full p-2 text-sm font-medium rounded-md transition-colors cursor-pointer ${
                              isScrolled
                                ? 'hover:bg-gray-100 text-slate-700 hover:text-indigo-500'
                                : 'hover:bg-gray-800/50 text-white hover:text-indigo-300'
                            }`}
                            role="menuitem"
                          >
                            <Link
                              href={item.path}
                              className="block w-full text-left"
                            >
                              {item.name}
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link
                href="/social-responsibility"
                className={`${
                  isScrolled ? 'text-black' : 'text-white'
                } hover:text-gray-300 transition-colors duration-200 font-medium`}
              >
                Social Responsibility
              </Link>
              <Link
                href="/contact"
                className={`${
                  isScrolled ? 'text-black' : 'text-white'
                } hover:text-gray-300 transition-colors duration-200 font-medium`}
              >
                Contact Us
              </Link>
            </div>

            {/* Desktop Search Icon - Invisible Placeholder */}
            <div className="hidden lg:flex items-center">
              <div className="w-9 h-9" aria-hidden="true">
                {/* This empty div maintains the same space as the search button */}
              </div>
            </div>

            {/* Mobile Hamburger Menu */}
            <div className="lg:hidden">
              <button
                onClick={toggleMobileMenu}
                className={`p-2 rounded-md transition-colors duration-200 ${
                  isScrolled
                    ? 'text-black hover:bg-gray-100'
                    : 'text-white hover:bg-white/10'
                }`}
                aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              >
                {isMobileMenuOpen ? (
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-gray-900/95 backdrop-blur-md">
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'tween', duration: 0.3 }}
                className="flex flex-col h-full"
              >
                {/* Close Button */}
                <div className="flex justify-end p-4">
                  <button
                    onClick={toggleMobileMenu}
                    className="text-white hover:text-gray-300 transition-colors duration-200 p-2"
                    aria-label="Close menu"
                  >
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                {/* Mobile Navigation Links */}
                <div className="flex-1 px-6 py-4 space-y-4 overflow-y-auto">
                  <Link
                    href="/"
                    className="block text-white text-xl font-medium hover:text-gray-300 transition-colors duration-200 py-2"
                    onClick={handleMobileLinkClick}
                  >
                    Home
                  </Link>

                  {/* About Us Accordion */}
                  <div>
                    <button
                      onClick={() => toggleMobileAccordion('About Us')}
                      className="flex items-center justify-between w-full text-white text-xl font-medium hover:text-gray-300 transition-colors duration-200 py-2"
                      aria-expanded={mobileAccordion['About Us']}
                    >
                      About Us
                      <svg
                        className={`h-5 w-5 transition-transform duration-200 ${
                          mobileAccordion['About Us'] ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                    <AnimatePresence>
                      {mobileAccordion['About Us'] && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-2 ml-4 space-y-2 overflow-hidden"
                        >
                          {dropdownItems['About Us'].map((item, index) => (
                            <button
                              key={index}
                              onClick={(e) => {
                                handleAboutLinkClick(e, item.id);
                                handleMobileLinkClick();
                              }}
                              className="block w-full text-left text-gray-300 text-lg hover:text-white transition-colors duration-200 py-1"
                            >
                              {item.name}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Businesses Accordion */}
                  <div>
                    <button
                      onClick={() => toggleMobileAccordion('Businesses')}
                      className="flex items-center justify-between w-full text-white text-xl font-medium hover:text-gray-300 transition-colors duration-200 py-2"
                      aria-expanded={mobileAccordion['Businesses']}
                    >
                      Businesses
                      <svg
                        className={`h-5 w-5 transition-transform duration-200 ${
                          mobileAccordion['Businesses'] ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                    <AnimatePresence>
                      {mobileAccordion['Businesses'] && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-2 ml-4 space-y-2 overflow-hidden"
                        >
                          {dropdownItems['Businesses'].map((item, index) => (
                            <Link
                              key={index}
                              href={item.path}
                              onClick={handleMobileLinkClick}
                              className="block text-gray-300 text-lg hover:text-white transition-colors duration-200 py-1"
                            >
                              {item.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <Link
                    href="/social-responsibility"
                    className="block text-white text-xl font-medium hover:text-gray-300 transition-colors duration-200 py-2"
                    onClick={handleMobileLinkClick}
                  >
                    Social Responsibility
                  </Link>
                  <Link
                    href="/contact"
                    className="block text-white text-xl font-medium hover:text-gray-300 transition-colors duration-200 py-2"
                    onClick={handleMobileLinkClick}
                  >
                    Contact Us
                  </Link>

                  {/* Mobile Search - Also commented out for consistency */}
                  {/* <div className="pt-4 border-t border-gray-700">
                    <button className="flex items-center text-white text-xl font-medium hover:text-gray-300 transition-colors duration-200 py-2">
                      <svg
                        className="h-5 w-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                      Search
                    </button>
                  </div> */}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;