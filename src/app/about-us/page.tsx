
"use client";
import React from 'react';
import { useApp } from '../../context/AppContext';
import { TRANSLATIONS } from '../../translations';
import { Button } from '../../components/Button';
import Link from 'next/link';

export default function AboutPage() {
  // const { lang, setCurrentPage } = useApp();
  const lang = 'en'
  const t = TRANSLATIONS[lang];
  const homeT = t.home;

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative pt-10 pb-8 overflow-hidden border-b border-stone-100">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <span className="font-script text-4xl text-rose-600 mb-4 block animate-fade-in-up">Our Story</span>
            <h1 className="text-5xl sm:text-3xl font-serif font-bold text-slate-900 leading-tight mb-8 animate-fade-in-up">
              Crafting Digital <span className="italic">Elegance</span> for Life's Biggest Milestones.
            </h1>
            <p className="text-xl text-slate-800 leading-relaxed mb-10 animate-fade-in-up " style={{ animationDelay: '0.1s' }}>
              EternalBond was born from a simple observation: the first introduction between two families should be as beautiful as the journey it begins. 
              We've combined modern technology with traditional values to create the world's finest biodata builder.
            </p>
          </div>
        </div>
        {/* Decorative background */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-rose-50/50 -skew-x-12 translate-x-1/2"></div>
      </section>

      {/* Values Section */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="space-y-6">
              <div className="w-16 h-16 bg-rose-100 rounded-2xl flex items-center justify-center text-3xl">✨</div>
              <h3 className="text-2xl font-serif font-bold text-slate-900 italic">Unmatched Quality</h3>
              <p className="text-slate-500 leading-relaxed">
                Every pixel is scrutinized. Our templates aren't just forms; they are professionally designed canvases that highlight your personality and achievements with grace.
              </p>
            </div>
            <div className="space-y-6">
              <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center text-3xl">🔒</div>
              <h3 className="text-2xl font-serif font-bold text-slate-900 italic">Privacy First</h3>
              <p className="text-slate-500 leading-relaxed">
                Your personal details never touch our servers. We utilize local browser storage to ensure that your sensitive information remains under your control at all times.
              </p>
            </div>
            <div className="space-y-6">
              <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center text-3xl">🌍</div>
              <h3 className="text-2xl font-serif font-bold text-slate-900 italic">Cultural Heritage</h3>
              <p className="text-slate-500 leading-relaxed">
                We celebrate diversity. Our tool is optimized for multiple languages and religions, ensuring your biodata respects and reflects your specific cultural traditions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="py-10 sm:py-12 bg-rose-50/30 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none select-none">
          <div className="text-[20rem] font-black absolute -top-20 -left-20 rotate-12">MISSION</div>
        </div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            <div className="lg:w-1/2">
              <span className="inline-block px-4 py-1.5 bg-rose-100 text-rose-700 rounded-full text-[10px] font-black uppercase tracking-widest mb-6">Our Vision</span>
              <h2 className="text-4xl sm:text-3.5xl font-serif font-bold text-slate-900 mb-8 italic">To make matchmaking <span className="text-rose-600 underline decoration-rose-200 underline-offset-8">effortless</span> and dignified.</h2>
              <p className="text-xl text-slate-600 leading-relaxed mb-8">
                Our mission is to empower families with the tools they need to present themselves with pride. We believe that a well-crafted biodata is more than just information—it's an invitation to a shared future. 
              </p>
              <div className="grid grid-cols-2 gap-8 pt-8 border-t border-rose-200">
                <div>
                  <p className="text-3xl font-serif font-bold text-rose-700">50,000+</p>
                  <p className="text-xs font-black uppercase tracking-widest text-slate-400">Profiles Created</p>
                </div>
                <div>
                  <p className="text-3xl font-serif font-bold text-rose-700">100%</p>
                  <p className="text-xs font-black uppercase tracking-widest text-slate-400">Privacy Guaranteed</p>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 relative">
              <div className="absolute -inset-4 bg-rose-600/10 rounded-[3rem] blur-3xl"></div>
              <img 
                src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800&auto=format&fit=crop" 
                alt="Mission" 
                className="relative z-10 rounded-[3rem] shadow-2xl border-8 border-white"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Steps to Create Section */}
      <section className="py-10 sm:py-12 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-12 sm:mb-16">
            <span className="inline-block px-6 py-2 bg-rose-50 rounded-full text-[10px] sm:text-[11px] font-black uppercase tracking-[0.3em] text-rose-600 mb-6 border border-rose-100">Simple 4-Step Process</span>
            <h2 className="text-3xl sm:text-3xl md:text-3xl font-serif font-bold text-slate-900 mb-8 tracking-tighter italic">
              Steps to Create Your <span className="text-rose-600">Perfect Profile</span>
            </h2>
            <p className="text-slate-500 text-lg sm:text-1.2xl font-medium max-w-3xl mx-auto leading-relaxed">
              We've designed our platform to be as simple as filling a form, with results that look like they were designed by an agency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {homeT.howToSteps.map((step, idx) => (
              <div 
                key={idx} 
                className="group relative bg-white p-10 rounded-[3rem] border border-stone-100 shadow-xl shadow-stone-200/50 hover:shadow-2xl hover:shadow-rose-900/10 hover:border-rose-100 hover:-translate-y-4 transition-all duration-700 overflow-hidden"
              >
                <div className="absolute -top-12 -right-12 text-[10rem] font-black text-slate-50 group-hover:text-rose-50 transition-colors pointer-events-none select-none">
                  {idx + 1}
                </div>
                
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-rose-50 rounded-2xl flex items-center justify-center text-3xl mb-8 group-hover:bg-rose-600 group-hover:text-white transition-all duration-500 shadow-inner">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-serif font-bold text-slate-900 mb-4 group-hover:text-rose-700 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-slate-500 leading-relaxed text-sm font-medium">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 text-center bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-900/20 to-transparent"></div>
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <h2 className="text-4xl sm:text-3xl font-serif font-bold mb-10">Ready to start your <span className="italic text-rose-500">beautiful</span> journey?</h2>
          <Link href={'/editor'}>
          <Button 
            size="lg" 
            className="px-8 shadow-2xl rounded-2xl h-20 text-xl font-black uppercase tracking-widest cursor-pointer"
          >
            Create Your Biodata Now
          </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
