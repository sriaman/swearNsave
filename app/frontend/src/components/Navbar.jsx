import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Zap } from 'lucide-react';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Fitness', path: '/fitness' },
  { label: 'Finance', path: '/finance' },
  { label: 'Wellness', path: '/wellness' },
  { label: 'Blog', path: '/blog' },
  { label: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <nav
      data-testid='navbar'
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-xl shadow-sm'
          : 'bg-white/80 backdrop-blur-xl'
      } border-b border-zinc-200`}
    >
      <div className='max-w-7xl mx-auto px-6 md:px-12'>
        <div className='flex items-center justify-between h-16'>
          {/* Logo */}
          <Link
            to='/'
            data-testid='navbar-logo'
            className='flex items-center gap-2 group'
          >
            <div className='w-8 h-8 bg-zinc-900 flex items-center justify-center group-hover:bg-orange-500 transition-colors duration-300'>
              <Zap className='w-4 h-4 text-white' strokeWidth={2.5} />
            </div>
            <span className='font-display font-black text-zinc-900 text-lg tracking-tight'>
              Sweat<span className='text-orange-500'>&</span>Save
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className='hidden md:flex items-center gap-8'>
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                data-testid={`nav-${link.label.toLowerCase()}-link`}
                className={`text-sm font-semibold transition-colors duration-200 relative after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-[2px] after:bg-orange-500 after:transition-all after:duration-300 hover:after:w-full ${
                  location.pathname === link.path
                    ? 'text-zinc-900 after:w-full'
                    : 'text-zinc-500 hover:text-zinc-900'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className='hidden md:block'>
            <Link
              to='/contact'
              data-testid='navbar-cta-btn'
              className='bg-zinc-900 text-white font-bold text-sm px-5 py-2.5 hover:bg-orange-500 transition-colors duration-300'
            >
              Join Newsletter
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            data-testid='navbar-mobile-toggle'
            onClick={() => setOpen(!open)}
            className='md:hidden p-2 text-zinc-700 hover:text-zinc-900'
            aria-label='Toggle menu'
          >
            {open ? <X className='w-6 h-6' /> : <Menu className='w-6 h-6' />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <div
          data-testid='navbar-mobile-menu'
          className='md:hidden bg-white border-t border-zinc-200 px-6 py-4 flex flex-col gap-4'
        >
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              data-testid={`mobile-nav-${link.label.toLowerCase()}-link`}
              className={`text-base font-semibold py-2 border-b border-zinc-100 ${
                location.pathname === link.path
                  ? 'text-orange-500'
                  : 'text-zinc-700'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to='/contact'
            className='bg-zinc-900 text-white font-bold text-sm px-5 py-3 text-center hover:bg-orange-500 transition-colors duration-300 mt-2'
          >
            Join Newsletter
          </Link>
        </div>
      )}
    </nav>
  );
}