
import React from 'react';
import { Biodata } from '../../types';
import ClassicLayout from '../templates/classic-layout';
import ModernLayout from '../templates/modern-layout';
import CustomLayout from '../templates/custom-layout';
import ElegantLayout from '../templates/elegant-layout';
import { Language } from '@/translations';

interface TemplateProps {
  data: Biodata;
  lang: Language;
}

export const TemplateRenderer: React.FC<TemplateProps> = ({ data, lang }) => {
  if (data.templateId === 'custom-1') return <CustomLayout data={data} lang={lang} />;
  const [type, variantStr] = data.templateId.split('-');
  const variant = parseInt(variantStr);
  switch (type) {
    case 'classic': return <ClassicLayout data={data} lang={lang} variant={variant} />;
    case 'modern': return <ModernLayout data={data} lang={lang} variant={variant} />;
    case 'elegant': return <ElegantLayout data={data} lang={lang} variant={variant} />;
    default: return <ElegantLayout data={data} lang={lang} variant={1} />;
  }
};
