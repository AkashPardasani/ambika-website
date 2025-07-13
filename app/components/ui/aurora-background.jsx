"use client";
import { motion } from "framer-motion";
import React from "react";

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  ...props
}) => {
  return (
    <main>
      <div
        className={`relative flex flex-col h-[100vh] items-center justify-center bg-gradient-to-br from-red-600 via-red-700 to-red-800 text-white transition-bg ${className}`}
        {...props}
        style={{
          '--primary-red': '#D32F2F',
          '--accent-gold': '#C4A77D',
          '--white': 'rgba(255,255,255,0.1)',
          '--transparent': 'transparent',
          '--black': 'rgba(0,0,0,0.3)'
        }}
      >
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute -inset-[10px] opacity-50 blur-[10px] will-change-transform pointer-events-none"
            style={{
              backgroundImage: `
                repeating-linear-gradient(100deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.3) 7%, transparent 10%, transparent 12%, rgba(0,0,0,0.3) 16%),
                repeating-linear-gradient(100deg, #D32F2F 10%, #C4A77D 15%, #D32F2F 20%, rgba(211,47,47,0.8) 25%, #C4A77D 30%)
              `,
              backgroundSize: '300%, 200%',
              backgroundPosition: '50% 50%, 50% 50%',
              filter: 'blur(10px) saturate(150%)',
              animation: 'aurora 60s ease infinite'
            }}
          ></div>
          
          {/* Additional animated layer */}
          <div
            className="absolute -inset-[10px] opacity-30 will-change-transform pointer-events-none"
            style={{
              backgroundImage: `
                repeating-linear-gradient(120deg, transparent 0%, #D32F2F 10%, transparent 20%, #C4A77D 30%, transparent 40%),
                repeating-linear-gradient(80deg, rgba(196,167,125,0.3) 0%, transparent 50%, rgba(211,47,47,0.3) 100%)
              `,
              backgroundSize: '200%, 100%',
              backgroundPosition: '0% 0%, 100% 100%',
              filter: 'blur(5px)',
              animation: 'aurora-reverse 40s ease-in-out infinite reverse'
            }}
          ></div>
        </div>
        
        {showRadialGradient && (
          <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/20"></div>
        )}
        
        {/* Floating particles effect */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-32 h-32 bg-yellow-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-32 right-32 w-48 h-48 bg-red-300/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-white/5 rounded-full blur-2xl animate-pulse delay-2000"></div>
        </div>
        
        {children}
      </div>
      
      <style jsx>{`
        @keyframes aurora {
          0%, 100% {
            background-position: 50% 50%, 50% 50%;
          }
          25% {
            background-position: 0% 100%, 100% 0%;
          }
          50% {
            background-position: 100% 100%, 0% 100%;
          }
          75% {
            background-position: 0% 0%, 100% 50%;
          }
        }
        
        @keyframes aurora-reverse {
          0%, 100% {
            background-position: 0% 0%, 100% 100%;
          }
          33% {
            background-position: 100% 0%, 0% 50%;
          }
          66% {
            background-position: 50% 100%, 100% 0%;
          }
        }
        
        .bg-gradient-radial {
          background: radial-gradient(ellipse at center, var(--tw-gradient-stops));
        }
      `}</style>
    </main>
  );
};