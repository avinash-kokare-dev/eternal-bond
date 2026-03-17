
"use client";
import React, { useState, useEffect, useRef } from 'react';
import { TemplateCarousel } from '../components/home/TemplateCarousel';
// import { useApp } from '../context/AppContext';
import Header from '@/components/home/header';
import HowItWorks from '@/components/home/how-it-works';
import AIIntelligence from '@/components/home/ai-intelligence';
import OurMission from '@/components/home/our-mission';
import FeaturedBlog from '@/components/home/featured-blog';
import { Testimonials } from '@/components/home/testimonials';
import FAQ from '@/components/home/faq';

export default function HomePage() {
  // const { lang } = useApp();

  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const handleScroll = () => {};
    window.addEventListener('scroll', handleScroll, { passive: true });

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-active');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observerRef.current?.observe(el));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observerRef.current?.disconnect();
    };
  }, []);


  return (
    <>

      {/* Hero Section */}
      <Header />

      {/* Steps to Create Section */}
      <HowItWorks />

      {/* AI Intelligence Section */}
      <AIIntelligence />

      {/* Our Mission Section */}
      <OurMission />

      {/* Featured Blog Posts */}
      <FeaturedBlog />

      <TemplateCarousel lang={'en'} />

      <Testimonials lang={'en'} />

      {/* FAQ Section */}
      <FAQ />

      <style>{`
        .reveal { opacity: 0; transform: translateY(30px); transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1); }
        .reveal-active { opacity: 1; transform: translateY(0); }
      `}</style>
    </>
  );
}
