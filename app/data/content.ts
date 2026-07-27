export const siteContent = {
  navbar: {
    schoolName: "SMK Nusantara Tech",
    logo: "/logo.png",
    menu: [
      { label: "Beranda", href: "/" },
      { label: "Program Keahlian", href: "/program" },
      { label: "Fasilitas", href: "/fasilitas" },
      { label: "Berita", href: "/berita" },
      { label: "PPDB", href: "/ppdb" },
      { label: "Pengumuman", href: "/pengumuman" },
      { label: "Kontak", href: "/kontak" },
    ],
  },
  hero: {
    tagline: "Sekolah Menengah Kejuruan Unggulan",
    title: "Wujudkan Masa Depan Bersama SMK Nusantara Tech",
    description:
      "Membentuk generasi profesional yang siap kerja, berkarakter, dan berinovasi di era industri 4.0. Bergabunglah dengan kami untuk masa depan yang lebih cerah.",
    ctaPrimary: "Daftar Sekarang",
    ctaPrimaryHref: "/ppdb",
    ctaSecondary: "Pelajari Program Kami",
    ctaSecondaryHref: "/program",
    image: "/hero-school.jpg",
  },
  carousel: [
    {
      id: 1,
      type: "event" as const,
      title: "Open House 2026",
      description:
        "Kunjungi sekolah kami dan kenali program keahlian yang tersedia. Sabtu, 2 Agustus 2026 mulai pukul 08.00 WIB.",
      badge: "Event",
      gradient: "from-blue-600 to-blue-800",
      icon: "Calendar",
      href: "/events/open-house-2026",
    },
    {
      id: 2,
      type: "pengumuman" as const,
      title: "PPDB Gelombang 2 Dibuka!",
      description:
        "Pendaftaran siswa baru gelombang 2 telah dibuka. Kuota terbatas, segera daftarkan diri Anda sebelum kehabisan!",
      badge: "Pengumuman",
      gradient: "from-emerald-600 to-emerald-800",
      icon: "Megaphone",
      href: "/ppdb",
    },
    {
      id: 3,
      type: "prestasi" as const,
      title: "Juara 1 Lomba Hackathon Nasional",
      description:
        "Tim RPL berhasil meraih juara 1 dalam Kompetisi Hackathon Tingkat Nasional di Jakarta, mengalahkan 200+ peserta.",
      badge: "Prestasi",
      gradient: "from-amber-500 to-orange-700",
      icon: "Trophy",
      href: "/berita/1",
    },
    {
      id: 4,
      type: "event" as const,
      title: "Career Day 2026",
      description:
        "Temui 30+ perusahaan mitra kami yang siap merekrut lulusan terbaik. Jumat, 15 Agustus 2026 di Aula Utama.",
      badge: "Event",
      gradient: "from-purple-600 to-purple-800",
      icon: "Briefcase",
      href: "/events/career-day-2026",
    },
    {
      id: 5,
      type: "pengumuman" as const,
      title: "Kerja Sama dengan PT Teknologi Nusantara",
      description:
        "MoU telah ditandatangani untuk program magang 6 bulan dan jaminan penyerapan lulusan terbaik.",
      badge: "Kerja Sama",
      gradient: "from-rose-600 to-rose-800",
      icon: "Handshake",
      href: "/berita/2",
    },
  ],
  statistik: [
    { value: "2500+", label: "Siswa Aktif" },
    { value: "95%", label: "Terserap Dunia Kerja" },
    { value: "50+", label: "Industri Mitra" },
    { value: "15", label: "Program Keahlian" },
  ],
  programKeahlian: {
    sectionTitle: "Program Keahlian",
    sectionDescription:
      "Pilih program keahlian yang sesuai dengan minat dan bakat Anda. Kami menyediakan kurikulum yang selaras dengan kebutuhan industri.",
    programs: [
      {
        id: 1,
        title: "Rekayasa Perangkat Lunak",
        slug: "rpl",
        description:
          "Mempelajari pengembangan perangkat lunak, web, mobile, dan sistem informasi.",
        icon: "Monitor",
        color: "bg-blue-500",
        videoYoutubeId: "ScMzIvxBSi4",
        detail: {
          overview:
            "Program Keahlian Rekayasa Perangkat Lunak mempersiapkan siswa menjadi tenaga kerja terampil di bidang pengembangan software. Siswa mempelajari pemrograman web, mobile, database, hingga cloud computing dengan kurikulum yang disusun bersama industri.",
          kurikulum: [
            "Pemrograman Web (HTML, CSS, JavaScript, PHP, React, Laravel)",
            "Pemrograman Mobile (Kotlin, Flutter)",
            "Basis Data (MySQL, PostgreSQL, MongoDB)",
            "Cloud Computing & DevOps",
            "UI/UX Design",
            "Jaringan Komputer Dasar",
          ],
          kompetensi: [
            "Mengembangkan aplikasi web dan mobile",
            "Mengelola basis data",
            "Menerapkan cloud computing",
            "Merancang antarmuka pengguna",
          ],
          prospek: [
            "Software Developer",
            "Web Developer",
            "Mobile App Developer",
            "UI/UX Designer",
            "System Analyst",
          ],
        },
      },
      {
        id: 2,
        title: "Teknik Komputer & Jaringan",
        slug: "tkj",
        description:
          "Menguasai instalasi, konfigurasi, dan pemeliharaan jaringan komputer.",
        icon: "Network",
        color: "bg-emerald-500",
        videoYoutubeId: "L_LUpnjgPso",
        detail: {
          overview:
            "Program Keahlian Teknik Komputer & Jaringan mempelajari infrastruktur TI, mulai dari instalasi hardware, konfigurasi jaringan, keamanan siber, hingga administrasi server. Siswa siap menghadapi dunia kerja di bidang IT infrastructure.",
          kurikulum: [
            "Instalasi & Administrasi Sistem Operasi",
            "Konfigurasi Jaringan (Cisco, MikroTik)",
            "Keamanan Jaringan (Cybersecurity)",
            "Administrasi Server (Linux, Windows Server)",
            "Cloud Computing & Virtualisasi",
            "Teknologi IoT",
          ],
          kompetensi: [
            "Menginstalasi dan mengkonfigurasi jaringan",
            "Mengelola server dan sistem operasi",
            "Menerapkan keamanan jaringan",
            "Mengelola infrastruktur cloud",
          ],
          prospek: [
            "Network Engineer",
            "System Administrator",
            "IT Support",
            "Cyber Security Analyst",
            "Cloud Engineer",
          ],
        },
      },
      {
        id: 3,
        title: "Akuntansi & Keuangan",
        slug: "akl",
        description:
          "Belajar pencatatan keuangan, pelaporan, dan pengelolaan administrasi bisnis.",
        icon: "Calculator",
        color: "bg-amber-500",
        videoYoutubeId: "kCqkI16dGBM",
        detail: {
          overview:
            "Program Keahlian Akuntansi & Keuangan membekali siswa dengan kemampuan pencatatan transaksi, penyusunan laporan keuangan, perpajakan, dan pengelolaan administrasi bisnis menggunakan software akuntansi modern.",
          kurikulum: [
            "Pencatatan Transaksi Akuntansi",
            "Laporan Keuangan (Neraca, Laba Rugi, Arus Kas)",
            "Perpajakan (PPh, PPN)",
            "Akuntansi Biaya",
            "Software Akuntansi (MYOB, Zahir, Accurate)",
            "Etika & Hukum Bisnis",
          ],
          kompetensi: [
            "Menyusun laporan keuangan",
            "Mengelola perpajakan",
            "Menggunakan software akuntansi",
            "Menganalisis data keuangan",
          ],
          prospek: [
            "Staff Accounting",
            "Tax Consultant",
            "Auditor",
            "Finance Officer",
            "Bookkeeper",
          ],
        },
      },
      {
        id: 4,
        title: "Bisnis Digital",
        slug: "bd",
        description:
          "Strategi pemasaran digital, e-commerce, dan manajemen bisnis online.",
        icon: "ShoppingCart",
        color: "bg-purple-500",
        videoYoutubeId: "sNdu0JdVFGk",
        detail: {
          overview:
            "Program Keahlian Bisnis Digital mempelajari strategi pemasaran digital, pengelolaan e-commerce, content creation, hingga analitik data bisnis. Siswa siap menjadi enterpreneur muda atau digital marketer profesional.",
          kurikulum: [
            "Digital Marketing & Social Media Marketing",
            "E-Commerce & Marketplace Management",
            "Content Creation & Copywriting",
            "Google Analytics & Data Insight",
            "Photography & Videography Produk",
            "Manajemen Bisnis & Kewirausahaan",
          ],
          kompetensi: [
            "Mengelola pemasaran digital",
            "Mengoperasikan platform e-commerce",
            "Membuat konten pemasaran",
            "Menganalisis data bisnis",
          ],
          prospek: [
            "Digital Marketing Specialist",
            "Social Media Manager",
            "E-Commerce Manager",
            "Content Creator",
            "Entrepreneur",
          ],
        },
      },
      {
        id: 5,
        title: "Teknik Elektronika",
        slug: "te",
        description:
          "Merancang dan memelihara sistem elektronika industri dan robotika.",
        icon: "Cpu",
        color: "bg-rose-500",
        videoYoutubeId: "ScMzIvxBSi4",
        detail: {
          overview:
            "Program Keahlian Teknik Elektronika mempelajari rangkaian elektronika analog dan digital, sistem kontrol industri, otomasi, hingga robotika. Siswa berpraktik langsung dengan peralatan industri terkini.",
          kurikulum: [
            "Rangkaian Elektronika Analog & Digital",
            "Sistem Kontrol Industri (PLC)",
            "Otomasi & Robotika",
            "Pemrograman Mikrokontroler (Arduino, ESP32)",
            "Pengukuran & Instrumentasi",
            "Kelistrikan Industri",
          ],
          kompetensi: [
            "Merancang rangkaian elektronika",
            "Mengoperasikan sistem PLC",
            "Memprogram mikrokontroler",
            "Merawat peralatan elektronik industri",
          ],
          prospek: [
            "Electronics Engineer",
            "Automation Technician",
            "Robotics Technician",
            "Maintenance Engineer",
            "IoT Developer",
          ],
        },
      },
      {
        id: 6,
        title: "Desain Komunikasi Visual",
        slug: "dkv",
        description:
          "Mengembangkan keterampilan desain grafis, multimedia, dan branding.",
        icon: "Palette",
        color: "bg-pink-500",
        videoYoutubeId: "L_LUpnjgPso",
        detail: {
          overview:
            "Program Keahlian Desain Komunikasi Visual (DKV) mempelajari desain grafis, ilustrasi, animasi, photography, hingga branding. Siswa mengasah kreativitas menggunakan software desain profesional.",
          kurikulum: [
            "Desain Grafis (Adobe Photoshop, Illustrator, InDesign)",
            "Animasi 2D & 3D",
            "Videografi & Editing (Premiere Pro, After Effects)",
            "Typografi & Layout",
            "Photography & Retouching",
            "Branding & Identity Design",
          ],
          kompetensi: [
            "Membuat desain grafis digital",
            "Menghasilkan animasi dan video",
            "Merancang identitas visual brand",
            "Mengelola proyek desain kreatif",
          ],
          prospek: [
            "Graphic Designer",
            "Animator",
            "Video Editor",
            "Art Director",
            "Motion Graphics Artist",
          ],
        },
      },
    ],
  },
  fasilitas: {
    sectionTitle: "Fasilitas Unggulan",
    sectionDescription:
      "Didukung oleh fasilitas modern dan laboratorium berstandar industri untuk pengalaman belajar terbaik.",
    introVideo: {
      title: "Tur Fasilitas SMK Nusantara Tech",
      description:
        "Saksikan video berikut untuk melihat langsung fasilitas-fasilitas unggulan yang kami sediakan untuk mendukung proses belajar mengajar.",
      youtubeId: "dQw4w9WgXcQ",
    },
    items: [
      {
        id: 1,
        title: "Laboratorium Komputer",
        description:
          "Lab komputer dengan spesifikasi tinggi dan software licensi untuk praktik langsung.",
        icon: "MonitorDot",
        videoYoutubeId: "ScMzIvxBSi4",
      },
      {
        id: 2,
        title: "Workshop Teknik",
        description:
          "Bengkel praktik dengan peralatan industri terkini untuk pembelajaran hands-on.",
        icon: "Wrench",
        videoYoutubeId: "L_LUpnjgPso",
      },
      {
        id: 3,
        title: "Perpustakaan Digital",
        description:
          "Akses ribuan referensi digital, e-book, dan jurnal ilmiah terkini.",
        icon: "BookOpen",
        videoYoutubeId: "kCqkI16dGBM",
      },
      {
        id: 4,
        title: "Ruang Multimedia",
        description:
          "Studio produksi konten kreatif dengan peralatan video, audio, dan editing profesional.",
        icon: "Video",
        videoYoutubeId: "sNdu0JdVFGk",
      },
      {
        id: 5,
        title: "Masjid & Ruang Ibadah",
        description:
          "Fasilitas ibadah yang nyaman untuk mendukung pembentukan karakter religius.",
        icon: "Church",
        videoYoutubeId: "",
      },
      {
        id: 6,
        title: "Lapangan Olahraga",
        description:
          "Lapangan multifungsi untuk kegiatan olahraga dan pengembangan diri siswa.",
        icon: "Trophy",
        videoYoutubeId: "",
      },
    ],
  },
  berita: {
    sectionTitle: "Berita & Kegiatan",
    sectionDescription:
      "Ikuti informasi terbaru dan kegiatan menarik di lingkungan SMK Nusantara Tech.",
    items: [
      {
        id: 1,
        title: "Siswa RPL Juara 1 Lomba Hackathon Tingkat Nasional",
        date: "2026-07-15",
        category: "Prestasi",
        image: "/news-1.jpg",
        excerpt:
          "Tim dari jurusan Rekayasa Perangkat Lunak berhasil meraih juara 1 dalam kompetisi hackathon tingkat nasional.",
        detail: {
          author: "Humas SMK Nusantara Tech",
          body: [
            "Tim dari jurusan Rekayasa Perangkat Lunak berhasil meraih juara 1 dalam kompetisi hackathon tingkat nasional yang diselenggarakan di Jakarta Convention Center pada 13-15 Juli 2026.",
            "Tim yang terdiri dari 4 siswa kelas XII RPL ini mengalahkan 200+ peserta dari seluruh Indonesia dengan mengembangkan aplikasi edukasi berbasis AI yang dinamakan \"EduSmart\". Aplikasi ini menggunakan teknologi machine learning untuk personalisasi materi belajar siswa.",
            "Kepala SMK Nusantara Tech, Bapak Dr. Surya Pratama, M.Pd., menyatakan kebanggaannya atas prestasi ini. \"Ini membuktikan bahwa siswa kami mampu bersaing di tingkat nasional. Kami terus mendukung pengembangan potensi siswa melalui kurikulum yang relevan dengan industri.\"",
            "Sebagai hadiah, tim mendapatkan tropi, sertifikat, serta beasiswa kuliah dari beberapa universitas mitra. Aplikasi EduSmart juga berpeluang untuk dikembangkan lebih lanjut dan dipasarkan.",
          ],
        },
      },
      {
        id: 2,
        title: "Kerja Sama dengan PT Teknologi Nusantara",
        date: "2026-07-10",
        category: "Kerja Sama",
        image: "/news-2.jpg",
        excerpt:
          "Penandatanganan MoU dengan PT Teknologi Nusantara untuk program magang dan penyerapan lulusan.",
        detail: {
          author: "Bagian Humas",
          body: [
            "SMK Nusantara Tech resmi menjalin kerja sama strategis dengan PT Teknologi Nusantara melalui penandatanganan Memorandum of Understanding (MoU) pada hari Rabu, 10 Juli 2026.",
            "Kerja sama ini mencakup program magang selama 6 bulan bagi siswa kelas XII, program mentoring oleh engineer profesional dari PT Teknologi Nusantara, serta jaminan penyerapan lulusan terbaik untuk posisi junior developer dan quality assurance.",
            "Direktur HRD PT Teknologi Nusantara, Ibu Ratna Dewi, S.T., mengungkapkan bahwa pihaknya memilih SMK Nusantara Tech karena reputasi sekolah dalam menghasilkan lulusan berkualitas. \"Kami melihat kompetensi lulusan SMK ini sangat sesuai dengan kebutuhan industri kami.\"",
            "MoU ini berlaku untuk 3 tahun ke depan dan akan dievaluasi secara berkala untuk memastikan kualitas program tetap terjaga.",
          ],
        },
      },
      {
        id: 3,
        title: "Penerimaan Siswa Baru Tahun Ajaran 2026/2027",
        date: "2026-07-01",
        category: "PMB",
        image: "/news-3.jpg",
        excerpt:
          "Pendaftaran PPDB telah dibuka! Segera daftarkan diri Anda untuk mendapatkan tempat terbatas.",
        detail: {
          author: "Panitia PPDB",
          body: [
            "Penerimaan Peserta Didik Baru (PPDB) SMK Nusantara Tech untuk tahun ajaran 2026/2027 telah resmi dibuka mulai 1 Juli 2026. Pendaftaran dilakukan secara online melalui website resmi ppdb.smknusantara-tech.sch.id.",
            "Terdapat 6 program keahlian yang membuka kuota pendaftaran, yaitu: Rekayasa Perangkat Lunak (40 siswa), Teknik Komputer & Jaringan (40 siswa), Akuntansi & Keuangan (36 siswa), Bisnis Digital (36 siswa), Teknik Elektronika (36 siswa), dan Desain Komunikasi Visual (36 siswa).",
            "Jalur pendaftaran yang tersedia meliputi: Jalur Prestasi (akademik/non-akademik), Jalur Mitra Industri, dan Jalur Umum. Pendaftar jalur umum akan mengikuti tes seleksi yang terdiri dari tes tertulis dan wawancara.",
            "Panitia mengingatkan agar calon siswa segera mendaftar karena kuota terbatas. Untuk informasi lebih lanjut, silakan hubungi panitia PPDB di nomor (024) 1234567 atau kunjungi langsung sekolah.",
          ],
        },
      },
      {
        id: 4,
        title: "Workshop Cyber Security bersama CISCO Networking Academy",
        date: "2026-06-25",
        category: "Kegiatan",
        image: "/news-4.jpg",
        excerpt:
          "Siswa TKJ mengikuti workshop keamanan siber bersama instruktur CISCO selama 3 hari.",
        detail: {
          author: "Jurusan TKJ",
          body: [
            "Sebanyak 60 siswa Teknik Komputer & Jaringan mengikuti workshop Cyber Security yang diselenggarakan bekerja sama dengan CISCO Networking Academy pada 23-25 Juni 2026.",
            "Workshop ini menghadirkan 3 instruktur bersertifikat CISCO dari Jakarta yang memberikan materi tentang ethical hacking, network security, dan incident response. Siswa belajar langsung menggunakan tools keamanan jaringan yang digunakan oleh profesional di industri.",
            "Materi yang disampaikan meliputi: pengenalan ancaman siber, teknik scanning dan enumerasi, analisis malware dasar, konfigurasi firewall, serta respons terhadap insiden keamanan.",
            "Seluruh peserta mendapatkan sertifikat dari CISCO Networking Academy setelah menyelesaikan semua sesi dan ujian praktik. Sertifikat ini diakui secara internasional dan dapat menjadi nilai tambah saat melamar kerja.",
          ],
        },
      },
      {
        id: 5,
        title: "Kunjungan Industri ke PT Semarang Tech Solutions",
        date: "2026-06-18",
        category: "Kegiatan",
        image: "/news-5.jpg",
        excerpt:
          "Siswa RPL dan TKJ melakukan kunjungan industri untuk melihat langsung lingkungan kerja teknologi.",
        detail: {
          author: "Bagian Kesiswaan",
          body: [
            "Sebanyak 80 siswa dari jurusan Rekayasa Perangkat Lunak dan Teknik Komputer & Jaringan melakukan kunjungan industri ke PT Semarang Tech Solutions pada 18 Juni 2026.",
            "Selama kunjungan, siswa berkesempatan melihat langsung lingkungan kerja di perusahaan teknologi yang bergerak di bidang cloud computing dan enterprise software ini. Mereka mendapat penjelasan tentang workflow development, best practices di industri, dan tips karir.",
            "Beberapa siswa juga berkesempatan untuk berinteraksi langsung dengan software engineer senior dan mendengarkan sharing session tentang pengalaman mereka bekerja di industri teknologi.",
            "Kunjungan industri merupakan bagian dari program pembelajaran yang bertujuan memberikan wawasan nyata kepada siswa tentang dunia kerja sebelum mereka terjun ke dunia profesional.",
          ],
        },
      },
      {
        id: 6,
        title: "Lomba Desain Poster Tingkat Provinsi - Juara 2",
        date: "2026-06-10",
        category: "Prestasi",
        image: "/news-6.jpg",
        excerpt:
          "Siswa DKV meraih juara 2 dalam lomba desain poster tingkat provinsi Jawa Tengah.",
        detail: {
          author: "Jurusan DKV",
          body: [
            "Siswa jurusan Desain Komunikasi Visual, Ananda Putri Ramadhani (XII DKV), berhasil meraih juara 2 dalam Lomba Desain Poster Tingkat Provinsi Jawa Tengah yang diselenggarakan di Universitas Diponegoro pada 8-10 Juni 2026.",
            "Ananda mengirimkan karya berjudul \"Digitalisasi Pendidikan\" yang menggabungkan elemen tradisional Jawa dengan gaya desain kontemporer. Karya ini dinilai memiliki komposisi visual yang kuat dan pesan yang relevan dengan tema lomba.",
            "Guru pembimbing, Bapak Rudi Hartono, S.Ds., mengungkapkan bahwa persiapan siswa sudah dimulai sejak 3 bulan sebelumnya dengan rutin konsultasi dan review desain.",
            "Prestasi ini menjadi bukti kualitas pendidikan di jurusan DKV SMK Nusantara Tech yang terus menghasilkan siswa berprestasi di bidang desain komunikasi visual.",
          ],
        },
      },
      {
        id: 7,
        title: "Career Day & Job Fair 2026",
        date: "2026-05-28",
        category: "Kegiatan",
        image: "/news-7.jpg",
        excerpt:
          "Ajang pertemuan siswa dengan 40+ perusahaan mitra untuk rekrutmen dan magang.",
        detail: {
          author: "Bagian Konseling Karir",
          body: [
            "SMK Nusantara Tech menggelar Career Day & Job Fair 2026 pada 28 Mei 2026 di aula utama sekolah. Ajang ini dihadiri oleh 45 perusahaan mitra dari berbagai sektor industri.",
            "Acara ini menjadi kesempatan bagi siswa kelas XII untuk bertemu langsung dengan HRD dari perusahaan-perusahaan mitra, menyampaikan CV, dan melakukan wawancara kerja langsung. Tidak hanya itu, perusahaan juga membuka lowongan magang bagi siswa kelas XI.",
            "Beberapa perusahaan yang hadir antara lain PT Teknologi Nusantara, PT Semarang Tech Solutions, Bank Jateng, PT Industri Kreatif, dan masih banyak lagi. Total terdapat 200+ lowongan yang tersedia.",
            "Kepala Program Keahlian, Ibu Dewi Kartika, S.Pd., M.M., menyatakan bahwa Career Day tahun ini adalah yang terbesar sejauh ini dan menunjukkan kuatnya jaringan industri yang dimiliki sekolah.",
          ],
        },
      },
      {
        id: 8,
        title: "MoU dengan Universitas Diponegoro - Program Kelanjutan Studi",
        date: "2026-05-15",
        category: "Kerja Sama",
        image: "/news-8.jpg",
        excerpt:
          "Perjanjian kerja sama untuk jalur masuk kuliah prioritas bagi lulusan terbaik SMK Nusantara Tech.",
        detail: {
          author: "Humas SMK Nusantara Tech",
          body: [
            "SMK Nusantara Tech dan Universitas Diponegoro (UNDIP) menandatangani perjanjian kerja sama untuk program kelanjutan studi bagi lulusan terbaik pada 15 Mei 2026.",
            "Melalui kerja sama ini, lulusan SMK Nusantara Tech yang memenuhi kriteria akademik berhak mendapatkan jalur masuk kuliah prioritas ke beberapa program studi di UNDIP, antara lain Teknik Informatika, Sistem Informasi, dan Akuntansi.",
            "Syarat yang harus dipenuhi antara lain: nilai rata-rata UN minimal 85, tidak pernah melakukan pelanggaran disiplin, serta rekomendasi dari kepala sekolah. Kuota yang disediakan adalah 10 siswa per tahun untuk setiap program studi.",
            "Rektor UNDIP dalam sambutannya menyambut baik kerja sama ini sebagai bagian dari komitmen universitas dalam menjalin hubungan dengan institusi pendidikan tingkat menengah untuk menyiapkan calon mahasiswa berkualitas.",
          ],
        },
      },
      {
        id: 9,
        title: "Ujian Kompetensi Keahlian Tahun Ajaran 2025/2026",
        date: "2026-04-20",
        category: "Akademik",
        image: "/news-9.jpg",
        excerpt:
          "Seluruh siswa kelas XII mengikuti uji kompetensi untuk mendapatkan sertifikat keahlian nasional.",
        detail: {
          author: "Bagian Kurikulum",
          body: [
            "Seluruh siswa kelas XII SMK Nusantara Tech telah menyelesaikan Ujian Kompetensi Keahlian (UKK) yang dilaksanakan pada 14-20 April 2026. UKK merupakan ujian wajib yang menentukan kelulusan siswa SMK.",
            "UKK tahun ini diikuti oleh 240 siswa dari 6 program keahlian. Ujian dilaksanakan dalam bentuk ujian praktik yang dinilai langsung oleh asesor dari BNSP (Badan Nasional Sertifikasi Profesi) dan guru produktif.",
            "Untuk program RPL, siswa diuji kemampuan membuat aplikasi web fullstack. Program TKJ diuji instalasi dan konfigurasi jaringan. Program AKL diuji penyusunan laporan keuangan lengkap. Program BD diuji kampanye digital marketing. Program TE diuji rangkaian elektronika dan PLC. Program DKV diuji pembuatan desain brand identity.",
            "Hasil UKK tahun ini menunjukkan peningkatan dibanding tahun lalu, dengan 95% siswa dinyatakan kompeten. Sertifikat kompetensi akan diterbitkan oleh BNSP dalam waktu 2-3 bulan setelah ujian.",
          ],
        },
      },
      {
        id: 10,
        title: "Peringatan Hari Pendidikan Nasional 2026",
        date: "2026-05-02",
        category: "Kegiatan",
        image: "/news-10.jpg",
        excerpt:
          "Upacara dan rangkaian kegiatan memperingati Hardiknas dengan tema 'Merdeka Belajar'.",
        detail: {
          author: "Bagian Kesiswaan",
          body: [
            "SMK Nusantara Tech menggelar upacara bendera dan rangkaian kegiatan dalam rangka memperingati Hari Pendidikan Nasional (Hardiknas) pada 2 Mei 2026 dengan tema \"Merdeka Belajar, Merdeka Berkarya\".",
            "Upacara dihadiri oleh seluruh civitas akademika dan dipimpin oleh Kepala SMK Nusantara Tech, Bapak Dr. Surya Pratama, M.Pd., yang bertindak sebagai pembina upacara. Dalam amanatnya, beliau menekankan pentingnya semangat belajar sepanjang hayat.",
            "Rangkaian kegiatan Hardiknas tahun ini meliputi: lomba kreativitas siswa antar jurusan, bakti sosial ke panti asuhan, seminar motivasi bersama alumni berprestasi, serta pameran karya siswa dari seluruh program keahlian.",
            "Puncak acara adalah pengumuman pemenang lomba kreativitas dan pemberian penghargaan kepada siswa berprestasi sepanjang semester ganjil. Kegiatan ini berjalan meriah dan mempererat semangat kekeluargaan di lingkungan sekolah.",
          ],
        },
      },
    ],
  },
  testimoni: {
    sectionTitle: "Apa Kata Mereka?",
    sectionDescription:
      "Dengarkan pengalaman dari alumni dan mitra industri kami.",
    items: [
      {
        id: 1,
        name: "Ahmad Fauzi",
        role: "Alumni RPL - Software Engineer di Gojek",
        avatar: "/avatar-1.jpg",
        quote:
          "SMK Nusantara Tech memberikan fondasi yang kuat untuk karir saya di bidang teknologi. Praktik langsung di lab sangat membantu.",
      },
      {
        id: 2,
        name: "Siti Rahmawati",
        role: "Alumni AKL - Staff Accounting di Unilever",
        avatar: "/avatar-2.jpg",
        quote:
          "Kurikulum yang diterapkan sangat relevan dengan kebutuhan industri. Saya langsung bisa bekerja setelah lulus.",
      },
      {
        id: 3,
        name: "Budi Santoso",
        role: "HR Manager - PT Industri Kreatif",
        avatar: "/avatar-3.jpg",
        quote:
          "Lulusan SMK ini memiliki kompetensi dan karakter yang dibutuhkan dunia kerja. Kami selalu prioritaskan.",
      },
    ],
  },
  ppdb: {
    title: "Penerimaan Peserta Didik Baru",
    subtitle:
      "SMK Nusantara Tech membuka pendaftaran siswa baru tahun ajaran 2026/2027. Daftar sekarang dan wujudkan masa depanmu!",
    academicYear: "2026/2027",
    countdownTarget: "2026-08-31T23:59:59",
    countdownLabel: "Pendaftaran Gelombang 2 Ditutup",
    batches: [
      {
        name: "Gelombang 1",
        registrationStart: "2026-04-01",
        registrationEnd: "2026-06-30",
        selectionDate: "2026-07-05",
        announcementDate: "2026-07-12",
        status: "closed",
        quota: 120,
        registered: 120,
      },
      {
        name: "Gelombang 2",
        registrationStart: "2026-07-01",
        registrationEnd: "2026-08-31",
        selectionDate: "2026-09-05",
        announcementDate: "2026-09-12",
        status: "active",
        quota: 120,
        registered: 78,
      },
      {
        name: "Gelombang 3 (Jalur Mandiri)",
        registrationStart: "2026-09-01",
        registrationEnd: "2026-09-30",
        selectionDate: "2026-10-05",
        announcementDate: "2026-10-10",
        status: "upcoming",
        quota: 60,
        registered: 0,
      },
    ],
    registrationFlow: [
      {
        step: 1,
        title: "Pendaftaran Online",
        description: "Isi formulir pendaftaran dan unggah berkas yang diperlukan.",
        duration: "10 menit",
      },
      {
        step: 2,
        title: "Verifikasi Berkas",
        description: "Panitia memverifikasi kelengkapan berkas pendaftaran Anda.",
        duration: "1-3 hari kerja",
      },
      {
        step: 3,
        title: "Tes Seleksi",
        description: "Ikuti tes tertulis dan/atau wawancara sesuai jalur pendaftaran.",
        duration: "1 hari",
      },
      {
        step: 4,
        title: "Pengumuman",
        description: "Hasil seleksi diumumkan melalui website dan email.",
        duration: "7 hari setelah tes",
      },
      {
        step: 5,
        title: "Daftar Ulang",
        description: "Lakukan daftar ulang dan pembayaran biaya pendidikan.",
        duration: "7 hari setelah pengumuman",
      },
    ],
    requirements: [
      "Lulusan SMP/MTs/sederajat tahun 2024, 2025, atau 2026",
      "Umur maksimal 21 tahun pada 1 Juli 2026",
      "Sehat jasmani dan rohani (dibuktikan surat keterangan dokter)",
      "Tidak buta warna (untuk program tertentu)",
      "Berkelakuan baik (dibuktikan surat keterangan dari sekolah asal)",
    ],
    programs: [
      { code: "RPL", name: "Rekayasa Perangkat Lunak", quota: 40 },
      { code: "TKJ", name: "Teknik Komputer & Jaringan", quota: 40 },
      { code: "AKL", name: "Akuntansi & Keuangan", quota: 36 },
      { code: "BD", name: "Bisnis Digital", quota: 36 },
      { code: "TE", name: "Teknik Elektronika", quota: 36 },
      { code: "DKV", name: "Desain Komunikasi Visual", quota: 36 },
    ],
    contact: {
      phone: "(024) 1234567",
      whatsapp: "6281234567890",
      email: "ppdb@smknusantara-tech.sch.id",
      hours: "Senin - Sabtu, 08.00 - 15.00 WIB",
    },
  },
  footer: {
    schoolName: "SMK Nusantara Tech",
    address:
      "Jl. Pendidikan No. 123, Kec. Teknologi, Kota Semarang, Jawa Tengah 50231",
    phone: "(024) 1234567",
    email: "info@smknusantara-tech.sch.id",
    socialMedia: {
      instagram: "https://instagram.com/smknusantara",
      facebook: "https://facebook.com/smknusantara",
      youtube: "https://youtube.com/@smknusantara",
    },
    quickLinks: [
      { label: "Beranda", href: "/" },
      { label: "Program Keahlian", href: "/program" },
      { label: "Fasilitas", href: "/fasilitas" },
      { label: "Berita", href: "/berita" },
      { label: "PPDB Online", href: "/ppdb" },
      { label: "Pengumuman", href: "/pengumuman" },
      { label: "Kontak", href: "/kontak" },
    ],
    copyright: "2026 SMK Nusantara Tech. All rights reserved.",
  },
  lokasi: {
    sectionTitle: "Lokasi Kami",
    sectionDescription: "Kunjungi kampus kami dan lihat langsung fasilitas yang tersedia.",
    address: "Jl. Raya Bungah No.Km.17, Bungah, Kec. Bungah, Kabupaten Gresik, Jawa Timur 61152",
    phone: "(024) 1234567",
    email: "info@smknusantara-tech.sch.id",
    hours: "Senin - Sabtu: 07.00 - 16.00 WIB",
    mapEmbedUrl: "https://maps.google.com/maps?q=-7.0514791,112.5748702&z=17&output=embed",
  },
  whatsappNumber: "6281234567890",
};

export type SiteContent = typeof siteContent;
