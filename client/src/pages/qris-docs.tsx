import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Globe, 
  QrCode, 
  Wallet, 
  Shield, 
  Zap, 
  Clock, 
  CheckCircle, 
  ArrowRight,
  Store,
  Smartphone,
  CreditCard,
  TrendingUp,
  Users,
  Building2,
  FileText,
  AlertCircle,
  Info,
  DollarSign,
  Percent,
  RefreshCw,
  Lock,
  Banknote
} from "lucide-react";
import { Link } from "wouter";

export default function QrisDocsPage() {
  const countries = [
    { flag: "🇮🇩", name: "Indonesia", code: "ID", status: "Live", currency: "IDR", since: "2019" },
    { flag: "🇹🇭", name: "Thailand", code: "TH", status: "Live", currency: "THB", since: "2021" },
    { flag: "🇲🇾", name: "Malaysia", code: "MY", status: "Live", currency: "MYR", since: "2023" },
    { flag: "🇸🇬", name: "Singapura", code: "SG", status: "Live", currency: "SGD", since: "2023" },
    { flag: "🇯🇵", name: "Jepang", code: "JP", status: "Coming 2025", currency: "JPY", since: "-" },
    { flag: "🇱🇦", name: "Laos", code: "LA", status: "Live", currency: "LAK", since: "2024" },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8 max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-display font-bold flex items-center gap-3" data-testid="heading-qris-docs">
              <QrCode className="h-7 w-7 text-primary" />
              Dokumentasi QRIS Lengkap
            </h1>
            <p className="text-sm md:text-base text-muted-foreground mt-1">
              Panduan lengkap seputar QRIS, pembayaran lintas negara, dan integrasi dengan TecnoQris.
            </p>
          </div>
          <Link href="/qr-generator">
            <Button data-testid="button-generate-qr">
              <QrCode className="h-4 w-4 mr-2" />
              Generate QRIS
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-4 gap-4">
          <Card className="hover:border-primary/50 transition-colors cursor-pointer" onClick={() => document.getElementById('apa-itu-qris')?.scrollIntoView({ behavior: 'smooth' })}>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-500/10">
                <Info className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="font-medium text-sm">Apa itu QRIS?</p>
                <p className="text-xs text-muted-foreground">Pengenalan dasar</p>
              </div>
            </CardContent>
          </Card>
          <Card className="hover:border-primary/50 transition-colors cursor-pointer" onClick={() => document.getElementById('jenis-qris')?.scrollIntoView({ behavior: 'smooth' })}>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-500/10">
                <QrCode className="h-5 w-5 text-purple-500" />
              </div>
              <div>
                <p className="font-medium text-sm">Jenis QRIS</p>
                <p className="text-xs text-muted-foreground">Dinamis & Statis</p>
              </div>
            </CardContent>
          </Card>
          <Card className="hover:border-primary/50 transition-colors cursor-pointer" onClick={() => document.getElementById('cross-border')?.scrollIntoView({ behavior: 'smooth' })}>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-500/10">
                <Globe className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <p className="font-medium text-sm">Lintas Negara</p>
                <p className="text-xs text-muted-foreground">6 negara partner</p>
              </div>
            </CardContent>
          </Card>
          <Card className="hover:border-primary/50 transition-colors cursor-pointer" onClick={() => document.getElementById('biaya')?.scrollIntoView({ behavior: 'smooth' })}>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-orange-500/10">
                <Percent className="h-5 w-5 text-orange-500" />
              </div>
              <div>
                <p className="font-medium text-sm">Biaya</p>
                <p className="text-xs text-muted-foreground">Hanya 1%</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <section id="apa-itu-qris" className="scroll-mt-20">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5 text-blue-500" />
                Apa itu QRIS?
              </CardTitle>
              <CardDescription>
                Pengenalan lengkap tentang Quick Response Code Indonesian Standard
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <p className="text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">QRIS (Quick Response Code Indonesian Standard)</strong> adalah standar QR Code pembayaran nasional Indonesia yang ditetapkan oleh Bank Indonesia pada tahun 2019. QRIS menyatukan berbagai metode pembayaran digital ke dalam satu QR Code tunggal, sehingga merchant cukup memiliki satu QR Code untuk menerima pembayaran dari berbagai aplikasi e-wallet dan mobile banking.
                </p>
                
                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <div className="bg-blue-500/5 border border-blue-500/20 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-500 flex items-center gap-2 mb-3">
                      <Building2 className="h-4 w-4" />
                      Diatur oleh Bank Indonesia
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      QRIS dikembangkan dan diawasi langsung oleh Bank Indonesia sebagai regulator sistem pembayaran nasional. Standar ini mengikuti spesifikasi EMV QR Code untuk interoperabilitas internasional.
                    </p>
                  </div>
                  
                  <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-4">
                    <h4 className="font-semibold text-green-500 flex items-center gap-2 mb-3">
                      <CheckCircle className="h-4 w-4" />
                      Interoperabilitas Penuh
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Satu QR Code dapat dipindai oleh semua aplikasi pembayaran yang terdaftar di Bank Indonesia, termasuk GoPay, OVO, DANA, ShopeePay, LinkAja, dan seluruh mobile banking di Indonesia.
                    </p>
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="font-semibold mb-3">Keunggulan QRIS:</h4>
                  <div className="grid md:grid-cols-2 gap-3">
                    {[
                      { icon: Zap, text: "Transaksi instan dalam hitungan detik" },
                      { icon: Shield, text: "Aman dengan enkripsi end-to-end" },
                      { icon: Wallet, text: "Satu QR untuk semua aplikasi pembayaran" },
                      { icon: TrendingUp, text: "Laporan transaksi real-time" },
                      { icon: Users, text: "Jangkauan 200+ juta pengguna" },
                      { icon: DollarSign, text: "Biaya transaksi rendah" },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm">
                        <item.icon className="h-4 w-4 text-primary" />
                        <span className="text-muted-foreground">{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section id="jenis-qris" className="scroll-mt-20">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <QrCode className="h-5 w-5 text-purple-500" />
                Jenis-Jenis QRIS
              </CardTitle>
              <CardDescription>
                Perbedaan antara QRIS Dinamis dan QRIS Statis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="dinamis" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="dinamis" className="gap-2">
                    <RefreshCw className="h-4 w-4" />
                    QRIS Dinamis
                  </TabsTrigger>
                  <TabsTrigger value="statis" className="gap-2">
                    <Lock className="h-4 w-4" />
                    QRIS Statis
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="dinamis" className="mt-6 space-y-6">
                  <div className="bg-blue-500/5 border border-blue-500/20 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-blue-500 mb-4 flex items-center gap-2">
                      <RefreshCw className="h-5 w-5" />
                      QRIS Dinamis
                    </h3>
                    
                    <p className="text-muted-foreground mb-6">
                      QRIS Dinamis adalah QR Code yang dibuat secara unik untuk setiap transaksi dengan nominal pembayaran yang sudah ditentukan. QR Code ini hanya bisa digunakan satu kali dan memiliki masa berlaku tertentu.
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3 text-green-500">Keunggulan:</h4>
                        <ul className="space-y-2">
                          {[
                            "Nominal sudah tertera, menghindari kesalahan input",
                            "Lebih aman karena sekali pakai",
                            "Cocok untuk e-commerce dan online shop",
                            "Dapat dilacak per transaksi",
                            "Mendukung multiple item dalam satu invoice",
                            "Integrasi mudah dengan sistem POS",
                          ].map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-3 text-blue-500">Ideal untuk:</h4>
                        <ul className="space-y-2">
                          {[
                            "Toko online / E-commerce",
                            "Aplikasi mobile / Web app",
                            "Sistem kasir (POS) modern",
                            "Invoice digital",
                            "Pembayaran jarak jauh",
                            "Transaksi dengan nominal besar",
                          ].map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <ArrowRight className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div className="mt-6 p-4 bg-black/20 rounded-lg">
                      <h4 className="font-semibold mb-2 text-sm">Contoh Penggunaan:</h4>
                      <p className="text-sm text-muted-foreground">
                        Pelanggan berbelanja di toko online Anda senilai Rp 250.000. Sistem Anda membuat QRIS dinamis dengan nominal tersebut. Pelanggan scan QR, konfirmasi pembayaran (nominal sudah terisi otomatis), dan transaksi selesai. QR tersebut tidak bisa dipakai lagi untuk transaksi berikutnya.
                      </p>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="statis" className="mt-6 space-y-6">
                  <div className="bg-purple-500/5 border border-purple-500/20 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-purple-500 mb-4 flex items-center gap-2">
                      <Lock className="h-5 w-5" />
                      QRIS Statis
                    </h3>
                    
                    <p className="text-muted-foreground mb-6">
                      QRIS Statis adalah QR Code tetap yang dapat digunakan berulang kali tanpa batas waktu. Pelanggan yang memindai QR ini harus memasukkan nominal pembayaran secara manual di aplikasi mereka.
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3 text-green-500">Keunggulan:</h4>
                        <ul className="space-y-2">
                          {[
                            "Dapat digunakan berulang kali",
                            "Bisa dicetak dan ditempel di kasir",
                            "Tidak perlu sistem untuk generate QR",
                            "Praktis untuk usaha kecil",
                            "Biaya implementasi rendah",
                            "Tidak memerlukan koneksi internet saat transaksi",
                          ].map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-3 text-purple-500">Ideal untuk:</h4>
                        <ul className="space-y-2">
                          {[
                            "UMKM dan warung",
                            "Toko fisik / retail",
                            "Pasar tradisional",
                            "PKL dan pedagang keliling",
                            "Tempat makan / restoran kecil",
                            "Donasi dan sumbangan",
                          ].map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <ArrowRight className="h-4 w-4 text-purple-500 mt-0.5 flex-shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div className="mt-6 p-4 bg-black/20 rounded-lg">
                      <h4 className="font-semibold mb-2 text-sm">Contoh Penggunaan:</h4>
                      <p className="text-sm text-muted-foreground">
                        Pemilik warung makan mencetak stiker QRIS dan menempelkannya di meja kasir. Setiap pelanggan yang ingin bayar cukup scan QR tersebut, masukkan nominal (misal Rp 35.000), dan konfirmasi pembayaran. QR yang sama dipakai terus untuk semua pelanggan.
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
              
              <div className="mt-8">
                <h4 className="font-semibold mb-4">Perbandingan Singkat:</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 font-medium">Aspek</th>
                        <th className="text-left py-3 px-4 font-medium text-blue-500">QRIS Dinamis</th>
                        <th className="text-left py-3 px-4 font-medium text-purple-500">QRIS Statis</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { aspect: "Nominal", dinamis: "Sudah terisi otomatis", statis: "Input manual oleh pelanggan" },
                        { aspect: "Penggunaan", dinamis: "Sekali pakai", statis: "Berulang kali" },
                        { aspect: "Masa Berlaku", dinamis: "Terbatas (biasanya 30 menit)", statis: "Permanen" },
                        { aspect: "Keamanan", dinamis: "Lebih tinggi", statis: "Standar" },
                        { aspect: "Implementasi", dinamis: "Butuh integrasi API", statis: "Cetak dan tempel" },
                        { aspect: "Cocok untuk", dinamis: "Online, e-commerce", statis: "Offline, UMKM" },
                      ].map((row, i) => (
                        <tr key={i} className="border-b border-border/50">
                          <td className="py-3 px-4 font-medium">{row.aspect}</td>
                          <td className="py-3 px-4 text-muted-foreground">{row.dinamis}</td>
                          <td className="py-3 px-4 text-muted-foreground">{row.statis}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section id="cross-border" className="scroll-mt-20">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-green-500" />
                QRIS Lintas Negara (Cross-Border)
              </CardTitle>
              <CardDescription>
                Pembayaran internasional dengan QRIS di 6 negara Asia
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <p className="text-muted-foreground leading-relaxed">
                  Melalui kerjasama Bank Indonesia dengan bank sentral negara-negara ASEAN dan Jepang, QRIS kini dapat digunakan untuk pembayaran lintas negara. Wisatawan Indonesia dapat membayar di luar negeri menggunakan aplikasi e-wallet Indonesia, dan sebaliknya, wisatawan asing dapat membayar di Indonesia menggunakan aplikasi pembayaran dari negara mereka.
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
                {countries.map((country) => (
                  <div 
                    key={country.code} 
                    className="bg-muted/30 border rounded-lg p-4 hover:border-primary/50 transition-colors"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-3xl">{country.flag}</span>
                      <div>
                        <p className="font-semibold">{country.name}</p>
                        <p className="text-xs text-muted-foreground">{country.code}</p>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Status:</span>
                        <Badge variant={country.status === "Live" ? "default" : "secondary"} className="text-xs">
                          {country.status}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Mata Uang:</span>
                        <span className="font-mono text-xs">{country.currency}</span>
                      </div>
                      {country.since !== "-" && (
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Sejak:</span>
                          <span className="text-xs">{country.since}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div className="bg-blue-500/5 border border-blue-500/20 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-500 flex items-center gap-2 mb-3">
                    <Smartphone className="h-4 w-4" />
                    Untuk Wisatawan Indonesia di Luar Negeri
                  </h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      Scan QR lokal (PromptPay, DuitNow, NETS, dll) menggunakan aplikasi e-wallet Indonesia
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      Konversi mata uang otomatis ke Rupiah dengan kurs kompetitif
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      Tidak perlu tukar uang tunai atau bawa banyak cash
                    </li>
                  </ul>
                </div>
                
                <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-4">
                  <h4 className="font-semibold text-green-500 flex items-center gap-2 mb-3">
                    <Store className="h-4 w-4" />
                    Untuk Merchant di Indonesia
                  </h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      Terima pembayaran dari wisatawan asing dengan QRIS yang sama
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      Settlement tetap dalam Rupiah
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      Perluas jangkauan pelanggan ke pasar internasional
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 mt-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-amber-500 mb-1">Catatan Penting:</h4>
                    <p className="text-sm text-muted-foreground">
                      Untuk pembayaran lintas negara, pastikan aplikasi e-wallet atau mobile banking Anda sudah mendukung fitur QRIS Cross-Border. Tidak semua aplikasi pembayaran sudah mendukung fitur ini. Cek pembaruan aplikasi Anda secara berkala.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section id="biaya" className="scroll-mt-20">
          <Card className="border-green-500/30 bg-gradient-to-br from-green-500/5 to-transparent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Percent className="h-5 w-5 text-green-500" />
                Biaya Transaksi TecnoQris
              </CardTitle>
              <CardDescription>
                Struktur biaya transparan dan termurah di Indonesia
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="text-center md:text-left">
                  <div className="flex items-baseline gap-2 justify-center md:justify-start">
                    <span className="text-6xl md:text-8xl font-display font-bold text-green-500">1%</span>
                    <span className="text-xl text-muted-foreground">per transaksi</span>
                  </div>
                  <p className="text-lg text-muted-foreground mt-2">
                    Biaya termurah di Indonesia untuk layanan QRIS Payment Gateway
                  </p>
                  <Badge className="mt-3 bg-green-500/20 text-green-500 border-green-500/30">
                    🔥 Termurah di Indonesia!
                  </Badge>
                </div>
                
                <div className="flex-1 grid grid-cols-2 gap-4 w-full">
                  {[
                    { icon: Banknote, title: "Tanpa Biaya Setup", desc: "Gratis pendaftaran dan aktivasi" },
                    { icon: Clock, title: "Tanpa Biaya Bulanan", desc: "Tidak ada subscription fee" },
                    { icon: Zap, title: "Settlement Instan", desc: "Dana masuk dalam hitungan menit" },
                    { icon: Shield, title: "Transaksi Aman", desc: "Enkripsi end-to-end" },
                  ].map((item, i) => (
                    <div key={i} className="bg-background/50 border rounded-lg p-4">
                      <item.icon className="h-5 w-5 text-green-500 mb-2" />
                      <h4 className="font-semibold text-sm">{item.title}</h4>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="border-t pt-6 mt-6">
                <h4 className="font-semibold mb-4">Perbandingan Biaya dengan Kompetitor:</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 font-medium">Layanan</th>
                        <th className="text-left py-3 px-4 font-medium">Biaya Transaksi</th>
                        <th className="text-left py-3 px-4 font-medium">Biaya Setup</th>
                        <th className="text-left py-3 px-4 font-medium">Biaya Bulanan</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border/50 bg-green-500/5">
                        <td className="py-3 px-4 font-semibold text-green-500">TecnoQris</td>
                        <td className="py-3 px-4 text-green-500 font-bold">1%</td>
                        <td className="py-3 px-4 text-green-500">Gratis</td>
                        <td className="py-3 px-4 text-green-500">Gratis</td>
                      </tr>
                      <tr className="border-b border-border/50">
                        <td className="py-3 px-4 text-muted-foreground">Kompetitor A</td>
                        <td className="py-3 px-4 text-muted-foreground">1.5% - 2%</td>
                        <td className="py-3 px-4 text-muted-foreground">Rp 500.000</td>
                        <td className="py-3 px-4 text-muted-foreground">Rp 100.000</td>
                      </tr>
                      <tr className="border-b border-border/50">
                        <td className="py-3 px-4 text-muted-foreground">Kompetitor B</td>
                        <td className="py-3 px-4 text-muted-foreground">2% - 2.5%</td>
                        <td className="py-3 px-4 text-muted-foreground">Gratis</td>
                        <td className="py-3 px-4 text-muted-foreground">Rp 150.000</td>
                      </tr>
                      <tr className="border-b border-border/50">
                        <td className="py-3 px-4 text-muted-foreground">Kompetitor C</td>
                        <td className="py-3 px-4 text-muted-foreground">1.8%</td>
                        <td className="py-3 px-4 text-muted-foreground">Rp 300.000</td>
                        <td className="py-3 px-4 text-muted-foreground">Gratis</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Info className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-blue-500 mb-1">Contoh Perhitungan:</h4>
                    <p className="text-sm text-muted-foreground">
                      Jika Anda menerima pembayaran Rp 1.000.000, biaya yang dikenakan hanya <strong className="text-foreground">Rp 10.000 (1%)</strong>. 
                      Anda menerima bersih <strong className="text-foreground">Rp 990.000</strong>. 
                      Bandingkan dengan kompetitor yang mengenakan 2%, Anda akan dikenakan Rp 20.000 dan hanya menerima Rp 980.000.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section id="cara-kerja" className="scroll-mt-20">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-500" />
                Cara Kerja QRIS di TecnoQris
              </CardTitle>
              <CardDescription>
                Alur transaksi dari pembuatan QR hingga settlement
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-4">
                {[
                  {
                    step: 1,
                    title: "Buat Pembayaran",
                    desc: "Merchant membuat request pembayaran melalui API atau dashboard dengan nominal tertentu",
                    icon: FileText,
                    color: "blue"
                  },
                  {
                    step: 2,
                    title: "Generate QRIS",
                    desc: "Sistem TecnoQris menghasilkan QRIS dinamis yang siap ditampilkan ke pelanggan",
                    icon: QrCode,
                    color: "purple"
                  },
                  {
                    step: 3,
                    title: "Pelanggan Bayar",
                    desc: "Pelanggan scan QRIS dengan aplikasi e-wallet atau mobile banking mereka",
                    icon: Smartphone,
                    color: "green"
                  },
                  {
                    step: 4,
                    title: "Settlement",
                    desc: "Dana masuk ke akun merchant dalam hitungan menit, notifikasi terkirim otomatis",
                    icon: CreditCard,
                    color: "orange"
                  },
                ].map((item) => (
                  <div key={item.step} className="relative">
                    <div className={`bg-${item.color}-500/10 border border-${item.color}-500/30 rounded-lg p-4 h-full`}>
                      <div className={`w-8 h-8 rounded-full bg-${item.color}-500/20 flex items-center justify-center mb-3`}>
                        <span className={`font-bold text-${item.color}-500`}>{item.step}</span>
                      </div>
                      <item.icon className={`h-6 w-6 text-${item.color}-500 mb-2`} />
                      <h4 className="font-semibold mb-2">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                    {item.step < 4 && (
                      <div className="hidden md:block absolute top-1/2 -right-2 transform -translate-y-1/2">
                        <ArrowRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        <section id="faq" className="scroll-mt-20">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5 text-blue-500" />
                Pertanyaan Umum (FAQ)
              </CardTitle>
              <CardDescription>
                Jawaban untuk pertanyaan yang sering diajukan
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  q: "Berapa lama waktu yang dibutuhkan untuk aktivasi akun?",
                  a: "Proses aktivasi akun TecnoQris sangat cepat. Setelah Anda mendaftar dan melengkapi data, akun Anda akan aktif dalam hitungan menit. Tidak ada proses verifikasi berbelit yang memakan waktu berhari-hari."
                },
                {
                  q: "Apakah saya perlu memiliki badan usaha untuk menggunakan TecnoQris?",
                  a: "Tidak. TecnoQris dapat digunakan oleh individu maupun badan usaha. Untuk individu, Anda cukup melengkapi data KTP dan informasi rekening bank untuk pencairan dana."
                },
                {
                  q: "Bagaimana cara menerima pembayaran dari wisatawan asing?",
                  a: "QRIS Anda sudah otomatis mendukung pembayaran lintas negara. Wisatawan dari Thailand, Malaysia, Singapura, dan negara partner lainnya dapat langsung scan QRIS Anda menggunakan aplikasi pembayaran dari negara mereka."
                },
                {
                  q: "Apakah ada batas minimum atau maksimum transaksi?",
                  a: "Minimum transaksi adalah Rp 1.000. Untuk maksimum transaksi per hari, tergantung pada tier akun Anda. Akun standar memiliki batas Rp 50.000.000 per hari, sementara akun premium memiliki batas lebih tinggi."
                },
                {
                  q: "Kapan dana masuk ke rekening saya?",
                  a: "TecnoQris menawarkan settlement instan. Dana dari transaksi akan masuk ke rekening Anda dalam hitungan menit setelah transaksi berhasil, 24 jam sehari, 7 hari seminggu."
                },
                {
                  q: "Apakah QRIS TecnoQris bisa dipindai oleh semua aplikasi e-wallet?",
                  a: "Ya. QRIS TecnoQris mengikuti standar Bank Indonesia sehingga dapat dipindai oleh semua aplikasi pembayaran yang terdaftar di Indonesia, termasuk GoPay, OVO, DANA, ShopeePay, LinkAja, dan seluruh mobile banking."
                },
                {
                  q: "Bagaimana cara integrasi QRIS ke sistem saya?",
                  a: "TecnoQris menyediakan REST API yang mudah diintegrasikan. Kami juga menyediakan SDK untuk berbagai bahasa pemrograman (PHP, JavaScript, Python) dan contoh kode yang lengkap. Lihat halaman Dokumentasi API untuk panduan lengkap."
                },
                {
                  q: "Apakah ada biaya tersembunyi?",
                  a: "Tidak ada biaya tersembunyi. Anda hanya dikenakan 1% dari setiap transaksi yang berhasil. Tidak ada biaya setup, biaya bulanan, biaya minimum, atau biaya lainnya."
                },
              ].map((item, i) => (
                <div key={i} className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-2 flex items-start gap-2">
                    <span className="text-primary">Q:</span>
                    {item.q}
                  </h4>
                  <p className="text-sm text-muted-foreground pl-5">
                    <span className="font-semibold text-green-500">A:</span> {item.a}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        <section className="pb-8">
          <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-primary/30">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-display font-bold mb-4">Siap Memulai?</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Bergabung dengan ribuan merchant yang sudah menggunakan TecnoQris untuk menerima pembayaran QRIS dengan biaya termurah di Indonesia.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/qr-generator">
                  <Button size="lg" data-testid="button-start-now">
                    <QrCode className="h-4 w-4 mr-2" />
                    Mulai Sekarang
                  </Button>
                </Link>
                <Link href="/api-docs">
                  <Button size="lg" variant="outline" data-testid="button-view-api-docs">
                    <FileText className="h-4 w-4 mr-2" />
                    Lihat Dokumentasi API
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </DashboardLayout>
  );
}
