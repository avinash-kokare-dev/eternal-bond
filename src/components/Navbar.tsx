
"use client";
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { TRANSLATIONS, Language } from '../translations';
import { Button } from './Button';
import { PreviewModal } from './PreviewModal';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const { lang, setLang, currentPage, setCurrentPage } = useApp();
  const pathname = usePathname()

  const t = TRANSLATIONS[lang];
  const navT = t.nav;

  const handleNav = (page: any) => {
    setCurrentPage(page);
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className="sticky top-0 z-[100] bg-white/80 backdrop-blur-xl border-b border-slate-200 no-print shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <Link href={'/'} className="flex items-center space-x-3 shrink-0 group">
              <div className="w-10 h-10 bg-gradient-to-br from-rose-700 to-rose-900 rounded-xl flex items-center justify-center text-white font-serif text-xl shadow-lg group-hover:rotate-6 transition-transform">E</div>
              <span className="font-serif font-bold text-2xl tracking-tighter text-slate-900">EternalBond<span className="text-amber-500">.</span></span>
          </Link>

          <div className="hidden xl:flex items-center gap-10 text-[11px] font-black tracking-[0.2em] text-slate-400">
            {
              navT.map((nav, index) => {
                return (
                  <Link href={`/${nav.route}`} className={`hover:text-rose-700 transition-colors relative ${pathname === `/${nav.route}` ? 'text-rose-700 after:absolute after:bottom-[-26px] after:left-0 after:w-full after:h-1 after:bg-rose-700 after:rounded-full' : ''}`} key={index + nav.route}>
                    {nav.routeName}
                  </Link>
                )
              })
            }

            <div className="flex items-center gap-4 ml-6 pl-6 border-l border-slate-200">
              <button
                onClick={() => setIsPreviewOpen(true)}
                className="px-4 py-2 border border-rose-200 text-rose-700 rounded-xl hover:bg-rose-50 transition-all flex items-center gap-2 group/btn shadow-sm"
              >
                <span className="text-lg">👁️</span>
                <span className="text-[10px] font-black tracking-widest uppercase">Preview</span>
              </button>

              <select
                value={lang}
                onChange={(e) => setLang(e.target.value as Language)}
                className="appearance-none text-[11px] font-black uppercase bg-slate-100 border border-slate-200 pl-3 pr-8 py-2 rounded-xl outline-none cursor-pointer hover:border-rose-300 transition-all text-slate-600"
              >
                <option value="en">EN</option>
                <option value="hi">हिन्दी</option>
                <option value="mr">मराठी</option>
              </select>

              <Link href={`/editor`} >
                <Button variant="primary" size="sm" onClick={() => handleNav('editor')} className="px-6 shadow-xl shadow-rose-900/10">
                  Edit
                </Button>
              </Link>

            </div>
          </div>

          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="xl:hidden p-3 bg-slate-100 rounded-xl text-slate-600 hover:text-rose-700 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16m-7 6h7" />}
            </svg>
          </button>
        </div>
      </nav>

      <PreviewModal isOpen={isPreviewOpen} onClose={() => setIsPreviewOpen(false)} />

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-[110] xl:hidden transition-all duration-500 no-print ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={() => setIsMenuOpen(false)}></div>
        <div className={`absolute right-0 top-0 h-full w-[300px] bg-white shadow-2xl transition-transform duration-500 flex flex-col ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="p-8 space-y-8 flex-1 overflow-y-auto">
            <div className="flex flex-col gap-6">
              {
                navT.map((nav, index) => {
                  return (
                    <Link href={`/${nav.route}`} className={`text-left text-sm font-black uppercase tracking-widest ${currentPage == `/${nav.route ? 'text-rose-700' : 'text-slate-400'}`}`} key={index + nav.route}>
                      {nav.routeName}
                    </Link>
                  )
                })
              }
              <button
                onClick={() => { setIsPreviewOpen(true); setIsMenuOpen(false); }}
                className="text-left text-sm font-black uppercase tracking-widest text-rose-600 flex items-center gap-2"
              >
                <span>👁️</span> Preview Results
              </button>
            </div>
            <div className="h-px bg-slate-100"></div>
            <div className="grid grid-cols-3 gap-2">
              {['en', 'hi', 'mr'].map((l) => (
                <button
                  key={l}
                  onClick={() => { setLang(l as Language); setIsMenuOpen(false); }}
                  className={`py-3 text-[10px] font-black rounded-xl border transition-all ${lang === l ? 'bg-rose-700 border-rose-700 text-white shadow-lg' : 'bg-slate-50 border-slate-200 text-slate-400'}`}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="p-8 border-t border-slate-100">
            <Link href={`/editor`} >
              <Button variant="primary" size="lg" onClick={() => handleNav('editor')} className="w-full shadow-2xl rounded-2xl">
                Edit
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
