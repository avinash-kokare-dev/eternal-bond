import React from 'react'

const OurMission = () => {
    return (
        <>
            <section className="py-16 sm:py-20 bg-rose-50/20 overflow-hidden relative">
                <div className="max-w-7xl mx-auto px-4 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
                        <div className="lg:w-1/2 reveal">
                            <span className="inline-block px-4 py-1.5 bg-rose-100 text-rose-700 rounded-full text-[10px] font-black uppercase tracking-widest mb-6">Our Mission</span>
                            <h2 className="text-4xl sm:text-7xl font-serif font-bold text-slate-900 mb-8 italic leading-tight">Matchmaking with <span className="text-rose-600">Dignity</span></h2>
                            <p className="text-xl text-slate-600 leading-relaxed mb-8 font-medium">
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
                        <div className="lg:w-1/2 relative reveal" style={{ transitionDelay: '300ms' }}>
                            <div className="absolute -inset-4 bg-rose-600/10 rounded-[3rem] blur-3xl"></div>
                            <img
                                src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800&auto=format&fit=crop"
                                alt="Mission"
                                className="relative z-10 rounded-[4rem] shadow-2xl border-8 border-white group-hover:scale-105 transition-transform duration-700"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default OurMission