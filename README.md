**🎮 Peternak Domba - Platform Database Game**

**Nama: Andryano Shevchenko Limbong
GitHub: @cengkooo
NIM: 123140205
Kelas: Pemrograman Aplikasi Website RA**

Aplikasi web modern dan minimalis untuk menemukan dan menjelajahi video game, didukung oleh RAWG Video Games Database API. Dibangun dengan React, Redux, dan styled-components dengan desain estetika hitam & putih yang elegan.
📋 Daftar Isi

✨ Fitur
🔍 Penemuan Game Lanjutan

Pencarian Cerdas: Pencarian game real-time dengan hasil instan
Sistem Multi-Filter: Filter game berdasarkan:

Platform (PC, PlayStation, Xbox, Nintendo Switch, dll.)
Genre (Action, Adventure, RPG, Strategy, dll.)
Tanggal Rilis (Terbaru, Terlama)
Rating (Tertinggi ke terendah, Terendah ke tertinggi)
Urutan alfabetis (A-Z, Z-A)


Tampilan Filter Aktif: Umpan balik visual menampilkan semua filter yang aktif
Hapus dengan Satu Klik: Fungsi reset filter cepat

🎯 Informasi Game

Halaman Detail Game: Informasi komprehensif meliputi:

Screenshot dan gambar berkualitas tinggi
Tanggal rilis dan platform
Informasi developer dan publisher
Klasifikasi genre
Rating pengguna dan jumlah review
Deskripsi game lengkap


Tab Berbasis Genre: Jelajahi game yang diorganisir berdasarkan genre populer
Rating Bintang: Sistem rating visual untuk penilaian cepat

🎨 Pengalaman Pengguna

Desain Minimalis: Estetika hitam & putih yang bersih
Layout Responsif: Dioptimalkan penuh untuk desktop, tablet, dan mobile
Animasi Halus: Transisi dan efek hover yang dipoles
Navigasi Breadcrumb: Pelacakan navigasi yang mudah
Pagination: Penelusuran efisien melalui katalog game yang besar
Loading States: Umpan balik yang jelas selama pengambilan data
Penanganan Error: Pesan error yang elegan dengan opsi retry

📱 Desain Mobile-First

Navigasi sidebar yang dapat dilipat
Filter yang dioptimalkan untuk sentuhan
Layout grid responsif
Pemuatan gambar yang dioptimalkan

🛠 Teknologi yang Digunakan
Framework Frontend

React 18.2.0 - Library UI modern dengan hooks
React Router DOM 6.15.0 - Routing sisi klien
React Redux 8.1.2 - Integrasi manajemen state
Redux Toolkit 1.9.5 - Pengembangan Redux yang disederhanakan

Styling & UI

Styled Components 6.0.7 - Solusi styling CSS-in-JS
SASS 1.65.1 - Preprocessing CSS
React Icons 4.10.1 - Library ikon
React Tabs 6.0.2 - Komponen tab yang accessible

API & Data Fetching

Axios 1.4.0 - HTTP client untuk request API
RAWG.io API - Database video game

Development Tools

Vite 4.4.5 - Frontend tooling generasi berikutnya
ESLint 8.45.0 - Code linting
@vitejs/plugin-react 4.0.3 - Plugin React untuk Vite

📦 Instalasi
Prasyarat

Node.js (v14.18.0 atau lebih tinggi)
npm (v8.0.0 atau lebih tinggi)

Langkah-Langkah Setup

1. Clone repository
   
```
bashgit clone https://github.com/cengkooo/peternak-domba.git
cd peternak-domba
```

Konfigurasi API Key

```
Buka src/api/api_key.js
RAWG API key sudah termasuk: b7aa4ec2db5b4786ae71522bcceaa596
(Opsional) Dapatkan key Anda sendiri di RAWG API
```

2. Instalasi Dependensi

Jalankan perintah berikut untuk menginstal seluruh dependensi proyek:

```
npm install
# atau
bun install
```

3. Menjalankan dalam Mode Pengembangan

Setelah instalasi selesai, jalankan proyek dengan perintah:

```
npm run dev
```

4. Kemudian buka alamat yang muncul di terminal 

```
(http://localhost:5173)
```


<img width="1480" height="3986" alt="image" src="https://github.com/user-attachments/assets/a080ff8c-fb86-4642-9042-e4ab491deeaa" />



untuk melihat aplikasi berjalan di browser.

Kriteria Penilaian
CPMK0501: Tabel, Form, CSS - 45 poin
Aspek	Bobot	Kriteria
1. Form Implementation	12	Form dengan minimal 5 input berbeda, validation menggunakan HTML5 attributes, form submission handling dengan state management
2. Table Implementation	12	Tabel data dinamis dengan minimal 3 kolom, data dari API, formatting yang baik
3. CSS Styling	21	Minimal 3 jenis selector, kombinasi selector, pseudo-classes, responsive design dengan media queries, Flexbox atau CSS Grid

CPMK0502: HTML, JavaScript, ReactJS - 55 poin
Aspek	Bobot	Kriteria
1. HTML5 Structure	5	DOCTYPE HTML5, semantic tags, meta tags lengkap, accessibility attributes
2. Modern JavaScript	20	Arrow functions, template literals, destructuring, spread operators, array methods, async await
3. React Implementation	20	Functional components, useState dan useEffect, props passing, conditional rendering, event handling, minimal 4 components
4. API Integration	10	Fetch data dari API, loading state, error handling, data transformation

Bonus: Deployment dan Documentation - 10 poin
Aspek	Bobot	Kriteria
1. GitHub Repository	4	Repository public, struktur folder baik, minimal 10 commits dengan message jelas
2. README Documentation	2	README lengkap dengan nama, NIM, deskripsi, cara instalasi, link deployment, screenshot
3. Vercel Deployment	4	Aplikasi berhasil di-deploy dan berfungsi dengan baik

👨‍💻 Author
Andryano Shevchenko Limbong 🐑

**GitHub: @cengkooo
NIM: 123140205
Kelas: Pemrograman Aplikasi Website RA
Institution: Institut Teknologi Sumatera**
