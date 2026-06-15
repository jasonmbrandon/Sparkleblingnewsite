import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ─── Gallery Data ──────────────────────────────────────────────────
const GALLERY_IMAGES = [
  { id: 1, src: '/images/before-after.jpg', category: 'Before/After', title: 'Full Detail Transformation', aspect: '3:2' },
  { id: 2, src: '/images/gallery-ceramic-coating-1.jpg', category: 'Ceramic Coating', title: 'Water Beading Perfection', aspect: '3:2' },
  { id: 3, src: '/images/gallery-ceramic-coating-2.jpg', category: 'Ceramic Coating', title: 'Hydrophobic Detail', aspect: '1:1' },
  { id: 4, src: '/images/gallery-paint-correction-1.jpg', category: 'Paint Correction', title: '50/50 Swirl Removal', aspect: '3:2' },
  { id: 5, src: '/images/gallery-interior-1.jpg', category: 'Interior', title: 'Black Leather Restoration', aspect: '3:2' },
  { id: 6, src: '/images/gallery-interior-2.jpg', category: 'Interior', title: 'SUV Cabin Deep Clean', aspect: '3:2' },
  { id: 7, src: '/images/gallery-full-detail-1.jpg', category: 'Full Detail', title: 'Blue Sedan Golden Hour', aspect: '3:2' },
  { id: 8, src: '/images/gallery-exterior-1.jpg', category: 'Exterior', title: 'Wheel & Tire Detail', aspect: '1:1' },
  { id: 9, src: '/images/gallery-classic-car-1.jpg', category: 'Classic Cars', title: 'Red Muscle Car Revival', aspect: '3:2' },
  { id: 10, src: '/images/gallery-classic-car-2.jpg', category: 'Classic Cars', title: 'British Racing Green', aspect: '3:2' },
  { id: 11, src: '/images/gallery-before-after-1.jpg', category: 'Before/After', title: 'SUV Ceramic Coating', aspect: '3:2' },
  { id: 12, src: '/images/gallery-before-after-2.jpg', category: 'Before/After', title: 'Headlight Restoration', aspect: '3:2' },
  { id: 13, src: '/images/ceramic-coating-detail.jpg', category: 'Ceramic Coating', title: 'Macro Water Beading', aspect: '3:2' },
  { id: 14, src: '/images/car-front-angle.png', category: 'Exterior', title: 'Front Angle Showcase', aspect: '3:2' },
  { id: 15, src: '/images/car-side-profile.png', category: 'Exterior', title: 'Side Profile Gloss', aspect: '3:2' },
  { id: 16, src: '/images/car-rear-angle.png', category: 'Exterior', title: 'Rear Angle Showcase', aspect: '3:2' },
]

const CATEGORIES = ['All', 'Ceramic Coating', 'Paint Correction', 'Interior', 'Full Detail', 'Exterior', 'Classic Cars', 'Before/After']

