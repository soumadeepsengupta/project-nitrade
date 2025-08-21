'use client';
import React, { useState, useEffect, useRef } from 'react';
import Carousel from './Carousel';

const slides = [
  {
    id: 1,
    image: "/bg.jpg",
    title: "Buy & Sell",
    description: "List or purchase second-hand items easily"
  },
  {
    id: 2,
    image: "/bg2.jpg",
    title: "Safe Transactions",
    description: "Secure payment and delivery system"
  },
  {
    id: 3,
    image: "/Frame 13921.png",
    title: "Campus Community",
    description: "Connect with fellow students"
  }
];

const Howto = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const slideContainerRef = useRef(null);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 100) {
      nextSlide();
    }
    if (touchStart - touchEnd < -100) {
      prevSlide();
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(timer);
  }, []);
  return (
    <section className='bg-blu rounded-t-xl'>
       <div className='flex flex-grid col-span-2 items-center justify-center py-8 max-w-7xl mx-auto'>
        <div className='flex-row items-center justify-center mb-4'>
          <div className='text-9xl md:text-5xl font-bold tracking-[-2] text-cream mt-6 mb-6'>your marketplace for second-hand college goods.</div>
          <div className='text-lg/6 text-black mb-6 font-satoshi font-semibold tracking-tighter '>TradeBin NITR is a platform connects students looking to buy and sell second-hand items. Enjoy a hassle-free experience with secure transactions and easy listings.</div>
          <button className='bg-cream text-blu font-satoshi font-semibold rounded-lg px-6 py-3 hover:bg-blu hover:text-cream hover:border-cream hover:border-2 transition-all duration-300'>Get Started</button>
        </div>
        <div>
          <Carousel/>
        </div>
      </div>
    </section>
  )
}

export default Howto