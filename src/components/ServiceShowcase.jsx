import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ─── Service Data ──────────────────────────────────────────────────
const SERVICES = [
  {
    id: 'ceramic',
    title: 'Ceramic & Graphene Coating',
    tagline: 'Ultimate Paint Protection',
    price: '$450–$1,250+',
    description: 'Premium nano-ceramic coating with graphene infusion. Provides unmatched UV protection, hydrophobic properties, and a deep, mirror-like gloss that lasts years.',
    features: ['5-Year Durability', 'UV & Chemical Resistant', 'Self-Cleaning Properties', 'Deep Mirror Gloss'],
    hotspotPosition: { x: 72, y: 38 }, // near hood
    color: '#D4AF37',
  },
  {
    id: 'paint-correction',
    title: 'Paint Correction',
    tagline: 'Restore the Perfection',
    price: '$450–$850+',
    description: 'Multi-stage paint correction to remove swirl marks, light scratches, and oxidation. Restores your paint to a showroom-quality, flawless finish.',
    features: ['Swirl Mark Removal', 'Scratch Removal', 'Oxidation Correction', 'Showroom Finish'],
    hotspotPosition: { x: 55, y: 25 }, // on roof
    color: '#E8C76A',
  },
  {
    id: 'interior',
    title: 'Interior Detailing',
    tagline: 'Sanitized & Pristine',
    price: '$200–$350',
    description: 'Deep interior cleaning using steam extraction and leather conditioning. Removes stains, odors, and allergens for a germ-free, luxurious cabin.',
    features: ['Steam Extraction', 'Leather Conditioning', 'Odor Removal', 'UV Protection'],
    hotspotPosition: { x: 35, y: 30 }, // on windshield area
    color: '#C0C0C0',
  },
  {
    id: 'full-detail',
    title: 'Full Detail Package',
    tagline: 'Complete Transformation',
    price: '$300–$450',
    description: 'Our most comprehensive package combining interior and exterior detailing. Includes paint decontamination, clay bar treatment, and premium wax finish.',
    features: ['Exterior + Interior', 'Clay Bar Treatment', 'Premium Wax Finish', 'Tire & Trim Restoration'],
    hotspotPosition: { x: 30, y: 55 }, // near rear wheel
    color: '#F0D060',
  },
  {
    id: 'headlight',
    title: 'Headlight Restoration',
    tagline: 'See Clearly Again',
    price: '$100–$175',
    description: 'Professional headlight restoration using wet sanding and UV-sealant coating. Restores clarity and removes yellowing for maximum night visibility.',
    features: ['Oxidation Removal', 'UV Sealant Coating', 'Restored Clarity', '24-Hour Curing'],
    hotspotPosition: { x: 88, y: 45 }, // near headlight
    color: '#FFD700',
  },
]

// ─── Glowing Hotspot ───────────────────────────────────────────────
function HotspotDot({ service, isActive, onClick, index }) {
  return (
    <motion.button
      onClick={onClick}
      className="absolute z-20"
      style={{ left: `${service.hotspotPosition.x}%`, top: `${service.hotspotPosition.y}%` }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.2 + index * 0.15, type: 'spring', stiffness: 200, damping: 15 }}
      whileHover={{ scale: 1.3 }}
    >
      {/* Outer rings */}
      <div className="relative flex items-center justify-center">
        <motion.div
          className="absolute w-10 h-10 rounded-full"
          style={{
            border: `2px solid ${service.color}`,
            background: `radial-gradient(circle, ${service.color}22, transparent)`,
          }}
          animate={
            isActive
              ? { scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }
              : { scale: [1, 1.3, 1], opacity: [0.3, 0.1, 0.3] }
          }
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute w-6 h-6 rounded-full"
          style={{
            border: `1px solid ${service.color}88`,
            background: `radial-gradient(circle, ${service.color}44, transparent)`,
          }}
          animate={
            isActive
              ? { scale: [1, 1.2, 1], opacity: [0.7, 0.2, 0.7] }
              : { scale: [1, 1.15, 1], opacity: [0.5, 0.2, 0.5] }
          }
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
        />
        {/* Core dot */}
        <motion.div
          className="w-3 h-3 rounded-full z-10"
          style={{ backgroundColor: service.color, boxShadow: `0 0 12px ${service.color}88` }}
          animate={{ scale: isActive ? 1.4 : 1 }}
          transition={{ duration: 0.3 }}
        />
        {/* Label */}
        <span
          className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-wider whitespace-nowrap font-medium"
          style={{ color: isActive ? service.color : `${service.color}88` }}
        >
          {service.title.split(' ')[0]}
        </span>
      </div>
    </motion.button>
  )
}

