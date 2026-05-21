import React, { useState, useEffect, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { FiMenu, FiChevronDown, FiX, FiArrowRight } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { LogoWhite, LogoBlue, LogoBlack } from '../assets';

const NAV_ITEMS = [
  { label: 'HOME', href: '/' },
  { label: 'ABOUT US', href: '/#about-us' },
  { label: 'DESTINATION', href: '/#destination' },
  { label: 'BLOG', href: '/blogs' },
];

const Header = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const lastScrollY = useRef(0);

  // Check if we are on a page where the header should ALWAYS be solid (like /stays/123)
  const isAlwaysSolid = location.pathname.includes('/stays');

  // Combine scroll state with our specific page check
  const showSolidStyle = isScrolled || isAlwaysSolid;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < lastScrollY.current || currentScrollY < 10) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY.current && !isMobileMenuOpen) {
        setIsVisible(false);
      }

      if (currentScrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  const checkActive = (itemHref) => {
    if (itemHref === '/') {
      // It's the home link, only active if path is '/' AND there is no hash
      return location.pathname === '/' && !location.hash;
    }

    if (itemHref.startsWith('/#')) {
      // It's a hash link, active if we are on '/' AND hash matches
      return location.pathname === '/' && location.hash === itemHref.substring(1);
    }

    // Default logic for other paths
    return location.pathname.startsWith(itemHref);
  };

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        // Small timeout ensures the page has rendered if we just navigated to HOME
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  return (
    <>
      {/* ================= DESKTOP HEADER ================= */}
      <header
        className={`
          fixed top-0 left-0 right-0 z-50 flex items-center justify-between w-11/12 mx-auto py-4 xl:py-6 
          transition-transform duration-300 ease-in-out
          ${isVisible ? 'translate-y-0 ' : '-translate-y-[200%]'} 
        `}
      >
        <Link to={'/'} aria-label="Go to TripScribe homepage" className="text-4xl text-white tracking-wide cursor-pointer font-messiri transition-all duration-200">
          <img width="240" height="64" className='-ml-3.5 -mt-2 h-14 xl:h-16 object-contain transition-all duration-200' src={showSolidStyle ? LogoBlue : LogoWhite} alt="Logo" />
        </Link>

        <nav className={`hidden xl:flex items-center gap-2 rounded-full border border-white/30 ${showSolidStyle ? 'bg-primary' : 'bg-white/5'} px-2 py-2 transition-all duration-200 backdrop-blur-sm`}>
          {NAV_ITEMS.map((item, index) => (
            <DesktopNavItem
              key={index}
              item={item}
              isActive={checkActive(item.href)}
            />
          ))}
        </nav>

        <button
          onClick={() => setIsMobileMenuOpen(true)}
          aria-label="Open mobile menu"
          className={` ${showSolidStyle ? 'text-white bg-primary' : 'text-white'} hover:text-gray-300 transition-transform hover:scale-105 active:scale-95 xl:hidden`}
        >
          <FiMenu size={32} strokeWidth={1.5} />
        </button>
        <Link to={'/contact'} className={`hidden xl:block text-sm border border-white/30 ${showSolidStyle ? 'bg-primary' : 'bg-white/10'} px-10 text-white py-4 uppercase transition-all duration-200 backdrop-blur-sm rounded-full`}>
          get in touch
        </Link>
      </header>

      {/* ================= MOBILE MENU MODAL ================= */}
      <div className={`fixed flex flex-col h-full justify-between inset-0 z-[100] bg-[#0f0f0f] px-6 py-6 transition-opacity duration-300 xl:hidden ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
        <div className="flex items-center justify-between mb-8">
          <img className='-ml-3.5 -mt-2 h-14 xl:h-16 object-contain transition-all duration-200' src={showSolidStyle ? LogoBlue : LogoWhite} alt="Logo" />

          <button
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close mobile menu"
            className="text-white hover:text-gray-300 transition-transform hover:rotate-90"
          >
            <FiX size={32} strokeWidth={1.5} />
          </button>
        </div>

        <div className="flex flex-col gap-2 max-h-[80vh] overflow-y-auto">
          {NAV_ITEMS.map((item, index) => (
            <MobileNavItem
              key={index}
              item={item}
              isActive={checkActive(item.href)}
              closeMenu={() => setIsMobileMenuOpen(false)}
            />
          ))}
        </div>
        <Link to={'/contact'} onClick={() => setIsMobileMenuOpen(false)}
          className="group flex items-center justify-center gap-3 rounded-full bg-white px-8 py-4 text-black transition hover:bg-gray-200">
          <span className="text-xs tracking-widest">GET STARTED</span>
          <FiArrowRight
            size={15}
            className="transition-transform group-hover:translate-x-1"
          />
        </Link>
      </div>
    </>
  );
};

// ================= SUBCOMPONENTS =================

const DesktopNavItem = ({ item, isActive }) => {
  const hasSubmenu = item.submenu && item.submenu.length > 0;

  return (
    <div className="group relative h-full">
      {isActive && (
        <motion.div
          layoutId="navbar-active"
          className="absolute inset-0 rounded-full bg-white backdrop-blur-[6px]"
          transition={{
            type: "spring",
            bounce: 0.2,
            duration: 0.6
          }}
        />
      )}

      <Link
        to={item.href}
        onClick={(e) => {
          if (item.href.startsWith('/#') && window.location.pathname === '/') {
            e.preventDefault();
            const id = item.href.substring(2);
            const element = document.getElementById(id);
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
              window.history.pushState(null, '', item.href);
            }
          }
        }}
        className={`
          relative z-10 flex items-center gap-1 px-5 py-2.5 text-sm tracking-widest transition-colors duration-200
          ${isActive ? 'text-black' : 'text-white hover:text-gray-300'}
        `}
      >
        {item.label}
        {hasSubmenu && (
          <FiChevronDown
            size={14}
            className={`transition-transform duration-300 ${isActive ? '' : 'group-hover:-rotate-180'}`}
          />
        )}
      </Link>

      {!isActive && hasSubmenu && (
        <div className="absolute left-1/2 top-full mt-2 w-fit min-w-52 text-nowrap -translate-x-1/2 opacity-0 invisible translate-y-2 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:visible group-hover:translate-y-0">
          <div className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 bg-white shadow-sm" />
          <div className="relative overflow-hidden rounded-xl bg-white py-2 shadow-xl">
            {item.submenu.map((subItem, idx) => (
              <Link
                key={idx}
                to={subItem.href}
                className="block px-6 py-2.5 text-sm tracking-widest text-gray-800 transition-colors hover:bg-gray-100 hover:text-black"
              >
                {subItem.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const MobileNavItem = ({ item, isActive, closeMenu }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasSubmenu = item.submenu && item.submenu.length > 0;

  const handleToggle = (e) => {
    if (hasSubmenu) {
      e.preventDefault();
      setIsExpanded(!isExpanded);
    } else {
      closeMenu();
    }
  };

  return (
    <div className="w-full">
      <div
        onClick={handleToggle}
        className={`
          flex items-center justify-between w-full px-4 py-4 
          text-[11px] font-bold tracking-widest rounded-full cursor-pointer select-none
          transition-colors duration-200
          ${isActive ? 'bg-white/10 text-white' : 'text-white hover:bg-white/5'}
        `}
      >
        {hasSubmenu ? (
          <span className="flex-1">{item.label}</span>
        ) : (
          <Link
            to={item.href}
            className="flex-1"
            onClick={(e) => {
              if (item.href.startsWith('/#') && window.location.pathname === '/') {
                e.preventDefault();
                const id = item.href.substring(2);
                const element = document.getElementById(id);
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                  window.history.pushState(null, '', item.href);
                  closeMenu();
                }
              } else if (!hasSubmenu) {
                closeMenu();
              }
            }}
          >
            {item.label}
          </Link>
        )}

        {hasSubmenu && (
          <FiChevronDown
            size={16}
            className={`text-white/70 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
          />
        )}

      </div>

      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="flex flex-col gap-2 pt-2 pb-2 pl-8 border-l border-white/10 ml-6 my-2">
          {item.submenu?.map((subItem, idx) => (
            <Link
              key={idx}
              to={subItem.href}
              onClick={closeMenu}
              className="text-xs text-gray-400 hover:text-white py-2 tracking-wide block transition-colors"
            >
              {subItem.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Header;