"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
const HeroSection = () => {
    const [currentImage, setCurrentImage] = useState(0);
    const router = useRouter();
    // High-quality business/growth themed images
    const images = [
        'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
        'https://images.unsplash.com/photo-1748347914600-5563a3a0a983?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzZ8fGxhbmRzY2FwZSUyMGluZHVzdHJpZXMlMjBwb3JqZWN0fGVufDB8fDB8fHww',
        'https://images.unsplash.com/photo-1648112683639-4fd7fa861dd3?q=80&w=1108&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1711792445513-0fa64cb8b04f?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % images.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <div className="relative w-full min-h-screen overflow-hidden">
            {/* Image Carousel */}
            {images.map((image, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentImage ? 'opacity-100' : 'opacity-0'
                        }`}
                >
                    <Image
                        src={image}
                        alt={`Corporate background ${index + 1}`}
                        className="w-full h-full object-cover"
                        width={1920}
                        height={1080}
                        priority
                        loading="eager"
                    />
                </div>
            ))}

            {/* Content Overlay */}
            <div className="absolute inset-0 flex flex-col justify-center text-white z-10 px-4 md:px-12 lg:pl-[12vw] lg:pr-0 lg:items-start items-center">
                {/* Main Heading */}
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-left lg:text-left text-center mb-8 tracking-medium" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.7), 0 0 20px rgba(0,0,0,0.3)' }}>
                    <span style={{ position: 'relative', display: 'inline-block' }}>
                        Growth
                        <hr className="absolute bottom-[-10px] left-0 right-0 w-full h-1 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 border-0 rounded-full" />
                    </span>
                       &nbsp;is Life
                </h1>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-4 w-full max-w-xs sm:max-w-none lg:justify-start justify-center items-center lg:items-start">
                    <button className="group relative w-full sm:w-auto px-8 py-3 border-2 border-white text-white font-semibold rounded-3xl text-base sm:text-lg tracking-wide transition-all duration-300 hover:bg-white hover:bg-opacity-90 hover:text-black cursor-pointer" onClick={() => router.push('/about')}>
                        <span className="relative z-10">About Us</span>
                    </button>
                    <button className="group relative w-full sm:w-auto px-8 py-3 border-2 border-white text-white font-semibold cursor-pointer rounded-3xl text-base sm:text-lg tracking-wide transition-all duration-300 hover:bg-white hover:bg-opacity-90 hover:text-black">
                        <span className="relative z-10">Our History</span>
                    </button>
                </div>
            </div>

            {/* Carousel Indicators */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentImage(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentImage
                            ? 'bg-white shadow-lg'
                            : 'bg-white bg-opacity-50 hover:bg-opacity-75'
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default HeroSection;