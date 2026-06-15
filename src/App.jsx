import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import ServicesPricing from './pages/ServicesPricing.jsx'
import CeramicCoatingPage from './pages/CeramicCoatingPage.jsx'
import GalleryPage from './pages/GalleryPage.jsx'
import QuotePage from './pages/QuotePage.jsx'
import BlogsPage from './pages/BlogsPage.jsx'
import BlogPostWrapper from './pages/BlogPostWrapper.jsx'
import Navbar from './components/Navbar.jsx'

function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <BrowserRouter>
      <div className="relative min-h-screen bg-brand-black">
        {/* Initial Black Screen */}
        {loading && (
          <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 border-2 border-brand-gold/30 border-t-brand-gold rounded-full animate-spin mx-auto mb-4" />
              <p className="text-brand-gold/60 text-sm tracking-[0.2em] uppercase font-body">
                Igniting
              </p>
            </div>
          </div>
        )}

        {/* Main content */}
        <div className={`transition-opacity duration-700 ${loading ? 'opacity-0' : 'opacity-100'}`}>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ServicesPricing />} />
            <Route path="/pricing" element={<ServicesPricing />} />
            <Route path="/ceramic-coating" element={<CeramicCoatingPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/get-a-quote" element={<QuotePage />} />
            <Route path="/quote" element={<QuotePage />} />
            <Route path="/blogs" element={<BlogsPage />} />
            <Route path="/blog/:slug" element={<BlogPostWrapper />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App