import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import SEO from "@/components/SEO";
import JsonLd, { organizationSchema, faqSchema } from "@/components/JsonLd";
import OctopusMascot from "@/components/OctopusMascot";
import { DEMO_PRODUCTS } from "@/lib/products";
import { useCartStore } from "@/store/cartStore";

// Sparkle component for mesh effect
function Sparkle({
  x,
  y,
  delay,
  size = 3,
  color = "white",
}: {
  x: string;
  y: string;
  delay: number;
  size?: number;
  color?: string;
}) {
  return (
    <span
      className="absolute rounded-full pointer-events-none"
      style={{
        left: x,
        top: y,
        width: size,
        height: size,
        background: color,
        boxShadow: `0 0 ${size * 3}px ${color}`,
        animation: `sparkle ${2 + Math.random() * 2}s ease-in-out ${delay}s infinite`,
      }}
      aria-hidden="true"
    />
  );
}

// ============================================
// MobileLanding — pareizs mobile e-com landing
// ============================================
function MobileLanding() {
  const totalItems = useCartStore((s) => s.totalItems());
  const openCart = useCartStore((s) => s.openCart);
  const featured = DEMO_PRODUCTS.slice(0, 4);
  const categories = [
    { slug: "sensorie", label: "Sensorie", color: "from-emerald-100 to-emerald-50", text: "text-emerald-700" },
    { slug: "logikas", label: "Loģikas", color: "from-blue-100 to-blue-50", text: "text-blue-700" },
    { slug: "radosie", label: "Radošie", color: "from-amber-100 to-amber-50", text: "text-amber-700" },
    { slug: "kustibu", label: "Kustību", color: "from-rose-100 to-rose-50", text: "text-rose-700" },
  ];

  return (
    <div className="md:hidden bg-white">
      {/* Sticky header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="flex items-center justify-between px-4 h-14">
          <Link to="/" className="flex items-center gap-2 font-heading font-extrabold text-navy text-lg tracking-tight">
            <OctopusMascot variant="mini" />
            <span>8kajis<span className="text-orange">.</span>lv</span>
          </Link>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={openCart}
              className="relative p-2 text-navy"
              aria-label="Atvērt grozu"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M3 3h2l2.5 12h11l2.5-9H6" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="9" cy="20" r="1.5" />
                <circle cx="18" cy="20" r="1.5" />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-orange text-[10px] font-bold text-[#1A0A00] flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
            <Link to="/veikals" className="p-2 text-navy" aria-label="Meklēt produktus">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <circle cx="11" cy="11" r="7" />
                <path d="m21 21-4.3-4.3" strokeLinecap="round" />
              </svg>
            </Link>
          </div>
        </div>
        {/* Quick nav */}
        <nav className="flex gap-1 px-4 pb-2 overflow-x-auto" aria-label="Galvenā navigācija">
          {[
            { to: "/veikals", label: "Veikals" },
            { to: "/sensora-telpa", label: "Sensorā telpa" },
            { to: "/par-mums", label: "Par mums" },
            { to: "/kontakti", label: "Kontakti" },
          ].map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="px-3 py-1.5 rounded-full text-xs font-semibold text-navy/70 hover:bg-gray-100 whitespace-nowrap"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </header>

      {/* Hero */}
      <section
        className="relative px-5 pt-8 pb-10 overflow-hidden"
        style={{ background: "linear-gradient(135deg, #DCEAF7 0%, #C8DBED 100%)" }}
      >
        <div className="relative z-10 flex flex-col items-center text-center">
          <OctopusMascot size={110} variant="landing" />
          <span className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 bg-white/70 rounded-full text-[11px] font-bold uppercase tracking-wider text-navy">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Beleduc oficiālais partneris
          </span>
          <h1 className="mt-4 font-heading font-extrabold text-navy text-[28px] leading-[1.1] max-w-[300px]">
            Attīstošas rotaļlietas, kas saved teoriju ar prieku
          </h1>
          <p className="mt-3 text-navy/70 text-sm leading-snug max-w-[300px]">
            Izglītojošas rotaļlietas bērniem un sensorā telpa Bimini Ķekavā.
          </p>
          <Link
            to="/veikals"
            className="mt-6 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-orange text-[#1A0A00] font-bold text-sm shadow-lg w-full max-w-[280px]"
          >
            Sākt iepirkties
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <path d="M5 12h14m-6-7 7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <Link
            to="/sensora-telpa"
            className="mt-2 inline-flex items-center gap-1 px-4 py-2 text-sm font-semibold text-navy/70"
          >
            vai apmeklē Sensoro telpu →
          </Link>
        </div>
      </section>

      {/* Trust strip */}
      <section className="px-5 py-5 bg-white border-b border-gray-100">
        <div className="grid grid-cols-3 gap-3 text-center">
          {[
            { title: "Bezmaksas piegāde", desc: "Virs 100 €" },
            { title: "14 dienu atgriešana", desc: "Bez jautājumiem" },
            { title: "Droša apmaksa", desc: "SSL & Stripe" },
          ].map((b) => (
            <div key={b.title}>
              <p className="text-[11px] font-bold text-navy leading-tight">{b.title}</p>
              <p className="text-[10px] text-navy/55 mt-0.5">{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured products */}
      <section className="py-6 bg-gray-50/60" aria-labelledby="featured-heading">
        <div className="flex items-center justify-between px-5 mb-4">
          <h2 id="featured-heading" className="font-heading font-extrabold text-navy text-lg">
            Populārākie produkti
          </h2>
          <Link to="/veikals" className="text-xs font-semibold text-navy/60">
            Visi →
          </Link>
        </div>
        <div className="flex gap-3 px-5 overflow-x-auto pb-2 -mb-2 snap-x snap-mandatory" style={{ scrollbarWidth: "none" }}>
          {featured.map((p) => (
            <Link
              key={p.id}
              to={`/veikals/${p.slug}`}
              className="flex-shrink-0 w-[160px] bg-white rounded-2xl border border-gray-100 overflow-hidden snap-start"
            >
              <div className="aspect-square bg-gray-100 relative">
                <img src={p.images[0]} alt={p.name} loading="lazy" className="w-full h-full object-cover" />
                {p.badge && (
                  <span className="absolute top-2 left-2 px-2 py-0.5 bg-orange text-[#1A0A00] text-[9px] font-bold rounded-full">
                    {p.badge}
                  </span>
                )}
              </div>
              <div className="p-3">
                <p className="text-[12px] font-semibold text-navy line-clamp-2 leading-tight min-h-[32px]">
                  {p.name}
                </p>
                <p className="mt-2 text-sm font-extrabold text-navy">{p.price.toFixed(2)} €</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Sensorā telpa promo */}
      <section className="px-5 py-6">
        <Link
          to="/sensora-telpa"
          className="block relative rounded-3xl overflow-hidden p-6"
          style={{ background: "linear-gradient(135deg, #4C1D95 0%, #2D1065 100%)" }}
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/15 rounded-full text-[10px] font-bold uppercase tracking-wider text-white border border-white/25">
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#00E5CC" }} />
            Sensorā telpa Bimini
          </span>
          <h3 className="mt-3 font-heading font-extrabold text-white text-2xl leading-tight">
            Vieta, kur miers satiekas ar atklājumiem
          </h3>
          <p className="mt-2 text-white/75 text-sm leading-snug">
            Snoezelen metodoloģija. Ķekavā, Nākotnes ielā 2.
          </p>
          <span className="mt-5 inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/10 border border-white/40 text-white font-bold text-sm">
            Iepazīt Bimini
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <path d="M5 12h14m-6-7 7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </Link>
      </section>

      {/* Categories */}
      <section className="px-5 pb-6" aria-labelledby="cat-heading">
        <h2 id="cat-heading" className="font-heading font-extrabold text-navy text-lg mb-4">
          Kategorijas
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {categories.map((c) => (
            <Link
              key={c.slug}
              to={`/veikals?cat=${c.slug}`}
              className={`bg-gradient-to-br ${c.color} rounded-2xl p-5 aspect-[1.2] flex flex-col justify-between border border-gray-100`}
            >
              <span className={`font-heading font-extrabold text-base ${c.text}`}>{c.label}</span>
              <span className={`text-xs font-semibold ${c.text} opacity-70`}>Skatīt →</span>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA banner */}
      <section className="px-5 pb-8">
        <div className="bg-navy rounded-3xl p-6 text-center">
          <p className="text-white/80 text-xs font-semibold uppercase tracking-widest mb-2">
            Vajag konsultāciju?
          </p>
          <p className="font-heading font-extrabold text-white text-xl mb-4 leading-tight">
            Palīdzēsim izvēlēties pareizo
          </p>
          <a
            href="tel:+37120009028"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-orange text-[#1A0A00] font-bold text-sm"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            +371 20009028
          </a>
        </div>
      </section>

      {/* Footer mini */}
      <footer className="px-5 py-6 border-t border-gray-100 bg-gray-50">
        <div className="flex items-center justify-between text-xs text-navy/50 mb-4">
          <span>© 2026 8kajis.lv</span>
          <Link to="/privatuma-politika" className="font-semibold">
            Privātuma politika
          </Link>
        </div>
        <div className="flex items-center gap-1 px-1 py-0.5 rounded-full bg-white border border-gray-200 self-start w-fit" role="navigation" aria-label="Valodas izvēle">
          {(["LV", "EN", "RU", "LT", "EE"] as const).map((lang, i) => (
            <button
              key={lang}
              className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${i === 0 ? "bg-navy text-white" : "text-gray-500"}`}
              aria-current={i === 0 ? "true" : undefined}
            >
              {lang}
            </button>
          ))}
        </div>
      </footer>
    </div>
  );
}

export default function Landing() {
  const reduced = useReducedMotion();
  const [leaving, setLeaving] = useState<"left" | "right" | null>(null);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduced ? 0 : 0.12,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: reduced ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduced ? 0.01 : 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const handleNav = (side: "left" | "right") => {
    if (reduced) return; // navigate immediately
    setLeaving(side);
  };

  return (
    <>
      <SEO
        title="Attīstošas rotaļlietas & Sensorā telpa Bimini"
        description="Izglītojošas rotaļlietas bērniem un sensorā telpa Bimini Ķekavā. Beleduc partneris. Bezmaksas piegāde virs 100€. Snoezelen metodoloģija."
        path="/"
        lastModified="2026-05-05"
      />
      <JsonLd data={organizationSchema} />
      <JsonLd data={faqSchema} />

      {/* ============================================ */}
      {/* MOBILE — proper e-com landing (< md)         */}
      {/* ============================================ */}
      <MobileLanding />

      {/* ============================================ */}
      {/* DESKTOP — original split-screen with octopus  */}
      {/* ============================================ */}
      <main
        className="hidden md:flex md:flex-row min-h-[100dvh] overflow-hidden"
        aria-label="8kajis.lv — izvēlies savu virzienu"
      >
        {/* Language switcher — fixed overlay */}
        <div
          className="fixed top-4 right-4 z-50 flex items-center gap-0.5 px-1.5 py-1 rounded-full bg-black/30 border border-white/15"
          role="navigation"
          aria-label="Valodas izvēle"
        >
          {(["LV", "EN", "RU", "LT", "EE"] as const).map((lang, i) => (
            <button
              key={lang}
              className={`px-1.5 py-0.5 rounded-full text-[10px] sm:text-xs font-bold transition-all ${
                i === 0
                  ? "bg-white text-gray-900"
                  : "text-white/85 hover:text-white hover:bg-white/15"
              }`}
              aria-label={`Mainīt valodu uz ${lang}`}
              aria-current={i === 0 ? "true" : undefined}
            >
              {lang}
            </button>
          ))}
        </div>

        {/* ===== LEFT PANEL — E-veikals ===== */}
        <motion.div
          className={`relative flex-1 overflow-hidden cursor-pointer transition-[flex-basis] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            leaving === "left" ? "basis-full" : leaving === "right" ? "basis-0 opacity-0" : "basis-1/2"
          }`}
          style={{
            background: "linear-gradient(135deg, #A8C5E8 0%, #8BBFE8 40%, #6FA8D9 100%)",
            minWidth: leaving === "right" ? 0 : undefined,
          }}
          initial={{ x: reduced ? 0 : "-100%" }}
          animate={{ x: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          role="region"
          aria-label="E-veikals sadaļa"
        >
          {/* Wave pattern background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <svg
              className={`absolute bottom-0 left-0 w-[200%] opacity-15 ${reduced ? "" : "wave-left"}`}
              viewBox="0 0 1440 200"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M0,100 C360,180 720,20 1080,100 C1260,140 1350,60 1440,100 L1440,200 L0,200Z"
                fill="#1B2B5E"
              />
            </svg>
            <svg
              className={`absolute bottom-0 left-0 w-[200%] opacity-10 ${reduced ? "" : "wave-right"}`}
              viewBox="0 0 1440 200"
              fill="none"
              aria-hidden="true"
              style={{ transform: "translateX(-50%)" }}
            >
              <path
                d="M0,120 C240,60 480,160 720,120 C960,80 1200,160 1440,120 L1440,200 L0,200Z"
                fill="#1B2B5E"
              />
            </svg>
          </div>

          {/* Blob decorations */}
          <div
            className="absolute top-[-80px] left-[-80px] w-[140px] h-[140px] md:w-[320px] md:h-[320px] rounded-full pointer-events-none hidden md:block"
            style={{
              background: "#1B2B5E",
              opacity: 0.08,
              filter: "blur(60px)",
            }}
            aria-hidden="true"
          />
          <div
            className={`absolute bottom-[-100px] right-[-40px] w-[260px] h-[260px] rounded-full pointer-events-none hidden md:block ${
              reduced ? "" : "animate-shimmer"
            }`}
            style={{
              background: "#E8813A",
              opacity: 0.12,
              filter: "blur(60px)",
              animationDelay: "1s",
            }}
            aria-hidden="true"
          />

          {/* Content */}
          <Link
            to="/veikals"
            className="relative z-10 flex flex-col justify-center h-full px-8 md:px-12 lg:px-16 max-w-lg"
            onClick={() => handleNav("left")}
            aria-label="Doties uz e-veikalu"
          >
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col"
            >
              {/* Badge */}
              <motion.div
                variants={itemVariants}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-white/70 mb-6 self-start shadow-sm"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#1B2B5E"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
                <span className="text-navy font-bold text-xs tracking-[0.18em] uppercase">
                  E-veikals
                </span>
              </motion.div>

              {/* H1 */}
              <motion.h1
                variants={itemVariants}
                className="font-heading font-extrabold leading-[1.05] tracking-tight text-navy"
                style={{ fontSize: "clamp(32px, 4.2vw, 58px)" }}
              >
                Attīstošas spēles
                <br />
                bērniem un
                <br />
                pieaugušajiem
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                variants={itemVariants}
                className="mt-5 text-base md:text-lg max-w-sm leading-relaxed"
                style={{ color: "#2A3E6E" }}
              >
                Izglītojošas rotaļlietas bērnu attīstībai, kas veicina
                radošumu un loģisko domāšanu.
              </motion.p>

              {/* Trust strip */}
              <motion.div
                variants={itemVariants}
                className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs font-semibold text-navy/80"
              >
                <span className="inline-flex items-center gap-1.5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                  Bezmaksas piegāde virs 100€
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                  </svg>
                  Beleduc partneris
                </span>
              </motion.div>

              {/* CTA */}
              <motion.div variants={itemVariants} className="mt-8">
                <span
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl text-lg font-bold shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
                  style={{ background: "#E8813A", color: "#1A0A00" }}
                >
                  Doties uz veikalu
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </motion.div>
            </motion.div>
          </Link>

          {/* Toy image decoration — bottom right (desktop only) */}
          <div
            className="hidden md:block absolute right-[-2%] bottom-[12%] w-[min(34%,300px)] pointer-events-none"
            style={{ aspectRatio: "1/1" }}
            aria-hidden="true"
          >
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA2K9PFUMoXB1z4w1SCAV-xAKqijJHNKD4eX-LZlL5ikQbqZJe8Z-NI_rg3YVAzEhPdYGwyyJyGi8_K-lZbWyxbWDdt9ecbau32jfVJNaxb4PGQ03s5GghZ_S1LWdHlXnqHO00jAYIqDTC7z0iP2Z2Y6-tdjVHTrR2hFcl8_YJlDmZa9zyl-_2J8tYx4LhfKB5Swdz7KFlE3HmcDsexm_mmZJQSKZkvs0s4LZEfa7L976qT8h-YdeQvXvhTlhbRMTxhav8q1R4yJg"
              alt="Koka attīstošas rotaļlietas"
              width={340}
              height={340}
              loading="eager"
              fetchPriority="high"
              decoding="sync"
              className="object-contain w-full h-full drop-shadow-2xl"
            />
          </div>

          {/* Click indicator — left-aligned to avoid overlap with central scroll cue */}
          <span
            className="hidden md:inline-block absolute bottom-20 md:left-12 lg:left-16 chevron-bounce text-xs font-bold tracking-widest uppercase text-navy/70 pointer-events-none select-none"
            style={{ letterSpacing: "0.18em" }}
            aria-hidden="true"
          >
            Izvēlies veikalu ›
          </span>
        </motion.div>

        {/* ===== CENTER OCTOPUS ===== */}
        <div
          className="absolute left-1/2 top-1/2 z-30 pointer-events-none hidden md:block"
          style={{ transform: "translate(-50%, -50%)" }}
          aria-hidden="true"
        >
          <OctopusMascot size={280} variant="landing" />
        </div>

        {/* Mobile octopus — between panels */}
        <div
          className="absolute left-1/2 top-1/2 z-30 pointer-events-none md:hidden"
          style={{ transform: "translate(-50%, -50%)" }}
          aria-hidden="true"
        >
          <OctopusMascot size={120} variant="landing" />
        </div>

        {/* ===== RIGHT PANEL — Sensorā telpa ===== */}
        <motion.div
          className={`relative flex-1 overflow-hidden cursor-pointer transition-[flex-basis] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            leaving === "right" ? "basis-full" : leaving === "left" ? "basis-0 opacity-0" : "basis-1/2"
          }`}
          style={{
            background: "linear-gradient(135deg, #2D1B69 0%, #4A2080 40%, #6B3090 100%)",
          }}
          initial={{ x: reduced ? 0 : "100%" }}
          animate={{ x: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          role="region"
          aria-label="Sensorā telpa Bimini sadaļa"
        >
          {/* Sparkles / stars */}
          {!reduced && (
            <>
              <Sparkle x="20%" y="18%" delay={0} size={3} color="white" />
              <Sparkle x="65%" y="28%" delay={0.8} size={2} color="white" />
              <Sparkle x="15%" y="52%" delay={1.5} size={4} color="#00E5CC" />
              <Sparkle x="78%" y="70%" delay={0.3} size={2} color="white" />
              <Sparkle x="82%" y="22%" delay={1.2} size={3} color="#C4B5FD" />
              <Sparkle x="50%" y="65%" delay={0.6} size={2} color="#00E5CC" />
              <Sparkle x="35%" y="80%" delay={1.9} size={3} color="white" />
              <Sparkle x="90%" y="45%" delay={0.4} size={2} color="#C4B5FD" />
            </>
          )}

          {/* Purple blobs */}
          <div
            className={`absolute top-[-100px] right-[-100px] w-[400px] h-[400px] rounded-full pointer-events-none hidden md:block ${reduced ? "" : "animate-shimmer"}`}
            style={{
              background: "#7C3AED",
              opacity: 0.35,
              filter: "blur(80px)",
            }}
            aria-hidden="true"
          />
          <div
            className={`absolute bottom-[-80px] left-[-80px] w-[320px] h-[320px] rounded-full pointer-events-none hidden md:block ${reduced ? "" : "animate-shimmer"}`}
            style={{
              background: "#00E5CC",
              opacity: 0.1,
              filter: "blur(70px)",
              animationDelay: "2s",
            }}
            aria-hidden="true"
          />

          {/* Sensory photo overlay */}
          <div className="absolute inset-0 opacity-30 mix-blend-overlay pointer-events-none">
            <img
              src="https://cdn.shopify.com/s/files/1/0551/0768/2366/files/8kajisSensoric_2.jpg?v=1773695845"
              alt=""
              width={800}
              height={600}
              loading="eager"
              decoding="sync"
              className="w-full h-full object-cover"
              aria-hidden="true"
            />
          </div>

          {/* Content */}
          <Link
            to="/sensora-telpa"
            className="relative z-10 flex flex-col justify-center h-full px-8 md:px-12 lg:px-16 max-w-lg ml-auto"
            onClick={() => handleNav("right")}
            aria-label="Doties uz sensorās telpas lapu"
          >
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col"
            >
              {/* Badge */}
              <motion.div
                variants={itemVariants}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/25 mb-6 self-start shadow-sm"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#00E5CC"
                  strokeWidth="2"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 8v4M12 16h.01"/>
                </svg>
                <span className="text-[#00E5CC] font-bold text-xs tracking-[0.18em] uppercase">
                  Sensorā Telpa
                </span>
              </motion.div>

              {/* Heading */}
              <motion.h2
                variants={itemVariants}
                className="font-heading font-extrabold leading-[1.05] tracking-tight"
                style={{ color: "#FFDAD2", fontSize: "clamp(32px, 4.2vw, 58px)" }}
              >
                Sensorā telpa{" "}
                <em
                  className="not-italic"
                  style={{ fontStyle: "italic", color: "#C4B5FD" }}
                >
                  Bimini
                </em>
              </motion.h2>

              {/* Subtitle */}
              <motion.p
                variants={itemVariants}
                className="mt-5 text-base md:text-lg max-w-sm leading-relaxed"
                style={{ color: "#FFDAD2", opacity: 0.88 }}
              >
                Sensorā telpa sajūtām un izaugsmei. Ķekavā, Nākotnes ielā 2.
              </motion.p>
              <motion.p
                variants={itemVariants}
                className="mt-2 text-sm italic"
                style={{ color: "white", opacity: 0.65 }}
              >
                Vieta, kur miers satiekas ar atklājumiem.
              </motion.p>

              {/* Trust strip */}
              <motion.div
                variants={itemVariants}
                className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs font-semibold"
                style={{ color: "#C4B5FD" }}
              >
                <span className="inline-flex items-center gap-1.5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                  </svg>
                  Snoezelen metode
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6.13 6.13l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                  <a
                    href="tel:+37120009028"
                    className="hover:text-[#00E5CC] transition-colors"
                    onClick={(e) => e.stopPropagation()}
                    aria-label="Zvanīt uz +371 20009028"
                  >
                    +371 20009028
                  </a>
                </span>
              </motion.div>

              {/* CTA */}
              <motion.div variants={itemVariants} className="mt-8">
                <span
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl text-lg font-bold shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 border-2"
                  style={{
                    borderColor: "#FFDAD2",
                    color: "#FFDAD2",
                    background: "rgba(255,255,255,0.05)",
                    backdropFilter: "blur(12px)",
                  }}
                >
                  Iepazīt Bimini
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    aria-hidden="true"
                  >
                    <circle cx="11" cy="11" r="8"/>
                    <path d="m21 21-4.35-4.35"/>
                  </svg>
                </span>
              </motion.div>
            </motion.div>
          </Link>

          {/* Click indicator — right-aligned to avoid overlap with central scroll cue */}
          <span
            className="hidden md:inline-block absolute bottom-20 md:right-12 lg:right-16 chevron-bounce text-xs font-bold tracking-widest uppercase pointer-events-none select-none"
            style={{
              letterSpacing: "0.18em",
              color: "rgba(255,218,210,0.7)",
            }}
            aria-hidden="true"
          >
            Iepazīt Bimini ›
          </span>
        </motion.div>

        {/* ===== BOTTOM CENTER — choose direction (desktop only) ===== */}
        <div
          className="hidden md:block absolute bottom-6 left-1/2 z-40 pointer-events-none text-center px-4 py-2 rounded-full backdrop-blur-md"
          style={{
            transform: "translateX(-50%)",
            background: "rgba(0,0,0,0.25)",
          }}
          aria-hidden="true"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
            Izvēlies savu virzienu
          </p>
          <div className="chevron-bounce mt-1 text-white/80 text-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="mx-auto" aria-hidden="true">
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </div>
        </div>
      </main>

      {/* Mobile layout override — stack vertically */}
      <style>{`
        @media (max-width: 767px) {
          main[aria-label="8kajis.lv — izvēlies savu virzienu"] {
            flex-direction: column !important;
            height: 100dvh;
          }
          main[aria-label="8kajis.lv — izvēlies savu virzienu"] > div:first-child,
          main[aria-label="8kajis.lv — izvēlies savu virzienu"] > div:last-child {
            flex-basis: 50% !important;
            min-height: 50dvh;
          }
        }
      `}</style>
    </>
  );
}
