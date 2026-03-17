
// export type Language = 'en' | 'hi' | 'mr' | 'bn' | 'te' | 'ta';
export type Language = 'en';


// nav: [{
//     home: string;
//     about: string;
//     blog: string;
//     contact: string;
//     editor: string;
//     templates: string;
//     startFree: string;
//   }];
export interface TranslationSchema {
  nav: any[];
  tagline: string;
  heroTitle: string;
  heroSubtitle: string;
  cta: string;
  fabCta: string;
  viewTemplates: string;
  testimonialsHeading: string;
  testimonials: {
    addReview: string;
    writeReview: string;
    nameLabel: string;
    reviewLabel: string;
    ratingLabel: string;
    submit: string;
    success: string;
    placeholderName: string;
    placeholderReview: string;
  };
  templatesPage: {
    title: string;
    subtitle: string;
    select: string;
  };
  home: {
    communitiesTitle: string;
    communitiesSubtitle: string;
    communityNames: string[];
    whyTitle: string;
    whySubtitle: string;
    benefit1Title: string;
    benefit1Desc: string;
    benefit2Title: string;
    benefit2Desc: string;
    benefit3Title: string;
    benefit3Desc: string;
    keyInfoTitle: string;
    keyInfoSubtitle: string;
    keyInfoSections: {
      title: string;
      items: string[];
    }[];
    aboutTitle: string;
    aboutDesc: string;
    aboutMissionCta: string;
    howToTitle: string;
    howToSubtitle: string;
    howToSteps: { title: string; desc: string; icon: string }[];
    faqTitle: string;
    faqSubtitle: string;
    faqs: { q: string; a: string; }[];
  };
  form: {
    sections: {
      header: string;
      layout: string;
      personal: string;
      horoscope: string;
      professional: string;
      family: string;
      expectations: string;
      intro: string;
      contact: string;
    };
    fields: {
      fullName: string;
      maritalStatus: string;
      dob: string;
      tob: string;
      pob: string;
      height: string;
      weight: string;
      complexion: string;
      bloodGroup: string;
      hobbies: string;
      languages: string;
      rashi: string;
      nakshatra: string;
      gothram: string;
      manglik: string;
      education: string;
      profession: string;
      income: string;
      location: string;
      fatherName: string;
      fatherOccupation: string;
      motherName: string;
      motherOccupation: string;
      siblings: string;
      nativePlace: string;
      maternalUncle: string;
      familyAssets: string;
      expectationsAge: string;
      expectationsEdu: string;
      expectationsGeneral: string;
      phone: string;
      email: string;
      spiritualText: string;
      uploadProfile: string;
      uploadGod: string;
      aboutMe: string;
    };
    buttons: {
      generateAi: string;
      generating: string;
      reset: string;
      savePdf: string;
      addField: string;
    };
  };
}

