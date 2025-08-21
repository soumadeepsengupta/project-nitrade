'use client';
import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const slides = [
  { id: 1, src: '/1_login.png', alt: 'Login illustration' },
  { id: 2, src: '/2_list.png', alt: 'List illustration' },
  { id: 3, src: '/3_search.png', alt: 'Search illustration' },
  { id: 4, src: '/4_trade.png', alt: 'Trade illustration' },
  { id: 5, src: '/5_success.png', alt: 'Success illustration' },
];

export default function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [dragStart, setDragStart] = useState(0);
  const [dragEnd, setDragEnd] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(timer);
  }, [nextSlide]);

  const handleDragStart = (e) => {
    setDragStart(e.type === 'touchstart' ? e.touches[0].clientX : e.clientX);
  };

  const handleDragMove = (e) => {
    if (!dragStart) return;
    setDragEnd(e.type === 'touchmove' ? e.touches[0].clientX : e.clientX);
  };

  const handleDragEnd = () => {
    if (!dragStart || !dragEnd) return;
    
    const diff = dragStart - dragEnd;
    if (Math.abs(diff) > 50) { // threshold of 50px
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    
    setDragStart(0);
    setDragEnd(0);
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div 
        className="overflow-hidden relative rounded-xl shadow-lg bg-white/5 backdrop-blur-sm"
        style={{ height: 'calc(100vh - 400px)', minHeight: '400px' }}
        onMouseDown={handleDragStart}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={handleDragStart}
        onTouchMove={handleDragMove}
        onTouchEnd={handleDragEnd}
      >
        <AnimatePresence initial={false}>
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="relative w-full h-full max-w-5xl mx-auto">
              <Image
                src={slides[currentSlide].src}
                alt={slides[currentSlide].alt}
                fill
                className="object-contain p-8"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Pagination dots */}
      <div className="flex justify-center gap-2 mt-4">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors duration-200 ${
              index === currentSlide ? 'bg-blue-500' : 'bg-gray-300'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
