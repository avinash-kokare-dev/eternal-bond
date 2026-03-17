import React from 'react'

const AIIntelligence = () => {

    const data = [
        { title: "Smart Biographies", desc: "Our AI analyzes your hobbies and profession to write the perfect 'About Me'." },
        { title: "Contextual Translation", desc: "Perfectly idiomatic Hindi and Marathi translations that maintain emotional depth." }
    ]
    return (
        <>
            <section className="py-16 sm:py-20 bg-slate-950 text-white relative overflow-hidden neural-bg">
                <div className="absolute inset-0 opacity-20">
                    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <rect width="100" height="100" fill="url(#grid)" />
                    </svg>
                </div>

                <div className="max-w-7xl mx-auto px-4 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                        <div className="lg:w-1/2 reveal">
                            <span className="text-rose-500 font-black uppercase tracking-[0.4em] text-[10px] block mb-6 animate-pulse">Advanced Intelligence</span>
                            <h2 className="text-4xl sm:text-6xl font-serif font-bold mb-8 italic leading-tight">
                                AI that understands <span className="text-rose-600">your soul.</span>
                            </h2>
                            <p className="text-slate-400 text-lg sm:text-2xl leading-relaxed font-light mb-10">
                                Experience the magic of <strong className="text-white">AI</strong>. We don't just fill forms; we weave your personality and aspirations into a narrative that resonates.
                            </p>

                            <div className="space-y-6">
                                {data.map((item, idx) => (
                                    <div key={idx} className="flex items-start gap-5 group">
                                        <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-rose-500 shrink-0 group-hover:border-rose-500 transition-colors">✨</div>
                                        <div>
                                            <h4 className="font-bold text-white mb-1 group-hover:text-rose-400 transition-colors">{item.title}</h4>
                                            <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="lg:w-1/2 relative group reveal" style={{ transitionDelay: '0.3s' }}>
                            <div className="absolute -inset-4 bg-rose-600/20 rounded-[3rem] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                            <div className="relative bg-slate-900 p-8 rounded-[4rem] border border-slate-800 shadow-2xl overflow-hidden backdrop-blur-xl">
                                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-rose-600/10 to-transparent animate-scan pointer-events-none"></div>
                                <div className="flex items-center gap-4 mb-12 pb-8 border-b border-slate-800">
                                    <div className="w-16 h-16 bg-gradient-to-br from-rose-600 to-rose-900 rounded-full shadow-lg flex items-center justify-center text-3xl">🤖</div>
                                    <div>
                                        <div className="h-4 w-40 bg-slate-800 rounded-full mb-3 animate-pulse"></div>
                                        <div className="h-2.5 w-24 bg-slate-800/50 rounded-full animate-pulse"></div>
                                    </div>
                                </div>
                                <div className="space-y-6">
                                    <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden relative">
                                        <div className="absolute inset-0 bg-rose-600/40 animate-[typing_4s_ease-in-out_infinite]"></div>
                                    </div>
                                    <div className="h-3 w-[85%] bg-slate-800 rounded-full overflow-hidden relative">
                                        <div className="absolute inset-0 bg-rose-600/40 animate-[typing_4s_ease-in-out_infinite_0.5s]"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default AIIntelligence