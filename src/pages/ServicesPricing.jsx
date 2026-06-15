import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

// ─── Service Tier Data ──────────────────────────────────────────────
const SERVICE_TIERS = [
  {
    id: 'interior',
    tier: 1,
    title: 'Interior Detail',
    tagline: 'Deep Clean. Sanitized. Luxurious.',
    price: '$175 – $350',
    priceNote: '*Price varies by vehicle condition',
    description: 'Our most popular interior service transforms your cabin from the inside out. We use steam extraction and premium products to remove every trace of dirt, allergens, and odors.',
    includes: [
      'Deep vacuum & steam cleaning',
      'All surface cracks & crevices cleaned',
      'Shampoo floors & floor mats',
      'Seat extraction & conditioning',
      'Headliner wipedown',
      'Plastic/vinyl/rubber trim shine',
      'Air freshener finish',
    ],
    icon: '🚗',
    color: '#C0C0C0',
  },
  {
    id: 'exterior',
    tier: 2,
    title: 'Exterior Detail',
    tagline: 'Protect. Shine. Preserve.',
    price: '$175 – $350',
    priceNote: '*Price varies by vehicle condition',
    description: 'Restore your paint to a mirror-like finish with our professional exterior detailing. Iron decontamination, clay bar treatment, and machine wax provide lasting protection.',
    includes: [
      'Professional hand wash',
      'Iron decontamination & clay bar',
      'Machine wax (3-6 month protection)',
      'Wheels, tires & wheel wells cleaned',
      'Plastic trim restoration',
      'Glass polish & Rain-X treatment',
      'Chrome & exhaust tip polish',
    ],
    icon: '✨',
    color: '#58AFD1',
  },
  {
    id: 'full',
    tier: 3,
    title: 'Full Detail',
    tagline: 'Complete Transformation',
    price: '$275 – $450',
    priceNote: '*Price varies by vehicle condition',
    description: 'Our flagship package — the ultimate transformation for your vehicle. Combining our premium interior and exterior services, this is the complete showroom experience.',
    includes: [
      'Everything in Interior + Exterior',
      'Complete paint decontamination',
      'Leather seat treatment & conditioning',
      'Engine bay wipe-down',
      'Door jambs cleaned & sealed',
      'Paint sealant protection',
      'Interior & exterior detail shine',
    ],
    icon: '👑',
    color: '#D4AF37',
    featured: true,
  },
]

const ADDON_SERVICES = [
  {
    title: 'Paint Correction',
    price: '$450 – $850+',
    description: 'Multi-stage correction removing swirl marks, scratches, and oxidation for a flawless, mirror-like finish.',
  },
  {
    title: 'Ceramic & Graphene Coating',
    price: '$450 – $1,250+',
    description: 'Premium nano-ceramic coating with graphene infusion. Provides years of protection with self-cleaning hydrophobic properties.',
    featured: true,
  },
  {
    title: 'Headlight Restoration',
    price: '$100 – $175',
    description: 'Professional wet-sanding and UV-sealant coating restores clarity and removes yellowing for maximum visibility.',
  },
  {
    title: 'Interior Detail (Standalone)',
    price: '$175 – $350',
    description: 'Deep steam cleaning with leather conditioning and complete sanitization.',
  },
  {
    title: 'Exterior Detail (Standalone)',
    price: '$175 – $350',
    description: 'Hand wash, iron decontamination, clay bar, and machine wax with 3-6 month protection.',
  },
]

