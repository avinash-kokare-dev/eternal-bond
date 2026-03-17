import { TRANSLATIONS } from '@/translations';
import { TemplateProps } from '@/types';
import React from 'react';
import ElegantFrame from './elegant-frame';
import { getSortedGroupFields } from '@/helper-functions';

const CustomLayout: React.FC<TemplateProps> = ({ data, lang }) => {
  const { background, textColor, accentColor, fontFamily, overlayOpacity } = data.customConfig;
  const fontClass = fontFamily === 'serif' ? 'font-serif' : fontFamily === 'script' ? 'font-script' : 'font-sans';
  const t = TRANSLATIONS[lang];

  return (
    <div
      className={`h-full w-full relative flex flex-col overflow-hidden ${fontClass}`}
      style={{ color: textColor, backgroundColor: 'white' }}
    >
      {/* Background Layer (Template Image) */}
      {background && (
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{ backgroundImage: `url("${background}")`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        />
      )}

      {/* Color Overlay Layer for Readability */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{ backgroundColor: `rgba(255, 255, 255, ${overlayOpacity})` }}
      />

      {/* Frame Layer - Elegant Double Border with Accent */}
      {!background && (
        <ElegantFrame accentColor={accentColor} variant={1}>
          <div className="hidden" /> {/* Frame wrapper handled above */}
        </ElegantFrame>
      )}

      <div className="relative z-[2] flex flex-col h-full p-16">
        {/* Header Section */}
        <div className="text-center mb-10">
          {data.godPhoto && <img crossOrigin="anonymous" src={data.godPhoto} className="w-14 h-14 mx-auto mb-3 object-contain" />}
          {data.fieldConfigs.godName?.visible && (
            <p className="text-[10px] font-black uppercase tracking-[0.3em] mb-2 opacity-60">{data.godName}</p>
          )}
          <h1 className="text-6xl font-black uppercase tracking-tight mb-2" style={{ color: accentColor }}>{data.fullName}</h1>
          <div className="flex items-center gap-4 justify-center">
            <div className="h-px w-12" style={{ backgroundColor: accentColor, opacity: 0.3 }}></div>
            <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40">Marriage Biodata</p>
            <div className="h-px w-12" style={{ backgroundColor: accentColor, opacity: 0.3 }}></div>
          </div>
        </div>

        <div className="flex gap-12 flex-1 overflow-hidden">
          {/* Left Column: Photo & Personal */}
          <div className="w-1/3 flex flex-col items-center">
            {data.photo && (
              <div className="mb-8 p-1 rounded-3xl border-4 border-double" style={{ borderColor: accentColor }}>
                <img crossOrigin="anonymous" src={data.photo} className="w-40 h-40 object-cover rounded-2xl shadow-xl" />
              </div>
            )}
            <div className="space-y-4 w-full">
              <div className="text-[10px] font-black uppercase tracking-widest pb-1 border-b-2" style={{ color: accentColor, borderBottomColor: accentColor + '33' }}>
                {t.form.sections.personal}
              </div>
              <div className="space-y-3">
                {getSortedGroupFields(data, 'personal', lang).filter(f => f.id !== 'aboutMe').slice(0, 10).map((f, i) => (
                  <div key={i} className="text-center">
                    <p className="text-[8px] font-black uppercase tracking-widest opacity-40 mb-0.5">{f.label}</p>
                    <p className="text-sm font-bold">{f.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Other Sections */}
          <div className="flex-1 space-y-10 overflow-y-auto no-scrollbar">
            {['professional', 'family', 'expectations'].map((grp) => {
              const fields = getSortedGroupFields(data, grp as any, lang);
              if (fields.length === 0) return null;
              return (
                <section key={grp}>
                  <h3 className="text-xs font-black uppercase tracking-widest mb-4 pb-1 border-b-2" style={{ color: accentColor, borderBottomColor: accentColor + '33' }}>
                    {t.form.sections[grp as keyof typeof t.form.sections]}
                  </h3>
                  <div className="space-y-3">
                    {fields.map((f, i) => (
                      <div key={i} className="flex gap-4 items-start">
                        <span className="text-[10px] font-black uppercase tracking-wider opacity-40 min-w-[150px] pt-0.5">{f.label}</span>
                        <span className="text-sm font-bold leading-relaxed">{f.value}</span>
                      </div>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-auto pt-8 border-t flex justify-center gap-12 text-[10px] font-black uppercase tracking-[0.3em]" style={{ borderColor: accentColor + '22' }}>
          {data.fieldConfigs.phone?.visible && <span>P: {data.phone}</span>}
          {data.fieldConfigs.email?.visible && <span>M: {data.email}</span>}
        </div>
      </div>
    </div>
  );
};

export default CustomLayout;