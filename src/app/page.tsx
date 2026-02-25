"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  Shield,
  Zap,
  Globe,
  Users,
  Lock,
  Check,
  Github,
  Twitter,
  Menu,
  X,
} from "lucide-react";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "Docs", href: "#" },
  { label: "Blog", href: "#" },
];

const features = [
  {
    icon: <BarChart3 className="h-5 w-5" />,
    title: "Real-time Analytics",
    description: "Monitor every metric in real-time with live dashboards, custom charts, and automated reporting.",
  },
  {
    icon: <Shield className="h-5 w-5" />,
    title: "Enterprise Security",
    description: "SOC 2 compliant infrastructure with SSO, SAML, and granular role-based access controls.",
  },
  {
    icon: <Zap className="h-5 w-5" />,
    title: "Lightning Fast",
    description: "Sub-50ms response times powered by edge computing across 40+ global data centers.",
  },
  {
    icon: <Globe className="h-5 w-5" />,
    title: "Global Edge Network",
    description: "Deploy to the edge instantly. Your data is always close to your users, everywhere.",
  },
  {
    icon: <Users className="h-5 w-5" />,
    title: "Team Collaboration",
    description: "Built for teams of all sizes. Shared workspaces, real-time editing, and seamless handoffs.",
  },
  {
    icon: <Lock className="h-5 w-5" />,
    title: "API-First Platform",
    description: "Every feature accessible via REST API. Build custom integrations in minutes, not weeks.",
  },
];

const plans = [
  {
    name: "Starter",
    price: "$0",
    description: "For individuals and small projects",
    features: ["3 team members", "5 GB storage", "10K API calls/mo", "Community support", "Basic analytics"],
    cta: "Get Started",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$49",
    description: "For growing teams and businesses",
    features: ["15 team members", "100 GB storage", "1M API calls/mo", "Priority support", "Advanced analytics", "Custom integrations", "SSO"],
    cta: "Start Free Trial",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For organizations at scale",
    features: ["Unlimited members", "1 TB storage", "Unlimited API calls", "24/7 dedicated support", "Custom SLA", "Audit logs", "SAML & SSO", "On-premise option"],
    cta: "Contact Sales",
    highlighted: false,
  },
];

function LandingNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4">
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className={`relative flex h-12 w-full max-w-3xl items-center justify-between rounded-full border px-5 transition-all duration-300 ${scrolled
          ? "border-white/[0.08] bg-black/70 shadow-lg shadow-black/20 backdrop-blur-xl"
          : "border-white/[0.06] bg-white/[0.03] backdrop-blur-md"
          }`}
      >
        <Link href="/" className="text-[14px] font-semibold tracking-tight text-white">
          Khlan
        </Link>

        <nav className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[13px] text-white/40 transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/login"
            className="text-[13px] text-white/40 transition-colors hover:text-white"
          >
            Log in
          </Link>
          <Link
            href="/login"
            className="rounded-full bg-white px-3.5 py-1 text-[12px] font-medium text-black transition-opacity hover:opacity-85"
          >
            Sign Up
          </Link>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="text-white/50 md:hidden"
        >
          {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </motion.header>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed left-4 right-4 top-[72px] z-50 rounded-2xl border border-white/[0.06] bg-black/95 px-5 py-4 backdrop-blur-xl"
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block py-2 text-sm text-white/50 transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
          <div className="mt-3 flex items-center gap-3 border-t border-white/[0.06] pt-3">
            <Link href="/login" className="text-sm text-white/50 hover:text-white">
              Log in
            </Link>
            <Link
              href="/login"
              className="rounded-full bg-white px-4 py-1.5 text-sm font-medium text-black"
            >
              Sign Up
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  );
}

function HeroSection() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const y = useTransform(scrollY, [0, 400], [0, 60]);

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-black px-6">
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <div className="pointer-events-none absolute bottom-0 left-1/2 h-[600px] w-[900px] -translate-x-1/2 translate-y-[30%]">
        <div className="absolute inset-0 rounded-full"
          style={{
            background: "conic-gradient(from 180deg at 50% 50%, #f43f5e 0deg, #ec4899 60deg, #8b5cf6 120deg, #3b82f6 180deg, #06b6d4 240deg, #10b981 300deg, #f43f5e 360deg)",
            opacity: 0.15,
            filter: "blur(80px)",
          }}
        />
      </div>

      <div className="pointer-events-none absolute bottom-[15%] left-1/2 -translate-x-1/2">
        <div className="relative">
          <div
            className="h-0 w-0"
            style={{
              borderLeft: "100px solid transparent",
              borderRight: "100px solid transparent",
              borderBottom: "180px solid rgba(255,255,255,0.04)",
            }}
          />
          <div
            className="absolute left-1/2 top-[60%] h-px w-[500px] -translate-x-1/2"
            style={{
              background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.08) 20%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.08) 80%, transparent 100%)",
            }}
          />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-[350px]"
        style={{
          background: "linear-gradient(to bottom, transparent, rgba(0,0,0,0.4) 30%, rgba(10,10,10,1))",
        }}
      />

      <motion.div style={{ opacity, y }} className="relative z-10 flex flex-col items-center text-center">
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="max-w-3xl text-5xl font-bold leading-[1.08] tracking-tight text-white sm:text-6xl md:text-7xl"
        >
          Analyze{" "}
          <span className="bg-gradient-to-r from-white/60 to-white/30 bg-clip-text text-transparent">
            with Khlan.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.6 }}
          className="mt-6 max-w-lg text-[15px] leading-relaxed text-white/40"
        >
          Khlan provides the infrastructure and analytics for teams to build, deploy,
          and scale applications with confidence. Based in Vercel.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-10 flex items-center gap-4"
        >
          <Link
            href="/login"
            className="group flex items-center gap-2 rounded-full bg-white px-6 py-2.5 text-sm font-medium text-black transition-all hover:bg-white/90"
          >
            Start Building
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <a
            href="#features"
            className="rounded-full border border-white/[0.12] bg-white/[0.04] px-6 py-2.5 text-sm font-medium text-white/70 transition-all hover:border-white/20 hover:text-white"
          >
            Learn More
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-[18%] left-1/2 z-10 -translate-x-1/2 text-center"
      >
        <p className="text-sm font-medium text-white/30">
          Develop with your favorite tools <span className="font-mono text-white/20">{">_"}</span>
        </p>
        <p className="mt-1 text-sm font-medium text-white/30">
          Launch globally, instantly <span className="text-white/20">⊕</span> Keep pushing forward <span className="text-white/20">↗</span>
        </p>
      </motion.div>
    </section>
  );
}

