import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ─── Blog Post Data ────────────────────────────────────────────
import blogPosts from '../data/blog-posts.json'

// ─── Blog Card Component ────────────────────────────────────────
function BlogCard({ post, index }) {
  const [imgError, setImgError] = useState(false)

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group glass-card rounded-xl overflow-hidden hover:border-brand-gold/40 transition-all duration-500 cursor-pointer"
    >
      {/* Featured Image */}
      <div className="relative h-48 md:h-56 overflow-hidden bg-brand-dark">
        {!imgError ? (
          <img
            src={post.featuredImage}
            alt={post.title}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-brand-dark to-brand-charcoal">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-2 rounded-full border-2 border-brand-gold/30 flex items-center justify-center">
                <svg className="w-6 h-6 text-brand-gold/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-xs text-brand-gold/40">{post.category}</p>
            </div>
          </div>
        )}
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 text-xs tracking-wider uppercase bg-brand-black/80 backdrop-blur-sm text-brand-gold border border-brand-gold/20 rounded-full">
            {post.category}
          </span>
        </div>
        {/* Read Time */}
        <div className="absolute top-4 right-4">
          <span className="px-3 py-1 text-xs text-white/60 bg-brand-black/60 backdrop-blur-sm rounded-full">
            {post.readTime} min read
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Date */}
        <p className="text-xs text-brand-gold/40 mb-2 tracking-wider uppercase font-body">
          {new Date(post.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </p>

        {/* Title */}
        <h3 className="text-xl font-display text-white/90 mb-3 group-hover:text-brand-gold transition-colors duration-300 line-clamp-2">
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="text-sm text-brand-silver/60 leading-relaxed mb-4 line-clamp-3">
          {post.excerpt}
        </p>

        {/* Author & CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-brand-gold/10">
          <span className="text-xs text-brand-gold/50">
            by {post.author}
          </span>
          <a
            href={`/blog/${post.slug}`}
            className="text-xs text-brand-gold hover:text-brand-gold-light transition-colors uppercase tracking-wider font-medium"
          >
            Read More →
          </a>
        </div>
      </div>
    </motion.article>
  )
}

// ─── Featured Post ──────────────────────────────────────────────
function FeaturedPost({ post }) {
  const [imgError, setImgError] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative glass-card rounded-xl overflow-hidden mb-12"
    >
      <div className="grid md:grid-cols-2 gap-0">
        {/* Image */}
        <div className="relative h-64 md:h-full min-h-[300px] bg-brand-dark overflow-hidden">
          {!imgError ? (
            <img
              src={post.featuredImage}
              alt={post.title}
              onError={() => setImgError(true)}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-brand-gold/10 to-brand-dark">
              <div className="text-center">
                <p className="text-brand-gold/40 text-sm">Featured</p>
                <p className="text-brand-gold/20 text-xs mt-1">{post.category}</p>
              </div>
            </div>
          )}
          <div className="absolute top-4 left-4">
            <span className="px-4 py-1.5 text-xs tracking-wider uppercase bg-brand-black/80 backdrop-blur-sm text-brand-gold border border-brand-gold/20 rounded-full">
              Featured
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 md:p-10 flex flex-col justify-center">
          <p className="text-xs text-brand-gold/50 mb-2 tracking-wider uppercase">
            {new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })} · {post.readTime} min read
          </p>
          <h2 className="text-2xl md:text-3xl font-display text-white mb-4">
            {post.title}
          </h2>
          <p className="text-sm text-brand-silver/70 leading-relaxed mb-6">
            {post.excerpt}
          </p>
          <div className="flex items-center gap-4">
            <a
              href={`/blog/${post.slug}`}
              className="cta-button gold-gradient text-brand-black font-semibold px-6 py-3 rounded-lg text-sm tracking-wider uppercase inline-block"
            >
              Read Article
            </a>
            <span className="text-xs text-brand-gold/40">
              by {post.author}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ─── Category Filter ────────────────────────────────────────────
