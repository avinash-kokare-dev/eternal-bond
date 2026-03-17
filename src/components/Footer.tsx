
"use client";
import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {

  return (
    <footer className="bg-slate-950 text-slate-400 pt-16 pb-10 no-print px-4 border-t border-slate-900">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-14">
        <div className="space-y-8">
          <div className="flex items-center space-x-3" onClick={() => window.scroll(0,0)}>
            <div className="w-10 h-10 bg-rose-700 rounded-xl flex items-center justify-center text-white font-serif text-xl shadow-lg">E</div>
            <span className="font-serif font-bold text-white text-2xl tracking-tighter">EternalBond<span className="text-amber-500">.</span></span>
          </div>
          <p className="text-base leading-relaxed opacity-50 italic">
            Empowering families to tell their stories with digital elegance.
          </p>
        </div>
        <div>
          <h4 className="text-white font-black text-[11px] uppercase tracking-[0.3em] mb-8">Navigation</h4>
          <div className="space-y-2 text-sm flex flex-col">
            <Link href={'/templates'}><button className="hover:text-rose-500 transition-colors">Templates Gallery</button></Link>
            <Link href={'/blog'}><button className="hover:text-rose-500 transition-colors">Wedding Blog</button></Link>
            <Link href={'/abpit'}><button className="hover:text-rose-500 transition-colors">About Us</button></Link>
          </div>
        </div>
        <div>
          <h4 className="text-white font-black text-[11px] uppercase tracking-[0.3em] mb-8">Support</h4>
          <div className="space-y-2 text-sm flex flex-col">
            <Link href={'/contact'} className="hover:text-rose-500 transition-colors"><button >Contact Support</button></Link>
            <Link href={'/privacy'}><button className="hover:text-rose-500 transition-colors">Privacy Policy</button></Link>
          </div>
        </div>
        {/* <div className="space-y-8">
          <h4 className="text-white font-black text-[11px] uppercase tracking-[0.3em] mb-8">Join the Newsletter</h4>
          <div className="flex bg-slate-900/50 rounded-2xl p-1.5 border border-slate-800">
            <input type="email" placeholder="Email address" className="bg-transparent border-none focus:ring-0 text-sm px-4 flex-1 outline-none text-slate-200" />
            <button className="bg-rose-700 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase">Join</button>
          </div>
        </div> */}
      </div>
      <div className="max-w-7xl mx-auto pt-12 border-t border-slate-900 text-center text-[11px] opacity-20 uppercase tracking-[0.4em] font-black">
        <p>&copy; 2026 EternalBond. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