// ─── Before/After Slider ───────────────────────────────────────────
function BeforeAfterSlider({ image, index }) {
  const [sliderPos, setSliderPos] = useState(50)
  const containerRef = useRef(null)
  const isDragging = useRef(false)

  const handlePointerDown = (e) => {
    isDragging.current = true
    handlePointerMove(e)
  }

  const handlePointerMove = (e) => {
    if (!isDragging.current || !containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width * 100
    setSliderPos(Math.min(95, Math.max(5, x)))
  }

  const handlePointerUp = () => {
    isDragging.current = false
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="relative w-full aspect-[3/2] rounded-xl overflow-hidden group cursor-ew-resize select-none"
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      {/* After image (full) */}
      <img src={image} alt="" className="absolute inset-0 w-full h-full object-cover" draggable={false} />

      {/* Before image (clipped) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${sliderPos}%` }}
      >
        <img
          src={image}
          alt=""
          className="absolute top-0 left-0 w-full h-full object-cover"
          style={{ filter: 'brightness(0.8) sepia(0.2)' }}
          draggable={false}
        />
        {/* "BEFORE" label */}
        <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm px-3 py-1 rounded text-xs tracking-widest font-bold text-brand-gold uppercase">
          Before
        </div>
      </div>

      {/* "AFTER" label */}
      <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm px-3 py-1 rounded text-xs tracking-widest font-bold text-brand-gold uppercase">
        After
      </div>

      {/* Slider handle */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-brand-gold shadow-lg shadow-brand-gold/50 z-10"
        style={{ left: `${sliderPos}%`, transform: 'translateX(-50%)' }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full gold-gradient flex items-center justify-center shadow-xl">
          <svg className="w-4 h-4 text-brand-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
          <svg className="w-4 h-4 text-brand-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>

      {/* Hint text */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-sm px-4 py-1.5 rounded-full text-[10px] text-brand-gold/70 tracking-wider whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
        ← Drag to compare →
      </div>
    </motion.div>
  )
}

// ─── Image Card ────────────────────────────────────────────────────
function ImageCard({ image, index, onOpen }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className={`relative rounded-xl overflow-hidden cursor-pointer group ${
        image.category === 'Before/After' ? 'md:col-span-2' : ''
      }`}
      onClick={() => onOpen(image)}
      whileHover={{ scale: 1.02 }}
    >
      <div className={`relative ${image.aspect === '1:1' ? 'aspect-square' : 'aspect-[3/2]'} bg-brand-dark overflow-hidden`}>
        <img
          src={image.src}
          alt={image.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute inset-0 border border-transparent group-hover:border-brand-gold/30 rounded-xl transition-all duration-300" />

        {/* Category badge */}
        <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full text-[9px] tracking-wider font-medium text-brand-gold border border-brand-gold/20">
          {image.category}
        </div>

        {/* Title on hover */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <p className="text-white text-sm font-display">{image.title}</p>
        </div>
      </div>
    </motion.div>
  )
}

// ─── Lightbox ──────────────────────────────────────────────────────
function Lightbox({ images, currentIndex, onClose }) {
  const [idx, setIdx] = useState(currentIndex)

  const next = () => setIdx((i) => (i + 1) % images.length)
  const prev = () => setIdx((i) => (i - 1 + images.length) % images.length)

  const img = images[idx]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-lg flex items-center justify-center"
      onClick={onClose}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 w-12 h-12 rounded-full flex items-center justify-center text-white/60 hover:text-white bg-white/5 hover:bg-white/10 transition-all z-10"
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Prev */}
      <button
        onClick={(e) => { e.stopPropagation(); prev() }}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center text-white/60 hover:text-white bg-white/5 hover:bg-white/10 transition-all z-10"
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Next */}
      <button
        onClick={(e) => { e.stopPropagation(); next() }}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center text-white/60 hover:text-white bg-white/5 hover:bg-white/10 transition-all z-10"
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Image */}
      <motion.div
        key={idx}
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="max-w-5xl max-h-[85vh] mx-16 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={img?.src}
          alt={img?.title}
          className="max-w-full max-h-[85vh] object-contain rounded-lg"
        />

        {/* Info bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 rounded-b-lg">
          <div className="flex items-center justify-between">
            <div>
              <span className="px-2 py-0.5 text-[9px] tracking-wider uppercase bg-brand-gold/20 text-brand-gold border border-brand-gold/30 rounded-full">
                {img?.category}
              </span>
              <span className="text-white/60 text-xs ml-3">{img?.title}</span>
            </div>
            <span className="text-brand-gold/50 text-xs">{idx + 1}/{images.length}</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ─── Gallery Page ──────────────────────────────────────────────────
export default function GalleryPage() {
  const [category, setCategory] = useState('All')
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const filtered = category === 'All'
    ? GALLERY_IMAGES
    : GALLERY_IMAGES.filter((img) => img.category === category)

  const beforeAfterImages = GALLERY_IMAGES.filter((img) => img.category === 'Before/After')

  const openLightbox = (img) => {
    const idx = filtered.findIndex((i) => i.id === img.id)
    setLightboxIndex(idx)
    setLightboxOpen(true)
  }

  return (
    <div className="min-h-screen bg-brand-black">
      {/* ── Header ──────────────────────────────────────────── */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-black via-brand-charcoal/30 to-brand-black" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[1px] bg-gradient-to-r from-transparent via-brand-gold/20 to-transparent" />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-brand-gold/50 text-xs tracking-[0.3em] uppercase font-body"
          >
            Our Portfolio
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-3xl md:text-5xl lg:text-6xl font-display mt-3 mb-4"
          >
            <span className="text-white/90">Project</span>{' '}
            <span className="chrome-text">Gallery</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-brand-silver/50 text-sm md:text-base max-w-2xl mx-auto font-light"
          >
            Explore our transformation portfolio. Every vehicle tells a story —
            from neglected to showroom perfection.
          </motion.p>
        </div>
      </section>

      {/* ── Before/After Slider Section ──────────────────────── */}
      <section className="relative px-4 pb-12">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-2xl md:text-3xl font-display chrome-text mb-2">
              Before & After
            </h2>
            <p className="text-brand-silver/50 text-sm">Drag the slider to see the transformation</p>
          </motion.div>

          <div className="space-y-6">
            {beforeAfterImages.map((img, i) => (
              <BeforeAfterSlider key={img.id} image={img.src} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Separator ────────────────────────────────────────── */}
      <div className="flex justify-center px-4 py-8">
        <div className="w-16 h-[1px] gold-gradient" />
      </div>

      {/* ── Filter Bar ────────────────────────────────────────── */}
      <section className="relative px-4 pb-8">
        <div className="max-w-6xl mx-auto overflow-x-auto hide-scrollbar">
          <div className="flex gap-2 md:gap-3 justify-center min-w-max px-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs tracking-wider uppercase whitespace-nowrap transition-all duration-300 ${
                  category === cat
                    ? 'gold-gradient text-brand-black font-semibold shadow-lg'
                    : 'gold-border text-brand-gold/60 hover:text-brand-gold bg-brand-dark/50 hover:bg-brand-dark/80'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Masonry Grid ──────────────────────────────────────── */}
      <section className="relative px-4 pb-24">
        <div className="max-w-6xl mx-auto">
          <motion.div
            layout
            className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((img, i) => (
                <ImageCard key={img.id} image={img} index={i} onOpen={openLightbox} />
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-brand-gold/40 text-sm">No images in this category yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* ── Lightbox ──────────────────────────────────────────── */}
      <AnimatePresence>
        {lightboxOpen && (
          <Lightbox
            images={filtered}
            currentIndex={lightboxIndex}
            onClose={() => setLightboxOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* ── Footer ────────────────────────────────────────────── */}
      <div className="flex justify-center px-4 pb-12">
        <div className="w-16 h-[1px] gold-gradient" />
      </div>
    </div>
  )
}