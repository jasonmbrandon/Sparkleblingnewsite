import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'

// ─── Process Steps Data ────────────────────────────────────────────
const PROCESS_STEPS = [
  { id: 1, title: 'Wash', icon: '/images/icon-process-wash.svg', image: '/images/ceramic-process-wash.jpg', desc: 'Two-bucket method, PH-neutral soap, foam cannon pre-soak. Every contaminant removed before we begin.', detail: 'Every contaminant removed before we begin' },
  { id: 2, title: 'Decontaminate', icon: '/images/icon-process-decon.svg', image: '/images/ceramic-process-decon.jpg', desc: 'Iron fall-out remover, clay bar treatment, tar removal. Bare paint, perfectly clean.', detail: 'Bare paint, perfectly clean' },
  { id: 3, title: 'Paint Correct', icon: '/images/icon-process-correct.svg', image: '/images/ceramic-process-correct.jpg', desc: 'Multi-stage machine polishing, swirl removal, haze elimination. Flawless surface = flawless results.', detail: 'Flawless surface = flawless results' },
  { id: 4, title: 'Coat', icon: '/images/icon-process-coat.svg', image: '/images/ceramic-process-coat.jpg', desc: 'Precision ceramic/graphene application, cross-hatch technique. Molecular bond that lasts for years.', detail: 'Molecular bond that lasts for years' },
  { id: 5, title: 'Cure', icon: '/images/icon-process-cure.svg', image: '/images/ceramic-process-cure.jpg', desc: 'Controlled environment curing, IR lamps, 24-48 hour cure. Patience yields perfection.', detail: 'Patience yields perfection' },
]

// ─── Packages Data ─────────────────────────────────────────────────
const PACKAGES = [
  {
    tier: 1, name: 'Silver', price: '$450', tag: 'Essential Protection',
    features: ['1 Layer Ceramic Coating', '3 Year Durability', 'UV Protection', 'Hydrophobic Finish', 'Paint Prep Included', '1-Year Warranty'],
    color: 'border-brand-silver/30', highlighted: false,
  },
  {
    tier: 2, name: 'Gold', price: '$750', tag: 'Enhanced Protection ★',
    features: ['2 Layers Ceramic + Graphene', '5 Year Durability', 'UV & Chemical Resistant', 'Enhanced Hydrophobics', 'Paint Prep + Light Correction', '3-Year Warranty'],
    color: 'border-brand-gold/40', highlighted: false,
  },
  {
    tier: 3, name: 'Platinum', price: '$1,250', tag: 'BEST SELLER',
    features: ['3 Layers Graphene + Top Coat', 'Lifetime Durability', 'Maximum Chemical Resistance', 'Self-Cleaning Gloss', 'Full Paint Correction Included', 'Lifetime Warranty'],
    color: 'border-brand-gold', highlighted: true,
  },
]

// ─── Counter Component ─────────────────────────────────────────────
function AnimatedCounter({ value, suffix = '' }) {
  const count = useMotionValue(0)
  const rounded = useTransform(count, Math.round)
  const spring = useSpring(count, { stiffness: 50, damping: 20 })

  useEffect(() => {
    spring.set(value)
  }, [value, spring])

  return <span>{rounded}{suffix}</span>
}

