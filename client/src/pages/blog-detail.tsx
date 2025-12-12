
import { Link, useParams } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Clock, User, Share2, Twitter, Facebook, Linkedin, Instagram, Copy, Check, ChevronRight, BookOpen } from "lucide-react";
import { Logo } from "@/components/Logo";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SocialMediaIcons, showSocialMediaWarning } from "@/components/SocialMediaIcons";
import React, { useState, useEffect } from "react";

const qrisPayment1 = "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80";
const qrisPayment2 = "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80";
const qrisPayment3 = "https://images.unsplash.com/photo-1556742111-a301076d9d18?w=800&q=80";
const analytics1 = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80";
const analytics2 = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80";
const security1 = "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80";
const security2 = "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&q=80";
const coffeeShop1 = "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&q=80";
const coffeeShop2 = "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80";

interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  authorRole: string;
  authorBio: string;
  date: string;
  readTime: string;
  image: string;
  tags: string[];
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: "panduan-lengkap-qris-untuk-umkm-2024",
    title: "Panduan Lengkap QRIS untuk UMKM di Tahun 2024",
    excerpt: "Pelajari cara mengoptimalkan penggunaan QRIS untuk meningkatkan penjualan dan efisiensi operasional bisnis UMKM Anda.",
    category: "Panduan",
    author: "Tim Editorial TecnoQris",
    authorRole: "Content Team",
    authorBio: "Tim Editorial TecnoQris berkomitmen menyediakan konten edukatif berkualitas untuk membantu pelaku UMKM Indonesia bertransformasi digital.",
    date: "8 Desember 2024",
    readTime: "8 menit",
    image: qrisPayment1,
    tags: ["QRIS", "UMKM", "Pembayaran Digital", "Panduan"],
    content: `
## Apa itu QRIS?

QRIS (Quick Response Code Indonesian Standard) adalah standar QR Code pembayaran yang dikembangkan oleh Bank Indonesia untuk menyatukan berbagai metode pembayaran digital di Indonesia. Dengan satu QR Code, merchant dapat menerima pembayaran dari berbagai aplikasi e-wallet dan mobile banking.

Sejak diluncurkan pada tahun 2019, QRIS telah mengalami pertumbuhan eksponensial. Data Bank Indonesia menunjukkan bahwa volume transaksi QRIS mencapai lebih dari 2 miliar transaksi pada tahun 2023, dengan nilai total transaksi menembus Rp 600 triliun.

## Mengapa UMKM Harus Menggunakan QRIS?

### 1. Kemudahan Transaksi

Dengan QRIS, pelanggan tidak perlu lagi membawa uang tunai. Cukup dengan memindai QR Code menggunakan aplikasi e-wallet atau mobile banking favorit mereka, transaksi dapat dilakukan dalam hitungan detik.

### 2. Biaya Terjangkau

Biaya transaksi QRIS sangat kompetitif, hanya 0.7% untuk UMKM dengan omzet di bawah Rp 1 miliar per bulan. Ini jauh lebih rendah dibandingkan dengan biaya mesin EDC atau metode pembayaran digital lainnya.

### 3. Meningkatkan Penjualan

Studi menunjukkan bahwa merchant yang menyediakan opsi pembayaran digital mengalami peningkatan penjualan rata-rata 20-30%. Pelanggan cenderung berbelanja lebih banyak ketika tidak dibatasi oleh uang tunai yang mereka bawa.

### 4. Pencatatan Otomatis

Setiap transaksi tercatat secara otomatis dalam sistem. Ini memudahkan pengelolaan keuangan dan pembuatan laporan untuk keperluan pajak.

## Cara Mendaftar QRIS untuk UMKM

### Langkah 1: Pilih Penyedia Layanan

Pilih penyedia layanan QRIS yang terpercaya seperti TecnoQris. Pastikan penyedia layanan tersebut terdaftar dan diawasi oleh Bank Indonesia.

### Langkah 2: Siapkan Dokumen

Dokumen yang diperlukan untuk pendaftaran:
- KTP pemilik usaha
- NPWP (opsional untuk UMKM)
- Foto tempat usaha
- Nomor rekening bank untuk settlement

### Langkah 3: Daftar Online

Kunjungi website penyedia layanan dan isi formulir pendaftaran. Proses verifikasi biasanya memakan waktu 1-3 hari kerja.

### Langkah 4: Aktivasi dan Mulai Terima Pembayaran

Setelah disetujui, Anda akan menerima QR Code yang bisa langsung digunakan untuk menerima pembayaran.

## Tips Mengoptimalkan Penggunaan QRIS

### Tampilkan QR Code di Lokasi Strategis

Pastikan QR Code terlihat jelas oleh pelanggan. Tempatkan di dekat kasir atau meja pembayaran. Gunakan standing display yang disediakan oleh penyedia layanan.

### Edukasi Pelanggan

Tidak semua pelanggan familiar dengan pembayaran QRIS. Jangan ragu untuk menjelaskan cara penggunaannya. Berikan informasi bahwa QRIS bisa digunakan dari berbagai aplikasi e-wallet dan mobile banking.

### Pantau Transaksi Secara Rutin

Gunakan dashboard yang disediakan oleh penyedia layanan untuk memantau transaksi harian. Ini membantu Anda memahami pola pembelian pelanggan dan membuat keputusan bisnis yang lebih baik.

### Manfaatkan Fitur Notifikasi

Aktifkan notifikasi untuk setiap transaksi sukses. Ini membantu Anda memverifikasi pembayaran secara real-time dan menghindari kesalahpahaman dengan pelanggan.

## Kesimpulan

QRIS adalah solusi pembayaran yang wajib dimiliki oleh setiap UMKM di era digital ini. Dengan kemudahan pendaftaran, biaya terjangkau, dan berbagai manfaat yang ditawarkan, tidak ada alasan untuk tidak mulai menggunakan QRIS sekarang.

Daftarkan bisnis Anda di TecnoQris hari ini dan mulai terima pembayaran digital dengan mudah dan aman.
    `
  },
  {
    id: 2,
    slug: "qris-cross-border-peluang-bisnis-internasional",
    title: "QRIS Cross-Border: Membuka Peluang Bisnis Internasional",
    excerpt: "Bagaimana QRIS Cross-Border memungkinkan merchant Indonesia menerima pembayaran dari wisatawan mancanegara dengan mudah.",
    category: "Fitur",
    author: "Arief Budiman",
    authorRole: "CEO TecnoQris",
    authorBio: "Arief Budiman adalah CEO dan Co-Founder TecnoQris dengan pengalaman 15+ tahun di industri fintech dan perbankan Indonesia.",
    date: "5 Desember 2024",
    readTime: "6 menit",
    image: qrisPayment2,
    tags: ["QRIS Cross-Border", "Internasional", "Wisatawan", "ASEAN"],
    content: `
## Mengenal QRIS Cross-Border

QRIS Cross-Border adalah perluasan dari sistem QRIS yang memungkinkan merchant Indonesia menerima pembayaran dari wisatawan mancanegara menggunakan aplikasi e-wallet dari negara mereka. Inisiatif ini merupakan bagian dari kerja sama pembayaran lintas negara di kawasan ASEAN.

Dengan QRIS Cross-Border, wisatawan dari Thailand, Malaysia, Singapura, Filipina, Vietnam, dan pengguna Alipay+ (termasuk dari Tiongkok, Korea Selatan, dan negara lainnya) dapat membayar langsung menggunakan e-wallet mereka di Indonesia.

## Negara yang Sudah Terhubung

### 1. Thailand
Wisatawan Thailand dapat menggunakan aplikasi PromptPay dan TrueMoney untuk membayar di merchant QRIS Indonesia.

### 2. Malaysia
Pengguna DuitNow QR dari Malaysia dapat langsung scan QRIS Indonesia untuk melakukan pembayaran.

### 3. Singapura
PayNow dari Singapura telah terintegrasi dengan QRIS, memudahkan wisatawan Singapura berbelanja di Indonesia.

### 4. Filipina
Aplikasi GCash dan Maya dari Filipina juga sudah mendukung pembayaran ke QRIS Indonesia.

### 5. Alipay+ Network
Mencakup pengguna dari Tiongkok (Alipay), Korea Selatan (KakaoPay), Hong Kong (AlipayHK), dan berbagai negara lainnya.

## Manfaat untuk Merchant

### Jangkauan Pelanggan Lebih Luas

Dengan mendukung pembayaran lintas negara, merchant dapat melayani jutaan wisatawan yang berkunjung ke Indonesia setiap tahunnya. Data BPS menunjukkan Indonesia menerima lebih dari 10 juta wisatawan mancanegara per tahun.

### Tanpa Perlu Infrastruktur Tambahan

Tidak perlu mesin EDC khusus atau sistem pembayaran terpisah. QR Code QRIS yang sama dapat menerima pembayaran domestik maupun internasional.

### Settlement dalam Rupiah

Meskipun pelanggan membayar dengan mata uang asing, settlement ke rekening merchant tetap dalam Rupiah. Kurs konversi mengikuti standar yang ditetapkan oleh Bank Indonesia.

### Meningkatkan Daya Saing

Merchant yang sudah siap menerima pembayaran internasional memiliki keunggulan kompetitif dibandingkan yang belum.

## Cara Mengaktifkan QRIS Cross-Border

### Langkah 1: Pastikan QRIS Anda Mendukung Cross-Border

Tidak semua penyedia QRIS mendukung fitur cross-border. Pastikan Anda menggunakan penyedia seperti TecnoQris yang sudah terintegrasi dengan jaringan pembayaran internasional.

### Langkah 2: Verifikasi Tambahan

Untuk fitur cross-border, mungkin diperlukan verifikasi tambahan untuk memastikan kepatuhan terhadap regulasi anti pencucian uang.

### Langkah 3: Update QR Code (Jika Diperlukan)

Beberapa penyedia mungkin perlu memperbarui QR Code Anda untuk mengaktifkan fitur cross-border. Di TecnoQris, fitur ini aktif otomatis untuk semua merchant.

## Tips Melayani Wisatawan Mancanegara

### Siapkan Tanda Visual

Pasang stiker atau tanda yang menunjukkan bahwa Anda menerima pembayaran dari e-wallet internasional. Logo Alipay+, DuitNow, dan PayNow dapat menarik perhatian wisatawan.

### Latih Staf Anda

Pastikan staf memahami cara membantu wisatawan yang ingin membayar menggunakan e-wallet asing mereka.

### Komunikasikan Nilai Tukar

Wisatawan mungkin bertanya tentang nilai tukar. Jelaskan bahwa konversi dilakukan otomatis oleh sistem dengan kurs yang kompetitif.

## Kesimpulan

QRIS Cross-Border membuka peluang besar bagi merchant Indonesia untuk menjangkau pelanggan internasional. Dengan persiapan yang tepat, bisnis Anda siap melayani wisatawan dari berbagai negara dengan mudah dan efisien.

Hubungi tim TecnoQris untuk informasi lebih lanjut tentang aktivasi fitur QRIS Cross-Border untuk bisnis Anda.
    `
  },
  {
    id: 3,
    slug: "keamanan-transaksi-digital-tips-merchant",
    title: "Keamanan Transaksi Digital: Tips untuk Merchant",
    excerpt: "Praktik terbaik untuk menjaga keamanan transaksi digital dan melindungi bisnis Anda dari risiko fraud.",
    category: "Keamanan",
    author: "Sari Wulandari",
    authorRole: "CTO TecnoQris",
    authorBio: "Sari Wulandari adalah CTO TecnoQris dengan keahlian di bidang keamanan siber dan infrastruktur pembayaran digital.",
    date: "1 Desember 2024",
    readTime: "10 menit",
    image: security1,
    tags: ["Keamanan", "Fraud", "Tips", "Best Practice"],
    content: `
## Pentingnya Keamanan dalam Pembayaran Digital

Seiring meningkatnya adopsi pembayaran digital, risiko keamanan juga semakin berkembang. Merchant perlu memahami ancaman yang ada dan cara melindungi bisnis mereka dari potensi kerugian akibat fraud atau penipuan.

Data dari OJK menunjukkan bahwa kasus fraud dalam transaksi digital meningkat 25% pada tahun 2023. Namun, dengan langkah-langkah pencegahan yang tepat, sebagian besar risiko ini dapat dimitigasi.

## Jenis-Jenis Fraud yang Perlu Diwaspadai

### 1. Screenshot Palsu

Pelaku menunjukkan screenshot pembayaran sukses yang sebenarnya palsu atau hasil edit. Ini adalah modus paling umum yang menyasar merchant.

**Cara Menghindari:**
- Selalu verifikasi pembayaran melalui dashboard atau notifikasi resmi dari penyedia layanan
- Jangan hanya percaya pada screenshot yang ditunjukkan pelanggan
- Aktifkan notifikasi suara untuk setiap transaksi sukses

### 2. Chargeback Fraud

Pelanggan mengklaim bahwa mereka tidak melakukan transaksi setelah menerima barang atau jasa, kemudian meminta refund.

**Cara Menghindari:**
- Simpan bukti transaksi dan bukti penyerahan barang/jasa
- Gunakan sistem pencatatan yang rapi
- Untuk transaksi besar, minta konfirmasi tertulis dari pelanggan

### 3. Phishing

Pelaku mengirim pesan atau email palsu yang mengaku dari penyedia layanan pembayaran untuk mencuri kredensial login.

**Cara Menghindari:**
- Jangan klik link dari email atau pesan yang mencurigakan
- Selalu akses dashboard melalui URL resmi
- Aktifkan autentikasi dua faktor (2FA)

### 4. QR Code Palsu

Pelaku mengganti QR Code asli merchant dengan QR Code milik mereka untuk mengalihkan pembayaran.

**Cara Menghindari:**
- Periksa QR Code secara berkala untuk memastikan tidak ada yang menempelkan QR Code palsu
- Gunakan standing display resmi dari penyedia layanan
- Simpan QR Code di tempat yang bisa dipantau

## Best Practice Keamanan untuk Merchant

### Kelola Akses dengan Bijak

- Batasi siapa saja yang bisa mengakses dashboard pembayaran
- Buat akun terpisah untuk setiap staf jika platform mendukung
- Segera nonaktifkan akses untuk staf yang sudah tidak bekerja

### Gunakan Password yang Kuat

- Kombinasi huruf besar, huruf kecil, angka, dan simbol
- Minimal 12 karakter
- Jangan gunakan informasi pribadi yang mudah ditebak
- Ganti password secara berkala (minimal 3 bulan sekali)

### Aktifkan Autentikasi Dua Faktor (2FA)

2FA menambahkan lapisan keamanan ekstra. Meskipun password Anda bocor, pelaku tetap membutuhkan kode verifikasi dari perangkat Anda untuk login.

### Monitor Transaksi Secara Rutin

- Periksa laporan transaksi harian
- Waspadai transaksi dengan pola tidak biasa
- Segera laporkan jika menemukan transaksi mencurigakan

### Update Aplikasi dan Sistem

Selalu gunakan versi terbaru dari aplikasi dan sistem yang Anda gunakan. Update biasanya mengandung perbaikan keamanan penting.

## Apa yang Harus Dilakukan Jika Terjadi Fraud?

### 1. Dokumentasikan Semua Bukti

Simpan screenshot, nomor transaksi, waktu kejadian, dan informasi lain yang relevan.

### 2. Hubungi Penyedia Layanan

Segera laporkan kejadian ke penyedia layanan pembayaran Anda. Tim support TecnoQris siap membantu 24/7.

### 3. Laporkan ke Pihak Berwajib

Untuk kasus dengan kerugian signifikan, laporkan ke kepolisian dengan menyertakan semua bukti yang ada.

### 4. Review dan Perkuat Keamanan

Setelah insiden, evaluasi apa yang bisa diperbaiki untuk mencegah kejadian serupa di masa depan.

## Fitur Keamanan TecnoQris

TecnoQris dilengkapi dengan berbagai fitur keamanan untuk melindungi merchant:

- **Enkripsi End-to-End**: Semua data transaksi dienkripsi dengan standar tertinggi
- **PCI-DSS Level 1 Certified**: Standar keamanan internasional untuk pemrosesan pembayaran
- **Real-time Fraud Detection**: Sistem AI yang mendeteksi pola transaksi mencurigakan
- **Notifikasi Instan**: Pemberitahuan real-time untuk setiap transaksi
- **2FA dan Biometrik**: Opsi autentikasi tambahan untuk akses dashboard

## Kesimpulan

Keamanan adalah tanggung jawab bersama. Dengan memahami risiko dan menerapkan praktik keamanan yang baik, Anda dapat meminimalkan kemungkinan menjadi korban fraud dan menjalankan bisnis dengan lebih tenang.

Jika Anda memiliki pertanyaan tentang keamanan atau menemukan aktivitas mencurigakan, jangan ragu untuk menghubungi tim keamanan TecnoQris.
    `
  },
  {
    id: 4,
    slug: "tren-pembayaran-digital-indonesia-2025",
    title: "Tren Pembayaran Digital Indonesia 2025: Apa yang Perlu Diketahui",
    excerpt: "Analisis mendalam tentang arah perkembangan industri pembayaran digital di Indonesia dan bagaimana bisnis bisa mempersiapkan diri.",
    category: "Industri",
    author: "Rendra Pratama",
    authorRole: "COO TecnoQris",
    authorBio: "Rendra Pratama adalah COO TecnoQris dengan pengalaman luas dalam operasional bisnis fintech dan pengembangan ekosistem pembayaran digital.",
    date: "28 November 2024",
    readTime: "12 menit",
    image: analytics1,
    tags: ["Tren", "2025", "Industri", "Fintech"],
    content: `
## Lanskap Pembayaran Digital Indonesia

Indonesia telah mengalami transformasi luar biasa dalam adopsi pembayaran digital. Dari negara yang didominasi transaksi tunai, kini lebih dari 60% transaksi ritel di kota-kota besar dilakukan secara digital.

Bank Indonesia mencatat pertumbuhan transaksi pembayaran digital mencapai 35% year-over-year pada 2024, dengan QRIS sebagai salah satu pendorong utama pertumbuhan ini.

## Tren Utama yang Akan Mendominasi 2025

### 1. Ekspansi QRIS ke Sektor Baru

QRIS tidak lagi terbatas pada transaksi ritel. Pada 2025, kita akan melihat adopsi QRIS di sektor-sektor baru:

- **Transportasi Publik**: Pembayaran tiket bus, kereta, dan MRT menggunakan QRIS
- **Parkir**: Sistem parkir terintegrasi dengan pembayaran QRIS
- **Vending Machine**: Mesin penjual otomatis yang mendukung QRIS
- **Donasi dan Zakat**: Organisasi keagamaan dan sosial mengadopsi QRIS

### 2. Integrasi dengan Super Apps

Super apps seperti Gojek, Grab, dan Tokopedia akan semakin mengintegrasikan fitur pembayaran mereka. Pengguna dapat menggunakan saldo e-wallet mereka untuk berbagai keperluan dalam satu aplikasi.

### 3. Pembayaran Biometrik

Teknologi pembayaran menggunakan biometrik (sidik jari, pengenalan wajah) akan mulai diadopsi di Indonesia. Beberapa bank sudah menguji coba teknologi ini untuk transaksi ATM tanpa kartu.

### 4. Embedded Finance

Layanan keuangan akan semakin terintegrasi dalam platform non-finansial:
- E-commerce dengan fitur cicilan built-in
- Aplikasi kesehatan dengan pembayaran langsung ke rumah sakit
- Platform pendidikan dengan fitur pembayaran SPP

### 5. CBDC (Central Bank Digital Currency)

Bank Indonesia terus mengembangkan Rupiah Digital. Meskipun implementasi penuh mungkin masih beberapa tahun lagi, merchant perlu mulai memahami konsep ini dan implikasinya.

## Data dan Proyeksi

### Pertumbuhan Transaksi QRIS

| Tahun | Volume Transaksi | Nilai Transaksi |
|-------|-----------------|-----------------|
| 2022  | 800 juta        | Rp 200 triliun  |
| 2023  | 1,8 miliar      | Rp 600 triliun  |
| 2024  | 3,5 miliar      | Rp 1.200 triliun |
| 2025* | 6 miliar        | Rp 2.500 triliun |

*Proyeksi

### Penetrasi E-Wallet

Diperkirakan pada akhir 2025, lebih dari 80% penduduk usia produktif Indonesia akan memiliki setidaknya satu akun e-wallet aktif.

## Tantangan yang Perlu Diantisipasi

### 1. Kesenjangan Digital

Meskipun adopsi meningkat di perkotaan, daerah rural masih menghadapi kendala infrastruktur dan literasi digital.

### 2. Keamanan Siber

Dengan meningkatnya transaksi digital, ancaman siber juga meningkat. Investasi dalam keamanan akan menjadi prioritas.

### 3. Regulasi yang Berkembang

Regulator akan terus memperbarui aturan untuk mengikuti perkembangan teknologi. Pelaku industri perlu agile dalam beradaptasi.

### 4. Interoperabilitas

Memastikan berbagai sistem pembayaran dapat bekerja sama dengan mulus akan menjadi tantangan teknis yang berkelanjutan.

## Bagaimana Bisnis Harus Mempersiapkan Diri

### 1. Investasi dalam Teknologi

Pastikan sistem pembayaran Anda up-to-date dan dapat mengakomodasi perkembangan baru.

### 2. Tingkatkan Literasi Tim

Latih staf Anda tentang tren pembayaran terbaru dan cara melayani pelanggan dengan berbagai preferensi pembayaran.

### 3. Diversifikasi Opsi Pembayaran

Jangan bergantung pada satu metode pembayaran. Sediakan berbagai opsi untuk mengakomodasi semua pelanggan.

### 4. Prioritaskan Keamanan

Implementasikan standar keamanan tertinggi dan edukasi pelanggan tentang praktik pembayaran yang aman.

### 5. Manfaatkan Data

Gunakan data transaksi untuk memahami perilaku pelanggan dan membuat keputusan bisnis yang lebih baik.

## Kesimpulan

Tahun 2025 akan menjadi tahun yang exciting untuk industri pembayaran digital Indonesia. Dengan persiapan yang tepat, bisnis Anda dapat memanfaatkan tren ini untuk pertumbuhan dan efisiensi yang lebih baik.

TecnoQris berkomitmen untuk terus berinovasi dan membantu merchant Indonesia menghadapi masa depan pembayaran digital.
    `
  },
  {
    id: 5,
    slug: "integrasi-qris-dengan-sistem-pos",
    title: "Integrasi QRIS dengan Sistem POS: Langkah demi Langkah",
    excerpt: "Tutorial teknis untuk mengintegrasikan pembayaran QRIS dengan sistem Point of Sale yang sudah ada di bisnis Anda.",
    category: "Tutorial",
    author: "Tim Teknis TecnoQris",
    authorRole: "Engineering Team",
    authorBio: "Tim Teknis TecnoQris adalah tim engineer berpengalaman yang berdedikasi membangun infrastruktur pembayaran yang andal dan mudah diintegrasikan.",
    date: "25 November 2024",
    readTime: "15 menit",
    image: analytics2,
    tags: ["Tutorial", "API", "POS", "Integrasi"],
    content: `
## Mengapa Integrasi POS Penting?

Mengintegrasikan QRIS dengan sistem Point of Sale (POS) Anda memberikan berbagai keuntungan:

- **Otomatisasi**: Transaksi tercatat otomatis tanpa input manual
- **Akurasi**: Mengurangi kesalahan pencatatan
- **Efisiensi**: Proses checkout lebih cepat
- **Rekonsiliasi**: Pencocokan data penjualan dan pembayaran lebih mudah

## Metode Integrasi yang Tersedia

### 1. API Integration

Cocok untuk bisnis dengan tim teknis internal atau yang bekerja dengan vendor POS.

### 2. Webhook Notification

Untuk sistem yang hanya perlu menerima notifikasi transaksi sukses.

### 3. Plugin/Modul Pre-built

Tersedia untuk beberapa platform POS populer di Indonesia.

## Langkah Integrasi via API

### Langkah 1: Dapatkan API Credentials

Login ke dashboard TecnoQris dan navigasi ke menu API Keys. Generate API Key dan Secret Key yang akan digunakan untuk autentikasi.

### Langkah 2: Baca Dokumentasi API

Dokumentasi lengkap tersedia di docs.tecnoqris.id. Pastikan Anda memahami:
- Endpoint yang tersedia
- Format request dan response
- Error handling
- Rate limiting

### Langkah 3: Setup Environment

Untuk development, gunakan environment sandbox:

**Sandbox URL**: https://sandbox-api.tecnoqris.id
**Production URL**: https://api.tecnoqris.id

### Langkah 4: Implementasi Generate QRIS

Berikut contoh request untuk generate QRIS dinamis:

**Endpoint**: POST /v1/qris/generate

**Headers**:
- Authorization: Bearer {api_key}
- Content-Type: application/json

**Request Body**:
- merchant_id: ID merchant Anda
- amount: Nominal transaksi dalam Rupiah
- reference_id: ID referensi unik dari sistem Anda
- expiry_time: Waktu kadaluarsa QR (opsional, default 15 menit)

**Response**:
- qr_code: String QR Code untuk ditampilkan
- qr_image_url: URL gambar QR yang bisa langsung ditampilkan
- transaction_id: ID transaksi dari TecnoQris
- expired_at: Waktu kadaluarsa QR

### Langkah 5: Implementasi Webhook

Setup endpoint di server Anda untuk menerima notifikasi pembayaran.

**Webhook Payload yang Dikirim**:
- transaction_id: ID transaksi
- reference_id: ID referensi dari sistem Anda
- amount: Nominal transaksi
- status: Status transaksi (success/failed)
- paid_at: Waktu pembayaran
- payer_info: Informasi pembayar (opsional)

**Penting**: Selalu verifikasi signature pada webhook untuk memastikan keaslian notifikasi.

### Langkah 6: Handle Callback

Setelah menerima webhook:
1. Verifikasi signature
2. Update status transaksi di sistem POS
3. Kirim response 200 OK ke server TecnoQris
4. Trigger aksi lanjutan (cetak struk, update inventory, dll)

## Contoh Implementasi

### Node.js/Express

Berikut contoh sederhana implementasi di Node.js:

1. Install dependencies: axios untuk HTTP request
2. Buat service untuk generate QRIS
3. Setup endpoint webhook untuk menerima notifikasi
4. Verifikasi signature webhook
5. Update status transaksi

### PHP/Laravel

Untuk pengguna Laravel:

1. Install Guzzle untuk HTTP client
2. Buat Service class untuk TecnoQris
3. Setup route untuk webhook
4. Buat controller untuk handle webhook
5. Verifikasi dan proses notifikasi

## Best Practice Integrasi

### 1. Gunakan Idempotency Key

Untuk mencegah duplikasi transaksi, selalu sertakan idempotency key pada setiap request generate QRIS.

### 2. Implement Retry Logic

Network error bisa terjadi. Implementasikan retry logic dengan exponential backoff untuk request yang gagal.

### 3. Logging

Log semua request dan response untuk debugging dan audit trail.

### 4. Timeout Handling

Set timeout yang wajar (15-30 detik) dan handle timeout gracefully.

### 5. Error Handling

Tangani berbagai jenis error dengan tepat:
- Network error: Retry atau tampilkan pesan ke user
- Validation error: Tampilkan pesan yang jelas
- Server error: Log dan notify tim teknis

## Testing

### Sandbox Testing

Gunakan environment sandbox untuk testing. TecnoQris menyediakan simulator untuk mensimulasikan berbagai skenario pembayaran.

### Test Cases yang Harus Dicovered

1. Generate QRIS sukses
2. Pembayaran sukses
3. Pembayaran gagal
4. QR expired
5. Webhook failure dan retry
6. Concurrent transactions

## Troubleshooting

### QR Tidak Bisa Di-scan

- Pastikan resolusi gambar QR cukup tinggi (minimal 200x200 pixel)
- Pastikan kontras warna memadai
- Check apakah QR sudah expired

### Webhook Tidak Diterima

- Verifikasi URL webhook di dashboard
- Pastikan server Anda publicly accessible
- Check firewall settings
- Review log server untuk melihat incoming requests

### Transaksi Tidak Terupdate

- Pastikan webhook handler mengirim response 200
- Check apakah ada error di proses update database
- Verifikasi signature matching

## Kesimpulan

Integrasi QRIS dengan sistem POS membutuhkan perencanaan dan implementasi yang teliti. Dengan mengikuti panduan ini dan memanfaatkan dokumentasi serta support dari TecnoQris, proses integrasi dapat berjalan lancar.

Tim teknis TecnoQris siap membantu Anda dalam proses integrasi. Hubungi integration@tecnoqris.id untuk konsultasi teknis.
    `
  },
  {
    id: 6,
    slug: "studi-kasus-warung-kopi-nusantara",
    title: "Studi Kasus: Bagaimana Warung Kopi Nusantara Meningkatkan Penjualan 40% dengan QRIS",
    excerpt: "Kisah sukses UMKM yang berhasil meningkatkan omzet dengan memanfaatkan pembayaran digital QRIS.",
    category: "Studi Kasus",
    author: "Putri Maharani",
    authorRole: "CPO TecnoQris",
    authorBio: "Putri Maharani adalah CPO TecnoQris dengan pengalaman di Gojek dan Tokopedia, fokus pada user experience dan product-market fit.",
    date: "20 November 2024",
    readTime: "7 menit",
    image: coffeeShop1,
    tags: ["Studi Kasus", "UMKM", "Kopi", "Sukses"],
    content: `
## Profil Usaha

**Nama Usaha**: Warung Kopi Nusantara
**Lokasi**: Jl. Malioboro No. 45, Yogyakarta
**Pemilik**: Pak Joko Susanto (52 tahun)
**Berdiri Sejak**: 2015
**Produk**: Kopi tradisional, minuman kekinian, camilan

Warung Kopi Nusantara adalah kedai kopi yang mengusung konsep tradisional dengan sentuhan modern. Berlokasi strategis di kawasan wisata Malioboro, kedai ini melayani baik warga lokal maupun wisatawan domestik dan mancanegara.

## Tantangan Sebelum QRIS

Sebelum mengadopsi QRIS di awal 2023, Warung Kopi Nusantara menghadapi beberapa tantangan:

### 1. Keterbatasan Uang Kembalian

"Setiap pagi saya harus ke bank untuk menukar uang receh. Kadang antri sampai satu jam," cerita Pak Joko.

### 2. Risiko Kehilangan Uang Tunai

Pernah terjadi kehilangan uang di kasir yang tidak terdeteksi sampai tutup toko.

### 3. Pelanggan yang Enggan Berbelanja

Banyak pelanggan muda yang tidak membawa uang tunai sering kali membatalkan pembelian karena harus mencari ATM terlebih dahulu.

### 4. Pencatatan Manual yang Rumit

Setiap transaksi harus dicatat manual, rentan kesalahan, dan memakan waktu.

## Proses Adopsi QRIS

### Penemuan

Pak Joko pertama kali mengenal QRIS dari tetangga sesama penjual di Malioboro yang sudah lebih dulu menggunakan. "Saya lihat dia kok enak ya, pembeli tinggal scan, tidak perlu pusing kembalian."

### Pendaftaran

Pak Joko mendaftar melalui TecnoQris pada Januari 2023. "Prosesnya cepat, tidak sampai seminggu sudah bisa pakai."

### Implementasi

Awalnya, Pak Joko menempatkan standing QRIS di samping kasir. Ia dan karyawannya belajar cara memverifikasi pembayaran melalui notifikasi HP.

### Sosialisasi ke Pelanggan

"Awalnya saya yang aktif menawarkan ke pelanggan, 'Bapak/Ibu mau bayar pakai QRIS?' Lama-lama mereka sudah terbiasa."

## Hasil Setelah 1 Tahun

### Peningkatan Penjualan 40%

Omzet bulanan Warung Kopi Nusantara meningkat dari rata-rata Rp 25 juta menjadi Rp 35 juta per bulan.

**Faktor Kontributor**:
- Pelanggan yang sebelumnya batal beli karena tidak bawa cash sekarang jadi membeli
- Pelanggan cenderung order lebih banyak karena tidak terbatas uang di dompet
- Wisatawan asing bisa bayar pakai e-wallet negara mereka (QRIS Cross-Border)

### Efisiensi Operasional

- Waktu yang dihabiskan untuk kelola uang tunai berkurang 80%
- Tidak perlu lagi menukar uang receh ke bank
- Pencatatan otomatis mengurangi kesalahan

### Komposisi Pembayaran

Setelah 1 tahun:
- Pembayaran QRIS: 65%
- Pembayaran Tunai: 35%

### Kepuasan Pelanggan

"Banyak pelanggan yang bilang lebih nyaman bayar pakai QRIS. Tidak perlu bawa dompet tebal," ujar Pak Joko.

## Pelajaran yang Bisa Diambil

### 1. Jangan Takut Mencoba Hal Baru

"Awalnya saya agak takut karena tidak paham teknologi. Tapi ternyata gampang," kata Pak Joko.

### 2. Edukasi Pelanggan itu Penting

Jangan ragu menjelaskan cara pembayaran QRIS ke pelanggan yang belum familiar.

### 3. Manfaatkan Lokasi Strategis

Warung di lokasi wisata sangat diuntungkan dengan QRIS Cross-Border untuk melayani wisatawan asing.

### 4. Konsisten dan Sabar

Adopsi pembayaran digital membutuhkan waktu. Hasil tidak instan, tapi pasti terasa seiring waktu.

## Tips dari Pak Joko untuk UMKM Lain

1. **Mulai saja dulu** - Jangan terlalu banyak berpikir, langsung daftar dan coba
2. **Tempatkan QR di tempat yang terlihat** - Buat pelanggan mudah melihat dan scan
3. **Selalu cek notifikasi** - Pastikan pembayaran benar-benar masuk sebelum memberikan pesanan
4. **Jaga HP tetap online** - Sinyal internet yang stabil penting untuk notifikasi real-time
5. **Manfaatkan laporan transaksi** - Untuk memahami pola penjualan dan membuat keputusan bisnis

## Rencana ke Depan

Pak Joko berencana membuka cabang kedua di kawasan Prawirotaman yang juga ramai wisatawan. "Pastinya langsung pakai QRIS dari hari pertama," ujarnya mantap.

## Kesimpulan

Kisah Warung Kopi Nusantara menunjukkan bahwa adopsi pembayaran digital bukan hanya untuk bisnis besar. UMKM dengan berbagai skala dapat memanfaatkan QRIS untuk meningkatkan penjualan, efisiensi, dan kepuasan pelanggan.

Apakah bisnis Anda siap mengikuti jejak sukses Warung Kopi Nusantara? Daftarkan usaha Anda di TecnoQris hari ini.
    `
  },
  {
    id: 7,
    slug: "perbedaan-qris-dinamis-statis",
    title: "QRIS Dinamis vs Statis: Mana yang Tepat untuk Bisnis Anda?",
    excerpt: "Memahami perbedaan kedua jenis QRIS dan kapan sebaiknya menggunakan masing-masing tipe untuk bisnis Anda.",
    category: "Panduan",
    author: "Budi Hartono",
    authorRole: "CCO TecnoQris",
    authorBio: "Budi Hartono adalah CCO TecnoQris dengan jaringan luas di sektor retail, F&B, dan layanan profesional.",
    date: "15 November 2024",
    readTime: "5 menit",
    image: qrisPayment3,
    tags: ["QRIS", "Dinamis", "Statis", "Panduan"],
    content: `
## Pengenalan Dua Jenis QRIS

Bank Indonesia menetapkan dua jenis QRIS yang dapat digunakan oleh merchant: QRIS Statis dan QRIS Dinamis. Masing-masing memiliki karakteristik dan use case yang berbeda.

## QRIS Statis

### Apa itu QRIS Statis?

QRIS Statis adalah QR Code yang tidak berubah dan tidak mengandung informasi nominal transaksi. Pelanggan yang scan QR ini harus memasukkan nominal pembayaran secara manual di aplikasi mereka.

### Karakteristik

- QR Code tetap sama untuk setiap transaksi
- Pelanggan input nominal sendiri
- Tidak ada batas waktu kadaluarsa
- Bisa dicetak sekali dan digunakan selamanya

### Kelebihan

1. **Sederhana**: Tidak perlu generate QR baru untuk setiap transaksi
2. **Murah**: Cukup cetak sekali
3. **Praktis**: Cocok untuk usaha dengan volume transaksi tinggi tapi nominal kecil
4. **Offline-friendly**: Tidak memerlukan koneksi internet untuk menampilkan QR

### Kekurangan

1. **Risiko Input Salah**: Pelanggan bisa salah memasukkan nominal
2. **Kurang Aman**: Tidak ada validasi nominal dari sistem
3. **Manual Verification**: Merchant harus verifikasi nominal secara manual

### Cocok Untuk

- Warung makan dengan harga menu standar
- Toko kelontong
- Pedagang pasar
- Donasi dan sumbangan
- Parkir dengan tarif flat

## QRIS Dinamis

### Apa itu QRIS Dinamis?

QRIS Dinamis adalah QR Code yang di-generate untuk setiap transaksi dengan nominal yang sudah ditentukan. Pelanggan tidak perlu input nominal, tinggal scan dan konfirmasi pembayaran.

### Karakteristik

- QR Code unik untuk setiap transaksi
- Nominal sudah tercantum dalam QR
- Ada waktu kadaluarsa (biasanya 5-15 menit)
- Memerlukan sistem untuk generate QR

### Kelebihan

1. **Akurat**: Tidak ada risiko salah input nominal
2. **Aman**: Nominal terverifikasi oleh sistem
3. **Terintegrasi**: Bisa dihubungkan dengan sistem POS atau kasir
4. **Reconciliation Mudah**: Setiap transaksi memiliki ID unik

### Kekurangan

1. **Butuh Sistem**: Perlu perangkat untuk generate dan display QR
2. **Koneksi Internet**: Memerlukan internet yang stabil
3. **Biaya Lebih**: Ada biaya untuk sistem dan perangkat

### Cocok Untuk

- Restoran dan kafe
- Retail modern
- E-commerce
- Jasa profesional
- Bisnis dengan variasi harga produk

## Perbandingan Langsung

| Aspek | QRIS Statis | QRIS Dinamis |
|-------|-------------|--------------|
| Nominal | Input manual | Sudah terisi |
| QR Code | Tetap | Berubah tiap transaksi |
| Kadaluarsa | Tidak ada | Ada (5-15 menit) |
| Integrasi POS | Tidak bisa | Bisa |
| Biaya Setup | Rendah | Lebih tinggi |
| Keamanan | Standar | Lebih tinggi |
| Use Case | Transaksi sederhana | Transaksi kompleks |

## Hybrid Approach

Beberapa bisnis menggunakan kombinasi keduanya:

- **QRIS Statis** untuk item dengan harga tetap atau area khusus (contoh: tips, parkir)
- **QRIS Dinamis** untuk transaksi regular melalui kasir

## Bagaimana Memilih?

### Gunakan QRIS Statis Jika:

- Bisnis Anda berskala kecil dengan transaksi sederhana
- Tidak memiliki sistem POS
- Produk memiliki harga yang sudah diketahui pelanggan
- Budget terbatas untuk teknologi

### Gunakan QRIS Dinamis Jika:

- Bisnis Anda memiliki variasi harga produk
- Sudah menggunakan sistem POS
- Membutuhkan akurasi tinggi dalam pencatatan
- Ingin mengurangi risiko kesalahan transaksi

## Implementasi di TecnoQris

TecnoQris mendukung kedua jenis QRIS:

**QRIS Statis**: Bisa diunduh langsung dari dashboard dan dicetak

**QRIS Dinamis**: Bisa di-generate melalui:
- Dashboard (manual)
- API (integrasi sistem)
- Aplikasi mobile TecnoQris

## Kesimpulan

Tidak ada jenis QRIS yang lebih baik secara universal. Pilihan tergantung pada kebutuhan dan karakteristik bisnis Anda. Yang terpenting adalah memahami kelebihan dan kekurangan masing-masing untuk membuat keputusan yang tepat.

Hubungi tim TecnoQris untuk konsultasi gratis tentang jenis QRIS yang paling sesuai untuk bisnis Anda.
    `
  },
  {
    id: 8,
    slug: "regulasi-qris-terbaru-bank-indonesia",
    title: "Update Regulasi QRIS Terbaru dari Bank Indonesia",
    excerpt: "Rangkuman perubahan regulasi QRIS terkini dan dampaknya bagi merchant dan penyedia layanan pembayaran.",
    category: "Regulasi",
    author: "Dewi Anggraini",
    authorRole: "CFO TecnoQris",
    authorBio: "Dewi Anggraini adalah CFO TecnoQris, CPA dengan pengalaman 12+ tahun di sektor keuangan dan kepatuhan regulasi.",
    date: "10 November 2024",
    readTime: "8 menit",
    image: security2,
    tags: ["Regulasi", "Bank Indonesia", "MDR", "Kepatuhan"],
    content: `
## Latar Belakang

Bank Indonesia secara berkala memperbarui regulasi terkait QRIS untuk menjaga ekosistem pembayaran yang sehat, aman, dan adil. Pemahaman terhadap regulasi ini penting bagi merchant maupun penyedia layanan pembayaran.

Artikel ini merangkum update regulasi QRIS terbaru yang berlaku per November 2024 dan yang akan berlaku mulai Januari 2025.

## Perubahan Merchant Discount Rate (MDR)

### Apa itu MDR?

MDR adalah biaya yang dikenakan kepada merchant untuk setiap transaksi QRIS. Biaya ini dibagi antara penyedia jasa pembayaran (acquirer) dan penerbit (issuer).

### Struktur MDR Terbaru

**Untuk Usaha Mikro (UMi)**:
- Omzet maksimal Rp 100 juta/bulan
- MDR: 0% (gratis)

**Untuk Usaha Kecil dan Menengah (UKM)**:
- Omzet Rp 100 juta - Rp 1 miliar/bulan
- MDR: 0.7%

**Untuk Usaha Regular**:
- Omzet di atas Rp 1 miliar/bulan
- MDR: Sesuai kesepakatan dengan acquirer (maksimal 1%)

### Perubahan dari Sebelumnya

Sebelumnya, MDR untuk UMi adalah 0.3%. Penghapusan MDR untuk UMi merupakan insentif besar untuk mendorong digitalisasi UMKM terkecil.

## Batas Transaksi QRIS

### Transaksi Tunggal

- Maksimal Rp 10 juta per transaksi
- Berlaku untuk QRIS domestik

### Transaksi Harian

- Batas ditentukan oleh masing-masing penerbit (e-wallet/bank)
- Umumnya Rp 20-50 juta per hari

### QRIS Cross-Border

- Mengikuti batas dari negara asal pembayar
- Konversi mata uang menggunakan kurs yang ditetapkan

## Standar Keamanan

### Kewajiban PCI-DSS

Semua penyedia layanan pembayaran yang memproses data transaksi wajib memiliki sertifikasi PCI-DSS minimal Level 2. Untuk penyedia besar, diwajibkan Level 1.

### Two-Factor Authentication

Mulai 2025, transaksi QRIS di atas Rp 500.000 akan memerlukan autentikasi tambahan dari pembayar.

### Fraud Monitoring

Penyedia layanan wajib memiliki sistem monitoring fraud real-time dengan kemampuan mendeteksi dan memblokir transaksi mencurigakan.

## Pelaporan dan Kepatuhan

### Kewajiban Pelaporan

Penyedia layanan wajib melaporkan:
- Volume dan nilai transaksi bulanan
- Jumlah merchant aktif
- Kasus fraud dan penanganannya
- Keluhan konsumen dan resolusinya

### Sanksi Ketidakpatuhan

Bank Indonesia dapat memberikan sanksi berupa:
- Peringatan tertulis
- Denda administratif
- Pembatasan kegiatan usaha
- Pencabutan izin

## Perlindungan Konsumen

### Transparansi Biaya

Merchant wajib menginformasikan jika ada biaya tambahan yang dibebankan ke konsumen untuk pembayaran QRIS.

### Penanganan Keluhan

- Maksimal 1x24 jam untuk respons awal
- Maksimal 14 hari kerja untuk penyelesaian keluhan sederhana
- Maksimal 40 hari kerja untuk keluhan kompleks

### Hak Konsumen

- Mendapat bukti transaksi
- Mendapat informasi status pembayaran
- Mengajukan keluhan jika terjadi masalah
- Mendapat kompensasi jika kesalahan dari penyedia layanan

## Dampak bagi Merchant

### Positif

1. **Biaya Lebih Rendah**: MDR 0% untuk UMi sangat menguntungkan
2. **Perlindungan Lebih Baik**: Standar keamanan yang tinggi melindungi merchant
3. **Transparansi**: Regulasi yang jelas memberikan kepastian

### Yang Perlu Diperhatikan

1. **Verifikasi Kategori Usaha**: Pastikan kategori usaha Anda sesuai untuk mendapat MDR yang tepat
2. **Compliance**: Pastikan penyedia layanan Anda mematuhi regulasi
3. **Update Sistem**: Siap untuk perubahan yang mungkin memerlukan update sistem

## Timeline Implementasi

| Regulasi | Berlaku Mulai |
|----------|---------------|
| MDR 0% untuk UMi | 1 Desember 2024 |
| 2FA untuk transaksi >Rp 500rb | 1 Maret 2025 |
| Standar keamanan baru | 1 Juli 2025 |

## Bagaimana TecnoQris Mematuhi Regulasi

TecnoQris berkomitmen pada kepatuhan penuh terhadap regulasi Bank Indonesia:

- Tersertifikasi PCI-DSS Level 1
- Sistem fraud monitoring 24/7
- Tim compliance dedicated
- Pelaporan rutin ke regulator
- Penanganan keluhan sesuai SLA

## Kesimpulan

Regulasi yang ketat adalah hal positif untuk ekosistem pembayaran digital Indonesia. Ini memastikan keamanan, keadilan, dan keberlanjutan industri.

Sebagai merchant, pastikan Anda bekerja sama dengan penyedia layanan yang patuh pada regulasi dan dapat memberikan informasi transparan tentang biaya dan ketentuan layanan.

Untuk pertanyaan tentang regulasi atau kepatuhan, hubungi tim compliance TecnoQris di compliance@tecnoqris.id.
    `
  },
  {
    id: 9,
    slug: "optimasi-dashboard-tecnoqris",
    title: "Cara Mengoptimalkan Dashboard TecnoQris untuk Analisis Bisnis",
    excerpt: "Tips dan trik memanfaatkan fitur dashboard TecnoQris untuk mendapatkan insight bisnis yang actionable.",
    category: "Tutorial",
    author: "Tim Produk TecnoQris",
    authorRole: "Product Team",
    authorBio: "Tim Produk TecnoQris berdedikasi menciptakan pengalaman pengguna terbaik dan fitur-fitur yang membantu merchant berkembang.",
    date: "5 November 2024",
    readTime: "9 menit",
    image: coffeeShop2,
    tags: ["Dashboard", "Analytics", "Tutorial", "Tips"],
    content: `
## Mengenal Dashboard TecnoQris

Dashboard TecnoQris dirancang untuk memberikan visibilitas penuh atas aktivitas pembayaran bisnis Anda. Lebih dari sekadar melihat transaksi, dashboard ini menyediakan tools analisis yang dapat membantu Anda membuat keputusan bisnis yang lebih baik.

## Fitur Utama Dashboard

### 1. Overview Transaksi

Halaman utama menampilkan ringkasan performa bisnis Anda:
- Total transaksi hari ini
- Perbandingan dengan kemarin/minggu lalu
- Volume transaksi dalam periode tertentu
- Trend grafik harian/mingguan/bulanan

### 2. Detail Transaksi

Lihat setiap transaksi secara detail:
- Tanggal dan waktu
- Nominal
- Metode pembayaran (e-wallet mana yang digunakan)
- Status (sukses/pending/gagal)
- Reference ID

### 3. Laporan dan Ekspor

Generate laporan untuk berbagai keperluan:
- Laporan harian untuk rekonsiliasi kasir
- Laporan bulanan untuk pembukuan
- Laporan tahunan untuk pajak
- Ekspor ke Excel atau PDF

### 4. Pengaturan QRIS

Kelola QR Code Anda:
- Generate QRIS dinamis
- Unduh QRIS statis
- Atur notifikasi
- Kelola akses pengguna

## Tips Mengoptimalkan Penggunaan Dashboard

### Tip 1: Rutinkan Pengecekan Harian

Luangkan 5-10 menit setiap pagi untuk mengecek:
- Transaksi hari sebelumnya
- Apakah ada transaksi yang gagal
- Total pendapatan

Ini membantu Anda mendeteksi masalah lebih awal dan memahami pola bisnis.

### Tip 2: Gunakan Filter dengan Efektif

Dashboard TecnoQris memiliki berbagai filter:
- **Periode waktu**: Hari ini, 7 hari, 30 hari, custom
- **Status**: Sukses, pending, gagal
- **Metode pembayaran**: GoPay, OVO, DANA, dll
- **Nominal**: Range tertentu

Kombinasikan filter untuk mendapat insight spesifik.

### Tip 3: Analisis Metode Pembayaran Populer

Lihat breakdown pembayaran berdasarkan e-wallet:
- Mana yang paling sering digunakan pelanggan?
- Apakah ada tren perubahan preferensi?

Insight ini berguna untuk strategi marketing. Misalnya, jika mayoritas pelanggan menggunakan GoPay, Anda bisa fokus promo di platform tersebut.

### Tip 4: Identifikasi Jam Sibuk

Grafik transaksi per jam menunjukkan kapan bisnis Anda paling ramai:
- Optimalkan staf di jam sibuk
- Atur promosi di jam sepi untuk meningkatkan traffic
- Persiapkan stok lebih di jam peak

### Tip 5: Monitor Transaksi Gagal

Transaksi gagal bisa menunjukkan masalah:
- Jika banyak gagal dari satu e-wallet, mungkin ada masalah dari pihak mereka
- Jika gagal karena timeout, periksa koneksi internet Anda
- Jika gagal karena saldo tidak cukup, ini insight tentang daya beli pelanggan

### Tip 6: Set Up Notifikasi yang Tepat

Atur notifikasi sesuai kebutuhan:
- Notifikasi real-time untuk setiap transaksi sukses
- Notifikasi untuk transaksi di atas nominal tertentu
- Ringkasan harian via email

Jangan terlalu banyak notifikasi agar tidak mengganggu, tapi pastikan yang penting tidak terlewat.

### Tip 7: Ekspor untuk Analisis Lanjutan

Untuk analisis yang lebih dalam, ekspor data ke Excel:
- Buat pivot table untuk berbagai analisis
- Gabungkan dengan data penjualan dari sistem lain
- Buat visualisasi custom sesuai kebutuhan

### Tip 8: Manfaatkan Fitur Multi-User

Jika bisnis Anda memiliki beberapa outlet atau staf:
- Buat akun terpisah untuk setiap outlet/kasir
- Set permission yang sesuai (view only, full access)
- Monitor performa per outlet/kasir

### Tip 9: Rekonsiliasi dengan Settlement

Setiap hari, lakukan rekonsiliasi:
1. Total transaksi di dashboard
2. Dana yang masuk ke rekening (settlement)
3. Potongan MDR

Pastikan semua sesuai untuk deteksi dini jika ada discrepancy.

### Tip 10: Review Performa Bulanan

Luangkan waktu di awal bulan untuk review performa bulan sebelumnya:
- Pertumbuhan transaksi month-over-month
- Rata-rata nilai transaksi
- Trend yang perlu diperhatikan
- Insight untuk improvement

## Studi Kasus: Menggunakan Data untuk Keputusan Bisnis

### Kasus: Restoran XYZ

Restoran XYZ menganalisis data dashboard dan menemukan:
- 70% transaksi terjadi antara jam 12-14 dan 18-21
- Rata-rata nilai transaksi weekend 30% lebih tinggi dari weekday
- GoPay dan ShopeePay mendominasi (masing-masing 35%)

**Keputusan yang Diambil**:
1. Tambah staf di jam sibuk
2. Launch promo spesial weekday untuk meningkatkan traffic
3. Partner dengan Gojek untuk program loyalti

**Hasil**: Peningkatan revenue 25% dalam 3 bulan.

## Kesimpulan

Dashboard TecnoQris adalah tools powerful yang sering underutilized. Dengan meluangkan waktu untuk memahami dan memanfaatkan fitur-fiturnya, Anda dapat mendapatkan insight berharga untuk mengembangkan bisnis.

Ada pertanyaan tentang fitur dashboard? Hubungi tim support kami yang siap membantu 24/7.
    `
  }
];

