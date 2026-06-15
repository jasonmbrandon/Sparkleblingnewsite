import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services & Pricing' },
  { to: '/ceramic-coating', label: 'Ceramic Coating' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/blogs', label: 'Blog' },
  { to: '/get-a-quote', label: 'Get a Quote' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-brand-black/90 backdrop-blur-lg border-b border-brand-gold/10'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img
              src="/images/logo-badge.png"
              alt="Sparkle & Bling"
              className="h-8 w-8 md:h-10 md:w-10 object-contain"
            />
            <div className="hidden sm:block">
              <span className="text-sm font-display text-white/90 tracking-wider">
                SPARKLE & BLING
              </span>
              <span className="block text-[8px] text-brand-gold/50 tracking-[0.2em] uppercase">
                Mobile Auto Detail
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm tracking-wider uppercase transition-colors duration-300 ${
                  location.pathname === link.to
                    ? 'text-brand-gold'
                    : 'text-white/60 hover:text-brand-gold/80'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="tel:+16614815317"
              className="gold-gradient text-brand-black text-xs font-semibold px-4 py-2 rounded-lg tracking-wider uppercase hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all duration-300"
            >
              (661) 481-5317
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2"
            aria-label="Toggle menu"
          >
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              className="block w-6 h-[2px] bg-brand-gold rounded-full"
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block w-6 h-[2px] bg-brand-gold rounded-full"
            />
            <motion.span
              animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              className="block w-6 h-[2px] bg-brand-gold rounded-full"
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-brand-black/95 backdrop-blur-lg border-t border-brand-gold/10"
          >
            <div className="px-4 py-6 space-y-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`block text-sm tracking-wider uppercase py-2 ${
                    location.pathname === link.to
                      ? 'text-brand-gold'
                      : 'text-white/60'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="tel:+16614815317"
                className="block gold-gradient text-brand-black text-center text-xs font-semibold px-4 py-3 rounded-lg tracking-wider uppercase mt-4"
              >
                (661) 481-5317
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}