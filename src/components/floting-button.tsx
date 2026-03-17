'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const FloatingButton = () => {
    const [showFab, setShowFab] = useState(false);
    const pathName = usePathname();

    useEffect(() => {
        const handleScroll = () => setShowFab(window.scrollY > 400);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    return (
        <>
            <div className={`fixed bottom-8 right-6 sm:bottom-12 sm:right-12 z-[70] transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] no-print cursor-pointer ${showFab && pathName !== '/editor' ? 'translate-y-0 opacity-100' : 'translate-y-32 opacity-0'}`}>
                <div className="relative group cursor-pointer">
                    {/* Pulsing Aura */}
                    <div className="absolute inset-0 bg-rose-500 rounded-full blur-xl opacity-20 group-hover:opacity-40 animate-pulse transition-opacity"></div>
                    <div className="absolute inset-0 bg-rose-400 rounded-full animate-ping opacity-10 group-hover:opacity-25"></div>


                    <Link href={'/editor'}>

                        <button
                            className="relative flex items-center gap-4 bg-gradient-to-r from-rose-600 via-rose-700 to-indigo-800 text-white pl-7 pr-5 py-4 sm:py-5 rounded-full shadow-[0_20px_50px_-10px_rgba(190,18,60,0.4)] hover:shadow-[0_25px_60px_-10px_rgba(190,18,60,0.6)] hover:scale-110 active:scale-95 transition-all duration-500 border border-white/20 backdrop-blur-md cursor-pointer"
                        >
                            <div className="flex flex-col items-start leading-none">
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-70 mb-1">Create Now</span>
                                <span className="text-xs sm:text-sm font-bold tracking-tight">Free Biodata</span>
                            </div>

                            <div className="bg-white/20 rounded-full p-2.5 group-hover:bg-white/30 group-hover:rotate-90 transition-all duration-500">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" />
                                </svg>
                            </div>
                        </button>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default FloatingButton