function FeaturesSection() {
  return (
    <section id="features" className="relative bg-[#0a0a0a] py-32">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Everything you need to scale
          </h2>
          <p className="mx-auto mt-4 max-w-md text-[15px] text-white/40">
            Powerful features designed for modern teams. Built with performance
            and developer experience in mind.
          </p>
        </motion.div>

        <div className="mt-20 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.03] md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className="group bg-[#0a0a0a] p-8 transition-colors hover:bg-white/[0.02]"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.03] text-white/60 transition-colors group-hover:border-white/10 group-hover:text-white">
                {feature.icon}
              </div>
              <h3 className="mt-4 text-[15px] font-semibold text-white">
                {feature.title}
              </h3>
              <p className="mt-2 text-[13px] leading-relaxed text-white/40">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingSection() {
  return (
    <section id="pricing" className="relative bg-[#0a0a0a] py-32">
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Simple, transparent pricing
          </h2>
          <p className="mx-auto mt-4 max-w-md text-[15px] text-white/40">
            Start free, scale when you&apos;re ready. No hidden fees, no surprises.
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className={`rounded-xl border p-8 ${plan.highlighted
                ? "border-white/[0.12] bg-white/[0.03] ring-1 ring-white/[0.06]"
                : "border-white/[0.06] bg-[#0a0a0a]"
                }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-white">{plan.name}</span>
                {plan.highlighted && (
                  <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-[10px] font-medium text-white/60">
                    Popular
                  </span>
                )}
              </div>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-bold text-white">{plan.price}</span>
                {plan.price !== "Custom" && (
                  <span className="text-sm text-white/30">/month</span>
                )}
              </div>
              <p className="mt-2 text-[13px] text-white/40">{plan.description}</p>

              <Link
                href="/login"
                className={`mt-6 block w-full rounded-lg py-2.5 text-center text-sm font-medium transition-all ${plan.highlighted
                  ? "bg-white text-black hover:bg-white/90"
                  : "border border-white/[0.12] text-white/70 hover:border-white/20 hover:text-white"
                  }`}
              >
                {plan.cta}
              </Link>

              <ul className="mt-8 space-y-3">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2.5 text-[13px] text-white/50"
                  >
                    <Check className="h-3.5 w-3.5 flex-shrink-0 text-white/30" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaSection() {
  return (
    <section className="relative bg-[#0a0a0a] py-32">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to get started?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-[15px] text-white/40">
            Join thousands of teams already building on Khlan. Start free, no credit card required.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <Link
              href="/login"
              className="group flex items-center gap-2 rounded-full bg-white px-6 py-2.5 text-sm font-medium text-black transition-all hover:bg-white/90"
            >
              Start Building
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <a
              href="#"
              className="rounded-full border border-white/[0.12] bg-white/[0.04] px-6 py-2.5 text-sm font-medium text-white/70 transition-all hover:border-white/20 hover:text-white"
            >
              Talk to Sales
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  const columns = [
    {
      title: "Product",
      links: ["Features", "Pricing", "Changelog", "Documentation", "API Reference"],
    },
    {
      title: "Company",
      links: ["About", "Blog", "Careers", "Customers", "Press"],
    },
    {
      title: "Resources",
      links: ["Community", "Help Center", "Status", "Security", "Terms"],
    },
  ];

  return (
    <footer className="border-t border-white/[0.06] bg-[#0a0a0a]">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div>
            <span className="text-sm font-semibold tracking-tight text-white">Khlan</span>
            <p className="mt-4 text-xs leading-relaxed text-white/30">
              Infrastructure and analytics for modern teams.
            </p>
            <div className="mt-5 flex gap-3">
              <a href="#" className="text-white/20 transition-colors hover:text-white/50">
                <Github className="h-4 w-4" />
              </a>
              <a href="#" className="text-white/20 transition-colors hover:text-white/50">
                <Twitter className="h-4 w-4" />
              </a>
            </div>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-xs font-medium uppercase tracking-wider text-white/40">
                {col.title}
              </h4>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-[13px] text-white/30 transition-colors hover:text-white/60"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-8 sm:flex-row">
          <p className="text-xs text-white/20">&copy; Made By Gustavo J.</p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-white/20 hover:text-white/40">
              Privacy Policy
            </a>
            <a href="#" className="text-xs text-white/20 hover:text-white/40">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function LandingPage() {
  return (
    <div className="bg-black">
      <LandingNavbar />
      <HeroSection />
      <FeaturesSection />
      <PricingSection />
      <CtaSection />
      <Footer />
    </div>
  );
}
