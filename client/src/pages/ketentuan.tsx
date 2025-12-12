
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { FileText, Scale, Shield, CreditCard, AlertTriangle, Clock, Ban, RefreshCw, Gavel, Mail, Phone, Building2, CheckCircle2, XCircle } from "lucide-react";
import { Logo } from "@/components/Logo";
import { ScrollReveal } from "@/components/ScrollReveal";
import { useState, useEffect } from "react";

export default function KetentuanPage() {
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
    { id: "pendahuluan", title: "1. Pendahuluan dan Penerimaan" },
    { id: "definisi", title: "2. Definisi" },
    { id: "layanan", title: "3. Layanan TecnoQris" },
    { id: "pendaftaran", title: "4. Pendaftaran dan Akun Merchant" },
    { id: "biaya", title: "5. Biaya dan Pembayaran" },
    { id: "kewajiban-merchant", title: "6. Kewajiban Merchant" },
    { id: "larangan", title: "7. Aktivitas yang Dilarang" },
    { id: "settlement", title: "8. Settlement dan Pencairan Dana" },
    { id: "pembatasan-tanggung-jawab", title: "9. Pembatasan Tanggung Jawab" },
    { id: "penghentian", title: "10. Penghentian Layanan" },
    { id: "hukum", title: "11. Hukum yang Berlaku" },
    { id: "perubahan", title: "12. Perubahan Ketentuan" },
    { id: "hubungi-kami", title: "13. Hubungi Kami" },
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
              <Scale className="w-4 h-4" />
              <span className="tracking-wide uppercase">Ketentuan Layanan</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6 leading-tight">
              Syarat dan Ketentuan <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Layanan TecnoQris</span>
            </h1>
            <p className="text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed">
              Ketentuan ini mengatur penggunaan layanan payment gateway QRIS yang disediakan oleh TecnoQris. Dengan menggunakan layanan kami, Anda menyetujui ketentuan berikut.
            </p>
            <div className="flex items-center justify-center gap-4 mt-6 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>Terakhir diperbarui: 1 Desember 2023</span>
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
                    <FileText className="w-5 h-5 text-blue-400" />
                  </div>
                  <h2 className="text-2xl font-display font-bold">1. Pendahuluan dan Penerimaan</h2>
                </div>
                <div className="space-y-4 text-slate-400 leading-relaxed">
                  <p>
                    Syarat dan Ketentuan Layanan ini ("Ketentuan") merupakan perjanjian hukum yang mengikat antara Anda ("Merchant", "Anda", atau "Pengguna") dan PT TecnoQris Indonesia ("TecnoQris", "Kami", atau "Perusahaan"), sebuah perusahaan yang didirikan berdasarkan hukum Republik Indonesia dan terdaftar sebagai Penyelenggara Jasa Pembayaran (PJP) di Bank Indonesia.
                  </p>
                  <p>
                    Dengan mendaftar, mengakses, atau menggunakan layanan TecnoQris, Anda menyatakan bahwa:
                  </p>
                  <ul className="space-y-2 ml-4">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                      <span>Anda telah membaca, memahami, dan menyetujui seluruh ketentuan dalam dokumen ini</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                      <span>Anda memiliki kapasitas hukum untuk mengadakan perjanjian yang mengikat</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                      <span>Anda berusia minimal 18 tahun atau telah dewasa secara hukum</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                      <span>Jika Anda mewakili suatu badan usaha, Anda memiliki wewenang untuk mengikat badan usaha tersebut</span>
                    </li>
                  </ul>
                  <p>
                    Jika Anda tidak menyetujui ketentuan ini, mohon untuk tidak menggunakan layanan TecnoQris.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fadeUp">
              <div id="definisi" className="scroll-mt-24">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-purple-400" />
                  </div>
                  <h2 className="text-2xl font-display font-bold">2. Definisi</h2>
                </div>
                <div className="space-y-4">
                  <p className="text-slate-400 leading-relaxed">
                    Dalam Ketentuan ini, istilah-istilah berikut memiliki arti sebagai berikut:
                  </p>
                  <div className="grid gap-3">
                    <div className="bg-slate-900/30 border border-white/5 rounded-xl p-4">
                      <p><strong className="text-white">QRIS</strong> <span className="text-slate-400">- Quick Response Code Indonesian Standard, standar QR code untuk pembayaran yang ditetapkan oleh Bank Indonesia.</span></p>
                    </div>
                    <div className="bg-slate-900/30 border border-white/5 rounded-xl p-4">
                      <p><strong className="text-white">Merchant</strong> <span className="text-slate-400">- Pelaku usaha yang terdaftar dan menggunakan layanan TecnoQris untuk menerima pembayaran.</span></p>
                    </div>
                    <div className="bg-slate-900/30 border border-white/5 rounded-xl p-4">
                      <p><strong className="text-white">Settlement</strong> <span className="text-slate-400">- Proses pencairan dana hasil transaksi ke rekening bank Merchant.</span></p>
                    </div>
                    <div className="bg-slate-900/30 border border-white/5 rounded-xl p-4">
                      <p><strong className="text-white">MDR (Merchant Discount Rate)</strong> <span className="text-slate-400">- Biaya layanan yang dikenakan kepada Merchant untuk setiap transaksi yang berhasil.</span></p>
                    </div>
                    <div className="bg-slate-900/30 border border-white/5 rounded-xl p-4">
                      <p><strong className="text-white">Issuer</strong> <span className="text-slate-400">- Penyedia layanan pembayaran (e-wallet, mobile banking) yang digunakan pembeli untuk melakukan pembayaran.</span></p>
                    </div>
                    <div className="bg-slate-900/30 border border-white/5 rounded-xl p-4">
                      <p><strong className="text-white">API</strong> <span className="text-slate-400">- Application Programming Interface, antarmuka yang memungkinkan integrasi sistem Merchant dengan platform TecnoQris.</span></p>
                    </div>
                    <div className="bg-slate-900/30 border border-white/5 rounded-xl p-4">
                      <p><strong className="text-white">Dashboard</strong> <span className="text-slate-400">- Portal web yang disediakan TecnoQris untuk Merchant mengelola transaksi dan pengaturan akun.</span></p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fadeUp">
              <div id="layanan" className="scroll-mt-24">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-green-400" />
                  </div>
                  <h2 className="text-2xl font-display font-bold">3. Layanan TecnoQris</h2>
                </div>
                <div className="space-y-6">
                  <p className="text-slate-400 leading-relaxed">
                    TecnoQris menyediakan layanan payment gateway berbasis QRIS yang meliputi:
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-slate-900/30 border border-white/5 rounded-xl p-5">
                      <h4 className="font-semibold mb-2">Pembuatan QRIS Dinamis</h4>
                      <p className="text-sm text-slate-400">Generasi kode QRIS untuk setiap transaksi dengan nominal yang dapat disesuaikan.</p>
                    </div>
                    <div className="bg-slate-900/30 border border-white/5 rounded-xl p-5">
                      <h4 className="font-semibold mb-2">Pemrosesan Pembayaran</h4>
                      <p className="text-sm text-slate-400">Penerimaan dan verifikasi pembayaran dari berbagai e-wallet dan mobile banking di Indonesia.</p>
                    </div>
                    <div className="bg-slate-900/30 border border-white/5 rounded-xl p-5">
                      <h4 className="font-semibold mb-2">QRIS Cross-Border</h4>
                      <p className="text-sm text-slate-400">Penerimaan pembayaran dari wisatawan asing menggunakan e-wallet dari negara-negara ASEAN.</p>
                    </div>
                    <div className="bg-slate-900/30 border border-white/5 rounded-xl p-5">
                      <h4 className="font-semibold mb-2">Dashboard Merchant</h4>
                      <p className="text-sm text-slate-400">Antarmuka web untuk monitoring transaksi, laporan analitik, dan pengaturan akun.</p>
                    </div>
                    <div className="bg-slate-900/30 border border-white/5 rounded-xl p-5">
                      <h4 className="font-semibold mb-2">API Integration</h4>
                      <p className="text-sm text-slate-400">RESTful API untuk integrasi pembayaran ke sistem POS, website, atau aplikasi Merchant.</p>
                    </div>
                    <div className="bg-slate-900/30 border border-white/5 rounded-xl p-5">
                      <h4 className="font-semibold mb-2">Settlement Otomatis</h4>
                      <p className="text-sm text-slate-400">Pencairan dana hasil transaksi ke rekening bank Merchant sesuai jadwal yang disepakati.</p>
                    </div>
                  </div>

                  <div className="bg-amber-900/20 border border-amber-500/30 rounded-xl p-6">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                      <p className="text-slate-300 text-sm">
                        <strong>Ketersediaan Layanan:</strong> TecnoQris berupaya menyediakan layanan 24/7 dengan uptime 99.9%. Namun, kami berhak melakukan pemeliharaan terjadwal atau darurat yang dapat mempengaruhi ketersediaan layanan sementara.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fadeUp">
              <div id="pendaftaran" className="scroll-mt-24">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-cyan-400" />
                  </div>
                  <h2 className="text-2xl font-display font-bold">4. Pendaftaran dan Akun Merchant</h2>
                </div>
                <div className="space-y-6">
                  <div className="bg-slate-900/30 border border-white/5 rounded-xl p-6">
                    <h4 className="font-semibold mb-4">4.1 Persyaratan Pendaftaran</h4>
                    <p className="text-slate-400 text-sm leading-relaxed mb-4">
                      Untuk menjadi Merchant TecnoQris, Anda wajib menyediakan:
                    </p>
                    <ul className="space-y-2 text-slate-400 text-sm">
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                        <span>Identitas pemilik usaha (KTP/Paspor untuk WNA)</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                        <span>Dokumen legalitas usaha (NIB, SIUP, atau Surat Keterangan Usaha untuk UMKM)</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                        <span>NPWP (untuk usaha yang memenuhi kriteria)</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                        <span>Rekening bank atas nama pemilik usaha atau badan usaha</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                        <span>Foto lokasi usaha dan produk/layanan yang dijual</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-slate-900/30 border border-white/5 rounded-xl p-6">
                    <h4 className="font-semibold mb-4">4.2 Verifikasi dan Aktivasi</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      TecnoQris akan melakukan verifikasi dokumen dan uji tuntas (due diligence) sesuai ketentuan anti pencucian uang dan pencegahan pendanaan terorisme (AML/CFT). Proses verifikasi umumnya memakan waktu 1-3 hari kerja. TecnoQris berhak menolak pendaftaran tanpa wajib memberikan alasan penolakan.
                    </p>
                  </div>

                  <div className="bg-slate-900/30 border border-white/5 rounded-xl p-6">
                    <h4 className="font-semibold mb-4">4.3 Keamanan Akun</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      Merchant bertanggung jawab penuh atas keamanan kredensial akun termasuk username, password, dan API keys. Segala aktivitas yang dilakukan melalui akun Merchant dianggap sebagai tindakan yang sah dari Merchant. Merchant wajib segera melaporkan kepada TecnoQris jika mengetahui atau mencurigai adanya akses tidak sah ke akunnya.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fadeUp">
              <div id="biaya" className="scroll-mt-24">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-orange-400" />
                  </div>
                  <h2 className="text-2xl font-display font-bold">5. Biaya dan Pembayaran</h2>
                </div>
                <div className="space-y-6">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-white/10">
                          <th className="text-left py-3 px-4 font-semibold">Jenis Biaya</th>
                          <th className="text-left py-3 px-4 font-semibold">Tarif</th>
                          <th className="text-left py-3 px-4 font-semibold">Keterangan</th>
                        </tr>
                      </thead>
                      <tbody className="text-slate-400">
                        <tr className="border-b border-white/5">
                          <td className="py-3 px-4 font-medium text-white">MDR QRIS Domestik</td>
                          <td className="py-3 px-4">0.7%</td>
                          <td className="py-3 px-4">Per transaksi berhasil, sesuai ketentuan Bank Indonesia</td>
                        </tr>
                        <tr className="border-b border-white/5">
                          <td className="py-3 px-4 font-medium text-white">MDR QRIS Cross-Border</td>
                          <td className="py-3 px-4">1.0%</td>
                          <td className="py-3 px-4">Per transaksi dari e-wallet luar negeri</td>
                        </tr>
                        <tr className="border-b border-white/5">
                          <td className="py-3 px-4 font-medium text-white">Biaya Pendaftaran</td>
                          <td className="py-3 px-4">Gratis</td>
                          <td className="py-3 px-4">Tidak ada biaya pendaftaran awal</td>
                        </tr>
                        <tr className="border-b border-white/5">
                          <td className="py-3 px-4 font-medium text-white">Biaya Bulanan</td>
                          <td className="py-3 px-4">Gratis</td>
                          <td className="py-3 px-4">Tidak ada biaya berlangganan bulanan</td>
                        </tr>
                        <tr className="border-b border-white/5">
                          <td className="py-3 px-4 font-medium text-white">Biaya Settlement</td>
                          <td className="py-3 px-4">Gratis</td>
                          <td className="py-3 px-4">Pencairan ke bank domestik tanpa biaya tambahan</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="bg-blue-900/20 border border-blue-500/30 rounded-xl p-6">
                    <p className="text-slate-300 text-sm">
                      <strong>Catatan:</strong> MDR dipotong otomatis dari nilai transaksi sebelum settlement. TecnoQris berhak mengubah tarif dengan pemberitahuan minimal 30 hari sebelumnya melalui email atau dashboard.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fadeUp">
              <div id="kewajiban-merchant" className="scroll-mt-24">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-pink-500/20 flex items-center justify-center">
                    <Scale className="w-5 h-5 text-pink-400" />
                  </div>
                  <h2 className="text-2xl font-display font-bold">6. Kewajiban Merchant</h2>
                </div>
                <div className="space-y-4">
                  <p className="text-slate-400 leading-relaxed">
                    Sebagai Merchant TecnoQris, Anda berkewajiban untuk:
                  </p>
                  <div className="grid gap-3">
                    <div className="bg-slate-900/30 border border-white/5 rounded-xl p-5 flex items-start gap-4">
                      <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center shrink-0">
                        <span className="font-bold text-blue-400 text-sm">1</span>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Mematuhi Regulasi</h4>
                        <p className="text-sm text-slate-400">Menjalankan usaha sesuai hukum yang berlaku di Indonesia, termasuk perizinan, perpajakan, dan perlindungan konsumen.</p>
                      </div>
                    </div>
                    <div className="bg-slate-900/30 border border-white/5 rounded-xl p-5 flex items-start gap-4">
                      <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center shrink-0">
                        <span className="font-bold text-blue-400 text-sm">2</span>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Menjaga Keakuratan Data</h4>
                        <p className="text-sm text-slate-400">Menyediakan dan memperbarui informasi yang akurat tentang usaha, produk/layanan, dan rekening settlement.</p>
                      </div>
                    </div>
                    <div className="bg-slate-900/30 border border-white/5 rounded-xl p-5 flex items-start gap-4">
                      <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center shrink-0">
                        <span className="font-bold text-blue-400 text-sm">3</span>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Menampilkan QRIS dengan Benar</h4>
                        <p className="text-sm text-slate-400">Menampilkan kode QRIS di lokasi yang mudah terlihat dan memastikan kode dapat di-scan dengan baik oleh pembeli.</p>
                      </div>
                    </div>
                    <div className="bg-slate-900/30 border border-white/5 rounded-xl p-5 flex items-start gap-4">
                      <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center shrink-0">
                        <span className="font-bold text-blue-400 text-sm">4</span>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Menangani Keluhan Pelanggan</h4>
                        <p className="text-sm text-slate-400">Merespons dan menyelesaikan keluhan pelanggan terkait produk/layanan yang dijual dengan itikad baik.</p>
                      </div>
                    </div>
                    <div className="bg-slate-900/30 border border-white/5 rounded-xl p-5 flex items-start gap-4">
                      <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center shrink-0">
                        <span className="font-bold text-blue-400 text-sm">5</span>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Melindungi API Keys</h4>
                        <p className="text-sm text-slate-400">Menjaga kerahasiaan API keys dan tidak membagikannya kepada pihak yang tidak berwenang.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fadeUp">
              <div id="larangan" className="scroll-mt-24">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-slate-500/20 flex items-center justify-center">
                    <Ban className="w-5 h-5 text-slate-400" />
                  </div>
                  <h2 className="text-2xl font-display font-bold">7. Aktivitas yang Dilarang</h2>
                </div>
                <div className="space-y-6">
                  <p className="text-slate-400 leading-relaxed">
                    Merchant dilarang keras menggunakan layanan TecnoQris untuk aktivitas berikut:
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-slate-800/50 border border-slate-500/30 rounded-xl p-5">
                      <div className="flex items-start gap-3">
                        <XCircle className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-semibold mb-1">Barang/Jasa Ilegal</h4>
                          <p className="text-sm text-slate-400">Narkotika, senjata, barang curian, atau barang/jasa yang melanggar hukum</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-slate-800/50 border border-slate-500/30 rounded-xl p-5">
                      <div className="flex items-start gap-3">
                        <XCircle className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-semibold mb-1">Penipuan dan Fraud</h4>
                          <p className="text-sm text-slate-400">Transaksi palsu, skema ponzi, atau aktivitas penipuan lainnya</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-slate-800/50 border border-slate-500/30 rounded-xl p-5">
                      <div className="flex items-start gap-3">
                        <XCircle className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-semibold mb-1">Pencucian Uang</h4>
                          <p className="text-sm text-slate-400">Aktivitas yang bertujuan menyamarkan asal-usul dana ilegal</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-slate-800/50 border border-slate-500/30 rounded-xl p-5">
                      <div className="flex items-start gap-3">
                        <XCircle className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-semibold mb-1">Konten Dewasa</h4>
                          <p className="text-sm text-slate-400">Pornografi, prostitusi, atau layanan seksual</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-slate-800/50 border border-slate-500/30 rounded-xl p-5">
                      <div className="flex items-start gap-3">
                        <XCircle className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-semibold mb-1">Pelanggaran HKI</h4>
                          <p className="text-sm text-slate-400">Barang palsu, bajakan, atau melanggar hak kekayaan intelektual</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-amber-900/20 border border-amber-500/30 rounded-xl p-6">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                      <p className="text-slate-300 text-sm">
                        <strong>Konsekuensi Pelanggaran:</strong> TecnoQris berhak menangguhkan atau menghentikan akun Merchant secara permanen tanpa pemberitahuan sebelumnya jika ditemukan pelanggaran. Dana yang tertahan dapat ditahan untuk penyelidikan dan pelaporan kepada otoritas berwenang.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fadeUp">
              <div id="settlement" className="scroll-mt-24">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                    <RefreshCw className="w-5 h-5 text-emerald-400" />
                  </div>
                  <h2 className="text-2xl font-display font-bold">8. Settlement dan Pencairan Dana</h2>
                </div>
                <div className="space-y-6">
                  <div className="bg-slate-900/30 border border-white/5 rounded-xl p-6">
                    <h4 className="font-semibold mb-4">8.1 Jadwal Settlement</h4>
                    <p className="text-slate-400 text-sm leading-relaxed mb-4">
                      Settlement dilakukan secara otomatis sesuai jadwal berikut:
                    </p>
                    <ul className="space-y-2 text-slate-400 text-sm">
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                        <span><strong className="text-white">T+1:</strong> Dana dari transaksi hari H akan dicairkan pada hari kerja berikutnya (H+1)</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                        <span><strong className="text-white">Cut-off Time:</strong> Transaksi setelah pukul 23:59 WIB dihitung sebagai transaksi hari berikutnya</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                        <span><strong className="text-white">Hari Libur:</strong> Settlement pada hari libur nasional akan diproses pada hari kerja berikutnya</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-slate-900/30 border border-white/5 rounded-xl p-6">
                    <h4 className="font-semibold mb-4">8.2 Penahanan Dana</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      TecnoQris berhak menahan settlement dalam kondisi berikut: (a) Adanya indikasi fraud atau aktivitas mencurigakan; (b) Tingkat chargeback atau refund yang tinggi; (c) Permintaan dari otoritas penegak hukum; (d) Pelanggaran terhadap Ketentuan Layanan ini. Merchant akan diberitahu mengenai penahanan dana dan dapat mengajukan klarifikasi.
                    </p>
                  </div>

                  <div className="bg-slate-900/30 border border-white/5 rounded-xl p-6">
                    <h4 className="font-semibold mb-4">8.3 Refund dan Chargeback</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      Merchant wajib menangani permintaan refund dari pelanggan secara langsung. Untuk refund melalui sistem TecnoQris, Merchant dapat mengajukan melalui dashboard atau API. Biaya refund dan chargeback menjadi tanggung jawab Merchant dan dapat dipotong dari settlement berikutnya.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fadeUp">
              <div id="pembatasan-tanggung-jawab" className="scroll-mt-24">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-slate-500/20 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-slate-400" />
                  </div>
                  <h2 className="text-2xl font-display font-bold">9. Pembatasan Tanggung Jawab</h2>
                </div>
                <div className="space-y-4 text-slate-400 leading-relaxed">
                  <p>
                    <strong className="text-white">9.1</strong> TecnoQris menyediakan layanan "sebagaimana adanya" (as is) dan "sebagaimana tersedia" (as available). Kami tidak memberikan jaminan, baik tersurat maupun tersirat, termasuk namun tidak terbatas pada jaminan kelayakan untuk tujuan tertentu.
                  </p>
                  <p>
                    <strong className="text-white">9.2</strong> TecnoQris tidak bertanggung jawab atas kerugian tidak langsung, insidental, khusus, atau konsekuensial yang timbul dari penggunaan layanan, termasuk kehilangan keuntungan, data, atau peluang bisnis.
                  </p>
                  <p>
                    <strong className="text-white">9.3</strong> Total tanggung jawab TecnoQris kepada Merchant dalam keadaan apapun tidak akan melebihi total MDR yang dibayarkan Merchant kepada TecnoQris selama 12 bulan terakhir.
                  </p>
                  <p>
                    <strong className="text-white">9.4</strong> TecnoQris tidak bertanggung jawab atas kegagalan atau keterlambatan yang disebabkan oleh keadaan di luar kendali kami (force majeure), termasuk bencana alam, perang, aksi terorisme, pemadaman listrik, kegagalan jaringan internet, atau perubahan regulasi pemerintah.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fadeUp">
              <div id="penghentian" className="scroll-mt-24">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-slate-500/20 flex items-center justify-center">
                    <Ban className="w-5 h-5 text-slate-400" />
                  </div>
                  <h2 className="text-2xl font-display font-bold">10. Penghentian Layanan</h2>
                </div>
                <div className="space-y-6">
                  <div className="bg-slate-900/30 border border-white/5 rounded-xl p-6">
                    <h4 className="font-semibold mb-4">10.1 Penghentian oleh Merchant</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      Merchant dapat menghentikan penggunaan layanan kapan saja dengan mengajukan permohonan penutupan akun melalui dashboard atau menghubungi customer support. Saldo yang tersisa akan dicairkan ke rekening settlement setelah dikurangi kewajiban yang belum diselesaikan.
                    </p>
                  </div>

                  <div className="bg-slate-900/30 border border-white/5 rounded-xl p-6">
                    <h4 className="font-semibold mb-4">10.2 Penghentian oleh TecnoQris</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      TecnoQris dapat menangguhkan atau menghentikan akun Merchant dengan alasan berikut: (a) Pelanggaran Ketentuan Layanan; (b) Tidak aktif selama lebih dari 12 bulan; (c) Indikasi fraud atau aktivitas ilegal; (d) Permintaan regulator atau otoritas penegak hukum; (e) Keputusan bisnis TecnoQris dengan pemberitahuan 30 hari sebelumnya.
                    </p>
                  </div>

                  <div className="bg-slate-900/30 border border-white/5 rounded-xl p-6">
                    <h4 className="font-semibold mb-4">10.3 Efek Penghentian</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      Setelah penghentian: (a) Akses ke dashboard dan API akan dinonaktifkan; (b) QRIS yang sudah diterbitkan tidak akan dapat digunakan; (c) Data transaksi akan disimpan sesuai ketentuan retensi data; (d) Kewajiban yang telah timbul sebelum penghentian tetap berlaku.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fadeUp">
              <div id="hukum" className="scroll-mt-24">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-indigo-500/20 flex items-center justify-center">
                    <Gavel className="w-5 h-5 text-indigo-400" />
                  </div>
                  <h2 className="text-2xl font-display font-bold">11. Hukum yang Berlaku</h2>
                </div>
                <div className="space-y-4 text-slate-400 leading-relaxed">
                  <p>
                    <strong className="text-white">11.1 Yurisdiksi:</strong> Ketentuan ini diatur oleh dan ditafsirkan sesuai dengan hukum Republik Indonesia.
                  </p>
                  <p>
                    <strong className="text-white">11.2 Penyelesaian Sengketa:</strong> Setiap sengketa yang timbul dari atau sehubungan dengan Ketentuan ini akan diselesaikan secara musyawarah untuk mufakat terlebih dahulu. Apabila tidak tercapai kesepakatan dalam waktu 30 hari, sengketa akan diselesaikan melalui Badan Arbitrase Nasional Indonesia (BANI) di Jakarta sesuai dengan peraturan BANI yang berlaku.
                  </p>
                  <p>
                    <strong className="text-white">11.3 Keterpisahan:</strong> Jika ada ketentuan dalam dokumen ini yang dinyatakan tidak sah atau tidak dapat dilaksanakan oleh pengadilan yang berwenang, ketentuan lainnya tetap berlaku sepenuhnya.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fadeUp">
              <div id="perubahan" className="scroll-mt-24">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                    <RefreshCw className="w-5 h-5 text-yellow-400" />
                  </div>
                  <h2 className="text-2xl font-display font-bold">12. Perubahan Ketentuan</h2>
                </div>
                <div className="space-y-4 text-slate-400 leading-relaxed">
                  <p>
                    TecnoQris berhak mengubah Ketentuan Layanan ini dari waktu ke waktu. Perubahan material akan diberitahukan kepada Merchant melalui:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                      <span>Email ke alamat email terdaftar, minimal 30 hari sebelum perubahan berlaku</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                      <span>Notifikasi di dashboard saat Merchant login</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                      <span>Pembaruan halaman Ketentuan Layanan di website</span>
                    </li>
                  </ul>
                  <p>
                    Penggunaan layanan yang berkelanjutan setelah tanggal efektif perubahan menandakan penerimaan Merchant terhadap ketentuan yang diperbarui. Jika Merchant tidak setuju dengan perubahan, Merchant dapat menghentikan penggunaan layanan.
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
                  <h2 className="text-2xl font-display font-bold">13. Hubungi Kami</h2>
                </div>
                <div className="space-y-6">
                  <p className="text-slate-400 leading-relaxed">
                    Jika Anda memiliki pertanyaan mengenai Ketentuan Layanan ini, silakan hubungi:
                  </p>

                  <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-6">
                    <h3 className="font-bold text-lg mb-4">Tim Legal TecnoQris</h3>
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
                          <a href="mailto:legal@tecnoqris.id" className="text-sm text-blue-400 hover:underline" data-testid="link-email-legal">legal@tecnoqris.id</a>
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
                    Untuk pertanyaan operasional dan dukungan teknis, silakan hubungi <a href="mailto:support@tecnoqris.id" className="text-blue-400 hover:underline" data-testid="link-email-support">support@tecnoqris.id</a> atau kunjungi pusat bantuan di dashboard Anda.
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
              Membangun kepercayaan melalui transparansi dan kepatuhan
            </p>
            <div className="flex justify-center gap-8 text-sm text-slate-500">
              <Link href="/privasi" className="hover:text-white transition-colors" data-testid="link-privasi">Kebijakan Privasi</Link>
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
