"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Section, SectionHeader } from "@/components/section";
import { TechBadge } from "@/components/tech-badge";
import { experiences } from "@/lib/data";
import { Briefcase, Users } from "lucide-react";
import { cn } from "@/lib/utils";

export function ExperiencePage() {
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
            Career
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
            Professional
            <br />
            <span className="chrome-text">Experience</span>
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
            A track record of building, shipping, and scaling production systems
            across startups and organizations.
          </motion.p>
        </div>
      </section>

      {/* Timeline */}
      <Section>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          {/* Timeline line */}
          <div className="absolute left-0 md:left-8 top-0 bottom-0 w-[1px] bg-gradient-to-b from-chrome-light/20 via-chrome-light/10 to-transparent" />

          <div className="space-y-0">
            {experiences.engineering.map((exp, i) => (
              <motion.div
                key={`${exp.company}-${exp.role}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="relative pl-8 md:pl-20 pb-12 last:pb-0 group"
              >
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-8 top-1 -translate-x-1/2 w-3 h-3 rounded-full border-2 border-chrome-light/30 bg-deep group-hover:border-chrome-light/60 group-hover:bg-chrome-light/10 transition-all duration-300">
                  <div className="absolute inset-1 rounded-full bg-chrome-light/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <div className="metallic-card rounded-2xl p-6 md:p-8 group-hover:border-white/10 transition-all duration-400">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-4">
                    <div>
                      <h3 className="text-lg md:text-xl font-semibold text-white">
                        {exp.company}
                      </h3>
                      <p className="text-sm text-chrome-light font-medium">
                        {exp.role}
                      </p>
                    </div>
                    <span className="text-xs font-mono text-silver-500 whitespace-nowrap mt-1">
                      {exp.period}
                    </span>
                  </div>

                  <p className="text-sm text-silver-400 leading-relaxed mb-4">
                    {exp.description}
                  </p>

                  {exp.tech && exp.tech.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {exp.tech.map((tech, j) => (
                        <TechBadge key={tech} name={tech} delay={j * 0.02} />
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Section>
    </>
  );
}
