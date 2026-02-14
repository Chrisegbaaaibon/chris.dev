"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowUpRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import { Section, SectionHeader } from "@/components/section";
import { MagneticButton } from "@/components/magnetic-button";
import { AnimatedCounter } from "@/components/animated-counter";
import { TechBadge } from "@/components/tech-badge";
import { siteConfig, projects } from "@/lib/data";

// --- Hero Section ---
function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -50]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % siteConfig.roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const nameWords = "Christopher Egbaaibon".split(" ");
  const headlineWords = "I build scalable systems, high-performance APIs & production-ready platforms".split(" ");

  return (
    <motion.section
      style={{ opacity: heroOpacity, y: heroY }}
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden"
    >
      {/* Ambient grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,black_40%,transparent_100%)]" />

      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-chrome-dark/8 via-transparent to-transparent rounded-full blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 py-32 lg:py-40">
        <div className="max-w-4xl">
          {/* Greeting */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mb-6"
          >
            <span className="text-sm md:text-base text-silver-400 font-medium tracking-wide">
              Hi, I&apos;m
            </span>
          </motion.div>

          {/* Name */}
          <div className="mb-4">
            {nameWords.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  delay: 0.15 + i * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="inline-block text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mr-4"
              >
                {word}
              </motion.span>
            ))}
          </div>

          {/* Headline */}
          <div className="mb-8 max-w-3xl">
            {headlineWords.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.4 + i * 0.03,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="inline-block text-lg md:text-xl lg:text-2xl text-silver-400 mr-[0.3em] leading-relaxed"
              >
                {word}
              </motion.span>
            ))}
          </div>

          {/* Rotating Role */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="mb-10 h-8 overflow-hidden"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={roleIndex}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-3"
              >
                <span className="h-[1px] w-8 bg-gradient-to-r from-chrome-light to-transparent" />
                <span className="text-sm md:text-base font-mono text-chrome-light tracking-wider">
                  {siteConfig.roles[roleIndex]}
                </span>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap gap-4"
          >
            <MagneticButton href="/projects" variant="primary">
              View Work
              <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
            </MagneticButton>
            <MagneticButton href="/contact" variant="secondary">
              Contact Me
            </MagneticButton>
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-deep to-transparent" />
    </motion.section>
  );
}

// --- Metrics Section ---
function Metrics() {
  return (
    <Section>
      <div className="relative gradient-border rounded-2xl p-8 md:p-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {siteConfig.metrics.map((metric, i) => (
            <AnimatedCounter
              key={i}
              value={metric.value}
              suffix={metric.suffix}
              label={metric.label}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}

// --- Featured Work ---
function FeaturedWork() {
  const featuredProjects = projects.slice(0, 4);

  return (
    <Section>
      <SectionHeader
        label="Selected Work"
        title="Featured Projects"
        description="A selection of systems and platforms I've designed, engineered, and shipped to production."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {featuredProjects.map((project, i) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              delay: i * 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <Link href="/projects" className="group block">
              <div className="relative metallic-card rounded-2xl p-6 md:p-8 h-full overflow-hidden">
                {/* Gradient accent */}
                <div
                  className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${project.gradient} rounded-bl-full opacity-50 group-hover:opacity-100 transition-opacity duration-500`}
                />

                {/* Shine sweep */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/[0.03] to-transparent" />

                <div className="relative z-10">
                  <span className="text-xs font-medium uppercase tracking-[0.15em] text-silver-500 mb-3 block">
                    {project.category}
                  </span>
                  <h3 className="text-xl md:text-2xl font-semibold text-white mb-3 group-hover:chrome-text transition-all duration-300">
                    {project.title}
                  </h3>
                  <p className="text-sm text-silver-500 leading-relaxed mb-6 line-clamp-2">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="text-xs px-2 py-1 rounded-md bg-white/[0.03] border border-white/[0.05] text-silver-400"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 text-sm text-silver-400 group-hover:text-white transition-colors duration-300">
                    <span>View Case Study</span>
                    <ArrowUpRight
                      size={14}
                      className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="mt-12 text-center"
      >
        <MagneticButton href="/projects" variant="secondary">
          View All Projects
          <ArrowRight size={14} />
        </MagneticButton>
      </motion.div>
    </Section>
  );
}

// --- CTA Section ---
function CTASection() {
  return (
    <Section>
      <div className="relative gradient-border rounded-2xl p-12 md:p-20 text-center overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-gradient-radial from-chrome-dark/10 to-transparent rounded-full blur-3xl" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Let&apos;s Build Something
            <span className="chrome-text"> Exceptional</span>
          </h2>
          <p className="text-silver-400 text-base md:text-lg max-w-lg mx-auto mb-8">
            Available for full-time roles, contracts, and technical consulting.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <MagneticButton href="/contact" variant="primary">
              Get in Touch
              <ArrowRight size={14} />
            </MagneticButton>
            <MagneticButton href="/services" variant="secondary">
              View Services
            </MagneticButton>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}

// --- Home Page ---
export default function HomePage() {
  return (
    <>
      <Hero />
      <Metrics />
      <FeaturedWork />
      <CTASection />
    </>
  );
}
