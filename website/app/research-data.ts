export const sources = [
  {
    id: "ssa-cruz",
    label: "Social Security Applications and Claims: Cruz Vasquez / Reyes",
    detail: "Names Mauricio Reyes and Carmen Diaz; gives Humacao birthplace and 4 May 1914 birth date.",
    href: "https://www.ancestry.com/search/collections/60901/records/23200085",
    grade: "Strong derivative",
  },
  {
    id: "marriage",
    label: "1941 Manhattan marriage license",
    detail: "Rafael Vazquez and Cruz Reyes, married 25 October 1941; certificate 18978; all four parents named.",
    href: "https://www.ancestry.com/search/collections/61788/records/322345",
    grade: "Official-record index",
  },
  {
    id: "rafael-birth",
    label: "Puerto Rico civil registration: Rafael Vazquez y Peralez",
    detail: "Humacao registration 134; indexed February 1906; mother Carlina Peralez.",
    href: "https://www.ancestry.com/search/collections/9100/records/649515",
    grade: "Original image + index",
  },
  {
    id: "census-1910",
    label: "1910 Puerto Rico census",
    detail: "Anton Ruiz, Humacao; Rafael with Juan Vazquez y Rodriguez and Carlina Perales y Perez.",
    href: "https://www.ancestry.com/search/collections/7884/records/174417271",
    grade: "Original enumeration",
  },
  {
    id: "census-1920",
    label: "1920 Puerto Rico census",
    detail: "Camino Anton Ruiz, Humacao; Rafael remains in his parents’ household.",
    href: "https://www.ancestry.com/search/collections/6061/records/59358969",
    grade: "Original enumeration",
  },
  {
    id: "census-1930",
    label: "1930 Puerto Rico census",
    detail: "Mambiche, Humacao; Rafael is recorded as a single adult in Juan’s household.",
    href: "https://www.ancestry.com/search/collections/6224/records/113399940",
    grade: "Original enumeration",
  },
  {
    id: "census-1950",
    label: "1950 United States census",
    detail: "Rafael and Cruz together on East 109th Street, Manhattan.",
    href: "https://www.ancestry.com/search/collections/62308/records/294017627",
    grade: "Original enumeration",
  },
  {
    id: "cemetery",
    label: "Rosedale & Rosehill official cemetery lookup",
    detail: "Both burials in Rosedale plot WIN4T-22-11, Linden, New Jersey.",
    href: "https://www.rosedale-rosehill.com/name-lookup",
    grade: "Official cemetery database",
  },
  {
    id: "findagrave-cruz",
    label: "Cruz Vasquez memorial 122157535",
    detail: "Independently reports Rosedale & Rosehill and plot WIN4T-22-11.",
    href: "https://www.findagrave.com/memorial/122157535/cruz-vasquez",
    grade: "User-contributed memorial",
  },
  {
    id: "nj-death-index",
    label: "New Jersey Death Index",
    detail: "Reviewed as a negative search for the 1984 and 1998 deaths.",
    href: "https://www.newjerseydeathindex.com/",
    grade: "Official index images",
  },
];

export const openCases = [
  {
    id: "VR-01",
    title: "Cruz’s exact birth date",
    conflict: "4 May 1914 vs. 3 May 1915 vs. May 1917",
    next: "Obtain the original Humacao civil birth registration and a church baptism.",
  },
  {
    id: "VR-02",
    title: "Rafael’s exact birth day",
    conflict: "February 1906 vs. the remembered 24 October",
    next: "Obtain a legible certified copy or expert transcription of Humacao registration 134.",
  },
  {
    id: "VR-03",
    title: "The exact death records",
    conflict: "Rafael’s family date is 30 December 1984; a weak derivative gives 1 December.",
    next: "Obtain both NYC death certificates and the cemetery interment cards.",
  },
  {
    id: "VR-04",
    title: "Mauricio Reyes and Carmen Díaz",
    conflict: "The Martínez and Belén family clues are not yet placed.",
    next: "Use Cruz’s original birth record to locate her parents’ marriage and births.",
  },
  {
    id: "VR-05",
    title: "Juan or Juan Ramón",
    conflict: "Censuses say Juan Vázquez y Rodríguez; family memory says Juan Ramón Vázquez.",
    next: "Locate Juan and Carlina’s marriage and Rafael’s complete civil registration.",
  },
];

export const negativeSearches = [
  "No confident Cruz or Rafael match appeared in the reviewed New Jersey death-index image sets for 1984 and 1998.",
  "The New York State death index returned no match, but that index does not reliably cover New York City and cannot settle the question.",
  "A first public Puerto Rico archive search did not surface Cruz’s birth under the tried variants; Spanish two-surname forms and V/S variation remain to be tested.",
  "No Rafael memorial matching the shared plot was found on Find a Grave; the official cemetery database remains the stronger burial source.",
];

export const nameVariants = [
  {
    person: "Cruz Reyes Vasquez",
    forms: "Cruz Reyes · Cruz Vasquez · Cruz Vázquez",
    conclusion: "Reyes is the documented maiden surname; Vasquez is the married form.",
  },
  {
    person: "Rafael Vázquez y Perales",
    forms: "Rafael Vazquez · Raphael Vasquez · Rafael Vazquez y Peralez",
    conclusion: "Vázquez y Perales is the fullest Puerto Rico-style form currently supported.",
  },
  {
    person: "Carmen Díaz",
    forms: "Carmen Diaz · Carmen Reyes · “Belén” family clue",
    conclusion: "Díaz is supported as Cruz’s mother’s birth or maiden surname; Belén remains unresolved.",
  },
  {
    person: "Carlina Perales y Pérez",
    forms: "Carlina Peralez · Carlina Perales de Vazquez · Cathelina/Catalina Pérez or López",
    conclusion: "Multiple records favor Carlina, Perales, and Pérez; none reviewed supports López.",
  },
];

export const updates = [
  {
    date: "23 Jul 2026",
    text: "Recorded the family account and preserved every uncertain name and date as a search clue.",
  },
  {
    date: "23 Jul 2026",
    text: "Identified the couple through their Manhattan marriage, 1950 household, and matching parent names.",
  },
  {
    date: "23 Jul 2026",
    text: "Reconstructed Rafael’s Humacao childhood household in the 1910, 1920, and 1930 censuses.",
  },
  {
    date: "23 Jul 2026",
    text: "Confirmed both burials in the same Rosedale plot at Rosedale & Rosehill Cemetery.",
  },
  {
    date: "23 Jul 2026",
    text: "Separated the family-facing story from this sanitized ongoing-research notebook.",
  },
];
