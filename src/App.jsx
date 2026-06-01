/*
  Blue Arrow Solutions — Landing Page
  ─────────────────────────────────────────────────────
  Positioning angle:
    Be the first accounting firm in Pretoria to speak
    directly to how the customer feels. Open with the
    emotional reality (confusion, SARS anxiety) and
    reframe it as something with a simple, human solution.
    Customer is the hero; Blue Arrow is the guide.

  Top trust signals:
    Named founders (Nichelle & Hilgard) with direct access,
    boutique two-person practice with no junior handoffs,
    philosophy-led: 'accurate financial information is power'.

  Primary CTA rationale:
    'Book a Free Consultation' — framed as low-risk,
    30-minute, no-commitment. Appears in hero, post-services,
    and final CTA section. WhatsApp as persistent secondary.

  Font pairing:
    DM Serif Display (headlines) — warm, editorial, confident
    authority without stuffiness. DM Sans (body) — clean,
    humanist, highly legible at 18px. The pairing reads like
    a thoughtful finance magazine.

  Accent colour: #0A0A0A (near-pure black used as statement)
  Applied to: CTA buttons, section labels, quote marks,
  decorative rules, hover states.
*/

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SalesBar from './components/SalesBar'
import './index.css'

const BASE = import.meta.env.BASE_URL

// ─── Animation variants ───────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
}

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const staggerItem = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

// ─── Gradient border shimmer (CSS keyframe injected once) ─
const shimmerStyle = `
  @keyframes shimmer {
    0%   { background-position: -200% center; }
    100% { background-position:  200% center; }
  }
  .shimmer-border {
    position: relative;
    border-radius: 2px;
  }
  .shimmer-border::before {
    content: '';
    position: absolute;
    inset: -1px;
    border-radius: inherit;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(10,10,10,0.15) 40%,
      rgba(10,10,10,0.5) 50%,
      rgba(10,10,10,0.15) 60%,
      transparent 100%
    );
    background-size: 200% 100%;
    animation: shimmer 2.8s linear infinite;
    pointer-events: none;
    z-index: 1;
  }
  @media (prefers-reduced-motion: reduce) {
    .shimmer-border::before { animation: none; }
  }
  .lead-input::placeholder {
    color: rgba(255,255,255,0.45);
  }
`

