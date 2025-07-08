"use client";
import { useState, useEffect, useRef } from 'react';
import { Users, Building, Trophy, Globe } from 'lucide-react';

// Custom hook to detect when element is in viewport
const useInView = (threshold = 0.1) => {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold]);

  return [ref, isInView];
};

// StatCard component with count-up animation
const StatCard = ({ icon: Icon, number, suffix, label, isInView, delay = 0 }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        const duration = 2000; // 2 seconds
        const startTime = Date.now();
        
        const animate = () => {
          const elapsed = Date.now() - startTime;
          const progress = Math.min(elapsed / duration, 1);
          
          // Easing function for smooth animation
          const easeOutQuart = 1 - Math.pow(1 - progress, 4);
          const currentCount = Math.floor(easeOutQuart * number);
          
          setCount(currentCount);
          
          if (progress < 1) {
            requestAnimationFrame(animate);
          }
        };
        
        animate();
      }, delay);
      
      return () => clearTimeout(timer);
    }
  }, [isInView, number, delay]);

  return (
    <div className="group relative w-full max-w-sm mx-auto">
      <div className="bg-white backdrop-blur-sm border border-amber-200/30 rounded-2xl p-4 sm:p-6 lg:p-8 transition-all duration-300 hover:border-amber-400/50 hover:transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-amber-200/20 w-full">
        {/* Gradient background on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
        
        {/* Icon */}
        <div className="flex justify-center mb-4 sm:mb-6">
          <div className="p-3 sm:p-4 bg-gradient-to-br from-amber-100 to-yellow-100 rounded-xl group-hover:from-amber-200 group-hover:to-yellow-200 transition-all duration-300">
            <Icon className="h-6 w-6 sm:h-8 sm:w-8 text-amber-700 group-hover:text-amber-800" />
          </div>
        </div>
        
        {/* Number with suffix */}
        <div className="text-center mb-3 sm:mb-4">
          <div className="flex items-baseline justify-center flex-wrap">
            <span className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-700 bg-clip-text text-transparent">
              {count.toLocaleString()}
            </span>
            <span className="text-xl sm:text-2xl lg:text-3xl font-semibold text-amber-600 ml-1">
              {suffix}
            </span>
          </div>
        </div>
        
        {/* Label */}
        <p className="text-center text-gray-700 text-base sm:text-lg font-medium leading-tight">
          {label}
        </p>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 -mt-2 -mr-2 w-8 h-8 bg-gradient-to-br from-amber-300 to-yellow-300 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
        <div className="absolute bottom-0 left-0 -mb-3 -ml-3 w-12 h-12 bg-gradient-to-tr from-amber-300 to-yellow-300 rounded-full opacity-10 group-hover:opacity-30 transition-opacity duration-300"></div>
      </div>
    </div>
  );
};

// Main StatsSection component
const StatsSection = () => {
  const [ref, isInView] = useInView(0.2);
  
  const stats = [
    {
      icon: Users,
      number: 25000,
      suffix: '+',
      label: 'Happy Families',
      delay: 0
    },
    {
      icon: Building,
      number: 150,
      suffix: '+',
      label: 'Properties Developed',
      delay: 200
    },
    {
      icon: Trophy,
      number: 50,
      suffix: '+',
      label: 'Awards Won',
      delay: 400
    },
    {
      icon: Globe,
      number: 12,
      suffix: '+',
      label: 'Cities Served',
      delay: 600
    }
  ];

  return (
    <section className="relative bg-gradient-to-b from-gray-50 to-amber-50/30 py-16 sm:py-20 lg:py-32 w-full overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-yellow-200/20 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
            <span className="bg-gradient-to-r from-gray-800 via-amber-700 to-gray-800 bg-clip-text text-transparent">
              By the Numbers
            </span>
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed px-4">
            Our commitment to excellence is reflected in our achievements and the trust our clients place in us.
          </p>
        </div>
        
        {/* Stats Grid */}
        <div 
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-6 xl:gap-8 w-full"
        >
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              icon={stat.icon}
              number={stat.number}
              suffix={stat.suffix}
              label={stat.label}
              isInView={isInView}
              delay={stat.delay}
            />
          ))}
        </div>
        
        {/* Optional Bottom Text */}
        <div className="text-center mt-12 sm:mt-16">
          <p className="text-gray-600 text-base sm:text-lg px-4">
            These numbers represent our journey of growth, innovation, and unwavering dedication to our mission.
          </p>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;