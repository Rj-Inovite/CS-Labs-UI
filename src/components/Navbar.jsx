import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaHome,
  FaLock,
  FaUserCircle,
  FaGraduationCap,
  FaSearch,
  FaBars,
  FaTimes,
  FaSignOutAlt,
  FaBell,
  FaStar,
  FaUsers,
  FaBookOpen,
  FaFlask,
  FaProjectDiagram
} from 'react-icons/fa';
import '../styles/Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const navItems = [
    { icon: FaHome, text: 'Home', path: '/', hash: '' },
    { icon: FaBookOpen, text: 'Our Manifesto', path: '/', hash: 'manifesto' },
    { icon: FaUsers, text: 'Community', path: '/', hash: 'community' },
    { icon: FaGraduationCap, text: 'Incubation Tracks', path: '/', hash: 'tracks' },
    { icon: FaFlask, text: 'Software Labs', path: '/', hash: 'labs' },
    { icon: FaFlask, text: 'Terms & Conditions ', path: '/', hash: 'terms' },
    { icon: FaFlask, text: 'Pricing', path: '/', hash: 'pricing' },
    { icon: FaFlask, text: 'Policy ', path: '/', hash: 'policy' },
  
  ];

  const profileMenuItems = [
    { icon: FaUserCircle, text: 'My Profile', path: '/profile' },
    { icon: FaProjectDiagram, text: 'My Tracks', path: '/my-courses' },
    { icon: FaProjectDiagram, text: 'Progress Dashboard', path: '/progress' },
    { icon: FaProjectDiagram, text: 'Saved Programs', path: '/saved' },
    { icon: FaProjectDiagram, text: 'Settings', path: '/settings' },
    { icon: FaSignOutAlt, text: 'Logout', path: '/logout', action: 'logout' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isProfileOpen && !e.target.closest('.profile-section')) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isProfileOpen]);

  const handleNavigation = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);

    if (section) {
      section.scrollIntoView({ behavior: 'auto', block: 'start' });
      return true;
    }

    const homeContainer = document.querySelector('.home-container');
    if (sectionId === 'home' && homeContainer) {
      homeContainer.scrollTo({ top: 0, behavior: 'auto' });
      return true;
    }

    return false;
  };

  const handleSectionNavigation = (item) => {
    const targetHash = item.hash || '';
    navigate(targetHash ? `/${targetHash}` : '/', { replace: true });
    scrollToSection(targetHash || 'home');
    setIsMenuOpen(false);
  };

  const isSectionActive = (item) => {
    if (item.hash) {
      return location.pathname === '/' && location.hash === `#${item.hash}`;
    }

    return location.pathname === '/' && !location.hash;
  };

  const handleProfileAction = (item) => {
    if (item.action === 'logout') {
      setIsLoggedIn(false);
      setIsProfileOpen(false);
      navigate('/login');
    } else {
      navigate(item.path);
      setIsProfileOpen(false);
    }
  };

  return (
    <>
      <motion.nav
        className={`navbar ${isScrolled ? 'scrolled' : ''}`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="navbar-container">
          <motion.div
            className="navbar-brand"
            whileHover={{ scale: 1.05 }}
            onClick={() => {
              handleNavigation('/');
              scrollToSection('home');
            }}
          >
            <motion.div
              className="brand-icon"
              animate={{
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <FaGraduationCap />
            </motion.div>
            <div className="brand-text">
              <motion.h1
                className="brand-name"
                whileHover={{
                  textShadow: '0 0 20px rgba(212, 175, 55, 0.6)',
                }}
              >
                CS Labs
              </motion.h1>
              <p className="brand-tagline">Learn • Practice • Master</p>
            </div>
            <div className="brand-shimmer"></div>
          </motion.div>

          <div className="navbar-center">
            <ul className="nav-menu">
              {navItems.map((item, index) => {
                const Icon = item.icon;
                const isActive = isSectionActive(item);
                return (
                  <motion.li
                    key={`${item.text}-${item.hash || 'home'}`}
                    className={`nav-item ${isActive ? 'active' : ''}`}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                  >
                    <motion.button
                      className="nav-link"
                      onClick={() => handleSectionNavigation(item)}
                      whileHover={{ y: -3 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <motion.div
                        className="nav-icon"
                        whileHover={{ y: -2 }}
                        transition={{ type: 'spring', stiffness: 500 }}
                      >
                        <Icon />
                      </motion.div>
                      <span>{item.text}</span>
                      <span className="nav-underline"></span>
                      <span className="nav-ripple"></span>
                    </motion.button>
                  </motion.li>
                );
              })}
            </ul>

            {!isLoggedIn && (
              <div className="auth-buttons">
                <motion.button
                  className="auth-btn login-btn"
                  onClick={() => handleNavigation('/login')}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <FaLock />
                  <span>Login</span>
                </motion.button>
                <motion.button
                  className="auth-btn signup-btn"
                  onClick={() => handleNavigation('/signup')}
                  whileHover={{
                    scale: 1.05,
                    y: -2,
                    boxShadow: '0 10px 30px rgba(212, 175, 55, 0.4)',
                  }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <FaStar />
                  <span>Sign Up</span>
                  <span className="button-shimmer"></span>
                </motion.button>
              </div>
            )}
          </div>

          <div className="navbar-right">
            <motion.div
              className={`search-bar ${isSearchFocused ? 'focused' : ''}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
            >
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search courses..."
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
              />
            </motion.div>

            {isLoggedIn && (
              <motion.div
                className="notification-icon"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
              >
                <FaBell />
                <span className="notification-badge">3</span>
              </motion.div>
            )}

            <motion.div
              className="profile-section"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 }}
            >
              <motion.button
                className="profile-button"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isLoggedIn ? (
                  <>
                    <div className="profile-avatar">
                      <span>JD</span>
                      <span className="online-status"></span>
                    </div>
                  </>
                ) : (
                  <div className="profile-placeholder">
                    <FaUserCircle />
                  </div>
                )}
              </motion.button>

              <AnimatePresence>
                {isProfileOpen && isLoggedIn && (
                  <motion.div
                    className="profile-dropdown"
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    {profileMenuItems.map((item, index) => {
                      const Icon = item.icon;
                      return (
                        <motion.button
                          key={item.text}
                          className="dropdown-item"
                          onClick={() => handleProfileAction(item)}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          whileHover={{ x: 5, backgroundColor: 'rgba(106, 13, 37, 0.05)' }}
                        >
                          <Icon className="dropdown-icon" />
                          <span>{item.text}</span>
                        </motion.button>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            <motion.button
              className="mobile-menu-button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </motion.button>
          </div>
        </div>

        <motion.div
          className="navbar-glow"
          animate={{
            left: mousePosition.x,
          }}
          transition={{ type: 'spring', damping: 30, stiffness: 200 }}
        />
      </motion.nav>

      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              className="mobile-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
            />
            <motion.div
              className="mobile-drawer"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <div className="mobile-header">
                <div className="mobile-brand">
                  <FaGraduationCap />
                  <div>
                    <h2>CS Labs</h2>
                    <p>Learn • Practice • Master</p>
                  </div>
                </div>
                <button className="mobile-close" onClick={() => setIsMenuOpen(false)}>
                  <FaTimes />
                </button>
              </div>

              <div className="mobile-menu">
                {navItems.map((item, index) => {
                  const Icon = item.icon;
                  const isActive = isSectionActive(item);
                  return (
                    <motion.button
                      key={`${item.text}-${item.hash || 'home'}`}
                      className={`mobile-nav-item ${isActive ? 'active' : ''}`}
                      onClick={() => handleSectionNavigation(item)}
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Icon />
                      <span>{item.text}</span>
                    </motion.button>
                  );
                })}

                {!isLoggedIn && (
                  <>
                    <motion.button
                      className="mobile-nav-item login"
                      onClick={() => handleNavigation('/login')}
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaLock />
                      <span>Login</span>
                    </motion.button>
                    <motion.button
                      className="mobile-nav-item signup"
                      onClick={() => handleNavigation('/signup')}
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaStar />
                      <span>Sign Up</span>
                    </motion.button>
                  </>
                )}
              </div>

              {isLoggedIn && (
                <div className="mobile-profile-section">
                  <div className="mobile-profile-header">
                    <div className="mobile-avatar">
                      <span>JD</span>
                      <span className="online-status"></span>
                    </div>
                    <div>
                      <h3>John Doe</h3>
                      <p>john.doe@example.com</p>
                    </div>
                  </div>
                  <div className="mobile-profile-menu">
                    {profileMenuItems.map((item, index) => {
                      const Icon = item.icon;
                      return (
                        <motion.button
                          key={item.text}
                          className="mobile-profile-item"
                          onClick={() => handleProfileAction(item)}
                          initial={{ opacity: 0, x: -30 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.6 + index * 0.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Icon />
                          <span>{item.text}</span>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="navbar-spacer"></div>
    </>
  );
};

export default Navbar;