// ─── Water Bead Particles ──────────────────────────────────────────
function WaterBeads() {
  const beads = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 3,
    size: Math.random() * 6 + 3,
    duration: Math.random() * 4 + 3,
  }))

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {beads.map((b) => (
        <motion.div
          key={b.id}
          className="absolute rounded-full bg-white/10 backdrop-blur-[1px]"
          style={{
            left: `${b.x}%`,
            top: '-5%',
            width: b.size,
            height: b.size,
          }}
          animate={{
            y: ['0vh', '105vh'],
            x: [0, Math.random() * 20 - 10, Math.random() * 20 - 10, 0],
            opacity: [0, 0.6, 0.4, 0],
          }}
          transition={{
            duration: b.duration,
            repeat: Infinity,
            delay: b.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

// ─── Main Page ─────────────────────────────────────────────────────
export default function CeramicCoatingPage() {
  const [activeStep, setActiveStep] = useState(1)

  const activeStepData = PROCESS_STEPS.find((s) => s.id === activeStep)

  return (
    <div className="min-h-screen bg-brand-black">
      {/* ═══ Section 1: Hero ═══ */}
      <section className="relative h-screen min-h-[600px] overflow-hidden">
        {/* Background */}
        <motion.div
          initial={{ scale: 1 }}
          animate={{ scale: 1.05 }}
          transition={{ duration: 4, ease: 'easeOut' }}
          className="absolute inset-0"
        >
          <img
            src="/images/ceramic-hero.jpg"
            alt="Ceramic coating hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/60 to-brand-black/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-black/40 to-transparent" />
        </motion.div>

        {/* Water beads */}
        <WaterBeads />

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="max-w-4xl"
          >
            <p className="text-brand-gold/60 text-xs tracking-[0.3em] uppercase font-body mb-4">
              Certified Ceramic & Graphene Coating
            </p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display leading-tight mb-6">
              <span className="text-white/90">Your Paint.</span>{' '}
              <span className="chrome-text">Fortified for Life.</span>
            </h1>
            <p className="text-brand-silver/60 text-sm md:text-base max-w-xl mx-auto mb-8 font-light leading-relaxed">
              Certified ceramic & graphene coating that transforms your vehicle into a
              masterpiece of protection.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="#packages"
                className="cta-button gold-gradient text-brand-black font-semibold px-8 py-4 rounded-lg text-sm tracking-wider uppercase"
                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(212,175,55,0.4)' }}
                whileTap={{ scale: 0.98 }}
              >
                Protect Your Paint Today
              </motion.a>
              <motion.a
                href="#process"
                className="cta-button gold-border text-brand-gold px-8 py-4 rounded-lg text-sm tracking-wider uppercase bg-brand-dark/50 hover:bg-brand-dark/80"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Learn More ↓
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 2, duration: 0.6 }}
          className="absolute bottom-0 left-0 right-0 bg-brand-black/80 backdrop-blur-md border-t border-brand-gold/10"
        >
          <div className="max-w-4xl mx-auto flex justify-center gap-8 md:gap-16 py-4 px-4">
            {[
              { label: '9H Hardness', icon: '◆' },
              { label: 'UV Resistant', icon: '◆' },
              { label: '5+ Year Durability', icon: '◆' },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-2 text-xs md:text-sm">
                <span className="text-brand-gold">{stat.icon}</span>
                <span className="text-white/70 tracking-wider uppercase">{stat.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ═══ Section 2: Nanotechnology ═══ */}
      <section className="relative py-24 md:py-32 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-black via-brand-charcoal/20 to-brand-black" />

        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="rounded-2xl overflow-hidden"
            >
              <img
                src="/images/ceramic-nanotech.jpg"
                alt="Nanotechnology visualization"
                className="w-full h-auto object-cover"
              />
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-brand-gold/40 text-xs tracking-[0.3em] uppercase font-body mb-3">
                The Science of Perfection
              </p>
              <h2 className="text-3xl md:text-4xl font-display chrome-text mb-6">
                The Science of Perfection
              </h2>
              <p className="text-brand-silver/60 text-sm leading-relaxed mb-8">
                Our advanced nano-ceramic coating infused with graphene technology bonds at the molecular
                level with your vehicle's paint. This creates an invisible armor that's harder than factory
                clear coat, yet flexible enough to withstand thermal expansion and contraction.
              </p>
              <div className="space-y-4">
                {[
                  { text: 'Nano-Ceramic Particles', desc: 'Microscopic particles fill paint imperfections for a mirror-smooth finish' },
                  { text: 'Graphene Reinforcement', desc: 'Hexagonal carbon lattice adds unmatched strength and flexibility' },
                  { text: 'Chemical & UV Resistance', desc: 'Defends against acid rain, bird droppings, and sun damage' },
                  { text: 'Self-Cleaning Properties', desc: 'Hydrophobic surface repels water, dirt, and grime' },
                ].map((item, i) => (
                  <motion.div
                    key={item.text}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <span className="text-brand-gold mt-0.5">◆</span>
                    <div>
                      <p className="text-white/80 text-sm font-medium">{item.text}</p>
                      <p className="text-brand-silver/40 text-xs">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ Section 3: Packages ═══ */}
      <section id="packages" className="relative py-24 px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-black via-brand-gold/[0.02] to-brand-black" />

        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-brand-gold/40 text-xs tracking-[0.3em] uppercase font-body"
            >
              Choose Your Protection
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="text-3xl md:text-4xl font-display mt-3 chrome-text"
            >
              Choose Your Level of Protection
            </motion.h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 items-start">
            {PACKAGES.map((pkg, index) => (
              <motion.div
                key={pkg.tier}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                whileHover={pkg.highlighted ? { y: -8, boxShadow: '0 20px 60px rgba(212,175,55,0.2)' } : { y: -4 }}
                className={`relative rounded-2xl overflow-hidden transition-all duration-300 ${
                  pkg.highlighted ? 'z-10 scale-[1.02]' : ''
                }`}
                style={{
                  border: `1px solid ${pkg.highlighted ? 'rgba(212,175,55,0.4)' : 'rgba(255,255,255,0.08)'}`,
                  boxShadow: pkg.highlighted ? '0 0 40px rgba(212,175,55,0.1)' : 'none',
                }}
              >
                {/* Highlighted glow animation */}
                {pkg.highlighted && (
                  <motion.div
                    className="absolute inset-0 rounded-2xl"
                    animate={{ boxShadow: ['0 0 20px rgba(212,175,55,0.05)', '0 0 40px rgba(212,175,55,0.15)', '0 0 20px rgba(212,175,55,0.05)'] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                )}

                <div className={`p-6 md:p-8 relative ${pkg.highlighted ? 'bg-gradient-to-b from-brand-charcoal/90 to-brand-black' : 'glass-card'}`}>
                  {/* Badge */}
                  {pkg.highlighted && (
                    <div className="absolute top-0 right-0">
                      <div className="gold-gradient text-brand-black text-[9px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-bl-xl">
                        {pkg.tag}
                      </div>
                    </div>
                  )}

                  <div className="mb-2">
                    <span className="text-xs text-brand-gold/40 tracking-wider uppercase">Tier {pkg.tier}</span>
                  </div>
                  <h3 className={`text-2xl font-display mb-1 ${pkg.highlighted ? 'chrome-text' : 'text-white'}`}>
                    {pkg.name}
                  </h3>
                  <p className="text-xs text-brand-silver/50 mb-4">{pkg.tag}</p>

                  <div className="mb-6">
                    <span className={`text-4xl font-display font-bold ${pkg.highlighted ? 'chrome-text' : 'text-white'}`}>
                      {pkg.price}
                    </span>
                  </div>

                  <ul className="space-y-2.5 mb-8">
                    {pkg.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm">
                        <span className="text-brand-gold mt-0.5 flex-shrink-0">✓</span>
                        <span className="text-white/70">{f}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    to="/get-a-quote"
                    className={`block w-full text-center py-3.5 rounded-lg text-sm tracking-wider uppercase font-semibold transition-all duration-300 ${
                      pkg.highlighted
                        ? 'gold-gradient text-brand-black hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]'
                        : 'gold-border text-brand-gold bg-brand-dark/50 hover:bg-brand-dark'
                    }`}
                  >
                    Select Package
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <p className="text-center text-brand-silver/30 text-xs mt-8">
            * All packages include full paint preparation and professional installation
          </p>
        </div>
      </section>

      {/* ═══ Section 4: Process ═══ */}
      <section id="process" className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-black via-brand-charcoal/20 to-brand-black" />

        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-brand-gold/40 text-xs tracking-[0.3em] uppercase font-body"
            >
              How It Works
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="text-3xl md:text-4xl font-display mt-3 chrome-text"
            >
              The 5-Step Ceramic Process
            </motion.h2>
          </div>

          {/* Step circles */}
          <div className="flex justify-center gap-2 md:gap-4 mb-12">
            {PROCESS_STEPS.map((step, i) => (
              <motion.button
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setActiveStep(step.id)}
                className={`relative flex flex-col items-center gap-2 p-3 md:p-4 rounded-xl transition-all duration-300 min-w-[70px] md:min-w-[90px] ${
                  activeStep === step.id
                    ? 'gold-gradient text-brand-black shadow-lg'
                    : 'glass-card text-white/50 hover:text-white/80'
                }`}
              >
                <span className="text-lg md:text-xl font-display font-bold">{String(step.id).padStart(2, '0')}</span>
                <span className="text-[9px] md:text-[10px] uppercase tracking-wider whitespace-nowrap">{step.title}</span>
              </motion.button>
            ))}
          </div>

          {/* Connecting line */}
          <div className="relative h-[2px] bg-brand-gold/10 rounded-full mx-8 md:mx-16 mb-12">
            <motion.div
              className="absolute top-0 left-0 h-full gold-gradient rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: `${(activeStep / PROCESS_STEPS.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>

          {/* Detail panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="glass-card rounded-2xl overflow-hidden border-brand-gold/10"
              style={{ border: '1px solid rgba(212,175,55,0.15)' }}
            >
              <div className="grid md:grid-cols-2">
                <div className="aspect-square md:aspect-auto overflow-hidden">
                  <img
                    src={activeStepData?.image}
                    alt={activeStepData?.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 md:p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-3">
                    <img src={activeStepData?.icon} alt="" className="w-10 h-10" />
                    <span className="text-brand-gold/40 text-xs tracking-wider">Step {activeStep}</span>
                  </div>
                  <h3 className="text-2xl font-display text-white mb-3">{activeStepData?.title}</h3>
                  <p className="text-brand-silver/60 text-sm leading-relaxed mb-4">{activeStepData?.desc}</p>
                  <div className="flex items-center gap-2 text-brand-gold text-sm">
                    <span>◆</span>
                    <span className="text-brand-gold/80">{activeStepData?.detail}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ═══ Section 5: ROI / Value ═══ */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url('/images/ceramic-protection-demo.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-black/95 via-brand-black/90 to-brand-black/95" />

        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display chrome-text mb-3">
              The Value of Protection
            </h2>
            <p className="text-brand-silver/50 text-sm max-w-xl mx-auto">
              See how ceramic coating preserves your vehicle's beauty and value over time.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Without */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card rounded-xl p-6 md:p-8 border-red-900/30"
              style={{ background: 'rgba(30,10,10,0.6)' }}
            >
              <p className="text-red-400 text-xs tracking-wider uppercase mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-400" />
                Without Ceramic Coating
              </p>
              <div className="space-y-3 text-sm text-white/50">
                <p>✕ Paint fade and oxidation</p>
                <p>✕ Swirl marks from washing</p>
                <p>✕ Chemical etching from bird droppings / bugs</p>
                <p>✕ UV damage and clear coat failure</p>
                <p className="text-red-300 font-semibold pt-2 border-t border-white/10">
                  Resale value loss: Up to -$3,000 – $5,000
                </p>
              </div>
            </motion.div>

            {/* With */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card rounded-xl p-6 md:p-8"
              style={{
                border: '1px solid rgba(212,175,55,0.25)',
                background: 'rgba(20,15,5,0.6)',
              }}
            >
              <p className="text-brand-gold text-xs tracking-wider uppercase mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brand-gold" />
                With Ceramic Coating
              </p>
              <div className="space-y-3 text-sm text-white/50">
                <p>✓ Showroom finish preserved</p>
                <p>✓ Self-cleaning hydrophobic surface</p>
                <p>✓ Protected against environmental damage</p>
                <p>✓ Minimal maintenance required</p>
                <p className="text-brand-gold font-semibold pt-2 border-t border-brand-gold/20">
                  Investment: $450 – $1,250 | ROI: Up to 10x return
                </p>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-10"
          >
            <Link
              to="/get-a-quote"
              className="inline-block gold-gradient text-brand-black font-semibold px-10 py-4 rounded-lg text-sm tracking-wider uppercase hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all"
            >
              Calculate Your Savings →
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ═══ Section 6: Three Reasons ═══ */}
      <section className="relative py-24 px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-black via-brand-gold/[0.01] to-brand-black" />

        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display chrome-text mb-3">
              Three Reasons to Coat Your Car
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              {
                icon: '/images/icon-protection.svg',
                title: 'Protection',
                desc: 'Shield paint from UV rays, chemicals, bird droppings, and minor scratches with an invisible armor layer.',
              },
              {
                icon: '/images/icon-longevity.svg',
                title: 'Longevity',
                desc: 'Years of brilliant gloss and shine with minimal upkeep. Your coating stays strong through every season.',
              },
              {
                icon: '/images/icon-value.svg',
                title: 'Value',
                desc: 'Preserve your vehicle resale value and save money on waxes, sealants, and frequent detailing.',
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="glass-card rounded-xl p-6 md:p-8 text-center hover:-translate-y-2 transition-all duration-300"
                style={{ border: '1px solid rgba(212,175,55,0.12)' }}
              >
                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <img src={item.icon} alt={item.title} className="w-full h-full object-contain" />
                </div>
                <h3 className="text-xl font-display chrome-text mb-3">{item.title}</h3>
                <p className="text-brand-silver/60 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Link
              to="/get-a-quote"
              className="inline-block gold-gradient text-brand-black font-semibold px-10 py-4 rounded-lg text-sm tracking-wider uppercase hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all"
            >
              Get Your Ceramic Quote
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <div className="flex justify-center px-4 pb-12">
        <div className="w-16 h-[1px] gold-gradient" />
      </div>
    </div>
  )
}