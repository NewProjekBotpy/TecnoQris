
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Shield, Lock, Eye, Database, UserCheck, Bell, Globe, FileText, Mail, Phone, Building2, Clock, AlertCircle, CheckCircle2 } from "lucide-react";
import { Logo } from "@/components/Logo";
import { ScrollReveal } from "@/components/ScrollReveal";
import { useState, useEffect } from "react";

export default function PrivasiPage() {
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
    { id: "pendahuluan", title: "1. Pendahuluan" },
    { id: "data-dikumpulkan", title: "2. Data yang Kami Kumpulkan" },
    { id: "penggunaan-data", title: "3. Penggunaan Data" },
    { id: "pembagian-data", title: "4. Pembagian Data dengan Pihak Ketiga" },
    { id: "penyimpanan-data", title: "5. Penyimpanan dan Keamanan Data" },
    { id: "hak-pengguna", title: "6. Hak Anda sebagai Pengguna" },
    { id: "cookies", title: "7. Cookies dan Teknologi Pelacakan" },
    { id: "anak-anak", title: "8. Privasi Anak-Anak" },
    { id: "perubahan-kebijakan", title: "9. Perubahan Kebijakan Privasi" },
    { id: "hubungi-kami", title: "10. Hubungi Kami" },
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
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 via-transparent to-transparent -z-10"></div>
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-gradient-radial from-blue-500/10 to-transparent blur-3xl -z-10"></div>
        <div className="absolute top-40 right-1/4 w-80 h-80 bg-gradient-radial from-purple-500/10 to-transparent blur-3xl -z-10"></div>
        
        <div className="container mx-auto px-6">
          <ScrollReveal animation="fadeUp" className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-900/30 border border-blue-500/30 text-xs font-medium text-blue-300 mb-6">
              <Shield className="w-4 h-4" />
              <span className="tracking-wide uppercase">Kebijakan Privasi</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6 leading-tight">
              Kebijakan Privasi <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">TecnoQris</span>
            </h1>
            <p className="text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed">
              Kami berkomitmen untuk melindungi privasi dan keamanan data Anda. Dokumen ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi pribadi Anda.
            </p>
            <div className="flex items-center justify-center gap-4 mt-6 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>Terakhir diperbarui: 1 Desember 2025</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-8 border-y border-white/5">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal animation="fadeUp">
              <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-6">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-400" />
                  Daftar Isi
                </h3>
                <div className="grid md:grid-cols-2 gap-2">
                  {tableOfContents.map((item, index) => (
                    <a 
                      key={index}
                      href={`#${item.id}`}
                      className="text-slate-400 hover:text-blue-400 transition-colors text-sm py-1"
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
                  <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-blue-400" />
                  </div>
                  <h2 className="text-2xl font-display font-bold">1. Pendahuluan</h2>
                </div>
                <div className="prose prose-invert prose-slate max-w-none">
                  <p className="text-slate-400 leading-relaxed mb-4">
                    Selamat datang di TecnoQris. PT TecnoQris Indonesia ("Kami", "TecnoQris", atau "Perusahaan") berkomitmen untuk melindungi privasi dan keamanan data pribadi Anda. Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, menyimpan, dan melindungi informasi pribadi Anda ketika Anda menggunakan layanan kami.
                  </p>
                  <p className="text-slate-400 leading-relaxed mb-4">
                    TecnoQris adalah Penyelenggara Jasa Pembayaran (PJP) yang terdaftar dan diawasi oleh Bank Indonesia berdasarkan Peraturan Bank Indonesia tentang Penyelenggaraan Sistem Pembayaran. Sebagai penyedia layanan pembayaran digital berbasis QRIS (Quick Response Code Indonesian Standard), kami memproses data transaksi dan informasi merchant sesuai dengan standar keamanan dan regulasi yang berlaku.
                  </p>
                  <p className="text-slate-400 leading-relaxed">
                    Dengan mengakses atau menggunakan layanan TecnoQris, Anda menyetujui praktik yang dijelaskan dalam Kebijakan Privasi ini. Jika Anda tidak setuju dengan ketentuan ini, mohon untuk tidak menggunakan layanan kami.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fadeUp">
              <div id="data-dikumpulkan" className="scroll-mt-24">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                    <Database className="w-5 h-5 text-purple-400" />
                  </div>
                  <h2 className="text-2xl font-display font-bold">2. Data yang Kami Kumpulkan</h2>
                </div>
                <div className="space-y-6">
                  <div className="bg-slate-900/30 border border-white/5 rounded-xl p-6">
                    <h3 className="font-semibold text-lg mb-4 text-blue-300">2.1 Data Identitas dan Akun</h3>
                    <p className="text-slate-400 leading-relaxed mb-4">
                      Saat Anda mendaftar sebagai merchant TecnoQris, kami mengumpulkan:
                    </p>
                    <ul className="space-y-2 text-slate-400">
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                        <span><strong className="text-white">Data Pribadi:</strong> Nama lengkap, alamat email, nomor telepon, dan username</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                        <span><strong className="text-white">Data Bisnis:</strong> Nama usaha, alamat usaha, jenis usaha, NPWP, dan dokumen legalitas usaha (NIB, SIUP, atau dokumen sejenis)</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                        <span><strong className="text-white">Data Perbankan:</strong> Nomor rekening bank untuk settlement dana, nama pemilik rekening, dan nama bank</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                        <span><strong className="text-white">Kredensial Keamanan:</strong> Password terenkripsi, API keys, dan pengaturan autentikasi dua faktor</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-slate-900/30 border border-white/5 rounded-xl p-6">
                    <h3 className="font-semibold text-lg mb-4 text-blue-300">2.2 Data Transaksi</h3>
                    <p className="text-slate-400 leading-relaxed mb-4">
                      Untuk setiap transaksi pembayaran yang diproses melalui platform kami, kami mencatat:
                    </p>
                    <ul className="space-y-2 text-slate-400">
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                        <span>ID transaksi unik, tanggal dan waktu transaksi</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                        <span>Jumlah pembayaran dan mata uang</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                        <span>Metode pembayaran (nama aplikasi e-wallet atau mobile banking)</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                        <span>Status transaksi (berhasil, pending, gagal)</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                        <span>Referensi pembayaran dari issuer</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-slate-900/30 border border-white/5 rounded-xl p-6">
                    <h3 className="font-semibold text-lg mb-4 text-blue-300">2.3 Data Teknis dan Penggunaan</h3>
                    <p className="text-slate-400 leading-relaxed mb-4">
                      Kami secara otomatis mengumpulkan informasi teknis saat Anda mengakses platform kami:
                    </p>
                    <ul className="space-y-2 text-slate-400">
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                        <span>Alamat IP dan lokasi geografis umum</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                        <span>Jenis dan versi browser, sistem operasi, dan jenis perangkat</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                        <span>Halaman yang dikunjungi dan durasi kunjungan</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                        <span>Log aktivitas API (endpoint yang diakses, waktu request, response status)</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                        <span>Pengaturan preferensi dashboard</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fadeUp">
              <div id="penggunaan-data" className="scroll-mt-24">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                    <Eye className="w-5 h-5 text-green-400" />
                  </div>
                  <h2 className="text-2xl font-display font-bold">3. Penggunaan Data</h2>
                </div>
                <div className="space-y-6">
                  <p className="text-slate-400 leading-relaxed">
                    Kami menggunakan data yang dikumpulkan untuk tujuan-tujuan berikut:
                  </p>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-slate-900/30 border border-white/5 rounded-xl p-5">
                      <h4 className="font-semibold mb-2">Penyediaan Layanan</h4>
                      <p className="text-sm text-slate-400">Memproses transaksi pembayaran QRIS, melakukan settlement dana ke rekening merchant, dan mengelola akun Anda.</p>
                    </div>
                    <div className="bg-slate-900/30 border border-white/5 rounded-xl p-5">
                      <h4 className="font-semibold mb-2">Verifikasi dan Keamanan</h4>
                      <p className="text-sm text-slate-400">Memverifikasi identitas merchant, mencegah penipuan, dan melindungi keamanan transaksi sesuai standar PCI-DSS.</p>
                    </div>
                    <div className="bg-slate-900/30 border border-white/5 rounded-xl p-5">
                      <h4 className="font-semibold mb-2">Kepatuhan Regulasi</h4>
                      <p className="text-sm text-slate-400">Mematuhi kewajiban hukum termasuk pelaporan ke Bank Indonesia, perpajakan, dan anti pencucian uang (AML/CFT).</p>
                    </div>
                    <div className="bg-slate-900/30 border border-white/5 rounded-xl p-5">
                      <h4 className="font-semibold mb-2">Dukungan Pelanggan</h4>
                      <p className="text-sm text-slate-400">Merespons pertanyaan, menangani keluhan, dan memberikan bantuan teknis terkait penggunaan layanan.</p>
                    </div>
                    <div className="bg-slate-900/30 border border-white/5 rounded-xl p-5">
                      <h4 className="font-semibold mb-2">Peningkatan Layanan</h4>
                      <p className="text-sm text-slate-400">Menganalisis pola penggunaan untuk mengembangkan fitur baru dan meningkatkan pengalaman pengguna platform.</p>
                    </div>
                    <div className="bg-slate-900/30 border border-white/5 rounded-xl p-5">
                      <h4 className="font-semibold mb-2">Komunikasi</h4>
                      <p className="text-sm text-slate-400">Mengirimkan notifikasi transaksi, pembaruan layanan, informasi keamanan, dan materi promosi (dengan persetujuan).</p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fadeUp">
              <div id="pembagian-data" className="scroll-mt-24">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center">
                    <Globe className="w-5 h-5 text-orange-400" />
                  </div>
                  <h2 className="text-2xl font-display font-bold">4. Pembagian Data dengan Pihak Ketiga</h2>
                </div>
                <div className="space-y-6">
                  <div className="bg-amber-900/20 border border-amber-500/30 rounded-xl p-6">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                      <p className="text-slate-300">
                        <strong>Komitmen Kami:</strong> TecnoQris tidak menjual, menyewakan, atau memperdagangkan data pribadi Anda kepada pihak ketiga untuk tujuan pemasaran mereka sendiri.
                      </p>
                    </div>
                  </div>

                  <p className="text-slate-400 leading-relaxed">
                    Kami hanya membagikan data Anda dalam situasi terbatas berikut:
                  </p>

                  <div className="space-y-4">
                    <div className="bg-slate-900/30 border border-white/5 rounded-xl p-6">
                      <h4 className="font-semibold mb-2">Mitra Pembayaran</h4>
                      <p className="text-slate-400 text-sm leading-relaxed">
                        Data transaksi dibagikan dengan switching provider QRIS, bank acquirer, dan issuer (penyedia e-wallet/mobile banking) untuk memproses pembayaran. Mitra ini terikat oleh perjanjian kerahasiaan dan standar keamanan yang ketat.
                      </p>
                    </div>

                    <div className="bg-slate-900/30 border border-white/5 rounded-xl p-6">
                      <h4 className="font-semibold mb-2">Regulator dan Otoritas</h4>
                      <p className="text-slate-400 text-sm leading-relaxed">
                        Kami wajib menyediakan data kepada Bank Indonesia, Otoritas Jasa Keuangan (OJK), Pusat Pelaporan dan Analisis Transaksi Keuangan (PPATK), dan otoritas perpajakan sesuai dengan ketentuan hukum yang berlaku.
                      </p>
                    </div>

                    <div className="bg-slate-900/30 border border-white/5 rounded-xl p-6">
                      <h4 className="font-semibold mb-2">Penyedia Layanan Pendukung</h4>
                      <p className="text-slate-400 text-sm leading-relaxed">
                        Kami bekerja sama dengan penyedia layanan cloud hosting, analytics, dan customer support yang memproses data atas nama kami. Semua vendor terikat perjanjian pemrosesan data yang mewajibkan mereka menjaga kerahasiaan dan keamanan data.
                      </p>
                    </div>

                    <div className="bg-slate-900/30 border border-white/5 rounded-xl p-6">
                      <h4 className="font-semibold mb-2">Penegakan Hukum</h4>
                      <p className="text-slate-400 text-sm leading-relaxed">
                        Kami dapat mengungkapkan data jika diwajibkan oleh hukum, perintah pengadilan, atau untuk melindungi hak, properti, atau keselamatan TecnoQris, pengguna kami, atau pihak lain.
                      </p>
                    </div>

                    <div className="bg-slate-900/30 border border-white/5 rounded-xl p-6">
                      <h4 className="font-semibold mb-2">Transaksi Korporat</h4>
                      <p className="text-slate-400 text-sm leading-relaxed">
                        Dalam hal merger, akuisisi, atau penjualan aset perusahaan, data pengguna dapat dialihkan sebagai bagian dari transaksi tersebut. Kami akan memberitahukan perubahan kepemilikan atau penggunaan data melalui email atau pemberitahuan di platform.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fadeUp">
              <div id="penyimpanan-data" className="scroll-mt-24">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                    <Lock className="w-5 h-5 text-cyan-400" />
                  </div>
                  <h2 className="text-2xl font-display font-bold">5. Penyimpanan dan Keamanan Data</h2>
                </div>
                <div className="space-y-6">
                  <div className="bg-slate-900/30 border border-white/5 rounded-xl p-6">
                    <h4 className="font-semibold mb-4">Lokasi Penyimpanan</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      Data Anda disimpan di pusat data yang berlokasi di Indonesia dan Singapura, sesuai dengan ketentuan Bank Indonesia tentang penyimpanan data sistem pembayaran. Pusat data kami memiliki sertifikasi ISO 27001 dan SOC 2 Type II.
                    </p>
                  </div>

                  <div className="bg-slate-900/30 border border-white/5 rounded-xl p-6">
                    <h4 className="font-semibold mb-4">Retensi Data</h4>
                    <ul className="space-y-2 text-slate-400 text-sm">
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                        <span><strong className="text-white">Data Transaksi:</strong> Disimpan selama 10 tahun sesuai ketentuan Bank Indonesia dan undang-undang perpajakan</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                        <span><strong className="text-white">Data Akun Merchant:</strong> Disimpan selama akun aktif dan 5 tahun setelah penutupan akun</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                        <span><strong className="text-white">Log Teknis:</strong> Disimpan selama 2 tahun untuk keperluan audit dan troubleshooting</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                        <span><strong className="text-white">Data Marketing:</strong> Disimpan hingga Anda mencabut persetujuan</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-slate-900/30 border border-white/5 rounded-xl p-6">
                    <h4 className="font-semibold mb-4">Langkah-Langkah Keamanan</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="flex items-start gap-3">
                        <Shield className="w-5 h-5 text-blue-400 shrink-0" />
                        <div>
                          <p className="font-medium text-sm">PCI-DSS Level 1</p>
                          <p className="text-xs text-slate-500">Standar keamanan tertinggi industri pembayaran</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Lock className="w-5 h-5 text-blue-400 shrink-0" />
                        <div>
                          <p className="font-medium text-sm">Enkripsi AES-256</p>
                          <p className="text-xs text-slate-500">Data sensitif dienkripsi saat disimpan dan ditransmisikan</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Eye className="w-5 h-5 text-blue-400 shrink-0" />
                        <div>
                          <p className="font-medium text-sm">Monitoring 24/7</p>
                          <p className="text-xs text-slate-500">Pemantauan real-time terhadap aktivitas mencurigakan</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <UserCheck className="w-5 h-5 text-blue-400 shrink-0" />
                        <div>
                          <p className="font-medium text-sm">Akses Terbatas</p>
                          <p className="text-xs text-slate-500">Prinsip least privilege untuk akses karyawan</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fadeUp">
              <div id="hak-pengguna" className="scroll-mt-24">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-pink-500/20 flex items-center justify-center">
                    <UserCheck className="w-5 h-5 text-pink-400" />
                  </div>
                  <h2 className="text-2xl font-display font-bold">6. Hak Anda sebagai Pengguna</h2>
                </div>
                <div className="space-y-6">
                  <p className="text-slate-400 leading-relaxed">
                    Sesuai dengan Undang-Undang Pelindungan Data Pribadi (UU PDP) dan regulasi terkait, Anda memiliki hak-hak berikut:
                  </p>

                  <div className="grid gap-4">
                    <div className="bg-slate-900/30 border border-white/5 rounded-xl p-5 flex items-start gap-4">
                      <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center shrink-0">
                        <span className="font-bold text-blue-400 text-sm">1</span>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Hak Akses</h4>
                        <p className="text-sm text-slate-400">Anda berhak mengetahui data apa saja yang kami kumpulkan tentang Anda dan meminta salinan data tersebut.</p>
                      </div>
                    </div>

                    <div className="bg-slate-900/30 border border-white/5 rounded-xl p-5 flex items-start gap-4">
                      <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center shrink-0">
                        <span className="font-bold text-blue-400 text-sm">2</span>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Hak Koreksi</h4>
                        <p className="text-sm text-slate-400">Anda dapat meminta kami untuk memperbaiki data yang tidak akurat atau melengkapi data yang tidak lengkap.</p>
                      </div>
                    </div>

                    <div className="bg-slate-900/30 border border-white/5 rounded-xl p-5 flex items-start gap-4">
                      <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center shrink-0">
                        <span className="font-bold text-blue-400 text-sm">3</span>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Hak Penghapusan</h4>
                        <p className="text-sm text-slate-400">Anda dapat meminta penghapusan data pribadi, kecuali data yang wajib disimpan berdasarkan regulasi (seperti data transaksi untuk keperluan audit).</p>
                      </div>
                    </div>

                    <div className="bg-slate-900/30 border border-white/5 rounded-xl p-5 flex items-start gap-4">
                      <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center shrink-0">
                        <span className="font-bold text-blue-400 text-sm">4</span>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Hak Pembatasan Pemrosesan</h4>
                        <p className="text-sm text-slate-400">Dalam kondisi tertentu, Anda dapat meminta kami untuk membatasi pemrosesan data Anda.</p>
                      </div>
                    </div>

                    <div className="bg-slate-900/30 border border-white/5 rounded-xl p-5 flex items-start gap-4">
                      <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center shrink-0">
                        <span className="font-bold text-blue-400 text-sm">5</span>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Hak Portabilitas</h4>
                        <p className="text-sm text-slate-400">Anda berhak menerima data Anda dalam format yang terstruktur dan dapat dibaca mesin.</p>
                      </div>
                    </div>

                    <div className="bg-slate-900/30 border border-white/5 rounded-xl p-5 flex items-start gap-4">
                      <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center shrink-0">
                        <span className="font-bold text-blue-400 text-sm">6</span>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Hak Menarik Persetujuan</h4>
                        <p className="text-sm text-slate-400">Untuk pemrosesan data yang berdasarkan persetujuan (seperti email marketing), Anda dapat menarik persetujuan kapan saja.</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-900/20 border border-blue-500/30 rounded-xl p-6">
                    <p className="text-slate-300 text-sm">
                      <strong>Cara Mengajukan Permintaan:</strong> Untuk menggunakan hak-hak Anda, silakan hubungi tim privasi kami melalui email di <a href="mailto:privasi@tecnoqris.id" className="text-blue-400 hover:underline" data-testid="link-email-hak">privasi@tecnoqris.id</a> atau melalui menu Pengaturan di dashboard akun Anda. Kami akan merespons permintaan Anda dalam waktu maksimal 14 hari kerja.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fadeUp">
              <div id="cookies" className="scroll-mt-24">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                    <Database className="w-5 h-5 text-yellow-400" />
                  </div>
                  <h2 className="text-2xl font-display font-bold">7. Cookies dan Teknologi Pelacakan</h2>
                </div>
                <div className="space-y-6">
                  <p className="text-slate-400 leading-relaxed">
                    Kami menggunakan cookies dan teknologi serupa untuk meningkatkan pengalaman Anda di platform kami:
                  </p>

                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-white/10">
                          <th className="text-left py-3 px-4 font-semibold">Jenis Cookie</th>
                          <th className="text-left py-3 px-4 font-semibold">Tujuan</th>
                          <th className="text-left py-3 px-4 font-semibold">Durasi</th>
                        </tr>
                      </thead>
                      <tbody className="text-slate-400">
                        <tr className="border-b border-white/5">
                          <td className="py-3 px-4 font-medium text-white">Esensial</td>
                          <td className="py-3 px-4">Diperlukan untuk fungsi dasar seperti autentikasi dan keamanan sesi</td>
                          <td className="py-3 px-4">Sesi / 24 jam</td>
                        </tr>
                        <tr className="border-b border-white/5">
                          <td className="py-3 px-4 font-medium text-white">Fungsional</td>
                          <td className="py-3 px-4">Menyimpan preferensi Anda seperti pengaturan bahasa dan tampilan dashboard</td>
                          <td className="py-3 px-4">1 tahun</td>
                        </tr>
                        <tr className="border-b border-white/5">
                          <td className="py-3 px-4 font-medium text-white">Analitik</td>
                          <td className="py-3 px-4">Membantu kami memahami bagaimana pengguna menggunakan platform untuk peningkatan layanan</td>
                          <td className="py-3 px-4">2 tahun</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <p className="text-slate-400 text-sm">
                    Anda dapat mengelola preferensi cookies melalui pengaturan browser Anda. Perlu diingat bahwa menonaktifkan cookies esensial dapat mempengaruhi fungsi platform.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fadeUp">
              <div id="anak-anak" className="scroll-mt-24">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center">
                    <AlertCircle className="w-5 h-5 text-red-400" />
                  </div>
                  <h2 className="text-2xl font-display font-bold">8. Privasi Anak-Anak</h2>
                </div>
                <div className="space-y-4">
                  <p className="text-slate-400 leading-relaxed">
                    Layanan TecnoQris ditujukan untuk pelaku usaha dan individu yang berusia minimal 18 tahun atau telah dewasa secara hukum sesuai ketentuan yang berlaku di Indonesia. Kami tidak dengan sengaja mengumpulkan data pribadi dari anak-anak di bawah 18 tahun.
                  </p>
                  <p className="text-slate-400 leading-relaxed">
                    Jika Anda mengetahui bahwa seorang anak telah memberikan data pribadi kepada kami tanpa persetujuan orang tua atau wali, mohon segera hubungi kami di <a href="mailto:privasi@tecnoqris.id" className="text-blue-400 hover:underline" data-testid="link-email-anak">privasi@tecnoqris.id</a> agar kami dapat mengambil langkah yang diperlukan untuk menghapus informasi tersebut.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fadeUp">
              <div id="perubahan-kebijakan" className="scroll-mt-24">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-indigo-500/20 flex items-center justify-center">
                    <Bell className="w-5 h-5 text-indigo-400" />
                  </div>
                  <h2 className="text-2xl font-display font-bold">9. Perubahan Kebijakan Privasi</h2>
                </div>
                <div className="space-y-4">
                  <p className="text-slate-400 leading-relaxed">
                    Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu untuk mencerminkan perubahan pada layanan kami, praktik bisnis, atau persyaratan hukum. Perubahan material akan diumumkan melalui:
                  </p>
                  <ul className="space-y-2 text-slate-400">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                      <span>Email notifikasi ke alamat email terdaftar Anda</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                      <span>Banner pemberitahuan di dashboard saat Anda login</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                      <span>Pembaruan tanggal "Terakhir diperbarui" di bagian atas halaman ini</span>
                    </li>
                  </ul>
                  <p className="text-slate-400 leading-relaxed">
                    Penggunaan layanan kami yang berkelanjutan setelah perubahan berlaku menandakan penerimaan Anda terhadap kebijakan yang diperbarui.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fadeUp">
              <div id="hubungi-kami" className="scroll-mt-24">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-teal-500/20 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-teal-400" />
                  </div>
                  <h2 className="text-2xl font-display font-bold">10. Hubungi Kami</h2>
                </div>
                <div className="space-y-6">
                  <p className="text-slate-400 leading-relaxed">
                    Jika Anda memiliki pertanyaan, kekhawatiran, atau permintaan terkait Kebijakan Privasi ini atau praktik pemrosesan data kami, silakan hubungi:
                  </p>

                  <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-6">
                    <h3 className="font-bold text-lg mb-4">Tim Privasi Data TecnoQris</h3>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Building2 className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium">PT TecnoQris Indonesia</p>
                          <p className="text-sm text-slate-400">Gedung Cyber 2, Lantai 15<br />Jl. HR Rasuna Said Blok X-5 Kav. 13<br />Jakarta Selatan 12950, Indonesia</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-blue-400 shrink-0" />
                        <div>
                          <p className="font-medium">Email</p>
                          <a href="mailto:privasi@tecnoqris.id" className="text-sm text-blue-400 hover:underline" data-testid="link-email-kontak">privasi@tecnoqris.id</a>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5 text-blue-400 shrink-0" />
                        <div>
                          <p className="font-medium">Telepon</p>
                          <p className="text-sm text-slate-400">+62 21 2994 1234</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-slate-500 text-sm">
                    Kami berkomitmen untuk merespons setiap pertanyaan atau permintaan terkait privasi dalam waktu 7 hari kerja.
                  </p>
                </div>
              </div>
            </ScrollReveal>

          </div>
        </div>
      </section>

      <footer className="py-16 border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <Logo className="h-12 w-12 mx-auto mb-4 drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
            <p className="text-slate-400 mb-6">
              Melindungi privasi Anda adalah prioritas utama kami
            </p>
            <div className="flex justify-center gap-8 text-sm text-slate-500">
              <Link href="/ketentuan" className="hover:text-white transition-colors" data-testid="link-ketentuan">Ketentuan Layanan</Link>
              <Link href="/keamanan" className="hover:text-white transition-colors" data-testid="link-keamanan">Keamanan</Link>
              <Link href="/tentang" className="hover:text-white transition-colors" data-testid="link-tentang">Tentang Kami</Link>
            </div>
            <p className="text-slate-600 text-xs sm:text-sm mt-8 whitespace-nowrap">&copy; 2023-2025 TecnoQris Inc.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
