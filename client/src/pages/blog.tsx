
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Clock, User, Search, ChevronRight } from "lucide-react";
import { Logo } from "@/components/Logo";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SocialMediaIcons } from "@/components/SocialMediaIcons";
import { useState, useEffect } from "react";

const AnonymousProfileSvg = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 16 16" fill="currentColor">
    <path fillRule="evenodd" d="m4.736 1.968-.892 3.269-.014.058C2.113 5.568 1 6.006 1 6.5 1 7.328 4.134 8 8 8s7-.672 7-1.5c0-.494-1.113-.932-2.83-1.205l-.014-.058-.892-3.27c-.146-.533-.698-.849-1.239-.734C9.411 1.363 8.62 1.5 8 1.5s-1.411-.136-2.025-.267c-.541-.115-1.093.2-1.239.735m.015 3.867a.25.25 0 0 1 .274-.224c.9.092 1.91.143 2.975.143a30 30 0 0 0 2.975-.143.25.25 0 0 1 .05.498c-.918.093-1.944.145-3.025.145s-2.107-.052-3.025-.145a.25.25 0 0 1-.224-.274M3.5 10h2a.5.5 0 0 1 .5.5v1a1.5 1.5 0 0 1-3 0v-1a.5.5 0 0 1 .5-.5m-1.5.5q.001-.264.085-.5H2a.5.5 0 0 1 0-1h3.5a1.5 1.5 0 0 1 1.488 1.312 3.5 3.5 0 0 1 2.024 0A1.5 1.5 0 0 1 10.5 9H14a.5.5 0 0 1 0 1h-.085q.084.236.085.5v1a2.5 2.5 0 0 1-5 0v-.14l-.21-.07a2.5 2.5 0 0 0-1.58 0l-.21.07v.14a2.5 2.5 0 0 1-5 0zm8.5-.5h2a.5.5 0 0 1 .5.5v1a1.5 1.5 0 0 1-3 0v-1a.5.5 0 0 1 .5-.5z"/>
  </svg>
);

const isFemale = (name: string): boolean => {
  const femaleNames = ["Sari", "Dewi", "Putri", "Wulan", "Anggraini", "Maharani"];
  return femaleNames.some(fn => name.toLowerCase().includes(fn.toLowerCase()));
};

import qrisPayment1 from "@assets/stock_images/qris_qr_code_payment_2f63f55d.jpg";
import qrisPayment2 from "@assets/stock_images/qris_qr_code_payment_16d0fc5e.jpg";
import qrisPayment3 from "@assets/stock_images/qris_qr_code_payment_fb60e63b.jpg";
import analytics1 from "@assets/stock_images/business_analytics_d_7bdcce47.jpg";
import analytics2 from "@assets/stock_images/business_analytics_d_6af2251d.jpg";
import security1 from "@assets/stock_images/cybersecurity_digita_7525356b.jpg";
import security2 from "@assets/stock_images/cybersecurity_digita_cf4da9c3.jpg";
import coffeeShop1 from "@assets/stock_images/coffee_shop_cafe_sma_ddeb608c.jpg";
import coffeeShop2 from "@assets/stock_images/coffee_shop_cafe_sma_18d7d013.jpg";

