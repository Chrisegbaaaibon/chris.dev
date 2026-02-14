"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Section } from "@/components/section";
import { TechBadge } from "@/components/tech-badge";
import { projects } from "@/lib/data";
import { ArrowUpRight, Check, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      layout
      className="group"
    >
      <div className="relative metallic-card rounded-2xl overflow-hidden">
        {/* Top gradient accent */}
        <div
          className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
        />

        {/* Shine sweep */}
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/[0.02] to-transparent pointer-events-none" />

        <div className="relative z-10 p-6 md:p-8">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div>
              <span className="text-xs font-medium uppercase tracking-[0.15em] text-silver-500 mb-2 block">
                {project.category}
              </span>
              <h3 className="text-2xl md:text-3xl font-bold text-white">
                {project.title}
              </h3>
            </div>
            <div
              className={`w-10 h-10 rounded-xl bg-gradient-to-br ${project.gradient} flex items-center justify-center`}
            >
              <ArrowUpRight size={16} className="text-white/60" />
            </div>
          </div>

          {/* Role */}
          <p className="text-sm text-chrome-light font-medium mb-3">
            {project.role}
          </p>

          {/* Description */}
          <p className="text-silver-400 text-sm leading-relaxed mb-6">
            {project.description}
          </p>

          {/* Expandable contributions */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden mb-6"
              >
                <div className="space-y-2 p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                  <span className="text-xs font-medium uppercase tracking-[0.15em] text-silver-500 block mb-3">
                    Key Contributions
                  </span>
                  {project.contributions.map((contrib, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: i * 0.05,
                        duration: 0.3,
                      }}
                      className="flex items-start gap-3"
                    >
                      <Check
                        size={14}
                        className="text-chrome-light mt-0.5 shrink-0"
                      />
                      <span className="text-sm text-silver-300">{contrib}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tech.map((tech, i) => (
              <TechBadge key={tech} name={tech} delay={i * 0.02} />
            ))}
          </div>

          {/* Expand toggle */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 text-sm text-silver-500 hover:text-white transition-colors duration-300"
          >
            {isExpanded ? (
              <>
                <ChevronUp size={14} />
                <span>Less details</span>
              </>
            ) : (
              <>
                <ChevronDown size={14} />
                <span>View contributions</span>
              </>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export function ProjectsPage() {
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
            Portfolio
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
            Things I&apos;ve
            <br />
            <span className="chrome-text">Built</span>
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
            From SaaS platforms and fintech tools to open-source frameworks — each
            project represents real problems solved with real engineering.
          </motion.p>
        </div>
      </section>

      {/* Projects Grid */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </Section>
    </>
  );
}
