export const faqs = [
  {
    question: 'Gəncədə keyfiyyətli təmizlik məhsullarını haradan ala bilərəm?',
    answer: 'SON Təmizlik Məhsulları Gəncə şəhərində, Zülfü Hacıyev 56 ünvanında yerləşir. Burada qabyuyan maye, ağardıcı, maye sabun, xlor və bütün növ təmizlik vasitələrini keyfiyyətli və sərfəli qiymətlərlə tapa bilərsiniz.',
  },
  {
    question: 'Qabyuyan mayenin qiyməti nə qədərdir, topdan satış varmı?',
    answer: 'Qabyuyan maye məhsullarımız müxtəlif həcmlərdə və əlverişli qiymətlərlə təklif olunur. Topdan satış üçün xüsusi endirimlər tətbiq edirik. Dəqiq qiymətlər üçün bizimlə əlaqə saxlayın.',
  },
  {
    question: 'Ağardıcı məhsulları hansı növlərdə mövcuddur?',
    answer: 'Çeşidimizdə duru ağardıcı və toz ağardıcı var. Hər iki növ yüksək effektivlikli təmizlik təmin edir və ev, eləcə də peşəkar istifadə üçün müxtəlif həcmlərdə təklif olunur.',
  },
  {
    question: 'Maye sabun və digər təmizlik vasitələri təhlükəsizdirmi?',
    answer: 'Bütün məhsullarımız keyfiyyət standartlarına uyğun istehsal olunur. Maye sabunlarımız dəriyə qarşı yumşaq tərkiblidir və bütün ailə üçün təhlükəsizdir.',
  },
  {
    question: 'Çatdırılma xidməti varmı, hansı ərazilərə çatdırırsınız?',
    answer: 'Bəli. Gəncə şəhəri, Goranboy, Samux və digər yaxın rayonlara çatdırılma həyata keçiririk. Ətraflı məlumat üçün bizimlə əlaqə saxlayın.',
  },
  {
    question: 'Peşəkar təmizlik üçün hansı məhsulları tövsiyə edirsiniz?',
    answer: 'Hotellər, restoranlar və digər obyektlər üçün güclü qabyuyan maye, xlor məhsulları və peşəkar ağardıcıları tövsiyə edirik. Bu məhsullar yüksək effektivlik və uzunmüddətli nəticə təmin edir.',
  },
  {
    question: 'Xlor məhsulları dezinfeksiya üçün necə istifadə olunur?',
    answer: 'Xlor məhsullarımız güclü dezinfeksiya təsiri göstərir. Su ilə seyreltdikdən sonra səthlərin təmizlənməsində istifadə olunur. İstifadə qaydaları məhsulun etiketində göstərilib.',
  },
  {
    question: 'Ev təmizliyi üçün ən yaxşı məhsul dəsti hansıdır?',
    answer: 'Ev üçün qabyuyan maye, maye sabun, duru ağardıcı və universal təmizlik məhsullarından ibarət dəsti tövsiyə edirik. Bu dəst gündəlik ehtiyacların hamısını qarşılayır.',
  },
]

export const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: { '@type': 'Answer', text: faq.answer },
  })),
}
