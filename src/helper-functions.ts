import { FIELD_GROUPS } from "./constants";
import { Language, TRANSLATIONS } from "./translations";
import { Biodata } from "./types";

const getSortedGroupFields = (data: Biodata, groupKey: keyof typeof FIELD_GROUPS, lang: Language) => {
  const keys = FIELD_GROUPS[groupKey];
  const t = TRANSLATIONS[lang].form.fields;

  const standardFields = keys
    .filter(k => data.fieldConfigs[k]?.visible)
    .map(k => {
      const defaultEnLabel = (TRANSLATIONS.en.form.fields as any)[k];
      const configLabel = data.fieldConfigs[k].label;
      const localizedLabel = (t as any)[k] || configLabel;
      const finalLabel = (configLabel !== defaultEnLabel) ? configLabel : localizedLabel;

      return {
        id: k,
        label: finalLabel,
        value: (data as any)[k],
        order: data.fieldConfigs[k].order
      };
    });

  const customFields = data.customFields
    .filter(f => f.sectionId === groupKey && f.visible)
    .map(f => ({
      id: f.id,
      label: f.label,
      value: f.value,
      order: f.order
    }));

  return [...standardFields, ...customFields].sort((a, b) => (a.order - b.order) || a.id.localeCompare(b.id));
};

const resizeImage = (dataUrl: string, maxWidth: number = 1000): Promise<string> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      let width = img.width;
      let height = img.height;
      if (width > maxWidth) {
        height = Math.round((height * maxWidth) / width);
        width = maxWidth;
      }
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', 0.8));
      } else {
        resolve(dataUrl);
      }
    };
    img.onerror = () => {
      console.error("Failed to load image for resizing");
      resolve(dataUrl);
    };
    img.src = dataUrl;
  });
};

export {
    getSortedGroupFields,
    resizeImage
}