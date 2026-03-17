import { TemplateProps } from '@/types';
import Image from 'next/image';
import React from 'react';
import ElegantFrame from './elegant-frame';
import { getSortedGroupFields } from '@/helper-functions';

const ElegantLayout: React.FC<TemplateProps & { variant: number }> = ({ data, lang, variant }) => {
  const borders = ["#e11d48", "#be123c", "#b45309", "#0f766e", "#3730a3"];
  const accentColors = ["text-rose-900", "text-rose-950", "text-amber-950", "text-teal-950", "text-indigo-950"];
  const bgColors = ["bg-[#fffcf9]", "bg-rose-50/5", "bg-amber-50/5", "bg-teal-50/5", "bg-indigo-50/5"];

  const accentHex = borders[variant - 1] || borders[0];
  const bg = bgColors[variant - 1] || bgColors[0];
  const textColor = accentColors[variant - 1] || "text-stone-900";

  return (
    <div className={`${bg} h-full flex flex-col relative font-serif overflow-hidden`}>
      <ElegantFrame accentColor={accentHex} variant={variant}>
        <div className="flex-1 flex flex-col p-12 relative z-10">
          <div className="flex flex-col items-center text-center mb-10">

            {data?.godPhoto && <Image
              src={data?.godPhoto}
              width={64}
              height={64}
              className="w-32 h-32 mb-4 object-contain filter drop-shadow-md"
              alt="Picture of the author"
            />}

            {data.fieldConfigs.godName?.visible && (
              <p className="font-script text-3xl text-stone-400 mb-0 leading-none opacity-80">{data.godName}</p>
            )}
            <h1 className={`text-6xl font-bold tracking-tight ${textColor} mb-1 italic leading-tight drop-shadow-sm`}>{data.fullName}</h1>
            <div className="flex items-center gap-6 w-full max-w-sm mx-auto mb-4">
              <div className="h-px flex-1 bg-stone-200"></div>
              <p className="font-script text-4xl text-rose-800/30 -mt-2">Marriage Biodata</p>
              <div className="h-px flex-1 bg-stone-200"></div>
            </div>

            {data.fieldConfigs.aboutMe?.visible && data.aboutMe && (
              <div className="px-16 relative">
                <p className="text-[11px] italic opacity-60 leading-relaxed font-serif tracking-wide max-w-lg mx-auto">
                  "{data.aboutMe}"
                </p>
              </div>
            )}
          </div>

          <div className="flex gap-14 flex-1 overflow-hidden">
            <div className="w-[36%] flex flex-col items-center">
              {data.photo && (
                <div className="relative mb-10">
                  <div className="absolute -inset-4 border border-dashed rounded-full opacity-10" style={{ borderColor: accentHex }}></div>
                  <img crossOrigin="anonymous" src={data.photo} className="w-44 h-44 object-cover rounded-full border-[6px] border-white shadow-[0_20px_50px_-10px_rgba(0,0,0,0.3)] relative z-10" />
                </div>
              )}
              <div className="text-center space-y-4 w-full px-4">
                {getSortedGroupFields(data, 'personal', lang).filter(f => f.id !== 'aboutMe').slice(0, 8).map((f, i) => (
                  <div key={i} className="relative pb-1">
                    <p className="text-[9px] font-black uppercase tracking-[0.25em] opacity-30 mb-0.5">{f.label}</p>
                    <p className="text-sm font-bold text-stone-800 leading-tight">{f.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-[64%] space-y-10 pr-6">
              {[
                { grp: 'professional', title: 'Education & Career' },
                { grp: 'family', title: 'Family Background' },
              ].map((section) => (
                <section key={section.grp}>
                  <div className="flex items-center gap-4 mb-4">
                    <h4 className={`italic ${textColor} text-xl font-bold shrink-0 leading-none`}>{section.title}</h4>
                    <div className="h-px flex-1 bg-stone-100"></div>
                  </div>
                  <div className="space-y-3">
                    {getSortedGroupFields(data, section.grp as any, lang).map((f, i) => (
                      <div key={i} className="text-xs flex gap-6 p-1 -ml-1">
                        <span className="text-stone-400 font-bold min-w-[140px] uppercase text-[9px] tracking-wider pt-0.5">{f.label}</span>
                        <span className="font-bold text-stone-800 flex-1 leading-relaxed">{f.value}</span>
                      </div>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>

          <div className="m-16 flex justify-center gap-16 text-[10px] font-black uppercase tracking-[0.4em] opacity-40">
            {data.fieldConfigs.phone?.visible && <span>{data.phone}</span>}
            {data.fieldConfigs.email?.visible && <span>{data.email}</span>}
          </div>
        </div>
      </ElegantFrame>
    </div>
  );
};

export default ElegantLayout;