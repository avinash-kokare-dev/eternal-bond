import { useApp } from '@/context/AppContext';
import { TRANSLATIONS } from '@/translations';
import React from 'react'

const HowItWorks = () => {
    const { lang } = useApp();

    const t = TRANSLATIONS[lang];
    const homeT = t.home;
    return (
        <>
            {/* Steps to Create Section */}
            <section className="py-16 sm:py-20 bg-stone-50 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 relative z-10">
                    <div className="text-center mb-12 sm:mb-16 reveal">
                        <span className="inline-block px-6 py-2 bg-rose-50 rounded-full text-[10px] sm:text-[11px] font-black uppercase tracking-[0.3em] text-rose-600 mb-6 border border-rose-100">Simple 4-Step Process</span>
                        <h2 className="text-4xl sm:text-7xl font-serif font-bold text-slate-900 mb-8 tracking-tighter italic">
                            How it <span className="text-rose-600">Works</span>
                        </h2>
                        <p className="text-slate-500 text-lg sm:text-2xl font-medium max-w-3xl mx-auto leading-relaxed">
                            We've designed our platform to be as simple as filling a form, with results that look like they were designed by an agency.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                        {homeT.howToSteps.map((step, idx) => (
                            <div
                                key={idx}
                                className="reveal group relative bg-white p-10 rounded-[3rem] border border-stone-100 shadow-xl shadow-stone-200/50 hover:shadow-2xl hover:shadow-rose-900/10 hover:border-rose-100 hover:-translate-y-4 transition-all duration-700 overflow-hidden"
                                style={{ transitionDelay: `${idx * 150}ms` }}
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
        </>
    )
}

export default HowItWorks