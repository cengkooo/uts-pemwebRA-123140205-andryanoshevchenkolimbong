**🎮 Peternak Domba - Platform Database Game**

**GitHub: @cengkooo
NIM: 123140205
Kelas: Pemrograman Aplikasi Website RA**

Aplikasi web modern dan minimalis untuk menemukan dan menjelajahi video game, didukung oleh RAWG Video Games Database API. Dibangun dengan React, Redux, dan styled-components dengan desain estetika hitam & putih yang elegan.
📋 Daftar Isi

Fitur
Teknologi yang Digunakan
Instalasi
Struktur Proyek
Konfigurasi Environment
Skrip yang Tersedia
Integrasi API
Komponen Utama
Manajemen State
Arsitektur Styling
Kesesuaian Rubrik
Author

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

Clone repository

bashgit clone https://github.com/cengkooo/peternak-domba.git
cd peternak-domba

Install dependencies

bashnpm install

Konfigurasi API Key

Buka src/api/api_key.js
RAWG API key sudah termasuk: b7aa4ec2db5b4786ae71522bcceaa596
(Opsional) Dapatkan key Anda sendiri di RAWG API


Jalankan development server

bashnpm run dev
```

<img width="1480" height="3986" alt="image" src="https://github.com/user-attachments/assets/c2b19dbe-95b4-4bbe-8fd1-0bfb75174eec" />


🔧 Konfigurasi Environment
Konfigurasi API
RAWG API key dikonfigurasi di src/api/api_key.js:
javascriptexport const API_KEY = "b7aa4ec2db5b4786ae71522bcceaa596";
Konfigurasi Base URL
API base URL diatur di src/api/axios.js:
javascriptimport axios from 'axios';

export default axios.create({
    baseURL: "https://api.rawg.io/api/"
});
📜 Skrip yang Tersedia
bash# Jalankan development server
npm run dev

# Build untuk produksi
npm run build

# Preview production build
npm run preview

# Jalankan ESLint
npm run lint
🔌 Integrasi API
Endpoint RAWG API yang Digunakan
javascript// Games
GET /games                    // Daftar game
GET /games/:id               // Detail game
GET /games/:id/screenshots   // Screenshot game

// Genres
GET /genres                  // Daftar genre

// Query Parameters
?key={API_KEY}              // Autentikasi
?page={number}              // Pagination
?page_size={number}         // Hasil per halaman
?search={query}             // Pencarian game
?platforms={ids}            // Filter berdasarkan platform
?genres={id}                // Filter berdasarkan genre
?ordering={field}           // Sort hasil
Contoh API Calls
javascript// Fetch games dengan filter
fetchAsyncGames({
  page: 1,
  search: "zelda",
  platforms: "4,187",  // PC, PS5
  genres: "4",         // Action
  ordering: "-rating"  // Rating tertinggi dulu
})

// Fetch detail game
fetchAsyncGameDetails(gameId)

// Fetch screenshot game
fetchAsyncGameScreenshots(gameId)
🧩 Komponen Utama
HomePage (src/views/home/HomePage.jsx)

Hero Banner: Section landing yang menarik perhatian
Search Bar: Fungsionalitas pencarian yang prominent
Featured Games: Showcase game dengan rating tertinggi
Genre Tabs: Penelusuran interaktif berbasis genre
Panel Filter: Filter platform dan sort
Tampilan Filter Aktif: Umpan balik visual dari filter yang diterapkan

GameAllPage (src/views/game/GameAllPage.jsx)

Filter Lanjutan: Filtering multi-dimensi

Checkbox platform
Dropdown genre
Opsi sort


Integrasi Pencarian: Pencarian berbasis keyword
Grid Game: Layout card responsif
Pagination: Navigasi melalui hasil
Loading States: Umpan balik pengguna yang halus

GameDetailsPage (src/views/game/GameDetailsPage.jsx)

Navigasi Breadcrumb: Kesadaran konteks
Galeri Gambar: Screenshot berkualitas tinggi
Informasi Detail: Data game yang komprehensif
Interface Tab: Section konten yang terorganisir
Tampilan Platform: Platform yang tersedia

Komponen Filter
PlatformFilter
jsx// Penggunaan
<PlatformFilter 
  selectedPlatforms={[4, 187]}
  onPlatformChange={(platforms) => handleChange(platforms)}
/>
GenreFilter
jsx// Penggunaan
<GenreFilter 
  genres={genresList}
  selectedGenre="4"
  onGenreChange={(genreId) => handleChange(genreId)}
/>
SortFilter
jsx// Penggunaan
<SortFilter 
  selectedSort="-rating"
  onSortChange={(sort) => handleChange(sort)}
/>
🗄 Manajemen State
Struktur Redux Store
javascript{
  game: {
    games: [],              // Daftar game
    gamesStatus: 'IDLE',   // Status loading
    gamesError: null,      // State error
    gamesSingle: {},       // Game terpilih
    gamesSingleStatus: 'IDLE',
    screenshots: []        // Screenshot game
  },
  genre: {
    genres: [],            // Daftar genre
    genresStatus: 'IDLE'  // Status loading
  },
  sidebar: {
    sidebarStatus: false   // State menu mobile
  }
}
Redux Slices
gameSlice
javascript// Actions
fetchAsyncGames(params)      // Fetch game dengan filter
fetchAsyncGameDetails(id)    // Fetch game tunggal
fetchAsyncGameScreenshots(id) // Fetch screenshot
clearGamesError()            // Hapus state error

// Selectors
selectAllGames()
selectAllGamesStatus()
selectGamesError()
selectSingleGame()
selectGameScreenshots()
genreSlice
javascript// Actions
fetchAsyncGenres(params)     // Fetch genre

// Selectors
selectAllGenres()
selectAllGenresStatus()
sidebarSlice
javascript// Actions
setSidebarOn()               // Buka menu mobile
setSidebarOff()              // Tutup menu mobile

// Selectors
selectSidebarStatus()
🎨 Arsitektur Styling
Sistem Desain
Palet Warna (Minimalis Hitam & Putih)
scss:root {
  // Warna Inti
  --clr-white: #FFFFFF;
  --clr-black: #000000;
  
  // Grayscale
  --clr-gray-darkest: #0A0A0A;
  --clr-gray-dark: #1A1A1A;
  --clr-gray-medium: #2D2D2D;
  --clr-gray-light: #404040;
  --clr-gray-lighter: #666666;
  --clr-gray-lightest: #999999;
  
  // Accent
  --clr-accent: #F5F5F5;
}
Tipografi
scss// Font
--font-family-primary: 'Inter', sans-serif;
--font-family-heading: 'Space Grotesk', sans-serif;

// Bobot Font
.fw-4 { font-weight: 400; }  // Regular
.fw-5 { font-weight: 500; }  // Medium
.fw-6 { font-weight: 600; }  // Semi-bold
.fw-7 { font-weight: 700; }  // Bold
Transisi
scss--transition-fast: all 200ms cubic-bezier(0.4, 0, 0.2, 1);
--transition-default: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
Pola Styled Components
javascript// Contoh styling komponen
const GameItemWrapper = styled.div`
  background-color: var(--clr-gray-dark);
  border: 1px solid var(--clr-gray-medium);
  transition: var(--transition-default);
  
  &:hover {
    border-color: var(--clr-gray-light);
    transform: translateY(-4px);
  }
  
  @media screen and (max-width: 768px) {
    // Style mobile
  }
