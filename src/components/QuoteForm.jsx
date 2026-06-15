import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ─── Constants ──────────────────────────────────────────────────
const SERVICE_OPTIONS = [
  { id: 'interior', label: 'Interior Detail', price: '$175 – $350' },
  { id: 'exterior', label: 'Exterior Detail', price: '$175 – $350' },
  { id: 'full', label: 'Full Detail', price: '$275 – $450' },
  { id: 'ceramic', label: 'Ceramic Coating Program', price: 'Inquire for pricing' },
  { id: 'maintenance', label: 'Maintenance Program', price: 'Inquire for pricing' },
  { id: 'paint-correction', label: 'Paint Correction', price: 'Inquire for pricing' },
  { id: 'headlight', label: 'Headlight Restoration', price: 'Add-on service' },
  { id: 'engine', label: 'Engine Bay Detailing', price: 'Add-on service' },
  { id: 'other', label: 'Other / Not Sure', price: 'Let us advise you' },
]

const VEHICLE_TYPES = ['Sedan', 'SUV', 'Truck', 'Van', 'Motorcycle', 'RV', 'Marine', 'Rig/Commercial', 'Luxury/Sports', 'Classic']

const TIME_SLOTS = [
  '8:00 AM', '8:30 AM', '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM',
  '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM',
  '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM',
]

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

// ─── Step Indicator ─────────────────────────────────────────────
function StepIndicator({ currentStep }) {
  const labels = ['Your Info & Vehicle', 'Services', 'Schedule']
  return (
    <div className="flex items-center justify-center gap-2 sm:gap-3 mb-10">
      {[1, 2, 3].map((step) => (
        <div key={step} className="flex items-center gap-2 sm:gap-3">
          <div className={`
            w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs sm:text-sm font-semibold transition-all duration-500
            ${currentStep === step
              ? 'gold-gradient text-brand-black shadow-lg shadow-brand-gold/20 scale-110'
              : currentStep > step
                ? 'bg-brand-gold/30 text-brand-gold'
                : 'border border-brand-gold/20 text-brand-gold/40'
            }
          `}>
            {currentStep > step ? '✓' : step}
          </div>
          <span className={`text-[10px] sm:text-xs tracking-wider uppercase hidden sm:block ${currentStep === step ? 'text-brand-gold' : 'text-brand-gold/40'}`}>
            {labels[step - 1]}
          </span>
          {step < 3 && (
            <div className={`w-6 sm:w-12 h-[1px] ${currentStep > step ? 'bg-brand-gold/40' : 'bg-brand-gold/10'}`} />
          )}
        </div>
      ))}
    </div>
  )
}

