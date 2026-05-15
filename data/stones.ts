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
    name: "Mermer",
    origin: "Afyon, Türkiye",
    surface: "Cilalı / Honlu",
    use: "Otel lobileri, banyolar, duvar kaplamaları",
    description:
      "Sakin damar yapısı ve yüksek yansımalı yüzeyleriyle, güçlü ama yorucu olmayan iç mekanlar için seçilir.",
    image: "/stones/marble-real.jpg",
    source: "Pexels, fotoğraf 4709431",
    sourceUrl: "https://www.pexels.com/photo/4709431/",
    specs: ["20 mm plaka", "Bookmatch uygulamaya uygun", "Premium iç mekan kullanımı"]
  },
  {
    id: "travertine",
    name: "Traverten",
    origin: "Denizli, Türkiye",
    surface: "Dolgulu / Fırçalı",
    use: "Cepheler, zeminler, havuz çevreleri",
    description:
      "Lineer gözenek dokusu ve sıcak ton geçişleriyle mimari yüzeylere sakin bir Akdeniz karakteri katar.",
    image: "/stones/travertine-real.jpg",
    source: "Pexels, fotoğraf 4709025",
    sourceUrl: "https://www.pexels.com/photo/4709025/",
    specs: ["Dolgulu veya dolgusuz", "Fırçalı yüzey", "Cephe ve ıslak hacim kullanımı"]
  },
  {
    id: "limestone",
    name: "Kireç Taşı",
    origin: "Burdur, Türkiye",
    surface: "Honlu / Kumlamalı",
    use: "Dış cephe kaplama, peyzaj, zemin",
    description:
      "Dayanıklılık, ölçülü bir görünüm ve bütüncül taş etkisi isteyen projeler için mat ve rafine bir doku sunar.",
    image: "/stones/limestone-real.jpg",
    source: "Pexels, fotoğraf 16777685",
    sourceUrl: "https://www.pexels.com/photo/16777685/",
    specs: ["Honlu yüzey", "Büyük ebat panel", "Dış mekan şartnamesine uygun"]
  },
  {
    id: "onyx",
    name: "Oniks",
    origin: "Anadolu, Türkiye",
    surface: "Cilalı / Bookmatch",
    use: "Vurgu duvarları, barlar, resepsiyon bankoları",
    description:
      "Yarı geçirgen derinliği ve dramatik mineral çizgileriyle otel, villa ve özel alanlarda güçlü bir odak yaratır.",
    image: "/stones/onyx-real.jpg",
    source: "Pexels, fotoğraf 6634140",
    sourceUrl: "https://www.pexels.com/photo/6634140/",
    specs: ["Vurgu plakası", "Arkadan aydınlatmaya uygun", "Resepsiyon ve bar kullanımı"]
  }
];

export const finishes = ["Honlu", "Cilalı", "Fırçalı", "Dolgulu"] as const;

export const applications = ["Lobi", "Banyo", "Cephe", "Villa"] as const;

export const projects: Project[] = [
  {
    title: "Otel Odası",
    location: "Doha",
    image: "/projects/hotel-room-real.jpg",
    imagePosition: "center 58%",
    stone: "Calacatta Mermer Zemin",
    source: "Pexels, photo 6987719",
    sourceUrl: "https://www.pexels.com/photo/6987719/"
  },
  {
    title: "Lüks Villa",
    location: "Bodrum",
    image: "/projects/luxury-villa-real.jpg",
    imagePosition: "center 56%",
    stone: "Damarlı Mermer Zemin",
    source: "Pexels, photo 33685850",
    sourceUrl: "https://www.pexels.com/photo/33685850/"
  },
  {
    title: "Banyo",
    location: "Londra",
    image: "/projects/bathroom-real.jpg",
    imagePosition: "center 54%",
    stone: "Ivory Mermer Duvar",
    source: "Pexels, photo 7601171",
    sourceUrl: "https://www.pexels.com/photo/7601171/"
  },
  {
    title: "Cephe",
    location: "Dubai",
    image: "/projects/facade-real.jpg",
    imagePosition: "center 60%",
    stone: "Damarlı Mermer Paneller",
    source: "Unsplash, photo iqlAuSH8INw",
    sourceUrl:
      "https://unsplash.com/photos/modern-building-with-marble-facade-and-glass-windows-iqlAuSH8INw"
  }
];

export const processSteps: ProcessStep[] = [
  {
    label: "01",
    title: "Ocak Seçimi",
    body:
      "Bloklar damar sürekliliği, yapısal sağlamlık ve projeye özel renk aralığına göre seçilir."
  },
  {
    label: "02",
    title: "Hassas Kesim",
    body:
      "Katramalı kesim ve köprü kesim süreçleri plaka kalınlığını, bookmatch yönünü ve toleransları kontrol altında tutar."
  },
  {
    label: "03",
    title: "Yüzey İşleme",
    body:
      "Honlu, cilalı, fırçalı ve dolgulu yüzeyler onay öncesinde kontrollü ışık altında incelenir."
  },
  {
    label: "04",
    title: "İhracat Paketleme",
    body:
      "Kasalar uluslararası sevkiyat için güçlendirilir; plaka sıraları ve proje dokümantasyonu etiketlenir."
  }
];
