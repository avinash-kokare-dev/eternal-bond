
import Link from 'next/link'
import React from 'react'
import { Button } from '../Button'
import { TRANSLATIONS } from '@/translations';
import { useApp } from '@/context/AppContext';

const Header = () => {

    const { lang } = useApp();
    const t = TRANSLATIONS[lang];

    return (
        <header className="bg-purple-200 relative pt-16 pb-20 sm:pt-24 sm:pb-32 overflow-hidden px-4">
            <div className="absolute inset-0 pointer-events-none">
                <div
                    className="absolute top-[5%] left-[10%] w-64 h-64 sm:w-96 sm:h-96 bg-rose-100/30 rounded-full blur-[80px] sm:blur-[100px] animate-pulse"
                    // style={{ transform: `translateY(${scrollY * 0.1}px)` }}
                ></div>
                <div
                    className="absolute bottom-[20%] right-[10%] w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] bg-amber-100/20 rounded-full blur-[100px] sm:blur-[120px] animate-pulse"
                    // style={{ animationDelay: '2s', transform: `translateY(${scrollY * -0.05}px)` }}
                ></div>
            </div>


            <div className="max-w-7xl mx-auto text-center relative z-10">
                <div className="reveal inline-flex items-center gap-3 py-2 px-6 bg-slate-900 text-white rounded-full text-[10px] sm:text-[11px] font-black uppercase tracking-[0.2em] mb-8 border border-white/10 shadow-2xl animate-ai-glow">
                    <span className="flex h-2 w-2 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                    </span>
                    AI-Powered Biodata Creator
                </div>

                <h1 className="reveal text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[3.5rem] font-serif font-bold text-amber-700 leading-[1] sm:leading-[0.85] mb-4 sm:mb-8 tracking-tighter">
                    Crafting <span className="italic text-brand-gradient">Beautiful</span> <br /> Beginnings
                </h1>
                <p className="reveal text-base sm:text-xl md:text-2xl lg:text-3xl text-slate-900 mb-6 sm:mb-10 max-w-3xl uppercase mx-auto leading-relaxed font-medium" style={{ transitionDelay: '0.2s' }}>
                    {t.heroSubtitle}
                </p>
                <div className="reveal flex justify-center" style={{ transitionDelay: '0.4s' }}>
                    <Link href="/editor">
                        <Button variant="primary" size="lg" className="px-10 sm:px-20 py-4 sm:py-7 text-base sm:text-xl rounded-[1.5rem] sm:rounded-[2.5rem] shadow-2xl hover:scale-105 active:scale-95 transition-transform duration-300 group">
                            {t.cta}
                            <span className="ml-3 group-hover:translate-x-2 transition-transform">→</span>
                        </Button>
                    </Link>

                </div>
            </div>
        </header>
    )
}

export default Header