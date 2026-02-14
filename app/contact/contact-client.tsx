"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Section } from "@/components/section";
import { MagneticButton } from "@/components/magnetic-button";
import {
  ArrowRight,
  Check,
  Github,
  Linkedin,
  Mail,
  MessageSquare,
  Send,
} from "lucide-react";
import { siteConfig } from "@/lib/data";

function XIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 1200 1227"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z" />
    </svg>
  );
}


const contactMethods = [
  {
    icon: <Mail size={20} />,
    label: "Email",
    value: "chris@uselingu.app",
    href: siteConfig.links.email,
  },
  {
    icon: <Github size={20} />,
    label: "GitHub",
    value: "chrisegbaaaibon",
    href: siteConfig.links.github,
  },
  {
    icon: <Linkedin size={20} />,
    label: "LinkedIn",
    value: "Christopher Egbaaibon",
    href: siteConfig.links.linkedin,
  },
  {
      icon: <XIcon size={20} />,
      label: "X",
      value: "@ghostcod3r_",
      href: "https://x.com/ghostcod3r_",
    },
];

export function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset after 4s
    setTimeout(() => {
      setIsSubmitted(false);
      setFormState({ name: "", email: "", subject: "", message: "" });
    }, 4000);
  };

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
            Get in Touch
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
            Let&apos;s
            <br />
            <span className="chrome-text">Connect</span>
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
            Have a project in mind, want to collaborate, or simply want to say hello?
            I&apos;d love to hear from you.
          </motion.p>
        </div>
      </section>

      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="metallic-card rounded-2xl p-12 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      delay: 0.2,
                      type: "spring",
                      stiffness: 200,
                      damping: 15,
                    }}
                    className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-chrome-light/10 border border-chrome-light/20 mb-6"
                  >
                    <Check size={28} className="text-chrome-light" />
                  </motion.div>
                  <h3 className="text-2xl font-semibold text-white mb-2">
                    Message Sent
                  </h3>
                  <p className="text-silver-400">
                    Thanks for reaching out. I&apos;ll get back to you soon.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  onSubmit={handleSubmit}
                  className="metallic-card rounded-2xl p-6 md:p-8 space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-medium uppercase tracking-[0.1em] text-silver-500">
                        Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) =>
                          setFormState({ ...formState, name: e.target.value })
                        }
                        className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.06] rounded-xl text-white text-sm placeholder:text-silver-600 focus:outline-none focus:border-chrome-light/30 focus:ring-1 focus:ring-chrome-light/10 transition-all duration-300"
                        placeholder="Your name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-medium uppercase tracking-[0.1em] text-silver-500">
                        Email
                      </label>
                      <input
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) =>
                          setFormState({ ...formState, email: e.target.value })
                        }
                        className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.06] rounded-xl text-white text-sm placeholder:text-silver-600 focus:outline-none focus:border-chrome-light/30 focus:ring-1 focus:ring-chrome-light/10 transition-all duration-300"
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-medium uppercase tracking-[0.1em] text-silver-500">
                      Subject
                    </label>
                    <input
                      type="text"
                      required
                      value={formState.subject}
                      onChange={(e) =>
                        setFormState({ ...formState, subject: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.06] rounded-xl text-white text-sm placeholder:text-silver-600 focus:outline-none focus:border-chrome-light/30 focus:ring-1 focus:ring-chrome-light/10 transition-all duration-300"
                      placeholder="Project inquiry, collaboration, etc."
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-medium uppercase tracking-[0.1em] text-silver-500">
                      Message
                    </label>
                    <textarea
                      required
                      rows={6}
                      value={formState.message}
                      onChange={(e) =>
                        setFormState({ ...formState, message: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.06] rounded-xl text-white text-sm placeholder:text-silver-600 focus:outline-none focus:border-chrome-light/30 focus:ring-1 focus:ring-chrome-light/10 transition-all duration-300 resize-none"
                      placeholder="Tell me about your project or idea..."
                    />
                  </div>

                  <MagneticButton
                    type="submit"
                    variant="primary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="w-4 h-4 border-2 border-deep border-t-transparent rounded-full"
                        />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send size={14} />
                      </>
                    )}
                  </MagneticButton>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.3,
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <h3 className="text-lg font-semibold text-white mb-6">
                Other ways to reach me
              </h3>

              <div className="space-y-4">
                {contactMethods.map((method, i) => (
                  <motion.a
                    key={method.label}
                    href={method.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.4 + i * 0.1,
                      duration: 0.5,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="group flex items-center gap-4 p-4 metallic-card rounded-xl"
                  >
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/[0.03] border border-white/[0.06] text-chrome-light group-hover:border-chrome-light/20 transition-colors duration-300">
                      {method.icon}
                    </div>
                    <div>
                      <div className="text-xs text-silver-500 mb-0.5">
                        {method.label}
                      </div>
                      <div className="text-sm text-silver-300 group-hover:text-white transition-colors duration-300">
                        {method.value}
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Availability */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.6,
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="metallic-card rounded-2xl p-6"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-sm text-emerald-400 font-medium">
                  Available for work
                </span>
              </div>
              <p className="text-xs text-silver-500 leading-relaxed">
                Currently open to full-time positions, contract work, and
                consulting opportunities. Response time: typically within 24 hours.
              </p>
            </motion.div>
          </div>
        </div>
      </Section>
    </>
  );
}