const relatedPosts = (currentSlug: string, category: string) => {
  return blogPosts
    .filter(post => post.slug !== currentSlug)
    .filter(post => post.category === category || Math.random() > 0.5)
    .slice(0, 3);
};

export default function BlogDetailPage() {
  const params = useParams();
  const slug = params.slug;
  const [scrolled, setScrolled] = useState(false);
  const [copied, setCopied] = useState(false);

  const post = blogPosts.find(p => p.slug === slug);
  const related = post ? relatedPosts(post.slug, post.category) : [];

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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!post) {
    return (
      <div className="min-h-screen bg-[#020817] text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Artikel Tidak Ditemukan</h1>
          <p className="text-slate-400 mb-8">Maaf, artikel yang Anda cari tidak tersedia.</p>
          <Link href="/blog">
            <Button className="bg-white text-black hover:bg-slate-200 rounded-full">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali ke Blog
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const renderContent = (content: string) => {
    const lines = content.trim().split('\n');
    const elements: React.ReactElement[] = [];
    let currentList: string[] = [];
    let listType: 'ul' | 'ol' | null = null;
    let inTable = false;
    let tableRows: string[][] = [];

    const formatText = (text: string): string => {
      return text
        .replace(/\*\*(.+?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
        .replace(/\*(.+?)\*/g, '<em>$1</em>');
    };

    const flushList = () => {
      if (currentList.length > 0) {
        if (listType === 'ul') {
          elements.push(
            <ul key={elements.length} className="list-disc list-inside space-y-2 text-slate-300 mb-6 pl-4">
              {currentList.map((item, i) => <li key={i} dangerouslySetInnerHTML={{ __html: formatText(item) }} />)}
            </ul>
          );
        } else {
          elements.push(
            <ol key={elements.length} className="list-decimal list-inside space-y-2 text-slate-300 mb-6 pl-4">
              {currentList.map((item, i) => <li key={i} dangerouslySetInnerHTML={{ __html: formatText(item) }} />)}
            </ol>
          );
        }
        currentList = [];
        listType = null;
      }
    };

    const flushTable = () => {
      if (tableRows.length > 1) {
        elements.push(
          <div key={elements.length} className="overflow-x-auto mb-6">
            <table className="w-full text-sm text-left border border-white/10 rounded-lg overflow-hidden">
              <thead className="bg-slate-800/50">
                <tr>
                  {tableRows[0].map((cell, i) => (
                    <th key={i} className="px-4 py-3 font-semibold text-white border-b border-white/10" dangerouslySetInnerHTML={{ __html: formatText(cell) }} />
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableRows.slice(2).map((row, i) => (
                  <tr key={i} className="border-b border-white/5 hover:bg-white/5">
                    {row.map((cell, j) => (
                      <td key={j} className="px-4 py-3 text-slate-300" dangerouslySetInnerHTML={{ __html: formatText(cell) }} />
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
        tableRows = [];
        inTable = false;
      }
    };

    lines.forEach((line, index) => {
      const trimmedLine = line.trim();

      if (trimmedLine.startsWith('|') && trimmedLine.endsWith('|')) {
        flushList();
        inTable = true;
        const cells = trimmedLine.split('|').filter(c => c.trim()).map(c => c.trim());
        if (!trimmedLine.includes('---')) {
          tableRows.push(cells);
        }
        return;
      } else if (inTable) {
        flushTable();
      }

      if (trimmedLine.startsWith('## ')) {
        flushList();
        elements.push(
          <h2 key={index} className="text-2xl font-bold text-white mt-10 mb-4">
            {trimmedLine.replace('## ', '')}
          </h2>
        );
      } else if (trimmedLine.startsWith('### ')) {
        flushList();
        elements.push(
          <h3 key={index} className="text-xl font-bold text-white mt-8 mb-3">
            {trimmedLine.replace('### ', '')}
          </h3>
        );
      } else if (trimmedLine.startsWith('- ') || trimmedLine.startsWith('* ')) {
        if (listType !== 'ul') {
          flushList();
          listType = 'ul';
        }
        currentList.push(trimmedLine.replace(/^[-*] /, ''));
      } else if (/^\d+\. /.test(trimmedLine)) {
        if (listType !== 'ol') {
          flushList();
          listType = 'ol';
        }
        currentList.push(trimmedLine.replace(/^\d+\. /, ''));
      } else if (trimmedLine.startsWith('**') && trimmedLine.endsWith('**')) {
        flushList();
        elements.push(
          <p key={index} className="font-semibold text-white mb-2">
            {trimmedLine.replace(/\*\*/g, '')}
          </p>
        );
      } else if (trimmedLine === '') {
        flushList();
      } else {
        flushList();
        elements.push(
          <p key={index} className="text-slate-300 leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: formatText(trimmedLine) }} />
        );
      }
    });

    flushList();
    flushTable();

    return elements;
  };

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

      <article className="pt-28">
        <div className="relative h-[400px] md:h-[500px] overflow-hidden">
          <img 
            src={post.image} 
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#020817] via-[#020817]/70 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
            <div className="container mx-auto max-w-4xl">
              <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors mb-4">
                <ArrowLeft className="w-4 h-4" />
                Kembali ke Blog
              </Link>
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-sm font-medium rounded-full">{post.category}</span>
                <span className="text-slate-400 text-sm flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {post.date}
                </span>
                <span className="text-slate-400 text-sm flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {post.readTime}
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl font-display font-bold leading-tight">{post.title}</h1>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-6 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-8 mb-12 pb-8 border-b border-white/10">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                  {post.author.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>
                <div>
                  <p className="font-semibold">{post.author}</p>
                  <p className="text-sm text-slate-400">{post.authorRole}</p>
                </div>
              </div>
              
              <div className="md:ml-auto flex items-center gap-3">
                <span className="text-sm text-slate-400 mr-2">Bagikan:</span>
                <button onClick={showSocialMediaWarning} className="w-10 h-10 rounded-lg bg-white/5 hover:bg-blue-500/20 hover:text-blue-400 flex items-center justify-center transition-colors" data-testid="share-twitter">
                  <Twitter className="w-5 h-5" />
                </button>
                <button onClick={showSocialMediaWarning} className="w-10 h-10 rounded-lg bg-white/5 hover:bg-blue-500/20 hover:text-blue-400 flex items-center justify-center transition-colors" data-testid="share-facebook">
                  <Facebook className="w-5 h-5" />
                </button>
                <button onClick={showSocialMediaWarning} className="w-10 h-10 rounded-lg bg-white/5 hover:bg-blue-500/20 hover:text-blue-400 flex items-center justify-center transition-colors" data-testid="share-linkedin">
                  <Linkedin className="w-5 h-5" />
                </button>
                <button onClick={handleCopyLink} className="w-10 h-10 rounded-lg bg-white/5 hover:bg-green-500/20 hover:text-green-400 flex items-center justify-center transition-colors" data-testid="button-copy-link">
                  {copied ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="prose prose-invert max-w-none">
              <p className="text-xl text-slate-300 leading-relaxed mb-8">{post.excerpt}</p>
              {renderContent(post.content)}
            </div>

            <div className="mt-12 pt-8 border-t border-white/10">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, index) => (
                  <span key={index} className="px-3 py-1 bg-slate-800 text-slate-300 text-sm rounded-full">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-12 p-6 bg-slate-900/50 border border-white/10 rounded-2xl">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-xl shrink-0">
                  {post.author.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>
                <div>
                  <p className="text-sm text-slate-400 mb-1">Ditulis oleh</p>
                  <p className="font-bold text-lg">{post.author}</p>
                  <p className="text-sm text-blue-400 mb-2">{post.authorRole}</p>
                  <p className="text-slate-400 text-sm">{post.authorBio}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="py-16 bg-slate-900/30">
          <div className="container mx-auto px-6">
            <ScrollReveal animation="fadeUp" className="mb-8">
              <h2 className="text-2xl font-bold">Artikel Terkait</h2>
            </ScrollReveal>
            
            <div className="grid md:grid-cols-3 gap-6">
              {related.map((relatedPost, index) => (
                <ScrollReveal key={relatedPost.id} animation="fadeUp" delay={index * 0.1}>
                  <Link href={`/blog/${relatedPost.slug}`}>
                    <article className="group bg-gradient-to-br from-slate-900 to-slate-950 border border-white/10 rounded-2xl overflow-hidden hover:border-blue-500/30 transition-all cursor-pointer h-full" data-testid={`card-related-${relatedPost.id}`}>
                      <div className="h-40 relative overflow-hidden">
                        <img 
                          src={relatedPost.image} 
                          alt={relatedPost.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent"></div>
                      </div>
                      <div className="p-5">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 text-xs font-medium rounded-full">{relatedPost.category}</span>
                          <span className="text-slate-500 text-xs">{relatedPost.readTime}</span>
                        </div>
                        <h3 className="font-bold mb-2 group-hover:text-blue-400 transition-colors line-clamp-2">{relatedPost.title}</h3>
                        <p className="text-sm text-slate-400 line-clamp-2">{relatedPost.excerpt}</p>
                      </div>
                    </article>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-16 px-6">
        <ScrollReveal animation="fadeUp" className="container mx-auto max-w-4xl">
          <div className="bg-gradient-to-br from-blue-900/30 to-slate-900 border border-blue-500/20 rounded-3xl p-8 md:p-12 text-center">
            <BookOpen className="w-12 h-12 text-blue-400 mx-auto mb-4" />
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ingin Baca Lebih Banyak?</h2>
            <p className="text-slate-400 mb-6 max-w-xl mx-auto">
              Jelajahi artikel lainnya tentang pembayaran digital, tips bisnis, dan panduan teknis dari tim TecnoQris.
            </p>
            <Link href="/blog">
              <Button className="bg-white text-black hover:bg-slate-200 rounded-full px-8 font-semibold" data-testid="button-all-articles">
                Lihat Semua Artikel
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
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