// ─── Nav ─────────────────────────────────────────────────
function Nav({ scrolled }) {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    if (menuOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const links = [
    { label: 'Services', href: '#services' },
    { label: 'About', href: '#about' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-40 transition-all duration-300"
        style={{
          backgroundColor: scrolled ? 'rgba(255,255,255,0.97)' : 'transparent',
          backdropFilter: scrolled ? 'blur(8px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(10,10,10,0.08)' : 'none',
        }}
      >
        <div
          className="max-w-[1180px] mx-auto px-6 lg:px-8 flex items-center justify-between"
          style={{ height: '72px' }}
        >
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 flex-shrink-0">
            <img
              src={`${BASE}images/logo-black.png`}
              alt="Blue Arrow Solutions"
              className="h-[42px] w-auto"
            />
          </a>

          {/* Desktop nav — 4 items so hamburger at 1100px */}
          <nav className="hidden items-center gap-8" style={{ display: 'none' }}
            aria-label="Primary navigation"
          />

          {/* Desktop links shown at xl */}
          <nav className="hidden xl:flex items-center gap-8" aria-label="Primary navigation">
            {links.map(l => (
              <a
                key={l.label}
                href={l.href}
                className="text-sm font-medium text-[#4A4A4A] hover:text-[#0A0A0A] transition-colors"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              className="inline-flex items-center px-5 py-2.5 bg-[#0A0A0A] text-white text-sm font-semibold rounded hover:bg-[#2a2a2a] transition-colors"
              style={{ minHeight: '44px', fontFamily: "'DM Sans', sans-serif" }}
            >
              Book a free consultation
            </a>
          </nav>

          {/* Hamburger — visible below xl */}
          <button
            className="xl:hidden flex flex-col justify-center items-center gap-1.5 w-11 h-11 rounded"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
          >
            <span className="block w-6 h-px bg-[#0A0A0A]" />
            <span className="block w-6 h-px bg-[#0A0A0A]" />
            <span className="block w-4 h-px bg-[#0A0A0A]" />
          </button>
        </div>
      </header>

      {/* Mobile full-screen overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-50 bg-[#0A0A0A] flex flex-col px-8 py-10"
          >
            <div className="flex justify-between items-center mb-12">
              <img src={`${BASE}images/logo-black.png`} alt="Blue Arrow Solutions" className="h-[42px] w-auto invert" />
              <button
                className="w-11 h-11 flex items-center justify-center text-white"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M2 2l16 16M18 2L2 18" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <nav className="flex flex-col gap-6" aria-label="Mobile navigation">
              {links.map(l => (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-4xl font-light text-white/80 hover:text-white transition-colors"
                  style={{ fontFamily: "'DM Serif Display', serif" }}
                >
                  {l.label}
                </a>
              ))}
            </nav>
            <div className="mt-auto">
              <a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className="inline-flex items-center justify-center w-full px-6 py-4 bg-white text-[#0A0A0A] text-base font-semibold rounded hover:bg-white/90 transition-colors"
                style={{ minHeight: '56px', fontFamily: "'DM Sans', sans-serif" }}
              >
                Book a free consultation
              </a>
              <p className="mt-4 text-center text-sm text-white/40" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                contact@bluea.co.za &nbsp;|&nbsp; 084 584 4457
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// ─── Hero ─────────────────────────────────────────────────
function Hero() {
  return (
    <section
      className="relative flex flex-col justify-center"
      style={{ minHeight: '92vh', paddingTop: '72px', backgroundColor: '#FFFFFF' }}
      aria-label="Hero"
    >
      <div className="max-w-[1180px] mx-auto px-6 lg:px-8 py-24 lg:py-32">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          <motion.p
            variants={staggerItem}
            className="text-xs font-semibold tracking-[0.2em] uppercase text-[#0A0A0A] mb-8"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Accounting &amp; Tax, Pretoria East
          </motion.p>

          <motion.h1
            variants={staggerItem}
            className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-normal text-[#0A0A0A] leading-[1.05] tracking-tight mb-8"
            style={{ fontFamily: "'DM Serif Display', serif" }}
          >
            Your numbers,<br />
            finally making<br />
            <em>sense.</em>
          </motion.h1>

          <motion.p
            variants={staggerItem}
            className="text-lg sm:text-xl text-[#4A4A4A] leading-relaxed max-w-xl mb-4"
            style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}
          >
            You do not need to understand tax.
            You just need someone who does.
            Someone who will explain it to you in plain language.
            And who will not disappear when SARS comes knocking.
          </motion.p>

          <motion.p
            variants={staggerItem}
            className="text-base text-[#4A4A4A]/70 mb-12 max-w-lg"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Nichelle and Hilgard work directly with you, personally. No juniors.
            No handoffs. No jargon.
          </motion.p>

          <motion.div variants={staggerItem} className="flex flex-col sm:flex-row gap-4 items-start">
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-[#0A0A0A] text-white font-semibold rounded hover:bg-[#2a2a2a] transition-colors shimmer-border"
              style={{ minHeight: '56px', fontFamily: "'DM Sans', sans-serif", fontSize: '16px' }}
            >
              Book a free consultation
            </a>
            <a
              href="https://wa.me/27845844457"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 border border-[#0A0A0A]/20 text-[#0A0A0A] font-medium rounded hover:border-[#0A0A0A]/50 transition-colors"
              style={{ minHeight: '56px', fontFamily: "'DM Sans', sans-serif", fontSize: '16px' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Chat on WhatsApp
            </a>
          </motion.div>

          <motion.p
            variants={staggerItem}
            className="mt-6 text-sm text-[#4A4A4A]/50"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            No commitment. 30 minutes. We will tell you exactly where you stand.
          </motion.p>
        </motion.div>

        {/* Decorative horizontal rule */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="absolute bottom-12 left-6 lg:left-8 right-6 lg:right-8 h-px bg-[#0A0A0A]/8 origin-left"
        />
      </div>
    </section>
  )
}

// ─── Empathy Strip ─────────────────────────────────────────
function EmpathyStrip() {
  const statements = [
    {
      heading: 'SARS keeps you up at night',
      body: 'Deadlines, penalties, letters you do not understand. You are not alone, and it does not have to be this way.',
    },
    {
      heading: 'Your numbers are a mystery',
      body: 'You know your business is making money. You just cannot tell how much, or where it is going. That confusion costs you.',
    },
    {
      heading: 'You do not know what you do not know',
      body: 'VAT, provisional tax, CIPC compliance. The system was not designed to be easy to understand. We make it plain.',
    },
  ]

  return (
    <section
      style={{ backgroundColor: '#F5F5F5', borderTop: '1px solid rgba(10,10,10,0.06)' }}
      className="py-24 lg:py-32"
      aria-label="Common challenges"
    >
      <div className="max-w-[1180px] mx-auto px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16"
        >
          {statements.map((s, i) => (
            <motion.div key={i} variants={staggerItem}>
              <p
                className="text-xs font-semibold tracking-[0.18em] uppercase text-[#0A0A0A]/40 mb-4"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {String(i + 1).padStart(2, '0')}
              </p>
              <h3
                className="text-xl lg:text-2xl font-normal text-[#0A0A0A] mb-4 leading-snug"
                style={{ fontFamily: "'DM Serif Display', serif" }}
              >
                {s.heading}
              </h3>
              <p
                className="text-base text-[#4A4A4A] leading-relaxed"
                style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}
              >
                {s.body}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ─── Services ─────────────────────────────────────────────
function Services() {
  const services = [
    {
      label: 'Bookkeeping',
      heading: 'Know exactly where your money is',
      body: 'Monthly financial reporting that shows you what is actually happening in your business, not just what you hope. Accurate books mean confident decisions.',
    },
    {
      label: 'Tax Returns and Compliance',
      heading: 'Pay what you owe, not a cent more',
      body: 'Individual and business tax returns done correctly and filed on time, every time. We find every legal deduction and keep you on the right side of SARS.',
    },
    {
      label: 'Payroll Administration',
      heading: 'Your staff paid correctly, every month',
      body: 'PAYE calculations, payslips, UIF, and SARS compliance handled completely. Your employees trust you with their livelihoods, and you can trust us with the maths.',
    },
    {
      label: 'Secretarial and CIPC',
      heading: 'Your company registered and compliant',
      body: 'Company registration, amendments, annual returns, and CIPC compliance. We do the admin so your business exists properly on paper and in law.',
    },
    {
      label: 'Financial Advisory',
      heading: 'Better decisions, better business future',
      body: 'You deserve to understand your own numbers. We translate financial data into plain language advice that actually helps you grow, not just survive.',
    },
  ]

  return (
    <section
      id="services"
      className="py-24 lg:py-32"
      style={{ backgroundColor: '#FFFFFF' }}
      aria-label="Services"
    >
      <div className="max-w-[1180px] mx-auto px-6 lg:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-16 lg:mb-20"
        >
          <p
            className="text-xs font-semibold tracking-[0.2em] uppercase text-[#0A0A0A] mb-5"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            What we do
          </p>
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl font-normal text-[#0A0A0A] leading-tight max-w-2xl"
            style={{ fontFamily: "'DM Serif Display', serif" }}
          >
            Everything your business needs to stay compliant and grow.
          </h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#0A0A0A]/8"
          style={{ border: '1px solid rgba(10,10,10,0.08)' }}
        >
          {services.map((s, i) => (
            <motion.div
              key={i}
              variants={staggerItem}
              className="bg-white p-8 lg:p-10 group hover:bg-[#F5F5F5] transition-colors"
            >
              <p
                className="text-xs font-semibold tracking-[0.16em] uppercase text-[#0A0A0A]/40 mb-5"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {s.label}
              </p>
              <h3
                className="text-xl lg:text-2xl font-normal text-[#0A0A0A] leading-snug mb-4"
                style={{ fontFamily: "'DM Serif Display', serif" }}
              >
                {s.heading}
              </h3>
              <p
                className="text-base text-[#4A4A4A] leading-relaxed"
                style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, lineHeight: 1.7 }}
              >
                {s.body}
              </p>
            </motion.div>
          ))}

          {/* Filler cell for grid symmetry */}
          <div className="bg-[#0A0A0A] p-8 lg:p-10 flex flex-col justify-between">
            <p
              className="text-2xl lg:text-3xl font-normal text-white leading-snug mb-8"
              style={{ fontFamily: "'DM Serif Display', serif" }}
            >
              Not sure which service you need?
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 text-white text-sm font-medium border-b border-white/30 pb-1 w-fit hover:border-white transition-colors"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Book a free call and we will figure it out together
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M2.5 7h9M7.5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ─── Mid-page CTA strip ────────────────────────────────────
function MidCTA() {
  return (
    <section
      style={{ backgroundColor: '#F5F5F5', borderTop: '1px solid rgba(10,10,10,0.06)', borderBottom: '1px solid rgba(10,10,10,0.06)' }}
      className="py-16 lg:py-20"
      aria-label="Book a consultation"
    >
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-[1180px] mx-auto px-6 lg:px-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8"
      >
        <p
          className="text-2xl lg:text-3xl font-normal text-[#0A0A0A] max-w-xl leading-snug"
          style={{ fontFamily: "'DM Serif Display', serif" }}
        >
          Not sure where to start? A free 30-minute call costs you nothing and tells you everything.
        </p>
        <a
          href="#contact"
          className="flex-shrink-0 inline-flex items-center justify-center px-8 py-4 bg-[#0A0A0A] text-white font-semibold rounded hover:bg-[#2a2a2a] transition-colors shimmer-border"
          style={{ minHeight: '56px', fontFamily: "'DM Sans', sans-serif", fontSize: '16px' }}
        >
          Book a free consultation
        </a>
      </motion.div>
    </section>
  )
}

// ─── About ────────────────────────────────────────────────
function About() {
  return (
    <section
      id="about"
      className="py-24 lg:py-32"
      style={{ backgroundColor: '#FFFFFF' }}
      aria-label="About Blue Arrow Solutions"
    >
      <div className="max-w-[1180px] mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Team photo */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative"
          >
            <div
              className="w-full overflow-hidden"
              style={{ aspectRatio: '4/5', maxHeight: '600px', backgroundColor: '#F5F5F5' }}
            >
              <img
                src={`${BASE}images/team-photo.png`}
                alt="Nichelle and Hilgard, founders of Blue Arrow Solutions"
                className="w-full h-full object-cover object-top"
              />
            </div>
            {/* Name caption */}
            <div className="mt-4 flex gap-1 items-center">
              <span
                className="text-xs tracking-[0.16em] uppercase text-[#0A0A0A]/50"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Nichelle &amp; Hilgard, founders
              </span>
            </div>
          </motion.div>

          {/* Story */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col justify-center"
          >
            <motion.p
              variants={staggerItem}
              className="text-xs font-semibold tracking-[0.2em] uppercase text-[#0A0A0A] mb-6"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Who we are
            </motion.p>

            <motion.h2
              variants={staggerItem}
              className="text-4xl sm:text-5xl font-normal text-[#0A0A0A] leading-tight mb-8"
              style={{ fontFamily: "'DM Serif Display', serif" }}
            >
              Two accountants who actually like talking to their clients.
            </motion.h2>

            <motion.div
              variants={staggerItem}
              className="space-y-5 text-[18px] text-[#4A4A4A]"
              style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, lineHeight: 1.75 }}
            >
              <p>
                We started Blue Arrow Solutions because we kept meeting business owners
                who were smart, capable, and completely in the dark about their own finances.
                Not because they were bad at business. Because nobody had ever explained
                things to them in plain language.
              </p>
              <p>
                Between us, we have the qualifications to handle anything from a first-year
                tax return to complex business advisory. But what we are really here for is
                that moment when a client finally understands their own numbers, and what
                they can do with them.
              </p>
              <p>
                When you work with Blue Arrow, you work with us directly. Always. Your file
                does not get passed to a junior. Your questions do not go unanswered for days.
                You get the people who know your business.
              </p>
            </motion.div>

            <motion.div
              variants={staggerItem}
              className="mt-10 pt-8"
              style={{ borderTop: '1px solid rgba(10,10,10,0.08)' }}
            >
              <p
                className="text-lg font-normal text-[#0A0A0A] italic"
                style={{ fontFamily: "'DM Serif Display', serif" }}
              >
                "Accurate financial information is power. Better decisions lead to a better
                business future."
              </p>
              <p
                className="mt-2 text-sm text-[#4A4A4A]/60"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Nichelle and Hilgard, Blue Arrow Solutions
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ─── Why Us ───────────────────────────────────────────────
function WhyUs() {
  const points = [
    {
      number: '01',
      heading: 'You always speak to the person who knows your file',
      body: 'No juniors. No call centres. No "I will have someone get back to you." When you call us, you speak to Nichelle or Hilgard, who have read your file and know your situation.',
    },
    {
      number: '02',
      heading: 'Plain language, every time',
      body: 'We do not hide behind jargon. If we cannot explain it in plain English, we have not understood it well enough ourselves. You will leave every conversation knowing more than when you arrived.',
    },
    {
      number: '03',
      heading: 'Proactive, not just reactive',
      body: 'We flag things before they become problems. Deadline approaching? We tell you. New regulation that affects your business? You hear it from us first. Compliance is not a calendar reminder. It is a relationship.',
    },
    {
      number: '04',
      heading: 'Your growth is the actual goal',
      body: 'Filing paperwork is the minimum. What we are really here for is helping you make better decisions. Whether that means understanding your profit margins, planning for a slow season, or knowing when you are ready to hire.',
    },
  ]

  return (
    <section
      style={{ backgroundColor: '#0A0A0A' }}
      className="py-24 lg:py-32"
      aria-label="Why choose Blue Arrow Solutions"
    >
      <div className="max-w-[1180px] mx-auto px-6 lg:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-16 lg:mb-20"
        >
          <p
            className="text-xs font-semibold tracking-[0.2em] uppercase text-white/40 mb-5"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Why us
          </p>
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl font-normal text-white leading-tight max-w-2xl"
            style={{ fontFamily: "'DM Serif Display', serif" }}
          >
            The difference between an accountant and{' '}
            <em>the right accountant.</em>
          </h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16"
        >
          {points.map((p, i) => (
            <motion.div
              key={i}
              variants={staggerItem}
              className="flex gap-6"
              style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '2rem' }}
            >
              <span
                className="text-xs font-semibold text-white/25 flex-shrink-0 mt-1"
                style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: '0.1em' }}
              >
                {p.number}
              </span>
              <div>
                <h3
                  className="text-xl lg:text-2xl font-normal text-white leading-snug mb-4"
                  style={{ fontFamily: "'DM Serif Display', serif" }}
                >
                  {p.heading}
                </h3>
                <p
                  className="text-base text-white/55 leading-relaxed"
                  style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, lineHeight: 1.7 }}
                >
                  {p.body}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ─── Lead Magnet / Email capture ──────────────────────────
function LeadMagnet() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    // TODO: connect to Mailchimp / Brevo / Formspree
    setSubmitted(true)
  }

  return (
    <section
      style={{ backgroundColor: '#0A0A0A' }}
      className="py-24 lg:py-32"
      aria-label="Free tax deadline guide"
    >
      <div className="max-w-[1180px] mx-auto px-6 lg:px-8">
        <div className="max-w-[480px] mx-auto text-center">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.p
              variants={staggerItem}
              className="text-xs font-semibold tracking-[0.2em] uppercase text-white/40 mb-6"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Free download
            </motion.p>
            <motion.h2
              variants={staggerItem}
              className="text-3xl sm:text-4xl font-normal text-white leading-tight mb-5"
              style={{ fontFamily: "'DM Serif Display', serif" }}
            >
              The SA Small Business Tax Deadline Cheat Sheet
            </motion.h2>
            <motion.p
              variants={staggerItem}
              className="text-base text-white/55 mb-10 leading-relaxed"
              style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}
            >
              Every SARS date you need to know in 2025/2026, in plain English.
              Never miss a deadline again.
            </motion.p>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="py-8"
              >
                <p
                  className="text-xl font-normal text-white"
                  style={{ fontFamily: "'DM Serif Display', serif" }}
                >
                  Check your inbox.
                </p>
                <p
                  className="mt-3 text-sm text-white/50"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  We have sent the cheat sheet to {email}
                </p>
              </motion.div>
            ) : (
              <motion.form variants={staggerItem} onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                  className="lead-input w-full px-5 py-4 border rounded focus:outline-none transition-colors"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    minHeight: '56px',
                    fontSize: '16px',
                    backgroundColor: 'rgba(255,255,255,0.08)',
                    borderColor: 'rgba(255,255,255,0.15)',
                    color: '#ffffff',
                  }}
                  onFocus={e => e.target.style.borderColor = 'rgba(255,255,255,0.4)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.15)'}
                />
                <input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  className="lead-input w-full px-5 py-4 border rounded focus:outline-none transition-colors"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    minHeight: '56px',
                    fontSize: '16px',
                    backgroundColor: 'rgba(255,255,255,0.08)',
                    borderColor: 'rgba(255,255,255,0.15)',
                    color: '#ffffff',
                  }}
                  onFocus={e => e.target.style.borderColor = 'rgba(255,255,255,0.4)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.15)'}
                />
                <button
                  type="submit"
                  className="w-full px-6 py-4 bg-white text-[#0A0A0A] font-semibold rounded hover:bg-white/90 transition-colors"
                  style={{ minHeight: '56px', fontFamily: "'DM Sans', sans-serif", fontSize: '16px' }}
                >
                  Send me the cheat sheet
                </button>
                <p
                  className="text-xs text-white/30 text-center mt-1"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  No spam. Unsubscribe any time. Your details stay with us.
                </p>
              </motion.form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ─── FAQ ──────────────────────────────────────────────────
function FAQ() {
  const [open, setOpen] = useState(null)

  const questions = [
    {
      q: 'Do I need an accountant if I am a sole proprietor or freelancer in South Africa?',
      a: 'Yes, and sooner than most people think. As a sole proprietor, your personal and business income are the same thing in SARS\'s eyes. That means provisional tax, annual income tax returns, and potentially VAT all apply to you. Getting the structure right early saves money and stress later.',
    },
    {
      q: 'What is the difference between provisional tax and income tax?',
      a: 'Income tax is what you owe SARS on your earnings for the year. Provisional tax is how self-employed people and businesses pay that debt in advance, in two instalments during the year, so you are not hit with a massive bill at the end. If you earn non-salary income above a certain threshold, you are required to register as a provisional taxpayer.',
    },
    {
      q: 'When do I need to register for VAT, and what happens if I do not?',
      a: 'Registration becomes compulsory once your taxable turnover exceeds R1 million in any 12-month period. You can also register voluntarily once you hit R50,000. Missing the compulsory threshold and not registering carries significant penalties, including backdated VAT liability.',
    },
    {
      q: 'How do I register a company with CIPC, and what does it actually cost?',
      a: 'CIPC registration itself costs R175 for a private company (PTY Ltd). The process involves reserving a name, submitting incorporation documents, and then registering with SARS for income tax, and PAYE if you have employees. We handle the full process so you do not have to navigate the CIPC portal yourself.',
    },
    {
      q: 'What documents do I need to give my accountant every month?',
      a: 'Typically: your bank statements, any invoices you issued, supplier invoices and receipts, payroll records if you have staff, and a note of any cash transactions. The simpler you keep your records during the month, the less time it takes to process, which keeps your fees down.',
    },
    {
      q: 'What does bookkeeping actually cost for a small business in South Africa?',
      a: 'For most small businesses and sole proprietors, monthly bookkeeping starts from a few hundred rand for simple records and scales based on transaction volume and complexity. The cost of not having accurate books, including missed deductions, SARS penalties, and poor business decisions, almost always exceeds the fee.',
    },
    {
      q: 'What is the SARS tax filing season, and what are the key deadlines I must not miss?',
      a: 'The annual filing season typically opens in July and runs through to January for provisional taxpayers. Provisional tax payments fall in August and February. VAT returns are due monthly or bi-monthly depending on your category. We track all of these for our clients so nothing slips through.',
    },
    {
      q: 'What happens if I am behind on my SARS submissions? Can it be fixed?',
      a: 'It can be fixed. SARS has processes for late submissions and outstanding returns, and while penalties apply, the worst outcome is usually avoided by acting sooner rather than later. We have helped clients get compliant from years behind. The important thing is to start, not to keep waiting.',
    },
  ]

  return (
    <section
      id="faq"
      className="py-24 lg:py-32"
      style={{ backgroundColor: '#FFFFFF' }}
      aria-label="Frequently asked questions"
    >
      <div className="max-w-[1180px] mx-auto px-6 lg:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-16 lg:mb-20"
        >
          <p
            className="text-xs font-semibold tracking-[0.2em] uppercase text-[#0A0A0A] mb-5"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Questions
          </p>
          <h2
            className="text-4xl sm:text-5xl font-normal text-[#0A0A0A] leading-tight max-w-xl"
            style={{ fontFamily: "'DM Serif Display', serif" }}
          >
            The questions everyone has but is afraid to ask.
          </h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-3xl"
        >
          {questions.map((item, i) => (
            <motion.div
              key={i}
              variants={staggerItem}
              style={{ borderTop: i === 0 ? '1px solid rgba(10,10,10,0.1)' : undefined, borderBottom: '1px solid rgba(10,10,10,0.1)' }}
            >
              <button
                className="w-full flex items-start justify-between gap-4 py-6 text-left group"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                <span
                  className="text-[18px] font-normal text-[#0A0A0A] leading-snug group-hover:text-[#0A0A0A]/70 transition-colors"
                  style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 400 }}
                >
                  {item.q}
                </span>
                <span
                  className="flex-shrink-0 mt-1 w-6 h-6 flex items-center justify-center text-[#0A0A0A] transition-transform duration-300"
                  style={{ transform: open === i ? 'rotate(45deg)' : 'rotate(0deg)' }}
                  aria-hidden="true"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                </span>
              </button>

              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    style={{ overflow: 'hidden' }}
                  >
                    <p
                      className="pb-6 text-base text-[#4A4A4A] leading-relaxed"
                      style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, lineHeight: 1.75, maxWidth: '56ch' }}
                    >
                      {item.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ─── Contact / CTA Section ────────────────────────────────
function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [sent, setSent] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    // TODO: connect to Formspree / Netlify Forms / backend
    setSent(true)
  }

  return (
    <section
      id="contact"
      className="py-24 lg:py-32"
      style={{ backgroundColor: '#F5F5F5', borderTop: '1px solid rgba(10,10,10,0.06)' }}
      aria-label="Book a free consultation"
    >
      <div className="max-w-[1180px] mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

          {/* Left: copy */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.p
              variants={staggerItem}
              className="text-xs font-semibold tracking-[0.2em] uppercase text-[#0A0A0A] mb-6"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Get in touch
            </motion.p>
            <motion.h2
              variants={staggerItem}
              className="text-4xl sm:text-5xl font-normal text-[#0A0A0A] leading-tight mb-6"
              style={{ fontFamily: "'DM Serif Display', serif" }}
            >
              The first step costs nothing.
            </motion.h2>
            <motion.p
              variants={staggerItem}
              className="text-[18px] text-[#4A4A4A] leading-relaxed mb-10"
              style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, lineHeight: 1.7, maxWidth: '46ch' }}
            >
              A free 30-minute consultation. No commitment. We will tell you exactly
              where you stand, what you need to do, and what it would cost to sort out.
              Most people leave feeling relieved.
            </motion.p>

            <motion.div variants={staggerItem} className="space-y-4">
              <div>
                <p
                  className="text-xs tracking-[0.14em] uppercase text-[#0A0A0A]/40 mb-1"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  Email
                </p>
                <a
                  href="mailto:contact@bluea.co.za"
                  className="text-[18px] text-[#0A0A0A] hover:opacity-60 transition-opacity"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  contact@bluea.co.za
                </a>
              </div>
              <div>
                <p
                  className="text-xs tracking-[0.14em] uppercase text-[#0A0A0A]/40 mb-1"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  Phone
                </p>
                <a
                  href="tel:+27845844457"
                  className="text-[18px] text-[#0A0A0A] hover:opacity-60 transition-opacity"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  084 584 4457
                </a>
              </div>
              <div>
                <p
                  className="text-xs tracking-[0.14em] uppercase text-[#0A0A0A]/40 mb-1"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  Location
                </p>
                <p
                  className="text-[18px] text-[#0A0A0A]"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  Pretoria East, Gauteng
                </p>
              </div>
            </motion.div>

            <motion.div variants={staggerItem} className="mt-8">
              <a
                href="https://wa.me/27845844457"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 border border-[#0A0A0A]/20 text-[#0A0A0A] text-sm font-medium rounded hover:border-[#0A0A0A]/60 transition-colors"
                style={{ minHeight: '48px', fontFamily: "'DM Sans', sans-serif" }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Or chat on WhatsApp
              </a>
            </motion.div>
          </motion.div>

          {/* Right: form */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {sent ? (
              <div className="bg-white p-10 rounded" style={{ border: '1px solid rgba(10,10,10,0.08)' }}>
                <h3
                  className="text-2xl font-normal text-[#0A0A0A] mb-3"
                  style={{ fontFamily: "'DM Serif Display', serif" }}
                >
                  Message received.
                </h3>
                <p
                  className="text-base text-[#4A4A4A]"
                  style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}
                >
                  Nichelle or Hilgard will be in touch shortly. Usually within one business day.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-white p-8 lg:p-10 rounded space-y-5"
                style={{ border: '1px solid rgba(10,10,10,0.08)' }}
                aria-label="Consultation booking form"
              >
                <div>
                  <label
                    htmlFor="c-name"
                    className="block text-xs font-medium tracking-[0.12em] uppercase text-[#0A0A0A]/50 mb-2"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    Your name
                  </label>
                  <input
                    id="c-name"
                    type="text"
                    required
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-3.5 border border-[#0A0A0A]/12 text-[#0A0A0A] placeholder-[#0A0A0A]/25 rounded focus:outline-none focus:border-[#0A0A0A]/40 transition-colors bg-white"
                    style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '16px', minHeight: '52px' }}
                    placeholder="Jane Smith"
                  />
                </div>
                <div>
                  <label
                    htmlFor="c-email"
                    className="block text-xs font-medium tracking-[0.12em] uppercase text-[#0A0A0A]/50 mb-2"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    Email address
                  </label>
                  <input
                    id="c-email"
                    type="email"
                    required
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-3.5 border border-[#0A0A0A]/12 text-[#0A0A0A] placeholder-[#0A0A0A]/25 rounded focus:outline-none focus:border-[#0A0A0A]/40 transition-colors bg-white"
                    style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '16px', minHeight: '52px' }}
                    placeholder="jane@business.co.za"
                  />
                </div>
                <div>
                  <label
                    htmlFor="c-phone"
                    className="block text-xs font-medium tracking-[0.12em] uppercase text-[#0A0A0A]/50 mb-2"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    Phone (optional)
                  </label>
                  <input
                    id="c-phone"
                    type="tel"
                    value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-4 py-3.5 border border-[#0A0A0A]/12 text-[#0A0A0A] placeholder-[#0A0A0A]/25 rounded focus:outline-none focus:border-[#0A0A0A]/40 transition-colors bg-white"
                    style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '16px', minHeight: '52px' }}
                    placeholder="082 000 0000"
                  />
                </div>
                <div>
                  <label
                    htmlFor="c-message"
                    className="block text-xs font-medium tracking-[0.12em] uppercase text-[#0A0A0A]/50 mb-2"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    What can we help with?
                  </label>
                  <textarea
                    id="c-message"
                    rows={4}
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    className="w-full px-4 py-3.5 border border-[#0A0A0A]/12 text-[#0A0A0A] placeholder-[#0A0A0A]/25 rounded focus:outline-none focus:border-[#0A0A0A]/40 transition-colors bg-white resize-none"
                    style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '16px' }}
                    placeholder="Briefly describe your situation. No need to have all the answers."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-6 py-4 bg-[#0A0A0A] text-white font-semibold rounded hover:bg-[#2a2a2a] transition-colors shimmer-border"
                  style={{ minHeight: '56px', fontFamily: "'DM Sans', sans-serif", fontSize: '16px' }}
                >
                  Send message
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ─── Footer ───────────────────────────────────────────────
function Footer() {
  return (
    <footer
      style={{ backgroundColor: '#0A0A0A', borderTop: '1px solid rgba(255,255,255,0.06)' }}
      aria-label="Site footer"
    >
      <div className="max-w-[1180px] mx-auto px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">

          {/* Brand */}
          <div>
            <img
              src={`${BASE}images/logo-black.png`}
              alt="Blue Arrow Solutions"
              className="h-[42px] w-auto invert mb-6"
            />
            <p
              className="text-sm text-white/50 leading-relaxed mb-6"
              style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, maxWidth: '30ch' }}
            >
              Boutique accounting, tax, and payroll for small business owners in Pretoria East.
            </p>
            <div className="flex gap-5">
              <a
                href="https://www.facebook.com/bluearrowsolutions"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-white/30 hover:text-white transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-white/30 hover:text-white transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3
              className="text-xs font-semibold tracking-[0.16em] uppercase text-white/40 mb-6"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Contact
            </h3>
            <ul className="space-y-3">
              {[
                { label: 'contact@bluea.co.za', href: 'mailto:contact@bluea.co.za' },
                { label: '084 584 4457', href: 'tel:+27845844457' },
                { label: 'Pretoria East, Gauteng', href: null },
              ].map((item, i) => (
                <li key={i}>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-sm text-white/55 hover:text-white transition-colors"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {item.label}
                    </a>
                  ) : (
                    <span
                      className="text-sm text-white/55"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {item.label}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Services links */}
          <div>
            <h3
              className="text-xs font-semibold tracking-[0.16em] uppercase text-white/40 mb-6"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Services
            </h3>
            <ul className="space-y-3">
              {[
                'Bookkeeping',
                'Tax Returns',
                'Payroll',
                'CIPC Secretarial',
                'Financial Advisory',
              ].map((s, i) => (
                <li key={i}>
                  <a
                    href="#services"
                    className="text-sm text-white/55 hover:text-white transition-colors"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className="mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          <p
            className="text-xs text-white/30"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Blue Arrow Solutions &copy; {new Date().getFullYear()} &nbsp;|&nbsp; Pretoria East, Gauteng
          </p>
          <a
            href="mailto:contact@bluea.co.za"
            className="text-xs text-white/30 hover:text-white/50 transition-colors"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            contact@bluea.co.za
          </a>
        </div>
      </div>

      {/* Credit bar */}
      <div
        style={{ borderTop: '1px solid rgba(255,255,255,0.04)', backgroundColor: 'rgba(255,255,255,0.02)' }}
        className="py-4"
      >
        <p
          className="text-center text-xs text-white/20"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Website design by{' '}
          <a
            href="https://flintandfuel.co.za"
            target="_blank"
            rel="noopener"
            className="underline hover:text-white/40 transition-colors"
          >
            Flint and Fuel Creative
          </a>
        </p>
      </div>
    </footer>
  )
}

// ─── WhatsApp floating button (mobile) ───────────────────
function WhatsAppFloat() {
  return (
    <a
      href="https://wa.me/27845844457"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed right-5 bottom-24 z-30 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform lg:hidden"
      style={{ minWidth: '56px' }}
    >
      <svg width="26" height="26" viewBox="0 0 24 24" fill="white" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    </a>
  )
}

// ─── App ──────────────────────────────────────────────────
export default function App() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    // Inject shimmer keyframes once
    const style = document.createElement('style')
    style.textContent = shimmerStyle
    document.head.appendChild(style)

    // Set CSS custom font vars
    document.documentElement.style.setProperty('--font-display', "'DM Serif Display', serif")
    document.documentElement.style.setProperty('--font-body', "'DM Sans', sans-serif")

    // Scroll listener for nav
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="pb-24" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <Nav scrolled={scrolled} />
      <main>
        <Hero />
        <EmpathyStrip />
        <Services />
        <MidCTA />
        <About />
        <WhyUs />
        <LeadMagnet />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
      <SalesBar />
    </div>
  )
}
