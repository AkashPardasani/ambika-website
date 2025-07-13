"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const PropertyDetailPage = () => {
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const params = useParams();

  useEffect(() => {
    if (!params.id) {
      setLoading(false);
      setError("No property ID provided.");
      return;
    }

    const fetchProperty = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:1337/api/real-estate2s/${params.id}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch property: ${response.statusText}`);
        }
        const result = await response.json();
        if (!result.data) {
          throw new Error("Property not found.");
        }
        setProperty(result.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [params.id]);

  const getImageUrl = (imageObject) => {
    let url = null;
    
    if (imageObject?.url) {
      url = imageObject.url;
    } else if (imageObject?.data?.attributes?.url) {
      url = imageObject.data.attributes.url;
    } else if (imageObject?.attributes?.url) {
      url = imageObject.attributes.url;
    }
    
    if (!url) return '/placeholder.png';
    return url.startsWith('http') ? url : `http://localhost:1337${url}`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#F9F9F9]">
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
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#F9F9F9] text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-8 rounded-2xl shadow-xl max-w-md mx-4"
        >
          <div className="text-[#D32F2F] text-6xl mb-4">🏠</div>
          <h2 className="text-[#2E2E2E] text-2xl font-bold mb-2">Property Not Found</h2>
          <p className="text-[#B0B0B0] mb-6">{error}</p>
          <Link href="/real-estate" className="bg-[#D32F2F] text-white px-6 py-3 rounded-lg hover:bg-[#B71C1C] transition-colors font-semibold">
            ← Back to Properties
          </Link>
        </motion.div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#F9F9F9] text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-8 rounded-2xl shadow-xl max-w-md mx-4"
        >
          <div className="text-[#B0B0B0] text-6xl mb-4">🏠</div>
          <h2 className="text-[#2E2E2E] text-2xl font-bold mb-2">Property Not Found</h2>
          <p className="text-[#B0B0B0] mb-6">Sorry, we couldn't find the property you're looking for.</p>
          <Link href="/real-estate" className="bg-[#D32F2F] text-white px-6 py-3 rounded-lg hover:bg-[#B71C1C] transition-colors font-semibold">
            ← Back to Properties
          </Link>
        </motion.div>
      </div>
    );
  }

  const allImages = [
    ...(property.hero_image ? [property.hero_image] : []),
    ...(property.section?.map(s => s.image) || []),
    ...(property.section2_media?.flatMap(s => s.image) || [])
  ].filter(Boolean);

  const renderPoints = (pointsArray, isLocation = false) => {
    if (!pointsArray || pointsArray.length === 0) return null;
    
    const bulletClass = isLocation ? 'bg-[#C4A77D]/20 text-[#C4A77D]' : 'bg-[#D32F2F]/20 text-[#D32F2F]';
    
    return pointsArray.map((pointsSection, sectionIndex) => (
      <div key={sectionIndex} className="mb-8">
        {pointsSection.points && (
          <ul className="space-y-4">
            {pointsSection.points.map((point, index) => {
              let text = '';
              if (point.children && point.children.length > 0) {
                text = point.children.map(child => child.text || '').join(' ').trim();
              }
              
              if (!text) return null;
              
              return (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex items-start"
                >
                  <span className={`flex-shrink-0 w-8 h-8 rounded-full ${bulletClass} flex items-center justify-center text-sm font-bold mr-4 mt-1`}>
                    {index + 1}
                  </span>
                  <span className="text-[#2E2E2E] leading-relaxed">{text}</span>
                </motion.li>
              );
            }).filter(Boolean)}
          </ul>
        )}
      </div>
    ));
  };
  
  const renderIntro = (intro) => {
    if (!intro || intro.length === 0) return null;
    return intro.map((item, index) => (
      <div key={index} className="mb-8">
        <motion.h3 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl lg:text-4xl font-light text-[#2E2E2E] mb-6 leading-tight"
        >
          {item.TItle || item.title}
        </motion.h3>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg text-[#B0B0B0] leading-relaxed mb-4"
        >
          {item.description}
        </motion.p>
        {item.short_text && (
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-base text-[#B0B0B0] italic"
          >
            {item.short_text}
          </motion.p>
        )}
      </div>
    ));
  };

  return (
    <div className="bg-[#F9F9F9]">
      {/* Back Button */}
      <div className="bg-white border-b border-[#B0B0B0]/20 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/real-estate" className="inline-flex items-center text-[#D32F2F] hover:text-[#B71C1C] transition-colors font-medium">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Properties
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative h-[60vh] md:h-[80vh] w-full">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          loop={allImages.length > 1}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          className="h-full"
        >
          {allImages.length > 0 ? (
            allImages.map((image, index) => (
              <SwiperSlide key={index}>
                <Image
                  src={getImageUrl(image)}
                  alt={image.alternativeText || `Property Image ${index + 1}`}
                  fill
                  style={{ objectFit: 'cover' }}
                  className="w-full h-full"
                  priority={index === 0}
                />
              </SwiperSlide>
            ))
          ) : (
            <SwiperSlide>
               <div className="w-full h-full bg-[#B0B0B0]/20 flex items-center justify-center">
                  <span className="text-[#B0B0B0]">No images available</span>
               </div>
            </SwiperSlide>
          )}
        </Swiper>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute bottom-0 left-0 right-0 p-8 md:p-16 text-white"
        >
          <h1 className="text-4xl md:text-6xl font-light mb-4 leading-tight tracking-wide">{property.short_description}</h1>
          <p className="text-xl md:text-2xl mb-8 text-[#B0B0B0]">{property.below_icon_text}</p>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#D32F2F] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#B71C1C] transition-colors"
          >
            Enquire Now
          </motion.button>
        </motion.div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        {/* Project Overview Section */}
        {property.section && property.section.length > 0 && (
          <section className="mb-20 lg:mb-32">
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl lg:text-5xl font-light text-center text-[#2E2E2E] mb-16 lg:mb-24 tracking-wide"
            >
              Project Overview
            </motion.h2>
            
            <div className="space-y-20 lg:space-y-32">
              {property.section.map((item, index) => {
                const isEven = index % 2 === 0;
                
                return (
                  <div key={index} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${!isEven ? 'lg:grid-flow-col-dense' : ''}`}>
                    {/* Image */}
                    <motion.div
                      initial={{ opacity: 0, y: -60 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className={`relative aspect-[4/3] rounded-2xl overflow-hidden ${!isEven ? 'lg:col-start-2' : ''}`}
                    >
                      {item.image && (
                        <Image
                          src={getImageUrl(item.image)}
                          alt={item.title || 'Overview Image'}
                          fill
                          style={{ objectFit: 'cover' }}
                          className="hover:scale-105 transition-transform duration-700"
                        />
                      )}
                    </motion.div>

                    {/* Text Content */}
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? -60 : 60 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                      className={`space-y-6 ${!isEven ? 'lg:col-start-1 lg:row-start-1' : ''}`}
                    >
                      <h3 className="text-3xl lg:text-4xl font-light text-[#2E2E2E] leading-tight tracking-wide">
                        {item.title}
                      </h3>
                      <p className="text-lg lg:text-xl text-[#B0B0B0] leading-relaxed">
                        {item.description}
                      </p>
                      
                      {/* Optional: Add a subtle decorative element */}
                      <div className="w-16 h-1 bg-[#C4A77D] rounded-full"></div>
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Amenities Section */}
        {(property.section2_intro?.length > 0 || property.section2_points?.length > 0) && (
          <section className="mb-20 lg:mb-32">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white rounded-3xl p-8 lg:p-16 shadow-lg"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
                <motion.div
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  {renderIntro(property.section2_intro)}
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  {renderPoints(property.section2_points, false)}
                </motion.div>
              </div>
            </motion.div>
          </section>
        )}
        
        {/* Gallery Section */}
        {property.section2_media?.flatMap(s => s.image).filter(Boolean).length > 0 && (
          <section className="mb-20 lg:mb-32">
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl lg:text-5xl font-light text-center text-[#2E2E2E] mb-16 tracking-wide"
            >
              Gallery
            </motion.h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
              {property.section2_media.flatMap(s => s.image).filter(Boolean).map((img, index) => (
                <motion.div
                  key={index}
                  className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <Image
                    src={getImageUrl(img)}
                    alt={img.alternativeText || 'Gallery Image'}
                    fill
                    style={{ objectFit: 'cover' }}
                    className="group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* Location Section */}
        {(property.section3_intro?.length > 0 || property.section3_points?.length > 0) && (
          <section className="mb-20">
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl lg:text-5xl font-light text-center text-[#2E2E2E] mb-16 tracking-wide"
            >
              Location Advantages
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-gradient-to-br from-[#C4A77D]/10 to-[#D32F2F]/5 p-8 lg:p-16 rounded-3xl"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
                <motion.div
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  {renderIntro(property.section3_intro)}
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  {renderPoints(property.section3_points, true)}
                </motion.div>
              </div>
            </motion.div>
          </section>
        )}

        {/* Contact CTA */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-r from-[#1A1A1A] to-[#2E2E2E] rounded-3xl p-8 lg:p-16 text-white text-center"
        >
          <h2 className="text-3xl lg:text-4xl font-light mb-6 tracking-wide">Interested in This Property?</h2>
          <p className="text-lg lg:text-xl text-[#B0B0B0] mb-8 max-w-2xl mx-auto">Contact our luxury property specialists for more information or to schedule a private viewing.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#D32F2F] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#B71C1C] transition-colors"
            >
              Schedule Viewing
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-[#C4A77D] text-[#C4A77D] px-8 py-4 rounded-xl font-semibold hover:bg-[#C4A77D] hover:text-[#1A1A1A] transition-all duration-300"
            >
              Download Brochure
            </motion.button>
          </div>
        </motion.section>
      </main>
    </div>
  );
};

export default PropertyDetailPage;