const en: TranslationSchema = {
  nav: [
    {route: "about-us", routeName: "About Us"}, 
    {route: "blog", routeName: "Blog"}, 
    {route: "contact-us", routeName: "Contact Us"}, 
    // {route: "editor", routeName: "Editor"}, 
    {route: "templates", routeName: "Templates"},
    {route: "editor", routeName: "Start Free"}
  ],
  tagline: "Your Journey to Forever Starts with a Beautiful Story.",
  heroTitle: "Crafting Beautiful Beginnings",
  heroSubtitle: "Design stunning, professional marriage biodatas in minutes. Trusted by families.",
  cta: "Create Your Biodata Free",
  fabCta: "Create Biodata",
  viewTemplates: "View Premium Templates",
  testimonialsHeading: "Trusted by Families Worldwide",
  testimonials: {
    addReview: "Share Your Story",
    writeReview: "Write a Review",
    nameLabel: "Your Full Name",
    reviewLabel: "Your Experience",
    ratingLabel: "Overall Rating",
    submit: "Post My Review",
    success: "Thank you! Your story has been shared.",
    placeholderName: "e.g. Rahul Sharma",
    placeholderReview: "How did EternalBond help your family?"
  },
  templatesPage: {
    title: "Premium Design Gallery",
    subtitle: "Select a design that reflects your personality and cultural heritage.",
    select: "Use Design"
  },
  home: {
    communitiesTitle: "Biodata for All Communities",
    communitiesSubtitle: "Inclusive templates crafted for every religion, caste, and cultural tradition across all Indian states.",
    communityNames: ["Hindu", "Muslim", "Sikh", "Christian", "Jain", "Buddhist", "Brahmin", "Maratha", "Patel", "Rajput", "Lingayat", "Kayastha"],
    whyTitle: "Why Choose Our Biodata Maker?",
    whySubtitle: "We provide the most culturally relevant and professional tools for families worldwide.",
    benefit1Title: "Free and Easy to Use",
    benefit1Desc: "Create a professional biodata in minutes without any hidden costs.",
    benefit2Title: "Multiple Formats Available",
    benefit2Desc: "Download your biodata as a high-quality PDF or a crisp PNG image.",
    benefit3Title: "Customizable Templates",
    benefit3Desc: "Personalize your introduction with over 15+ premium designs.",
    keyInfoTitle: "Key Information for Your Biodata",
    keyInfoSubtitle: "Essential details to keep ready while creating your profile.",
    keyInfoSections: [
      { title: "Personal Info", items: ["Full Name", "Date of Birth", "Height & Weight", "Blood Group"] },
      { title: "Educational Info", items: ["Education", "Special Skills", "Languages Known"] },
      { title: "Professional Info", items: ["Job / Profession", "Company Name", "Monthly Income"] },
      { title: "Family Info", items: ["Father's Name & Occupation", "Mother's Name", "Siblings Details"] }
    ],
    aboutTitle: "About EternalBond",
    aboutDesc: "EternalBond was founded on the belief that every family has a beautiful story to tell. We merge timeless elegance with modern design.",
    aboutMissionCta: "Learn Our Mission",
    howToTitle: "How to Create the Perfect Biodata",
    howToSubtitle: "Follow these simple steps to craft a stunning first impression for your future partner.",
    howToSteps: [
      { title: "Select a Design", desc: "Choose from our hand-picked gallery of Classic, Modern, and Elegant templates.", icon: "🎨" },
      { title: "Personal Details", desc: "Fill in your background, education, and career info with our easy-to-use editor.", icon: "📝" },
      { title: "Spiritual Symbols", desc: "Add religious icons or spiritual headers to reflect your cultural values.", icon: "🕉️" },
      { title: "Save & Share", desc: "Preview your A4-sized result and download instantly as PDF or Image.", icon: "📥" }
    ],
    faqTitle: "Frequently Asked Questions",
    faqSubtitle: "Everything you need to know about creating your biodata with us.",
    faqs: [
      { q: "What is a Biodata Generator?", a: "A Biodata Generator is an online tool that helps you create a professional and well-formatted personal biodata for marriage or matrimonial purposes within minutes." },
      { q: "Is this Biodata Generator free to use?", a: "Yes, you can create and download a basic biodata for free. Premium templates and advanced customization also free." },
      { q: "Can I customize my biodata template?", a: "Absolutely. You can edit personal details, sections, fonts, colors, and layout to match your preferences and family requirements." },
      { q: "Can I upload my photo in the biodata?", a: "Yes, you can upload a profile photo and adjust its size and position within the biodata template." },
      { q: "Can I edit my biodata after downloading?", a: "Yes. You can revisit your account anytime to update details and re-download the latest version of your biodata." },
      { q: "Can I customize my biodata template?", a: "Absolutely. You can edit personal details, sections, fonts, colors, and layout to match your preferences and family requirements." }
    ]
  },
  form: {
    sections: { header: "Header", layout: "Layout", personal: "Personal", horoscope: "Horoscope", professional: "Professional", family: "Family", expectations: "Expectations", intro: "Introduction", contact: "Contact" },
    fields: { fullName: "Full Name", maritalStatus: "Marital Status", dob: "Birth Date", tob: "Birth Time", pob: "Birth Place", height: "Height", weight: "Weight", complexion: "Complexion", bloodGroup: "Blood Group", hobbies: "Hobbies", languages: "Languages", rashi: "Rashi", nakshatra: "Nakshatra", gothram: "Gothram", manglik: "Manglik?", education: "Education", profession: "Profession", income: "Income", location: "Location", fatherName: "Father's Name", fatherOccupation: "Father's Job", motherName: "Mother's Name", motherOccupation: "Mother's Job", siblings: "Siblings", nativePlace: "Native Place", maternalUncle: "Maternal Uncle", familyAssets: "Assets", expectationsAge: "Expected Age", expectationsEdu: "Expected Education", expectationsGeneral: "Expectations", phone: "Phone", email: "Email", spiritualText: "God's Name", uploadProfile: "Photo", uploadGod: "Symbol", aboutMe: "About Me" },
    buttons: { generateAi: "AI Write", generating: "Writing...", reset: "Reset", savePdf: "PDF", addField: "+ Field" }
  }
};

