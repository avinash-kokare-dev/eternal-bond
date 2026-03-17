import { FIELD_GROUPS } from '@/constants';
import { getSortedGroupFields } from '@/helper-functions';
import { TemplateProps } from '@/types';
import Image from 'next/image';
import React from 'react'

const ClassicLayout: React.FC<TemplateProps & { variant: number }> = ({ data, lang, variant }) => {
  const accentColor = ["text-rose-700", "text-stone-700", "text-stone-900", "text-sky-800", "text-amber-700"][variant - 1] || "text-rose-700";
  const borderHex = ["#be123c", "#44403c", "#0c0a09", "#075985", "#b45309"][variant - 1] || "#be123c";

  const renderSortedGroup = (groupKey: keyof typeof FIELD_GROUPS, title: string) => {
    const fields = getSortedGroupFields(data, groupKey, lang);
    if (fields.length === 0) return null;
    return (
      <section>
        <h2 className={`${accentColor} border-b-2 border-current/10 mb-2 font-bold uppercase text-xs tracking-widest`}>{title}</h2>
        <div className="grid grid-cols-1 gap-1">
          {fields.map((f, i) => (
            <div key={i} className="flex gap-2">
              <span className="font-bold min-w-[120px] text-stone-400 uppercase text-[9px] tracking-wider pt-0.5">{f.label}:</span>
              <span className="text-stone-800 font-medium">{f.value}</span>
            </div>
          ))}
        </div>
      </section>
    );
  };

  return (
    <div className={`bg-white h-full flex flex-col font-serif text-sm relative`}>
      {/* Heritage Frame */}
      <div className="absolute inset-4 border-[12px] border-stone-50 pointer-events-none"></div>
      <div className="absolute inset-8 border-[1px] border-stone-200 pointer-events-none"></div>
      <div className="absolute inset-10 border-[3px] border-double pointer-events-none" style={{ borderColor: borderHex + '22' }}></div>

      <div className="flex-1 p-16 relative z-10 space-y-8 overflow-hidden">
        <div className="text-center mb-10">

          {data.godPhoto && <Image
            src={data.godPhoto}
            width={64}
            height={64}
            className="w-32 h-32 mx-auto mb-2 object-contain"
            alt="Picture of the author"
          />}
          <h1 className="text-4xl font-bold uppercase tracking-widest">{data.fullName}</h1>
          <p className={`${accentColor} text-[10px] tracking-[0.4em] uppercase font-bold mt-1 opacity-40`}>Marriage Biodata</p>
        </div>
        <div className="space-y-6">
          {renderSortedGroup('personal', 'Personal Profile')}
          {renderSortedGroup('professional', 'Career & Education')}
          {renderSortedGroup('family', 'Family Background')}
        </div>
      </div>
    </div>
  );
};

export default ClassicLayout