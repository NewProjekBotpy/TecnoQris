
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { 
  Briefcase, MapPin, Clock, Users, Coffee, Heart, 
  GraduationCap, Rocket, Shield, ChevronRight, Building2,
  Code2, BarChart3, Megaphone, HeadphonesIcon, Wallet,
  Search, ArrowRight, CheckCircle2, Sparkles
} from "lucide-react";
import { Logo } from "@/components/Logo";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ScrollReveal";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";

const AnonymousProfileSvg = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 16 16" fill="currentColor">
    <path fillRule="evenodd" d="m4.736 1.968-.892 3.269-.014.058C2.113 5.568 1 6.006 1 6.5 1 7.328 4.134 8 8 8s7-.672 7-1.5c0-.494-1.113-.932-2.83-1.205l-.014-.058-.892-3.27c-.146-.533-.698-.849-1.239-.734C9.411 1.363 8.62 1.5 8 1.5s-1.411-.136-2.025-.267c-.541-.115-1.093.2-1.239.735m.015 3.867a.25.25 0 0 1 .274-.224c.9.092 1.91.143 2.975.143a30 30 0 0 0 2.975-.143.25.25 0 0 1 .05.498c-.918.093-1.944.145-3.025.145s-2.107-.052-3.025-.145a.25.25 0 0 1-.224-.274M3.5 10h2a.5.5 0 0 1 .5.5v1a1.5 1.5 0 0 1-3 0v-1a.5.5 0 0 1 .5-.5m-1.5.5q.001-.264.085-.5H2a.5.5 0 0 1 0-1h3.5a1.5 1.5 0 0 1 1.488 1.312 3.5 3.5 0 0 1 2.024 0A1.5 1.5 0 0 1 10.5 9H14a.5.5 0 0 1 0 1h-.085q.084.236.085.5v1a2.5 2.5 0 0 1-5 0v-.14l-.21-.07a2.5 2.5 0 0 0-1.58 0l-.21.07v.14a2.5 2.5 0 0 1-5 0zm8.5-.5h2a.5.5 0 0 1 .5.5v1a1.5 1.5 0 0 1-3 0v-1a.5.5 0 0 1 .5-.5z"/>
  </svg>
);

const isFemale = (name: string): boolean => {
  const femaleNames = ["Anita", "Sari", "Dewi", "Putri", "Wulan", "Anggraini", "Maharani", "Maya", "Rina", "Sinta", "Ayu"];
  return femaleNames.some(fn => name.toLowerCase().includes(fn.toLowerCase()));
};

type JobDepartment = "Semua" | "Engineering" | "Product" | "Marketing" | "Operations" | "Finance";
type JobType = "Semua" | "Full-time" | "Contract" | "Internship";

interface Job {
  id: string;
  title: string;
  department: Exclude<JobDepartment, "Semua">;
  location: string;
  type: Exclude<JobType, "Semua">;
  experience: string;
  posted: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
}