// const hi: TranslationSchema = {
//   ...en,
//   nav: { ...en.nav, home: "होम", about: "हमारे बारे में", blog: "ब्लॉग", contact: "संपर्क करें", editor: "एडिटर", templates: "टेम्पलेट्स", startFree: "शुरू करें" },
//   tagline: "आपके जीवनसाथी की तलाश एक सुंदर बायोडाटा से शुरू होती है।",
//   heroTitle: "खूबसूरत शुरुआत की रचना",
//   heroSubtitle: "मिनटों में शानदार, पेशेवर मैरिज बायोडाटा डिज़ाइन करें।",
//   cta: "मुफ्त बायोडाटा बनाएं",
//   fabCta: "बायोडाटा बनाएं",
//   testimonials: {
//     addReview: "अपनी कहानी साझा करें",
//     writeReview: "समीक्षा लिखें",
//     nameLabel: "आपका पूरा नाम",
//     reviewLabel: "आपका अनुभव",
//     ratingLabel: "रेटिंग",
//     submit: "समीक्षा पोस्ट करें",
//     success: "धन्यवाद! आपकी कहानी साझा कर दी गई है।",
//     placeholderName: "जैसे: राहुल शर्मा",
//     placeholderReview: "इटरनलबॉन्ड ने आपके परिवार की कैसे मदद की?"
//   },
//   templatesPage: {
//     title: "प्रीमियम डिज़ाइन गैलरी",
//     subtitle: "ऐसा डिज़ाइन चुनें जो आपके व्यक्तित्व और सांस्कृतिक विरासत को दर्शाता हो।",
//     select: "डिज़ाइन का उपयोग करें"
//   },
//   home: {
//     ...en.home,
//     communitiesTitle: "सभी समुदायों के लिए बायोडाटा",
//     keyInfoTitle: "आपके बायोडाटा के लिए महत्वपूर्ण जानकारी",
//     keyInfoSections: [
//       { title: "व्यक्तिगत जानकारी", items: ["नाम", "जन्म तिथि", "लंबाई और वजन", "रक्त समूह"] },
//       { title: "शैक्षिक योग्यता", items: ["शिक्षा", "विशेष कौशल", "भाषा ज्ञान"] },
//       { title: "व्यावसायिक जानकारी", items: ["नौकरी / व्यवसाय", "कंपनी का नाम", "मासिक आय"] },
//       { title: "पारिवारिक जानकारी", items: ["पिता का नाम और व्यवसाय", "माता का नाम", "भाई-बहन का विवरण"] }
//     ],
//     howToTitle: "एक बेहतरीन बायोडाटा कैसे बनाएं",
//     howToSubtitle: "अपने भविष्य के साथी पर शानदार प्रभाव डालने के लिए इन आसान चरणों का पालन करें।",
//     howToSteps: [
//       { title: "डिज़ाइन चुनें", desc: "हमारे क्लासिक, मॉडर्न और एलिगेंट टेम्पलेट्स की गैलरी से चुनें।", icon: "🎨" },
//       { title: "विवरण भरें", desc: "हमारे आसान एडिटर के साथ अपनी शिक्षा और करियर की जानकारी भरें।", icon: "📝" },
//       { title: "धार्मिक प्रतीक जोड़ें", desc: "अपने सांस्कृतिक मूल्यों को दर्शाने के लिए प्रतीक या हेडर जोड़ें।", icon: "🕉️" },
//       { title: "डाउनलोड करें", desc: "अपने A4 आकार के बायोडाटा को PDF या इमेज के रूप में डाउनलोड करें।", icon: "📥" }
//     ],
//     faqTitle: "अक्सर पूछे जाने वाले प्रश्न",
//     faqs: [
//       { q: "क्या यह मुफ़्त है?", a: "हाँ, यह 100% मुफ़्त है।" },
//       { q: "क्या मैं PDF डाउनलोड कर सकता हूँ?", a: "हाँ, आप उच्च गुणवत्ता वाली PDF डाउनलोड कर सकते हैं।" }
//     ]
//   },
//   form: {
//     ...en.form,
//     fields: {
//       fullName: "पूरा नाम",
//       maritalStatus: "वैवाहिक स्थिति",
//       dob: "जन्म तिथि",
//       tob: "जन्म समय",
//       pob: "जन्म स्थान",
//       height: "ऊंचाई",
//       weight: "वजन",
//       complexion: "रंग",
//       bloodGroup: "रक्त समूह",
//       hobbies: "शौक",
//       languages: "भाषाएं",
//       rashi: "राशि",
//       nakshatra: "नक्षत्र",
//       gothram: "गोत्र",
//       manglik: "मांगलिक?",
//       education: "शिक्षा",
//       profession: "व्यवसाय",
//       income: "वार्षिक आय",
//       location: "स्थान",
//       fatherName: "पिता का नाम",
//       fatherOccupation: "पिता का व्यवसाय",
//       motherName: "माता का नाम",
//       motherOccupation: "माता का व्यवसाय",
//       siblings: "भाई-बहन",
//       nativePlace: "पैतृक स्थान",
//       maternalUncle: "मामा का नाम",
//       familyAssets: "पारिवारिक संपत्ति",
//       expectationsAge: "अपेक्षित आयु",
//       expectationsEdu: "अपेक्षित शिक्षा",
//       expectationsGeneral: "सामान्य अपेक्षाएं",
//       phone: "फोन",
//       email: "ईमेल",
//       spiritualText: "भगवान का नाम",
//       uploadProfile: "फोटो अपलोड करें",
//       uploadGod: "प्रतीक",
//       aboutMe: "मेरे बारे में"
//     }
//   }
// };

