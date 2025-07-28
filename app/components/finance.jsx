import React from 'react';
import { DollarSign, TrendingUp, FileText, ShoppingCart, Globe, Zap, Shield, Heart, Mail, MapPin, ArrowRight, CheckCircle, Building, Users, Clock } from 'lucide-react';
import Image from 'next/image';

const FinancePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-red-600 to-red-700 text-white">
  <div className="absolute inset-0 bg-black/10"></div>
  
  {/* Main Container */}
  <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
    <div className="text-center">
      
      {/* Icon + Title block */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mb-4 md:mb-6">
        {/* <DollarSign className="w-8 sm:w-10 md:w-12 h-8 sm:h-10 md:h-12 text-yellow-400" /> */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold leading-tight text-center">
          Ambika Global Finance™
        </h1>
      </div>
      
      {/* Tagline */}
      <p className="text-lg sm:text-xl md:text-2xl mb-6 md:mb-8 font-light">
        Fueling Growth, Backing Ambition
      </p>

      {/* Divider */}
      <div className="w-16 sm:w-20 md:w-24 h-1 bg-yellow-400 mx-auto mb-6 md:mb-8"></div>

      {/* Subtext */}
      <p className="text-base sm:text-lg md:text-xl max-w-4xl mx-auto leading-relaxed opacity-95 px-4 sm:px-0">
        We don't just offer funding—we offer <strong className="text-yellow-400">faith</strong>. 
        Financial solutions built to work the way real businesses do—quickly, flexibly, and with empathy.
      </p>

    </div>
  </div>

  {/* Bottom Gradient */}
  <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent"></div>
</section>


      {/* Finance Understanding Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4 md:mb-6">
              Finance That Understands Business
            </h2>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-4 md:mb-6">
              We know what it takes to run a business: managing uncertainties, chasing payments, and turning every opportunity into growth with limited resources.
            </p>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4 md:mb-6">
              That's why our financial solutions are built to work the way real businesses do—quickly, flexibly, and with empathy.
            </p>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-lg">
              <p className="text-gray-700 font-medium">
                Whether it's an urgent order or an export shipment that can't wait, we step in where traditional lenders pause.
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-xl">
              <Image
                src="/finance/Finance Page 1.jpeg"
                alt="Modern finance and business solutions"
                width={600}
                height={400}
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                {/* <div className="bg-transparent rounded-2xl p-6 shadow-lg">
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2">
                        <TrendingUp className="w-6 h-6 text-red-600" />
                      </div>
                      <p className="text-sm text-gray-600">Growth Focused</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Zap className="w-6 h-6 text-yellow-600" />
                      </div>
                      <p className="text-sm text-gray-600">Quick Solutions</p>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 text-center">
                    Empowering Indian Businesses
                  </h3>
                </div> */}
              </div>
            </div>
          </div>
        </div>

        {/* Services Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              What We Do
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive financial solutions tailored for modern businesses
            </p>
          </div>

          {/* Services Image */}
          <div className="mb-12 relative rounded-3xl overflow-hidden shadow-xl">
            <Image
              src="/finance/Finance Page 2.jpeg"
              alt="Professional finance team providing business solutions"
              width={1200}
              height={400}
              className="w-full h-64 md:h-80 object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <div className="text-center text-white">
                <h3 className="text-2xl md:text-3xl font-bold mb-2">Comprehensive Financial Solutions</h3>
                <p className="text-lg opacity-90">Tailored for Modern Business Needs</p>
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 sm:w-14 md:w-16 h-12 sm:h-14 md:h-16 bg-red-100 rounded-full flex items-center justify-center mb-4 md:mb-6">
                <FileText className="w-6 sm:w-7 md:w-8 h-6 sm:h-7 md:h-8 text-red-600" />
              </div>
              <div className="flex items-center gap-2 mb-3 md:mb-4">
                <CheckCircle className="w-4 sm:w-5 h-4 sm:h-5 text-green-600" />
                <h3 className="text-lg sm:text-xl font-bold text-gray-800">Invoice Factoring</h3>
              </div>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Convert your pending invoices into immediate working capital. Your earnings, unlocked—when you actually need them.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 sm:w-14 md:w-16 h-12 sm:h-14 md:h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-4 md:mb-6">
                <ShoppingCart className="w-6 sm:w-7 md:w-8 h-6 sm:h-7 md:h-8 text-yellow-600" />
              </div>
              <div className="flex items-center gap-2 mb-3 md:mb-4">
                <CheckCircle className="w-4 sm:w-5 h-4 sm:h-5 text-green-600" />
                <h3 className="text-lg sm:text-xl font-bold text-gray-800">Purchase Order Financing</h3>
              </div>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Fund your supplier payments before the invoice is even raised. Fulfill large orders without waiting for working capital to catch up.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 sm:w-14 md:w-16 h-12 sm:h-14 md:h-16 bg-red-100 rounded-full flex items-center justify-center mb-4 md:mb-6">
                <Globe className="w-6 sm:w-7 md:w-8 h-6 sm:h-7 md:h-8 text-red-600" />
              </div>
              <div className="flex items-center gap-2 mb-3 md:mb-4">
                <CheckCircle className="w-4 sm:w-5 h-4 sm:h-5 text-green-600" />
                <h3 className="text-lg sm:text-xl font-bold text-gray-800">Support for Exporters</h3>
              </div>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                We specialize in working capital support for export-oriented businesses—so you can confidently meet global demand without cash flow bottlenecks.
              </p>
            </div>
          </div>
        </div>

        {/* NBFC Section */}
        <div className="mb-20">
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-3xl overflow-hidden shadow-2xl">
            <div className="grid lg:grid-cols-2">
              <div className="p-8 md:p-12 text-white">
                <div className="flex items-center gap-4 mb-6">
                  <Building className="w-12 h-12 text-yellow-400" />
                  <h2 className="text-3xl md:text-4xl font-bold">A New-Age NBFC in the Making</h2>
                </div>
                <p className="text-lg leading-relaxed mb-8">
                  We're actively building our own <strong className="text-yellow-400">Non-Banking Financial Company (NBFC)</strong>—a 
                  regulated financial arm that will empower MSMEs, manufacturers, and exporters across India with smarter, faster credit solutions.
                </p>
                <div className="bg-red-600 rounded-2xl p-6 mb-8">
                  <p className="text-lg font-medium text-center">
                    Because <em>good businesses shouldn't miss great opportunities just for lack of liquidity.</em>
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-6">
                  <div className="text-center">
                    <Users className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                    <p className="text-sm">MSMEs</p>
                  </div>
                  <div className="text-center">
                    <Building className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                    <p className="text-sm">Manufacturers</p>
                  </div>
                  <div className="text-center">
                    <Globe className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                    <p className="text-sm">Exporters</p>
                  </div>
                </div>
              </div>
              <div className="relative">
                <Image
                  src="/finance/Finance Page 3.jpeg"
                  alt="Modern financial institution and NBFC services"
                  width={600}
                  height={500}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-transparent to-gray-900/60"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Why Choose Ambika Global Finance™?
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Speed When It Matters</h3>
              <p className="text-gray-600">Timelines make or break deals. We help you move faster.</p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Transparent & Flexible</h3>
              <p className="text-gray-600">No red tape. No fine print. Just solutions that work.</p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Driven by Empathy</h3>
              <p className="text-gray-600">We've built businesses ourselves. We understand the hustle.</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Let's Grow Together
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              If you're a small or mid-sized business looking to scale, fulfill larger orders, or just bridge a temporary gap—
              <strong className="text-red-600"> Ambika Global Finance™</strong> is here to back your ambition.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
              <a 
                href="mailto:finance@houseofambika.com"
                className="inline-flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full transition-colors duration-300 shadow-lg hover:shadow-xl"
              >
                <Mail className="w-5 h-5" />
                <span className="font-semibold">finance@houseofambika.com</span>
              </a>
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="w-5 h-5" />
                <span>Headquartered in Bhopal, serving businesses across India</span>
              </div>
            </div>
            <button className="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-gray-800 px-8 py-4 rounded-full font-semibold transition-colors duration-300 shadow-lg hover:shadow-xl">
              <span>Apply for Financing</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="bg-gradient-to-r from-red-600 to-red-700 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Fuel Your Growth?
          </h2>
          <p className="text-lg opacity-90 mb-8">
            Join hundreds of businesses that trust Ambika Global Finance™ for their funding needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-red-600 hover:bg-gray-100 px-8 py-4 rounded-full font-semibold transition-colors duration-300 shadow-lg hover:shadow-xl">
              Get Started Today
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-red-600 px-8 py-4 rounded-full font-semibold transition-colors duration-300">
              Learn More
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FinancePage;