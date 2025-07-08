"use client"
import React, { useState, useEffect } from 'react';

const ParallaxBackground = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed inset-0 z-0">
      {/* Background Layer 1 - Slowest */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
        style={{
          transform: `translateY(${scrollY * 0.1}px)`,
        }}
      />
      
      {/* Background Layer 2 - Medium */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          transform: `translateY(${scrollY * 0.3}px)`,
          background: 'radial-gradient(circle at 30% 20%, rgba(196, 167, 125, 0.3) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(211, 47, 47, 0.2) 0%, transparent 50%)'
        }}
      />
      
      {/* Background Layer 3 - Fastest */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          transform: `translateY(${scrollY * 0.5}px)`,
          background: 'linear-gradient(45deg, transparent 30%, rgba(196, 167, 125, 0.1) 50%, transparent 70%)'
        }}
      />
    </div>
  );
};

const AboutUsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <ParallaxBackground />
      
      {/* Hero Section */}
      <section className="relative z-10 pt-32 pb-20 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
            About <span className="text-yellow-400">Us</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Discover our journey, leadership, and vision that drives us forward in creating exceptional experiences and lasting impact.
          </p>
        </div>
      </section>

      {/* Content Sections */}
      <div className="relative z-10 bg-gray-50">
        
        {/* Our History Section */}
        <section id="history" className="py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div className="order-2 lg:order-1">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8">
                  Our <span className="text-red-600">History</span>
                </h2>
                <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
                  <p>
                    Founded with a vision to transform industries and create lasting impact, our company has grown from humble beginnings to become a trusted leader across multiple sectors. Our journey began with a simple belief: that innovation and integrity should drive every decision we make.
                  </p>
                  <p>
                    Over the years, we've evolved and adapted, always staying true to our core values while embracing new opportunities. From our first breakthrough in real estate to expanding into entertainment, finance, and retail, each milestone has been a testament to our commitment to excellence and our ability to anticipate market needs.
                  </p>
                  <p>
                    Today, we stand as a testament to what's possible when vision meets execution, and we continue to build on our rich heritage while looking toward an even brighter future.
                  </p>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-red-600 to-yellow-400 rounded-lg blur opacity-30"></div>
                  <div className="relative bg-white rounded-lg shadow-2xl p-8 border-l-4 border-red-600">
                    <div className="text-center">
                      <div className="w-24 h-24 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-4">Legacy of Excellence</h3>
                      <p className="text-gray-600">Building tomorrow on the foundation of yesterday's wisdom</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Managing Director Section */}
        <section id="director" className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div>
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-yellow-400 to-red-600 rounded-lg blur opacity-30"></div>
                  <div className="relative bg-gray-50 rounded-lg shadow-2xl p-8 border-l-4 border-yellow-400">
                    <div className="text-center">
                      <div className="w-32 h-32 bg-gradient-to-br from-yellow-400 to-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-4">Visionary Leadership</h3>
                      <p className="text-gray-600">Guiding our organization toward unprecedented success</p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8">
                  From the Managing Director's <span className="text-yellow-600">Desk</span>
                </h2>
                <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
                  <p>
                    "As we navigate an ever-evolving business landscape, I am constantly inspired by our team's dedication and the trust our stakeholders place in us. Our success is not measured merely in financial terms, but in the positive impact we create for our communities and the sustainable growth we foster across all our ventures."
                  </p>
                  <p>
                    "Innovation has always been at the heart of what we do. We don't just adapt to change—we anticipate it, embrace it, and use it as a catalyst for growth. Our diverse portfolio across real estate, entertainment, finance, and retail allows us to leverage synergies and create value that extends far beyond traditional boundaries."
                  </p>
                  <p>
                    "Looking ahead, I am excited about the opportunities that lie before us. With our strong foundation, talented team, and unwavering commitment to excellence, we are well-positioned to achieve even greater heights while staying true to the values that define us."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Vision Section */}
        <section id="vision" className="py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div className="order-2 lg:order-1">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8">
                  Our <span className="text-red-600">Vision</span>
                </h2>
                <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
                  <p>
                    We envision a future where innovation meets responsibility, where business success is measured not just in profit, but in positive impact. Our vision is to be the catalyst that transforms industries, creates opportunities, and builds sustainable value for all stakeholders.
                  </p>
                  <p>
                    Through our diversified portfolio, we aim to be pioneers in each sector we enter, setting new standards for excellence and ethical business practices. We believe in the power of collaboration, the importance of sustainability, and the potential of technology to create a better tomorrow.
                  </p>
                  <p>
                    As we look toward the future, we remain committed to our core mission: to build enterprises that not only succeed financially but also contribute meaningfully to society, inspire our teams, and create lasting value for generations to come.
                  </p>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-red-600 to-yellow-400 rounded-lg blur opacity-30"></div>
                  <div className="relative bg-white rounded-lg shadow-2xl p-8 border-l-4 border-red-600">
                    <div className="text-center">
                      <div className="w-24 h-24 bg-gradient-to-br from-red-600 to-yellow-400 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-4">Future Forward</h3>
                      <p className="text-gray-600">Pioneering tomorrow's possibilities today</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-20 bg-gradient-to-r from-red-600 to-yellow-400 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Join Our Journey?
            </h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Discover how we can work together to create something extraordinary.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-red-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors duration-200">
                Get in Touch
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-red-600 transition-colors duration-200">
                Explore Our Businesses
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutUsPage;