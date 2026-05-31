import { useState, useEffect } from 'react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Writing', href: '#writing' },
    { name: 'Guestbook', href: '#guestbook' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white border-b-4 border-black' 
        : 'bg-transparent'
    }`}>
      {/* Venezuelan flag accent */}
      {isScrolled && (
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 via-blue-600 to-red-600"></div>
      )}
      
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <a 
            href="#" 
            className={`text-3xl font-black transition-colors duration-300 ${
              isScrolled ? 'text-black' : 'text-white'
            }`}
          >
            CÉSAR
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`font-bold text-lg uppercase tracking-wide transition-colors duration-300 ${
                  isScrolled 
                    ? 'text-black hover:text-blue-600' 
                    : 'text-white hover:text-yellow-400'
                }`}
              >
                {item.name}
              </a>
            ))}
            <a
              href="#contact"
              className={`px-6 py-3 font-bold text-sm uppercase tracking-wide transition-all duration-300 ${
                isScrolled 
                  ? 'bg-red-600 text-white hover:bg-red-700' 
                  : 'border-4 border-white text-white hover:bg-white hover:text-black'
              }`}
            >
              CONTACT
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            className={`md:hidden p-2 transition-colors duration-300 ${
              isScrolled ? 'text-black' : 'text-white'
            }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg className="w-8 h-8 stroke-[3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t-4 border-black">
            <div className="px-4 py-4 space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block px-4 py-3 text-black font-bold text-lg uppercase tracking-wide hover:text-blue-600 transition-colors duration-300 border-l-4 border-transparent hover:border-blue-600"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <a
                href="#contact"
                className="block mx-4 mt-6 px-6 py-4 bg-red-600 text-white text-center font-bold text-sm uppercase tracking-wide hover:bg-red-700 transition-colors duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                CONTACT
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;