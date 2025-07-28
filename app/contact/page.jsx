"use client";
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    query: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await axios.post('/api/contacts', formData);
      
      if (response.status === 200) {
        setMessage({ type: 'success', text: 'Thank you for your message! We will get back to you soon.' });
        setFormData({ name: '', phone: '', email: '', query: '' });
        const timeId = setTimeout(() => {
          setMessage({type:'',message:''});
          clearTimeout(timeId)
        }, 3000);
      }
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: 'Something went wrong. Please try again later.' 
      });
      const timeId = setTimeout(() => {
        setMessage({ type: '', text: '' });
        clearTimeout(timeId)
      }, 3000);
      
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="min-h-screen pt-20" style={{ backgroundColor: '#FFFAFA' }}>
      {/* Subtle gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/20 pointer-events-none"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6" style={{ color: '#000000' }}>
            Get In <span style={{ color: '#D32F2F' }}>Touch</span>
          </h1>
          <p className="text-xl max-w-3xl mx-auto" style={{ color: '#B0B0B0' }}>
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div 
              className="rounded-2xl p-8 shadow-2xl border"
              style={{ 
                backgroundColor: '#F9F9F9',
                borderColor: '#C4A77D'
              }}
            >
              <h2 className="text-2xl font-bold mb-6" style={{ color: '#2E2E2E' }}>
                Contact Information
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div 
                      className="w-12 h-12 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: '#D32F2F' }}
                    >
                      <svg className="w-6 h-6" style={{ color: '#F9F9F9' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2" style={{ color: '#2E2E2E' }}>
                      Address
                    </h3>
                    <p style={{ color: '#2E2E2E' }}>
                      70, Zone-2, M.P. Nagar,<br />
                      Bhopal, Madhya Pradesh - 462011
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div 
                      className="w-12 h-12 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: '#C4A77D' }}
                    >
                      <svg className="w-6 h-6" style={{ color: '#F9F9F9' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2" style={{ color: '#2E2E2E' }}>
                      Email
                    </h3>
                    <a 
                      href="mailto:info@houseofambika.com" 
                      className="transition-colors duration-200 hover:underline"
                      style={{ color: '#D32F2F' }}
                    >
                      info@houseofambika.com
                    </a>
                  </div>
                </div>

                
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div 
              className="rounded-2xl p-8 shadow-2xl border"
              style={{ 
                backgroundColor: '#F9F9F9',
                borderColor: '#C4A77D'
              }}
            >
              <h2 className="text-2xl font-bold mb-6" style={{ color: '#2E2E2E' }}>
                Send us a Message
              </h2>
              
              {message.text && (
                <div 
                  className={`mb-6 p-4 rounded-lg border ${
                    message.type === 'success' 
                      ? 'bg-green-50 border-green-200 text-green-700' 
                      : 'bg-red-50 border-red-200 text-red-700'
                  }`}
                >
                  {message.text}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label 
                    htmlFor="name" 
                    className="block text-sm font-medium mb-2"
                    style={{ color: '#2E2E2E' }}
                  >
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:border-transparent"
                    style={{ 
                      backgroundColor: '#F9F9F9',
                      borderColor: '#B0B0B0',
                      color: '#2E2E2E',
                      boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#D32F2F';
                      e.target.style.boxShadow = `0 0 0 2px rgba(211, 47, 47, 0.2)`;
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#B0B0B0';
                      e.target.style.boxShadow = 'inset 0 1px 3px rgba(0,0,0,0.1)';
                    }}
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label 
                    htmlFor="phone" 
                    className="block text-sm font-medium mb-2"
                    style={{ color: '#2E2E2E' }}
                  >
                    Phone *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:border-transparent"
                    style={{ 
                      backgroundColor: '#F9F9F9',
                      borderColor: '#B0B0B0',
                      color: '#2E2E2E',
                      boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#D32F2F';
                      e.target.style.boxShadow = `0 0 0 2px rgba(211, 47, 47, 0.2)`;
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#B0B0B0';
                      e.target.style.boxShadow = 'inset 0 1px 3px rgba(0,0,0,0.1)';
                    }}
                    placeholder="Your phone number"
                  />
                </div>

                <div>
                  <label 
                    htmlFor="email" 
                    className="block text-sm font-medium mb-2"
                    style={{ color: '#2E2E2E' }}
                  >
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:border-transparent"
                    style={{ 
                      backgroundColor: '#F9F9F9',
                      borderColor: '#B0B0B0',
                      color: '#2E2E2E',
                      boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#D32F2F';
                      e.target.style.boxShadow = `0 0 0 2px rgba(211, 47, 47, 0.2)`;
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#B0B0B0';
                      e.target.style.boxShadow = 'inset 0 1px 3px rgba(0,0,0,0.1)';
                    }}
                    placeholder="Your email address"
                  />
                </div>

                <div>
                  <label 
                    htmlFor="query" 
                    className="block text-sm font-medium mb-2"
                    style={{ color: '#2E2E2E' }}
                  >
                    Query *
                  </label>
                  <textarea
                    id="query"
                    name="query"
                    rows={4}
                    value={formData.query}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:border-transparent resize-none"
                    style={{ 
                      backgroundColor: '#F9F9F9',
                      borderColor: '#B0B0B0',
                      color: '#2E2E2E',
                      boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#D32F2F';
                      e.target.style.boxShadow = `0 0 0 2px rgba(211, 47, 47, 0.2)`;
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#B0B0B0';
                      e.target.style.boxShadow = 'inset 0 1px 3px rgba(0,0,0,0.1)';
                    }}
                    placeholder="Tell us about your inquiry..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full font-semibold cursor-pointer py-3 px-6 rounded-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
                  style={{ 
                    background: `linear-gradient(135deg, #D32F2F 0%, #C4A77D 100%)`,
                    color: '#F9F9F9'
                  }}
                  onMouseEnter={(e) => {
                    if (!loading) {
                      e.target.style.background = `linear-gradient(135deg, #B71C1C 0%, #A8956B 100%)`;
                      e.target.style.boxShadow = '0 8px 25px rgba(211, 47, 47, 0.3)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!loading) {
                      e.target.style.background = `linear-gradient(135deg, #D32F2F 0%, #C4A77D 100%)`;
                      e.target.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
                    }
                  }}
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5" style={{ color: '#F9F9F9' }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage; 