function CategoryFilter({ categories, activeCategory, onSelect }) {
  return (
    <div className="flex flex-wrap gap-3 justify-center mb-12">
      <button
        onClick={() => onSelect('all')}
        className={`px-5 py-2 rounded-full text-sm tracking-wider uppercase transition-all duration-300 ${
          activeCategory === 'all'
            ? 'gold-gradient text-brand-black font-semibold'
            : 'gold-border text-brand-gold/70 hover:text-brand-gold bg-transparent'
        }`}
      >
        All Posts
      </button>
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`px-5 py-2 rounded-full text-sm tracking-wider uppercase transition-all duration-300 ${
            activeCategory === cat
              ? 'gold-gradient text-brand-black font-semibold'
              : 'gold-border text-brand-gold/70 hover:text-brand-gold bg-transparent'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  )
}

// ─── Newsletter CTA ─────────────────────────────────────────────
function NewsletterCTA() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass-card rounded-xl p-8 md:p-12 text-center mb-16 border-brand-gold/20"
    >
      <h2 className="text-2xl md:text-3xl font-display text-white mb-4">
        Ready to Make Your Car <span className="chrome-text">Sparkle & Bling</span>?
      </h2>
      <p className="text-brand-silver/60 max-w-xl mx-auto mb-8">
        From ceramic coatings to full interior details, our certified professionals deliver showroom-quality results at your doorstep.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <a
          href="/get-a-quote"
          className="cta-button gold-gradient text-brand-black font-semibold px-8 py-4 rounded-lg text-sm tracking-wider uppercase"
        >
          Get a Free Quote
        </a>
        <a
          href="tel:+16614815317"
          className="cta-button gold-border text-brand-gold px-8 py-4 rounded-lg text-sm tracking-wider uppercase font-medium bg-brand-dark/50 hover:bg-brand-dark/80"
        >
          Call (661) 481-5317
        </a>
      </div>
    </motion.section>
  )
}

// ─── Blog Page ──────────────────────────────────────────────────
export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [visibleCount, setVisibleCount] = useState(6)

  const categories = [...new Set(blogPosts.map((p) => p.category))]

  const filteredPosts = activeCategory === 'all'
    ? blogPosts
    : blogPosts.filter((p) => p.category === activeCategory)

  const displayedPosts = filteredPosts.slice(0, visibleCount)
  const featuredPost = blogPosts[0]

  return (
    <section className="relative min-h-screen bg-brand-black overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-black via-brand-charcoal to-brand-black" />
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, #D4AF37 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-16 md:py-24">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-brand-gold/50 text-sm tracking-[0.25em] uppercase font-body mb-4">
            Sparkle & Bling
          </p>
          <h1 className="text-4xl md:text-6xl font-display mb-4">
            <span className="chrome-text">Detailing Insights</span>
          </h1>
          <p className="text-brand-silver/60 text-sm md:text-base max-w-xl mx-auto">
            Expert tips, seasonal guides, and everything you need to know about preserving your vehicle's beauty in the Antelope Valley.
          </p>
        </motion.div>

        {/* Featured Post */}
        <FeaturedPost post={featuredPost} />

        {/* Category Filter */}
        <CategoryFilter
          categories={categories}
          activeCategory={activeCategory}
          onSelect={setActiveCategory}
        />

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
          <AnimatePresence mode="wait">
            {displayedPosts.slice(1).map((post, index) => (
              <BlogCard key={post.id} post={post} index={index} />
            ))}
          </AnimatePresence>
        </div>

        {/* Load More */}
        {visibleCount < filteredPosts.length && (
          <div className="text-center">
            <button
              onClick={() => setVisibleCount((prev) => prev + 6)}
              className="cta-button gold-border text-brand-gold px-8 py-4 rounded-lg text-sm tracking-wider uppercase font-medium bg-brand-dark/50 hover:bg-brand-dark/80 hover:border-brand-gold/60 transition-all"
            >
              Load More Articles
            </button>
          </div>
        )}

        {/* Newsletter / CTA */}
        <NewsletterCTA />
      </div>
    </section>
  )
}