// ─── Calendar Component ─────────────────────────────────────────
function Calendar({ selectedDate, onDateSelect }) {
  const today = new Date()
  const [viewMonth, setViewMonth] = useState(today.getMonth())
  const [viewYear, setViewYear] = useState(today.getFullYear())

  const firstDayOfMonth = new Date(viewYear, viewMonth, 1).getDay()
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate()
  const daysInPrevMonth = new Date(viewYear, viewMonth, 0).getDate()

  const isDateDisabled = (day, monthOffset = 0) => {
    const date = new Date(viewYear, viewMonth + monthOffset, day)
    const compare = new Date(today.getFullYear(), today.getMonth(), today.getDate())
    // Disable past dates and dates more than 60 days out
    const diff = (date - compare) / (1000 * 60 * 60 * 24)
    return diff < 0 || diff > 60
  }

  const isSelected = (day, monthOffset = 0) => {
    if (!selectedDate) return false
    return (
      selectedDate.getDate() === day &&
      selectedDate.getMonth() === viewMonth + monthOffset &&
      selectedDate.getFullYear() === viewYear
    )
  }

  const prevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11)
      setViewYear((v) => v - 1)
    } else {
      setViewMonth((m) => m - 1)
    }
  }

  const nextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0)
      setViewYear((v) => v + 1)
    } else {
      setViewMonth((m) => m + 1)
    }
  }

  const canGoPrev = () => {
    const prev = viewMonth === 0 ? new Date(viewYear - 1, 11, 1) : new Date(viewYear, viewMonth - 1, 1)
    return !isDateDisabled(1, -1)
  }

  const calendarDays = []
  // Previous month's trailing days
  for (let i = firstDayOfMonth - 1; i >= 0; i--) {
    const day = daysInPrevMonth - i
    calendarDays.push({ day, monthOffset: -1, disabled: true })
  }
  // Current month's days
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push({ day: i, monthOffset: 0, disabled: isDateDisabled(i) })
  }
  // Next month's leading days
  const remaining = 42 - calendarDays.length
  for (let i = 1; i <= remaining; i++) {
    calendarDays.push({ day: i, monthOffset: 1, disabled: true })
  }

  return (
    <div className="w-full">
      {/* Month/Year Navigation */}
      <div className="flex items-center justify-between mb-6">
        <button
          type="button"
          onClick={prevMonth}
          disabled={!canGoPrev()}
          className="w-10 h-10 rounded-full flex items-center justify-center border border-brand-gold/20 text-brand-gold hover:bg-brand-gold/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="text-center">
          <p className="text-white font-display text-lg">{MONTHS[viewMonth]} {viewYear}</p>
          <p className="text-brand-gold/40 text-xs">Select your preferred date</p>
        </div>
        <button
          type="button"
          onClick={nextMonth}
          className="w-10 h-10 rounded-full flex items-center justify-center border border-brand-gold/20 text-brand-gold hover:bg-brand-gold/10 transition-all"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Day Headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {DAYS.map((d) => (
          <div key={d} className="text-center text-[10px] sm:text-xs text-brand-gold/40 uppercase tracking-wider py-1">
            {d}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((item, idx) => (
          <button
            key={idx}
            type="button"
            disabled={item.disabled}
            onClick={() => !item.disabled && onDateSelect(new Date(viewYear, viewMonth + item.monthOffset, item.day))}
            className={`
              w-full aspect-square rounded-lg text-sm flex items-center justify-center transition-all duration-200
              ${item.disabled
                ? 'text-brand-gold/10 cursor-not-allowed'
                : isSelected(item.day, item.monthOffset)
                  ? 'gold-gradient text-brand-black font-semibold shadow-lg shadow-brand-gold/20'
                  : 'text-white/80 hover:border-brand-gold/40 hover:bg-brand-gold/5 border border-transparent'
              }
            `}
          >
            {item.day}
          </button>
        ))}
      </div>
    </div>
  )
}

// ─── Step 1: Personal & Vehicle Info ────────────────────────────
function StepOne({ formData, setFormData, onNext }) {
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const validate = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    } else if (!/^[\d\s\-().+]{7,20}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number'
    }
    if (!formData.vehicleYear.trim()) newErrors.vehicleYear = 'Required'
    if (!formData.vehicleMake.trim()) newErrors.vehicleMake = 'Required'
    if (!formData.vehicleModel.trim()) newErrors.vehicleModel = 'Required'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validate()) onNext()
  }

  const inputClass = 'w-full bg-brand-dark border border-brand-gold/10 rounded-lg px-4 py-3 text-white placeholder-brand-gold/30 focus:outline-none focus:border-brand-gold/50 transition-colors text-sm'
  const errorClass = 'text-red-400 text-xs mt-1'

  return (
    <motion.form key="step1" initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 30 }} transition={{ duration: 0.4 }} onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h3 className="text-sm text-brand-gold/70 tracking-wider uppercase font-display mb-4">Your Contact Information</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <input type="text" name="name" placeholder="Full Name *" value={formData.name} onChange={handleChange} className={inputClass} />
            {errors.name && <p className={errorClass}>{errors.name}</p>}
          </div>
          <div>
            <input type="email" name="email" placeholder="Email Address *" value={formData.email} onChange={handleChange} className={inputClass} />
            {errors.email && <p className={errorClass}>{errors.email}</p>}
          </div>
          <div className="md:col-span-2">
            <input type="tel" name="phone" placeholder="Phone Number *" value={formData.phone} onChange={handleChange} className={inputClass} />
            {errors.phone && <p className={errorClass}>{errors.phone}</p>}
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-sm text-brand-gold/70 tracking-wider uppercase font-display mb-4">Your Vehicle</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <input type="text" name="vehicleYear" placeholder="Year *" value={formData.vehicleYear} onChange={handleChange} className={inputClass} />
            {errors.vehicleYear && <p className={errorClass}>{errors.vehicleYear}</p>}
          </div>
          <div>
            <input type="text" name="vehicleMake" placeholder="Make *" value={formData.vehicleMake} onChange={handleChange} className={inputClass} />
            {errors.vehicleMake && <p className={errorClass}>{errors.vehicleMake}</p>}
          </div>
          <div>
            <input type="text" name="vehicleModel" placeholder="Model *" value={formData.vehicleModel} onChange={handleChange} className={inputClass} />
            {errors.vehicleModel && <p className={errorClass}>{errors.vehicleModel}</p>}
          </div>
        </div>
        <div className="mt-4">
          <p className="text-xs text-brand-gold/50 mb-3">Vehicle Type</p>
          <div className="flex flex-wrap gap-2">
            {VEHICLE_TYPES.map((type) => (
              <button
                key={type} type="button"
                onClick={() => setFormData((prev) => ({ ...prev, vehicleType: type }))}
                className={`px-4 py-2 rounded-full text-xs tracking-wider uppercase transition-all duration-200 ${
                  formData.vehicleType === type
                    ? 'gold-gradient text-brand-black font-semibold'
                    : 'gold-border text-brand-gold/60 hover:text-brand-gold bg-transparent'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-sm text-brand-gold/70 tracking-wider uppercase font-display mb-4">Your Location</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <input type="text" name="address" placeholder="Street Address" value={formData.address} onChange={handleChange} className={inputClass} />
          </div>
          <div>
            <input type="text" name="city" placeholder="City *" value={formData.city} onChange={(e) => setFormData((prev) => ({ ...prev, city: e.target.value }))} className={inputClass} />
          </div>
        </div>
        <p className="text-xs text-brand-gold/30 mt-2">Serving Lancaster, Palmdale, Quartz Hill, Rosamond & the Antelope Valley</p>
      </div>

      <div className="pt-4">
        <button type="submit" className="w-full cta-button gold-gradient text-brand-black font-semibold py-4 rounded-lg text-sm tracking-wider uppercase">
          Continue to Services →
        </button>
      </div>
    </motion.form>
  )
}

// ─── Step 2: Service Selection ──────────────────────────────────
function StepTwo({ formData, setFormData, onBack, onNext }) {
  const toggleService = (serviceId) => {
    setFormData((prev) => {
      const selected = prev.selectedServices.includes(serviceId)
        ? prev.selectedServices.filter((s) => s !== serviceId)
        : [...prev.selectedServices, serviceId]
      return { ...prev, selectedServices: selected }
    })
  }

  const hasSelection = formData.selectedServices.length > 0

  return (
    <motion.div key="step2" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.4 }}>
      {/* Summary */}
      <div className="glass-card rounded-xl p-5 mb-6 border-brand-gold/10">
        <h4 className="text-xs text-brand-gold/50 tracking-wider uppercase mb-3">Your Information</h4>
        <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
          <div><span className="text-brand-gold/40">Name:</span> <span className="text-white/80">{formData.name}</span></div>
          <div><span className="text-brand-gold/40">Email:</span> <span className="text-white/80">{formData.email}</span></div>
          <div><span className="text-brand-gold/40">Phone:</span> <span className="text-white/80">{formData.phone}</span></div>
          <div><span className="text-brand-gold/40">Vehicle:</span> <span className="text-white/80">{formData.vehicleYear} {formData.vehicleMake} {formData.vehicleModel}</span></div>
          {formData.vehicleType && <div className="col-span-2"><span className="text-brand-gold/40">Type:</span> <span className="text-white/80">{formData.vehicleType}</span></div>}
        </div>
      </div>

      <h3 className="text-sm text-brand-gold/70 tracking-wider uppercase font-display mb-4">Select Service(s)</h3>
      <div className="grid md:grid-cols-2 gap-3 mb-6">
        {SERVICE_OPTIONS.map((svc) => (
          <button key={svc.id} type="button" onClick={() => toggleService(svc.id)}
            className={`text-left p-4 rounded-xl border transition-all duration-200 ${
              formData.selectedServices.includes(svc.id)
                ? 'border-brand-gold/40 bg-brand-gold/5 shadow-sm shadow-brand-gold/5'
                : 'border-brand-gold/10 bg-brand-dark/50 hover:border-brand-gold/20'
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className={`text-sm font-medium ${formData.selectedServices.includes(svc.id) ? 'text-brand-gold' : 'text-white/80'}`}>{svc.label}</p>
                <p className="text-xs text-brand-silver/50 mt-1">{svc.price}</p>
              </div>
              <div className={`w-5 h-5 rounded border-2 flex-shrink-0 flex items-center justify-center transition-all ${
                formData.selectedServices.includes(svc.id) ? 'border-brand-gold bg-brand-gold' : 'border-brand-gold/30'
              }`}>
                {formData.selectedServices.includes(svc.id) && (
                  <svg className="w-3 h-3 text-brand-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="mb-6">
        <textarea name="message" placeholder="Additional details or questions..."
          value={formData.message} onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
          rows={3} className="w-full bg-brand-dark border border-brand-gold/10 rounded-lg px-4 py-3 text-white placeholder-brand-gold/30 focus:outline-none focus:border-brand-gold/50 transition-colors text-sm resize-none"
        />
      </div>

      <div className="flex items-center gap-3 px-4 py-3 bg-brand-gold/5 border border-brand-gold/10 rounded-lg mb-6">
        <div className="w-8 h-8 rounded-full bg-brand-gold/10 flex items-center justify-center flex-shrink-0">
          <svg className="w-4 h-4 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <p className="text-xs text-brand-silver/70"><span className="text-brand-gold font-semibold">24-Hour Response Guarantee</span> — We'll reply within one business day.</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <button type="button" onClick={onBack} className="flex-1 cta-button gold-border text-brand-gold px-6 py-4 rounded-lg text-sm tracking-wider uppercase bg-brand-dark/50 hover:bg-brand-dark/80">
          ← Back
        </button>
        <button type="button" onClick={onNext} disabled={!hasSelection}
          className="flex-1 cta-button gold-gradient text-brand-black font-semibold px-6 py-4 rounded-lg text-sm tracking-wider uppercase disabled:opacity-50 disabled:cursor-not-allowed">
          {hasSelection ? 'Schedule Appointment →' : 'Select a Service to Continue'}
        </button>
      </div>
    </motion.div>
  )
}

// ─── Step 3: Schedule Appointment ───────────────────────────────
function StepThree({ formData, setFormData, onBack, onSubmit }) {
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async () => {
    setSubmitting(true)
    await new Promise((r) => setTimeout(r, 1500))
    setSubmitting(false)
    setSubmitted(true)
  }

  const formatDate = (date) => {
    if (!date) return 'Not selected'
    return date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
  }

  if (submitted) {
    return (
      <motion.div key="submitted" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full gold-gradient flex items-center justify-center">
          <svg className="w-10 h-10 text-brand-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-display text-white mb-2">Your Appointment Has Been Requested</h3>
        <p className="text-brand-silver/60 text-sm mb-2">
          <span className="text-brand-gold font-semibold">{formatDate(formData.selectedDate)}</span>
          {formData.selectedTime && <span> at <span className="text-brand-gold font-semibold">{formData.selectedTime}</span></span>}
        </p>
        <p className="text-brand-silver/70 max-w-md mx-auto mb-6">
          Thank you, <span className="text-brand-gold">{formData.name}</span>! We'll confirm your appointment within <span className="text-brand-gold font-semibold">24 hours</span>.
        </p>

        <div className="glass-card rounded-xl p-6 max-w-sm mx-auto mb-8 border-brand-gold/20">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-gold/20 to-brand-gold/5 border border-brand-gold/20 flex items-center justify-center">
              <span className="text-brand-gold text-lg font-display">JB</span>
            </div>
            <div className="text-left">
              <p className="text-sm text-white font-display">Joseph — Lead Detailer</p>
              <p className="text-xs text-brand-gold/50">3D Certified Professional Detailer</p>
            </div>
          </div>
          <p className="text-xs text-brand-silver/60 leading-relaxed">
            "We stand by our 24-hour response guarantee. If you don't hear from us within one business day, call us directly at <span className="text-brand-gold">(661) 481-5317</span>."
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="tel:+16614815317" className="cta-button gold-gradient text-brand-black font-semibold px-8 py-4 rounded-lg text-sm tracking-wider uppercase">
            Call (661) 481-5317
          </a>
          <a href="/" className="cta-button gold-border text-brand-gold px-8 py-4 rounded-lg text-sm tracking-wider uppercase bg-brand-dark/50 hover:bg-brand-dark/80">
            Return Home
          </a>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div key="step3" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.4 }}>
      {/* Booking Summary */}
      <div className="glass-card rounded-xl p-5 mb-6 border-brand-gold/10">
        <h4 className="text-xs text-brand-gold/50 tracking-wider uppercase mb-3">Booking Summary</h4>
        <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
          <div><span className="text-brand-gold/40">Client:</span> <span className="text-white/80">{formData.name}</span></div>
          <div><span className="text-brand-gold/40">Vehicle:</span> <span className="text-white/80">{formData.vehicleYear} {formData.vehicleMake} {formData.vehicleModel}</span></div>
          <div className="col-span-2"><span className="text-brand-gold/40">Services:</span> <span className="text-white/80">{formData.selectedServices.map((s) => SERVICE_OPTIONS.find((o) => o.id === s)?.label).join(', ')}</span></div>
        </div>
      </div>

      {/* Section Title */}
      <div className="text-center mb-6">
        <h3 className="text-lg font-display text-white">When should we come?</h3>
        <p className="text-xs text-brand-silver/50 mt-1">Pick a date and time that works best for you</p>
      </div>

      {/* Calendar + Time Slots */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* Calendar */}
        <div className="glass-card rounded-xl p-4 border-brand-gold/10">
          <Calendar selectedDate={formData.selectedDate} onDateSelect={(date) => setFormData((prev) => ({ ...prev, selectedDate: date, selectedTime: '' }))} />
        </div>

        {/* Time Slots */}
        <div>
          <div className="glass-card rounded-xl p-4 border-brand-gold/10 h-full">
            {formData.selectedDate ? (
              <>
                <p className="text-xs text-brand-gold/60 tracking-wider uppercase mb-3">
                  Available Times — <span className="text-brand-gold">{formData.selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                </p>
                <div className="grid grid-cols-2 gap-2 max-h-[280px] overflow-y-auto pr-1 scrollbar-thin">
                  {TIME_SLOTS.map((time) => (
                    <button key={time} type="button" onClick={() => setFormData((prev) => ({ ...prev, selectedTime: time }))}
                      className={`py-2.5 px-3 rounded-lg text-xs tracking-wider uppercase transition-all duration-200 ${
                        formData.selectedTime === time
                          ? 'gold-gradient text-brand-black font-semibold'
                          : 'border border-brand-gold/10 text-brand-gold/70 hover:border-brand-gold/30 hover:bg-brand-gold/5 bg-brand-dark/30'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full min-h-[200px] text-center">
                <svg className="w-10 h-10 text-brand-gold/20 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-brand-gold/30 text-sm">Select a date first</p>
                <p className="text-brand-gold/20 text-xs mt-1">Then choose your preferred time</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Calendar Sync Note */}
      <div className="flex items-center gap-3 px-4 py-3 bg-brand-gold/5 border border-brand-gold/10 rounded-lg mb-6">
        <div className="w-8 h-8 rounded-full bg-brand-gold/10 flex items-center justify-center flex-shrink-0">
          <svg className="w-4 h-4 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="text-xs text-brand-silver/70">
          <span className="text-brand-gold font-semibold">Calendar integration coming soon</span> — We'll confirm your selected time during our 24-hour response.
        </p>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button type="button" onClick={onBack} className="flex-1 cta-button gold-border text-brand-gold px-6 py-4 rounded-lg text-sm tracking-wider uppercase bg-brand-dark/50 hover:bg-brand-dark/80">
          ← Back
        </button>
        <button type="button" onClick={handleSubmit} disabled={!formData.selectedDate || !formData.selectedTime || submitting}
          className="flex-1 cta-button gold-gradient text-brand-black font-semibold px-6 py-4 rounded-lg text-sm tracking-wider uppercase disabled:opacity-50 disabled:cursor-not-allowed">
          {submitting ? 'Booking...' : 'Confirm Appointment'}
        </button>
      </div>
    </motion.div>
  )
}

// ─── Quote Form Page ────────────────────────────────────────────
export default function QuoteForm() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    vehicleYear: '',
    vehicleMake: '',
    vehicleModel: '',
    vehicleType: '',
    address: '',
    city: '',
    selectedServices: [],
    message: '',
    selectedDate: null,
    selectedTime: '',
  })

  return (
    <div className="relative min-h-screen bg-brand-black overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-brand-black via-brand-charcoal to-brand-black" />
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: `radial-gradient(circle at 20% 50%, #D4AF37 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent" />

      <div className="relative z-10 max-w-3xl mx-auto px-4 py-16 md:py-24">
        {/* Page Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-10">
          <p className="text-brand-gold/50 text-sm tracking-[0.25em] uppercase font-body mb-3">Sparkle & Bling</p>
          <h1 className="text-3xl md:text-5xl font-display mb-3"><span className="chrome-text">Book Your Detail</span></h1>
          <p className="text-brand-silver/60 text-sm max-w-lg mx-auto">Tell us about your vehicle, pick your services, and choose a time that works for you.</p>
          <div className="mt-4">
            <a href="tel:+16614815317" className="text-brand-gold/60 hover:text-brand-gold text-sm transition-colors">
              Or call us directly: <span className="font-semibold">(661) 481-5317</span>
            </a>
          </div>
        </motion.div>

        {/* Form Card */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }} className="glass-card rounded-2xl p-6 md:p-10 border-brand-gold/10">
          <StepIndicator currentStep={step} />
          <AnimatePresence mode="wait">
            {step === 1 && <StepOne key="s1" formData={formData} setFormData={setFormData} onNext={() => setStep(2)} />}
            {step === 2 && <StepTwo key="s2" formData={formData} setFormData={setFormData} onBack={() => setStep(1)} onNext={() => setStep(3)} />}
            {step === 3 && <StepThree key="s3" formData={formData} setFormData={setFormData} onBack={() => setStep(2)} />}
          </AnimatePresence>
        </motion.div>

        {/* Trust Footer */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-8 text-center">
          <div className="flex items-center justify-center gap-6 text-xs text-brand-gold/30">
            <span>✓ 3D Certified Detailer</span>
            <span className="w-[1px] h-3 bg-brand-gold/10" />
            <span>✓ BBB Accredited</span>
            <span className="w-[1px] h-3 bg-brand-gold/10" />
            <span>✓ Mobile Service</span>
          </div>
        </motion.div>
      </div>
    </div>
  )
}