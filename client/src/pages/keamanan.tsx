
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { 
  Shield, 
  Lock, 
  Key, 
  Server, 
  Database, 
  Eye, 
  FileText, 
  Clock, 
  CheckCircle2, 
  AlertTriangle,
  Fingerprint,
  Network,
  HardDrive,
  RefreshCw,
  Bug,
  Users,
  Mail,
  Phone,
  Building2,
  Blocks,
  ShieldCheck,
  Scan,
  Cpu,
  Globe,
  Zap,
  Activity,
  BadgeCheck,
  FileCode,
  Layers
} from "lucide-react";
import { Logo } from "@/components/Logo";
import { ScrollReveal } from "@/components/ScrollReveal";
import { useState, useEffect } from "react";

export default function KeamananPage() {
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

  const tableOfContents = [
    { id: "pendahuluan", title: "1. Pendahuluan Keamanan" },
    { id: "kepatuhan-regulasi", title: "2. Kepatuhan Regulasi" },
    { id: "enkripsi-data", title: "3. Enkripsi dan Perlindungan Data" },
    { id: "distributed-ledger", title: "4. Jejak Audit dan Integritas Transaksi" },
    { id: "identitas-akses", title: "5. Manajemen Identitas dan Akses" },
    { id: "infrastruktur", title: "6. Keamanan Infrastruktur" },
    { id: "monitoring", title: "7. Monitoring dan Respons Insiden" },
    { id: "kelangsungan-bisnis", title: "8. Kelangsungan Bisnis" },
    { id: "pengembangan-aman", title: "9. Pengembangan Perangkat Lunak Aman" },
    { id: "tanggung-jawab-merchant", title: "10. Tanggung Jawab Keamanan Merchant" },
    { id: "sertifikasi", title: "11. Sertifikasi dan Audit" },
    { id: "hubungi-tim-keamanan", title: "12. Hubungi Tim Keamanan" },
  ];

  return (
    <div className="min-h-screen bg-[#020817] text-white overflow-x-hidden font-sans selection:bg-primary/30">
      <nav 
        className={`fixed top-0 w-full z-50 transition-all duration-200 ${scrolled ? "bg-[#020817]/95 border-b border-white/10 py-3" : "bg-transparent py-6"}`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group cursor-pointer" data-testid="link-home">
            <Logo className="h-10 w-10 group-hover:scale-105 transition-transform duration-300 drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
            <span className="text-xl font-display font-bold tracking-tight">TecnoQris</span>
          </Link>
          
          <ul className="hidden md:flex items-center gap-10 text-sm font-medium text-slate-300">
            <li>
              <Link href="/#pricing" className="hover:text-white transition-colors relative group" data-testid="link-pricing">
                Harga
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full"></span>
              </Link>
            </li>
            <li>
              <Link href="/qris-docs" className="hover:text-white transition-colors relative group" data-testid="link-qris-docs">
                Dokumentasi QRIS
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full"></span>
              </Link>
            </li>
            <li>
              <Link href="/api-docs" className="hover:text-white transition-colors relative group" data-testid="link-api-docs">
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

      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/20 via-transparent to-transparent -z-10"></div>
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-gradient-radial from-emerald-500/10 to-transparent blur-3xl -z-10"></div>
        <div className="absolute top-40 right-1/4 w-80 h-80 bg-gradient-radial from-cyan-500/10 to-transparent blur-3xl -z-10"></div>
        
        <div className="absolute inset-0 -z-5 overflow-hidden opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(16, 185, 129, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(16, 185, 129, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
        
        <div className="container mx-auto px-6">
          <ScrollReveal animation="fadeUp" className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-900/30 border border-emerald-500/30 text-xs font-medium text-emerald-300 mb-6">
              <Shield className="w-4 h-4" />
              <span className="tracking-wide uppercase">Keamanan Sistem</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6 leading-tight">
              Keamanan Tingkat <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Enterprise</span>
            </h1>
            <p className="text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed">
              TecnoQris menerapkan standar keamanan tertinggi dengan teknologi enkripsi mutakhir, distributed ledger untuk audit trail, dan kepatuhan penuh terhadap regulasi Bank Indonesia serta standar industri pembayaran internasional.
            </p>
            <div className="flex items-center justify-center gap-6 mt-6 text-sm text-slate-500 flex-wrap">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>Terakhir diperbarui: 1 Desember 2025</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400">PCI DSS Compliant</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-6">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal animation="fadeUp">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-slate-900/50 border border-white/10 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-emerald-400 mb-1">256-bit</div>
                  <div className="text-xs text-slate-400">AES Encryption</div>
                </div>
                <div className="bg-slate-900/50 border border-white/10 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-cyan-400 mb-1">TLS 1.3</div>
                  <div className="text-xs text-slate-400">Transport Security</div>
                </div>
                <div className="bg-slate-900/50 border border-white/10 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-blue-400 mb-1">99.99%</div>
                  <div className="text-xs text-slate-400">Uptime SLA</div>
                </div>
                <div className="bg-slate-900/50 border border-white/10 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-purple-400 mb-1">24/7</div>
                  <div className="text-xs text-slate-400">SOC Monitoring</div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="py-8 border-y border-white/5">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal animation="fadeUp">
              <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-6">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-emerald-400" />
                  Daftar Isi
                </h3>
                <div className="grid md:grid-cols-2 gap-2">
                  {tableOfContents.map((item, index) => (
                    <a 
                      key={index}
                      href={`#${item.id}`}
                      className="text-slate-400 hover:text-emerald-400 transition-colors text-sm py-1"
                      data-testid={`link-toc-${item.id}`}
                    >
                      {item.title}
                    </a>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto space-y-16">
            
            <ScrollReveal animation="fadeUp">
              <div id="pendahuluan" className="scroll-mt-24">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-emerald-400" />
                  </div>
                  <h2 className="text-2xl font-display font-bold">1. Pendahuluan Keamanan</h2>
                </div>
                <div className="space-y-4 text-slate-400 leading-relaxed">
                  <p>
                    Keamanan adalah fondasi utama dari setiap operasi TecnoQris. Sebagai Penyelenggara Jasa Pembayaran (PJP) yang terdaftar dan diawasi oleh Bank Indonesia, kami memahami bahwa kepercayaan Anda terhadap sistem pembayaran bergantung sepenuhnya pada kemampuan kami melindungi data dan transaksi Anda.
                  </p>
                  <p>
                    TecnoQris mengimplementasikan arsitektur keamanan berlapis (defense-in-depth) yang menggabungkan kontrol keamanan fisik, jaringan, aplikasi, dan data. Setiap lapisan dirancang untuk melindungi aset dan informasi sensitif dari berbagai vektor ancaman.
                  </p>
                  <div className="bg-emerald-900/20 border border-emerald-500/30 rounded-xl p-6 mt-6">
                    <h4 className="font-semibold text-white mb-4 flex items-center gap-2">
                      <Layers className="w-5 h-5 text-emerald-400" />
                      Arsitektur Keamanan Berlapis
                    </h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-medium text-white">Lapisan Perimeter</span>
                          <p className="text-sm text-slate-400">Web Application Firewall (WAF), DDoS protection, dan rate limiting</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-medium text-white">Lapisan Jaringan</span>
                          <p className="text-sm text-slate-400">Network segmentation, VPN, dan intrusion detection/prevention</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-medium text-white">Lapisan Aplikasi</span>
                          <p className="text-sm text-slate-400">Input validation, output encoding, dan secure session management</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-medium text-white">Lapisan Data</span>
                          <p className="text-sm text-slate-400">Encryption at rest, encryption in transit, dan data masking</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fadeUp">
              <div id="kepatuhan-regulasi" className="scroll-mt-24">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                    <BadgeCheck className="w-5 h-5 text-blue-400" />
                  </div>
                  <h2 className="text-2xl font-display font-bold">2. Kepatuhan Regulasi</h2>
                </div>
                <div className="space-y-6">
                  <p className="text-slate-400 leading-relaxed">
                    TecnoQris beroperasi dalam kerangka regulasi yang ketat dan mematuhi seluruh ketentuan yang ditetapkan oleh otoritas terkait di Indonesia dan standar industri pembayaran internasional.
                  </p>
                  
                  <div className="grid gap-4">
                    <div className="bg-slate-900/30 border border-white/5 rounded-xl p-6">
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <Building2 className="w-5 h-5 text-blue-400" />
                        Regulasi Bank Indonesia
                      </h4>
                      <div className="space-y-3 text-sm text-slate-400">
                        <p>
                          <strong className="text-white">PADG No. 21/18/PADG/2019</strong> - Implementasi Standar Nasional Quick Response Code untuk Pembayaran (QRIS). TecnoQris terdaftar sebagai Penyedia Jasa Pembayaran yang berwenang menerbitkan dan mengakuisisi QRIS.
                        </p>
                        <p>
                          <strong className="text-white">PBI No. 23/6/PBI/2021</strong> - Penyedia Jasa Pembayaran. TecnoQris memenuhi seluruh persyaratan modal, tata kelola, manajemen risiko, dan perlindungan konsumen yang diwajibkan.
                        </p>
                        <p>
                          <strong className="text-white">PBI No. 22/20/PBI/2020</strong> - Perlindungan Konsumen Bank Indonesia. Kami menerapkan mekanisme penanganan pengaduan, transparansi informasi, dan perlindungan data nasabah sesuai ketentuan.
                        </p>
                      </div>
                    </div>

                    <div className="bg-slate-900/30 border border-white/5 rounded-xl p-6">
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <ShieldCheck className="w-5 h-5 text-emerald-400" />
                        Standar Keamanan Industri Pembayaran
                      </h4>
                      <div className="space-y-3 text-sm text-slate-400">
                        <p>
                          TecnoQris menerapkan praktik keamanan yang mengacu pada standar industri pembayaran, termasuk prinsip-prinsip PCI DSS (Payment Card Industry Data Security Standard) sebagai panduan dalam membangun sistem yang aman.
                        </p>
                        <div className="grid md:grid-cols-2 gap-3 mt-4">
                          <div className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                            <span>Jaringan yang aman dan terlindungi</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                            <span>Perlindungan data transaksi</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                            <span>Manajemen kerentanan berkelanjutan</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                            <span>Kontrol akses yang ketat</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                            <span>Monitoring dan pengujian jaringan</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                            <span>Kebijakan keamanan informasi</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-slate-900/30 border border-white/5 rounded-xl p-6">
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <Eye className="w-5 h-5 text-purple-400" />
                        Anti Pencucian Uang dan Pencegahan Pendanaan Terorisme (AML/CFT)
                      </h4>
                      <div className="space-y-3 text-sm text-slate-400">
                        <p>
                          TecnoQris menerapkan program Anti Pencucian Uang dan Pencegahan Pendanaan Terorisme yang komprehensif sesuai dengan POJK No. 12/POJK.01/2017 dan Peraturan Bank Indonesia terkait.
                        </p>
                        <ul className="space-y-2 mt-3">
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                            <span><strong className="text-white">Customer Due Diligence (CDD)</strong> - Verifikasi identitas merchant sebelum pembukaan akun</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                            <span><strong className="text-white">Enhanced Due Diligence (EDD)</strong> - Pemeriksaan tambahan untuk merchant berisiko tinggi</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                            <span><strong className="text-white">Transaction Monitoring</strong> - Pemantauan transaksi real-time untuk mendeteksi aktivitas mencurigakan</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                            <span><strong className="text-white">Suspicious Transaction Reporting (STR)</strong> - Pelaporan kepada PPATK sesuai ketentuan</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="bg-slate-900/30 border border-white/5 rounded-xl p-6">
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <Database className="w-5 h-5 text-cyan-400" />
                        Perlindungan Data Pribadi
                      </h4>
                      <div className="text-sm text-slate-400">
                        <p>
                          TecnoQris mematuhi Undang-Undang No. 27 Tahun 2022 tentang Perlindungan Data Pribadi (UU PDP) Indonesia. Kami menerapkan prinsip-prinsip perlindungan data pribadi termasuk pembatasan pengumpulan, akurasi data, pembatasan penyimpanan, integritas dan kerahasiaan, serta akuntabilitas.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fadeUp">
              <div id="enkripsi-data" className="scroll-mt-24">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                    <Lock className="w-5 h-5 text-cyan-400" />
                  </div>
                  <h2 className="text-2xl font-display font-bold">3. Enkripsi dan Perlindungan Data</h2>
                </div>
                <div className="space-y-6">
                  <p className="text-slate-400 leading-relaxed">
                    TecnoQris mengimplementasikan enkripsi tingkat militer untuk melindungi seluruh data sensitif, baik saat disimpan (at rest) maupun saat ditransmisikan (in transit).
                  </p>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-slate-900/30 border border-white/5 rounded-xl p-5">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                          <HardDrive className="w-4 h-4 text-cyan-400" />
                        </div>
                        <h4 className="font-semibold">Enkripsi At Rest</h4>
                      </div>
                      <div className="text-sm text-slate-400 space-y-2">
                        <p><strong className="text-white">AES-256-GCM</strong> untuk semua data tersimpan di database</p>
                        <p><strong className="text-white">Hardware Security Module (HSM)</strong> untuk manajemen kunci kriptografi</p>
                        <p><strong className="text-white">Envelope Encryption</strong> dengan rotasi kunci otomatis setiap 90 hari</p>
                      </div>
                    </div>
                    <div className="bg-slate-900/30 border border-white/5 rounded-xl p-5">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                          <Network className="w-4 h-4 text-emerald-400" />
                        </div>
                        <h4 className="font-semibold">Enkripsi In Transit</h4>
                      </div>
                      <div className="text-sm text-slate-400 space-y-2">
                        <p><strong className="text-white">TLS 1.3</strong> untuk seluruh komunikasi jaringan</p>
                        <p><strong className="text-white">Perfect Forward Secrecy (PFS)</strong> untuk mencegah dekripsi retroaktif</p>
                        <p><strong className="text-white">Certificate Pinning</strong> untuk aplikasi mobile dan integrasi API</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-900/30 border border-white/5 rounded-xl p-6">
                    <h4 className="font-semibold mb-4 flex items-center gap-2">
                      <Key className="w-5 h-5 text-amber-400" />
                      Perlindungan Data Merchant
                    </h4>
                    <p className="text-sm text-slate-400 mb-4">
                      TecnoQris melindungi data sensitif merchant dengan teknik masking dan penyimpanan terenkripsi. Data sensitif diproses secara aman dan tidak pernah terekspos dalam bentuk plaintext di log atau sistem monitoring.
                    </p>
                    <div className="mt-4 grid md:grid-cols-3 gap-3 text-sm">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="text-slate-400">Nomor rekening merchant (masked)</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="text-slate-400">Dokumen identitas terenkripsi</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="text-slate-400">API credentials tersimpan aman</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-900/30 border border-white/5 rounded-xl p-6">
                    <h4 className="font-semibold mb-4 flex items-center gap-2">
                      <Scan className="w-5 h-5 text-blue-400" />
                      Keamanan QR Code QRIS
                    </h4>
                    <p className="text-sm text-slate-400 mb-4">
                      Kode QR yang dihasilkan TecnoQris mengikuti standar QRIS Bank Indonesia berdasarkan spesifikasi EMVCo Merchant-Presented QR. Payload QRIS berisi Merchant ID, Acquirer ID, dan informasi transaksi sesuai format standar nasional.
                    </p>
                    <ul className="space-y-2 text-sm text-slate-400">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                        <span><strong className="text-white">Standar QRIS Nasional</strong> - Mengikuti format QR Code sesuai ketentuan Bank Indonesia</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                        <span><strong className="text-white">QR Dinamis</strong> - Untuk transaksi dengan nominal spesifik dan masa berlaku terbatas</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                        <span><strong className="text-white">CRC-16 Checksum</strong> - Validasi integritas data QR code sesuai standar EMVCo</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fadeUp">
              <div id="distributed-ledger" className="scroll-mt-24">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                    <Blocks className="w-5 h-5 text-purple-400" />
                  </div>
                  <h2 className="text-2xl font-display font-bold">4. Jejak Audit dan Integritas Transaksi</h2>
                </div>
                <div className="space-y-6">
                  <p className="text-slate-400 leading-relaxed">
                    TecnoQris menerapkan sistem pencatatan transaksi yang komprehensif untuk memastikan setiap transaksi dapat dilacak, diverifikasi, dan diaudit. Sistem audit trail kami dirancang untuk memenuhi persyaratan regulasi Bank Indonesia dan mendukung proses rekonsiliasi yang akurat.
                  </p>

                  <div className="bg-gradient-to-r from-purple-900/30 to-cyan-900/30 border border-purple-500/20 rounded-2xl p-6 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10" style={{
                      backgroundImage: `
                        linear-gradient(rgba(139, 92, 246, 0.3) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)
                      `,
                      backgroundSize: '20px 20px'
                    }}></div>
                    <div className="relative">
                      <h4 className="font-semibold mb-4 flex items-center gap-2">
                        <Blocks className="w-5 h-5 text-purple-400" />
                        Sistem Pencatatan Transaksi
                      </h4>
                      <p className="text-sm text-slate-400 mb-6">
                        Setiap transaksi dicatat dengan timestamp yang akurat, ID unik, dan informasi lengkap untuk keperluan audit dan rekonsiliasi dengan sistem switching QRIS nasional.
                      </p>
                      
                      <div className="flex flex-col md:flex-row items-center gap-4 overflow-x-auto pb-4">
                        <div className="bg-slate-800/80 rounded-lg p-4 min-w-[200px] border border-purple-500/30">
                          <div className="text-xs text-slate-500 mb-1">Transaksi #1</div>
                          <div className="font-mono text-xs text-purple-400 truncate">ID: TXN-20251201-001</div>
                          <div className="text-xs text-slate-400 mt-2">Status: Completed</div>
                        </div>
                        <div className="text-purple-400 text-2xl">→</div>
                        <div className="bg-slate-800/80 rounded-lg p-4 min-w-[200px] border border-cyan-500/30">
                          <div className="text-xs text-slate-500 mb-1">Transaksi #2</div>
                          <div className="font-mono text-xs text-cyan-400 truncate">ID: TXN-20251201-002</div>
                          <div className="text-xs text-slate-400 mt-2">Status: Completed</div>
                        </div>
                        <div className="text-cyan-400 text-2xl">→</div>
                        <div className="bg-slate-800/80 rounded-lg p-4 min-w-[200px] border border-emerald-500/30">
                          <div className="text-xs text-slate-500 mb-1">Transaksi #3</div>
                          <div className="font-mono text-xs text-emerald-400 truncate">ID: TXN-20251201-003</div>
                          <div className="text-xs text-slate-400 mt-2">Status: Completed</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-slate-900/30 border border-white/5 rounded-xl p-5">
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <Server className="w-5 h-5 text-purple-400" />
                        Database Redundan
                      </h4>
                      <p className="text-sm text-slate-400">
                        Data transaksi direplikasi ke beberapa database server untuk memastikan ketersediaan tinggi dan pemulihan bencana yang cepat.
                      </p>
                      <ul className="mt-3 space-y-2 text-sm text-slate-400">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                          <span>Replikasi database real-time</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                          <span>Backup otomatis setiap jam</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                          <span>Point-in-time recovery</span>
                        </li>
                      </ul>
                    </div>
                    <div className="bg-slate-900/30 border border-white/5 rounded-xl p-5">
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <FileCode className="w-5 h-5 text-cyan-400" />
                        Rekonsiliasi Otomatis
                      </h4>
                      <p className="text-sm text-slate-400">
                        Sistem rekonsiliasi otomatis memastikan kesesuaian data antara TecnoQris dengan switching QRIS nasional dan bank settlement.
                      </p>
                      <ul className="mt-3 space-y-2 text-sm text-slate-400">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                          <span>Rekonsiliasi harian dengan switching</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                          <span>Deteksi selisih otomatis</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                          <span>Laporan rekonsiliasi ke BI</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-slate-900/30 border border-white/5 rounded-xl p-6">
                    <h4 className="font-semibold mb-4 flex items-center gap-2">
                      <Fingerprint className="w-5 h-5 text-amber-400" />
                      Integritas dan Non-Repudiation
                    </h4>
                    <p className="text-sm text-slate-400 mb-4">
                      Setiap catatan transaksi dilengkapi dengan informasi yang memastikan integritas data dan mencegah penyangkalan, sesuai dengan standar audit keuangan.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div className="bg-slate-800/50 rounded-lg p-4">
                        <div className="text-slate-500 mb-2">Timestamp</div>
                        <div className="font-mono text-emerald-400">ISO 8601 dengan timezone</div>
                      </div>
                      <div className="bg-slate-800/50 rounded-lg p-4">
                        <div className="text-slate-500 mb-2">Reference Number</div>
                        <div className="font-mono text-cyan-400">Sesuai standar switching BI</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-900/20 border border-blue-500/30 rounded-xl p-6">
                    <div className="flex items-start gap-3">
                      <Database className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-slate-300 text-sm">
                          <strong>Settlement dan Kliring:</strong> Seluruh proses settlement transaksi QRIS dilakukan melalui sistem switching nasional yang dikelola oleh Bank Indonesia. TecnoQris melakukan rekonsiliasi harian dengan laporan yang dikirimkan ke regulator sesuai ketentuan yang berlaku.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fadeUp">
              <div id="identitas-akses" className="scroll-mt-24">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center">
                    <Users className="w-5 h-5 text-orange-400" />
                  </div>
                  <h2 className="text-2xl font-display font-bold">5. Manajemen Identitas dan Akses</h2>
                </div>
                <div className="space-y-6">
                  <p className="text-slate-400 leading-relaxed">
                    TecnoQris menerapkan prinsip Zero Trust dan Least Privilege dalam seluruh sistem untuk memastikan hanya entitas yang berwenang dapat mengakses sumber daya yang diperlukan.
                  </p>

                  <div className="grid gap-4">
                    <div className="bg-slate-900/30 border border-white/5 rounded-xl p-6">
                      <h4 className="font-semibold mb-4">Autentikasi Multi-Faktor (MFA)</h4>
                      <p className="text-sm text-slate-400 mb-4">
                        Seluruh akses ke dashboard merchant dan sistem internal TecnoQris dilindungi dengan autentikasi multi-faktor.
                      </p>
                      <div className="grid md:grid-cols-3 gap-3">
                        <div className="bg-slate-800/50 rounded-lg p-4 text-center">
                          <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-2">
                            <Key className="w-5 h-5 text-blue-400" />
                          </div>
                          <div className="text-sm font-medium">Faktor 1</div>
                          <div className="text-xs text-slate-400">Password</div>
                        </div>
                        <div className="bg-slate-800/50 rounded-lg p-4 text-center">
                          <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-2">
                            <Fingerprint className="w-5 h-5 text-emerald-400" />
                          </div>
                          <div className="text-sm font-medium">Faktor 2</div>
                          <div className="text-xs text-slate-400">TOTP/SMS OTP</div>
                        </div>
                        <div className="bg-slate-800/50 rounded-lg p-4 text-center">
                          <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center mx-auto mb-2">
                            <Cpu className="w-5 h-5 text-purple-400" />
                          </div>
                          <div className="text-sm font-medium">Faktor 3</div>
                          <div className="text-xs text-slate-400">Device Trust</div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-slate-900/30 border border-white/5 rounded-xl p-6">
                      <h4 className="font-semibold mb-4">Role-Based Access Control (RBAC)</h4>
                      <p className="text-sm text-slate-400 mb-4">
                        Akses ke sistem TecnoQris dikelola berdasarkan peran dengan izin granular untuk setiap fungsi.
                      </p>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b border-white/10">
                              <th className="text-left py-2 px-3 font-semibold">Peran</th>
                              <th className="text-left py-2 px-3 font-semibold">Akses</th>
                            </tr>
                          </thead>
                          <tbody className="text-slate-400">
                            <tr className="border-b border-white/5">
                              <td className="py-2 px-3 font-medium text-white">Owner</td>
                              <td className="py-2 px-3">Akses penuh termasuk settlement dan API keys</td>
                            </tr>
                            <tr className="border-b border-white/5">
                              <td className="py-2 px-3 font-medium text-white">Admin</td>
                              <td className="py-2 px-3">Manajemen transaksi, laporan, dan pengaturan</td>
                            </tr>
                            <tr className="border-b border-white/5">
                              <td className="py-2 px-3 font-medium text-white">Operator</td>
                              <td className="py-2 px-3">Pembuatan QR dan monitoring transaksi</td>
                            </tr>
                            <tr>
                              <td className="py-2 px-3 font-medium text-white">Viewer</td>
                              <td className="py-2 px-3">Hanya melihat laporan dan analitik</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div className="bg-slate-900/30 border border-white/5 rounded-xl p-6">
                      <h4 className="font-semibold mb-4">API Key Security</h4>
                      <p className="text-sm text-slate-400 mb-4">
                        API key merchant dikelola dengan standar keamanan tinggi untuk mencegah penyalahgunaan.
                      </p>
                      <ul className="space-y-2 text-sm text-slate-400">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span><strong className="text-white">Key Rotation</strong> - Rotasi API key berkala dan on-demand</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span><strong className="text-white">IP Whitelist</strong> - Pembatasan akses API berdasarkan IP address</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span><strong className="text-white">Scope Limitation</strong> - API key dengan izin terbatas sesuai kebutuhan</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span><strong className="text-white">Expiration Policy</strong> - Masa berlaku API key maksimal 1 tahun</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fadeUp">
              <div id="infrastruktur" className="scroll-mt-24">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-indigo-500/20 flex items-center justify-center">
                    <Server className="w-5 h-5 text-indigo-400" />
                  </div>
                  <h2 className="text-2xl font-display font-bold">6. Keamanan Infrastruktur</h2>
                </div>
                <div className="space-y-6">
                  <p className="text-slate-400 leading-relaxed">
                    Infrastruktur TecnoQris dibangun dengan prinsip security-by-design, menggunakan arsitektur cloud-native yang aman dan skalabel.
                  </p>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-slate-900/30 border border-white/5 rounded-xl p-5">
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <Globe className="w-5 h-5 text-indigo-400" />
                        Network Security
                      </h4>
                      <ul className="space-y-2 text-sm text-slate-400">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                          <span>Virtual Private Cloud (VPC) dengan segmentasi jaringan</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                          <span>Web Application Firewall (WAF) dengan rule kustom</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                          <span>DDoS protection dengan mitigasi otomatis</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                          <span>Intrusion Detection/Prevention System (IDS/IPS)</span>
                        </li>
                      </ul>
                    </div>
                    <div className="bg-slate-900/30 border border-white/5 rounded-xl p-5">
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <Zap className="w-5 h-5 text-amber-400" />
                        API Protection
                      </h4>
                      <ul className="space-y-2 text-sm text-slate-400">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                          <span>Rate limiting: 100 req/min untuk standar, 1000 req/min untuk enterprise</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                          <span>Request validation dan sanitization</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                          <span>HMAC signature untuk webhook verification</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                          <span>Idempotency key untuk mencegah duplikasi</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-slate-900/30 border border-white/5 rounded-xl p-6">
                    <h4 className="font-semibold mb-4 flex items-center gap-2">
                      <HardDrive className="w-5 h-5 text-cyan-400" />
                      Data Center dan Physical Security
                    </h4>
                    <p className="text-sm text-slate-400 mb-4">
                      TecnoQris menggunakan data center Tier III+ dengan sertifikasi keamanan internasional.
                    </p>
                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                      <div className="bg-slate-800/50 rounded-lg p-4">
                        <div className="text-cyan-400 font-semibold mb-2">ISO 27001</div>
                        <div className="text-slate-400">Information Security Management</div>
                      </div>
                      <div className="bg-slate-800/50 rounded-lg p-4">
                        <div className="text-emerald-400 font-semibold mb-2">SOC 2 Type II</div>
                        <div className="text-slate-400">Service Organization Control</div>
                      </div>
                      <div className="bg-slate-800/50 rounded-lg p-4">
                        <div className="text-purple-400 font-semibold mb-2">Tier III+</div>
                        <div className="text-slate-400">Uptime Institute Certification</div>
                      </div>
                    </div>
                    <ul className="mt-4 space-y-2 text-sm text-slate-400">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <span>Akses biometrik dan kartu identitas untuk personel</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <span>CCTV 24/7 dengan penyimpanan 90 hari</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <span>Redundant power dan cooling system</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fadeUp">
              <div id="monitoring" className="scroll-mt-24">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-pink-500/20 flex items-center justify-center">
                    <Activity className="w-5 h-5 text-pink-400" />
                  </div>
                  <h2 className="text-2xl font-display font-bold">7. Monitoring dan Respons Insiden</h2>
                </div>
                <div className="space-y-6">
                  <p className="text-slate-400 leading-relaxed">
                    TecnoQris mengoperasikan Security Operations Center (SOC) yang memantau seluruh sistem 24/7 untuk mendeteksi dan merespons ancaman keamanan secara real-time.
                  </p>

                  <div className="bg-slate-900/30 border border-white/5 rounded-xl p-6">
                    <h4 className="font-semibold mb-4 flex items-center gap-2">
                      <Eye className="w-5 h-5 text-pink-400" />
                      Security Information and Event Management (SIEM)
                    </h4>
                    <p className="text-sm text-slate-400 mb-4">
                      Seluruh log dan event dari sistem TecnoQris dikumpulkan dan dianalisis secara terpusat untuk mendeteksi anomali dan potensi ancaman.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="text-sm font-medium mb-2">Log yang Dipantau:</h5>
                        <ul className="space-y-1 text-sm text-slate-400">
                          <li>• Application logs</li>
                          <li>• Authentication logs</li>
                          <li>• API access logs</li>
                          <li>• Network flow logs</li>
                          <li>• Database query logs</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="text-sm font-medium mb-2">Alert Triggers:</h5>
                        <ul className="space-y-1 text-sm text-slate-400">
                          <li>• Failed login attempts (&gt;5/min)</li>
                          <li>• Unusual transaction patterns</li>
                          <li>• API abuse detection</li>
                          <li>• Privilege escalation attempts</li>
                          <li>• Data exfiltration indicators</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-900/30 border border-white/5 rounded-xl p-6">
                    <h4 className="font-semibold mb-4 flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-amber-400" />
                      Incident Response Plan
                    </h4>
                    <p className="text-sm text-slate-400 mb-4">
                      TecnoQris memiliki prosedur respons insiden yang terdokumentasi dan diuji secara berkala.
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <div className="bg-slate-800/50 rounded-lg p-3 text-center">
                        <div className="text-2xl font-bold text-red-400">P1</div>
                        <div className="text-xs text-slate-400 mt-1">Critical</div>
                        <div className="text-xs text-slate-500">Response: 15 min</div>
                      </div>
                      <div className="bg-slate-800/50 rounded-lg p-3 text-center">
                        <div className="text-2xl font-bold text-orange-400">P2</div>
                        <div className="text-xs text-slate-400 mt-1">High</div>
                        <div className="text-xs text-slate-500">Response: 1 hour</div>
                      </div>
                      <div className="bg-slate-800/50 rounded-lg p-3 text-center">
                        <div className="text-2xl font-bold text-amber-400">P3</div>
                        <div className="text-xs text-slate-400 mt-1">Medium</div>
                        <div className="text-xs text-slate-500">Response: 4 hours</div>
                      </div>
                      <div className="bg-slate-800/50 rounded-lg p-3 text-center">
                        <div className="text-2xl font-bold text-blue-400">P4</div>
                        <div className="text-xs text-slate-400 mt-1">Low</div>
                        <div className="text-xs text-slate-500">Response: 24 hours</div>
                      </div>
                    </div>
                    <div className="mt-4 text-sm text-slate-400">
                      <p>Tahapan respons insiden: <strong className="text-white">Identification → Containment → Eradication → Recovery → Lessons Learned</strong></p>
                    </div>
                  </div>

                  <div className="bg-slate-900/30 border border-white/5 rounded-xl p-6">
                    <h4 className="font-semibold mb-4">Pelaporan Insiden ke Regulator</h4>
                    <p className="text-sm text-slate-400">
                      Sesuai ketentuan Bank Indonesia, TecnoQris wajib melaporkan insiden keamanan signifikan dalam waktu yang ditentukan:
                    </p>
                    <ul className="mt-3 space-y-2 text-sm text-slate-400">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-pink-400 shrink-0 mt-0.5" />
                        <span><strong className="text-white">Laporan Awal:</strong> Maksimal 1x24 jam setelah insiden terdeteksi</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-pink-400 shrink-0 mt-0.5" />
                        <span><strong className="text-white">Laporan Investigasi:</strong> Maksimal 14 hari kerja setelah insiden</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-pink-400 shrink-0 mt-0.5" />
                        <span><strong className="text-white">Laporan Akhir:</strong> Maksimal 30 hari kerja dengan root cause analysis</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fadeUp">
              <div id="kelangsungan-bisnis" className="scroll-mt-24">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-teal-500/20 flex items-center justify-center">
                    <RefreshCw className="w-5 h-5 text-teal-400" />
                  </div>
                  <h2 className="text-2xl font-display font-bold">8. Kelangsungan Bisnis</h2>
                </div>
                <div className="space-y-6">
                  <p className="text-slate-400 leading-relaxed">
                    TecnoQris memiliki Business Continuity Plan (BCP) dan Disaster Recovery Plan (DRP) yang komprehensif untuk memastikan layanan tetap tersedia dalam kondisi darurat.
                  </p>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-slate-900/30 border border-white/5 rounded-xl p-5">
                      <h4 className="font-semibold mb-3">Recovery Time Objective (RTO)</h4>
                      <div className="text-3xl font-bold text-teal-400 mb-2">&lt; 4 jam</div>
                      <p className="text-sm text-slate-400">
                        Waktu maksimal untuk memulihkan layanan setelah gangguan besar
                      </p>
                    </div>
                    <div className="bg-slate-900/30 border border-white/5 rounded-xl p-5">
                      <h4 className="font-semibold mb-3">Recovery Point Objective (RPO)</h4>
                      <div className="text-3xl font-bold text-cyan-400 mb-2">&lt; 1 jam</div>
                      <p className="text-sm text-slate-400">
                        Toleransi kehilangan data maksimal (backup setiap 1 jam)
                      </p>
                    </div>
                  </div>

                  <div className="bg-slate-900/30 border border-white/5 rounded-xl p-6">
                    <h4 className="font-semibold mb-4">Strategi Disaster Recovery</h4>
                    <ul className="space-y-3 text-sm text-slate-400">
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-medium text-white">Multi-Region Deployment</span>
                          <p>Infrastruktur aktif di multiple availability zones untuk failover otomatis</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-medium text-white">Database Replication</span>
                          <p>Replikasi sinkron ke standby database dengan automatic failover</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-medium text-white">Backup Strategy</span>
                          <p>Full backup harian, incremental backup setiap jam, dengan retensi 90 hari</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-medium text-white">DR Testing</span>
                          <p>Pengujian disaster recovery setiap kuartal dengan simulasi failover</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fadeUp">
              <div id="pengembangan-aman" className="scroll-mt-24">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-violet-500/20 flex items-center justify-center">
                    <Bug className="w-5 h-5 text-violet-400" />
                  </div>
                  <h2 className="text-2xl font-display font-bold">9. Pengembangan Perangkat Lunak Aman</h2>
                </div>
                <div className="space-y-6">
                  <p className="text-slate-400 leading-relaxed">
                    TecnoQris menerapkan Secure Software Development Lifecycle (SSDLC) untuk memastikan keamanan terintegrasi dalam setiap tahap pengembangan.
                  </p>

                  <div className="bg-slate-900/30 border border-white/5 rounded-xl p-6">
                    <h4 className="font-semibold mb-4">Security Testing Pipeline</h4>
                    <div className="flex flex-col md:flex-row gap-4 items-stretch">
                      <div className="flex-1 bg-slate-800/50 rounded-lg p-4">
                        <div className="text-violet-400 font-semibold mb-2">SAST</div>
                        <div className="text-xs text-slate-400">Static Application Security Testing</div>
                        <p className="text-xs text-slate-500 mt-2">Analisis kode sumber untuk mendeteksi kerentanan sebelum deployment</p>
                      </div>
                      <div className="flex-1 bg-slate-800/50 rounded-lg p-4">
                        <div className="text-cyan-400 font-semibold mb-2">DAST</div>
                        <div className="text-xs text-slate-400">Dynamic Application Security Testing</div>
                        <p className="text-xs text-slate-500 mt-2">Pengujian aplikasi berjalan untuk menemukan kerentanan runtime</p>
                      </div>
                      <div className="flex-1 bg-slate-800/50 rounded-lg p-4">
                        <div className="text-emerald-400 font-semibold mb-2">SCA</div>
                        <div className="text-xs text-slate-400">Software Composition Analysis</div>
                        <p className="text-xs text-slate-500 mt-2">Pemeriksaan dependensi pihak ketiga untuk kerentanan yang diketahui</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-slate-900/30 border border-white/5 rounded-xl p-5">
                      <h4 className="font-semibold mb-3">Penetration Testing</h4>
                      <p className="text-sm text-slate-400 mb-3">
                        TecnoQris melakukan penetration testing secara berkala oleh pihak ketiga independen.
                      </p>
                      <ul className="space-y-2 text-sm text-slate-400">
                        <li>• External pentest: 2x per tahun</li>
                        <li>• Internal pentest: 1x per tahun</li>
                        <li>• Red team exercise: 1x per tahun</li>
                      </ul>
                    </div>
                    <div className="bg-slate-900/30 border border-white/5 rounded-xl p-5">
                      <h4 className="font-semibold mb-3">Vulnerability Disclosure</h4>
                      <p className="text-sm text-slate-400 mb-3">
                        Kami menyambut laporan kerentanan dari peneliti keamanan yang bertanggung jawab.
                      </p>
                      <div className="bg-violet-900/20 border border-violet-500/30 rounded-lg p-3">
                        <p className="text-xs text-slate-300">
                          Laporkan kerentanan ke: <span className="text-violet-400">security@tecnoqris.id</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fadeUp">
              <div id="tanggung-jawab-merchant" className="scroll-mt-24">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-rose-500/20 flex items-center justify-center">
                    <Users className="w-5 h-5 text-rose-400" />
                  </div>
                  <h2 className="text-2xl font-display font-bold">10. Tanggung Jawab Keamanan Merchant</h2>
                </div>
                <div className="space-y-6">
                  <p className="text-slate-400 leading-relaxed">
                    Keamanan adalah tanggung jawab bersama. Sebagai merchant TecnoQris, Anda berperan penting dalam menjaga keamanan akun dan transaksi Anda.
                  </p>

                  <div className="grid gap-4">
                    <div className="bg-slate-900/30 border border-white/5 rounded-xl p-5 flex items-start gap-4">
                      <div className="w-8 h-8 rounded-lg bg-rose-500/20 flex items-center justify-center shrink-0">
                        <Key className="w-4 h-4 text-rose-400" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Pengelolaan API Key</h4>
                        <ul className="space-y-1 text-sm text-slate-400">
                          <li>• Simpan API key di environment variable, bukan hardcode di source code</li>
                          <li>• Jangan membagikan API key kepada pihak yang tidak berwenang</li>
                          <li>• Rotasi API key secara berkala (minimal setiap 6 bulan)</li>
                          <li>• Segera regenerate API key jika dicurigai telah terekspos</li>
                        </ul>
                      </div>
                    </div>

                    <div className="bg-slate-900/30 border border-white/5 rounded-xl p-5 flex items-start gap-4">
                      <div className="w-8 h-8 rounded-lg bg-rose-500/20 flex items-center justify-center shrink-0">
                        <Globe className="w-4 h-4 text-rose-400" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Validasi Webhook</h4>
                        <ul className="space-y-1 text-sm text-slate-400">
                          <li>• Selalu validasi signature webhook sebelum memproses notifikasi</li>
                          <li>• Gunakan HTTPS untuk endpoint webhook</li>
                          <li>• Implementasikan idempotency handling untuk mencegah duplikasi</li>
                          <li>• Respon webhook dengan HTTP 200 dalam 30 detik</li>
                        </ul>
                      </div>
                    </div>

                    <div className="bg-slate-900/30 border border-white/5 rounded-xl p-5 flex items-start gap-4">
                      <div className="w-8 h-8 rounded-lg bg-rose-500/20 flex items-center justify-center shrink-0">
                        <Lock className="w-4 h-4 text-rose-400" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Keamanan Akun</h4>
                        <ul className="space-y-1 text-sm text-slate-400">
                          <li>• Aktifkan autentikasi dua faktor (2FA) untuk semua user</li>
                          <li>• Gunakan password yang kuat dan unik</li>
                          <li>• Review akses user secara berkala dan nonaktifkan yang tidak diperlukan</li>
                          <li>• Logout dari sesi yang tidak digunakan</li>
                        </ul>
                      </div>
                    </div>

                    <div className="bg-slate-900/30 border border-white/5 rounded-xl p-5 flex items-start gap-4">
                      <div className="w-8 h-8 rounded-lg bg-rose-500/20 flex items-center justify-center shrink-0">
                        <Scan className="w-4 h-4 text-rose-400" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Keamanan QRIS</h4>
                        <ul className="space-y-1 text-sm text-slate-400">
                          <li>• Jangan memodifikasi QR code yang dihasilkan TecnoQris</li>
                          <li>• Gunakan QR dinamis untuk transaksi dengan nominal tetap</li>
                          <li>• Verifikasi pembayaran melalui notifikasi resmi, bukan screenshot pembeli</li>
                          <li>• Laporkan segera jika menemukan QR code palsu mengatasnamakan merchant Anda</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fadeUp">
              <div id="sertifikasi" className="scroll-mt-24">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
                    <BadgeCheck className="w-5 h-5 text-amber-400" />
                  </div>
                  <h2 className="text-2xl font-display font-bold">11. Standar Keamanan dan Audit</h2>
                </div>
                <div className="space-y-6">
                  <p className="text-slate-400 leading-relaxed">
                    TecnoQris berkomitmen untuk menerapkan standar keamanan terbaik dan secara rutin menjalani pengujian keamanan untuk memvalidasi efektivitas kontrol keamanan kami.
                  </p>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-gradient-to-br from-amber-900/30 to-orange-900/30 border border-amber-500/20 rounded-xl p-5">
                      <div className="flex items-center gap-3 mb-3">
                        <Building2 className="w-8 h-8 text-amber-400" />
                        <div>
                          <div className="font-semibold">Bank Indonesia</div>
                          <div className="text-xs text-slate-400">Penyelenggara Jasa Pembayaran</div>
                        </div>
                      </div>
                      <p className="text-sm text-slate-400">
                        Terdaftar dan diawasi sebagai Penyelenggara Jasa Pembayaran (PJP) oleh Bank Indonesia sesuai ketentuan yang berlaku.
                      </p>
                    </div>
                    <div className="bg-gradient-to-br from-emerald-900/30 to-cyan-900/30 border border-emerald-500/20 rounded-xl p-5">
                      <div className="flex items-center gap-3 mb-3">
                        <ShieldCheck className="w-8 h-8 text-emerald-400" />
                        <div>
                          <div className="font-semibold">Standar QRIS Nasional</div>
                          <div className="text-xs text-slate-400">Quick Response Indonesian Standard</div>
                        </div>
                      </div>
                      <p className="text-sm text-slate-400">
                        Memenuhi standar teknis dan keamanan QRIS yang ditetapkan oleh Bank Indonesia.
                      </p>
                    </div>
                    <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 border border-blue-500/20 rounded-xl p-5">
                      <div className="flex items-center gap-3 mb-3">
                        <BadgeCheck className="w-8 h-8 text-blue-400" />
                        <div>
                          <div className="font-semibold">Praktik Keamanan Industri</div>
                          <div className="text-xs text-slate-400">Best Practices</div>
                        </div>
                      </div>
                      <p className="text-sm text-slate-400">
                        Menerapkan praktik keamanan yang mengacu pada standar industri pembayaran seperti PCI DSS dan ISO 27001.
                      </p>
                    </div>
                    <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border border-purple-500/20 rounded-xl p-5">
                      <div className="flex items-center gap-3 mb-3">
                        <Shield className="w-8 h-8 text-purple-400" />
                        <div>
                          <div className="font-semibold">Pengujian Keamanan</div>
                          <div className="text-xs text-slate-400">Security Testing</div>
                        </div>
                      </div>
                      <p className="text-sm text-slate-400">
                        Pengujian keamanan berkala oleh tim internal dan konsultan keamanan eksternal.
                      </p>
                    </div>
                  </div>

                  <div className="bg-slate-900/30 border border-white/5 rounded-xl p-6">
                    <h4 className="font-semibold mb-4">Program Pengujian Keamanan</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-white/10">
                            <th className="text-left py-2 px-3 font-semibold">Jenis Pengujian</th>
                            <th className="text-left py-2 px-3 font-semibold">Frekuensi</th>
                            <th className="text-left py-2 px-3 font-semibold">Pelaksana</th>
                          </tr>
                        </thead>
                        <tbody className="text-slate-400">
                          <tr className="border-b border-white/5">
                            <td className="py-2 px-3">Penetration Testing</td>
                            <td className="py-2 px-3">Tahunan</td>
                            <td className="py-2 px-3">Konsultan Keamanan</td>
                          </tr>
                          <tr className="border-b border-white/5">
                            <td className="py-2 px-3">Vulnerability Assessment</td>
                            <td className="py-2 px-3">Kuartalan</td>
                            <td className="py-2 px-3">Tim Keamanan Internal</td>
                          </tr>
                          <tr className="border-b border-white/5">
                            <td className="py-2 px-3">Security Code Review</td>
                            <td className="py-2 px-3">Per Release</td>
                            <td className="py-2 px-3">Tim Development</td>
                          </tr>
                          <tr className="border-b border-white/5">
                            <td className="py-2 px-3">Internal Audit</td>
                            <td className="py-2 px-3">Kuartalan</td>
                            <td className="py-2 px-3">Tim Internal Audit</td>
                          </tr>
                          <tr>
                            <td className="py-2 px-3">Vulnerability Scan</td>
                            <td className="py-2 px-3">Bulanan</td>
                            <td className="py-2 px-3">Otomatis + Review</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fadeUp">
              <div id="hubungi-tim-keamanan" className="scroll-mt-24">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-blue-400" />
                  </div>
                  <h2 className="text-2xl font-display font-bold">12. Hubungi Tim Keamanan</h2>
                </div>
                <div className="space-y-6">
                  <p className="text-slate-400 leading-relaxed">
                    Jika Anda memiliki pertanyaan tentang keamanan, menemukan kerentanan, atau mencurigai adanya aktivitas tidak sah, silakan hubungi tim keamanan kami.
                  </p>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-slate-900/30 border border-white/5 rounded-xl p-6">
                      <h4 className="font-semibold mb-4 flex items-center gap-2">
                        <Bug className="w-5 h-5 text-violet-400" />
                        Laporan Kerentanan
                      </h4>
                      <p className="text-sm text-slate-400 mb-4">
                        Untuk melaporkan kerentanan keamanan secara bertanggung jawab:
                      </p>
                      <div className="flex items-center gap-2 text-violet-400">
                        <Mail className="w-4 h-4" />
                        <span className="font-mono text-sm">security@tecnoqris.id</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-2">
                        Gunakan PGP key kami untuk komunikasi terenkripsi
                      </p>
                    </div>
                    <div className="bg-slate-900/30 border border-white/5 rounded-xl p-6">
                      <h4 className="font-semibold mb-4 flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-amber-400" />
                        Insiden Keamanan
                      </h4>
                      <p className="text-sm text-slate-400 mb-4">
                        Jika Anda mencurigai akun Anda telah disusupi:
                      </p>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-amber-400">
                          <Phone className="w-4 h-4" />
                          <span className="font-mono text-sm">+62 21 5020 1234 (24/7)</span>
                        </div>
                        <div className="flex items-center gap-2 text-amber-400">
                          <Mail className="w-4 h-4" />
                          <span className="font-mono text-sm">incident@tecnoqris.id</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-900/30 border border-white/5 rounded-xl p-6">
                    <h4 className="font-semibold mb-4 flex items-center gap-2">
                      <Building2 className="w-5 h-5 text-blue-400" />
                      Kantor Pusat
                    </h4>
                    <div className="grid md:grid-cols-2 gap-6 text-sm text-slate-400">
                      <div>
                        <p className="font-medium text-white mb-2">PT TecnoQris Indonesia</p>
                        <p>Gedung Cyber 2 Tower, Lantai 15</p>
                        <p>Jl. HR. Rasuna Said Blok X-5 No.13</p>
                        <p>Kuningan, Jakarta Selatan 12950</p>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-blue-400" />
                          <span>+62 21 5020 1234</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-blue-400" />
                          <span>info@tecnoqris.id</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Globe className="w-4 h-4 text-blue-400" />
                          <span>www.tecnoqris.id</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

          </div>
        </div>
      </section>

      <footer className="bg-slate-950 border-t border-white/5 py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <Logo className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p className="text-slate-400 mb-6">
              Keamanan dan kepercayaan adalah fondasi dari setiap transaksi
            </p>
            <div className="flex justify-center gap-8 text-sm text-slate-500">
              <Link href="/ketentuan" className="hover:text-white transition-colors" data-testid="link-ketentuan">Ketentuan Layanan</Link>
              <Link href="/privasi" className="hover:text-white transition-colors" data-testid="link-privasi">Kebijakan Privasi</Link>
              <Link href="/tentang" className="hover:text-white transition-colors" data-testid="link-tentang">Tentang Kami</Link>
            </div>
            <p className="text-slate-600 text-xs sm:text-sm mt-8 whitespace-nowrap">&copy; 2023-2025 TecnoQris Inc.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
