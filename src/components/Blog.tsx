
import React from 'react';
import { BlogPost } from '../types';
import { BLOG_POSTS } from '../constants';
import { Button } from './Button';

interface BlogProps {
  onPostSelect: (post: BlogPost) => void;
}

export const BlogList: React.FC<BlogProps> = ({ onPostSelect }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-14 animate-fade-in-up">
      <div className="text-center mb-12">
        <span className="text-rose-600 font-black uppercase tracking-[0.4em] text-[10px] block mb-6">Matchmaking Insights</span>
        <h2 className="text-4xl sm:text-7xl font-serif font-bold text-slate-900 mb-6 italic tracking-tight">The Marriage Journal</h2>
        <p className="text-slate-500 max-w-2xl mx-auto text-lg sm:text-2xl font-medium leading-relaxed">Expert advice on finding your life partner and crafting the perfect first impression.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {BLOG_POSTS.map((post, idx) => (
          <article 
            key={post.id} 
            className="group cursor-pointer flex flex-col h-full"
            style={{ animationDelay: `${idx * 0.1}s` }}
            onClick={() => onPostSelect(post)}
          >
            <div className="relative aspect-[16/10] overflow-hidden rounded-[3rem] mb-8 shadow-2xl group-hover:shadow-rose-900/20 transition-all duration-700">
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
              />
              <div className="absolute top-6 left-6">
                <span className="px-5 py-2 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest text-rose-600 shadow-xl">
                  Relationship
                </span>
              </div>
            </div>
            <div className="flex-1 px-4">
              <div className="flex items-center gap-3 text-[10px] font-black uppercase text-slate-400 tracking-widest mb-4">
                <span>{post.date}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-stone-200"></span>
                <span>5 min read</span>
              </div>
              <h3 className="text-2xl font-serif font-bold text-slate-900 mb-4 group-hover:text-rose-600 transition-colors leading-snug">
                {post.title}
              </h3>
              <p className="text-slate-500 text-base leading-relaxed mb-8 line-clamp-3">
                {post.excerpt}
              </p>
              <div className="flex items-center gap-3 text-rose-600 text-[10px] font-black uppercase tracking-widest border-t border-stone-100 pt-6">
                Read Full Story <span className="group-hover:translate-x-2 transition-transform">→</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export const PostDetail: React.FC<{ post: BlogPost; onBack: () => void }> = ({ post, onBack }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-14 animate-fade-in-up">
      <button 
        onClick={onBack}
        className="group flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-rose-600 mb-10 transition-all"
      >
        <span className="group-hover:-translate-x-2 transition-transform">←</span> Back to Journal
      </button>
      
      <div className="mb-12">
        <div className="flex items-center justify-center gap-4 text-[11px] font-black uppercase text-slate-400 tracking-widest mb-8">
          <span>{post.date}</span>
          <span className="w-2 h-2 rounded-full bg-rose-600/20"></span>
          <span>Article</span>
        </div>
        <h1 className="text-4xl sm:text-7xl font-serif font-bold text-slate-900 text-center leading-[1.05] mb-16 italic tracking-tight">
          {post.title}
        </h1>
        <div className="relative aspect-[21/9] rounded-[4rem] overflow-hidden shadow-[0_50px_100px_-30px_rgba(0,0,0,0.3)]">
          <img 
            src={post.image} 
            alt={post.title} 
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="prose prose-stone max-w-none">
        <p className="text-xl sm:text-3xl text-slate-600 leading-relaxed font-serif italic mb-16 border-l-8 border-rose-100 pl-10">
          {post.excerpt}
        </p>
        <div className="text-slate-800 leading-[1.8] text-lg sm:text-2xl space-y-10 font-light">
          {post.content.split('. ').map((para, i) => (
            <p key={i}>{para}.</p>
          ))}
        </div>
      </div>

      <div className="mt-16 pt-10 border-t border-stone-100 flex flex-col items-center text-center">
        <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center text-rose-600 text-3xl mb-8 shadow-inner">
          ✨
        </div>
        <p className="text-lg font-bold text-slate-900 mb-2">EternalBond Editorial Team</p>
        <p className="text-sm text-slate-400 font-medium tracking-widest uppercase">Trusted by families since 2024</p>
      </div>
    </div>
  );
};
