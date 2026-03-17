
import React, { useRef, useState } from 'react';
import { Biodata, CustomField, TemplateID, FieldConfig } from '../types';
import { Button } from './Button';
import { GoogleGenAI } from '@google/genai';
import { TRANSLATIONS, Language } from '../translations';
import { GOD_ICONS, TEMPLATE_SHOWCASE, INITIAL_BIODATA, SECTION_KEYS, SECTION_THEMES } from '../constants';
import { TemplateRenderer } from './home/TemplateRenderer';
import { resizeImage } from '@/helper-functions';

interface EditorProps {
  data: Biodata;
  onChange: (data: Biodata) => void;
  lang: Language;
}

export const Editor: React.FC<EditorProps> = ({ data, onChange, lang }) => {
  const profilePhotoRef = useRef<HTMLInputElement>(null);
  const godPhotoRef = useRef<HTMLInputElement>(null);
  const customBgRef = useRef<HTMLInputElement>(null);

  const [activeTab, setActiveTab] = useState<'details' | 'layout' | 'custom'>('details');
  const [isGodModalOpen, setIsGodModalOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({});
  const [editingLabelId, setEditingLabelId] = useState<string | null>(null);
  const [generatingField, setGeneratingField] = useState<string | null>(null);

  const AI_ENABLED_FIELDS = new Set([
    'aboutMe', 'expectationsGeneral', 'hobbies', 'languages',
    'familyAssets', 'siblings',
  ]);
  const TEXTAREA_FIELDS = new Set(['aboutMe', 'expectationsGeneral', 'familyAssets']);

  const t = TRANSLATIONS[lang].form;

  const toggleSection = (sectionId: string) => {
    setCollapsedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    onChange({ ...data, [name]: value });
  };

  const handleConfigChange = (key: string, updates: Partial<FieldConfig>) => {
    const currentConfig = data.fieldConfigs[key] || { label: '', visible: true, order: 0 };
    onChange({
      ...data,
      fieldConfigs: {
        ...data.fieldConfigs,
        [key]: { ...currentConfig, ...updates }
      }
    });
  };

  const generateAIIntro = async () => {
    setIsGenerating(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Write a professional marriage biodata introduction for ${data.fullName}, who is a ${data.profession} with ${data.education}. Language: ${lang}. Max 2 short sentences.`;
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
      });
      if (response.text) {
        onChange({ ...data, aboutMe: response.text.trim() });
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsGenerating(false);
    }
  };

  const getSortedSectionFields = (sectionId: string) => {
    const standardKeys = SECTION_KEYS[sectionId] || [];
    const customs = data.customFields.filter(f => f.sectionId === sectionId);

    const combined = [
      ...standardKeys.map(k => ({ id: k, isCustom: false, order: data.fieldConfigs[k]?.order ?? 0 })),
      ...customs.map(f => ({ id: f.id, isCustom: true, order: f.order }))
    ];

    return combined.sort((a, b) => (a.order - b.order) || a.id.localeCompare(b.id));
  };

  const handleMoveField = (sectionId: string, currentId: string, direction: 'up' | 'down') => {
    const sorted = getSortedSectionFields(sectionId);
    const index = sorted.findIndex(item => item.id === currentId);

    if (direction === 'up' && index > 0) {
      swapOrder(currentId, sorted[index - 1].id);
    } else if (direction === 'down' && index < sorted.length - 1) {
      swapOrder(currentId, sorted[index + 1].id);
    }
  };

  const swapOrder = (id1: string, id2: string) => {
    const isCustom1 = data.customFields.some(f => f.id === id1);
    const isCustom2 = data.customFields.some(f => f.id === id2);

    const order1 = isCustom1
      ? data.customFields.find(f => f.id === id1)!.order
      : data.fieldConfigs[id1]?.order || 0;
    const order2 = isCustom2
      ? data.customFields.find(f => f.id === id2)!.order
      : data.fieldConfigs[id2]?.order || 0;

    const finalOrder1 = order1 === order2 ? order1 + 1 : order2;
    const finalOrder2 = order1 === order2 ? order1 : order1;

    let newData = { ...data };

    if (isCustom1) {
      newData.customFields = newData.customFields.map(f => f.id === id1 ? { ...f, order: finalOrder1 } : f);
    } else {
      newData.fieldConfigs = { ...newData.fieldConfigs, [id1]: { ...newData.fieldConfigs[id1], order: finalOrder1 } };
    }

    if (isCustom2) {
      newData.customFields = newData.customFields.map(f => f.id === id2 ? { ...f, order: finalOrder2 } : f);
    } else {
      newData.fieldConfigs = { ...newData.fieldConfigs, [id2]: { ...newData.fieldConfigs[id2], order: finalOrder2 } };
    }

    onChange(newData);
  };

  const handleAddCustomField = (sectionId: string) => {
    const sorted = getSortedSectionFields(sectionId);
    const maxOrder = sorted.length > 0 ? Math.max(...sorted.map(s => s.order)) : 0;

    const newField: CustomField = {
      id: `custom_${Date.now()}`,
      label: 'New Label',
      value: '',
      visible: true,
      order: maxOrder + 1,
      sectionId
    };
    onChange({ ...data, customFields: [...data.customFields, newField] });
  };

  const handleDeleteCustomField = (id: string) => {
    onChange({ ...data, customFields: data.customFields.filter(f => f.id !== id) });
  };

  const handleCustomFieldChange = (id: string, updates: Partial<CustomField>) => {
    onChange({
      ...data,
      customFields: data.customFields.map(f => f.id === id ? { ...f, ...updates } : f)
    });
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>, target: 'photo' | 'godPhoto' | 'customBg') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const rawResult = reader.result as string;
        const result = await resizeImage(rawResult, target === 'customBg' ? 1200 : 600);
        if (target === 'customBg') {
          onChange({
            ...data,
            templateId: 'custom-1',
            customConfig: { ...data.customConfig, background: result }
          });
        } else {
          onChange({ ...data, [target]: result });
          if (target === 'godPhoto') setIsGodModalOpen(false);
        }
        e.target.value = '';
      };
      reader.readAsDataURL(file);
    }
  };

  const buildAiPrompt = (fieldName: string): string => {
    const personalDetails = [
      data.fullName && `Full Name: ${data.fullName}`,
      data.gender && `Gender: ${data.gender}`,
      data.age && `Age: ${data.age}`,
      data.dob && `Date of Birth: ${data.dob}`,
      data.maritalStatus && `Marital Status: ${data.maritalStatus}`,
      data.height && `Height: ${data.height}`,
      data.complexion && `Complexion: ${data.complexion}`,
      data.pob && `Birth Place: ${data.pob}`,
      data.hobbies && `Hobbies & Interests: ${data.hobbies}`,
      data.languages && `Languages Known: ${data.languages}`,
    ].filter(Boolean).join('\n');

    const professionalDetails = [
      data.education && `Education: ${data.education}`,
      data.profession && `Profession: ${data.profession}`,
      data.income && `Income: ${data.income}`,
      data.location && `Current Location: ${data.location}`,
    ].filter(Boolean).join('\n');

    const familyDetails = [
      data.fatherName && `Father: ${data.fatherName}`,
      data.fatherOccupation && `Father's Occupation: ${data.fatherOccupation}`,
      data.motherName && `Mother: ${data.motherName}`,
      data.siblings && `Siblings: ${data.siblings}`,
      data.nativePlace && `Native Place: ${data.nativePlace}`,
    ].filter(Boolean).join('\n');

    const horoscopeDetails = [
      data.rashi && `Rashi: ${data.rashi}`,
      data.nakshatra && `Nakshatra: ${data.nakshatra}`,
      data.gothram && `Gothram: ${data.gothram}`,
    ].filter(Boolean).join('\n');

    if (fieldName === 'aboutMe') {
      return `You are an expert Indian marriage biodata writer. Write a warm, professional, and heartfelt "About Me" paragraph for a marriage biodata.

Candidate Profile:
${personalDetails}
${professionalDetails}
${familyDetails}
${horoscopeDetails ? `\nCultural Background:\n${horoscopeDetails}` : ''}

Guidelines:
- Write in third person or first person (whichever feels more natural)
- Highlight personality traits inferred from hobbies, profession, and education
- Mention family values and cultural roots if native place is provided
- Keep it between 40-60 words, warm and heart-touching
- Do NOT use any quotes around the text
- Make it sound genuine, not generic
- Return only the paragraph text, nothing else`;
    }

    if (fieldName === 'expectationsGeneral') {
      return `You are an expert Indian marriage biodata writer. Write a warm and respectful "Partner Expectations" paragraph for a marriage biodata.

About the Candidate:
${personalDetails}
${professionalDetails}
${familyDetails}
${data.expectationsAge ? `Preferred Partner Age: ${data.expectationsAge}` : ''}
${data.expectationsEdu ? `Preferred Partner Education: ${data.expectationsEdu}` : ''}

Guidelines:
- Write expectations that complement the candidate's background
- Be respectful, positive, and family-oriented
- Reference shared values like education, culture, or family orientation
- Keep it between 30-50 words
- Do NOT use any quotes around the text
- Return only the paragraph text, nothing else`;
    }

    if (fieldName === 'hobbies') {
      return `Suggest a comma-separated list of 5-7 hobbies and interests for an Indian marriage biodata.

Candidate Profile:
${personalDetails}
${professionalDetails}

Guidelines:
- Include a mix of creative, intellectual, and outdoor hobbies
- Tailor suggestions to the candidate's profession, age, and gender if available
- Include culturally relevant hobbies (e.g. cooking, yoga, classical music/dance)
- Keep each hobby 1-3 words
- Return ONLY the comma-separated list, nothing else
- Example format: Reading, Photography, Yoga, Cooking, Traveling, Badminton`;
    }

    if (fieldName === 'languages') {
      return `Suggest a comma-separated list of languages known for an Indian marriage biodata.

Candidate Profile:
${data.nativePlace ? `Native Place: ${data.nativePlace}` : ''}
${data.location ? `Current Location: ${data.location}` : ''}
${data.pob ? `Place of Birth: ${data.pob}` : ''}
${data.education ? `Education: ${data.education}` : ''}

Guidelines:
- Suggest languages that would be commonly spoken based on native place, location, and education
- Always include English and Hindi if the person is from India
- Add the regional language based on their native place or birth place (e.g. Marathi for Maharashtra, Tamil for Tamil Nadu)
- Keep it to 3-5 languages
- Return ONLY the comma-separated list, nothing else
- Example format: English, Hindi, Marathi`;
    }

    if (fieldName === 'familyAssets') {
      return `Write a brief, dignified description of family assets for an Indian marriage biodata.

Candidate Profile:
${personalDetails}
${professionalDetails}
${familyDetails}

Guidelines:
- Mention property, business, or investments in a tasteful, non-boastful manner
- Reference the family's native place and current location if available
- Keep it professional and concise (1-2 sentences, under 30 words)
- Do NOT use any quotes around the text
- Return only the description text, nothing else
- Example: Self-owned flat in Mumbai, ancestral property in Pune, family business in textiles`;
    }

    if (fieldName === 'siblings') {
      return `Write a brief description of siblings for an Indian marriage biodata.

Candidate Profile:
${data.fullName ? `Name: ${data.fullName}` : ''}
${data.gender ? `Gender: ${data.gender}` : ''}
${data.age ? `Age: ${data.age}` : ''}
${familyDetails}

Guidelines:
- Generate a realistic sibling description based on the candidate's age and background
- Mention number of siblings, their marital status, education, or occupation
- Keep it brief (under 20 words)
- Do NOT use any quotes around the text
- Return only the text, nothing else
- Example: 1 Elder Sister (Married, Software Engineer), 1 Younger Brother (Studying MBA)`;
    }

    return `Write a short, professional value for the "${(t.fields as Record<string, string>)[fieldName] || fieldName}" field in an Indian marriage biodata for ${data.fullName || 'a candidate'}. Keep it brief (1-2 sentences max). Return only the text.`;
  };

  const handleAiWrite = async (fieldName: string) => {
    const apiKey = 'AIzaSyDGcga_0oHtRn5_H5i3K3-C--ZjnL49ehE';
    if (!apiKey) {
      alert('Gemini API key not configured. Please add GEMINI_API_KEY to your .env or .env.local file.');
      return;
    }

    setGeneratingField(fieldName);
    try {
      const ai = new GoogleGenAI({ apiKey });
      const prompt = buildAiPrompt(fieldName);

      const response = await ai.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: prompt,
      });

      const text = response.text;
      if (text) {
        onChange({ ...data, [fieldName]: text.trim().replace(/^"|"$/g, '') });
      }
    } catch (error) {
      console.error("AI writing failed", error);
      alert('AI writing failed. Please check your API key and try again.');
    } finally {
      setGeneratingField(null);
    }
  };

  const getDisplayLabel = (id: string, isCustom: boolean) => {
    if (isCustom) {
      return data.customFields.find(f => f.id === id)?.label || 'Custom Field';
    }
    const configLabel = data.fieldConfigs[id]?.label;
    const defaultEnLabel = (TRANSLATIONS.en.form.fields as any)[id];
    const localizedLabel = (t.fields as any)[id] || defaultEnLabel;
    return (configLabel !== defaultEnLabel) ? configLabel : localizedLabel;
  };

  const LabelEditor = ({ id, isCustom }: { id: string, isCustom: boolean }) => {
    const isEditing = editingLabelId === id;
    const currentLabel = getDisplayLabel(id, isCustom);

    if (isEditing) {
      return (
        <input
          autoFocus
          value={currentLabel}
          onBlur={() => setEditingLabelId(null)}
          onKeyDown={(e) => e.key === 'Enter' && setEditingLabelId(null)}
          onChange={(e) => isCustom
            ? handleCustomFieldChange(id, { label: e.target.value })
            : handleConfigChange(id, { label: e.target.value })}
          className="text-[10px] font-black uppercase tracking-widest bg-stone-100 border-b border-rose-400 outline-none w-40 px-1 text-rose-700"
        />
      );
    }

    return (
      <div
        onClick={() => setEditingLabelId(id)}
        className="flex items-center gap-2 group/label cursor-pointer"
      >
        <label className="text-[10px] font-black uppercase tracking-widest text-stone-400 group-hover/label:text-rose-600 transition-colors">
          {currentLabel}
        </label>
        <button type="button" className="opacity-0 group-hover/label:opacity-100 text-[8px] text-stone-300 hover:text-rose-400 transition-opacity">
          ✎
        </button>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="flex border-b border-stone-200">
        {(['details', 'layout', 'custom'] as const).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-4 text-[10px] font-black uppercase tracking-[0.2em] transition-all ${activeTab === tab ? 'text-rose-600 bg-rose-50/50' : 'text-stone-400 hover:text-stone-600'}`}
          >
            {tab === 'details' ? t.sections.personal : tab === 'layout' ? t.sections.layout : 'Custom Styles'}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8 scroll-smooth no-scrollbar">
        {activeTab === 'details' && (
          <>
            <div className={`p-6 rounded-1xl border ${SECTION_THEMES.header.border} ${SECTION_THEMES.header.bg} space-y-6`}>
              <div className="flex justify-between items-center">
                <h3 className={`font-serif font-bold text-xl italic ${SECTION_THEMES.header.text}`}>Header Details</h3>
              </div>

              <div className="grid grid-cols-1 gap-6">
                <div>
                  <LabelEditor id="godName" isCustom={false} />
                  <input
                    name="godName"
                    value={data.godName}
                    onChange={handleChange}
                    className="w-full bg-white border border-stone-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-rose-200 mt-2"
                  />
                </div>

                <div className="grid grid-cols-1 gap-6">
                  {/* God Photo Section */}
                  <div className="flex items-center gap-6 p-4 bg-white/50 rounded-2xl border border-stone-100">
                    <div className="w-16 h-16 rounded-2xl border-2 border-dashed border-stone-200 flex items-center justify-center overflow-hidden shrink-0 bg-stone-50">
                      {data.godPhoto ? (
                        <img src={data.godPhoto} className="w-10 h-10 object-contain" />
                      ) : (
                        <span className="text-xl opacity-20">🕉️</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-[9px] font-black uppercase tracking-widest text-stone-400 mb-2">{t.fields.uploadGod}</p>
                      <div className="flex gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => setIsGodModalOpen(true)}
                          className="flex-1 text-[9px] py-2"
                        >
                          {data.godPhoto ? 'Change' : 'Choose Symbol'}
                        </Button>
                        {data.godPhoto && (
                          <Button
                            type="button"
                            variant="danger"
                            size="sm"
                            onClick={() => onChange({ ...data, godPhoto: null })}
                            className="px-3"
                          >
                            ✕
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Dedicated Profile Photo Upload Section */}
                  <div className="flex items-center gap-6 p-4 bg-white/50 rounded-2xl border border-stone-100">
                    <div className="w-20 h-20 rounded-full border-2 border-dashed border-stone-200 flex items-center justify-center overflow-hidden shrink-0 bg-stone-50">
                      {data.photo ? (
                        <img src={data.photo} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-3xl opacity-20">👤</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-[9px] font-black uppercase tracking-widest text-stone-400 mb-2">{t.fields.uploadProfile}</p>
                      <div className="flex gap-2">
                        <Button
                          type="button"
                          variant="gold"
                          size="sm"
                          onClick={() => profilePhotoRef.current?.click()}
                          className="flex-1 text-[9px] py-2 font-black uppercase tracking-widest"
                        >
                          {data.photo ? 'Change Photo' : 'Upload Photo'}
                        </Button>
                        {data.photo && (
                          <Button
                            type="button"
                            variant="danger"
                            size="sm"
                            onClick={() => onChange({ ...data, photo: null })}
                            className="px-3"
                          >
                            ✕
                          </Button>
                        )}
                      </div>
                      <input
                        type="file"
                        ref={profilePhotoRef}
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => handlePhotoUpload(e, 'photo')}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {(['personal', 'professional', 'family', 'expectations', 'contact'] as const).map((sectionId) => (
              <div key={sectionId} className={`rounded-1xl border transition-all ${collapsedSections[sectionId] ? 'border-stone-100' : `${SECTION_THEMES[sectionId].border} ${SECTION_THEMES[sectionId].bg}`}`}>
                <button
                  type="button"
                  onClick={() => toggleSection(sectionId)}
                  className="w-full px-6 py-5 flex items-center justify-between group"
                >
                  <div className="flex items-center gap-4">
                    <span className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${SECTION_THEMES[sectionId].bg} ${SECTION_THEMES[sectionId].text} border ${SECTION_THEMES[sectionId].border} group-hover:scale-110 transition-transform`}>
                      {sectionId === 'personal' ? '👤' : sectionId === 'professional' ? '💼' : sectionId === 'family' ? '🏠' : sectionId === 'expectations' ? '💭' : '📞'}
                    </span>
                    <h3 className={`font-serif font-bold text-xl italic ${SECTION_THEMES[sectionId].text}`}>{t.sections[sectionId]}</h3>
                  </div>
                  <svg className={`w-5 h-5 text-stone-300 transition-transform ${collapsedSections[sectionId] ? '' : 'rotate-180'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7" strokeWidth="2" /></svg>
                </button>

                {!collapsedSections[sectionId] && (
                  <div className="p-6 pt-0 space-y-5 animate-fade-in">
                    {getSortedSectionFields(sectionId).map((field) => {
                      const isCustom = field.isCustom;
                      const fieldData = isCustom
                        ? data.customFields.find(f => f.id === field.id)!
                        : { label: getDisplayLabel(field.id, false), value: (data as any)[field.id], visible: data.fieldConfigs[field.id]?.visible };

                      return (
                        <div key={field.id} className="relative group/field bg-white/40 p-3 rounded-2xl hover:bg-white/80 transition-all border border-transparent hover:border-stone-100">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <LabelEditor id={field.id} isCustom={isCustom} />

                              <button
                                type="button"
                                onClick={() => isCustom ? handleCustomFieldChange(field.id, { visible: !fieldData.visible }) : handleConfigChange(field.id, { visible: !fieldData.visible })}
                                className={`text-[9px] font-bold uppercase p-1 px-2 rounded-md ${fieldData.visible ? 'bg-emerald-50 text-emerald-600' : 'bg-stone-100 text-stone-400'}`}
                              >
                                {fieldData.visible ? 'Visible' : 'Hidden'}
                              </button>
                            </div>

                            <div className="flex items-center gap-1 opacity-0 group-hover/field:opacity-100 transition-opacity">
                              <button type="button" onClick={() => handleMoveField(sectionId, field.id, 'up')} className="p-1 hover:bg-stone-100 rounded">↑</button>
                              <button type="button" onClick={() => handleMoveField(sectionId, field.id, 'down')} className="p-1 hover:bg-stone-100 rounded">↓</button>
                              {isCustom && (
                                <button type="button" onClick={() => handleDeleteCustomField(field.id)} className="p-1 hover:bg-red-50 text-red-400 rounded">✕</button>
                              )}
                            </div>
                          </div>

                          <div className="flex gap-2">
                            {TEXTAREA_FIELDS.has(field.id) ? (
                              <div className="relative flex-1">
                                <textarea
                                  name={isCustom ? undefined : field.id}
                                  value={fieldData.value}
                                  onChange={isCustom ? (e) => handleCustomFieldChange(field.id, { value: e.target.value }) : handleChange}
                                  rows={3}
                                  className="w-full bg-white border border-stone-100 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-rose-200 resize-none"
                                />
                                {!isCustom && AI_ENABLED_FIELDS.has(field.id) && (
                                  <button
                                    type="button"
                                    onClick={() => handleAiWrite(field.id)}
                                    disabled={generatingField !== null}
                                    className={`absolute bottom-3 right-3 p-2 rounded-lg transition-all disabled:opacity-50 ${
                                      generatingField === field.id
                                        ? 'bg-rose-100 text-rose-600 animate-pulse'
                                        : 'bg-rose-50 text-rose-600 hover:bg-rose-100'
                                    }`}
                                    title="Write with AI"
                                  >
                                    {generatingField === field.id ? '⏳' : '✨'}
                                  </button>
                                )}
                              </div>
                            ) : (
                              <div className="relative flex-1">
                                <input
                                  name={isCustom ? undefined : field.id}
                                  value={fieldData.value}
                                  onChange={isCustom ? (e) => handleCustomFieldChange(field.id, { value: e.target.value }) : handleChange}
                                  className={`w-full bg-white border border-stone-100 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-rose-200 ${
                                    !isCustom && AI_ENABLED_FIELDS.has(field.id) ? 'pr-12' : ''
                                  }`}
                                />
                                {!isCustom && AI_ENABLED_FIELDS.has(field.id) && (
                                  <button
                                    type="button"
                                    onClick={() => handleAiWrite(field.id)}
                                    disabled={generatingField !== null}
                                    className={`absolute top-1/2 -translate-y-1/2 right-3 p-1.5 rounded-lg transition-all disabled:opacity-50 ${
                                      generatingField === field.id
                                        ? 'bg-rose-100 text-rose-600 animate-pulse'
                                        : 'bg-rose-50 text-rose-600 hover:bg-rose-100'
                                    }`}
                                    title="Suggest with AI"
                                  >
                                    {generatingField === field.id ? '⏳' : '✨'}
                                  </button>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}

                    <button
                      type="button"
                      onClick={() => handleAddCustomField(sectionId)}
                      className="w-full py-3 border-2 border-dashed border-stone-200 rounded-2xl text-[10px] font-black uppercase tracking-widest text-stone-400 hover:border-rose-300 hover:text-rose-600 hover:bg-white transition-all"
                    >
                      {t.buttons.addField}
                    </button>
                  </div>
                )}
              </div>
            ))}
          </>
        )}

        {activeTab === 'layout' && (
          <div className="space-y-6">
            <div className="bg-rose-50/50 p-6 rounded-[32px] border border-rose-100 flex flex-col items-center gap-4">
              <div className="w-16 h-16 bg-rose-600 rounded-2xl flex items-center justify-center text-3xl shadow-lg">🖼️</div>
              <div className="text-center flex flex-col items-center">
                <h4 className="text-lg font-serif font-bold italic text-rose-900">Premium Template Design</h4>
                <p className="text-xs text-rose-600/60 mb-4">Choose a layout that matches your personal style.</p>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="primary"
                    size="sm"
                    onClick={() => customBgRef.current?.click()}
                    className="text-[10px] font-black tracking-widest uppercase"
                  >
                    {data.customConfig.background ? 'Change Template Image' : 'Upload Own Template'}
                  </Button>
                  {data.customConfig.background && (
                    <Button
                      type="button"
                      variant="danger"
                      size="sm"
                      onClick={() => onChange({ ...data, customConfig: { ...data.customConfig, background: null } })}
                      className="px-3"
                    >
                      ✕
                    </Button>
                  )}
                </div>
                <input type="file" ref={customBgRef} className="hidden" accept="image/*" onChange={(e) => handlePhotoUpload(e, 'customBg')} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {TEMPLATE_SHOWCASE.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onChange({ ...data, templateId: item.id })}
                  className={`p-4 rounded-[40px] border-2 transition-all flex flex-col items-center gap-3 ${data.templateId === item.id ? 'border-rose-600 bg-rose-50/50 shadow-xl' : 'border-stone-100 hover:border-rose-200 bg-white'}`}
                >
                  <div className="w-full aspect-[210/297] bg-white rounded-[24px] shadow-sm border border-stone-100 overflow-hidden relative">
                    <div className="absolute inset-0 origin-top-left scale-[0.25]">
                      <div className="w-[794px] h-[1123px] pointer-events-none">
                        <TemplateRenderer data={{ ...INITIAL_BIODATA, templateId: item.id }} lang={lang} />
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] font-black uppercase tracking-widest text-stone-400 mb-1">{item.category}</p>
                    <p className="text-sm font-bold text-stone-800">{item.name}</p>
                  </div>
                </button>
              ))}
              <button
                type="button"
                onClick={() => onChange({ ...data, templateId: 'custom-1' })}
                className={`p-4 rounded-[40px] border-2 transition-all flex flex-col items-center gap-3 ${data.templateId === 'custom-1' ? 'border-rose-600 bg-rose-50/50 shadow-xl' : 'border-stone-100 hover:border-rose-200 bg-white'}`}
              >
                <div className="w-full aspect-[210/297] bg-stone-900 rounded-[24px] shadow-sm flex flex-col items-center justify-center text-white p-6 text-center overflow-hidden relative group">
                  <div className="absolute inset-0 origin-top-left scale-[0.25] opacity-20">
                    <div className="w-[794px] h-[1123px] pointer-events-none">
                      <TemplateRenderer data={{ ...INITIAL_BIODATA, templateId: 'custom-1' }} lang={lang} />
                    </div>
                  </div>
                  <span className="text-4xl mb-4 relative z-10">🎨</span>
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-60 relative z-10">Full Control</p>
                </div>
                <div className="text-center">
                  <p className="text-[10px] font-black uppercase tracking-widest text-stone-400 mb-1">Advanced</p>
                  <p className="text-sm font-bold text-stone-800">Custom Canvas</p>
                </div>
              </button>
            </div>
          </div>
        )}

        {activeTab === 'custom' && (
          <div className="space-y-8 bg-stone-50/50 p-6 rounded-1xl border border-stone-100">
            <h3 className="font-serif font-bold text-xl italic text-stone-800 mb-4">Template Customizer</h3>

            <div className="space-y-6">
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-stone-400 mb-2 block">Typography</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['serif', 'sans', 'script'] as const).map(font => (
                    <button
                      key={font}
                      type="button"
                      onClick={() => onChange({
                        ...data,
                        templateId: 'custom-1',
                        customConfig: { ...data.customConfig, fontFamily: font }
                      })}
                      className={`py-2 px-4 rounded-xl border-2 text-xs font-bold transition-all ${data.customConfig.fontFamily === font ? 'border-rose-600 bg-white text-rose-600 shadow-md' : 'border-white bg-white text-stone-400'}`}
                    >
                      {font === 'serif' ? 'Classic' : font === 'sans' ? 'Modern' : 'Elegant'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-stone-400 mb-2 block">Text Color</label>
                  <input
                    type="color"
                    value={data.customConfig.textColor}
                    onChange={(e) => onChange({
                      ...data,
                      templateId: 'custom-1',
                      customConfig: { ...data.customConfig, textColor: e.target.value }
                    })}
                    className="w-full h-12 rounded-xl cursor-pointer bg-white p-1 border border-stone-200"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-stone-400 mb-2 block">Accent Color</label>
                  <input
                    type="color"
                    value={data.customConfig.accentColor}
                    onChange={(e) => onChange({
                      ...data,
                      templateId: 'custom-1',
                      customConfig: { ...data.customConfig, accentColor: e.target.value }
                    })}
                    className="w-full h-12 rounded-xl cursor-pointer bg-white p-1 border border-stone-200"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-stone-400 mb-2 block">Background Overlay</label>
                <p className="text-[9px] text-stone-400 mb-4">Adjust the white overlay opacity for better text readability on custom backgrounds.</p>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-stone-400">Opacity</label>
                  <span className="text-[10px] font-bold text-rose-600">{Math.round(data.customConfig.overlayOpacity * 100)}%</span>
                </div>
                <input
                  type="range" min="0" max="1" step="0.05"
                  value={data.customConfig.overlayOpacity}
                  onChange={(e) => onChange({
                    ...data,
                    templateId: 'custom-1',
                    customConfig: { ...data.customConfig, overlayOpacity: parseFloat(e.target.value) }
                  })}
                  className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-rose-600"
                />
              </div>
              
              {/* AI Assistant Section */}
            <section className="bg-gradient-to-br from-slate-900 via-slate-900 to-rose-950 p-8 rounded-[40px] shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-rose-600/10 rounded-full blur-[80px] -mr-32 -mt-32"></div>
              <div 
                className="flex items-center justify-between mb-8 cursor-pointer group relative z-10"
                onClick={() => toggleSection('aiIntro')}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-2xl shadow-inner border border-white/10">✨</div>
                  <h3 className="text-sm font-black uppercase text-white tracking-[0.2em]">
                    {/* {lang === 'hi' ? 'एआई परिचय' : lang === 'mr' ? 'AI परिचय' : 'AI Assistant'} */}

                    AI Assistant
                  </h3>
                </div>
                <span className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 group-hover:text-white font-bold text-xl transition-all">
                  {collapsedSections['aiIntro'] ? '+' : '-'}
                </span>
              </div>
              
              {!collapsedSections['aiIntro'] && (
                <div className="space-y-6 animate-fade-in-up relative z-10">
                  <p className="text-xs text-slate-400 leading-relaxed max-w-md">Our AI can draft a professional summary based on your details. Perfect for making a great first impression.</p>
                  <textarea
                    name="aboutMe"
                    value={data.aboutMe}
                    onChange={handleChange}
                    rows={4}
                    className="w-full p-6 bg-white/5 border border-white/10 rounded-3xl outline-none focus:ring-2 focus:ring-rose-500/50 transition-all text-white font-medium text-sm placeholder:text-slate-600 resize-none"
                    placeholder="..."
                  />
                  <Button onClick={generateAIIntro} disabled={isGenerating} variant="primary" className="w-full py-4 text-[11px] font-black uppercase tracking-widest gap-3 shadow-2xl shadow-rose-900/40 border-none">
                    {isGenerating ? 'AI is thinking...' : `✨ Generate Smart Bio`}
                  </Button>
                </div>
              )}
            </section>
            </div>
          </div>
        )}
      </div>

      {isGodModalOpen && (
        <div className="fixed inset-0 z-[200] p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsGodModalOpen(false)}></div>
          <div className="bg-white rounded-[40px] shadow-2xl relative z-10 overflow-hidden animate-fade-in-up">
            <div className="p-8 border-b border-stone-100 flex justify-between items-center">
              <h3 className="text-2xl font-serif font-bold italic text-slate-900">Choose Spiritual Symbol</h3>
              <button type="button" onClick={() => setIsGodModalOpen(false)} className="text-stone-300 hover:text-stone-900">✕</button>
            </div>
            <div className="p-8 grid grid-cols-3 sm:grid-cols-4 gap-6 max-h-[60vh] overflow-y-auto no-scrollbar">
              {GOD_ICONS.map((icon) => (
                <button
                  key={icon.id}
                  type="button"
                  onClick={() => { onChange({ ...data, godPhoto: icon.url }); setIsGodModalOpen(false); }}
                  className={`aspect-square rounded-2xl border-2 transition-all p-3 flex flex-col items-center justify-center gap-2 ${data.godPhoto === icon.url ? 'border-rose-600 bg-rose-50 shadow-md' : 'border-stone-50 hover:border-stone-200 bg-stone-50/50'}`}
                >
                  <img src={icon.url} className="w-10 h-10 object-contain" />
                  <span className="text-[8px] font-black uppercase tracking-widest text-stone-400 text-center leading-tight">{icon.name}</span>
                </button>
              ))}

              <button
                type="button"
                onClick={() => godPhotoRef.current?.click()}
                className="aspect-square rounded-2xl border-2 border-dashed border-stone-200 flex flex-col items-center justify-center gap-2 hover:border-rose-400 hover:bg-rose-50 transition-all group"
              >
                <span className="text-xl group-hover:scale-125 transition-transform">📁</span>
                <span className="text-[8px] font-black uppercase tracking-widest">Custom</span>
              </button>
              <input type="file" ref={godPhotoRef} className="hidden" accept="image/*" onChange={(e) => handlePhotoUpload(e, 'godPhoto')} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
