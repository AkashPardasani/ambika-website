"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';

const RealEstatePage = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const propertiesPerPage = 12;

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_STRAPI_URI}/api/properties?pagination[page]=${currentPage}&pagination[pageSize]=${propertiesPerPage}`
        );
        const data = res.data;
        console.log(data);
        setProperties(data.data);
        setTotal(data.meta.pagination.total);
        setTotalPages(data.meta.pagination.pageCount);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [currentPage]);

  const getImageUrl = (image) => {
    if (image?.url) {
      return image.url.startsWith('http') ? image.url : `${process.env.NEXT_PUBLIC_STRAPI_URI}${image.url}`;
    }
    return '/placeholder-property.jpg';
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      // Smooth scroll to top when page changes
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const renderPaginationNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    // Adjust startPage if we're near the end
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // Add first page and ellipsis if needed
    if (startPage > 1) {
      pages.push(
        <button
          key={1}
          onClick={() => handlePageChange(1)}
          className="w-10 h-10 rounded-lg bg-white text-[#2E2E2E] hover:bg-[#D32F2F] hover:text-white transition-colors duration-300 text-sm font-medium"
        >
          1
        </button>
      );
      if (startPage > 2) {
        pages.push(
          <span key="ellipsis1" className="text-[#B0B0B0] px-2">
            ...
          </span>
        );
      }
    }

    // Add visible page numbers
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`w-10 h-10 rounded-lg transition-colors duration-300 text-sm font-medium ${currentPage === i
              ? 'bg-[#D32F2F] text-white'
              : 'bg-white text-[#2E2E2E] hover:bg-[#D32F2F] hover:text-white'
            }`}
        >
          {i}
        </button>
      );
    }

    // Add last page and ellipsis if needed
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(
          <span key="ellipsis2" className="text-[#B0B0B0] px-2">
            ...
          </span>
        );
      }
      pages.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className="w-10 h-10 rounded-lg bg-white text-[#2E2E2E] hover:bg-[#D32F2F] hover:text-white transition-colors duration-300 text-sm font-medium"
        >
          {totalPages}
        </button>
      );
    }

    return pages;
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
          {total > 0 && (
            <p className="text-[#B0B0B0] text-lg">
              Showing {((currentPage - 1) * propertiesPerPage) + 1} - {Math.min(currentPage * propertiesPerPage, total)} of {total} properties
            </p>
          )}
        </motion.div>

        {/* Properties Grid */}
        {/* Properties Grid */}
        {properties.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 mb-16">
              {properties.map((property, index) => (
                <div key={property.id} className="cursor-pointer">
                  <Link href={`/real-estate/${property.documentId}`}>
                    <div className="bg-white group">
                      {/* Perfect Square Image Container */}
                      <div className="relative aspect-square mb-6 bg-gray-100  overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                        <Image
                          src={getImageUrl(property.herosection?.[0]?.heroImages[0])}
                          alt={property.short_description || 'Property'}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        {/* Optional overlay for better text readability */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>

                      {/* Property Title */}
                      <div className="text-left px-2">
                        <h3 className="text-lg font-medium text-[#2E2E2E] leading-relaxed mb-2 group-hover:text-[#D32F2F] transition-colors duration-300">
                          {property.herosection?.[0]?.PropertyName || 'Luxury Property'}
                        </h3>
                        <p className="text-sm text-[#666666] line-clamp-2">
                          {property.herosection?.[0]?.tagline || 'Premium Location'}
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8"
              >
                {/* Previous Button */}
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`flex items-center px-6 py-3 rounded-lg transition-all duration-300 ${currentPage === 1
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-white text-[#2E2E2E] hover:bg-[#D32F2F] hover:text-white shadow-md hover:shadow-lg'
                    }`}
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Previous
                </button>

                {/* Page Numbers */}
                <div className="flex items-center gap-2">
                  {renderPaginationNumbers()}
                </div>

                {/* Next Button */}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`flex items-center px-6 py-3 rounded-lg transition-all duration-300 ${currentPage === totalPages
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-white text-[#2E2E2E] hover:bg-[#D32F2F] hover:text-white shadow-md hover:shadow-lg'
                    }`}
                >
                  Next
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </motion.div>
            )}
          </>
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
      </div>
    </div>
  );
};

export default RealEstatePage;