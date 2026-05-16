export type Stone = {
  id: "marble" | "travertine" | "limestone" | "onyx";
  name: string;
  origin: string;
  surface: string;
  use: string;
  description: string;
  image: string;
  source: string;
  sourceUrl: string;
  specs: string[];
};

export type Project = {
  title: string;
  location: string;
  image: string;
  imagePosition?: string;
  stone: string;
  source: string;
  sourceUrl: string;
};

export type ProcessStep = {
  label: string;
  title: string;
  body: string;
};

export const stones: Stone[] = [
  {
    id: "marble",
    name: "Teşhir & Servis Üniteleri",
    origin: "Muğla, Türkiye",
    surface: "AISI 304 / Cam koruma",
    use: "Otel büfeleri, restoran servis hatları, catering",
    description:
      "Bain-marie, teşhir vitrinleri ve servis bankoları; hijyenik paslanmaz yüzey ve proje ölçüsüne göre üretilir.",
    image: "/stones/1.png",
    source: "İnoks Muğla",
    sourceUrl: "mailto:info@inoksmugla.com",
    specs: ["Cam sneeze guard", "GN 1/1 hazne uyumu", "Projeye özel ebat"]
  },
  {
    id: "travertine",
    name: "Evye & Yıkama Tezgahları",
    origin: "Muğla, Türkiye",
    surface: "AISI 304 / Krom armatür",
    use: "Endüstriyel mutfaklar, bulaşık alanları, hazırlık üniteleri",
    description:
      "Tek veya çift hazneli evye tezgahları, süzgeçli yüzey ve alt raf seçenekleriyle yoğun kullanıma uygun üretilir.",
    image: "/stones/2.png",
    source: "İnoks Muğla",
    sourceUrl: "mailto:info@inoksmugla.com",
    specs: ["Derin paslanmaz hazne", "Ayarlanabilir ayak", "Alt açık veya kapalı raf"]
  },
  {
    id: "limestone",
    name: "Hazırlık & Soğutmalı Dolaplar",
    origin: "Muğla, Türkiye",
    surface: "AISI 304 / Soğutma ünitesi",
    use: "Hazırlık mutfakları, otel ana mutfak, catering üretim",
    description:
      "Soğutmalı çalışma tezgahları ve hazırlık dolapları; sıcaklık kontrollü, modüler ve proje planına göre konfigüre edilir.",
    image: "/stones/3.png",
    source: "İnoks Muğla",
    sourceUrl: "mailto:info@inoksmugla.com",
    specs: ["Kapılı veya çekmeceli alt modül", "Dijital sıcaklık kontrol", "Enerji verimli kompresör"]
  },
  {
    id: "onyx",
    name: "Çalışma & Depolama Tezgahları",
    origin: "Muğla, Türkiye",
    surface: "AISI 304 / Mat veya fırçalı",
    use: "Ana üretim hatları, pastane, endüstriyel mutfak depo",
    description:
      "Geniş çalışma yüzeyli tezgahlar ve depolama üniteleri; kaynaklı sağlam gövde ve hijyen standartlarına uygun bitiş.",
    image: "/stones/4.png",
    source: "İnoks Muğla",
    sourceUrl: "mailto:info@inoksmugla.com",
    specs: ["Üst tezgah + alt kapak", "Hijyenik birleşim noktaları", "Projeye özel uzunluk"]
  }
];

export const finishes = ["AISI 304", "AISI 430", "Mat", "Elektropolish"] as const;

export const applications = ["Otel", "Restoran", "Catering", "Hastane"] as const;

export const projects: Project[] = [
  {
    title: "Otel",
    location: "Muğla",
    image: "/chef-team.jpg",
    imagePosition: "center 58%",
    stone: "Paslanmaz hazırlık hattı ve servis üniteleri",
    source: "İnoks Muğla",
    sourceUrl: "mailto:info@inoksmugla.com"
  },
  {
    title: "Restoran",
    location: "Bodrum",
    image: "/chef-prep.jpg",
    imagePosition: "center 56%",
    stone: "Evye tezgahı ve soğutmalı çalışma ünitesi",
    source: "İnoks Muğla",
    sourceUrl: "mailto:info@inoksmugla.com"
  },
  {
    title: "Catering",
    location: "İzmir",
    image: "/pots-stove.jpg",
    imagePosition: "center 54%",
    stone: "Modüler tezgah ve depolama sistemi",
    source: "İnoks Muğla",
    sourceUrl: "mailto:info@inoksmugla.com"
  },
  {
    title: "Hastane",
    location: "Antalya",
    image: "/kitchen-tools-dark.jpg",
    imagePosition: "center 60%",
    stone: "Hijyenik paslanmaz üretim hattı",
    source: "İnoks Muğla",
    sourceUrl: "mailto:info@inoksmugla.com"
  }
];

export const processSteps: ProcessStep[] = [
  {
    label: "01",
    title: "Proje & Ölçü",
    body:
      "Mekân planı, ekipman listesi ve kullanım senaryosuna göre ölçü, modül ve malzeme seçimi netleştirilir."
  },
  {
    label: "02",
    title: "Kesim & Büküm",
    body:
      "Paslanmaz saclar CNC lazer ve abkant ile kesilir; proje toleranslarına göre gövde parçaları hazırlanır."
  },
  {
    label: "03",
    title: "Kaynak & Montaj",
    body:
      "TIG/MIG kaynak, zımpara ve montaj adımları tamamlanır; kapak, raf ve aksesuarlar bir araya getirilir."
  },
  {
    label: "04",
    title: "Test & Teslimat",
    body:
      "Soğutma ve mekanik kontroller yapılır; sahada kurulum ve devreye alma için sevk planlanır."
  }
];
