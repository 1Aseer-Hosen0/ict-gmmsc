import { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Button } from '@/components/ui/button'; // Assuming you have this component
import { Link } from 'react-router-dom'; 
import logo from '@/assets/logo.png';

// A simple hamburger icon component for clarity
const MenuIcon = ({ onClick, isOpen }) => {
    const line1Variants = { open: { rotate: 45, y: 8 }, closed: { rotate: 0, y: 0 } };
    const line2Variants = { open: { opacity: 0 }, closed: { opacity: 1 } };
    const line3Variants = { open: { rotate: -45, y: -8 }, closed: { rotate: 0, y: 0 } };

    return (
        <button onClick={onClick} className="focus:outline-none z-50" aria-label="Toggle Menu">
            <motion.div
                className="w-6 h-0.5 bg-white my-1.5"
                animate={isOpen ? 'open' : 'closed'}
                variants={line1Variants}
                transition={{ duration: 0.3 }}
            />
            <motion.div
                className="w-6 h-0.5 bg-white my-1.5"
                animate={isOpen ? 'open' : 'closed'}
                variants={line2Variants}
                transition={{ duration: 0.3 }}
            />
            <motion.div
                className="w-6 h-0.5 bg-white my-1.5"
                animate={isOpen ? 'open' : 'closed'}
                variants={line3Variants}
                transition={{ duration: 0.3 }}
            />
        </button>
    );
};


const Navbar = () => {
  // State for scroll behavior
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // State for mobile menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Effect to handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Close mobile menu on scroll
      if (isMenuOpen) {
        setIsMenuOpen(false);
      }

      // Navbar visibility and styling logic
      if (currentScrollY === 0) {
        setIsScrolled(false);
        setIsVisible(true);
      } else {
        setIsScrolled(true);
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
          setIsVisible(false); // Hide navbar on scroll down
        } else {
          setIsVisible(true); // Show navbar on scroll up
        }
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, isMenuOpen]);

  // Navigation items
  const navItems = [
    { title: 'Home', href: '/home' },
    { title: 'About', href: '/about' },
    { title: 'Events', href: '/events' },
    { title: 'Gallery', href: '/gallery' },
    { title: 'Blog', href: '/blog' },
    { title: 'Contact', href: '/contact' }
  ];

  // Variants for the mobile menu animation
  const mobileMenuVariants: Variants = {
    closed: { opacity: 0, y: -100, transition: { duration: 0.4, ease: "easeInOut" } },
    open: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeInOut" } },
  };

  return (
    <>
      <motion.nav
        initial={{ y: 0 }}
        animate={{
          y: isVisible ? 0 : -120, // Animate navbar visibility
          backgroundColor: isScrolled ? 'hsla(240, 100%, 3%, 0.95)' : 'transparent',
        }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 backdrop-blur-md border-b border-transparent ${
          isScrolled ? 'mx-4 md:mx-16 lg:mx-32 xl:mx-60 mt-4 rounded-2xl shadow-2xl border-white/10' : 'mx-0 mt-0 rounded-none'
        }`}
      >
        <div className="container mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/">
                <motion.img
                whileHover={{ scale: 1.05 }}
                src={logo}
                alt="ICT Club Logo"
                className="h-12 w-auto"
                />
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <motion.a
                  key={item.title}
                  href={item.href}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95}}
                  className="text-gray-300 hover:text-blue-500 transition-colors duration-300 font-medium relative group"
                >
                  {item.title}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
                </motion.a>
              ))}
            </div>

            {/* Desktop Login Button */}
            <div className="hidden md:block">
                <Link to="/login">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button 
                            variant="outline" 
                            className="bg-transparent border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition-all duration-300"
                        >
                            Login
                        </Button>
                    </motion.div>
                </Link>
            </div>

            {/* Mobile Menu Button (Hamburger) */}
            <div className="md:hidden flex items-center">
                <MenuIcon isOpen={isMenuOpen} onClick={() => setIsMenuOpen(!isMenuOpen)} />
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed top-0 left-0 w-full h-screen bg-black/95 backdrop-blur-lg z-30 md:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full space-y-8">
              {navItems.map((item) => (
                <Link
                  key={`mobile-${item.title}`}
                  to={item.href}
                  className="text-gray-300 hover:text-blue-500 text-2xl font-medium transition-colors duration-300"
                >
                  {item.title}
                </Link>
              ))}
              <Link to="/login">
                <Button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 text-lg rounded-lg transition-colors duration-300">
                  Login
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
