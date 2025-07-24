import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Effect to handle scroll-based styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
      if (window.scrollY > 10) {
        setIsOpen(false); // Close menu when user scrolls
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { title: 'Home', href: '/' },
    { title: 'About', href: '/about' },
    { title: 'Event', href: '/event' },
    { title: 'Gallery', href: '/gallery' },
    { title: 'Blog', href: '/blog' },
    { title: 'Contact', href: '/contact' },
  ];

  // Animation variants for Framer Motion
  const menuVariants = {
    closed: { opacity: 0, height: 0, transition: { duration: 0.3 } },
    open: { opacity: 1, height: 'auto', transition: { duration: 0.4 } },
  };
  const line1Variants = { open: { rotate: 45, y: 5 }, closed: { rotate: 0, y: 0 } };
  const line2Variants = { open: { opacity: 0 }, closed: { opacity: 1 } };
  const line3Variants = { open: { rotate: -45, y: -5 }, closed: { rotate: 0, y: 0 } };

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-[#0d002f]/80 backdrop-blur-lg shadow-xl' : 'bg-[#0d002f]'}`}>
      <div className="container mx-auto flex justify-between items-center p-4 text-white">
        
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold">
          ICT Club
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.title}
              to={link.href}
              className={`relative transition-colors duration-300 ${location.pathname === link.href ? 'text-[#3b82f6]' : 'hover:text-[#3b82f6]'}`}
            >
              {link.title}
              {location.pathname === link.href && (
                <motion.div className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#3b82f6]" layoutId="underline" />
              )}
            </Link>
          ))}
        </div>
        <div className="hidden md:block">
           <Link to="/login">
            <button className="bg-[#3b82f6] hover:bg-blue-600 text-white font-bold py-2 px-5 rounded-lg transition-colors duration-300">
              Login
            </button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none space-y-1.5">
            <motion.div animate={isOpen ? 'open' : 'closed'} variants={line1Variants} className="w-6 h-0.5 bg-white" />
            <motion.div animate={isOpen ? 'open' : 'closed'} variants={line2Variants} className="w-6 h-0.5 bg-white" />
            <motion.div animate={isOpen ? 'open' : 'closed'} variants={line3Variants} className="w-6 h-0.5 bg-white" />
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="md:hidden absolute w-full bg-black/90 backdrop-blur-xl"
          >
            <div className="flex flex-col items-center space-y-6 py-8">
              {navLinks.map((link) => (
                <Link
                  key={`mobile-${link.title}`}
                  to={link.href}
                  className={`text-lg transition-colors duration-300 ${location.pathname === link.href ? 'text-[#3b82f6]' : 'text-white hover:text-[#3b82f6]'}`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.title}
                </Link>
              ))}
              <Link to="/login" onClick={() => setIsOpen(false)}>
                <button className="bg-[#3b82f6] hover:bg-blue-600 text-white font-bold py-2 px-8 rounded-lg transition-colors duration-300">
                  Login
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;