export default function KarirPage() {
  const [scrolled, setScrolled] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState<JobDepartment>("Semua");
  const [selectedType, setSelectedType] = useState<JobType>("Semua");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedJob, setExpandedJob] = useState<string | null>(null);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const jobs: Job[] = [
    {
      id: "fs-001",
      title: "Fullstack Engineer",
      department: "Engineering",
      location: "Remote (Indonesia)",
      type: "Full-time",
      experience: "2-4 tahun",
      posted: "3 hari lalu",
      description: "Kami mencari Fullstack Engineer untuk bergabung dengan tim kecil kami. Kamu akan terlibat langsung dalam pengembangan fitur dari backend hingga frontend, dengan ownership penuh atas pekerjaan kamu.",
      requirements: [
        "Pengalaman minimal 2 tahun dengan Node.js dan React/Vue",
        "Familiar dengan TypeScript dan database (SQL/NoSQL)",
        "Bisa bekerja mandiri dengan minimum supervision",
        "Komunikasi yang baik untuk remote collaboration",
        "Bonus: pengalaman dengan payment system atau fintech"
      ],
      responsibilities: [
        "Mengembangkan fitur end-to-end (backend + frontend)",
        "Maintain dan improve sistem pembayaran yang ada",
        "Berkolaborasi langsung dengan founder untuk roadmap produk",
        "Code review dan diskusi teknis dengan tim",
        "Ikut dalam troubleshooting production issues"
      ]
    },
    {
      id: "bd-001",
      title: "Business Development",
      department: "Operations",
      location: "Remote (Indonesia)",
      type: "Full-time",
      experience: "1-3 tahun",
      posted: "1 minggu lalu",
      description: "Kami butuh orang yang bisa bantu acquire dan onboard merchant baru. Sebagai startup kecil, kamu akan langsung berhubungan dengan calon merchant dan membantu mereka setup TecnoQris.",
      requirements: [
        "Pengalaman minimal 1 tahun di sales, BD, atau customer-facing role",
        "Komunikasi yang excellent, bisa presentasi dengan baik",
        "Familiar dengan UMKM dan ekosistem pembayaran digital",
        "Self-starter, bisa kerja remote dengan target",
        "Bonus: punya network di komunitas UMKM"
      ],
      responsibilities: [
        "Prospecting dan outreach ke calon merchant",
        "Demo produk dan bantu proses onboarding",
        "Maintain hubungan dengan merchant existing",
        "Feedback loop ke tim produk tentang kebutuhan merchant",
        "Achieve target akuisisi merchant bulanan"
      ]
    },
    {
      id: "int-001",
      title: "Engineering Intern",
      department: "Engineering",
      location: "Remote (Indonesia)",
      type: "Internship",
      experience: "Fresh Graduate / Mahasiswa",
      posted: "5 hari lalu",
      description: "Program magang 3-6 bulan untuk mahasiswa atau fresh graduate. Kamu akan belajar langsung dari tim engineering kami dan berkontribusi pada proyek nyata, bukan cuma bikin kopi.",
      requirements: [
        "Mahasiswa tingkat akhir atau fresh graduate jurusan IT/CS",
        "Paham dasar JavaScript atau Python",
        "Eager to learn dan proaktif",
        "Bisa commit minimal 30 jam per minggu",
        "Punya laptop sendiri dan koneksi internet stabil"
      ],
      responsibilities: [
        "Berkontribusi pada development fitur baru",
        "Belajar best practices langsung dari senior",
        "Mengerjakan mini project dengan mentorship",
        "Ikut daily standup dan weekly sync",
        "Kesempatan full-time jika perform bagus"
      ]
    }
  ];

  const departments: JobDepartment[] = ["Semua", "Engineering", "Product", "Marketing", "Operations", "Finance"];
  const jobTypes: JobType[] = ["Semua", "Full-time", "Contract", "Internship"];

  const departmentIcons: Record<Exclude<JobDepartment, "Semua">, typeof Code2> = {
    Engineering: Code2,
    Product: Rocket,
    Marketing: Megaphone,
    Operations: HeadphonesIcon,
    Finance: Wallet
  };

  const filteredJobs = jobs.filter(job => {
    const matchesDepartment = selectedDepartment === "Semua" || job.department === selectedDepartment;
    const matchesType = selectedType === "Semua" || job.type === selectedType;
    const matchesSearch = searchQuery === "" || 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDepartment && matchesType && matchesSearch;
  });

  const benefits = [
    {
      icon: Wallet,
      title: "Gaji Kompetitif",
      description: "Kompensasi yang fair untuk startup stage. Kami terbuka soal salary range dan negotiate based on skill."
    },
    {
      icon: Coffee,
      title: "100% Remote",
      description: "Kerja dari mana aja di Indonesia. Nggak perlu relokasi. Ada budget untuk coworking space kalau butuh."
    },
    {
      icon: Clock,
      title: "Jam Kerja Fleksibel",
      description: "Asal bisa attend sync meeting dan kerjaan selesai, terserah mau kerja jam berapa. Output-based, bukan jam kerja."
    },
    {
      icon: GraduationCap,
      title: "Learning Budget",
      description: "Budget untuk kursus online, buku, atau tools yang dibutuhkan untuk kerja. Selama relevan, kami support."
    },
    {
      icon: Rocket,
      title: "Ownership & Impact",
      description: "Di tim kecil, kontribusi kamu langsung terasa. Kamu bukan cuma roda kecil di mesin besar."
    },
    {
      icon: Users,
      title: "Meetup Rutin",
      description: "Budget untuk ketemu tim secara berkala. Biar remote, tetap perlu bonding dan ngobrol langsung."
    }
  ];

  const culturePoints = [
    {
      title: "Move Fast, Stay Reliable",
      description: "Kami percaya pada kecepatan, tapi tidak mengorbankan kualitas. Setiap keputusan dibuat dengan pertimbangan dampak jangka panjang."
    },
    {
      title: "Ownership Mentality",
      description: "Semua orang di TecnoQris adalah owner. Kamu punya kebebasan untuk mengambil keputusan dan bertanggung jawab atas hasilnya."
    },
    {
      title: "Learn & Share",
      description: "Kami belajar dari kesalahan dan berbagi pengetahuan. Tech talks, brown bag sessions, dan belajar dari satu sama lain adalah kebiasaan kami."
    },
    {
      title: "User First",
      description: "Setiap fitur yang kami bangun dimulai dari pertanyaan: bagaimana ini membantu merchant? Customer obsession bukan sekadar slogan."
    }
  ];

  const hiringProcess = [
    {
      step: 1,
      title: "Application Review",
      description: "Tim HR akan review CV dan cover letter kamu dalam 5-7 hari kerja.",
      duration: "5-7 hari"
    },
    {
      step: 2,
      title: "HR Screening",
      description: "Video call 30 menit dengan HR untuk mengenal kamu lebih jauh dan menjelaskan role.",
      duration: "30 menit"
    },
    {
      step: 3,
      title: "Technical/Skill Assessment",
      description: "Take-home assignment atau live assessment sesuai dengan role yang dilamar.",
      duration: "2-5 hari"
    },
    {
      step: 4,
      title: "Team Interview",
      description: "Interview dengan hiring manager dan potential teammates. Fokus pada technical depth dan culture fit.",
      duration: "1-2 jam"
    },
    {
      step: 5,
      title: "Final Interview",
      description: "Interview dengan leadership team untuk role senior. Diskusi tentang expectations dan career goals.",
      duration: "45-60 menit"
    },
    {
      step: 6,
      title: "Offer",
      description: "Jika lolos semua tahap, kamu akan menerima offer dalam 3-5 hari kerja.",
      duration: "3-5 hari"
    }
  ];

  const stats = [
    { value: "8", label: "Tim Inti" },
    { value: "1", label: "Kantor" },
    { value: "3", label: "Posisi Terbuka" },
    { value: "100%", label: "Remote Friendly" }
  ];

  return (
    <div className="min-h-screen bg-[#020817] text-white overflow-x-hidden font-sans selection:bg-primary/30">
      <nav 
        className={`fixed top-0 w-full z-50 transition-all duration-200 ${scrolled ? "bg-[#020817]/95 border-b border-white/10 py-3" : "bg-transparent py-6"}`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group cursor-pointer">
            <Logo className="h-10 w-10 group-hover:scale-105 transition-transform duration-300 drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
            <span className="text-xl font-display font-bold tracking-tight">TecnoQris</span>
          </Link>
          
          <ul className="hidden md:flex items-center gap-10 text-sm font-medium text-slate-300">
            <li>
              <Link href="/#pricing" className="hover:text-white transition-colors relative group">
                Harga
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full"></span>
              </Link>
            </li>
            <li>
              <Link href="/tentang" className="hover:text-white transition-colors relative group">
                Tentang
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full"></span>
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-white transition-colors relative group">
                Blog
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full"></span>
              </Link>
            </li>
          </ul>

          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" className="hidden sm:inline-flex text-sm text-slate-300 hover:text-white hover:bg-white/5" data-testid="button-login">
                Masuk
              </Button>
            </Link>
            <Link href="/login">
              <Button className="bg-white text-black hover:bg-slate-200 rounded-full px-6 font-semibold" data-testid="button-register">
                Mulai Sekarang
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-transparent to-transparent -z-10"></div>
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-gradient-radial from-purple-500/10 to-transparent blur-3xl -z-10"></div>
        <div className="absolute top-40 right-1/4 w-80 h-80 bg-gradient-radial from-blue-500/10 to-transparent blur-3xl -z-10"></div>
        
        <div className="container mx-auto px-6">
          <ScrollReveal animation="fadeUp" className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-900/30 border border-purple-500/30 text-xs font-medium text-purple-300 mb-6">
              <Briefcase className="w-4 h-4" />
              <span className="tracking-wide uppercase">Karir di TecnoQris</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 leading-tight">
              Bangun Masa Depan <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Pembayaran Digital</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed mb-8">
              Bergabunglah dengan tim yang bersemangat membangun infrastruktur pembayaran untuk jutaan merchant Indonesia. Kami mencari orang-orang yang ingin membuat dampak nyata.
            </p>
            <a href="#lowongan">
              <Button size="lg" className="bg-white text-black hover:bg-slate-200 rounded-full px-8 font-semibold" data-testid="button-lihat-lowongan">
                Lihat Lowongan
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </a>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-12 border-y border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <ScrollReveal key={index} animation="fadeUp" delay={index * 0.1}>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-display font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-sm text-slate-400">{stat.label}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-6">
          <ScrollReveal animation="fadeUp" className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Kenapa TecnoQris?</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">Lebih dari sekadar tempat kerja, TecnoQris adalah tempat untuk berkembang dan berkontribusi pada ekonomi digital Indonesia.</p>
          </ScrollReveal>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <ScrollReveal key={index} animation="fadeUp" delay={index * 0.08}>
                <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-6 h-full hover:border-purple-500/30 transition-all hover:translate-y-[-4px]">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mb-4">
                    <benefit.icon className="w-6 h-6 text-purple-400" />
                  </div>
                  <h3 className="font-bold text-lg mb-3">{benefit.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{benefit.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-b from-slate-900/50 to-transparent">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal animation="fadeLeft">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-900/30 border border-blue-500/30 text-xs font-medium text-blue-300 mb-6">
                  <Sparkles className="w-4 h-4" />
                  <span className="tracking-wide uppercase">Budaya Kerja</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">Cara Kami Bekerja</h2>
                <p className="text-slate-400 mb-8 leading-relaxed">
                  Di TecnoQris, kami percaya bahwa hasil terbaik datang dari tim yang diberi kepercayaan dan kebebasan untuk berinovasi. Kami tidak micromanage—kami hire orang-orang hebat dan biarkan mereka bekerja dengan cara terbaik mereka.
                </p>
                <div className="space-y-6">
                  {culturePoints.map((point, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center shrink-0 mt-1">
                        <CheckCircle2 className="w-4 h-4 text-blue-400" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">{point.title}</h4>
                        <p className="text-sm text-slate-400">{point.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
            
            <ScrollReveal animation="fadeRight">
              <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-white/10 rounded-3xl p-8 md:p-10">
                <h3 className="text-xl font-bold mb-6">Kenapa Gabung Tim Kecil?</h3>
                <div className="space-y-6">
                  <div className="bg-slate-800/50 rounded-2xl p-5">
                    <p className="text-slate-300 text-sm mb-4 italic">"Di startup kecil, kontribusi kamu langsung terasa. Fitur yang gue develop minggu ini, besok udah dipake merchant. Nggak ada birokrasi, langsung eksekusi."</p>
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isFemale("Dimas") ? 'bg-gradient-to-br from-pink-800 to-pink-950' : 'bg-gradient-to-br from-blue-800 to-blue-950'}`}>
                        <AnonymousProfileSvg className={`w-5 h-5 ${isFemale("Dimas") ? 'text-pink-300' : 'text-blue-300'}`} />
                      </div>
                      <div>
                        <div className="font-semibold text-sm">Dimas K.</div>
                        <div className="text-xs text-slate-500">Engineer, Founding Team</div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-slate-800/50 rounded-2xl p-5">
                    <p className="text-slate-300 text-sm mb-4 italic">"Remote-first bukan cuma slogan. Gue tinggal di Jogja, kerja sama tim yang ada di Jakarta, Bandung, dan Surabaya. Asal kerjaan beres, jam kerja fleksibel banget."</p>
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isFemale("Anita") ? 'bg-gradient-to-br from-pink-800 to-pink-950' : 'bg-gradient-to-br from-blue-800 to-blue-950'}`}>
                        <AnonymousProfileSvg className={`w-5 h-5 ${isFemale("Anita") ? 'text-pink-300' : 'text-blue-300'}`} />
                      </div>
                      <div>
                        <div className="font-semibold text-sm">Anita N.</div>
                        <div className="text-xs text-slate-500">Operations</div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-slate-800/50 rounded-2xl p-5">
                    <p className="text-slate-300 text-sm mb-4 italic">"Learning curve di sini curam banget, tapi worth it. Setiap orang handle banyak hal, jadi skill set kita berkembang cepat. Cocok buat yang mau grow bareng."</p>
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isFemale("Reza") ? 'bg-gradient-to-br from-pink-800 to-pink-950' : 'bg-gradient-to-br from-blue-800 to-blue-950'}`}>
                        <AnonymousProfileSvg className={`w-5 h-5 ${isFemale("Reza") ? 'text-pink-300' : 'text-blue-300'}`} />
                      </div>
                      <div>
                        <div className="font-semibold text-sm">Reza P.</div>
                        <div className="text-xs text-slate-500">Fullstack Developer</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section id="lowongan" className="py-24">
        <div className="container mx-auto px-6">
          <ScrollReveal animation="fadeUp" className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Lowongan Terbuka</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">Temukan posisi yang sesuai dengan skill dan minat kamu. Kami selalu mencari talenta berbakat untuk bergabung dengan tim.</p>
          </ScrollReveal>

          <ScrollReveal animation="fadeUp" delay={0.1}>
            <div className="max-w-4xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <Input
                  type="text"
                  placeholder="Cari posisi..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-slate-900/50 border border-white/10 rounded-full text-white placeholder:text-slate-500 focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20"
                  data-testid="input-search-job"
                />
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal animation="fadeUp" delay={0.15}>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="flex flex-wrap gap-1.5">
                {departments.map((dept) => (
                  <button
                    key={dept}
                    onClick={() => setSelectedDepartment(dept)}
                    className={`px-3 py-1 rounded-full text-xs transition-all ${
                      selectedDepartment === dept
                        ? "bg-purple-500/20 text-purple-400 border border-purple-500/30"
                        : "bg-slate-900/50 text-slate-400 border border-white/10 hover:border-white/20"
                    }`}
                    data-testid={`button-dept-${dept.toLowerCase()}`}
                  >
                    {dept}
                  </button>
                ))}
              </div>
              <div className="w-px bg-white/10 hidden md:block"></div>
              <div className="flex flex-wrap gap-1.5">
                {jobTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={`px-3 py-1 rounded-full text-xs transition-all ${
                      selectedType === type
                        ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                        : "bg-slate-900/50 text-slate-400 border border-white/10 hover:border-white/20"
                    }`}
                    data-testid={`button-type-${type.toLowerCase()}`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <div className="max-w-4xl mx-auto space-y-4">
            {filteredJobs.length === 0 ? (
              <ScrollReveal animation="fadeUp">
                <div className="text-center py-16 bg-slate-900/30 rounded-2xl border border-white/10">
                  <Briefcase className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Tidak ada lowongan ditemukan</h3>
                  <p className="text-slate-400 text-sm">Coba ubah filter atau kata kunci pencarian kamu.</p>
                </div>
              </ScrollReveal>
            ) : (
              filteredJobs.map((job, index) => {
                const DeptIcon = departmentIcons[job.department];
                const isExpanded = expandedJob === job.id;
                
                return (
                  <ScrollReveal key={job.id} animation="fadeUp" delay={index * 0.05}>
                    <div 
                      className={`bg-slate-900/50 border rounded-2xl transition-all ${
                        isExpanded ? "border-purple-500/30" : "border-white/10 hover:border-white/20"
                      }`}
                      data-testid={`card-job-${job.id}`}
                    >
                      <button
                        onClick={() => setExpandedJob(isExpanded ? null : job.id)}
                        className="w-full text-left p-6"
                        data-testid={`button-expand-${job.id}`}
                      >
                        <div className="flex flex-col md:flex-row md:items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center shrink-0">
                            <DeptIcon className="w-6 h-6 text-purple-400" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2 mb-1">
                              <h3 className="font-bold text-lg">{job.title}</h3>
                              <span className="px-2 py-0.5 bg-slate-800 text-slate-400 text-xs rounded-full">{job.department}</span>
                            </div>
                            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
                              <span className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                {job.location}
                              </span>
                              <span className="flex items-center gap-1">
                                <Briefcase className="w-4 h-4" />
                                {job.type}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {job.experience}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="text-xs text-slate-500">{job.posted}</span>
                            <ChevronRight className={`w-5 h-5 text-slate-400 transition-transform ${isExpanded ? "rotate-90" : ""}`} />
                          </div>
                        </div>
                      </button>
                      
                      {isExpanded && (
                        <div className="px-6 pb-6 pt-2 border-t border-white/5">
                          <p className="text-slate-300 mb-6">{job.description}</p>
                          
                          <div className="grid md:grid-cols-2 gap-6 mb-6">
                            <div>
                              <h4 className="font-semibold mb-3 text-sm uppercase tracking-wider text-slate-400">Persyaratan</h4>
                              <ul className="space-y-2">
                                {job.requirements.map((req, i) => (
                                  <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                                    <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                                    {req}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-3 text-sm uppercase tracking-wider text-slate-400">Tanggung Jawab</h4>
                              <ul className="space-y-2">
                                {job.responsibilities.map((resp, i) => (
                                  <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                                    <ArrowRight className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                                    {resp}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                          
                          <div className="flex flex-col sm:flex-row gap-3">
                            <Button className="bg-purple-600 hover:bg-purple-700 text-white rounded-full px-6" data-testid={`button-apply-${job.id}`}>
                              Lamar Sekarang
                            </Button>
                            <Button variant="outline" className="border-white/20 hover:bg-white/5 rounded-full px-6" data-testid={`button-share-${job.id}`}>
                              Bagikan Lowongan
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </ScrollReveal>
                );
              })
            )}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-b from-slate-900/50 to-transparent">
        <div className="container mx-auto px-6">
          <ScrollReveal animation="fadeUp" className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Proses Rekrutmen</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">Kami berusaha membuat proses rekrutmen setransparan dan seefisien mungkin. Berikut tahapan yang akan kamu lalui.</p>
          </ScrollReveal>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 via-blue-500 to-green-500 hidden md:block"></div>
              
              {hiringProcess.map((step, index) => (
                <ScrollReveal key={index} animation={index % 2 === 0 ? "fadeLeft" : "fadeRight"} delay={index * 0.1}>
                  <div className={`relative flex items-center gap-8 mb-10 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    <div className={`hidden md:block flex-1 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                      <div className="bg-slate-900/80 border border-white/10 rounded-2xl p-6 inline-block max-w-sm">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center text-xs font-bold text-purple-400">{step.step}</span>
                          <h3 className="font-bold">{step.title}</h3>
                        </div>
                        <p className="text-sm text-slate-400 mb-2">{step.description}</p>
                        <span className="text-xs text-slate-500">Durasi: {step.duration}</span>
                      </div>
                    </div>
                    
                    <div className="absolute left-6 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-purple-500 rounded-full border-4 border-[#020817] hidden md:block"></div>
                    
                    <div className="flex-1 md:hidden">
                      <div className="bg-slate-900/80 border border-white/10 rounded-2xl p-6">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center text-xs font-bold text-purple-400">{step.step}</span>
                          <h3 className="font-bold">{step.title}</h3>
                        </div>
                        <p className="text-sm text-slate-400 mb-2">{step.description}</p>
                        <span className="text-xs text-slate-500">Durasi: {step.duration}</span>
                      </div>
                    </div>
                    
                    <div className="hidden md:block flex-1"></div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-6">
          <ScrollReveal animation="fadeUp" className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Cara Kerja Kami</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">Sebagai startup dengan tim kecil yang solid, kami menerapkan sistem kerja remote-first yang fleksibel.</p>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <ScrollReveal animation="fadeUp" delay={0.1}>
              <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-6 h-full hover:border-purple-500/30 transition-all text-center">
                <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="font-bold text-lg mb-2">Remote First</h3>
                <p className="text-sm text-slate-400">Bekerja dari mana saja di Indonesia. Kami percaya produktivitas tidak harus dari kantor.</p>
              </div>
            </ScrollReveal>
            <ScrollReveal animation="fadeUp" delay={0.2}>
              <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-6 h-full hover:border-purple-500/30 transition-all text-center">
                <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="font-bold text-lg mb-2">Tim Kecil, Dampak Besar</h3>
                <p className="text-sm text-slate-400">Dengan tim 8 orang, setiap kontribusimu langsung terasa. Tidak ada birokrasi yang berbelit.</p>
              </div>
            </ScrollReveal>
            <ScrollReveal animation="fadeUp" delay={0.3}>
              <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-6 h-full hover:border-purple-500/30 transition-all text-center">
                <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                  <Coffee className="w-6 h-6 text-green-400" />
                </div>
                <h3 className="font-bold text-lg mb-2">Meetup Rutin</h3>
                <p className="text-sm text-slate-400">Meski remote, kami rutin ketemu untuk sync dan bonding. Ada budget untuk coworking dan pertemuan tim.</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="py-24">
        <ScrollReveal animation="fadeUp" className="container mx-auto px-6">
          <div className="bg-gradient-to-br from-purple-900/40 via-slate-900 to-blue-900/30 border border-purple-500/20 rounded-[2.5rem] p-12 md:p-16 text-center">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
              Tidak Menemukan Posisi yang Cocok?
            </h2>
            <p className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto">
              Kirimkan CV dan portfolio kamu. Kami selalu tertarik bertemu talenta hebat dan akan menghubungi kamu ketika ada posisi yang sesuai.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" className="bg-white text-black hover:bg-slate-200 rounded-full px-8 font-semibold" data-testid="button-kirim-cv">
                Kirim CV Kamu
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Link href="/tentang">
                <Button size="lg" variant="outline" className="border-white/20 hover:bg-white/5 rounded-full px-8" data-testid="button-pelajari-perusahaan">
                  Pelajari Tentang Kami
                </Button>
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <footer className="py-16 border-t border-white/10 bg-[#020817]">
        <div className="container mx-auto px-6">
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-16" staggerDelay={0.1}>
            <StaggerItem animation="fadeUp" className="col-span-2 lg:col-span-2">
               <div className="flex items-center gap-2 mb-6">
                  <Logo className="h-8 w-8" />
                  <span className="text-xl font-display font-bold">TecnoQris</span>
               </div>
               <p className="text-slate-400 text-sm max-w-xs mb-8">
                 Platform payment gateway QRIS untuk bisnis Indonesia. Solusi pembayaran digital yang terintegrasi dan terpercaya.
               </p>
            </StaggerItem>
            
            <StaggerItem animation="fadeUp">
              <h4 className="font-bold mb-6">Produk</h4>
              <ul className="space-y-4 text-sm text-slate-400">
                <li><Link href="/qr-generator" className="hover:text-blue-400 transition-colors">Generate QRIS</Link></li>
                <li><Link href="/dashboard" className="hover:text-blue-400 transition-colors">Dashboard</Link></li>
                <li><Link href="/transactions" className="hover:text-blue-400 transition-colors">Transaksi</Link></li>
                <li><Link href="/wallets" className="hover:text-blue-400 transition-colors">Wallet</Link></li>
              </ul>
            </StaggerItem>
            <StaggerItem animation="fadeUp">
              <h4 className="font-bold mb-6">Dokumentasi</h4>
              <ul className="space-y-4 text-sm text-slate-400">
                <li><Link href="/qris-docs" className="hover:text-blue-400 transition-colors">Panduan QRIS</Link></li>
                <li><Link href="/api-docs" className="hover:text-blue-400 transition-colors">Dokumentasi API</Link></li>
                <li><Link href="/api-keys" className="hover:text-blue-400 transition-colors">API Keys</Link></li>
              </ul>
            </StaggerItem>
            <StaggerItem animation="fadeUp">
              <h4 className="font-bold mb-6">Perusahaan</h4>
              <ul className="space-y-4 text-sm text-slate-400">
                <li><Link href="/tentang" className="hover:text-blue-400 transition-colors">Tentang</Link></li>
                <li><Link href="/blog" className="hover:text-blue-400 transition-colors">Blog</Link></li>
                <li><Link href="/karir" className="hover:text-blue-400 transition-colors">Karir</Link></li>
              </ul>
            </StaggerItem>
          </StaggerContainer>
          
          <ScrollReveal animation="fadeUp" delay={0.4}>
            <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
              <p className="text-xs sm:text-sm whitespace-nowrap">&copy; 2023-2025 TecnoQris Inc.</p>
              <div className="flex gap-8">
                <a href="#" className="hover:text-white">Privasi</a>
                <a href="#" className="hover:text-white">Ketentuan</a>
                <a href="#" className="hover:text-white">Keamanan</a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </footer>
    </div>
  );
}
