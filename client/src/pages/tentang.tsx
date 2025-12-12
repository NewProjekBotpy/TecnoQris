
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Target, Users, Award, Building2, Globe2, TrendingUp, CheckCircle2, Mail, MapPin, Phone, Rocket, Heart, Laptop, Coffee } from "lucide-react";
import { Logo } from "@/components/Logo";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ScrollReveal";
import { SocialMediaIcons, SocialButton } from "@/components/SocialMediaIcons";
import { useState, useEffect } from "react";

const AnonymousProfileSvg = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 16 16" fill="currentColor">
    <path fillRule="evenodd" d="m4.736 1.968-.892 3.269-.014.058C2.113 5.568 1 6.006 1 6.5 1 7.328 4.134 8 8 8s7-.672 7-1.5c0-.494-1.113-.932-2.83-1.205l-.014-.058-.892-3.27c-.146-.533-.698-.849-1.239-.734C9.411 1.363 8.62 1.5 8 1.5s-1.411-.136-2.025-.267c-.541-.115-1.093.2-1.239.735m.015 3.867a.25.25 0 0 1 .274-.224c.9.092 1.91.143 2.975.143a30 30 0 0 0 2.975-.143.25.25 0 0 1 .05.498c-.918.093-1.944.145-3.025.145s-2.107-.052-3.025-.145a.25.25 0 0 1-.224-.274M3.5 10h2a.5.5 0 0 1 .5.5v1a1.5 1.5 0 0 1-3 0v-1a.5.5 0 0 1 .5-.5m-1.5.5q.001-.264.085-.5H2a.5.5 0 0 1 0-1h3.5a1.5 1.5 0 0 1 1.488 1.312 3.5 3.5 0 0 1 2.024 0A1.5 1.5 0 0 1 10.5 9H14a.5.5 0 0 1 0 1h-.085q.084.236.085.5v1a2.5 2.5 0 0 1-5 0v-.14l-.21-.07a2.5 2.5 0 0 0-1.58 0l-.21.07v.14a2.5 2.5 0 0 1-5 0zm8.5-.5h2a.5.5 0 0 1 .5.5v1a1.5 1.5 0 0 1-3 0v-1a.5.5 0 0 1 .5-.5z"/>
  </svg>
);

const isFemale = (name: string): boolean => {
  const femaleNames = ["Sari", "Dewi", "Putri", "Wulan", "Anggraini", "Maharani", "Maya", "Rina"];
  return femaleNames.some(fn => name.toLowerCase().includes(fn.toLowerCase()));
};