// const mr: TranslationSchema = {
//   ...en,
//   nav: { ...en.nav, home: "होम", about: "आमच्याबद्दल", blog: "ब्लॉग", contact: "संपर्क", editor: "एडिटर", templates: "टेम्पलेट्स", startFree: "सुरुवात करा" },
//   tagline: "सुखी संसाराची सुरुवात एका सुंदर बायोडाटापासून.",
//   heroTitle: "सुंदर सुरुवातीची निर्मिती",
//   heroSubtitle: "काही मिनिटांत आकर्षक आणि व्यावसायिक मॅरेज बायोडाटा तयार करा।",
//   cta: "मोफत बायोडाटा बनवा",
//   fabCta: "बायोडाटा बनवा",
//   testimonials: {
//     addReview: "तुमचा अनुभव शेअर करा",
//     writeReview: "समीक्षा लिहा",
//     nameLabel: "तुमचे पूर्ण नाव",
//     reviewLabel: "तुमचा अनुभव",
//     ratingLabel: "रेटिंग",
//     submit: "समीक्षा पोस्ट करा",
//     success: "धन्यवाद! तुमचा अनुभव शेअर केला गेला आहे.",
//     placeholderName: "उदा. राहुल शर्मा",
//     placeholderReview: "इटरनलबॉन्डने तुमच्या कुटुंबाला कशी मदत केली?"
//   },
//   templatesPage: {
//     title: "प्रीमियम डिझाइन गॅलरी",
//     subtitle: "तुमचे व्यक्तिमत्व आणि सांस्कृतिक वारसा प्रतिबिंबित करणारे डिझाइन निवडा.",
//     select: "डिझाइन वापरा"
//   },
//   home: {
//     ...en.home,
//     communitiesTitle: "सर्व समाजांसाठी बायोडाटा",
//     keyInfoTitle: "तुमच्या बायोडाटासाठी महत्त्वाची माहिती",
//     keyInfoSections: [
//       { title: "वैयक्तिक माहिती", items: ["नाव", "जन्मतारीख", "उंची आणि वजन", "रक्तगट"] },
//       { title: "शैक्षणिक पात्रता", items: ["शिक्षण", "विशेष कौशल्ये", "भाषा ज्ञान"] },
//       { title: "व्यावसायिक माहिती", items: ["नोकरी / व्यवसाय", "कंपनीचे नाव", "मासिक उत्पन्न"] },
//       { title: "कौटुंबिक माहिती", items: ["वडिलांचे नाव व व्यवसाय", "आईचे नाव", "भाऊ व बहिणींची माहिती"] }
//     ],
//     howToTitle: "एक आदर्श बायोडाटा कसा बनवावा",
//     howToSubtitle: "तुमच्या भावी जोडीदारावर उत्तम प्रभाव पाडण्यासाठी या सोप्या पायऱ्या फॉलो करा.",
//     howToSteps: [
//       { title: "डिझाइन निवडा", desc: "आमच्या क्लासिक, मॉडर्न आणि एलिगेंट टेम्पलेट्समधून निवडा.", icon: "🎨" },
//       { title: "माहिती भरा", desc: "आमच्या सोप्या एडिटरचा वापर करून तुमचे शिक्षण आणि करिअरची माहिती भरा.", icon: "📝" },
//       { title: "धार्मिक चिन्हे जोडा", desc: "तुमच्या सांस्कृतिक मूल्यांचे प्रतिबिंब दर्शवण्यासाठी चिन्हे जोडा.", icon: "🕉️" },
//       { title: "डाऊनलोड करा", desc: "तुमचा A4 बायोडाटा PDF किंवा इमेज स्वरूपात त्वरित डाऊनलोड करा.", icon: "📥" }
//     ],
//     faqTitle: "सतत विचारले जाणारे प्रश्न",
//     faqs: [
//       { q: "हे खरोखर मोफत आहे का?", a: "हो, हे १००% मोफत आहे." },
//       { q: "PDF डाऊनलोड करता येईल का?", a: "हो, तुम्ही प्रिंटिंगसाठी उत्तम दर्जाची PDF डाऊनलोड करू शकता." }
//     ]
//   },
//   form: {
//     ...en.form,
//     fields: {
//       fullName: "पूर्ण नाव",
//       maritalStatus: "वैवाहिक स्थिती",
//       dob: "जन्मतारीख",
//       tob: "जन्मवेळ",
//       pob: "जन्मस्थान",
//       height: "उंची",
//       weight: "वजन",
//       complexion: "वर्ण (रंग)",
//       bloodGroup: "रक्तगट",
//       hobbies: "छंद",
//       languages: "भाषा",
//       rashi: "राशी",
//       nakshatra: "नक्षत्र",
//       gothram: "गोत्र",
//       manglik: "मंगळ?",
//       education: "शिक्षण",
//       profession: "व्यवसाय",
//       income: "वार्षिक उत्पन्न",
//       location: "पत्ता",
//       fatherName: "वडिलांचे नाव",
//       fatherOccupation: "वडिलांचा व्यवसाय",
//       motherName: "आईचे नाव",
//       motherOccupation: "आईचा व्यवसाय",
//       siblings: "भाऊ-बहीण",
//       nativePlace: "मूळ गाव",
//       maternalUncle: "मामाचे नाव",
//       familyAssets: "कौटुंबिक मालमत्ता",
//       expectationsAge: "अपेक्षित वय",
//       expectationsEdu: "अपेक्षित शिक्षण",
//       expectationsGeneral: "इतर अपेक्षा",
//       phone: "संपर्क क्रमांक",
//       email: "ईमेल",
//       spiritualText: "देवता नाव",
//       uploadProfile: "फोटो अपलोड करा",
//       uploadGod: "चिन्ह",
//       aboutMe: "माझ्याबद्दल"
//     }
//   }
// };

const bn: TranslationSchema = { ...en, tagline: "Journey starts with a story", heroTitle: "Crafting Beginnings", home: { ...en.home, communitiesTitle: "All Communities", faqs: [] } };
const te: TranslationSchema = { ...en, tagline: "Journey starts with a story", heroTitle: "Crafting Beginnings", home: { ...en.home, communitiesTitle: "All Communities", faqs: [] } };
const ta: TranslationSchema = { ...en, tagline: "Journey starts with a story", heroTitle: "Crafting Beginnings", home: { ...en.home, communitiesTitle: "All Communities", faqs: [] } };

export const TRANSLATIONS: Record<Language, TranslationSchema> = { en };
