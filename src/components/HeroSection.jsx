import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ─── Ambient Particles ──────────────────────────────────────────────
function Particles() {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 6 + 4,
    delay: Math.random() * 5,
  }))

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-brand-gold/20"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 0.8, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

// ─── Engine Rumble Visualizer ────────────────────────────────────────
function EngineRumble({ active }) {
  return (
    <div className="flex items-center justify-center gap-[3px] h-12">
      {Array.from({ length: 40 }, (_, i) => (
        <motion.div
          key={i}
          className="w-[3px] rounded-full"
          style={{
            background: `linear-gradient(to top, #D4AF37, #F0D060)`,
          }}
          animate={
            active
              ? {
                  height: [4, Math.random() * 32 + 8, 4],
                }
              : { height: 4 }
          }
          transition={{
            duration: 0.3 + Math.random() * 0.4,
            repeat: Infinity,
            delay: i * 0.03,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

// ─── Hero Section ────────────────────────────────────────────────────
export default function HeroSection() {
  const [phase, setPhase] = useState('start') // start → rumble → car-entry → show-content
  const [rumbleProgress, setRumbleProgress] = useState(0)
  const [carInView, setCarInView] = useState(false)
  const [logoDropped, setLogoDropped] = useState(false)
  const rumbleTimerRef = useRef(null)

  // Phase progression
  useEffect(() => {
    // Phase 1: Black start (0-1s)
    const t1 = setTimeout(() => setPhase('rumble'), 1000)
    return () => clearTimeout(t1)
  }, [])

  // Rumble buildup
  useEffect(() => {
    if (phase !== 'rumble') return

    const interval = setInterval(() => {
      setRumbleProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => setPhase('car-entry'), 400)
          return 100
        }
        return prev + 2
      })
    }, 60)

    return () => clearInterval(interval)
  }, [phase])

  // Car entry animation triggered
  useEffect(() => {
    if (phase === 'car-entry') {
      const t = setTimeout(() => {
        setCarInView(true)
        setTimeout(() => setPhase('show-content'), 600)
      }, 300)
      return () => clearTimeout(t)
    }
  }, [phase])

  // Logo drop after content phase
  useEffect(() => {
    if (phase === 'show-content') {
      const t = setTimeout(() => setLogoDropped(true), 400)
      return () => clearTimeout(t)
    }
  }, [phase])

  // ─── Rumble screen ──────────────────────────────────────────────
  if (phase === 'start') {
    return (
      <div className="relative w-full h-screen bg-black flex items-center justify-center overflow-hidden">
        <motion.div
          initial={{ opacity: 1 }}
          className="text-center"
        >
          <motion.p
            className="text-brand-gold/40 text-xs tracking-[0.3em] uppercase font-body"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            Initializing
          </motion.p>
        </motion.div>
      </div>
    )
  }

  // ─── Rumble buildup ─────────────────────────────────────────────
  if (phase === 'rumble') {
    return (
      <div className="relative w-full h-screen bg-black flex flex-col items-center justify-center overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center space-y-8"
        >
          <p className="text-brand-gold/50 text-sm tracking-[0.25em] uppercase font-body">
            Engine Starting
          </p>

          <EngineRumble active={true} />

          {/* Rumble progress bar */}
          <div className="w-48 h-[2px] bg-brand-gold/10 rounded-full overflow-hidden mx-auto">
            <motion.div
              className="h-full gold-gradient rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: `${rumbleProgress}%` }}
              transition={{ duration: 0.1, ease: 'linear' }}
            />
          </div>

          <motion.p
            className="text-brand-gold/30 text-xs tracking-[0.15em]"
            animate={{ opacity: [0.2, 0.6, 0.2] }}
            transition={{ duration: 0.8, repeat: Infinity }}
          >
            {Math.min(Math.floor(rumbleProgress / 10) + 1, 10)}% Power
          </motion.p>
        </motion.div>

        {/* Particles during rumble */}
        <Particles />
      </div>
    )
  }

  // ─── Main hero content ──────────────────────────────────────────
  return (
    <section className="relative w-full h-screen overflow-hidden bg-brand-black">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-black via-brand-charcoal to-brand-black" />

      {/* Subtle overlay patterns */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, #D4AF37 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Gold accent gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent" />

      {/* Ambient particles */}
      <Particles />

      {/* Car entry animation - using designer's hero cinematic */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          initial={{ x: '120%', opacity: 0, filter: 'blur(8px)' }}
          animate={
            carInView
              ? { x: '0%', opacity: 1, filter: 'blur(0px)' }
              : { x: '120%', opacity: 0, filter: 'blur(8px)' }
          }
          transition={{
            duration: 1.2,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="w-full h-full absolute inset-0"
        >
          {/* Hero cinematic image */}
          <img
            src="/images/hero-cinematic.jpg"
            alt="Luxury sedan at golden hour"
            className="w-full h-full object-cover"
          />

          {/* Cinematic gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-brand-black/80 via-brand-black/30 to-brand-black/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/60 to-transparent" />

          {/* Motion blur streak during entry */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-gold/10 to-transparent"
            initial={{ x: '-100%', opacity: 0 }}
            animate={
              carInView
                ? { x: '100%', opacity: [0, 0.3, 0], scaleX: [0, 1.5, 0] }
                : {}
            }
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            style={{ filter: 'blur(20px)' }}
          />
        </motion.div>
      </div>

      {/* Content overlay */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4">
        {/* Logo - using designer's logo-main.png */}
        <motion.div
          initial={{ y: -120, opacity: 0, rotate: -5 }}
          animate={
            logoDropped
              ? {
                  y: 0,
                  opacity: 1,
                  rotate: 0,
                  transition: {
                    type: 'spring',
                    stiffness: 200,
                    damping: 15,
                    mass: 1.5,
                  },
                }
              : {}
          }
          className="mb-6 w-72 md:w-96"
        >
          <img
            src="/images/logo-main.png"
            alt="Sparkle & Bling"
            className="w-full h-auto"
          />
        </motion.div>

        {/* Gold pulse ring behind logo */}
        <motion.div
          className="absolute w-40 h-40 rounded-full border border-brand-gold/20"
          animate={
            logoDropped
              ? {
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 0, 0.3],
                }
              : {}
          }
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={
            logoDropped
              ? { opacity: 1, y: 0 }
              : {}
          }
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-2xl md:text-4xl lg:text-5xl font-display text-center leading-tight mb-4"
        >
          <span className="text-white/90">Where<br className="md:hidden" /></span>{' '}
          <span className="chrome-text">Luxury Meets</span>{' '}
          <span className="text-white/90">Perfection</span>
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={
            logoDropped
              ? { opacity: 1, y: 0 }
              : {}
          }
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-sm md:text-base text-brand-silver/60 font-light text-center max-w-xl mb-10"
        >
          Premium mobile auto detailing and certified ceramic coating —
          bringing showroom-quality care directly to your doorstep.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={
            logoDropped
              ? { opacity: 1, y: 0 }
              : {}
          }
          transition={{ duration: 0.6, delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          {/* Primary CTA */}
          <motion.a
            href="#quote"
            className="cta-button gold-gradient text-brand-black font-semibold px-8 py-4 rounded-lg text-sm tracking-wider uppercase"
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(212,175,55,0.4)' }}
            whileTap={{ scale: 0.98 }}
          >
            Get a Quote
          </motion.a>

          {/* Secondary CTA */}
          <motion.a
            href="#services"
            className="cta-button gold-border text-brand-gold px-8 py-4 rounded-lg text-sm tracking-wider uppercase font-medium bg-brand-dark/50 hover:bg-brand-dark/80"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            See Our Services
          </motion.a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-brand-gold/30 text-xs tracking-[0.2em] uppercase">
              Scroll
            </span>
            <div className="w-[1px] h-8 bg-gradient-to-b from-brand-gold/40 to-transparent" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}