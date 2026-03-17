import { BLOG_POSTS } from '@/constants';
import Link from 'next/link';
import React from 'react'

const FeaturedBlog = () => {
    return (
        <>
            <section className="py-16 sm:py-20 bg-slate-200 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 relative z-10">
                    <div className="text-center mb-10 sm:mb-14 reveal">
                        <span className="inline-block px-6 py-2 bg-rose-50 rounded-full text-[10px] font-black uppercase tracking-[0.3em] text-rose-600 mb-6">Expert Insights</span>
                        <h2 className="text-3xl sm:text-6xl font-serif font-bold text-slate-900 mb-4 tracking-tighter italic">Latest from our Blog</h2>
                        <p className="text-slate-500 text-lg sm:text-2xl font-medium max-w-2xl mx-auto leading-relaxed">Tips and guides to help you find your perfect life partner.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {BLOG_POSTS.map((post, idx) => (
                            <div
                                key={post.id}
                                className="reveal group cursor-pointer"
                                style={{ transitionDelay: `${idx * 150}ms` }}
                                onClick={() => console.log("hello")}
                            >
                                <div className="relative aspect-[16/10] overflow-hidden rounded-[2.5rem] mb-6 shadow-xl group-hover:shadow-rose-900/10 transition-all">
                                    <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                </div>
                                <div className="px-2">
                                    <div className="flex items-center gap-3 text-[10px] font-black uppercase text-rose-600 tracking-widest mb-3">
                                        <span>{post.date}</span>
                                        <span className="w-1 h-1 bg-stone-200 rounded-full"></span>
                                        <span>Article</span>
                                    </div>
                                    <h3 className="text-xl font-serif font-bold text-slate-900 group-hover:text-rose-700 transition-colors leading-snug">{post.title}</h3>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-10 text-center reveal" style={{ transitionDelay: '0.4s' }}>
                        <Link href={'/blog'}>
                            <button
                                className="px-10 py-4 border-2 border-stone-100 rounded-2xl text-xs font-black uppercase tracking-[0.2em] text-stone-400 hover:border-rose-100 hover:text-rose-600 hover:bg-rose-50/50 transition-all"
                            >
                                View All Articles
                            </button>
                        </Link>
                    </div>
                </div>
            </section>
        </>
    )
}

export default FeaturedBlog