const blogPosts = [
  {
    id: 1,
    slug: "panduan-lengkap-qris-untuk-umkm-2024",
    title: "Panduan Lengkap QRIS untuk UMKM di Tahun 2024",
    excerpt: "Pelajari cara mengoptimalkan penggunaan QRIS untuk meningkatkan penjualan dan efisiensi operasional bisnis UMKM Anda. Artikel ini membahas langkah-langkah pendaftaran, tips implementasi, dan strategi memaksimalkan keuntungan dari pembayaran digital.",
    category: "Panduan",
    author: "Tim Editorial TecnoQris",
    authorRole: "Content Team",
    date: "8 Desember 2024",
    readTime: "8 menit",
    featured: true,
    image: qrisPayment1
  },
  {
    id: 2,
    slug: "qris-cross-border-peluang-bisnis-internasional",
    title: "QRIS Cross-Border: Membuka Peluang Bisnis Internasional",
    excerpt: "Bagaimana QRIS Cross-Border memungkinkan merchant Indonesia menerima pembayaran dari wisatawan mancanegara dengan mudah. Pelajari cara mengaktifkan fitur ini dan menjangkau pelanggan dari 6 negara ASEAN plus Tiongkok.",
    category: "Fitur",
    author: "Arief Budiman",
    authorRole: "CEO TecnoQris",
    date: "5 Desember 2024",
    readTime: "6 menit",
    featured: true,
    image: qrisPayment2
  },
  {
    id: 3,
    slug: "keamanan-transaksi-digital-tips-merchant",
    title: "Keamanan Transaksi Digital: Tips untuk Merchant",
    excerpt: "Praktik terbaik untuk menjaga keamanan transaksi digital dan melindungi bisnis Anda dari risiko fraud. Termasuk panduan verifikasi pembayaran, pengenalan modus penipuan, dan cara melaporkan aktivitas mencurigakan.",
    category: "Keamanan",
    author: "Sari Wulandari",
    authorRole: "CTO TecnoQris",
    date: "1 Desember 2024",
    readTime: "10 menit",
    featured: true,
    image: security1
  },
  {
    id: 4,
    slug: "tren-pembayaran-digital-indonesia-2025",
    title: "Tren Pembayaran Digital Indonesia 2025: Apa yang Perlu Diketahui",
    excerpt: "Analisis mendalam tentang arah perkembangan industri pembayaran digital di Indonesia dan bagaimana bisnis bisa mempersiapkan diri. Data terbaru menunjukkan pertumbuhan transaksi QRIS mencapai 215% year-over-year.",
    category: "Industri",
    author: "Rendra Pratama",
    authorRole: "COO TecnoQris",
    date: "28 November 2024",
    readTime: "12 menit",
    featured: false,
    image: analytics1
  },
  {
    id: 5,
    slug: "integrasi-qris-dengan-sistem-pos",
    title: "Integrasi QRIS dengan Sistem POS: Langkah demi Langkah",
    excerpt: "Tutorial teknis untuk mengintegrasikan pembayaran QRIS dengan sistem Point of Sale yang sudah ada di bisnis Anda. Dilengkapi dengan contoh kode dan dokumentasi API lengkap untuk berbagai platform POS populer.",
    category: "Tutorial",
    author: "Tim Teknis TecnoQris",
    authorRole: "Engineering Team",
    date: "25 November 2024",
    readTime: "15 menit",
    featured: false,
    image: analytics2
  },
  {
    id: 6,
    slug: "studi-kasus-warung-kopi-nusantara",
    title: "Studi Kasus: Bagaimana Warung Kopi Nusantara Meningkatkan Penjualan 40% dengan QRIS",
    excerpt: "Kisah sukses UMKM yang berhasil meningkatkan omzet dengan memanfaatkan pembayaran digital QRIS. Pak Joko, pemilik Warung Kopi Nusantara di Yogyakarta, berbagi pengalamannya dalam transformasi digital.",
    category: "Studi Kasus",
    author: "Putri Maharani",
    authorRole: "CPO TecnoQris",
    date: "20 November 2024",
    readTime: "7 menit",
    featured: false,
    image: coffeeShop1
  },
  {
    id: 7,
    slug: "perbedaan-qris-dinamis-statis",
    title: "QRIS Dinamis vs Statis: Mana yang Tepat untuk Bisnis Anda?",
    excerpt: "Memahami perbedaan kedua jenis QRIS dan kapan sebaiknya menggunakan masing-masing tipe untuk bisnis Anda. QRIS Dinamis cocok untuk transaksi dengan nominal berbeda, sementara QRIS Statis ideal untuk donasi atau pembayaran tetap.",
    category: "Panduan",
    author: "Budi Hartono",
    authorRole: "CCO TecnoQris",
    date: "15 November 2024",
    readTime: "5 menit",
    featured: false,
    image: qrisPayment3
  },
  {
    id: 8,
    slug: "regulasi-qris-terbaru-bank-indonesia",
    title: "Update Regulasi QRIS Terbaru dari Bank Indonesia",
    excerpt: "Rangkuman perubahan regulasi QRIS terkini dan dampaknya bagi merchant dan penyedia layanan pembayaran. Termasuk update tentang MDR, batas transaksi, dan persyaratan kepatuhan terbaru yang berlaku mulai Januari 2025.",
    category: "Regulasi",
    author: "Dewi Anggraini",
    authorRole: "CFO TecnoQris",
    date: "10 November 2024",
    readTime: "8 menit",
    featured: false,
    image: security2
  },
  {
    id: 9,
    slug: "optimasi-dashboard-tecnoqris",
    title: "Cara Mengoptimalkan Dashboard TecnoQris untuk Analisis Bisnis",
    excerpt: "Tips dan trik memanfaatkan fitur dashboard TecnoQris untuk mendapatkan insight bisnis yang actionable. Pelajari cara membaca laporan transaksi, menganalisis tren penjualan, dan mengekspor data untuk keperluan akuntansi.",
    category: "Tutorial",
    author: "Tim Produk TecnoQris",
    authorRole: "Product Team",
    date: "5 November 2024",
    readTime: "9 menit",
    featured: false,
    image: coffeeShop2
  }
];