`;
Utility Classes
scss// Display
.d-flex { display: flex; }
.d-grid { display: grid; }
.d-none { display: none; }

// Flexbox
.align-items-center { align-items: center; }
.justify-content-between { justify-content: space-between; }

// Tipografi
.text-center { text-align: center; }
.text-uppercase { text-transform: uppercase; }
.text-white { color: var(--clr-white); }

// Spacing (4px, 8px, 16px, 24px, 48px)
.mt-3 { margin-top: 16px; }
.mb-4 { margin-bottom: 24px; }
.py-5 { padding: 48px 0; }

Kesesuaian Rubrik
CPMK0501: Form, Tabel, CSS
Form “Contact Us” memiliki >5 input berbeda dan validasi HTML5.
Tabel di halaman “Games” menampilkan kolom: Judul, Rating, Platform, dan Genre.
Menggunakan Tailwind CSS dengan variabel warna global dan sistem tema (dark/light).
Desain sepenuhnya responsif dan mobile-friendly.
CPMK0502: HTML, JavaScript, React
Struktur HTML5 semantik (header, main, section, footer).
Penggunaan modern JavaScript : arrow function, async/await, destructuring, template literal.
React Hooks: useState, useEffect, useParams, useNavigate.
Komponen terpisah per fungsi (reusable & maintainable).
Integrasi API eksternal (RAWG.io) dan rendering dinamis.
State lokal untuk pagination, filter, dan theme.
LocalStorage digunakan untuk menyimpan preferensi tema (dark/light).

👨‍💻 Author
Andryano Shevchenko Limbong 🐑

**GitHub: @cengkooo
NIM: 123140205
Kelas: Pemrograman Aplikasi Website RA
Institution: Institut Teknologi Sumatera**
