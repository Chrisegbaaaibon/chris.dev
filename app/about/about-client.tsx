"use client";

import { motion } from "framer-motion";
import { Section, SectionHeader } from "@/components/section";
import { TechBadge } from "@/components/tech-badge";
import { MagneticButton } from "@/components/magnetic-button";
import { skills } from "@/lib/data";
import { ArrowRight, Code2, Server, Cloud, Wrench } from "lucide-react";

const skillIcons: Record<string, React.ReactNode> = {
  "Backend & Systems": <Server size={18} />,
  "Frontend & Product": <Code2 size={18} />,
  "DevOps & Cloud": <Cloud size={18} />,
  "Tools & Workflow": <Wrench size={18} />,
};

export function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-16 pb-24 lg:pt-24 lg:pb-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Bio */}
            <div>
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="inline-block text-xs font-medium uppercase tracking-[0.2em] text-silver-500 mb-4"
              >
                About Me
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  delay: 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-8"
              >
                Engineering systems
                <br />
                <span className="chrome-text">that scale.</span>
              </motion.h1>

              <div className="space-y-5">
                {[
                  "I'm Christopher Egbaaibon — a Full-Stack Engineer, Backend Specialist, and DevOps Engineer with over 4 years of production experience building systems that serve real users at scale.",
                  "My journey started in backend engineering, where I developed a deep understanding of API design, database architecture, and system reliability. Over time, I expanded into full-stack product engineering and DevOps — designing CI/CD pipelines, managing cloud infrastructure, and shipping production-ready platforms.",
                  "I've built everything from collaborative savings platforms and AI-powered business tools to open-source frameworks and fintech internal tools. Every project reflects my focus on performance, scalability, and clean architecture.",
                  "I'm not just a coder — I'm an engineer who thinks in systems. I care about the infrastructure behind the product, the developer experience within the team, and the impact on the end user.",
                ].map((text, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.3 + i * 0.1,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="text-silver-400 leading-relaxed"
                  >
                    {text}
                  </motion.p>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="mt-8 flex gap-4"
              >
                <MagneticButton href="/experience" variant="primary">
                  View Experience
                  <ArrowRight size={14} />
                </MagneticButton>
                <MagneticButton href="/projects" variant="secondary">
                  See Projects
                </MagneticButton>
              </motion.div>
            </div>

            {/* Right visual - abstract identity */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.3,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative hidden lg:block"
            >
              <div className="relative aspect-square max-w-md mx-auto">
                {/* Concentric rings */}
                {[1, 2, 3].map((ring) => (
                  <motion.div
                    key={ring}
                    className="absolute inset-0 rounded-full border border-white/[0.04]"
                    style={{
                      inset: `${ring * 40}px`,
                    }}
                    animate={{
                      rotate: ring % 2 === 0 ? 360 : -360,
                    }}
                    transition={{
                      duration: 20 + ring * 10,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <div
                      className="absolute w-2 h-2 rounded-full bg-chrome-light/30"
                      style={{
                        top: "0",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                      }}
                    />
                  </motion.div>
                ))}

                {/* Center glow */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full bg-gradient-radial from-chrome-dark/20 via-chrome-dark/5 to-transparent blur-xl" />
                  <div className="absolute text-6xl font-bold chrome-text">
                    CE
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <Section>
        <SectionHeader
          label="Technical Skills"
          title="Tools & Technologies"
          description="A comprehensive toolkit spanning backend systems, frontend products, cloud infrastructure, and developer tooling."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {Object.entries(skills).map(([category, techs], catIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: catIndex * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="metallic-card rounded-2xl p-6 md:p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.06] text-chrome-light">
                  {skillIcons[category]}
                </div>
                <h3 className="text-lg font-semibold text-white">{category}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {techs.map((tech, i) => (
                  <TechBadge
                    key={tech}
                    name={tech}
                    delay={catIndex * 0.1 + i * 0.03}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Focus Areas */}
      <Section>
        <SectionHeader
          label="What I Focus On"
          title="Core Engineering Values"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Scalability",
              description:
                "Systems designed to handle growth — from database architecture to service decomposition. Performance isn't an afterthought.",
            },
            {
              title: "Reliability",
              description:
                "Production-grade infrastructure with proper monitoring, CI/CD pipelines, and deployment strategies that minimize downtime.",
            },
            {
              title: "Developer Experience",
              description:
                "Clean APIs, comprehensive documentation, and thoughtful tooling. Good DX accelerates the entire team.",
            },
          ].map((value, i) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: i * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="metallic-card rounded-2xl p-6 md:p-8"
            >
              <div className="text-3xl font-bold chrome-text mb-4">
                0{i + 1}
              </div>
              <h3 className="text-lg font-semibold text-white mb-3">
                {value.title}
              </h3>
              <p className="text-sm text-silver-500 leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </Section>
    </>
  );
}
