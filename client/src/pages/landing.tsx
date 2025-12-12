
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Zap, Globe, CheckCircle2, ChevronRight, Play, CreditCard, Smartphone, BarChart3, Lock, Bell, User, Laptop, Clock } from "lucide-react";
import { SocialMediaIcons } from "@/components/SocialMediaIcons";
const heroImage = "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1200&q=80";
import { useState, useEffect, useMemo } from "react";
import { Logo } from "@/components/Logo";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ScrollReveal";
import { ScrollTiltText } from "@/components/ScrollTiltText";

function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9999) * 10000;
  return x - Math.floor(x);
}

function calculateLiveVolume(): number {
  const startDate = new Date('2025-12-10');
  const baseVolume = 124500000;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const daysDiff = Math.floor((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  
  let totalVolume = baseVolume;
  for (let i = 0; i < daysDiff; i++) {
    const dailySeed = startDate.getTime() + (i * 24 * 60 * 60 * 1000);
    const randomMultiplier = seededRandom(dailySeed);
    const dailyIncrease = 8000000 + Math.floor(randomMultiplier * 12000000);
    totalVolume += dailyIncrease;
  }
  
  return totalVolume;
}

function calculatePaymentSuccess(): number {
  const startDate = new Date('2025-12-10');
  const basePayment = 20000000;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const daysDiff = Math.floor((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  
  let totalPayment = basePayment;
  for (let i = 0; i < daysDiff; i++) {
    const dailySeed = startDate.getTime() + (i * 24 * 60 * 60 * 1000) + 999;
    const randomMultiplier = seededRandom(dailySeed);
    const dailyIncrease = 8000000 + Math.floor(randomMultiplier * 12000000);
    totalPayment += dailyIncrease;
  }
  
  return totalPayment;
}

function formatRupiah(amount: number): string {
  return 'Rp ' + amount.toLocaleString('id-ID');
}

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const [liveVolume, setLiveVolume] = useState(() => calculateLiveVolume());
  const [paymentSuccess, setPaymentSuccess] = useState(() => calculatePaymentSuccess());
  
  const allUsers = [
    "Ahmad Rizki", "Budi Santoso", "Citra Dewi", "Dian Pratama", "Eka Putri",
    "Fajar Nugroho", "Gita Sari", "Hendra Wijaya", "Indah Permata", "Joko Susilo",
    "Kartika Sari", "Lukman Hakim", "Maya Anggraini", "Nadia Fitri", "Oscar Putra",
    "Putri Ayu", "Rudi Hermawan", "Sinta Maharani", "Taufik Hidayat", "Umar Bakri",
    "Vina Oktavia", "Wawan Setiawan", "Xena Paramita", "Yusuf Rahman", "Zahra Amelia"
  ];
  
  const getRandomUsers = () => {
    const shuffled = [...allUsers].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 3);
  };
  
  const [displayedUsers, setDisplayedUsers] = useState(() => getRandomUsers());
  
  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayedUsers(getRandomUsers());
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  
  const getInitials = (name: string) => {
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return parts[0].charAt(0) + parts[1].charAt(parts[1].length - 1);
    }
    return name.charAt(0) + name.charAt(name.length - 1);
  };

  useEffect(() => {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    const msUntilMidnight = tomorrow.getTime() - now.getTime();

    const timeoutId = setTimeout(() => {
      setLiveVolume(calculateLiveVolume());
      setPaymentSuccess(calculatePaymentSuccess());
      const intervalId = setInterval(() => {
        setLiveVolume(calculateLiveVolume());
        setPaymentSuccess(calculatePaymentSuccess());
      }, 24 * 60 * 60 * 1000);
      return () => clearInterval(intervalId);
    }, msUntilMidnight);

    return () => clearTimeout(timeoutId);
  }, []);

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

  return (
    <div className="min-h-screen bg-[#020817] text-white overflow-x-hidden font-sans selection:bg-primary/30" role="main">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-white focus:text-black focus:px-4 focus:py-2 focus:rounded">
        Skip to main content
      </a>
      <header>
        <nav 
          className={`fixed top-0 w-full z-50 transition-all duration-200 ${scrolled ? "bg-[#020817]/95 border-b border-white/10 py-3" : "bg-transparent py-6"}`}
          aria-label="Main navigation"
        >
          <div className="container mx-auto px-6 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group cursor-pointer" aria-label="TecnoQris Home">
              <Logo className="h-10 w-10 group-hover:scale-105 transition-transform duration-300 drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]" aria-hidden="true" />
              <span className="text-xl font-display font-bold tracking-tight">TecnoQris</span>
            </Link>
            
            <ul className="hidden md:flex items-center gap-10 text-sm font-medium text-slate-300">
              <li>
                <a 
                  href="#pricing" 
                  className="hover:text-white transition-colors relative group focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#020817] rounded px-2 py-1"
                >
                  Harga
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full" aria-hidden="true"></span>
                </a>
              </li>
              <li>
                <Link 
                  href="/qris-docs" 
                  className="hover:text-white transition-colors relative group focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#020817] rounded px-2 py-1"
                >
                  Dokumentasi QRIS
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full" aria-hidden="true"></span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/api-docs" 
                  className="hover:text-white transition-colors relative group focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#020817] rounded px-2 py-1"
                >
                  API
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full" aria-hidden="true"></span>
                </Link>
              </li>
            </ul>

            <div className="flex items-center gap-4">
              <Link href="/login">
                <Button 
                  variant="ghost" 
                  className="hidden sm:inline-flex hover:bg-white/5 text-slate-300 hover:text-white focus:ring-2 focus:ring-blue-500"
                  data-testid="button-login"
                >
                  Masuk
                </Button>
              </Link>
              <Link href="/login">
                <Button 
                  className="bg-white text-black hover:bg-slate-200 font-semibold rounded-full px-6 shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)] transition-all hover:shadow-[0_0_25px_-5px_rgba(255,255,255,0.5)] focus:ring-2 focus:ring-blue-500"
                  data-testid="button-get-started"
                >
                  Mulai Sekarang
                </Button>
              </Link>
            </div>
          </div>
        </nav>
      </header>
      <main id="main-content">
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6 overflow-visible" aria-labelledby="hero-heading">
        {/* Background Elements - Lightweight gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-radial from-blue-600/20 to-transparent -z-10"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-gradient-radial from-purple-600/15 to-transparent -z-10"></div>
        
        {/* Grid Pattern - Simplified for performance */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px] -z-10"></div>

        <div className="container mx-auto relative z-20">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-900/40 border border-blue-500/30 text-xs font-medium text-blue-300 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                <span className="tracking-wide uppercase">Payment Gateway QRIS</span>
                <div className="w-px h-3 bg-blue-500/30 mx-1"></div>
                <span className="text-blue-100 flex items-center cursor-pointer hover:underline">
                  Lihat Dokumentasi <ChevronRight className="w-3 h-3 ml-1" />
                </span>
              </div>
              
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold leading-[1.1] mb-8 tracking-tight animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
                Platform <br />
                <span className="text-slate-200">Payment Gateway QRIS</span>
              </h1>
              
              <p className="text-lg sm:text-xl text-slate-400 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200">
                Solusi pembayaran QRIS untuk bisnis Anda. Terima pembayaran dari seluruh e-wallet dan mobile banking di Indonesia dengan biaya transaksi 1% dan settlement harian.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-300">
                <Link href="/login">
                  <Button size="lg" className="h-14 px-8 text-base bg-blue-600 hover:bg-blue-500 shadow-[0_0_30px_-10px_rgba(37,99,235,0.5)] rounded-full transition-all hover:scale-105 active:scale-95 group">
                    Mulai Integrasi <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <div className="flex items-center gap-4 text-sm font-medium text-slate-400 px-4">
                  <div className="flex items-center gap-2">
                    <div className="bg-green-500/20 p-1 rounded-full">
                      <CheckCircle2 className="w-3 h-3 text-green-500" />
                    </div>
                    <span>Tanpa biaya setup</span>
                  </div>
                  <div className="flex items-center gap-2">
                     <div className="bg-green-500/20 p-1 rounded-full">
                      <CheckCircle2 className="w-3 h-3 text-green-500" />
                    </div>
                    <span>Aktivasi instan</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Complex 3D Mockup Visual - Performance Optimized */}
            <div className="lg:w-1/2 relative animate-in fade-in slide-in-from-right-8 duration-1000 delay-300">
              {/* Glow behind - Simple gradient, no blur */}
              <div className="absolute inset-0 bg-gradient-radial from-blue-500/15 to-transparent rounded-full"></div>
              
              {/* Main Card - Removed heavy transforms */}
              <div className="relative z-10 bg-[#0f172a]/90 border border-white/10 rounded-2xl p-6 shadow-2xl">
                {/* Header of Mockup */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-700 to-slate-800 border border-white/5"></div>
                    <div>
                      <div className="h-2 w-24 bg-slate-700 rounded-full mb-2"></div>
                      <div className="h-2 w-16 bg-slate-800 rounded-full"></div>
                    </div>
                  </div>
                  <div className="px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-mono flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    Live
                  </div>
                </div>

                {/* Main Graph Area - Animated SVG */}
                <div className="h-48 w-full bg-gradient-to-b from-blue-500/5 to-transparent rounded-lg border border-blue-500/10 relative overflow-hidden mb-6">
                  <svg className="absolute bottom-0 left-0 right-0 h-full w-full" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                      </linearGradient>
                      <filter id="glow">
                        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                        <feMerge>
                          <feMergeNode in="coloredBlur"/>
                          <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                      </filter>
                    </defs>
                    <path d="M0,100 C150,80 300,120 450,60 C600,0 750,40 900,20 L900,200 L0,200 Z" fill="url(#grad)" />
                    <path 
                      d="M0,100 C150,80 300,120 450,60 C600,0 750,40 900,20" 
                      stroke="#3b82f6" 
                      strokeWidth="2" 
                      fill="none" 
                      className="animate-aura-glow"
                      filter="url(#glow)"
                    />
                  </svg>
                  
                  {/* Floating Stats */}
                  <div className="absolute top-4 left-4">
                    <p className="text-xs text-slate-400 uppercase tracking-wider">Volume Kotor</p>
                    <h3 className="text-2xl font-bold text-white mt-1">{formatRupiah(liveVolume)}</h3>
                  </div>
                </div>
              </div>

              {/* Floating Elements - Outside main card for proper overflow */}
              <div className="absolute -right-4 sm:-right-6 md:-right-20 lg:-right-[100px] top-4 sm:top-8 md:top-16 bg-[#1e293b] p-3 sm:p-4 rounded-xl border border-white/10 shadow-xl z-20 max-w-[160px] sm:max-w-none animate-float">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="bg-white/10 p-1.5 sm:p-2 rounded-lg flex-shrink-0">
                    <CreditCard className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] sm:text-xs text-slate-400 truncate">Pembayaran Sukses</p>
                    <p className="text-xs sm:text-sm font-bold text-white truncate">+{formatRupiah(paymentSuccess)}</p>
                  </div>
                </div>
              </div>

              <div className="absolute -left-4 sm:-left-6 md:-left-20 lg:-left-[100px] bottom-8 sm:bottom-12 md:bottom-16 bg-[#1e293b] p-3 sm:p-4 rounded-xl border border-white/10 shadow-xl z-20 max-w-[160px] sm:max-w-none animate-float-delayed">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="bg-blue-500/20 p-1.5 sm:p-2 rounded-lg flex-shrink-0">
                    <Globe className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] sm:text-xs text-slate-400 truncate">Cross-Border Aktif</p>
                    <p className="text-xs sm:text-sm font-bold text-white truncate">6 Negara ASEAN</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By Section - Infinite Scroll Simulation */}
      <section className="py-10 border-y border-white/5 bg-white/[0.02] relative overflow-hidden">
        <div className="container mx-auto px-6 relative">
          <ScrollReveal animation="fadeUp" duration={0.5}>
            <p className="text-center text-sm text-slate-500 mb-8 font-medium tracking-widest uppercase">Mendukung Seluruh Penyedia E-Wallet dan Mobile Banking di Indonesia</p>
          </ScrollReveal>
          
          {/* Infinite Marquee - Two Rows Opposite Direction */}
          <div className="space-y-4 overflow-hidden">
            {/* Row 1 - Moving Left */}
            <div className="relative">
              <div className="animate-marquee-left">
                {[...Array(2)].map((_, setIndex) => (
                  <div key={setIndex} className="flex shrink-0 gap-0">
                    {[
                      { name: 'GoPay', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Gopay_logo.svg/512px-Gopay_logo.svg.png', color: '#00AED6' },
                      { name: 'OVO', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Logo_ovo_purple.svg/512px-Logo_ovo_purple.svg.png', color: '#4C3494' },
                      { name: 'DANA', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Logo_dana_blue.svg/512px-Logo_dana_blue.svg.png', color: '#108EE9' },
                      { name: 'ShopeePay', logo: '/logos/shopeepay.jpg', color: '#EE4D2D' },
                      { name: 'LinkAja', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/LinkAja.svg/512px-LinkAja.svg.png', color: '#E31E25' },
                      { name: 'BCA', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Bank_Central_Asia.svg/512px-Bank_Central_Asia.svg.png', color: '#0066AE' },
                      { name: 'Mandiri', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Bank_Mandiri_logo_2016.svg/512px-Bank_Mandiri_logo_2016.svg.png', color: '#003D79' },
                      { name: 'BRI', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/BRI_2020.svg/512px-BRI_2020.svg.png', color: '#00529C' },
                    ].map((wallet, i) => (
                      <div key={`${setIndex}-${i}`} className="mx-6 md:mx-10 flex items-center gap-3 group cursor-default">
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white flex items-center justify-center shadow-lg overflow-hidden p-1.5">
                          <img 
                            src={wallet.logo} 
                            alt={wallet.name} 
                            className="w-full h-full object-contain"
                            loading="lazy"
                            draggable={false}
                            onContextMenu={(e) => e.preventDefault()}
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                              const parent = target.parentElement;
                              if (parent) {
                                parent.style.background = wallet.color;
                                parent.innerHTML = `<span class="text-white font-bold text-sm">${wallet.name.charAt(0)}</span>`;
                              }
                            }}
                          />
                        </div>
                        <span className="text-lg md:text-xl font-display font-bold text-slate-400 group-hover:text-white transition-colors whitespace-nowrap">
                          {wallet.name}
                        </span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Row 2 - Moving Right */}
            <div className="relative">
              <div className="animate-marquee-right">
                {[...Array(2)].map((_, setIndex) => (
                  <div key={setIndex} className="flex shrink-0 gap-0">
                    {[
                      { name: 'BNI', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Bank_Negara_Indonesia_logo_%282004%29.svg/512px-Bank_Negara_Indonesia_logo_%282004%29.svg.png', color: '#F15A22' },
                      { name: 'CIMB Niaga', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/CIMB_Niaga_logo.svg/512px-CIMB_Niaga_logo.svg.png', color: '#7B1C3A' },
                      { name: 'Jenius', logo: '/logos/jenius.jpg', color: '#00B5AD' },
                      { name: 'SeaBank', logo: '/logos/seabank.jpg', color: '#00A5CF' },
                      { name: 'Bank Jago', logo: 'https://companieslogo.com/img/orig/ARTO.JK_BIG-2295dbe9.png?t=1720244490', color: '#0052CC' },
                      { name: 'Blu BCA', logo: '/logos/blu-bca.jpg', color: '#0066AE' },
                      { name: 'Permata', logo: 'https://companieslogo.com/img/orig/BNLI.JK_BIG-8aad9636.png?t=1730957760', color: '#007A3D' },
                      { name: 'OCBC NISP', logo: 'https://companieslogo.com/img/orig/O39.SI_BIG-dde1ca6e.png?t=1729873664', color: '#D7182A' },
                    ].map((wallet, i) => (
                      <div key={`${setIndex}-${i}`} className="mx-6 md:mx-10 flex items-center gap-3 group cursor-default">
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white flex items-center justify-center shadow-lg overflow-hidden p-1.5">
                          <img 
                            src={wallet.logo} 
                            alt={wallet.name} 
                            className="w-full h-full object-contain"
                            loading="lazy"
                            draggable={false}
                            onContextMenu={(e) => e.preventDefault()}
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                              const parent = target.parentElement;
                              if (parent) {
                                parent.style.background = wallet.color;
                                parent.innerHTML = `<span class="text-white font-bold text-sm">${wallet.name.charAt(0)}</span>`;
                              }
                            }}
                          />
                        </div>
                        <span className="text-lg md:text-xl font-display font-bold text-slate-400 group-hover:text-white transition-colors whitespace-nowrap">
                          {wallet.name}
                        </span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 md:w-32 bg-gradient-to-r from-[#030712] to-transparent z-10"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 md:w-32 bg-gradient-to-l from-[#030712] to-transparent z-10"></div>
      </section>

      {/* International E-Wallets - Text Only, Muted */}
      <section className="py-6 bg-transparent">
        <div className="container mx-auto px-6">
          <p className="text-center text-[10px] sm:text-xs text-slate-600 mb-4 tracking-wide">
            Mendukung pembayaran lintas negara via QRIS Cross-Border & Alipay+ Network
          </p>
          
          {/* QRIS Cross-Border Direct */}
          <div className="mb-3">
            <p className="text-center text-[9px] text-slate-700/50 mb-2 uppercase tracking-widest">QRIS Cross-Border</p>
            <div className="flex flex-wrap justify-center items-center gap-x-3 gap-y-1.5 sm:gap-x-5">
              {[
                { name: 'PromptPay', country: 'TH' },
                { name: 'TrueMoney', country: 'TH' },
                { name: 'NETS QR', country: 'SG' },
                { name: 'PayNow', country: 'SG' },
                { name: 'DuitNow QR', country: 'MY' },
                { name: 'Touch n Go', country: 'MY' },
              ].map((wallet, i) => (
                <span 
                  key={i} 
                  className="text-[10px] sm:text-xs text-slate-600/60 hover:text-slate-500 transition-colors cursor-default"
                >
                  {wallet.name} <span className="text-slate-700/40">({wallet.country})</span>
                </span>
              ))}
            </div>
          </div>

          {/* Alipay+ Network */}
          <div className="mb-3">
            <p className="text-center text-[9px] text-slate-700/50 mb-2 uppercase tracking-widest">Alipay+ Network</p>
            <div className="flex flex-wrap justify-center items-center gap-x-3 gap-y-1.5 sm:gap-x-5">
              {[
                { name: 'Alipay', country: 'CN' },
                { name: 'AlipayHK', country: 'HK' },
                { name: 'WeChat Pay', country: 'CN' },
                { name: 'Kakao Pay', country: 'KR' },
                { name: 'GCash', country: 'PH' },
                { name: 'GrabPay', country: 'ASEAN' },
                { name: 'MPay', country: 'MO' },
              ].map((wallet, i) => (
                <span 
                  key={i} 
                  className="text-[10px] sm:text-xs text-slate-600/60 hover:text-slate-500 transition-colors cursor-default"
                >
                  {wallet.name} <span className="text-slate-700/40">({wallet.country})</span>
                </span>
              ))}
            </div>
          </div>

          {/* Coming Soon */}
          <div>
            <p className="text-center text-[9px] text-slate-700/50 mb-2 uppercase tracking-widest">Segera Hadir</p>
            <div className="flex flex-wrap justify-center items-center gap-x-3 gap-y-1.5 sm:gap-x-5">
              {[
                { name: 'PayPay', country: 'JP', year: '2025' },
                { name: 'UPI', country: 'IN', year: 'TBD' },
                { name: 'UnionPay', country: 'CN', year: 'TBD' },
              ].map((wallet, i) => (
                <span 
                  key={i} 
                  className="text-[10px] sm:text-xs text-slate-700/40 cursor-default"
                >
                  {wallet.name} <span className="text-slate-700/30">({wallet.country})</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid Features */}
      <section id="solutions" className="py-32 relative">
        <div className="container mx-auto px-6">
          <ScrollReveal animation="fadeUp" className="max-w-2xl mx-auto text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">Fitur Utama Platform</h2>
            <ScrollTiltText as="p" maxSkewX={3} intensity={0.5} className="text-slate-400 text-lg border-b border-slate-600/40">Kelola pembayaran QRIS bisnis Anda dalam satu dashboard yang terintegrasi.</ScrollTiltText>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(200px,auto)]">
            {/* Large Card */}
            <ScrollReveal animation="fadeLeft" delay={0.1} className="md:col-span-2 row-span-2 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-950 border border-white/10 p-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-radial from-blue-500/15 to-transparent -z-10"></div>
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-blue-500/20 flex items-center justify-center mb-6">
                    <CreditCard className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Terima Pembayaran QRIS</h3>
                  <p className="text-slate-400 max-w-md">Terima pembayaran dari seluruh aplikasi e-wallet dan mobile banking di Indonesia. Mendukung QRIS Cross-Border dari 6 negara ASEAN.</p>
                </div>
                <div className="mt-8 relative h-28 md:h-40 w-full flex items-center justify-center gap-4 md:gap-8 px-4 md:px-8">
                   {/* QRIS Example - Left */}
                   <div className="flex flex-col items-center">
                     <div className="w-16 h-16 md:w-28 md:h-28 rounded-lg p-1">
                       <svg viewBox="0 0 100 100" className="w-full h-full">
                         <rect x="5" y="5" width="25" height="25" fill="none" stroke="#fff" strokeWidth="3"/>
                         <rect x="10" y="10" width="15" height="15" fill="#fff"/>
                         <rect x="70" y="5" width="25" height="25" fill="none" stroke="#fff" strokeWidth="3"/>
                         <rect x="75" y="10" width="15" height="15" fill="#fff"/>
                         <rect x="5" y="70" width="25" height="25" fill="none" stroke="#fff" strokeWidth="3"/>
                         <rect x="10" y="75" width="15" height="15" fill="#fff"/>
                         <rect x="35" y="5" width="5" height="5" fill="#fff"/>
                         <rect x="45" y="5" width="5" height="5" fill="#fff"/>
                         <rect x="55" y="5" width="5" height="5" fill="#fff"/>
                         <rect x="35" y="15" width="5" height="5" fill="#fff"/>
                         <rect x="50" y="15" width="5" height="5" fill="#fff"/>
                         <rect x="35" y="25" width="5" height="5" fill="#fff"/>
                         <rect x="45" y="25" width="5" height="5" fill="#fff"/>
                         <rect x="5" y="35" width="5" height="5" fill="#fff"/>
                         <rect x="15" y="35" width="5" height="5" fill="#fff"/>
                         <rect x="25" y="35" width="5" height="5" fill="#fff"/>
                         <rect x="40" y="40" width="20" height="20" fill="#fff"/>
                         <rect x="45" y="45" width="10" height="10" fill="#0f172a"/>
                         <rect x="5" y="50" width="5" height="5" fill="#fff"/>
                         <rect x="20" y="50" width="5" height="5" fill="#fff"/>
                         <rect x="70" y="35" width="5" height="5" fill="#fff"/>
                         <rect x="85" y="35" width="5" height="5" fill="#fff"/>
                         <rect x="70" y="50" width="5" height="5" fill="#fff"/>
                         <rect x="80" y="50" width="5" height="5" fill="#fff"/>
                         <rect x="90" y="50" width="5" height="5" fill="#fff"/>
                         <rect x="35" y="70" width="5" height="5" fill="#fff"/>
                         <rect x="45" y="70" width="5" height="5" fill="#fff"/>
                         <rect x="55" y="70" width="5" height="5" fill="#fff"/>
                         <rect x="35" y="80" width="5" height="5" fill="#fff"/>
                         <rect x="50" y="80" width="5" height="5" fill="#fff"/>
                         <rect x="70" y="70" width="25" height="25" fill="none" stroke="#fff" strokeWidth="2"/>
                         <rect x="75" y="75" width="5" height="5" fill="#fff"/>
                         <rect x="85" y="75" width="5" height="5" fill="#fff"/>
                         <rect x="80" y="80" width="5" height="5" fill="#fff"/>
                         <rect x="75" y="85" width="5" height="5" fill="#fff"/>
                         <rect x="85" y="85" width="5" height="5" fill="#fff"/>
                       </svg>
                     </div>
                     <p className="text-[10px] md:text-xs text-slate-400 font-medium">QRIS</p>
                   </div>
                   
                   {/* Arrow Symbol - Center */}
                   <div className="flex flex-col items-center gap-0.5 md:gap-1">
                     <svg className="w-6 h-6 md:w-10 md:h-10 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                       <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                     </svg>
                     <p className="text-[8px] md:text-[10px] text-slate-500">Payment          User's</p>
                   </div>
                   
                   {/* Original Card - Right */}
                   <div className="flex flex-col items-center">
                     <div className="w-20 h-14 md:w-36 md:h-24 bg-slate-800/50 rounded-md md:rounded-xl border border-white/5 relative overflow-hidden">
                       <div className="absolute top-1 md:top-2 left-2 md:left-4 right-2 md:right-4 h-0.5 md:h-1.5 bg-slate-700/50 rounded-full"></div>
                       <div className="absolute top-2.5 md:top-5 left-2 md:left-4 w-1/2 h-0.5 md:h-1.5 bg-slate-700/30 rounded-full"></div>
                       <div className="absolute inset-0 flex items-center justify-center pt-1 md:pt-2">
                         <span className="text-lg md:text-3xl font-bold text-slate-500">???</span>
                       </div>
                       <div className="absolute bottom-0 left-0 right-0 h-6 md:h-12 bg-gradient-to-t from-blue-500/10 to-transparent"></div>
                     </div>
                     <p className="text-[10px] md:text-xs text-slate-400 mt-1 md:mt-2 font-medium">From Anywhere</p>
                   </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Tall Card - Multi Platform */}
            <ScrollReveal animation="fadeRight" delay={0.2} className="md:col-span-1 row-span-2 rounded-3xl bg-slate-950 border border-white/10 p-6 relative overflow-hidden group">
               <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-purple-900/30 to-transparent -z-10 pointer-events-none"></div>
               <div className="flex gap-2 mb-4">
                 <div className="flex-1 rounded-xl bg-purple-500/20 flex items-center gap-1.5 p-1.5 sm:p-2">
                    <Smartphone className="w-3.5 h-3.5 text-purple-400 flex-shrink-0" />
                    <span className="text-[8px] sm:text-[10px] text-purple-300 font-medium whitespace-nowrap">Mobile</span>
                 </div>
                 <div className="flex-1 rounded-xl bg-blue-500/20 flex items-center gap-1.5 p-1.5 sm:p-2">
                    <Laptop className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
                    <span className="text-[8px] sm:text-[10px] text-blue-300 font-medium whitespace-nowrap">Desktop</span>
                 </div>
               </div>
               <h3 className="text-xl font-bold mb-2">Akses Multi-Platform</h3>
               <p className="text-slate-400 text-sm mb-4">Kelola transaksi dari perangkat apapun, kapan saja.</p>
               
               <div className="space-y-3">
                 {/* iPhone Mockup - Accurate Dashboard Preview */}
                 <div className="flex justify-center">
                   <div className="relative group-hover:scale-105 transition-transform duration-500 flex flex-col items-center">
                     {/* iPhone Frame */}
                     <div className="w-32 h-56 bg-[#1a1a1a] rounded-[2rem] border-4 border-[#2a2a2a] relative overflow-hidden shadow-2xl">
                       {/* Dynamic Island */}
                       <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-3 bg-black rounded-full z-20"></div>
                       
                       {/* Screen Content - Matching Dashboard */}
                       <div className="w-full h-full bg-gradient-to-b from-[#0f172a] to-[#020817] p-2 pt-7 flex flex-col">
                         {/* Header */}
                         <div className="flex items-center justify-between mb-1.5">
                           <div>
                             <p className="text-[6px] font-bold text-white">Dashboard</p>
                             <p className="text-[4px] text-slate-400">Welcome back, User</p>
                           </div>
                           <div className="w-4 h-4 bg-gradient-to-br from-slate-600 to-slate-700 rounded-full flex items-center justify-center">
                             <svg className="w-2.5 h-2.5 text-slate-300" viewBox="0 0 16 16" fill="currentColor">
                               <path fillRule="evenodd" d="m4.736 1.968-.892 3.269-.014.058C2.113 5.568 1 6.006 1 6.5 1 7.328 4.134 8 8 8s7-.672 7-1.5c0-.494-1.113-.932-2.83-1.205l-.014-.058-.892-3.27c-.146-.533-.698-.849-1.239-.734C9.411 1.363 8.62 1.5 8 1.5s-1.411-.136-2.025-.267c-.541-.115-1.093.2-1.239.735m.015 3.867a.25.25 0 0 1 .274-.224c.9.092 1.91.143 2.975.143a30 30 0 0 0 2.975-.143.25.25 0 0 1 .05.498c-.918.093-1.944.145-3.025.145s-2.107-.052-3.025-.145a.25.25 0 0 1-.224-.274M3.5 10h2a.5.5 0 0 1 .5.5v1a1.5 1.5 0 0 1-3 0v-1a.5.5 0 0 1 .5-.5m-1.5.5q.001-.264.085-.5H2a.5.5 0 0 1 0-1h3.5a1.5 1.5 0 0 1 1.488 1.312 3.5 3.5 0 0 1 2.024 0A1.5 1.5 0 0 1 10.5 9H14a.5.5 0 0 1 0 1h-.085q.084.236.085.5v1a2.5 2.5 0 0 1-5 0v-.14l-.21-.07a2.5 2.5 0 0 0-1.58 0l-.21.07v.14a2.5 2.5 0 0 1-5 0zm8.5-.5h2a.5.5 0 0 1 .5.5v1a1.5 1.5 0 0 1-3 0v-1a.5.5 0 0 1 .5-.5z"/>
                             </svg>
                           </div>
                         </div>
                         
                         {/* 4 Stats Cards - 2x2 Grid */}
                         <div className="grid grid-cols-2 gap-1 mb-1.5">
                           <div className="bg-slate-800/60 border border-slate-700/50 rounded-md p-1">
                             <div className="flex items-center justify-between mb-0.5">
                               <p className="text-[3px] text-slate-400">Total Revenue</p>
                               <div className="w-2 h-2 rounded bg-blue-500/20 flex items-center justify-center">
                                 <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
                               </div>
                             </div>
                             <p className="text-[5px] font-bold text-white">Rp 24.5M</p>
                             <p className="text-[3px] text-green-400">12 success</p>
                           </div>
                           <div className="bg-slate-800/60 border border-slate-700/50 rounded-md p-1">
                             <div className="flex items-center justify-between mb-0.5">
                               <p className="text-[3px] text-slate-400">Transactions</p>
                               <div className="w-2 h-2 rounded bg-green-500/20 flex items-center justify-center">
                                 <div className="w-1 h-1 bg-green-400 rounded-full"></div>
                               </div>
                             </div>
                             <p className="text-[5px] font-bold text-white">1,284</p>
                             <p className="text-[3px] text-yellow-400">3 pending</p>
                           </div>
                           <div className="bg-slate-800/60 border border-slate-700/50 rounded-md p-1">
                             <div className="flex items-center justify-between mb-0.5">
                               <p className="text-[3px] text-slate-400">Pending</p>
                               <div className="w-2 h-2 rounded bg-yellow-500/20 flex items-center justify-center">
                                 <div className="w-1 h-1 bg-yellow-400 rounded-full"></div>
                               </div>
                             </div>
                             <p className="text-[5px] font-bold text-white">Rp 2.1M</p>
                             <p className="text-[3px] text-slate-400">3 orders</p>
                           </div>
                           <div className="bg-slate-800/60 border border-slate-700/50 rounded-md p-1">
                             <div className="flex items-center justify-between mb-0.5">
                               <p className="text-[3px] text-slate-400">Wallets</p>
                               <div className="w-2 h-2 rounded bg-purple-500/20 flex items-center justify-center">
                                 <div className="w-1 h-1 bg-purple-400 rounded-full"></div>
                               </div>
                             </div>
                             <p className="text-[5px] font-bold text-white">4</p>
                             <p className="text-[3px] text-green-400">Operational</p>
                           </div>
                         </div>
                         
                         {/* Recent Transactions */}
                         <div className="flex-1">
                           <p className="text-[4px] text-slate-400 mb-1">Recent Transactions</p>
                           <div className="space-y-0.5">
                             <div className="bg-slate-800/40 border border-slate-700/30 rounded p-1 flex items-center justify-between">
                               <div className="flex items-center gap-1">
                                 <div className="w-2.5 h-2.5 bg-green-500/20 border border-green-500/30 rounded-full flex items-center justify-center">
                                   <div className="w-0.5 h-0.5 bg-green-400"></div>
                                 </div>
                                 <div>
                                   <p className="text-[4px] text-white font-medium">Ahmad R.</p>
                                   <p className="text-[3px] text-slate-500">QRIS Payment</p>
                                 </div>
                               </div>
                               <p className="text-[4px] text-green-400 font-medium">+Rp 150K</p>
                             </div>
                             <div className="bg-slate-800/40 border border-slate-700/30 rounded p-1 flex items-center justify-between">
                               <div className="flex items-center gap-1">
                                 <div className="w-2.5 h-2.5 bg-green-500/20 border border-green-500/30 rounded-full flex items-center justify-center">
                                   <div className="w-0.5 h-0.5 bg-green-400"></div>
                                 </div>
                                 <div>
                                   <p className="text-[4px] text-white font-medium">Siti N.</p>
                                   <p className="text-[3px] text-slate-500">Bank Transfer</p>
                                 </div>
                               </div>
                               <p className="text-[4px] text-green-400 font-medium">+Rp 85K</p>
                             </div>
                           </div>
                         </div>
                         
                         {/* Bottom Nav */}
                         <div className="pt-1 mt-auto">
                           <div className="flex justify-around items-center">
                             <div className="flex flex-col items-center">
                               <div className="w-3 h-3 rounded bg-blue-500 flex items-center justify-center">
                                 <div className="w-1.5 h-1.5 bg-white/80 rounded-sm"></div>
                               </div>
                             </div>
                             <div className="flex flex-col items-center">
                               <div className="w-3 h-3 rounded bg-slate-700 flex items-center justify-center">
                                 <div className="w-1.5 h-1.5 bg-slate-500 rounded-sm"></div>
                               </div>
                             </div>
                             <div className="flex flex-col items-center">
                               <div className="w-3 h-3 rounded bg-slate-700 flex items-center justify-center">
                                 <div className="w-1.5 h-1.5 bg-slate-500 rounded-sm"></div>
                               </div>
                             </div>
                             <div className="flex flex-col items-center">
                               <div className="w-3 h-3 rounded bg-slate-700 flex items-center justify-center">
                                 <div className="w-1.5 h-1.5 bg-slate-500 rounded-full"></div>
                               </div>
                             </div>
                           </div>
                           <div className="w-8 h-0.5 bg-white/30 rounded-full mx-auto mt-1.5"></div>
                         </div>
                       </div>
                     </div>
                   </div>
                 </div>

                 {/* MacBook Mockup - Accurate Dashboard Preview */}
                 <div className="flex justify-center">
                   <div className="relative group-hover:scale-[1.02] transition-transform duration-500 flex flex-col items-center">
                     {/* MacBook Screen */}
                     <div className="w-48 h-28 bg-[#1a1a1a] rounded-t-lg border-4 border-[#2a2a2a] relative overflow-hidden shadow-xl">
                       {/* Camera */}
                       <div className="absolute top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#333] rounded-full"></div>
                       
                       {/* Screen Content - Dashboard with Sidebar */}
                       <div className="w-full h-full bg-gradient-to-b from-[#0f172a] to-[#020817] flex pt-3">
                         {/* Sidebar */}
                         <div className="w-8 h-full bg-slate-900/80 border-r border-slate-700/50 p-1 flex flex-col gap-1">
                           <div className="w-full h-2 bg-blue-500 rounded-sm"></div>
                           <div className="w-full h-2 bg-slate-700 rounded-sm"></div>
                           <div className="w-full h-2 bg-slate-700 rounded-sm"></div>
                           <div className="w-full h-2 bg-slate-700 rounded-sm"></div>
                           <div className="mt-auto w-full h-2 bg-slate-800 rounded-sm"></div>
                         </div>
                         
                         {/* Main Content */}
                         <div className="flex-1 p-1.5">
                           {/* Header */}
                           <div className="flex items-center justify-between mb-1">
                             <div>
                               <p className="text-[4px] font-bold text-white">Dashboard</p>
                               <p className="text-[3px] text-slate-400">Welcome back, User</p>
                             </div>
                             <div className="flex gap-0.5">
                               <div className="px-1 py-0.5 bg-slate-700 rounded text-[3px] text-slate-300">Report</div>
                               <div className="px-1 py-0.5 bg-blue-500 rounded text-[3px] text-white">Withdraw</div>
                             </div>
                           </div>
                           
                           {/* 4 Stats Cards in Row */}
                           <div className="grid grid-cols-4 gap-0.5 mb-1">
                             <div className="bg-slate-800/60 border border-slate-700/50 rounded p-0.5">
                               <p className="text-[2px] text-slate-400">Revenue</p>
                               <p className="text-[4px] font-bold text-white">Rp 24.5M</p>
                               <p className="text-[2px] text-green-400">+18.5%</p>
                             </div>
                             <div className="bg-slate-800/60 border border-slate-700/50 rounded p-0.5">
                               <p className="text-[2px] text-slate-400">Transactions</p>
                               <p className="text-[4px] font-bold text-white">1,284</p>
                               <p className="text-[2px] text-blue-400">3 pending</p>
                             </div>
                             <div className="bg-slate-800/60 border border-slate-700/50 rounded p-0.5">
                               <p className="text-[2px] text-slate-400">Pending</p>
                               <p className="text-[4px] font-bold text-white">Rp 2.1M</p>
                               <p className="text-[2px] text-yellow-400">3 orders</p>
                             </div>
                             <div className="bg-slate-800/60 border border-slate-700/50 rounded p-0.5">
                               <p className="text-[2px] text-slate-400">Wallets</p>
                               <p className="text-[4px] font-bold text-white">4</p>
                               <p className="text-[2px] text-green-400">Active</p>
                             </div>
                           </div>
                           
                           {/* Revenue Overview Chart */}
                           <div className="bg-slate-800/40 border border-slate-700/30 rounded p-1">
                             <p className="text-[3px] text-white font-medium mb-0.5">Revenue Overview</p>
                             <div className="flex items-end gap-0.5 h-4">
                               <div className="flex-1 bg-blue-500/60 rounded-t h-2"></div>
                               <div className="flex-1 bg-blue-500/60 rounded-t h-3"></div>
                               <div className="flex-1 bg-blue-500/60 rounded-t h-2.5"></div>
                               <div className="flex-1 bg-blue-500/60 rounded-t h-4"></div>
                               <div className="flex-1 bg-blue-500/60 rounded-t h-3"></div>
                               <div className="flex-1 bg-blue-500/60 rounded-t h-3.5"></div>
                               <div className="flex-1 bg-blue-500 rounded-t h-4"></div>
                             </div>
                             <div className="flex justify-between mt-0.5">
                               <span className="text-[2px] text-slate-500">Mon</span>
                               <span className="text-[2px] text-slate-500">Tue</span>
                               <span className="text-[2px] text-slate-500">Wed</span>
                               <span className="text-[2px] text-slate-500">Thu</span>
                               <span className="text-[2px] text-slate-500">Fri</span>
                               <span className="text-[2px] text-slate-500">Sat</span>
                               <span className="text-[2px] text-slate-400">Sun</span>
                             </div>
                           </div>
                         </div>
                       </div>
                     </div>
                     
                     {/* Hinge */}
                     <div className="w-48 h-1 bg-gradient-to-b from-[#3a3a3a] to-[#2a2a2a]"></div>
                     
                     {/* Body */}
                     <div className="w-52 h-2.5 bg-gradient-to-b from-[#d4d4d4] via-[#e0e0e0] to-[#c0c0c0] rounded-b-lg relative">
                       <div className="absolute top-0.5 left-1/2 -translate-x-1/2 w-10 h-1 bg-[#ccc] rounded-sm border border-[#aaa]"></div>
                     </div>
                   </div>
                 </div>
               </div>
               
               {/* Platform Labels */}
               <div className="flex justify-center gap-4 mt-3">
                 <div className="flex items-center gap-1.5">
                   <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                   <span className="text-[10px] text-slate-400">Mobile</span>
                 </div>
                 <div className="flex items-center gap-1.5">
                   <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                   <span className="text-[10px] text-slate-400">Desktop</span>
                 </div>
               </div>
            </ScrollReveal>

            {/* Small Card 1 */}
            <ScrollReveal animation="scaleUp" delay={0.3} className="md:col-span-1 rounded-3xl bg-slate-950 border border-white/10 p-8 hover:bg-slate-900/80 transition-colors group">
              <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Shield className="w-5 h-5 text-green-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">Keamanan Transaksi</h3>
              <p className="text-sm text-slate-400">Enkripsi end-to-end dan validasi otomatis setiap transaksi.</p>
            </ScrollReveal>

            {/* Small Card 2 */}
            <ScrollReveal animation="scaleUp" delay={0.4} className="md:col-span-1 rounded-3xl bg-slate-950 border border-white/10 p-8 hover:bg-slate-900/80 transition-colors group">
              <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <BarChart3 className="w-5 h-5 text-orange-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">Laporan Transaksi</h3>
              <p className="text-sm text-slate-400">Pantau riwayat transaksi dan pendapatan secara real-time.</p>
            </ScrollReveal>

            {/* Wide Card */}
            <ScrollReveal animation="perspective" delay={0.5} className="md:col-span-1 md:col-start-2 md:col-end-4 rounded-3xl bg-gradient-to-r from-slate-900 to-slate-950 border border-white/10 p-8 flex items-center justify-between group">
              <div>
              <h3 className="text-xl font-bold mb-2">Integrasi API</h3>
                <p className="text-sm text-slate-400">REST API dengan dokumentasi lengkap untuk integrasi ke sistem Anda.</p>
              </div>
              <div className="hidden sm:block">
                 <div className="bg-black/50 p-4 rounded-lg font-mono text-xs text-blue-300 border border-white/5">
                   <span className="text-purple-400">const</span> payment = <span className="text-yellow-300">await</span> qris.<span className="text-blue-400">create</span>({`{`}<br/>
                   &nbsp;&nbsp;amount: <span className="text-green-400">50000</span>,<br/>
                   &nbsp;&nbsp;currency: <span className="text-green-400">'IDR'</span><br/>
                   {`}`});
                 </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* QRIS Cross-Border Payments Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 via-transparent to-purple-900/10 -z-10"></div>
        <div className="container mx-auto px-6">
          <ScrollReveal animation="fadeUp" className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-900/30 border border-green-500/30 text-xs font-medium text-green-300 mb-6">
              <Globe className="w-4 h-4" />
              <span className="tracking-wide uppercase">QRIS Cross-Border</span>
            </div>
            <div className="relative inline-block py-8">
              <div className="absolute inset-0 -z-10 overflow-visible">
                <svg className="absolute w-[150%] h-[200%] -left-[25%] -top-[50%]" viewBox="0 0 800 400" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="redGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="transparent" />
                      <stop offset="20%" stopColor="#ef4444" stopOpacity="0.6" />
                      <stop offset="50%" stopColor="#dc2626" stopOpacity="0.8" />
                      <stop offset="80%" stopColor="#ef4444" stopOpacity="0.6" />
                      <stop offset="100%" stopColor="transparent" />
                    </linearGradient>
                    <linearGradient id="whiteGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="transparent" />
                      <stop offset="20%" stopColor="#ffffff" stopOpacity="0.5" />
                      <stop offset="50%" stopColor="#ffffff" stopOpacity="0.7" />
                      <stop offset="80%" stopColor="#ffffff" stopOpacity="0.5" />
                      <stop offset="100%" stopColor="transparent" />
                    </linearGradient>
                    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                      <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>
                  <path d="M0,200 Q150,100 300,180 T600,160 T800,200" fill="none" stroke="url(#redGradient)" strokeWidth="20" filter="url(#glow)" opacity="0.7">
                    <animate attributeName="d" dur="8s" repeatCount="indefinite" values="M0,200 Q150,100 300,180 T600,160 T800,200;M0,200 Q150,250 300,170 T600,220 T800,200;M0,200 Q150,100 300,180 T600,160 T800,200" />
                  </path>
                  <path d="M0,220 Q200,280 400,200 T700,240 T800,200" fill="none" stroke="url(#whiteGradient)" strokeWidth="15" filter="url(#glow)" opacity="0.6">
                    <animate attributeName="d" dur="10s" repeatCount="indefinite" values="M0,220 Q200,280 400,200 T700,240 T800,200;M0,220 Q200,150 400,230 T700,180 T800,200;M0,220 Q200,280 400,200 T700,240 T800,200" />
                  </path>
                  <path d="M0,180 Q100,120 250,200 T500,150 T800,190" fill="none" stroke="url(#redGradient)" strokeWidth="12" filter="url(#glow)" opacity="0.5">
                    <animate attributeName="d" dur="12s" repeatCount="indefinite" values="M0,180 Q100,120 250,200 T500,150 T800,190;M0,180 Q100,220 250,160 T500,210 T800,190;M0,180 Q100,120 250,200 T500,150 T800,190" />
                  </path>
                </svg>
              </div>
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 relative z-20 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]" style={{ textShadow: '0 0 20px rgba(0,0,0,0.9), 0 0 40px rgba(0,0,0,0.7)' }}>
                Pembayaran <span className="text-white">Lintas Negara</span>
              </h2>
            </div>
            <ScrollTiltText as="p" maxSkewX={3} intensity={0.5} className="text-slate-400 text-lg border-b border-slate-600/40">
              Terima pembayaran dari wisatawan mancanegara. QRIS Cross-Border mendukung transaksi dari 6 negara ASEAN.
            </ScrollTiltText>
          </ScrollReveal>

          <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6" staggerDelay={0.1}>
            {[
              { flag: "🇮🇩", country: "Indonesia", code: "ID" },
              { flag: "🇹🇭", country: "Thailand", code: "TH" },
              { flag: "🇲🇾", country: "Malaysia", code: "MY" },
              { flag: "🇸🇬", country: "Singapura", code: "SG" },
              { flag: "🇯🇵", country: "Jepang", code: "JP" },
              { flag: "🇱🇦", country: "Laos", code: "LA" }
            ].map((item) => (
              <StaggerItem key={item.code} animation="scaleUp">
                <div className="bg-slate-900 border border-white/10 rounded-2xl p-4 md:p-6 text-center hover:border-green-500/30 hover:bg-slate-800 transition-colors duration-200 group cursor-default">
                  <span className="text-4xl md:text-5xl block mb-3 group-hover:scale-110 transition-transform duration-300">{item.flag}</span>
                  <p className="text-sm font-medium text-white mb-1">{item.country}</p>
                  <p className="text-xs text-slate-500 font-mono">{item.code}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <ScrollReveal animation="fadeUp" delay={0.3} className="mt-12 text-center">
            <p className="text-slate-400 text-sm max-w-2xl mx-auto">
              Pelanggan dari negara-negara tersebut dapat melakukan pembayaran menggunakan aplikasi e-wallet lokal mereka langsung ke QRIS Anda tanpa konfigurasi tambahan.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Dynamic vs Static QRIS Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-6">
          <ScrollReveal animation="fadeUp" className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
              Jenis <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">QRIS</span>
            </h2>
            <ScrollTiltText as="p" maxSkewX={3} intensity={0.5} className="text-slate-400 text-lg border-b border-slate-600/40">
              Pilih jenis QRIS yang sesuai dengan model bisnis Anda.
            </ScrollTiltText>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <ScrollReveal animation="fadeLeft" delay={0.1}>
              <div className="bg-gradient-to-br from-blue-900/30 to-slate-900 border border-blue-500/20 rounded-3xl p-8 h-full relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-radial from-blue-500/15 to-transparent -z-10"></div>
                <div className="w-14 h-14 rounded-2xl bg-blue-500/20 flex items-center justify-center mb-6 relative">
                  <svg viewBox="0 0 100 100" className="w-10 h-10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="5" y="5" width="90" height="90" rx="8" stroke="#60a5fa" strokeWidth="3" fill="none" />
                    <rect x="15" y="15" width="20" height="20" rx="3" stroke="#60a5fa" strokeWidth="2" fill="#3b82f6" fillOpacity="0.3" />
                    <rect x="65" y="15" width="20" height="20" rx="3" stroke="#60a5fa" strokeWidth="2" fill="#3b82f6" fillOpacity="0.3" />
                    <rect x="15" y="65" width="20" height="20" rx="3" stroke="#60a5fa" strokeWidth="2" fill="#3b82f6" fillOpacity="0.3" />
                    <rect x="40" y="40" width="20" height="20" rx="4" fill="url(#qris-blue-gradient)" />
                    <circle cx="50" cy="50" r="4" fill="white" />
                    <defs>
                      <linearGradient id="qris-blue-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#60a5fa" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-blue-300">Dynamic QRIS</h3>
                <p className="text-slate-400 mb-6">QR Code dengan nominal tertentu yang di-generate untuk setiap transaksi.</p>
                <ul className="space-y-3">
                  {[
                    "Nominal sudah tertera di QR Code",
                    "Sekali pakai (one-time use)",
                    "Lebih aman dari kesalahan input",
                    "Cocok untuk e-commerce & online shop",
                    "Otomatis tercatat di sistem"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                      <div className="bg-blue-500/20 p-1 rounded-full mt-0.5 flex-shrink-0">
                        <CheckCircle2 className="w-3 h-3 text-blue-400" />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 p-4 bg-slate-800/50 rounded-xl border border-white/5">
                  <p className="text-xs text-slate-500 mb-2">Contoh penggunaan:</p>
                  <p className="text-sm text-white font-medium">Checkout e-commerce, Invoice pembayaran</p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fadeRight" delay={0.2}>
              <div className="bg-gradient-to-br from-purple-900/30 to-slate-900 border border-purple-500/20 rounded-3xl p-8 h-full relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-radial from-purple-500/15 to-transparent -z-10"></div>
                <div className="w-14 h-14 rounded-2xl bg-purple-500/20 flex items-center justify-center mb-6 relative">
                  <svg viewBox="0 0 100 100" className="w-10 h-10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="5" y="5" width="90" height="90" rx="8" stroke="#a855f7" strokeWidth="3" fill="none" />
                    <rect x="15" y="15" width="20" height="20" rx="3" stroke="#a855f7" strokeWidth="2" fill="#9333ea" fillOpacity="0.3" />
                    <rect x="65" y="15" width="20" height="20" rx="3" stroke="#a855f7" strokeWidth="2" fill="#9333ea" fillOpacity="0.3" />
                    <rect x="15" y="65" width="20" height="20" rx="3" stroke="#a855f7" strokeWidth="2" fill="#9333ea" fillOpacity="0.3" />
                    <rect x="40" y="40" width="20" height="20" rx="4" fill="url(#qris-purple-gradient)" />
                    <circle cx="50" cy="50" r="4" fill="white" />
                    <defs>
                      <linearGradient id="qris-purple-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#9333ea" />
                        <stop offset="100%" stopColor="#a855f7" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-purple-300">Static QRIS</h3>
                <p className="text-slate-400 mb-6">QR Code tetap yang dapat digunakan berulang kali tanpa batas waktu.</p>
                <ul className="space-y-3">
                  {[
                    "Pelanggan input nominal sendiri",
                    "Dapat dipakai berulang kali",
                    "Bisa dicetak dan dipajang",
                    "Cocok untuk toko fisik & UMKM",
                    "Tidak perlu generate setiap transaksi"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                      <div className="bg-purple-500/20 p-1 rounded-full mt-0.5 flex-shrink-0">
                        <CheckCircle2 className="w-3 h-3 text-purple-400" />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 p-4 bg-slate-800/50 rounded-xl border border-white/5">
                  <p className="text-xs text-slate-500 mb-2">Contoh penggunaan:</p>
                  <p className="text-sm text-white font-medium">Kasir toko, Warung, Pedagang kaki lima</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-green-900/10 via-transparent to-emerald-900/10 -z-10"></div>
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-gradient-radial from-green-500/10 to-transparent -z-10"></div>
        <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-gradient-radial from-emerald-500/10 to-transparent -z-10"></div>
        
        <div className="container mx-auto px-6">
          <ScrollReveal animation="fadeUp" className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-900/30 border border-green-500/30 text-xs font-medium text-green-300 mb-6">
              <CreditCard className="w-4 h-4" />
              <span className="tracking-wide uppercase">Biaya Transaksi</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
              Tarif <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">Transparan</span>
            </h2>
            <ScrollTiltText as="p" maxSkewX={3} intensity={0.5} className="text-slate-400 text-lg border-b border-slate-600/40">
              Biaya transaksi sederhana tanpa biaya tersembunyi.
            </ScrollTiltText>
          </ScrollReveal>

          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-5 gap-6 items-start">
              
              <ScrollReveal animation="fadeLeft" delay={0.1} className="lg:col-span-2">
                <div className="relative">
                  <div className="relative bg-gradient-to-br from-green-900/40 via-slate-900 to-emerald-900/30 border border-green-500/20 rounded-[2rem] p-8 md:p-10">
                    <div className="absolute top-6 right-6">
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-green-400 bg-green-500/10 px-3 py-1 rounded-full border border-green-500/20">
                        <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                        LIVE
                      </span>
                    </div>
                    
                    <div className="mb-8">
                      <p className="text-slate-400 text-sm mb-2 tracking-wide">Biaya per transaksi</p>
                      <div className="flex items-end gap-1">
                        <span className="text-8xl md:text-[7rem] font-display font-black leading-none text-white">1</span>
                        <span className="text-5xl md:text-6xl font-display font-bold text-green-400 mb-2">%</span>
                      </div>
                    </div>
                    
                    <div className="space-y-4 mb-8">
                      <p className="text-slate-300 text-lg leading-relaxed">
                        Tanpa biaya tersembunyi. Hanya dikenakan saat ada transaksi.
                      </p>
                      <div className="flex items-center gap-3 text-sm text-slate-400">
                        <div className="flex -space-x-2">
                          {displayedUsers.map((user, i) => (
                            <div key={i} className="flex flex-col items-center transition-all duration-500">
                              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-slate-600 to-slate-700 border-2 border-slate-900 flex items-center justify-center">
                                <svg className="w-4 h-4 text-slate-300" viewBox="0 0 16 16" fill="currentColor">
                                  <path fillRule="evenodd" d="m4.736 1.968-.892 3.269-.014.058C2.113 5.568 1 6.006 1 6.5 1 7.328 4.134 8 8 8s7-.672 7-1.5c0-.494-1.113-.932-2.83-1.205l-.014-.058-.892-3.27c-.146-.533-.698-.849-1.239-.734C9.411 1.363 8.62 1.5 8 1.5s-1.411-.136-2.025-.267c-.541-.115-1.093.2-1.239.735m.015 3.867a.25.25 0 0 1 .274-.224c.9.092 1.91.143 2.975.143a30 30 0 0 0 2.975-.143.25.25 0 0 1 .05.498c-.918.093-1.944.145-3.025.145s-2.107-.052-3.025-.145a.25.25 0 0 1-.224-.274M3.5 10h2a.5.5 0 0 1 .5.5v1a1.5 1.5 0 0 1-3 0v-1a.5.5 0 0 1 .5-.5m-1.5.5q.001-.264.085-.5H2a.5.5 0 0 1 0-1h3.5a1.5 1.5 0 0 1 1.488 1.312 3.5 3.5 0 0 1 2.024 0A1.5 1.5 0 0 1 10.5 9H14a.5.5 0 0 1 0 1h-.085q.084.236.085.5v1a2.5 2.5 0 0 1-5 0v-.14l-.21-.07a2.5 2.5 0 0 0-1.58 0l-.21.07v.14a2.5 2.5 0 0 1-5 0zm8.5-.5h2a.5.5 0 0 1 .5.5v1a1.5 1.5 0 0 1-3 0v-1a.5.5 0 0 1 .5-.5z"/>
                                </svg>
                              </div>
                              <span className="text-[8px] text-slate-500 mt-0.5 font-medium">{getInitials(user)}</span>
                            </div>
                          ))}
                        </div>
                        <span>Dipercaya oleh ribuan merchant</span>
                      </div>
                    </div>

                    <Link href="/login">
                      <Button size="lg" className="w-full h-14 text-base font-bold bg-green-500 hover:bg-green-400 text-black rounded-xl shadow-lg shadow-green-500/25 transition-all hover:shadow-green-400/40 hover:-translate-y-0.5 active:translate-y-0">
                        Daftar Sekarang
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </Link>
                    
                    <p className="text-center text-xs text-slate-500 mt-4">
                      Gratis pendaftaran • Aktivasi instan • Tanpa kartu kredit
                    </p>
                  </div>
                </div>
              </ScrollReveal>

              <div className="lg:col-span-3 space-y-4">
                <StaggerContainer className="grid sm:grid-cols-2 gap-4" staggerDelay={0.08}>
                  <StaggerItem animation="fadeUp">
                    <div className="group bg-slate-900/60 hover:bg-slate-800/80 border border-white/5 hover:border-white/20 rounded-2xl p-6 transition-all duration-300 cursor-default">
                      <div className="flex items-start gap-4">
                        <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                          <CheckCircle2 className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-white mb-1 group-hover:text-white transition-colors">Tanpa Biaya Setup</h4>
                          <p className="text-sm text-slate-400 leading-relaxed">Mulai menerima pembayaran tanpa biaya awal.</p>
                        </div>
                      </div>
                    </div>
                  </StaggerItem>

                  <StaggerItem animation="fadeUp">
                    <div className="group bg-slate-900/60 hover:bg-slate-800/80 border border-white/5 hover:border-white/20 rounded-2xl p-6 transition-all duration-300 cursor-default">
                      <div className="flex items-start gap-4">
                        <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                          <CheckCircle2 className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-white mb-1 group-hover:text-white transition-colors">Tanpa Iuran Bulanan</h4>
                          <p className="text-sm text-slate-400 leading-relaxed">Tidak ada biaya langganan, hanya bayar per transaksi.</p>
                        </div>
                      </div>
                    </div>
                  </StaggerItem>

                  <StaggerItem animation="fadeUp">
                    <div className="group bg-slate-900/60 hover:bg-slate-800/80 border border-white/5 hover:border-white/20 rounded-2xl p-6 transition-all duration-300 cursor-default">
                      <div className="flex items-start gap-4">
                        <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                          <Clock className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-white mb-1 group-hover:text-white transition-colors">Settlement Harian</h4>
                          <p className="text-sm text-slate-400 leading-relaxed">Dana masuk ke rekening Anda setiap hari kerja.</p>
                        </div>
                      </div>
                    </div>
                  </StaggerItem>

                  <StaggerItem animation="fadeUp">
                    <div className="group bg-slate-900/60 hover:bg-slate-800/80 border border-white/5 hover:border-white/20 rounded-2xl p-6 transition-all duration-300 cursor-default">
                      <div className="flex items-start gap-4">
                        <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                          <Shield className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-white mb-1 group-hover:text-white transition-colors">Keamanan Terjamin</h4>
                          <p className="text-sm text-slate-400 leading-relaxed">Dilindungi enkripsi end-to-end untuk setiap transaksi.</p>
                        </div>
                      </div>
                    </div>
                  </StaggerItem>
                </StaggerContainer>

                <ScrollReveal animation="fadeUp" delay={0.4}>
                  <div className="group bg-slate-900/60 hover:bg-slate-800/80 border border-white/5 hover:border-white/20 rounded-2xl p-6 transition-all duration-300 cursor-default">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                          <CreditCard className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-white mb-1 group-hover:text-white transition-colors">Biaya Kompetitif</h4>
                          <p className="text-sm text-slate-400 leading-relaxed">Tarif 1% lebih rendah dari rata-rata industri 2-3%</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-full group-hover:bg-white/20 transition-colors">
                        <span className="text-white font-bold text-sm">Lebih Hemat</span>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section with gradient text - Optimized */}
      <section className="py-24 border-y border-white/5 bg-slate-950/50">
        <div className="container mx-auto px-6">
          <ScrollReveal animation="fadeUp" className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-slate-300">
              Data Platform
            </h2>
          </ScrollReveal>
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center" staggerDelay={0.2}>
            {[
              { label: "Total Volume", value: `Rp ${Math.floor(liveVolume / 1000000)}Jt+` },
              { label: "Transaksi QRIS", value: `${Math.floor(liveVolume / 50000).toLocaleString('id-ID')}+` },
              { label: "Uptime Sistem", value: "99.99%" },
              { label: "Negara Partner", value: "6" }
            ].map((stat, i) => (
              <StaggerItem key={i} animation="fadeUp" className="space-y-2">
                <h3 className="text-4xl md:text-5xl font-display font-bold text-slate-200">
                  {stat.value}
                </h3>
                <p className="text-sm text-slate-500 font-medium uppercase tracking-widest">{stat.label}</p>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA Section - Optimized for performance */}
      <section className="py-32 px-6">
        <ScrollReveal animation="fadeUp" duration={1.2} className="container mx-auto relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-[3rem] -z-10"></div>
          <div className="bg-[#0f172a] border border-white/10 rounded-[2.5rem] p-12 md:p-24 text-center overflow-hidden relative">
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-8 relative z-10 w-full text-center mx-auto">
              Mulai Terima Pembayaran <br className="hidden md:inline" /> QRIS Hari Ini
            </h2>
            <ScrollTiltText as="p" maxSkewX={3} intensity={0.5} className="text-slate-400 text-lg md:text-xl mb-12 max-w-2xl mx-auto relative z-10 border-b border-slate-600/40">
              Daftarkan bisnis Anda dan mulai menerima pembayaran dari seluruh e-wallet dan mobile banking di Indonesia.
            </ScrollTiltText>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
              <Link href="/dashboard">
                <Button size="lg" className="h-14 px-10 text-lg bg-white text-black hover:bg-slate-200 rounded-full font-bold transition-transform duration-300 hover:scale-105">
                  Mulai Sekarang
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="h-14 px-10 text-lg border-white/20 hover:bg-white/5 rounded-full transition-colors duration-300">
                Hubungi Sales
              </Button>
            </div>
          </div>
        </ScrollReveal>
      </section>
      </main>
      <footer className="py-16 border-t border-white/10 bg-[#020817]" role="contentinfo">
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
               <SocialMediaIcons />
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
                <Link href="/privasi" className="hover:text-white">Privasi</Link>
                <Link href="/ketentuan" className="hover:text-white">Ketentuan</Link>
                <a href="#" className="hover:text-white">Keamanan</a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </footer>
    </div>
  );
}
