"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const RealEstatePage = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch('http://localhost:1337/api/real-estate2s');
        if (!response.ok) {
          throw new Error('Failed to fetch properties');
        }
        const data = await response.json();
        setProperties(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const getImageUrl = (image) => {
    if (image?.url) {
      return image.url.startsWith('http') ? image.url : `http://localhost:1337${image.url}`;
    }
    return '/placeholder-property.jpg';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F9F9F9] flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-[#D32F2F] border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#F9F9F9] flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center bg-white p-8 rounded-2xl shadow-xl max-w-md mx-4"
        >
          <div className="text-[#D32F2F] text-6xl mb-4">⚠️</div>
          <h2 className="text-[#2E2E2E] text-2xl font-bold mb-2">Connection Error</h2>
          <p className="text-[#B0B0B0] mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-[#D32F2F] text-white px-6 py-3 rounded-lg hover:bg-[#B71C1C] transition-colors"
          >
            Try Again
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9F9F9] py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-[#2E2E2E] mb-8 tracking-wide">
            Featured Projects
          </h1>
        </motion.div>

        {/* Properties Grid */}
        {properties.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 lg:gap-12"
          >
            {properties.map((property, index) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <Link href={`/real-estate/${property.documentId}`}>
                  {/* Image Container */}
                  <div className="relative aspect-[4/3] mb-6 overflow-hidden rounded-lg bg-gray-100">
                    <Image
                      src={getImageUrl(property.hero_image)}
                      alt={property.short_description || 'Property'}
                      fill
                      className="object-cover transition-all duration-700 group-hover:scale-105"
                    />
                    
                    {/* Subtle overlay on hover */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-500" />
                  </div>
                  
                  {/* Property Title */}
                  <div className="text-center">
                    <h3 className="text-lg md:text-xl font-light text-[#2E2E2E] leading-relaxed tracking-wide group-hover:text-[#D32F2F] transition-colors duration-300">
                      {property.short_description || 'Luxury Property'}
                    </h3>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center py-20"
          >
            <div className="text-[#B0B0B0] text-8xl mb-8">🏠</div>
            <h3 className="text-2xl md:text-3xl font-light text-[#2E2E2E] mb-4">
              No Properties Found
            </h3>
            <p className="text-[#B0B0B0] text-lg mb-8 max-w-md mx-auto">
              We're currently updating our listings. Check back soon for exciting new projects.
            </p>
          </motion.div>
        )}

        {/* View More Button */}
        {properties.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center mt-16"
          >
            <Link 
              href="/all-properties" 
              className="inline-flex items-center text-[#C4A77D] hover:text-[#D32F2F] transition-colors duration-300 text-lg font-light tracking-wide group"
            >
              View More
              <svg 
                className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default RealEstatePage;