export default function TentangPage() {
  const [scrolled, setScrolled] = useState(false);

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

  const milestones = [
    {
      year: "Q1 2023",
      title: "Ide Awal",
      description: "Tiga orang teman dengan latar belakang berbeda mulai berdiskusi tentang sulitnya UMKM mengakses pembayaran digital yang terjangkau."
    },
    {
      year: "Q2 2023",
      title: "Pendirian TecnoQris",
      description: "Dengan modal patungan Rp 138 juta, kami resmi mendirikan TecnoQris dan mulai membangun produk pertama dari kamar kos."
    },
    {
      year: "Q3 2023",
      title: "MVP & Merchant Pertama",
      description: "Meluncurkan versi pertama platform dan mendapatkan 10 merchant pertama dari warung dan toko kecil di lingkungan sekitar."
    },
    {
      year: "Q4 2023",
      title: "Tim Berkembang",
      description: "Tim bertambah menjadi 8 orang. Semua bekerja remote dari berbagai kota di Indonesia."
    },
    {
      year: "2024",
      title: "Pertumbuhan Organik",
      description: "Fokus pada product-market fit dan membangun fondasi yang kuat. Merchant mulai bertambah dari mulut ke mulut."
    },
    {
      year: "2025",
      title: "Terus Bertumbuh",
      description: "Dengan semangat dan kerja keras, kami terus mengembangkan platform dan memperluas jangkauan untuk lebih banyak UMKM."
    }
  ];

  const teamMembers = [
    {
      name: "Arief Budiman",
      role: "Co-founder & CEO",
      bio: "Mantan software engineer di startup fintech. Melihat langsung tantangan UMKM keluarganya dalam menerima pembayaran digital, yang memotivasi pendirian TecnoQris.",
      image: "AB"
    },
    {
      name: "Rina Wulandari",
      role: "Co-founder & CTO",
      bio: "Full-stack developer dengan pengalaman di beberapa startup teknologi. Bertanggung jawab membangun arsitektur dan infrastruktur platform TecnoQris.",
      image: "RW"
    },
    {
      name: "Dimas Prakoso",
      role: "Co-founder & COO",
      bio: "Latar belakang operasional dan customer success. Fokus pada pengalaman merchant dan memastikan operasional berjalan lancar setiap hari.",
      image: "DP"
    }
  ];

  const values = [
    {
      icon: Heart,
      title: "Jujur & Transparan",
      description: "Kami tidak pernah janji berlebihan. Apa yang kami sampaikan adalah apa yang bisa kami berikan. Biaya jelas, tidak ada hidden fees."
    },
    {
      icon: Target,
      title: "Fokus pada UMKM",
      description: "Setiap fitur yang kami bangun dimulai dari pertanyaan: apakah ini benar-benar membantu usaha kecil tumbuh?"
    },
    {
      icon: Rocket,
      title: "Bergerak Cepat",
      description: "Sebagai tim kecil, kami bisa bergerak cepat dan responsif. Feedback merchant langsung kami tindaklanjuti."
    },
    {
      icon: Users,
      title: "Tim yang Solid",
      description: "Meski remote, kami adalah tim yang erat. Saling support dan berkomitmen pada misi yang sama."
    }
  ];

  const stats = [
    { value: "8", label: "Tim Inti" },
    { value: "2023", label: "Tahun Berdiri" },
    { value: "100%", label: "Remote-First" },
    { value: "Rp 138jt", label: "Modal Awal" }
  ];

  const aspirations = [
    {
      icon: Shield,
      title: "Lisensi Bank Indonesia",
      description: "Kami sedang dalam proses dan berkomitmen untuk mendapatkan izin resmi sebagai Penyelenggara Jasa Pembayaran (PJP)."
    },
    {
      icon: Award,
      title: "Sertifikasi Keamanan",
      description: "PCI-DSS dan ISO 27001 adalah standar yang kami targetkan untuk memastikan keamanan data merchant."
    },
    {
      icon: Globe2,
      title: "Jangkauan Lebih Luas",
      description: "Dari UMKM di satu kota, kami bermimpi bisa melayani pelaku usaha di seluruh Indonesia."
    }
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
              <Link href="/qris-docs" className="hover:text-white transition-colors relative group">
                Dokumentasi QRIS
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full"></span>
              </Link>
            </li>
            <li>
              <Link href="/api-docs" className="hover:text-white transition-colors relative group">
                API
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
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 via-transparent to-transparent -z-10"></div>
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-gradient-radial from-blue-500/10 to-transparent blur-3xl -z-10"></div>
        <div className="absolute top-40 right-1/4 w-80 h-80 bg-gradient-radial from-purple-500/10 to-transparent blur-3xl -z-10"></div>
        
        <div className="container mx-auto px-6">
          <ScrollReveal animation="fadeUp" className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-900/30 border border-blue-500/30 text-xs font-medium text-blue-300 mb-6">
              <Building2 className="w-4 h-4" />
              <span className="tracking-wide uppercase">Tentang Kami</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 leading-tight">
              Startup Kecil, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Mimpi Besar</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
              TecnoQris adalah startup kecil yang didirikan tahun 2023 oleh sekelompok orang yang percaya bahwa UMKM Indonesia layak mendapatkan solusi pembayaran digital yang terjangkau dan mudah digunakan.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-16 border-y border-white/5">
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
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal animation="fadeLeft">
              <div>
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">Cerita Kami</h2>
                <div className="space-y-4 text-slate-400 leading-relaxed">
                  <p>
                    TecnoQris lahir dari pengalaman pribadi. Salah satu pendiri kami menyaksikan langsung bagaimana warung keluarganya kesulitan menerima pembayaran digital karena biaya yang tinggi dan proses yang rumit. Dari situlah ide ini bermula.
                  </p>
                  <p>
                    Di pertengahan 2023, tiga orang teman dengan latar belakang teknologi dan operasional memutuskan untuk patungan modal sebesar Rp 138 juta. Tanpa investor, tanpa kantor mewah—hanya laptop, koneksi internet, dan tekad untuk membuat perbedaan.
                  </p>
                  <p>
                    Hari ini, kami adalah tim kecil yang terdiri dari 8 orang, bekerja 100% remote dari berbagai kota di Indonesia. Kami masih dalam tahap awal, terus belajar dan berkembang bersama merchant yang kami layani.
                  </p>
                </div>
              </div>
            </ScrollReveal>
            
            <ScrollReveal animation="fadeRight">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-blue-900/40 to-slate-900 border border-blue-500/20 rounded-2xl p-6">
                  <Target className="w-10 h-10 text-blue-400 mb-4" />
                  <h3 className="font-bold text-lg mb-2">Misi</h3>
                  <p className="text-sm text-slate-400">Membuat pembayaran digital dapat diakses oleh setiap UMKM, tanpa hambatan biaya atau teknis.</p>
                </div>
                <div className="bg-gradient-to-br from-purple-900/40 to-slate-900 border border-purple-500/20 rounded-2xl p-6">
                  <Globe2 className="w-10 h-10 text-purple-400 mb-4" />
                  <h3 className="font-bold text-lg mb-2">Visi</h3>
                  <p className="text-sm text-slate-400">Menjadi solusi pembayaran QRIS yang paling ramah untuk usaha kecil di Indonesia.</p>
                </div>
                <div className="col-span-2 bg-gradient-to-br from-green-900/40 to-slate-900 border border-green-500/20 rounded-2xl p-6">
                  <Coffee className="w-10 h-10 text-green-400 mb-4" />
                  <h3 className="font-bold text-lg mb-2">Budaya Kerja</h3>
                  <p className="text-sm text-slate-400">Remote-first, ownership tinggi, dan komunikasi terbuka. Kami percaya hasil kerja lebih penting dari jam kerja di kantor.</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-b from-slate-900/50 to-transparent">
        <div className="container mx-auto px-6">
          <ScrollReveal animation="fadeUp" className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Nilai-Nilai Kami</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">Prinsip sederhana yang memandu cara kami bekerja dan melayani merchant.</p>
          </ScrollReveal>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <ScrollReveal key={index} animation="fadeUp" delay={index * 0.1}>
                <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-6 h-full hover:border-blue-500/30 transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center mb-4">
                    <value.icon className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="font-bold text-lg mb-3">{value.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{value.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-6">
          <ScrollReveal animation="fadeUp" className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Perjalanan Kami</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">Dari ide sederhana hingga hari ini—perjalanan kami baru dimulai.</p>
          </ScrollReveal>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-green-500"></div>
              
              {milestones.map((milestone, index) => (
                <ScrollReveal key={index} animation={index % 2 === 0 ? "fadeLeft" : "fadeRight"} delay={index * 0.1}>
                  <div className={`relative flex items-center gap-8 mb-12 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    <div className={`hidden md:block flex-1 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                      <div className="bg-slate-900/80 border border-white/10 rounded-2xl p-6 inline-block max-w-md">
                        <div className="text-blue-400 font-bold text-sm mb-1">{milestone.year}</div>
                        <h3 className="font-bold text-lg mb-2">{milestone.title}</h3>
                        <p className="text-sm text-slate-400">{milestone.description}</p>
                      </div>
                    </div>
                    
                    <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-3 h-3 bg-blue-500 rounded-full border-4 border-[#020817]"></div>
                    
                    <div className="flex-1 md:hidden pl-12">
                      <div className="bg-slate-900/80 border border-white/10 rounded-2xl p-6">
                        <div className="text-blue-400 font-bold text-sm mb-1">{milestone.year}</div>
                        <h3 className="font-bold text-lg mb-2">{milestone.title}</h3>
                        <p className="text-sm text-slate-400">{milestone.description}</p>
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

      <section className="py-24 bg-gradient-to-b from-transparent via-slate-900/30 to-transparent">
        <div className="container mx-auto px-6">
          <ScrollReveal animation="fadeUp" className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Tim Pendiri</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">Tiga orang biasa dengan tekad luar biasa untuk membantu UMKM Indonesia.</p>
          </ScrollReveal>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {teamMembers.map((member, index) => (
              <ScrollReveal key={index} animation="fadeUp" delay={index * 0.1}>
                <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-6 hover:border-blue-500/30 transition-all hover:translate-y-[-4px] group">
                  <div className="flex flex-col items-center text-center mb-4">
                    <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 ${
                      isFemale(member.name) 
                        ? 'bg-gradient-to-br from-pink-800 to-pink-950' 
                        : 'bg-gradient-to-br from-blue-800 to-blue-950'
                    }`}>
                      <AnonymousProfileSvg className={`w-11 h-11 ${
                        isFemale(member.name) ? 'text-pink-300' : 'text-blue-300'
                      }`} />
                    </div>
                    <h3 className="font-bold text-lg group-hover:text-blue-400 transition-colors">{member.name}</h3>
                    <p className="text-sm text-blue-400">{member.role}</p>
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed text-center">{member.bio}</p>
                  <div className="flex justify-center gap-3 mt-4 pt-4 border-t border-white/5">
                    <SocialButton platform="linkedin" />
                    <SocialButton platform="twitter" />
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
          
          <ScrollReveal animation="fadeUp" delay={0.3} className="text-center mt-10">
            <p className="text-slate-500 text-sm">
              + 5 orang anggota tim lainnya yang bekerja remote dari berbagai kota di Indonesia
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-6">
          <ScrollReveal animation="fadeUp" className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Target & Aspirasi</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">Kami jujur—ini adalah hal-hal yang sedang kami kejar, bukan yang sudah kami capai.</p>
          </ScrollReveal>
          
          <div className="max-w-3xl mx-auto">
            <ScrollReveal animation="fadeUp">
              <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-white/10 rounded-3xl p-8 md:p-10">
                {aspirations.map((item, index) => (
                  <div key={index} className={`flex items-start gap-4 ${index < aspirations.length - 1 ? 'mb-6' : ''}`}>
                    <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center shrink-0">
                      <item.icon className="w-6 h-6 text-amber-400" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-lg">{item.title}</h3>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400">Target</span>
                      </div>
                      <p className="text-slate-400 text-sm">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            <ScrollReveal animation="fadeLeft">
              <div>
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">Cara Kerja Kami</h2>
                <p className="text-slate-400 mb-8">Kami adalah tim remote-first. Tidak ada kantor fisik, tapi kami tetap terhubung dan produktif.</p>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center shrink-0">
                      <Laptop className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">100% Remote</h4>
                      <p className="text-sm text-slate-400">Tim kami tersebar di berbagai kota—Jakarta, Bandung, Surabaya, Yogyakarta, dan lainnya. Kami bekerja dari rumah, kafe, atau coworking space.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center shrink-0">
                      <Users className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Sync Harian</h4>
                      <p className="text-sm text-slate-400">Daily standup singkat via video call untuk memastikan semua orang aligned dan tidak ada blocker.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Hubungi Kami</h4>
                      <p className="text-sm text-slate-400">
                        Email: hello@tecnoqris.id<br />
                        WhatsApp: +62 812-xxxx-xxxx
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
            
            <ScrollReveal animation="fadeRight">
              <div className="bg-gradient-to-br from-blue-900/30 to-slate-900 border border-blue-500/20 rounded-3xl p-8 h-full">
                <h3 className="text-2xl font-bold mb-4">Bergabung dengan Tim Kami</h3>
                <p className="text-slate-400 mb-6">Kami selalu mencari orang-orang yang passionate untuk bergabung dalam misi ini. Sebagai tim kecil, kontribusi setiap orang sangat terasa.</p>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3 text-slate-300">
                    <CheckCircle2 className="w-5 h-5 text-green-400" />
                    <span className="text-sm">Kerja remote dari mana saja di Indonesia</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-300">
                    <CheckCircle2 className="w-5 h-5 text-green-400" />
                    <span className="text-sm">Ownership tinggi—bukan jadi roda kecil di mesin besar</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-300">
                    <CheckCircle2 className="w-5 h-5 text-green-400" />
                    <span className="text-sm">Belajar langsung dari founder dan tim senior</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-300">
                    <CheckCircle2 className="w-5 h-5 text-green-400" />
                    <span className="text-sm">Gaji kompetitif untuk size startup</span>
                  </div>
                </div>
                
                <Link href="/karir">
                  <Button className="w-full bg-white text-black hover:bg-slate-200 rounded-full font-semibold" data-testid="button-karir">
                    Lihat Lowongan <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="py-24 px-6">
        <ScrollReveal animation="fadeUp" className="container mx-auto relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-[3rem] -z-10"></div>
          <div className="bg-[#0f172a] border border-white/10 rounded-[2.5rem] p-12 md:p-20 text-center overflow-hidden relative">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
              Siap Mencoba?
            </h2>
            <p className="text-slate-400 text-lg mb-10 max-w-2xl mx-auto">
              Kami mungkin masih kecil, tapi kami berdedikasi penuh untuk membantu usaha Anda tumbuh dengan pembayaran digital yang mudah.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/dashboard">
                <Button size="lg" className="h-14 px-10 text-lg bg-white text-black hover:bg-slate-200 rounded-full font-bold transition-transform duration-300 hover:scale-105" data-testid="button-daftar">
                  Daftar Gratis
                </Button>
              </Link>
              <Link href="/#pricing">
                <Button size="lg" variant="outline" className="h-14 px-10 text-lg border-white/20 hover:bg-white/5 rounded-full transition-colors duration-300" data-testid="button-harga">
                  Lihat Harga
                </Button>
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <footer className="py-16 border-t border-white/5 bg-[#020817]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-16">
            <div className="col-span-2 lg:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <Logo className="h-8 w-8" />
                <span className="text-xl font-display font-bold">TecnoQris</span>
              </div>
              <p className="text-slate-400 text-sm max-w-xs mb-8">
                Startup kecil dengan misi besar: membuat pembayaran digital dapat diakses oleh setiap UMKM Indonesia.
              </p>
              <SocialMediaIcons />
            </div>
            
            <div>
              <h4 className="font-bold mb-6">Produk</h4>
              <ul className="space-y-4 text-sm text-slate-400">
                <li><Link href="/qr-generator" className="hover:text-blue-400 transition-colors">Generate QRIS</Link></li>
                <li><Link href="/dashboard" className="hover:text-blue-400 transition-colors">Dashboard</Link></li>
                <li><Link href="/transactions" className="hover:text-blue-400 transition-colors">Transaksi</Link></li>
                <li><Link href="/wallets" className="hover:text-blue-400 transition-colors">Wallet</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6">Dokumentasi</h4>
              <ul className="space-y-4 text-sm text-slate-400">
                <li><Link href="/qris-docs" className="hover:text-blue-400 transition-colors">Panduan QRIS</Link></li>
                <li><Link href="/api-docs" className="hover:text-blue-400 transition-colors">Dokumentasi API</Link></li>
                <li><Link href="/api-keys" className="hover:text-blue-400 transition-colors">API Keys</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6">Perusahaan</h4>
              <ul className="space-y-4 text-sm text-slate-400">
                <li><Link href="/tentang" className="hover:text-blue-400 transition-colors">Tentang</Link></li>
                <li><Link href="/blog" className="hover:text-blue-400 transition-colors">Blog</Link></li>
                <li><Link href="/karir" className="hover:text-blue-400 transition-colors">Karir</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
            <p className="text-xs sm:text-sm whitespace-nowrap">&copy; 2023-2025 TecnoQris Inc.</p>
            <div className="flex gap-8">
              <Link href="/privasi" className="hover:text-white">Privasi</Link>
              <Link href="/ketentuan" className="hover:text-white">Ketentuan</Link>
              <Link href="/keamanan" className="hover:text-white">Keamanan</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