// ─── Service Card ──────────────────────────────────────────────────
function ServiceCard({ service, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      className="glass-card rounded-xl p-6 md:p-8 max-w-md relative"
      style={{
        borderColor: `${service.color}44`,
        boxShadow: `0 0 30px ${service.color}22`,
      }}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center text-white/40 hover:text-white/80 transition-colors border border-white/10 hover:border-white/30"
      >
        ✕
      </button>

      {/* Service tag */}
      <div
        className="inline-block px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-medium mb-3"
        style={{
          backgroundColor: `${service.color}22`,
          color: service.color,
          border: `1px solid ${service.color}44`,
        }}
      >
        {service.tagline}
      </div>

      <h3 className="text-xl md:text-2xl font-display text-white mb-1">{service.title}</h3>

      <div className="chrome-text text-lg font-semibold font-body mb-4">{service.price}</div>

      <p className="text-brand-silver/70 text-sm leading-relaxed mb-5">
        {service.description}
      </p>

      {/* Features */}
      <div className="grid grid-cols-2 gap-2 mb-6">
        {service.features.map((feature) => (
          <div key={feature} className="flex items-center gap-2 text-xs text-white/60">
            <span style={{ color: service.color }}>◆</span>
            {feature}
          </div>
        ))}
      </div>

      {/* Book Button */}
      <motion.a
        href="#quote"
        className="cta-button gold-gradient text-brand-black font-semibold px-6 py-3 rounded-lg text-sm tracking-wider uppercase w-full block text-center"
        style={{
          boxShadow: `0 4px 20px ${service.color}33`,
        }}
        whileHover={{ scale: 1.02, boxShadow: `0 0 30px ${service.color}55` }}
        whileTap={{ scale: 0.98 }}
      >
        Book This Service
      </motion.a>
    </motion.div>
  )
}

// ─── Car Viewer ────────────────────────────────────────────────────
function CarViewer({ activeAngle, onAngleChange }) {
  const angles = [
    { id: 'front', src: '/images/car-front-angle.png', label: 'Front' },
    { id: 'side', src: '/images/car-side-profile.png', label: 'Side' },
    { id: 'rear', src: '/images/car-rear-angle.png', label: 'Rear' },
  ]

  return (
    <div className="relative w-full max-w-3xl mx-auto">
      {/* Car image container */}
      <div className="relative aspect-[3/2] overflow-hidden rounded-xl">
        <AnimatePresence mode="wait">
          <motion.img
            key={activeAngle}
            src={angles.find((a) => a.id === activeAngle).src}
            alt={`Car - ${activeAngle} view`}
            className="w-full h-full object-cover"
            initial={{ opacity: 0, x: activeAngle === 'front' ? -30 : activeAngle === 'rear' ? 30 : 0, scale: 1.05 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          />
        </AnimatePresence>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black/60 via-transparent to-brand-black/20 pointer-events-none" />
      </div>

      {/* Angle selector */}
      <div className="flex justify-center gap-2 mt-4">
        {angles.map((angle) => (
          <button
            key={angle.id}
            onClick={() => onAngleChange(angle.id)}
            className={`px-4 py-2 rounded-lg text-xs uppercase tracking-wider font-medium transition-all duration-300 ${
              activeAngle === angle.id
                ? 'gold-gradient text-brand-black shadow-lg'
                : 'text-brand-gold/50 border border-brand-gold/20 hover:border-brand-gold/50 hover:text-brand-gold/80'
            }`}
          >
            {angle.label}
          </button>
        ))}
      </div>
    </div>
  )
}

// ─── Main Section ──────────────────────────────────────────────────
export default function ServiceShowcase() {
  const [activeService, setActiveService] = useState(null)
  const [activeAngle, setActiveAngle] = useState('side')
  const sectionRef = useRef(null)

  // Auto-rotate the car slightly
  useEffect(() => {
    if (activeService) return // stop rotation if card is open
    const interval = setInterval(() => {
      setActiveAngle((prev) => {
        const order = ['front', 'side', 'rear', 'side']
        const idx = order.indexOf(prev)
        return order[(idx + 1) % order.length]
      })
    }, 4000)
    return () => clearInterval(interval)
  }, [activeService])

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative py-24 md:py-32 overflow-hidden bg-brand-black"
    >
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-black via-brand-charcoal/30 to-brand-black" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[1px] bg-gradient-to-r from-transparent via-brand-gold/20 to-transparent" />

      {/* Section header */}
      <div className="relative z-10 text-center mb-16 px-4">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-brand-gold/60 text-xs tracking-[0.3em] uppercase font-body"
        >
          Explore Our Expertise
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="text-3xl md:text-5xl font-display mt-3 mb-4"
        >
          <span className="text-white/90">Premium</span>{' '}
          <span className="chrome-text">Services</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-brand-silver/50 text-sm md:text-base max-w-xl mx-auto font-light"
        >
          Click the glowing hotspots on the vehicle to explore our full range of premium detailing services.
        </motion.p>
      </div>

      {/* Interactive area */}
      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <div className="relative">
          {/* Car viewer with hotspots overlay */}
          <div className="relative">
            <CarViewer activeAngle={activeAngle} onAngleChange={setActiveAngle} />

            {/* Hotspots overlay */}
            <div className="absolute inset-0 top-0 left-0 w-full h-full" style={{ aspectRatio: '3/2' }}>
              {SERVICES.map((service, index) => (
                <HotspotDot
                  key={service.id}
                  service={service}
                  index={index}
                  isActive={activeService?.id === service.id}
                  onClick={() => setActiveService(activeService?.id === service.id ? null : service)}
                />
              ))}
            </div>
          </div>

          {/* Service card popup */}
          <AnimatePresence>
            {activeService && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex justify-center mt-8"
              >
                <ServiceCard
                  service={activeService}
                  onClose={() => setActiveService(null)}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom separator */}
      <div className="relative z-10 mt-24 flex justify-center">
        <div className="w-16 h-[1px] gold-gradient" />
      </div>
    </section>
  )
}