"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { usePathname } from 'next/navigation';
import { PinContainer } from "@/app/components/ui/3d-pin";
import { AuroraBackground } from "@/app/components/ui/aurora-background";
import { TextGenerateEffect } from "@/app/components/ui/text-generate-effect";

export default function AboutUsPage() {
  const pathname = usePathname();

  // This useEffect handles scrolling when navigating to the page with a hash
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const id = hash.substring(1); // remove the '#'
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [pathname]);

  const historyItems = [
    {
      year: "1998",
      title: "A Humble Beginning",
      description:
        "Our legacy began with a small shop and a big dream: Ambika Paints and Hardware Stores in Bhopal, founded on honesty, reliability, and heart.",
    },
    {
      year: "2004",
      title: "Leap into Real Estate",
      description:
        "We took a bold leap with Crystal Campus, our first real estate project, laying the foundation for a household name in Central India.",
    },
    {
      year: "Today",
      title: "A Family of Ventures",
      description:
        "With 860+ homes built and 11.7 lakh+ sq.ft. delivered, House of Ambika is now a family of ventures in real estate, finance, entertainment, and retail, driven by integrity and empathy.",
    },
  ];

  const ventures = [
    { title: "Real Estate", description: "Building communities and dream homes.", link: "#" },
    { title: "Finance", description: "Enabling dreams and supporting growth.", link: "#" },
    { title: "Entertainment", description: "Telling stories that spark change.", link: "#" },
    { title: "Retail", description: "Serving families with reliability and heart.", link: "#" },
  ];

  return (
    <div className="bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <AuroraBackground>
        <motion.div
          initial={{ opacity: 0.0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="relative flex flex-col gap-4 items-center justify-center px-4 py-32"
        >
          <div className="text-3xl md:text-7xl font-bold text-white text-center">
            House of Ambika
          </div>
          <div className="font-extralight text-base md:text-4xl text-yellow-200 py-4">
            Building Legacies, Touching Lives.
          </div>
          <div className="w-24 h-1 bg-yellow-400 mx-auto mt-8"></div>
        </motion.div>
      </AuroraBackground>

      {/* History Section */}
      <section id="history" className="py-20 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-red-100 text-red-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <span>Our Journey</span>
            </div>
            <TextGenerateEffect 
              words="Our History" 
              className="text-center text-4xl md:text-5xl font-bold text-gray-800 mb-6" 
            />
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Every legacy has a humble beginning—and ours began with a small shop and a big dream.
            </p>
          </div>
          
          <div className="relative">
            {/* Desktop Timeline */}
            <div className="hidden md:block absolute w-0.5 h-full bg-gray-300 left-1/2 transform -translate-x-1/2"></div>
            <div className="space-y-16 md:space-y-0">
              {historyItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className={`md:flex items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                >
                  <div className="md:w-1/2 flex justify-center">
                    <div className={`w-full md:max-w-md p-8 rounded-2xl shadow-lg bg-white text-gray-800 hover:shadow-xl transition-shadow duration-300 ${index % 2 === 0 ? 'md:ml-8' : 'md:mr-8'}`}>
                      <h3 className="text-2xl font-bold text-red-600 mb-4">{item.title}</h3>
                      <p className="text-base text-gray-600 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                  <div className="hidden md:flex md:w-1/2 justify-center items-center">
                     <div className="z-10 bg-gradient-to-r from-red-600 to-red-700 text-white w-24 h-24 rounded-full flex items-center justify-center text-xl font-bold shadow-xl">
                        {item.year}
                     </div>
                  </div>
                   {/* Mobile Year Badge */}
                   <div className="md:hidden flex items-center mt-4">
                        <div className="z-10 bg-gradient-to-r from-red-600 to-red-700 text-white w-16 h-16 rounded-full flex items-center justify-center text-lg font-bold shadow-xl">
                           {item.year}
                        </div>
                        <div className="w-full h-0.5 bg-gray-300 ml-4"></div>
                   </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MD's Desk Section */}
      <section id="director" className="py-20 px-4 bg-gradient-to-r from-gray-800 to-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-8 text-white">
            <span>Leadership Message</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">
            From the Managing Director's <span className="text-yellow-400">Desk</span>
          </h2>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-white/20"
          >
            <div className="mb-8">
              <div className="w-24 h-24 bg-gradient-to-br from-red-600 to-yellow-400 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white font-bold text-lg">RP</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Rajesh Pardasani</h3>
              <p className="text-yellow-400 font-medium">Managing Director</p>
            </div>
            
            <blockquote className="text-lg italic text-gray-300 mb-6 leading-relaxed">
              "When I look back at our journey, it fills me with both gratitude and purpose. We began with nothing but a small shop, a determined heart, and a belief—that if we treated people right, they'd walk with us."
            </blockquote>
            
            <div className="text-yellow-400 font-bold text-xl mb-2">And walk with us, you did.</div>
            
            <p className="text-gray-300 leading-relaxed mb-6">
              From building homes that families now call their own, to creating spaces where stories come to life, and offering financial support to those chasing their dreams—we've always believed in being more than a business. We've believed in being a part of people's lives.
            </p>
            
            <div className="pt-6 border-t border-white/20">
              <p className="text-white font-medium">With warmth,</p>
              <p className="text-yellow-400 font-bold">Rajesh Pardasani</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Vision Section */}
      <section id="vision" className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-red-100 text-red-600 px-4 py-2 rounded-full text-sm font-medium mb-8">
            <span>Future Forward</span>
          </div>
          <TextGenerateEffect 
            words="Our Vision" 
            className="text-center text-4xl md:text-5xl font-bold text-gray-800 mb-8" 
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-8 shadow-xl"
          >
            <p className="text-xl md:text-2xl text-gray-600 italic leading-relaxed mb-6">
              "We believe that business is ultimately about people. Our vision is to build more than buildings—to create spaces that feel like home... to enable someone's leap of faith... to tell stories that spark change."
            </p>
            <div className="bg-red-50 border-l-4 border-red-600 p-6 rounded-r-lg">
              <p className="text-lg font-medium text-gray-700">
                In everything we do, we're not just chasing success—<strong className="text-red-600">we're chasing meaning</strong>.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

       {/* Ventures Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-800 to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium mb-6 sm:mb-8 text-white">
              <span>Our Portfolio</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
              Our <span className="text-yellow-400">Ventures</span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto px-4">
              Diverse businesses united by shared values of integrity, empathy, and excellence.
            </p>
          </div>
          
          {/* Grid Layout for Ventures */}
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8">
            {ventures.map((venture, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="flex-shrink-0"
              >
                <PinContainer title={venture.title} href={venture.link}>
                  <div className="flex basis-full flex-col p-4 sm:p-6 tracking-tight text-slate-100/50 w-[280px] sm:w-[320px] h-[280px] sm:h-[320px]">
                    <h3 className="max-w-xs !pb-2 !m-0 font-bold text-base sm:text-lg text-white">
                      {venture.title}
                    </h3>
                    <div className="text-sm sm:text-base !m-0 !p-0 font-normal">
                      <span className="text-gray-300">
                        {venture.description}
                      </span>
                    </div>
                    <div className="flex flex-1 w-full rounded-lg mt-4 bg-gradient-to-br from-red-600 via-yellow-400 to-red-700" />
                  </div>
                </PinContainer>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-red-600 to-red-700 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Join Our Journey
            </h2>
            <p className="text-xl mb-8 opacity-95 max-w-2xl mx-auto">
              Be a part of our story as we continue to build, grow, and create meaningful impact in people's lives.
            </p>
            <button className="bg-yellow-400 hover:bg-yellow-300 text-gray-800 px-8 py-4 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl">
              Connect With Us
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}