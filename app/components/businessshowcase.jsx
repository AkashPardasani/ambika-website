"use client"
import React, { useState } from 'react';

const BusinessShowcase = () => {
  // Data for each business section - matching navbar dropdown items
  const businessData = [
    {
      id: 'real-estate',
      title: 'REAL ESTATE',
      heading: 'Real Estate Excellence',
      description: 'Discover premium real estate opportunities with our comprehensive portfolio of residential and commercial properties. We specialize in luxury developments, strategic investments, and innovative architectural solutions that redefine modern living. Our commitment to quality, sustainability, and customer satisfaction has established us as a trusted name in the real estate industry. From sprawling residential complexes to cutting-edge commercial spaces, we create environments that inspire and endure.',
      backgroundImage: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2070',
      readMoreLink: '/real-estate'
    },
    {
      id: 'entertainment',
      title: 'ENTERTAINMENT',
      heading: 'Entertainment & Media',
      description: 'Immerse yourself in a world of captivating entertainment experiences. Our entertainment division creates and distributes premium content across multiple platforms, from blockbuster productions to engaging digital experiences. We are at the forefront of the entertainment revolution, leveraging cutting-edge technology to deliver unforgettable experiences. Our state-of-the-art facilities and creative partnerships ensure we bring world-class entertainment to audiences everywhere.',
      backgroundImage: 'https://images.unsplash.com/photo-1489599511686-c2d7b3b5c4a5?q=80&w=2070',
      readMoreLink: '/entertainment'
    },
    {
      id: 'finance',
      title: 'FINANCE',
      heading: 'Financial Services',
      description: 'Empowering your financial future with comprehensive banking and investment solutions. Our finance division offers a complete suite of services including personal banking, corporate finance, investment management, and wealth advisory services. We combine traditional banking expertise with innovative fintech solutions to provide seamless, secure, and personalized financial experiences. Our commitment to financial inclusion and digital transformation makes banking accessible to everyone.',
      backgroundImage: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=2070',
      readMoreLink: '/finance'
    },
    {
      id: 'retail',
      title: 'RETAIL',
      heading: 'Retail Revolution',
      description: 'Transforming the retail landscape with innovative shopping experiences and premium products. Our retail network spans across multiple categories, offering everything from fashion and electronics to home essentials and groceries. We are committed to providing quality products at competitive prices while supporting local manufacturers and sustainable practices. Our omnichannel approach ensures customers enjoy seamless shopping experiences across physical stores and digital platforms.',
      backgroundImage: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=2070',
      readMoreLink: '/retail'
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Determine which content to show based on hover state
  const displayIndex = hoveredIndex !== null ? hoveredIndex : activeIndex;
  const currentData = businessData[displayIndex];

  return (
    <div className="relative w-full min-h-[600px] overflow-hidden">
      {/* Background Images */}
      {businessData.map((item, index) => (
        <div
          key={item.id}
          className={`absolute inset-0 transition-opacity duration-[800ms] ease-in-out ${
            index === displayIndex ? 'opacity-100 z-[1]' : 'opacity-0 z-0'
          }`}
          style={{
            backgroundImage: `url(${item.backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
      ))}

      {/* Content Wrapper */}
      <div className="relative z-10 h-full max-w-[1400px] mx-auto px-4 sm:px-8 py-8 sm:py-16 flex flex-col lg:flex-row">
        {/* Left Column - Content */}
        <div className="flex-1 flex flex-col justify-center pr-0 lg:pr-12 mb-8 lg:mb-0">
          {/* OUR BUSINESSES label */}
          <div className="mb-6 sm:mb-8">
            <span className="text-white text-xs sm:text-sm font-medium flex items-center">
              <span className="inline-block w-6 sm:w-8 h-[1px] bg-white mr-2 sm:mr-3"></span>
              OUR BUSINESSES
            </span>
          </div>

          {/* Main Content */}
          <div className="transition-all duration-500 ease-in-out">
            <h1 className="text-white text-3xl sm:text-4xl lg:text-6xl font-light mb-6 sm:mb-8 leading-tight">
              {currentData.heading}
            </h1>
            
            <p className="text-white/90 text-sm sm:text-base lg:text-lg leading-relaxed mb-6 sm:mb-8 max-w-2xl">
              {currentData.description}
            </p>

            <a 
              href={currentData.readMoreLink}
              className="inline-flex items-center text-white text-xs sm:text-sm font-medium group hover:text-yellow-400 transition-colors duration-300 bg-red-600 hover:bg-red-700 px-4 sm:px-6 py-2 sm:py-3 rounded-md"
            >
              <span className="mr-2">Read more</span>
              <svg 
                className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>

        {/* Right Column - Navigation */}
        <div className="w-full lg:w-80 flex flex-row lg:flex-col justify-center gap-6 lg:gap-0">
          <nav className="w-full space-y-4 lg:space-y-6 flex flex-row lg:flex-col gap-4 lg:gap-0">
            {businessData.map((item, index) => (
              <div
                key={item.id}
                className="cursor-pointer group flex-1"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => {
                  setHoveredIndex(null);
                  setActiveIndex(index);
                }}
              >
                <h3 className="text-white text-xs sm:text-sm font-medium tracking-wider mb-1 sm:mb-2 transition-all duration-300 group-hover:text-yellow-400 text-center lg:text-left">
                  {item.title}
                </h3>
                <div 
                  className={`h-[1px] transition-all duration-300 ${
                    index === displayIndex ? 'bg-yellow-400' : 'bg-white/30 group-hover:bg-yellow-400'
                  }`}
                ></div>
              </div>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default BusinessShowcase;