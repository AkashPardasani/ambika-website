"use client"
import React, { useState } from 'react';

const BusinessShowcase = () => {
  // Data for each business section
  const businessData = [
    {
      id: 'energy',
      title: 'ENERGY',
      heading: 'New Energy',
      description: 'We care about the collective future of humanity. Reliance is committed to achieving an ambitious net-zero carbon target by 2035. To achieve this, we are building the most comprehensive ecosystem for New Energy and New Materials in India to secure the promise of a sustainable future for generations to come. Our New Energy business will be an optimal mix of reliable, clean and affordable energy solutions with hydrogen, wind, solar, fuel cells, and batteries. We are committed to helping India lead in the Green New Energy future and are bridging the Green Energy divide in India and the world.',
      backgroundImage: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=2070',
      readMoreLink: '#'
    },
    {
      id: 'petrochemicals',
      title: 'PETROCHEMICALS',
      heading: 'Petrochemicals',
      description: 'Our petrochemicals business is one of the most integrated complexes globally, with world-scale manufacturing facilities. We produce a wide range of petrochemical products and are among the top producers of several polymers and chemicals worldwide. Our focus on operational excellence, energy efficiency, and sustainable practices has made us a leader in the petrochemicals industry. We continue to invest in advanced technologies and capacity expansions to meet the growing demand for petrochemical products.',
      backgroundImage: 'https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?q=80&w=2070',
      readMoreLink: '#'
    },
    {
      id: 'retail',
      title: 'RETAIL',
      heading: 'Retail',
      description: 'Our retail business has revolutionized the shopping experience for millions of Indians. Through our extensive network of stores and digital platforms, we offer a wide range of products from groceries to fashion, electronics to home essentials. We are committed to providing quality products at affordable prices while supporting local manufacturers and farmers. Our omnichannel approach ensures customers can shop seamlessly across physical stores and digital platforms.',
      backgroundImage: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=2070',
      readMoreLink: '#'
    },
    {
      id: 'digital-services',
      title: 'DIGITAL SERVICES - JIO',
      heading: 'Digital Services - Jio',
      description: 'Jio has transformed India\'s digital landscape by making high-speed internet accessible and affordable to millions. Our comprehensive digital ecosystem includes mobile and broadband services, digital content, cloud computing, and innovative solutions for businesses and individuals. We continue to invest in cutting-edge technologies like 5G, AI, and IoT to build a digitally empowered society and drive India\'s digital revolution forward.',
      backgroundImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072',
      readMoreLink: '#'
    },
    {
      id: 'new-energy',
      title: 'NEW ENERGY',
      heading: 'Sustainable Future',
      description: 'Our New Energy initiative represents our commitment to a sustainable future. We are developing an integrated renewable energy ecosystem encompassing solar photovoltaic, energy storage, hydrogen, and fuel cells. This comprehensive approach will enable us to offer end-to-end solutions for clean energy generation, storage, and distribution. Our ambitious plans include building giga factories for solar modules, batteries, and electrolyzers to support India\'s energy transition.',
      backgroundImage: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=2072',
      readMoreLink: '#'
    },
    {
      id: 'media-entertainment',
      title: 'MEDIA & ENTERTAINMENT',
      heading: 'Media & Entertainment',
      description: 'Our media and entertainment vertical creates and distributes premium content across multiple platforms. From blockbuster movies to engaging digital content, live sports to news, we cater to diverse audience preferences. Our state-of-the-art production facilities and partnerships with global content creators ensure we deliver world-class entertainment experiences. We are at the forefront of the digital content revolution, leveraging technology to reach audiences across India and beyond.',
      backgroundImage: 'https://images.unsplash.com/photo-1603190287605-e6ade32fa852?q=80&w=2070',
      readMoreLink: '#'
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Determine which content to show based on hover state
  const displayIndex = hoveredIndex !== null ? hoveredIndex : activeIndex;
  const currentData = businessData[displayIndex];

  return (
    <div className="relative w-full h-screen min-h-[600px] overflow-hidden">
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
      <div className="relative z-10 h-full max-w-[1400px] mx-auto px-8 py-16 flex">
        {/* Left Column - Content */}
        <div className="flex-1 flex flex-col justify-center pr-12">
          {/* OUR BUSINESSES label */}
          <div className="mb-8">
            <span className="text-white text-sm font-medium flex items-center">
              <span className="inline-block w-8 h-[1px] bg-white mr-3"></span>
              OUR BUSINESSES
            </span>
          </div>

          {/* Main Content */}
          <div className="transition-all duration-500 ease-in-out">
            <h1 className="text-white text-5xl lg:text-6xl font-light mb-8 leading-tight">
              {currentData.heading}
            </h1>
            
            <p className="text-white/90 text-base lg:text-lg leading-relaxed mb-8 max-w-2xl">
              {currentData.description}
            </p>

            <a 
              href={currentData.readMoreLink}
              className="inline-flex items-center text-white text-sm font-medium group hover:text-yellow-400 transition-colors duration-300"
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
        <div className="w-80 flex flex-col justify-center">
          <nav className="space-y-6">
            {businessData.map((item, index) => (
              <div
                key={item.id}
                className="cursor-pointer group"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => {
                  setHoveredIndex(null);
                  setActiveIndex(index);
                }}
              >
                <h3 className="text-white text-sm font-medium tracking-wider mb-2 transition-all duration-300 group-hover:text-yellow-400">
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