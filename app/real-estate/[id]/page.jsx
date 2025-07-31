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
import axios from 'axios';

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
        const response = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_URI}/api/properties/${params.id}`);
        const result = response.data;
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
    } else if (imageObject?.formats) {
      url = imageObject.formats.large?.url || imageObject.url;
    }

    if (!url) return '/placeholder.png';
    return url.startsWith('http') ? url : `${process.env.NEXT_PUBLIC_STRAPI_URI}${url}`;
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
          {/* <Link href="/real-estate" className="bg-[#D32F2F] text-white px-6 py-3 rounded-lg hover:bg-[#B71C1C] transition-colors font-semibold">
            ← Back to Properties
          </Link> */}
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
          {/* <Link href="/real-estate" className="bg-[#D32F2F] text-white px-6 py-3 rounded-lg hover:bg-[#B71C1C] transition-colors font-semibold">
            ← Back to Properties
          </Link> */}
        </motion.div>
      </div>
    );
  }

  const allImages = [
    ...(property.herosection?.flatMap(h => h.heroImages || []) || []),
    ...(property.overview?.flatMap(o => o.image ? [o.image] : []) || []),
  ];

const renderPoints = (pointsArray, isLocation = false) => {
  if (!pointsArray || pointsArray.length === 0) return null;

  const bulletClass = isLocation ? 'bg-[#C4A77D]/20 text-[#C4A77D]' : 'bg-[#D32F2F]/20 text-[#D32F2F]';

  return pointsArray.map((pointsSection, sectionIndex) => (
    <div key={sectionIndex} className="mb-8">
      {pointsSection.points && pointsSection.points.length > 0 && (
        <ul className="space-y-4">
          {pointsSection.points.map((listBlock, blockIndex) => {
            if (isLocation) {
              // Location-specific rendering: assume flat {name, distanceMin} objects
              const text = listBlock.name;
              const distanceMin = listBlock.distanceMin;

              if (!text || !distanceMin) return null; // Skip if missing key fields (edge case handling)

              return (
                <motion.li
                  key={blockIndex}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: blockIndex * 0.1 }}
                  className="flex items-center justify-between py-3 border-b border-gray-200 last:border-b-0"
                >
                  {/* Left side: Icon and Text */}
                  <div className="flex items-center">
                    <span className="text-2xl mr-4 text-[#C4A77D]">
                      {/* You can replace this emoji with an SVG icon */}
                      📍
                    </span>
                    <span className="text-[#2E2E2E] leading-relaxed">{text}</span>
                  </div>

                  {/* Right side: Distance */}
                  <span className="text-[#2E2E2E] font-semibold leading-relaxed">
                    {distanceMin}
                  </span>
                </motion.li>
              );
            } else {
              // Non-location: handle rich text blocks (lists or paragraphs)
              let text = '';
              let childItems = [];

              if (listBlock.type === 'list' && listBlock.children) {
                childItems = listBlock.children.filter(
                  (listItem) => listItem.type === 'list-item' && listItem.children
                );
              } else if (listBlock.children && listBlock.children.length > 0) {
                // Fallback for other blocks (e.g., paragraphs)
                text = listBlock.children.map((child) => child.text || '').join(' ').trim();
              }

              if (childItems.length > 0) {
                // Render sub-items for lists
                return childItems.map((listItem, itemIndex) => {
                  const itemText = listItem.children.map((child) => child.text || '').join(' ').trim();
                  if (!itemText) return null; // Skip empty items

                  return (
                    <motion.li
                      key={`${blockIndex}-${itemIndex}`}
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: itemIndex * 0.1 }}
                      className="flex items-center gap-4"
                    >
                      <span className={`flex-shrink-0 w-8 h-8 rounded-full ${bulletClass} flex items-center justify-center text-sm font-bold`}>
                        {itemIndex + 1}
                      </span>
                      <span className="text-[#2E2E2E] leading-relaxed flex-1">{itemText}</span>
                    </motion.li>
                  );
                }).filter(Boolean);
              } else if (text) {
                // Render single block as li (e.g., paragraph fallback)
                return (
                  <motion.li
                    key={blockIndex}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: blockIndex * 0.1 }}
                    className="flex items-center gap-4"
                  >
                    <span className={`flex-shrink-0 w-8 h-8 rounded-full ${bulletClass} flex items-center justify-center text-sm font-bold`}>
                      {blockIndex + 1}
                    </span>
                    <span className="text-[#2E2E2E] leading-relaxed flex-1">{text}</span>
                  </motion.li>
                );
              }

              return null; // Skip if no renderable content
            }
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
          className="text-lg text-[black] leading-relaxed mb-4"
        >
          {item.description}
        </motion.p>
        {item.short_text && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-base text-[black] italic"
          >
            {item.short_text}
          </motion.p>
        )}
        {item.iframe && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-8"
          >
            <iframe
              src={item.iframe}  // You'll update this src later with the correct embed URL
              className="w-full h-64 md:h-96 rounded-xl shadow-lg"
              frameBorder="0"
              allowFullScreen
              loading="lazy"
              title="Location Map"
            />
          </motion.div>
        )}
      </div>
    ));
  };

  return (
    <div className="bg-[#F9F9F9] overflow-hidden">
      {/* Back Button */}
      {/* <div className="bg-white border-b border-[#B0B0B0]/20 sticky top-0 z-40">
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
      </div> */}

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
          <h1 className="text-4xl md:text-6xl font-light mb-4 leading-tight tracking-wide">{property.herosection?.[0]?.PropertyName}</h1>
          <p className="text-xl md:text-2xl mb-8 text-[#B0B0B0]">{property.herosection?.[0]?.tagline}</p>
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
        {property.overview && property.overview.length > 0 && (
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
              {property.overview.map((item, index) => {
                const isEven = index % 2 === 0;

                return (
                  <div key={index} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${!isEven ? 'lg:grid-flow-col-dense' : ''}`}>
                    {/* Image */}
                    <motion.div
                      initial={{ opacity: 0, y: -60 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className={`relative aspect-[4/3] overflow-hidden ${!isEven ? 'lg:col-start-2' : ''}`}
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
                        {item.Title}
                      </h3>
                      <p className="text-lg lg:text-xl text-black leading-relaxed">
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
        {(property.ameneties?.length > 0 || property.ameneties?.flatMap(a => a.ameneties_list || [])?.length > 0) && (
          <section className="mb-20 lg:mb-32">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-[#F9F9F9] p-8 lg:p-16 "
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
                <motion.div
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  {renderIntro(property.ameneties?.length > 0 ? [{ title: property.ameneties[0].title, description: property.ameneties[0].description }] : [])}
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  {renderPoints(property.ameneties?.flatMap(a => ({ points: a.ameneties_list || [] })))}
                </motion.div>
              </div>
            </motion.div>
          </section>
        )}

        {/* Gallery Section */}
        {property.ameneties?.flatMap(a => a.gallery || []).length > 0 && (
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
              {property.ameneties.flatMap(a => a.gallery || []).map((img, index) => (
                <motion.div
                  key={index}
                  className="relative aspect-square overflow-hidden cursor-pointer group"
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
        {/* Brochure section  */}

        <section className="mb-20 lg:mb-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            
            {/* Download Brochure Button */}
            {property.brochure?.property_brochure && (
              
              <motion.a
                href={getImageUrl(property.brochure.property_brochure)}
                download
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 bg-[#D32F2F] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#B71C1C] transition-all duration-300 shadow-lg hover:shadow-xl mb-6"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download Brochure
              </motion.a>
            )}
            
            {/* Contact Sales Team Number */}
            <div className="mt-6">
              <p className="text-lg text-[#2E2E2E]">
                Contact our sales team: <a href="tel:+919876543210" className="text-[#D32F2F] font-bold text-xl hover:underline">+91 98765 43210</a>
              </p>
            </div>
          </motion.div>
        </section>
        </main>

        {/* Location Section */}
        <div className=''>  
  {(property.location || (property.location?.highlights_list && property.location?.highlights_list.length > 0)) && (
    <section className="mb-12 sm:mb-16 md:mb-20">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-center text-[#2E2E2E] mb-8 sm:mb-12 md:mb-16 tracking-wide px-4"
      >
        Location Advantages
      </motion.h2>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="bg-gradient-to-br from-[#C4A77D]/10 to-[#D32F2F]/5 p-4 sm:p-6 md:p-8 lg:p-12 xl:p-16 mx-4 sm:mx-6 md:mx-8 lg:mx-0 rounded-lg sm:rounded-xl"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 lg:gap-16 xl:gap-20 items-start max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="order-2 lg:order-1"
          >
            {renderIntro(property.location ? [{ 
              title: property.location.title, 
              description: property.location.description, 
              iframe: property.location.map_embed_url 
            }] : [])}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="order-1 lg:order-2"
          >
            {renderPoints(property.location ? [{ 
              points: property.location.list || [] 
            }] : [], true)}
          </motion.div>
        </div>
      </motion.div>
    </section>
  )}
</div>
        {/* Creating the World's Finest Section */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <section className="mb-20 lg:mb-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16 lg:mb-24"
          >
            <h2 className="text-4xl lg:text-5xl font-light text-[#2E2E2E] tracking-wide">
              Creating the world's <em className="italic">finest</em> developments
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Card 1 - Living Space */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true }}
              className="bg-white overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-64 lg:h-72">
                <Image
                  src="/real-estate/DSC09034.jpg"
                  alt="Luxury living space with modern design"
                  fill
                  style={{ objectFit: 'cover' }}
                  className="transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-6 lg:p-8">
                <h3 className="text-xl lg:text-2xl font-bold text-gray-800 mb-3">Exquisite Living Spaces</h3>
                <p className="text-gray-600">
                  Step into a world of comfort and elegance. Our properties feature meticulously designed interiors, offering the perfect blend of modern aesthetics and functionality.
                </p>
              </div>
            </motion.div>

            {/* Card 2 - Lifestyle Experience */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              viewport={{ once: true }}
              className="bg-white overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-64 lg:h-72">
                <Image
                  src="/real-estate/DSC09052.jpg"
                  alt="A vibrant lifestyle experience"
                  fill
                  style={{ objectFit: 'cover' }}
                  className="transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-6 lg:p-8">
                <h3 className="text-xl lg:text-2xl font-bold text-gray-800 mb-3">Unmatched Lifestyle Experience</h3>
                <p className="text-gray-600">
                  We create more than just homes; we build communities. Enjoy a lifestyle enriched with premium amenities, lush green spaces, and a vibrant social environment.
                </p>
              </div>
            </motion.div>

            {/* Card 3 - Prime Locations */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              viewport={{ once: true }}
              className="bg-white  overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-64 lg:h-72">
                <Image
                  src="/real-estate/Aerial1.png"
                  alt="A property in a prime location"
                  fill
                  style={{ objectFit: 'cover' }}
                  className="transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-6 lg:p-8">
                <h3 className="text-xl lg:text-2xl font-bold text-gray-800 mb-3">Prime & Strategic Locations</h3>
                <p className="text-gray-600">
                  Our developments are situated in the most sought-after locations, ensuring convenience, connectivity, and a high-quality of life for all our residents.
                </p>
              </div>
            </motion.div>
          </div>
        </section>
        </main>

    </div>
  );
};

export default PropertyDetailPage;