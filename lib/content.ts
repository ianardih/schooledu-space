const API_URL = process.env.API_URL || "http://localhost:3110";

export type SiteContent = {
  navbar: {
    schoolName: string;
    logo: string;
    menu: { label: string; href: string }[];
  };
  hero: {
    tagline: string;
    title: string;
    description: string;
    ctaPrimary: string;
    ctaPrimaryHref: string;
    ctaSecondary: string;
    ctaSecondaryHref: string;
    image: string;
  };
  carousel: {
    id: number;
    type: string;
    title: string;
    description: string;
    badge: string;
    gradient: string;
    icon: string;
    href: string;
  }[];
  statistik: { value: string; label: string }[];
  programKeahlian: {
    sectionTitle: string;
    sectionDescription: string;
    programs: {
      id: number;
      title: string;
      slug: string;
      description: string;
      icon: string;
      color: string;
      videoYoutubeId: string;
      detail: {
        overview: string;
        kurikulum: string[];
        kompetensi: string[];
        prospek: string[];
      };
    }[];
  };
  fasilitas: {
    sectionTitle: string;
    sectionDescription: string;
    introVideo: { title: string; description: string; youtubeId: string };
    items: {
      id: number;
      title: string;
      description: string;
      icon: string;
      videoYoutubeId: string;
    }[];
  };
  berita: {
    sectionTitle: string;
    sectionDescription: string;
    items: {
      id: number;
      title: string;
      date: string;
      category: string;
      image: string;
      excerpt: string;
      detail: { author: string; body: string[] };
    }[];
  };
  testimoni: {
    sectionTitle: string;
    sectionDescription: string;
    items: {
      id: number;
      name: string;
      role: string;
      avatar: string;
      quote: string;
    }[];
  };
  ppdb: {
    title: string;
    subtitle: string;
    academicYear: string;
    countdownTarget: string;
    countdownLabel: string;
    batches: {
      name: string;
      registrationStart: string;
      registrationEnd: string;
      selectionDate: string;
      announcementDate: string;
      status: string;
      quota: number;
      registered: number;
    }[];
    registrationFlow: {
      step: number;
      title: string;
      description: string;
      duration: string;
    }[];
    requirements: string[];
    programs: { code: string; name: string; quota: number }[];
    contact: {
      phone: string;
      whatsapp: string;
      email: string;
      hours: string;
    };
  };
  footer: {
    schoolName: string;
    address: string;
    phone: string;
    email: string;
    socialMedia: { instagram: string; facebook: string; youtube: string };
    quickLinks: { label: string; href: string }[];
    copyright: string;
  };
  visiMisi: {
    sectionTitle: string;
    sectionDescription: string;
    visi: string;
    misi: string[];
  };
  pengajar: {
    sectionTitle: string;
    sectionDescription: string;
    items: {
      id: number;
      name: string;
      photo: string;
      position: string;
      program: string;
      shortBio: string;
      detail: {
        tempatLahir: string;
        tanggalLahir: string;
        pendidikan: string[];
        pengalaman: string[];
        keahlian: string[];
        email: string;
        telepon: string;
      };
    }[];
  };
  keunggulan: {
    sectionTitle: string;
    sectionDescription: string;
    items: {
      id: number;
      icon: string;
      title: string;
      description: string;
    }[];
  };
  videoProfil: {
    sectionTitle: string;
    sectionDescription: string;
    youtubeId: string;
    thumbnail: string;
  };
  galeri: {
    sectionTitle: string;
    sectionDescription: string;
    items: {
      id: number;
      title: string;
      category: string;
      image: string;
      description: string;
    }[];
  };
  mitra: {
    sectionTitle: string;
    sectionDescription: string;
    items: {
      id: number;
      name: string;
      logo: string;
      type: string;
    }[];
  };
  faq: {
    sectionTitle: string;
    sectionDescription: string;
    items: {
      id: number;
      question: string;
      answer: string;
    }[];
  };
  lokasi: {
    sectionTitle: string;
    sectionDescription: string;
    address: string;
    phone: string;
    email: string;
    hours: string;
    mapEmbedUrl: string;
  };
  whatsappNumber: string;
};

export async function getContent(): Promise<SiteContent> {
  try {
    const res = await fetch(`${API_URL}/api/content`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    return res.json();
  } catch {
    const fallback = await import("@/app/data/site-content.json");
    return fallback.default as SiteContent;
  }
}

export async function updateContent(
  data: SiteContent,
  cookie?: string
): Promise<void> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (cookie) headers["Cookie"] = cookie;
  const res = await fetch(`${API_URL}/api/content/all`, {
    method: "PUT",
    headers,
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
}

export async function updateSection(
  section: keyof SiteContent,
  data: SiteContent[keyof SiteContent],
  cookie?: string
): Promise<SiteContent> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (cookie) headers["Cookie"] = cookie;
  const res = await fetch(`${API_URL}/api/content/${section}`, {
    method: "PUT",
    headers,
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return getContent();
}
