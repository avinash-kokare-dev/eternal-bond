import { useApp } from '@/context/AppContext';
import { TRANSLATIONS } from '@/translations';
import React, { useState } from 'react'

const FAQ = () => {
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const { lang } = useApp();
    const t = TRANSLATIONS[lang];
    const homeT = t.home;

    return (
        <>
            <section className="py-16 sm:py-20 bg-stone-50 relative overflow-hidden border-t border-stone-200">
                <div className="max-w-5xl mx-auto px-4 relative z-10">
                    <div className="text-center mb-10 sm:mb-12 reveal">
                        <h2 className="text-1xl sm:text-6xl font-serif font-bold text-slate-900 mb-6 italic tracking-tighter">Common Questions</h2>
                        <p className="text-slate-500 text-lg sm:text-2xl font-medium max-w-3xl mx-auto leading-relaxed">{homeT.faqSubtitle}</p>
                    </div>

                    <div className="space-y-4 sm:space-y-6 reveal">
                        {homeT.faqs.map((faq, idx) => (
                            <div
                                key={idx}
                                className={`group overflow-hidden rounded-[2.5rem] sm:rounded-[1rem] border transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${openFaq === idx ? 'bg-white border-rose-200 shadow-2xl' : 'bg-white/50 border-stone-100 hover:border-rose-100 hover:bg-white'}`}
                            >
                                <button
                                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                                    className="w-full p-8 sm:p-4 flex items-center justify-between text-left focus:outline-none"
                                >
                                    <h4 className={`text-xl sm:text-1.2xl font-bold font-serif transition-colors duration-700 ${openFaq === idx ? 'text-rose-800' : 'text-slate-800'}`}>
                                        {faq.q}
                                    </h4>
                                    <span className={`w-12 h-12 rounded-full border border-stone-100 flex items-center justify-center transition-transform duration-700 ${openFaq === idx ? 'rotate-180 bg-rose-50 text-rose-600' : ''}`}>
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7" strokeWidth="3" /></svg>
                                    </span>
                                </button>
                                <div className={`transition-all duration-1000 ${openFaq === idx ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                                    <div className="px-4 sm:px-4 pb-8 sm:pb-8">
                                        <p className="text-base sm:text-1xl text-slate-600 leading-relaxed font-medium pl-4 border-l-8 border-rose-300">
                                            {faq.a}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}

export default FAQ