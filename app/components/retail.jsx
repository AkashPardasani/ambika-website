"use client"
import React, { useState } from 'react';
import { Store, Palette, Hammer, Home, Users, Award, MapPin, Mail, ArrowRight, ChevronRight, ShoppingBag, Wrench, Building2, Sparkles, Clock, Heart, Star, TrendingUp } from 'lucide-react';

const RetailPage = () => {
  const [activeTab, setActiveTab] = useState('homeowners');

  const tabs = [
    { id: 'homeowners', label: 'Homeowners', icon: Home },
    { id: 'contractors', label: 'Contractors', icon: Hammer },
    { id: 'architects', label: 'Architects', icon: Building2 },
    { id: 'builders', label: 'Builders', icon: Users }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Parallax Effect */}
      <section className="relative overflow-hidden bg-gradient-to-br from-red-600 via-red-700 to-red-800 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-yellow-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-48 h-48 bg-yellow-300 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-white rounded-full blur-2xl"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-3 mb-6 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3">
                <Store className="w-6 h-6 text-yellow-400" />
                <span className="text-sm font-medium">Since 1998</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Ambika <span className="text-yellow-400">Retail</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 font-light opacity-95">
                From Shelves to Spaces, We've Been There
              </p>
              <p className="text-lg leading-relaxed mb-8 opacity-90">
                Our story began with <strong>Ambika Paints and Hardware Stores</strong> in 1998—a small retail outlet 
                that became synonymous with reliability and quality in Bhopal.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-yellow-400 hover:bg-yellow-300 text-gray-800 px-8 py-4 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5" />
                  Explore Products
                </button>
                <button className="border-2 border-white text-white hover:bg-white hover:text-red-600 px-8 py-4 rounded-full font-semibold transition-all duration-300 flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Visit Store
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 transform rotate-3 hover:rotate-0 transition-transform duration-300">
                  <Palette className="w-12 h-12 text-yellow-400 mb-4" />
                  <h3 className="text-lg font-bold mb-2">Paints & Colors</h3>
                  <p className="text-sm opacity-80">Premium quality paints for every surface</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 transform -rotate-3 hover:rotate-0 transition-transform duration-300 mt-8">
                  <Hammer className="w-12 h-12 text-yellow-400 mb-4" />
                  <h3 className="text-lg font-bold mb-2">Hardware Tools</h3>
                  <p className="text-sm opacity-80">Professional grade construction tools</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 transform rotate-2 hover:rotate-0 transition-transform duration-300">
                  <Home className="w-12 h-12 text-yellow-400 mb-4" />
                  <h3 className="text-lg font-bold mb-2">Home Solutions</h3>
                  <p className="text-sm opacity-80">Complete interior finishing materials</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 transform -rotate-2 hover:rotate-0 transition-transform duration-300 mt-8">
                  <Building2 className="w-12 h-12 text-yellow-400 mb-4" />
                  <h3 className="text-lg font-bold mb-2">Construction</h3>
                  <p className="text-sm opacity-80">Building materials for every project</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Legacy Section with Timeline */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-red-100 text-red-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Award className="w-4 h-4" />
            25+ Years of Excellence
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            A Legacy Built on <span className="text-red-600">Trust</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Before we built homes, we built <strong>walls—and painted them too</strong>. We weren't just selling paint—we were helping people build their first homes, their dream spaces, their beginnings.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border-t-4 border-red-600">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
              <Clock className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">1998</h3>
            <p className="text-gray-600 leading-relaxed">
              Started as a small retail outlet in Bhopal, focusing on quality paints and hardware supplies.
            </p>
          </div>
          <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border-t-4 border-yellow-400">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-6">
              <TrendingUp className="w-8 h-8 text-yellow-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Growth</h3>
            <p className="text-gray-600 leading-relaxed">
              Expanded product range and became a trusted name for homeowners, contractors, and builders across the region.
            </p>
          </div>
          <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border-t-4 border-red-600">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
              <Sparkles className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Innovation</h3>
            <p className="text-gray-600 leading-relaxed">
              Evolving with digital solutions and modern retail formats to serve the new generation of builders and homeowners.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Product Categories */}
      <section className="bg-gray-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              What We <span className="text-yellow-400">Offer</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From construction materials to interior finishes, we cater to every need with trusted brands and expert guidance.
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    activeTab === tab.id 
                      ? 'bg-red-600 text-white shadow-lg' 
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          <div className="bg-gray-700 rounded-3xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-3xl font-bold mb-6">
                  {activeTab === 'homeowners' && 'For Homeowners'}
                  {activeTab === 'contractors' && 'For Contractors'}
                  {activeTab === 'architects' && 'For Architects'}
                  {activeTab === 'builders' && 'For Builders'}
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  {activeTab === 'homeowners' && 'Transform your house into a dream home with our premium paints, interior finishes, and expert color consultation services.'}
                  {activeTab === 'contractors' && 'Get bulk supplies, professional-grade tools, and reliable delivery schedules to keep your projects on track.'}
                  {activeTab === 'architects' && 'Access premium materials, custom solutions, and technical support for your innovative designs and specifications.'}
                  {activeTab === 'builders' && 'Complete project solutions from foundation to finish with competitive pricing and dedicated account management.'}
                </p>
                <div className="space-y-3">
                  {activeTab === 'homeowners' && (
                    <>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                        <span>Interior & Exterior Paints</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                        <span>Color Consultation</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                        <span>Home Improvement Tools</span>
                      </div>
                    </>
                  )}
                  {activeTab === 'contractors' && (
                    <>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                        <span>Bulk Material Supply</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                        <span>Professional Tools</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                        <span>Timely Delivery</span>
                      </div>
                    </>
                  )}
                  {activeTab === 'architects' && (
                    <>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                        <span>Premium Materials</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                        <span>Custom Solutions</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                        <span>Technical Support</span>
                      </div>
                    </>
                  )}
                  {activeTab === 'builders' && (
                    <>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                        <span>End-to-End Solutions</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                        <span>Competitive Pricing</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                        <span>Account Management</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-red-600 to-yellow-400 rounded-2xl p-1">
                  <div className="bg-gray-800 rounded-2xl p-8">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-700 rounded-lg p-4 text-center">
                        <Palette className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                        <p className="text-sm">Premium Brands</p>
                      </div>
                      <div className="bg-gray-700 rounded-lg p-4 text-center">
                        <Star className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                        <p className="text-sm">Expert Guidance</p>
                      </div>
                      <div className="bg-gray-700 rounded-lg p-4 text-center">
                        <Wrench className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                        <p className="text-sm">Quality Tools</p>
                      </div>
                      <div className="bg-gray-700 rounded-lg p-4 text-center">
                        <Heart className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                        <p className="text-sm">Customer Care</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Different Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Why We're <span className="text-red-600">Different</span>
          </h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="group">
            <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform group-hover:-translate-y-2">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <Wrench className="w-6 h-6 text-red-600" />
                </div>
                <span className="text-2xl">🛠️</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Legacy of 25+ Years</h3>
              <p className="text-gray-600 leading-relaxed">
                We've grown with the city. We know what works—and what lasts.
              </p>
            </div>
          </div>
          
          <div className="group">
            <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform group-hover:-translate-y-2">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Palette className="w-6 h-6 text-yellow-600" />
                </div>
                <span className="text-2xl">🎨</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Expert-Led Service</h3>
              <p className="text-gray-600 leading-relaxed">
                We don't just sell. We suggest what's right.
              </p>
            </div>
          </div>
          
          <div className="group">
            <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform group-hover:-translate-y-2">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <Home className="w-6 h-6 text-red-600" />
                </div>
                <span className="text-2xl">🏡</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Customer First, Always</h3>
              <p className="text-gray-600 leading-relaxed">
                Whether it's one can of paint or an entire building's worth of material—we value every customer, every time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Evolution Section */}
      <section className="bg-gradient-to-r from-red-600 to-red-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Evolving for a <span className="text-yellow-400">New India</span>
              </h2>
              <p className="text-xl leading-relaxed mb-8 opacity-95">
                As demand, design, and delivery change with time, we are actively exploring organized retail formats, 
                digitally enabled procurement, and end-to-end project support to serve modern India's homeowners and builders better.
              </p>
              <div className="bg-yellow-400 text-gray-800 rounded-2xl p-6 mb-8">
                <p className="text-lg font-semibold">
                  We're not just here to sell products. We're here to <strong>simplify construction, beautify homes, and build lasting trust.</strong>
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
                <Store className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                <h4 className="text-lg font-bold mb-2">Organized Retail</h4>
                <p className="text-sm opacity-80">Modern store formats</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
                <ShoppingBag className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                <h4 className="text-lg font-bold mb-2">Digital Procurement</h4>
                <p className="text-sm opacity-80">Online ordering systems</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
                <Building2 className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                <h4 className="text-lg font-bold mb-2">Project Support</h4>
                <p className="text-sm opacity-80">End-to-end solutions</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
                <Users className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                <h4 className="text-lg font-bold mb-2">Partnerships</h4>
                <p className="text-sm opacity-80">Meaningful collaborations</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                Visit Us or <span className="text-red-600">Partner</span> With Us
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                If you're a builder, vendor, or homeowner—we'd love to work with you. We're growing, expanding, 
                and always open to meaningful partnerships that align with our values.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-red-100 to-yellow-100 rounded-3xl p-8">
                <div className="flex items-center gap-4 mb-6">
                  <Store className="w-12 h-12 text-red-600" />
                  <h3 className="text-2xl font-bold text-gray-800">Visit Our Store</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-6 h-6 text-red-600" />
                    <span className="text-gray-700 font-medium">M.P. Nagar, Bhopal</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-6 h-6 text-red-600" />
                    <span className="text-gray-700">Open 7 Days a Week</span>
                  </div>
                </div>
                <button className="w-full bg-red-600 hover:bg-red-700 text-white px-6 py-4 rounded-2xl font-semibold transition-colors duration-300 mt-6 flex items-center justify-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Get Directions
                </button>
              </div>
              
              <div className="bg-gradient-to-br from-yellow-100 to-red-100 rounded-3xl p-8">
                <div className="flex items-center gap-4 mb-6">
                  <Mail className="w-12 h-12 text-yellow-600" />
                  <h3 className="text-2xl font-bold text-gray-800">Connect With Us</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="w-6 h-6 text-yellow-600" />
                    <span className="text-gray-700 font-medium">retail@houseofambika.com</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="w-6 h-6 text-yellow-600" />
                    <span className="text-gray-700">Partnership Opportunities</span>
                  </div>
                </div>
                <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-800 px-6 py-4 rounded-2xl font-semibold transition-colors duration-300 mt-6 flex items-center justify-center gap-2">
                  <ArrowRight className="w-5 h-5" />
                  Start Conversation
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RetailPage;