"use client"
import React, { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

// --- Data Object ---
// All text content is stored here for easy editing.
const data = {
  title: "🌱 Corporate Social Responsibility",
  subtitle: "Giving Back Is How We Move Forward",
  intro: `At House of Ambika, growth has never been just about square feet or sales numbers. It has always been about people. From our very beginning in 1998, we’ve understood that our real strength lies in the communities around us. That’s why giving back is not just a program—it’s a core part of who we are.`,
  belief: {
    emoji: "🤝",
    title: "Our Core Belief",
    text: `We believe every business has a profound responsibility—to uplift, to include, and to empower. We owe it forward to the workers who build our homes, the youth who dream of better opportunities, and the environment we all share.`,
  },
  contributions: [
    {
      emoji: "🏗️",
      title: "Uplifting Our Construction Workers",
      text: `We ensure the people building our projects are treated with dignity through safe on-site facilities, welfare programs, and financial literacy sessions for them and their families.`,
    },
    {
      emoji: "�",
      title: "Education for Underprivileged Children",
      text: `We work with grassroots groups to fund school supplies, scholarships, and classroom infrastructure for children from economically weaker backgrounds.`,
    },
    {
      emoji: "🌳",
      title: "Green Practices in Real Estate",
      text: `Our new projects are designed with sustainability in mind: rainwater harvesting, solar planning, and waste segregation are now standard features, not afterthoughts.`,
    },
    {
      emoji: "🧠",
      title: "Mental Health Through Cinema",
      text: `Our debut film, "The Dark Side of Life: Mumbai City," opened up a crucial conversation around mental health and loneliness, using cinema as a catalyst for social change.`,
    },
  ],
  future: {
    title: "🌍 A Future-Focused Promise",
    text: `As we expand, we remain committed to responsible growth. We are actively exploring structured collaborations in:`,
    points: [
      "Affordable skill training for youth",
      "Green construction certifications",
      "Healthcare access for site communities",
    ],
  },
  closing: {
    emoji: "❤️",
    title: "Growth Means Nothing If It’s Not Shared",
    text: `Success isn’t just what we build—it’s what we leave behind. Cleaner air. Brighter futures. Stronger communities.`,
  },
  contact: `If you are an NGO, social entrepreneur, or impact-driven collaborator, we’d love to explore how we can work together.`,
};

// --- Reusable Animated Component ---
// This component wraps its children and animates them when they enter the viewport.
const AnimatedSection = ({ children, className = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 },
      }}
      initial="hidden"
      animate={controls}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

// --- Main Component ---
export default function SocialResponsibilityPage() {
  return (
    <div className="font-sans text-slate-700" style={{ backgroundColor: '#F9F7F3' }}>
      <main className="overflow-hidden">
        {/* Hero Section */}
        <header className="relative text-center py-20 md:py-32 px-4">
            <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(to_bottom,white_5%,transparent_95%)]"></div>
            <div className="relative max-w-4xl mx-auto">
                <AnimatedSection>
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-800">
                        {data.title}
                    </h1>
                    <h2 className="mt-4 text-xl md:text-2xl font-medium text-emerald-700">
                        {data.subtitle}
                    </h2>
                </AnimatedSection>
                <AnimatedSection>
                    <p className="mt-8 text-lg md:text-xl max-w-3xl mx-auto text-slate-600 leading-relaxed">
                        {data.intro}
                    </p>
                </AnimatedSection>
            </div>
        </header>

        {/* Belief Section */}
        <section className="py-16 md:py-24 px-4">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection className="bg-slate-800 text-white p-8 md:p-12 rounded-2xl shadow-2xl transform hover:scale-[1.02] transition-transform duration-500">
              <div className="flex flex-col md:flex-row items-center text-center md:text-left">
                <span className="text-6xl md:mr-8 mb-4 md:mb-0">
                  {data.belief.emoji}
                </span>
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold" style={{ color: '#D4AF37' }}>
                    {data.belief.title}
                  </h3>
                  <p className="mt-4 text-lg md:text-xl text-slate-300">
                    {data.belief.text}
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Contributions Section */}
        <section className="py-16 md:py-24 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <AnimatedSection className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-800">
                Our Key Contributions
              </h2>
            </AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
              {data.contributions.map((item, idx) => (
                <AnimatedSection key={idx}>
                  <div className="bg-slate-50 p-8 rounded-xl border border-slate-200 h-full hover:shadow-lg hover:border-emerald-500 transition-all duration-300">
                    <div className="flex items-center mb-4">
                      <span className="text-4xl mr-4">{item.emoji}</span>
                      <h4 className="text-xl font-bold text-emerald-800">
                        {item.title}
                      </h4>
                    </div>
                    <p className="text-slate-600 leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Future Promise Section */}
        <section className="py-16 md:py-24 px-4">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection className="bg-white p-8 md:p-12 rounded-2xl border border-gray-200 shadow-xl">
              <h3 className="text-2xl md:text-3xl font-bold text-center text-slate-800">
                {data.future.title}
              </h3>
              <p className="mt-4 text-lg text-center text-slate-600">
                {data.future.text}
              </p>
              <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-center">
                {data.future.points.map((point, idx) => (
                  <li
                    key={idx}
                    className="bg-emerald-50 text-emerald-800 font-semibold py-3 px-4 rounded-lg flex items-center justify-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 flex-shrink-0"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                    {point}
                  </li>
                ))}
              </ul>
            </AnimatedSection>
          </div>
        </section>

        {/* Closing Section */}
        <footer className="bg-slate-800 text-white py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <AnimatedSection>
              <span className="text-6xl">{data.closing.emoji}</span>
              <h3 className="mt-6 text-3xl md:text-4xl font-bold" style={{ color: '#D4AF37' }}>
                {data.closing.title}
              </h3>
              <p className="mt-4 text-lg md:text-xl text-slate-300 max-w-2xl mx-auto">
                {data.closing.text}
              </p>
            </AnimatedSection>
            <AnimatedSection>
              <div className="mt-12 bg-emerald-900/20 border border-emerald-500/30 p-6 rounded-lg inline-block">
                 <p className="text-lg font-medium text-emerald-300">
                    <span className="font-bold">📩 Let's Collaborate:</span> {data.contact}
                </p>
              </div>
            </AnimatedSection>
          </div>
        </footer>
      </main>
    </div>
  );
}
