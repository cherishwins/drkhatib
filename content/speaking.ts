// Civilian-venue speaking record from the master bilingual inventory.
// Every entry has a verified venue and date. Where the inventory provided a
// proof URL (institutional news page, conference page, social post), it is
// kept verbatim so visitors can verify each talk independently.
//
// Source: compass_artifact master inventory v1, §11
//   "Selected Civilian Public Talks & Media".

export interface Talk {
  date: string;
  title_en: string;
  title_ar: string;
  venue: string;
  country: string;
  link?: string;
  highlight?: string; // optional badge text — "Keynote", "First Lebanese speaker", etc.
}

export const talks: Talk[] = [
  {
    date: '2024',
    title_en: 'Keynote — Civil Engineering and Intelligent Construction',
    title_ar: 'كلمة رئيسية — الهندسة المدنية والبناء الذكي',
    venue:
      '2nd International Conference on Civil Engineering and Intelligent Construction (ICCEIC 2024)',
    country: 'China',
    link: 'https://ce.iamset.org/speakers/2024/en',
    highlight: 'Keynote speaker',
  },
  {
    date: '2024',
    title_en: '24 Hours of Concrete Knowledge — first Lebanese speaker',
    title_ar: '24 ساعة من المعرفة الخرسانية — أول متحدث لبناني',
    venue: 'American Concrete Institute — global online programme',
    country: 'International',
    link: 'https://www.concrete.org/Portals/0/Files/PDF/24HCK-Program.pdf',
    highlight: 'First Lebanese speaker',
  },
  {
    date: 'Jul 2024',
    title_en: 'Punching Shear Enhancement in Post-Tensioned Slabs',
    title_ar: 'تعزيز مقاومة الثقب في البلاطات سابقة الإجهاد',
    venue: 'Order of Engineers and Architects — Beirut',
    country: 'Lebanon',
    link: 'https://www.facebook.com/oeabeirut/photos/-upcoming-seminar-punching-shear-enhancement-in-post-tensioned-slabs-date-july-3/1026574776310925/',
  },
  {
    date: '2024',
    title_en:
      'New Technologies in Structural Engineering — Sustainable World, LCA, EPD, Circular Economy',
    title_ar:
      'تقنيات جديدة في الهندسة الإنشائية — عالم مستدام، تقييم دورة الحياة، EPD، الاقتصاد الدائري',
    venue: 'OEA Tripoli',
    country: 'Lebanon',
    link: 'https://oea-tripoli.org.lb/en/news/article/workshop-building-a-sustainable-world-lca-epd-and-circular-economy-essentials',
  },
  {
    date: '2024',
    title_en: 'Application of AI in Disaster Mitigation of Structures',
    title_ar: 'تطبيقات الذكاء الاصطناعي في تخفيف آثار الكوارث على المنشآت',
    venue: 'Beirut Arab University — Tripoli campus',
    country: 'Lebanon',
    link: 'https://oea-tripoli.org.lb/fr/news/article/go-to-smart',
  },
  {
    date: 'Mar 2024',
    title_en: 'Methods to Reduce Earthquake Damage for Structural and Non-Structural Elements',
    title_ar: 'طرق الحدّ من أضرار الزلازل على العناصر الإنشائية وغير الإنشائية',
    venue: 'American University of Beirut — MSFEA',
    country: 'Lebanon',
    link: 'https://www.aub.edu.lb/msfea/events/Pages/Details.aspx?ItemId=446',
  },
  {
    date: 'Feb 2024',
    title_en: 'Methods to Reduce Earthquake Damage (repeat)',
    title_ar: 'طرق الحدّ من أضرار الزلازل (إعادة)',
    venue: 'University of Balamand — Souk El-Ghareb',
    country: 'Lebanon',
    link: 'https://www.balamand.edu.lb/news/AllNews/Pages/Details.aspx?FilterField1=ID&FilterValue1=465',
  },
  {
    date: 'Jan 2024',
    title_en: 'Methods to Reduce Earthquake Damage (repeat)',
    title_ar: 'طرق الحدّ من أضرار الزلازل (إعادة)',
    venue: 'OEA Tripoli',
    country: 'Lebanon',
    link: 'https://sla-news.com/191593',
  },
  {
    date: 'Jan 2024',
    title_en: 'Methods to Reduce Earthquake Damage (online)',
    title_ar: 'طرق الحدّ من أضرار الزلازل (عبر الإنترنت)',
    venue: 'Seismic Karyashala Platform',
    country: 'India',
  },
  {
    date: 'Nov 2023',
    title_en: 'Engineering Construction Problems — Turkey Earthquake',
    title_ar: 'مشكلات الإنشاء الهندسي — زلزال تركيا',
    venue: 'Lebanese Canadian University',
    country: 'Lebanon',
    link: 'https://m.facebook.com/photo.php?fbid=720548460108657',
  },
  {
    date: 'Nov 2023',
    title_en: 'Engineering Construction Problems — Turkey Earthquake (repeat)',
    title_ar: 'مشكلات الإنشاء الهندسي — زلزال تركيا (إعادة)',
    venue: 'Holy Spirit University of Kaslik (USEK)',
    country: 'Lebanon',
  },
  {
    date: 'Oct 2023',
    title_en: 'Engineering Construction Problems Emerging from the Turkey Earthquake',
    title_ar: 'مشكلات الإنشاء الهندسي الناجمة عن زلزال تركيا',
    venue: 'Rafik Hariri University',
    country: 'Lebanon',
    link: 'https://rhu.edu.lb/media-room/news/rhu-students-learn-how-to-overcome-engineering-construction-problems-caused-by-earthquakes',
  },
  {
    date: '2024',
    title_en: 'Engineering Challenges Arising from Earthquakes',
    title_ar: 'التحديات الهندسية الناجمة عن الزلازل',
    venue: 'City University, Tripoli',
    country: 'Lebanon',
    link: 'https://www.instagram.com/p/C69T8xVoIFn/',
  },
  {
    date: 'May 2023',
    title_en: 'Engineering Construction Problems from the Turkey Earthquake (6 Feb 2023, Mw 7.8)',
    title_ar: 'مشكلات الإنشاء الهندسي من زلزال تركيا (6 شباط 2023، Mw 7.8)',
    venue: 'Engineering forum',
    country: 'Lebanon',
  },
  {
    date: 'May 2023',
    title_en: 'Characteristics of Water Sources in the Jabal Amel Municipal Community',
    title_ar: 'خصائص مصادر المياه في اتحاد بلديات جبل عامل',
    venue: 'International Webinar on Public Healthcare',
    country: 'Dubai',
    link: 'https://www.youtube.com/watch?v=Cgdskb2MnNw',
  },
  {
    date: 'May 2022',
    title_en: 'FIDIC Overview',
    title_ar: 'نظرة عامة على FIDIC',
    venue: 'Engineering forum',
    country: 'Lebanon',
  },
  {
    date: 'May 2021',
    title_en: 'Towards a New Economic Vision for Lebanon',
    title_ar: 'نحو رؤية اقتصادية جديدة للبنان',
    venue: 'Lebanese University',
    country: 'Lebanon',
  },
  {
    date: 'May 2021',
    title_en: 'Methodology for Preparing Economic Reports',
    title_ar: 'منهجية إعداد التقارير الاقتصادية',
    venue: 'Lebanese University',
    country: 'Lebanon',
  },
  {
    date: 'Jul 2020',
    title_en: 'How to Prepare Economic Reports in Light of the Current Economic Crisis',
    title_ar: 'كيفية إعداد التقارير الاقتصادية في ضوء الأزمة الاقتصادية الراهنة',
    venue: 'Lebanese University — Faculty of Economics & Business Administration',
    country: 'Lebanon',
    link: 'https://ul.edu.lb/common/new.aspx?newsId=2624&lang=1',
  },
  {
    date: 'May 2017',
    title_en:
      'Punching Shear Analysis of Bonded Post-Tensioned Slabs with Inverted-U Shaped Reinforcements',
    title_ar: 'تحليل قصّ الثقب في البلاطات سابقة الإجهاد المرتبطة بالتسليح على شكل U المقلوب',
    venue: 'Engineering Project Day, Beirut Arab University',
    country: 'Lebanon',
  },
  {
    date: '2024',
    title_en: 'Sustainability in Concrete (online, in Arabic)',
    title_ar: 'الاستدامة في الخرسانة (عبر الإنترنت، باللغة العربية)',
    venue: 'Technical Trainers Preparation Institute',
    country: 'Iraq · El-Saouira',
  },
  {
    date: '2024',
    title_en: 'Profile feature',
    title_ar: 'ملف صحفي ضمن المجلة',
    venue: 'Nabta Magazine',
    country: 'Lebanon',
    link: 'https://www.facebook.com/share/p/15i9a6WpVr/',
  },
];
