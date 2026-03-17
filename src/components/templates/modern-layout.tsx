import { getSortedGroupFields } from '@/helper-functions';
import { TemplateProps } from '@/types';
import Image from 'next/image';
import React from 'react';

const ModernLayout: React.FC<TemplateProps & { variant: number }> = ({ data, lang, variant }) => {
  const borderHex = ["#e11d48", "#2563eb", "#059669", "#ea580c", "#7c3aed"][variant - 1] || "#e11d48";

  return (
    <div className={`h-full flex flex-col font-sans bg-white relative`}>
      <div className="absolute inset-4 border-[0.5px] border-stone-200 pointer-events-none"></div>
      <div className="absolute top-4 left-4 right-4 h-1" style={{ backgroundColor: borderHex }}></div>
      <div className="absolute bottom-4 left-4 right-4 h-1" style={{ backgroundColor: borderHex, opacity: 0.1 }}></div>

      <div className="p-14 flex flex-col flex-1 overflow-hidden relative z-10">
        <div className="flex justify-between items-start mb-10">
          <div className="flex-1 pr-4">
            {data.fieldConfigs.godName?.visible && (
              <p className="text-[10px] font-black uppercase text-stone-400 mb-1">{data.godName}</p>
            )}
            <h1 className="text-5xl font-black tracking-tighter uppercase leading-[0.9]">{data.fullName}</h1>
            <p className="text-xs font-bold opacity-30 tracking-[0.5em] mt-2">MARRIAGE BIODATA</p>
          </div>
          <div className="flex flex-col items-end gap-2 shrink-0">
            {data.godPhoto && <Image
              src={data.godPhoto}
              width={64}
              height={64}
              className="w-24 h-24 object-contain"
              alt="Picture of the author"
            />}

            {data.photo && <Image
              src={data.photo}
              width={64}
              height={64}
              className="w-32 h-32 rounded-1xl object-cover shadow-1xl border-white"
              alt="Picture of the author"
            />}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-10 text-xs">
          <section className="space-y-5">
            <h4 className="text-[10px] font-black uppercase opacity-20 border-b pb-1">Primary Details</h4>
            {[...getSortedGroupFields(data, 'personal', lang), ...getSortedGroupFields(data, 'professional', lang)]
              .filter(f => f.id !== 'aboutMe')
              .slice(0, 11).map((f, i) => (
                <div key={i} className="flex flex-col">
                  <span className="opacity-40 text-[9px] uppercase font-bold tracking-tighter">{f.label}</span>
                  <span className="font-bold text-stone-800">{f.value}</span>
                </div>
              ))}
          </section>
          <section className="space-y-5">
            <h4 className="text-[10px] font-black uppercase opacity-20 border-b pb-1">Family & More</h4>
            {[...getSortedGroupFields(data, 'family', lang), ...getSortedGroupFields(data, 'expectations', lang)].slice(0, 11).map((f, i) => (
              <div key={i} className="flex flex-col">
                <span className="opacity-40 text-[9px] uppercase font-bold tracking-tighter">{f.label}</span>
                <span className="font-bold text-stone-800">{f.value}</span>
              </div>
            ))}
          </section>
        </div>
        <div className="mt-auto pt-6 border-t flex justify-between items-center opacity-30 text-[9px] font-black uppercase tracking-[0.4em]">
          <span>{data.phone}</span>
          <span>{data.email}</span>
        </div>
      </div>
    </div>
  );
};

export default ModernLayout;