import React from 'react'

const ElegantFrame = ({ children, accentColor, variant }: { children: React.ReactNode, accentColor: string, variant: number }) => (
    <div className="h-full w-full relative flex flex-col p-2">
        {/* Base Outer Border */}
        <div className="absolute inset-4 border border-stone-200 pointer-events-none rounded-sm"></div>

        {/* Variant Specific Border Patterns */}
        {variant === 1 && (
            <>
                <div className="absolute inset-6 border-[2px] border-double pointer-events-none opacity-20" style={{ borderColor: accentColor }}></div>
                <div className="absolute inset-10 border-[0.5px] border-stone-100 pointer-events-none"></div>
            </>
        )}
        {variant === 2 && (
            <>
                <div className="absolute inset-6 border border-dashed pointer-events-none opacity-10" style={{ borderColor: accentColor }}></div>
                <div className="absolute inset-[18px] border-[0.5px] pointer-events-none opacity-5" style={{ borderColor: accentColor }}></div>
            </>
        )}
        {variant === 3 && (
            <>
                <div className="absolute inset-6 border-[3px] border-double pointer-events-none opacity-15" style={{ borderColor: accentColor }}></div>
                <div className="absolute inset-8 border-[0.5px] pointer-events-none opacity-5" style={{ borderColor: accentColor }}></div>
            </>
        )}
        {variant === 4 && (
            <>
                <div className="absolute inset-5 border border-stone-200 pointer-events-none"></div>
                <div className="absolute inset-7 border-[1.5px] border-double pointer-events-none opacity-20" style={{ borderColor: accentColor }}></div>
            </>
        )}
        {variant === 5 && (
            <>
                <div className="absolute inset-6 border-l-4 border-r-4 pointer-events-none opacity-[0.03]" style={{ borderColor: accentColor }}></div>
                <div className="absolute inset-8 border border-stone-100 pointer-events-none"></div>
            </>
        )}

        {/* Corners */}
        <div className="absolute top-6 left-6 rotate-0"><LuxuryCorner color={accentColor} variant={variant} /></div>
        <div className="absolute top-6 right-6 rotate-90"><LuxuryCorner color={accentColor} variant={variant} /></div>
        <div className="absolute bottom-6 left-6 -rotate-90"><LuxuryCorner color={accentColor} variant={variant} /></div>
        <div className="absolute bottom-6 right-6 rotate-180"><LuxuryCorner color={accentColor} variant={variant} /></div>

        {children}
    </div>
);

const LuxuryCorner = ({ color, variant }: { color: string, variant: number }) => {
  // Unique corners per variant
  if (variant === 2) { // Floral / Serenity
    return (
      <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-40">
        <circle cx="10" cy="10" r="3" fill={color} />
        <circle cx="25" cy="10" r="1.5" fill={color} />
        <circle cx="10" cy="25" r="1.5" fill={color} />
        <path d="M10 10C30 10 50 30 50 60" stroke={color} strokeWidth="0.5" strokeDasharray="2 2" />
        <path d="M10 10C10 30 30 50 60 50" stroke={color} strokeWidth="0.5" strokeDasharray="2 2" />
      </svg>
    );
  }
  if (variant === 3) { // Amber Glow / Ornate
    return (
      <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-60">
        <path d="M5 5L40 5M5 5L5 40M15 15L30 15M15 15L15 30" stroke={color} strokeWidth="1.5" strokeLinecap="square" />
        <rect x="3" y="3" width="4" height="4" fill={color} />
      </svg>
    );
  }
  // Default Royal Corner
  return (
    <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="filter drop-shadow-sm opacity-60">
      <path d="M2 2C2 2 2 40 2 40" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M2 2C2 2 40 2 40 2" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M10 10C10 10 10 25 10 25" stroke={color} strokeWidth="0.5" strokeLinecap="round" opacity="0.4" />
      <path d="M10 10C10 10 25 10 25 10" stroke={color} strokeWidth="0.5" strokeLinecap="round" opacity="0.4" />
      <circle cx="2" cy="2" r="2" fill={color} />
    </svg>
  );
};

export default ElegantFrame