import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import blogPosts from '../data/blog-posts.json'

// ─── Blog Post Page ─────────────────────────────────────────────
export default function BlogPostPage() {
  const { slug } = useParams()
  const [post, setPost] = useState(null)
  const [relatedPosts, setRelatedPosts] = useState([])

  useEffect(() => {
    const found = blogPosts.find((p) => p.slug === slug)
    setPost(found)

    if (found) {
      const related = blogPosts
        .filter((p) => p.category === found.category && p.id !== found.id)
        .slice(0, 3)
      setRelatedPosts(related)
    }

    // Scroll to top on navigation
    window.scrollTo(0, 0)
  }, [slug])

  if (!post) {
    return (
      <div className="min-h-screen bg-brand-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-2 border-brand-gold/30 border-t-brand-gold rounded-full animate-spin mx-auto mb-4" />
          <p className="text-brand-gold/60">Loading...</p>
        </div>
      </div>
    )
  }

  // ─── Render content blocks ──────────────────────────────────
  function renderContent(block, idx) {
    switch (block.type) {
      case 'paragraph':
        return (
          <p key={idx} className="text-brand-silver/80 leading-relaxed mb-6 text-base md:text-lg">
            {block.text}
          </p>
        )

      case 'heading':
        const H = `h${block.level || 2}`
        const headingStyles = {
          2: 'text-2xl md:text-3xl font-display text-white mt-10 mb-4',
          3: 'text-xl md:text-2xl font-display text-white/90 mt-8 mb-3',
        }
        return (
          <H key={idx} className={headingStyles[block.level] || headingStyles[2]}>
            {block.text}
          </H>
        )

      case 'list':
        return (
          <div key={idx} className="space-y-4 mb-8">
            {block.items.map((item, i) => (
              <div key={i} className="flex gap-4">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-2 h-2 rounded-full bg-brand-gold/60 mt-2" />
                </div>
                <div>
                  {item.title && (
                    <h4 className="text-brand-gold font-display font-semibold mb-1">
                      {item.title}
                    </h4>
                  )}
                  <p className="text-brand-silver/70 leading-relaxed">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        )

      case 'table':
        return (
          <div key={idx} className="overflow-x-auto mb-8 glass-card rounded-xl">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-brand-gold/20">
                  {block.headers.map((h, i) => (
                    <th key={i} className="text-left p-4 text-brand-gold font-display font-semibold">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((row, ri) => (
                  <tr key={ri} className="border-b border-brand-gold/10 last:border-0 hover:bg-white/5">
                    {row.map((cell, ci) => (
                      <td key={ci} className="p-4 text-brand-silver/80">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )

      case 'cta':
        return (
          <div key={idx} className="glass-card rounded-xl p-6 md:p-8 my-10 text-center border-brand-gold/20">
            <p className="text-white/80 mb-4 font-display text-lg">
              {block.text}
            </p>
            <a
              href={block.buttonLink || '/get-a-quote'}
              className="cta-button gold-gradient text-brand-black font-semibold px-8 py-4 rounded-lg text-sm tracking-wider uppercase inline-block"
            >
              {block.buttonText || 'Get a Free Quote'}
            </a>
            <p className="mt-3 text-xs text-brand-gold/50">
              Or call us: <a href="tel:+16614815317" className="text-brand-gold hover:underline">(661) 481-5317</a>
            </p>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-brand-black">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-black via-brand-charcoal to-brand-black" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent" />

      <article className="relative z-10 max-w-3xl mx-auto px-4 py-16 md:py-24">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link
            to="/blogs"
            className="text-brand-gold/50 hover:text-brand-gold text-sm tracking-wider uppercase transition-colors"
          >
            ← Back to Blog
          </Link>
        </motion.div>

        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 text-xs tracking-wider uppercase bg-brand-gold/10 text-brand-gold border border-brand-gold/20 rounded-full">
              {post.category}
            </span>
            <span className="text-xs text-brand-silver/40">
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
            <span className="text-xs text-brand-silver/40">·</span>
            <span className="text-xs text-brand-silver/40">{post.readTime} min read</span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-display text-white leading-tight mb-4">
            {post.title}
          </h1>

          <p className="text-brand-silver/50 text-sm">
            by {post.author}
          </p>
        </motion.header>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="prose prose-invert max-w-none"
        >
          {post.content.map((block, idx) => renderContent(block, idx))}
        </motion.div>

        {/* Share & Author */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 pt-8 border-t border-brand-gold/10"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-sm text-brand-gold/50">Written by</p>
              <p className="text-brand-gold font-display">{post.author}</p>
            </div>
            <div className="flex gap-3">
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://www.sparkleblingdetailing.com/blog/${post.slug}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 text-xs tracking-wider uppercase gold-border text-brand-gold rounded-lg hover:bg-brand-gold/10 transition-colors"
              >
                Share
              </a>
              <a
                href="/get-a-quote"
                className="px-4 py-2 text-xs tracking-wider uppercase gold-gradient text-brand-black font-semibold rounded-lg"
              >
                Get a Quote
              </a>
            </div>
          </div>
        </motion.div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mt-16 pt-8 border-t border-brand-gold/10"
          >
            <h3 className="text-xl font-display text-white mb-6">
              More in <span className="text-brand-gold">{post.category}</span>
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              {relatedPosts.map((rp) => (
                <Link
                  key={rp.id}
                  to={`/blog/${rp.slug}`}
                  className="glass-card rounded-xl p-4 hover:border-brand-gold/30 transition-all group"
                >
                  <p className="text-xs text-brand-gold/50 mb-2">{rp.readTime} min read</p>
                  <h4 className="text-sm font-display text-white/80 group-hover:text-brand-gold transition-colors line-clamp-2">
                    {rp.title}
                  </h4>
                </Link>
              ))}
            </div>
          </motion.div>
        )}

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-16 glass-card rounded-xl p-8 text-center border-brand-gold/20"
        >
          <h3 className="text-2xl font-display text-white mb-3">
            Ready for a <span className="chrome-text">Showroom Shine</span>?
          </h3>
          <p className="text-brand-silver/60 mb-6">
            Our certified mobile detailers bring the luxury experience to your doorstep.
          </p>
          <a
            href="/get-a-quote"
            className="cta-button gold-gradient text-brand-black font-semibold px-8 py-4 rounded-lg text-sm tracking-wider uppercase"
          >
            Book Your Detail Today
          </a>
        </motion.div>
      </article>
    </div>
  )
}