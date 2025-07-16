"use client"
import React from 'react';
import { Play, Film, Users, Mail, MapPin, Star, ArrowRight } from 'lucide-react';
import YouTube from 'react-youtube';
const EntertainmentPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-red-600 to-red-700 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight">
              Entertainment
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-6 md:mb-8 font-light italic opacity-90">
              Not just entertainment - a voice that resonates
            </p>
            <div className="w-16 sm:w-20 md:w-24 h-1 bg-yellow-400 mx-auto mb-6 md:mb-8"></div>
            <p className="text-base sm:text-lg md:text-xl max-w-4xl mx-auto leading-relaxed px-4 sm:px-0">
              At Ambika, storytelling isn't just a venture—it's a calling. Through our banner Lakshya Productions, 
              we entered the world of film and digital content not to chase trends, but to create something real, raw, and resonant.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent"></div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Story Section */}
        <div className="mb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4 md:mb-6">
                Our Story
              </h2>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-4 md:mb-6">
                We believe stories have the power to heal, provoke thought, spark change—and above all, to connect.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                Our journey began with <strong className="text-red-600">"The Dark Side of Life: Mumbai City"</strong> (2019), 
                a hard-hitting feature film starring Kay Kay Menon and Mahesh Bhatt. A story about urban loneliness and inner battles, 
                the film was our first attempt at holding up a mirror to modern society.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Today, we are proud to be building on that foundation with <strong className="text-red-600">"Anarchy"</strong>—a gritty, 
                powerful, 9-episode political thriller featuring legends like Piyush Mishra and Tigmanshu Dhulia. 
                Currently in post-production, <em>Anarchy</em> is our statement to the industry: bold, independent storytelling still has a place.
              </p>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-red-100 to-yellow-100 rounded-3xl p-8 shadow-xl">
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <Film className="w-12 h-12 text-red-600 mb-4" />
                  <h3 className="text-xl font-bold text-gray-800 mb-3">Featured Projects</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Star className="w-5 h-5 text-yellow-500" />
                      <span className="text-gray-700">The Dark Side of Life: Mumbai City (2019)</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Play className="w-5 h-5 text-red-600" />
                      <span className="text-gray-700">Anarchy (In Post-Production)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* YouTube Video Section */}
        <div className="mb-20">
          <div className="relative w-full" style={{ paddingBottom: '56.25%' /* 16:9 aspect ratio */ }}>
            <div className="absolute inset-0">
              <YouTube 
                videoId="UMIjgfzlaW0" 
                opts={{ 
                  width: '100%', 
                  height: '100%',
                  playerVars: {
                    autoplay: 0,
                    modestbranding: 1,
                    rel: 0
                  }
                }} 
                className="w-full h-full rounded-2xl overflow-hidden shadow-xl"
              />
            </div>
          </div>
        </div>

        {/* Philosophy Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Our Philosophy
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              But for us, it's not about big budgets or glamour—it's about truth, craft, and courage.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
                <Film className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Grit over gloss</h3>
              <p className="text-gray-600">We choose real stories over formulaic ones.</p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Creative freedom</h3>
              <p className="text-gray-600">We collaborate with artists who are fearless with their voice.</p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
                <Star className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Cinematic purpose</h3>
              <p className="text-gray-600">Each project is meant to evoke something deeper than just applause.</p>
            </div>
          </div>
        </div>

        {/* Vision Section */}
        <div className="mb-20">
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-3xl p-8 md:p-12 text-white">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Vision</h2>
              <p className="text-lg leading-relaxed mb-8">
                We're building a slate of <strong className="text-yellow-400">original films, series, and digital content</strong> that 
                speak to the evolving Indian audience—smart, sensitive, and hungry for authenticity.
              </p>
              <p className="text-lg leading-relaxed mb-8">
                Our goal is to bring forward <strong className="text-yellow-400">regional, rooted, and rebellious</strong> voices—because 
                India's true stories don't always come from boardrooms or cities. Sometimes, they come from forgotten towns, 
                fractured hearts, and fearless minds.
              </p>
              <div className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 transition-colors duration-300 px-6 py-3 rounded-full">
                <span className="font-semibold">Discover Our Work</span>
                <ArrowRight className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>

        {/* Collaboration Section */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Collaborate with Us
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              If you're a storyteller, writer, director, or creative spirit who wants to build something that matters—
              <strong className="text-red-600"> we want to hear from you</strong>. Reach out. Let's make something unforgettable.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <a 
                href="mailto:production@houseofambika.com"
                className="inline-flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full transition-colors duration-300 shadow-lg hover:shadow-xl"
              >
                <Mail className="w-5 h-5" />
                <span className="font-semibold">production@houseofambika.com</span>
              </a>
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="w-5 h-5" />
                <span>Based in Bhopal/Mumbai, telling stories for the world</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="bg-gradient-to-r from-red-600 to-red-700 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Tell Your Story?
          </h2>
          <p className="text-lg opacity-90 mb-8">
            Join us in creating content that matters, stories that resonate, and cinema that changes perspectives.
          </p>
          <button className="bg-white text-red-600 hover:bg-gray-100 px-8 py-4 rounded-full font-semibold transition-colors duration-300 shadow-lg hover:shadow-xl">
            Get In Touch
          </button>
        </div>
      </section>
    </div>
  );
};

export default EntertainmentPage;