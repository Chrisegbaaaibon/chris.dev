"use client";

import { motion } from "framer-motion";
import { Section, SectionHeader } from "@/components/section";
import { MagneticButton } from "@/components/magnetic-button";
import { services } from "@/lib/data";
import {
  ArrowRight,
  Check,
  Cloud,
  Compass,
  Layers,
  Server,
} from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  server: <Server size={24} />,
  layers: <Layers size={24} />,
  cloud: <Cloud size={24} />,
  compass: <Compass size={24} />,
};

export function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-16 pb-8 lg:pt-24 lg:pb-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block text-xs font-medium uppercase tracking-[0.2em] text-silver-500 mb-4"
          >
            What I Offer
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-4"
          >
            Engineering
            <br />
            <span className="chrome-text">Services</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.2,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="text-silver-400 text-base lg:text-lg max-w-2xl leading-relaxed"
          >
            From concept to production — comprehensive engineering services built
            on years of real-world experience shipping systems at scale.
          </motion.p>
        </div>
      </section>

      {/* Service Cards */}
      <Section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: i * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group relative metallic-card rounded-2xl p-8 md:p-10 overflow-hidden"
            >
              {/* Top accent line */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-chrome-light/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Shine sweep */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/[0.02] to-transparent pointer-events-none" />

              {/* Number */}
              <div className="absolute top-8 right-8 text-6xl font-bold text-white/[0.03] select-none">
                0{i + 1}
              </div>

              <div className="relative z-10">
                <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/[0.06] text-chrome-light mb-6 group-hover:border-chrome-light/20 transition-colors duration-300">
                  {iconMap[service.icon]}
                </div>

                <h3 className="text-xl md:text-2xl font-semibold text-white mb-3">
                  {service.title}
                </h3>

                <p className="text-sm text-silver-400 leading-relaxed mb-6">
                  {service.description}
                </p>

                <div className="space-y-3">
                  {service.features.map((feature, j) => (
                    <motion.div
                      key={j}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        delay: 0.2 + j * 0.05,
                        duration: 0.3,
                      }}
                      className="flex items-center gap-3"
                    >
                      <Check size={14} className="text-chrome-light shrink-0" />
                      <span className="text-sm text-silver-300">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Process */}
      <Section>
        <SectionHeader
          label="How I Work"
          title="The Process"
          description="A structured approach to turning ideas into production-ready systems."
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            {
              step: "01",
              title: "Discovery",
              description:
                "Understanding your requirements, constraints, and goals through detailed technical discussions.",
            },
            {
              step: "02",
              title: "Architecture",
              description:
                "Designing the system — from data models and API contracts to infrastructure and deployment strategy.",
            },
            {
              step: "03",
              title: "Engineering",
              description:
                "Building with clean code, comprehensive tests, and iterative feedback loops. No shortcuts.",
            },
            {
              step: "04",
              title: "Delivery",
              description:
                "Deployment, monitoring, documentation, and handoff. Production-ready from day one.",
            },
          ].map((phase, i) => (
            <motion.div
              key={phase.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: i * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative metallic-card rounded-2xl p-6 text-center"
            >
              <div className="text-3xl font-bold chrome-text mb-4">
                {phase.step}
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {phase.title}
              </h3>
              <p className="text-xs text-silver-500 leading-relaxed">
                {phase.description}
              </p>

              {/* Connector line (hidden on last) */}
              {i < 3 && (
                <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-[1px] bg-gradient-to-r from-chrome-light/20 to-transparent" />
              )}
            </motion.div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section>
        <div className="gradient-border rounded-2xl p-12 md:p-20 text-center overflow-hidden relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-gradient-radial from-chrome-dark/10 to-transparent rounded-full blur-3xl" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to
              <span className="chrome-text"> Start a Project?</span>
            </h2>
            <p className="text-silver-400 max-w-lg mx-auto mb-8">
              Let&apos;s discuss your requirements and build something exceptional
              together.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <MagneticButton href="/contact" variant="primary">
                Get in Touch
                <ArrowRight size={14} />
              </MagneticButton>
              <MagneticButton href="/projects" variant="secondary">
                View Past Work
              </MagneticButton>
            </div>
          </motion.div>
        </div>
      </Section>
    </>
  );
}