// ─── Tire Card Component ────────────────────────────────────────────
function TierCard({ service, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.6 }}
      className={`relative rounded-2xl overflow-hidden ${
        service.featured
          ? 'lg:-mt-4 lg:mb-4 scale-[1.02] z-10'
          : ''
      }`}
    >
      {/* Card background */}
      <div
        className={`relative p-6 md:p-8 h-full ${
          service.featured
            ? 'bg-gradient-to-b from-brand-charcoal/90 to-brand-black'
            : 'glass-card'
        }`}
        style={{
          border: service.featured
            ? '1px solid rgba(212, 175, 55, 0.3)'
            : '1px solid rgba(255, 255, 255, 0.06)',
          boxShadow: service.featured
            ? '0 0 40px rgba(212, 175, 55, 0.1), inset 0 1px 0 rgba(212, 175, 55, 0.1)'
            : 'none',
        }}
      >
        {/* Featured badge */}
        {service.featured && (
          <div className="absolute top-0 right-0">
            <div className="gold-gradient text-brand-black text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-bl-xl">
              Best Value
            </div>
          </div>
        )}

        {/* Tier number */}
        <div className="flex items-center gap-3 mb-3">
          <span
            className="text-2xl"
            style={{ color: service.color }}
          >
            {service.icon}
          </span>
          <span className="text-brand-gold/30 text-xs tracking-[0.2em] uppercase font-body">
            Tier {service.tier}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl md:text-2xl font-display text-white mb-1">
          {service.title}
        </h3>

        {/* Tagline */}
        <p className="text-brand-silver/50 text-xs tracking-wider uppercase mb-3">
          {service.tagline}
        </p>

        {/* Price */}
        <div className="mb-4">
          <span
            className={`text-3xl md:text-4xl font-display font-bold ${
              service.featured ? 'chrome-text' : 'text-white'
            }`}
          >
            {service.price}
          </span>
        </div>
        <p className="text-brand-silver/30 text-[10px] italic mb-5">
          {service.priceNote}
        </p>

        {/* Description */}
        <p className="text-brand-silver/60 text-sm leading-relaxed mb-6">
          {service.description}
        </p>

        {/* Includes list */}
        <ul className="space-y-2.5 mb-8">
          {service.includes.map((item) => (
            <li key={item} className="flex items-start gap-3 text-sm">
              <span
                className="mt-0.5 flex-shrink-0 w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: service.color }}
              />
              <span className="text-white/70">{item}</span>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <Link
          to="/get-a-quote"
          className={`block w-full text-center py-3.5 rounded-lg text-sm tracking-wider uppercase font-semibold transition-all duration-300 ${
            service.featured
              ? 'gold-gradient text-brand-black hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]'
              : 'gold-border text-brand-gold bg-brand-dark/50 hover:bg-brand-dark'
          }`}
        >
          {service.featured ? 'Get This Package' : 'Choose This Package'}
        </Link>
      </div>
    </motion.div>
  )
}

// ─── Addon Service Card ─────────────────────────────────────────────
function AddonCard({ service, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className={`relative p-5 rounded-xl ${
        service.featured
          ? 'bg-gradient-to-r from-brand-gold/5 to-brand-dark/80 border border-brand-gold/20'
          : 'glass-card'
      }`}
      style={{
        boxShadow: service.featured ? '0 0 20px rgba(212,175,55,0.08)' : 'none',
      }}
    >
      {service.featured && (
        <div className="absolute -top-2.5 left-5 gold-gradient text-brand-black text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
          Premium
        </div>
      )}
      <h4 className={`font-display text-lg mb-1 ${service.featured ? 'chrome-text' : 'text-white'}`}>
        {service.title}
      </h4>
      <p className="text-brand-gold font-semibold text-sm mb-2">{service.price}</p>
      <p className="text-brand-silver/50 text-xs leading-relaxed">{service.description}</p>
      <Link
        to="/get-a-quote"
        className={`inline-block mt-3 text-xs uppercase tracking-wider font-medium transition-colors ${
          service.featured ? 'text-brand-gold hover:text-brand-gold-light' : 'text-brand-silver/40 hover:text-brand-gold'
        }`}
      >
        Get a Quote →
      </Link>
    </motion.div>
  )
}

// ─── Main Page ──────────────────────────────────────────────────────
export default function ServicesPricing() {
  return (
    <div className="min-h-screen bg-brand-black">
      {/* ── Hero Header ──────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-black via-brand-charcoal/30 to-brand-black" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[1px] bg-gradient-to-r from-transparent via-brand-gold/20 to-transparent" />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-brand-gold/50 text-xs tracking-[0.3em] uppercase font-body"
          >
            Transparent Pricing
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-3xl md:text-5xl lg:text-6xl font-display mt-3 mb-4"
          >
            <span className="text-white/90">Services &</span>{' '}
            <span className="chrome-text">Pricing</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-brand-silver/50 text-sm md:text-base max-w-2xl mx-auto font-light leading-relaxed"
          >
            We believe in transparent, upfront pricing with no hidden fees.
            Every vehicle is unique, so we tailor our approach to deliver
            the exact level of care your car deserves.
          </motion.p>
        </div>
      </section>

      {/* ── Tiered Packages ──────────────────────────────────────── */}
      <section className="relative pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-start">
            {SERVICE_TIERS.map((service, index) => (
              <TierCard key={service.id} service={service} index={index} />
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-brand-silver/30 text-xs mt-8"
          >
            * Final pricing determined after vehicle inspection. Contact us for a precise quote.
          </motion.p>
        </div>
      </section>

      {/* ── Separator ────────────────────────────────────────────── */}
      <div className="flex justify-center px-4">
        <div className="w-16 h-[1px] gold-gradient" />
      </div>

      {/* ── Additional Services ──────────────────────────────────── */}
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-brand-gold/40 text-xs tracking-[0.3em] uppercase font-body"
            >
              Premium Upgrades
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="text-2xl md:text-4xl font-display mt-3 text-white/90"
            >
              Add-On Services
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ADDON_SERVICES.map((service, index) => (
              <AddonCard key={service.title} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Ceramic Coating Spotlight ────────────────────────────── */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-black via-brand-gold/[0.02] to-brand-black" />
        <div className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle at 30% 40%, #D4AF37 2px, transparent 2px)`,
            backgroundSize: '60px 60px',
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-card rounded-2xl p-8 md:p-12"
            style={{
              border: '1px solid rgba(212, 175, 55, 0.2)',
              boxShadow: '0 0 50px rgba(212, 175, 55, 0.05)',
            }}
          >
            <span className="text-5xl mb-4 block">💎</span>
            <h2 className="text-2xl md:text-4xl font-display chrome-text mb-3">
              Ceramic & Graphene Coating
            </h2>
            <p className="text-brand-gold/70 text-lg font-display mb-2">
              $450 – $1,250+
            </p>
            <p className="text-brand-silver/60 text-sm max-w-2xl mx-auto mb-6 leading-relaxed">
              Our flagship protection service. Premium nano-ceramic coating infused with graphene
              technology provides unmatched durability, UV protection, and self-cleaning
              hydrophobic properties. Your vehicle stays cleaner longer and maintains that
              just-detailed gloss for years.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                '5-Year Durability',
                'UV & Chemical Resistant',
                'Self-Cleaning Gloss',
                'Scratch Resistant',
              ].map((feature) => (
                <div
                  key={feature}
                  className="text-xs text-brand-silver/60 bg-brand-dark/50 rounded-lg px-3 py-2.5 border border-brand-gold/10"
                >
                  ◆ {feature}
                </div>
              ))}
            </div>

            <Link
              to="/get-a-quote"
              className="inline-block gold-gradient text-brand-black font-semibold px-10 py-4 rounded-lg text-sm tracking-wider uppercase hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all duration-300"
            >
              Get a Ceramic Coating Quote
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Maintenance Program ──────────────────────────────────── */}
      <section className="relative py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-4xl mb-3 block">🔄</span>
            <h2 className="text-2xl md:text-3xl font-display text-white/90 mb-3">
              Maintenance Program
            </h2>
            <p className="text-brand-silver/50 text-sm max-w-2xl mx-auto mb-6 leading-relaxed">
              Keep your vehicle in pristine condition year-round with our recurring
              maintenance program. Weekly, bi-weekly, and monthly plans available —
              with priority scheduling and exclusive member pricing.
            </p>
            <Link
              to="/get-a-quote"
              className="inline-block gold-border text-brand-gold px-8 py-3.5 rounded-lg text-sm tracking-wider uppercase font-medium bg-brand-dark/50 hover:bg-brand-dark/80 transition-all duration-300"
            >
              Learn About Plans
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Footer Note ──────────────────────────────────────────── */}
      <div className="flex justify-center px-4 pb-12">
        <div className="w-16 h-[1px] gold-gradient" />
      </div>
    </div>
  )
}