const categories = [
  { name: "Semua", count: 9 },
  { name: "Panduan", count: 2 },
  { name: "Fitur", count: 1 },
  { name: "Keamanan", count: 1 },
  { name: "Industri", count: 1 },
  { name: "Tutorial", count: 2 },
  { name: "Studi Kasus", count: 1 },
  { name: "Regulasi", count: 1 }
];

export default function BlogPage() {
  const [scrolled, setScrolled] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");

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

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === "Semua" || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPosts = blogPosts.filter(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured || selectedCategory !== "Semua" || searchQuery);

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

      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 via-transparent to-transparent -z-10"></div>
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-gradient-radial from-blue-500/10 to-transparent blur-3xl -z-10"></div>
        
        <div className="container mx-auto px-6">
          <ScrollReveal animation="fadeUp" className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Blog TecnoQris
            </h1>
            <p className="text-lg text-slate-400">
              Insight, panduan, dan berita terbaru seputar pembayaran digital dan industri fintech Indonesia.
            </p>
          </ScrollReveal>

          <ScrollReveal animation="fadeUp" delay={0.1} className="max-w-xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input
                type="text"
                placeholder="Cari artikel..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-slate-900/50 border border-white/10 rounded-full text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
                data-testid="input-search"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {selectedCategory === "Semua" && !searchQuery && (
        <section className="py-12">
          <div className="container mx-auto px-6">
            <ScrollReveal animation="fadeUp" className="mb-8">
              <h2 className="text-2xl font-bold">Artikel Pilihan</h2>
            </ScrollReveal>
            
            <div className="grid lg:grid-cols-3 gap-6">
              <ScrollReveal animation="fadeLeft" className="lg:col-span-2 lg:row-span-2">
                <Link href={`/blog/${featuredPosts[0]?.slug}`}>
                  <article className="group h-full bg-gradient-to-br from-slate-900 to-slate-950 border border-white/10 rounded-3xl overflow-hidden hover:border-blue-500/30 transition-all cursor-pointer" data-testid={`card-blog-${featuredPosts[0]?.id}`}>
                    <div className="h-64 lg:h-80 relative overflow-hidden">
                      <img 
                        src={featuredPosts[0]?.image} 
                        alt={featuredPosts[0]?.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent"></div>
                    </div>
                    <div className="p-6 lg:p-8">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-xs font-medium rounded-full">{featuredPosts[0]?.category}</span>
                        <span className="text-slate-500 text-sm flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {featuredPosts[0]?.date}
                        </span>
                      </div>
                      <h3 className="text-2xl lg:text-3xl font-bold mb-4 group-hover:text-blue-400 transition-colors">{featuredPosts[0]?.title}</h3>
                      <p className="text-slate-400 mb-6 line-clamp-3">{featuredPosts[0]?.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            isFemale(featuredPosts[0]?.author || '') 
                              ? 'bg-gradient-to-br from-pink-800 to-pink-950' 
                              : 'bg-gradient-to-br from-blue-800 to-blue-950'
                          }`}>
                            <AnonymousProfileSvg className={`w-5 h-5 ${
                              isFemale(featuredPosts[0]?.author || '') ? 'text-pink-300' : 'text-blue-300'
                            }`} />
                          </div>
                          <div>
                            <p className="text-sm font-medium">{featuredPosts[0]?.author}</p>
                            <p className="text-xs text-slate-500">{featuredPosts[0]?.authorRole}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-slate-500">
                          <Clock className="w-4 h-4" />
                          {featuredPosts[0]?.readTime}
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              </ScrollReveal>

              {featuredPosts.slice(1, 3).map((post, index) => (
                <ScrollReveal key={post.id} animation="fadeRight" delay={index * 0.1}>
                  <Link href={`/blog/${post.slug}`}>
                    <article className="group h-full bg-gradient-to-br from-slate-900 to-slate-950 border border-white/10 rounded-2xl overflow-hidden hover:border-blue-500/30 transition-all cursor-pointer" data-testid={`card-blog-${post.id}`}>
                      <div className="h-40 relative overflow-hidden">
                        <img 
                          src={post.image} 
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent"></div>
                      </div>
                      <div className="p-5">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 text-xs font-medium rounded-full">{post.category}</span>
                          <span className="text-slate-500 text-xs">{post.date}</span>
                        </div>
                        <h3 className="font-bold mb-2 group-hover:text-blue-400 transition-colors line-clamp-2">{post.title}</h3>
                        <p className="text-sm text-slate-400 line-clamp-2 mb-4">{post.excerpt}</p>
                        <div className="flex items-center justify-between text-xs text-slate-500">
                          <div className="flex items-center gap-2">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                              isFemale(post.author) 
                                ? 'bg-gradient-to-br from-pink-800 to-pink-950' 
                                : 'bg-gradient-to-br from-blue-800 to-blue-950'
                            }`}>
                              <AnonymousProfileSvg className={`w-3.5 h-3.5 ${
                                isFemale(post.author) ? 'text-pink-300' : 'text-blue-300'
                              }`} />
                            </div>
                            <span>{post.author}</span>
                          </div>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {post.readTime}
                          </span>
                        </div>
                      </div>
                    </article>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="lg:w-64 shrink-0">
              <ScrollReveal animation="fadeLeft">
                <div className="sticky top-28">
                  <h3 className="font-bold mb-4 text-sm uppercase tracking-wider text-slate-400">Kategori</h3>
                  <ul className="space-y-2">
                    {categories.map((category) => (
                      <li key={category.name}>
                        <button
                          onClick={() => setSelectedCategory(category.name)}
                          className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-all flex items-center justify-between ${
                            selectedCategory === category.name
                              ? "bg-blue-500/20 text-blue-400"
                              : "text-slate-400 hover:bg-white/5 hover:text-white"
                          }`}
                          data-testid={`button-category-${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                        >
                          <span>{category.name}</span>
                          <span className="text-xs opacity-60">{category.count}</span>
                        </button>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 p-6 bg-gradient-to-br from-blue-900/30 to-slate-900 border border-blue-500/20 rounded-2xl">
                    <h4 className="font-bold mb-2">Newsletter</h4>
                    <p className="text-sm text-slate-400 mb-4">Dapatkan artikel terbaru langsung di inbox Anda.</p>
                    <input
                      type="email"
                      placeholder="Email Anda"
                      className="w-full px-4 py-2 bg-slate-900/50 border border-white/10 rounded-lg text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500/50 mb-3"
                      data-testid="input-newsletter"
                    />
                    <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-lg" data-testid="button-subscribe">
                      Berlangganan
                    </Button>
                  </div>

                  <div className="mt-8 p-6 bg-slate-900/50 border border-white/10 rounded-2xl">
                    <h4 className="font-bold mb-4">Ikuti Kami</h4>
                    <SocialMediaIcons variant="sidebar" />
                  </div>
                </div>
              </ScrollReveal>
            </div>

            <div className="flex-1">
              <ScrollReveal animation="fadeUp" className="mb-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold">
                    {selectedCategory === "Semua" ? "Semua Artikel" : `Kategori: ${selectedCategory}`}
                  </h2>
                  <span className="text-sm text-slate-500">{filteredPosts.length} artikel</span>
                </div>
              </ScrollReveal>

              {(selectedCategory !== "Semua" || searchQuery) && filteredPosts.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mx-auto mb-4">
                    <Search className="w-8 h-8 text-slate-600" />
                  </div>
                  <p className="text-slate-400 mb-2">Tidak ada artikel ditemukan</p>
                  <p className="text-sm text-slate-500">Coba kata kunci lain atau pilih kategori berbeda</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-6">
                  {(selectedCategory === "Semua" && !searchQuery ? regularPosts : filteredPosts).map((post, index) => (
                    <ScrollReveal key={post.id} animation="fadeUp" delay={index * 0.05}>
                      <Link href={`/blog/${post.slug}`}>
                        <article className="group bg-gradient-to-br from-slate-900 to-slate-950 border border-white/10 rounded-2xl overflow-hidden hover:border-blue-500/30 transition-all cursor-pointer h-full" data-testid={`card-blog-${post.id}`}>
                          <div className="h-44 relative overflow-hidden">
                            <img 
                              src={post.image} 
                              alt={post.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent"></div>
                            <span className="absolute top-3 left-3 px-2 py-0.5 bg-blue-500/90 text-white text-xs font-medium rounded-full">{post.category}</span>
                          </div>
                          <div className="p-5">
                            <div className="flex items-center gap-2 mb-3 text-xs text-slate-500">
                              <Calendar className="w-3 h-3" />
                              <span>{post.date}</span>
                              <span className="mx-1">·</span>
                              <Clock className="w-3 h-3" />
                              <span>{post.readTime}</span>
                            </div>
                            <h3 className="font-bold mb-2 group-hover:text-blue-400 transition-colors line-clamp-2">{post.title}</h3>
                            <p className="text-sm text-slate-400 line-clamp-2 mb-4">{post.excerpt}</p>
                            <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                isFemale(post.author) 
                                  ? 'bg-gradient-to-br from-pink-800 to-pink-950' 
                                  : 'bg-gradient-to-br from-blue-800 to-blue-950'
                              }`}>
                                <AnonymousProfileSvg className={`w-4 h-4 ${
                                  isFemale(post.author) ? 'text-pink-300' : 'text-blue-300'
                                }`} />
                              </div>
                              <div>
                                <p className="text-sm font-medium">{post.author}</p>
                                <p className="text-xs text-slate-500">{post.authorRole}</p>
                              </div>
                            </div>
                          </div>
                        </article>
                      </Link>
                    </ScrollReveal>
                  ))}
                </div>
              )}

              {filteredPosts.length > 6 && (
                <ScrollReveal animation="fadeUp" delay={0.3} className="mt-12 text-center">
                  <Button variant="outline" className="border-white/20 hover:bg-white/5 rounded-full px-8" data-testid="button-load-more">
                    Muat Lebih Banyak
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </ScrollReveal>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6">
        <ScrollReveal animation="fadeUp" className="container mx-auto relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-[3rem] -z-10"></div>
          <div className="bg-[#0f172a] border border-white/10 rounded-[2.5rem] p-12 md:p-16 text-center overflow-hidden relative">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Ingin Berkontribusi?
            </h2>
            <p className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto">
              Kami membuka kesempatan untuk para praktisi fintech dan pelaku UMKM untuk berbagi pengalaman dan insight melalui blog kami.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="mailto:editorial@tecnoqris.id">
                <Button size="lg" className="h-12 px-8 bg-white text-black hover:bg-slate-200 rounded-full font-bold" data-testid="button-contribute">
                  Hubungi Tim Editorial
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </a>
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
                Platform payment gateway QRIS untuk bisnis Indonesia. Solusi pembayaran digital yang terintegrasi dan terpercaya.
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
            <p className="text-xs sm:text-sm whitespace-nowrap">&copy; 2019-2025 TecnoQris Inc.</p>
            <div className="flex gap-8">
              <Link href="/privasi" className="hover:text-white transition-colors">Privasi</Link>
              <Link href="/ketentuan" className="hover:text-white transition-colors">Ketentuan</Link>
              <Link href="/keamanan" className="hover:text-white transition-colors">Keamanan</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
