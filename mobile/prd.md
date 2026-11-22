# Product Requirements Document (PRD)
## Aplikasi Pemantauan Tahfidz Al-Qur'an — ICBS (Insan Cendekia Boarding School)

**Versi:** 1.1 (Updated — Glassmorphism UI, Student Credit Card, & Dormitory Integration)  
**Target Platform:** Android & iOS (React Native / Expo) untuk Muhaffiz & Wali Murid | Web Dashboard (React) untuk Admin  
**Tech Stack Backend:** Custom Backend (Node.js/TypeScript + Express/NestJS) + Prisma ORM + MySQL  

---

## 1. Ringkasan Produk & Tujuan
Aplikasi Tahfidz ICBS adalah platform pemantauan perkembangan hafalan Al-Qur'an santri secara transparan, modern, dan terstruktur. Aplikasi ini menjembatani **Muhaffiz** (pencatat setoran di lapangan dengan dukungan *offline-first*), **Wali Murid** (pemantau progres anak secara *read-only*), dan **Admin ICBS** (pengelola data master, asrama, import massal, dan migrasi halaqah).

---

## 2. Identitas Visual & Pedoman Desain (UI/UX)
* **Branding Logo:** Menggunakan logo resmi **ICBS (Insan Cendekia Boarding School)** pada *header* aplikasi mobile, *sidebar* Web Dashboard Admin, *splash screen*, dan kop surat Rapor PDF[cite: 1].
* **Tema Utama — Glassmorphism:** Menggunakan *ambient mesh gradient* lembut dan panel kaca transparan (*frosted glass* dengan *backdrop blur* dan border semi-transparan).
* **Palet Warna (Ekstraksi dari Logo ICBS):**
  * **Primary Emerald Green (`#059669` / `#009B55`):** Aksi utama, status positif/online, dan aksen islami[cite: 1].
  * **Royal Blue (`#1D4ED8` / `#2563EB`):** Aksen sekunder, informasi akademik, dan navigasi[cite: 1].
  * **Golden Yellow (`#F59E0B` / `#FACC15`):** Aksen premium, *highlight* capaian Juz, EMV Chip kartu santri, dan status *pending sync*[cite: 1].
* **Komponen Ikonik — Kartu Santri Bergaya Credit Card (`StudentCreditCard`):**
  * **Sisi Depan:** Menampilkan *Gold EMV Chip*, ikon *Contactless/NFC*, logo ICBS, nomor NIS terformat 4 digit (contoh: `2026  0108  0042`), Nama Santri, Kelas, **Nama Asrama**, dan badge **Total Juz**.
  * **Sisi Belakang (Animasi Flip):** Menampilkan informasi lengkap Muhaffiz aktif, nama Wali Murid, status santri aktif, dan QR Code ID Santri.

---

## 3. Prioritas Fitur MVP

### A. Wajib (Must-Have — Maksimal 5 Fitur)
1. **Manajemen Data Master (termasuk Asrama), Import Excel/CSV & Migrasi Muhaffiz (Web Admin)**
   * *Alasan:* Menjaga privasi data santri (akun dibuat tertutup oleh Admin), mempercepat input ratusan data awal beserta penempatan asrama via Excel/CSV, serta mengakomodasi perpindahan halaqah santri tanpa kehilangan histori hafalan.
2. **Input Setoran Offline-First: Ziyadah, Muraja'ah, & Tasmi' (Mobile Muhaffiz)**
   * *Alasan:* Aktivitas halaqah berlangsung di masjid/asrama yang sering minim sinyal. Muhaffiz harus bisa menginput nilai (0–100) dan catatan tajwid kapan saja dengan sinkronisasi otomatis saat online.
3. **Dashboard Pemantauan Hafalan Read-Only & Kartu Santri Digital (Mobile Wali Murid)**
   * *Alasan:* Tujuan utama aplikasi agar orang tua dapat melihat identitas santri (Kartu Credit Card + Info Asrama), grafik capaian juz, rata-rata nilai, dan riwayat setoran harian anak secara jelas.
4. **Push Notification Real-Time Tiap Setoran**
   * *Alasan:* Memberikan ketenangan dan keterlibatan langsung bagi Wali Murid setiap kali anak menyelesaikan setoran (atau segera setelah data offline tersinkronisasi).
5. **Generate & Unduh Rapor Tahfidz PDF**
   * *Alasan:* Menyediakan bukti laporan resmi bulanan/semester (lengkap dengan kop logo ICBS dan data Asrama santri) yang rapi dan siap cetak/arsip bagi Wali Murid.

### B. Bagus Kalau Ada (Nice-to-Have — Fase 2)
* **Dukungan Multi-Santri dalam Satu Akun Wali Murid:** Memudahkan orang tua yang memiliki lebih dari satu anak di ICBS agar tidak perlu gonta-ganti akun.
* **Dashboard Analitik Pimpinan ICBS:** Statistik capaian hafalan per angkatan, **per asrama**, dan identifikasi santri yang tertinggal target.
* **Target Hafalan Personal:** Indikator persentase ketercapaian terhadap target semester ICBS.

### C. Nanti Dulu (Out of Scope / Fase 3)
* **Fitur Chat / Komentar Wali Murid & Muhaffiz:** Sengaja dihindari di MVP agar tidak membebani Muhaffiz di luar jam halaqah.
* **Integrasi API SIAKAD ICBS:** Aplikasi berjalan *standalone* dulu untuk mempercepat waktu rilis.
* **Rekaman Audio Setoran:** Membutuhkan biaya *storage* dan *bandwidth* besar yang belum krusial di tahap MVP.

---

## 4. Alur Pengguna (User Flow)

### A. Admin (Web Dashboard)
1. Login ke Web Dashboard menggunakan akun Super Admin.
2. Download template Excel/CSV -> Isi data Santri (termasuk **Asrama** & Kelas), Muhaffiz, dan Wali Murid -> Upload untuk import massal.
3. Sistem otomatis membuat akun login (username/no. HP + password default) yang bisa diekspor untuk dibagikan ke Wali Murid & Muhaffiz.
4. Membentuk kelompok Halaqah dan menempatkan Santri ke Muhaffiz terkait (dapat difilter berdasarkan **Asrama**).
5. *(Jika ada pergantian semester)* Membuka menu **Migrasi Halaqah**, memilih Santri, lalu memindahkannya ke Muhaffiz baru. Riwayat hafalan dan data asrama otomatis tetap melekat.

### B. Muhaffiz (React Native — Android & iOS)
1. Login ke aplikasi -> Wajib ganti password default saat pertama kali masuk.
2. Aplikasi otomatis mengunduh daftar santri binaan (termasuk info Kelas & Asrama) ke penyimpanan lokal (`expo-sqlite`) agar siap dipakai offline.
3. Saat halaqah, Muhaffiz membuka profil Santri -> Klik **+ Tambah Setoran**.
4. Pilih jenis setoran (**Ziyadah / Muraja'ah / Tasmi'**), masukkan Juz (1–30), Surah, Ayat/Halaman, **Nilai (0–100)**, dan catatan tajwid -> Klik **Simpan**.
5. **Jika Offline:** Data tersimpan di antrean lokal dengan `client_uuid` dan status *"Menunggu Sinyal"*. Begitu HP mendapat koneksi internet, *background sync* mengirim data ke server MySQL dan status berubah menjadi *"Tersinkron"*.

### C. Wali Murid (React Native — Android & iOS)
1. Login menggunakan akun yang diberikan Admin -> Wajib ganti password default.
2. Masuk ke **Beranda**: melihat **Kartu Santri bergaya Credit Card** (dapat dibalik untuk detail Muhaffiz & QR ID), info Asrama, total juz hafalan, grafik tren nilai, dan 5 setoran terakhir.
3. Menerima *Push Notification* saat anak selesai menyetor -> Klik notifikasi untuk langsung melihat detail nilai dan catatan Muhaffiz.
4. Membuka tab **Rapor**, memilih periode (Bulanan/Semester) -> Klik **Unduh PDF** untuk menyimpan dokumen rapor resmi ICBS ke HP.

---

## 5. Daftar Halaman & Komponen Utama

### A. Web Dashboard (Admin)
| Halaman | Isi & Fungsionalitas |
| :--- | :--- |
| **Login** | Form email/username & password dengan desain Glassmorphism & logo ICBS. |
| **Dashboard Ringkasan** | Total Santri, Total Muhaffiz, Total Asrama, Total Setoran hari ini, status sinkronisasi. |
| **Manajemen Pengguna** | CRUD data Muhaffiz & Wali Murid, tombol Reset Password, Import Excel/CSV. |
| **Manajemen Santri & Halaqah** | CRUD Santri (NIS, Kelas, **Asrama**), **Filter berdasarkan Asrama**, pemetaan Santri-Wali Murid (1:1 di MVP), fitur **Migrasi Muhaffiz** (satuan/massal). |
| **Monitoring Setoran** | Tabel log seluruh setoran (menampilkan nama santri, asrama, jenis, nilai, muhaffiz) + izin koreksi data jika lewat 24 jam. |

### B. Aplikasi Mobile (React Native / Expo)
| Role | Halaman | Isi & Fungsionalitas |
| :--- | :--- | :--- |
| **Umum** | **Login & Ganti Password** | Autentikasi JWT + paksa ganti password di login pertama. |
| **Muhaffiz** | **Daftar Santri Halaqah** | List santri binaan dengan badge **Asrama** & Kelas, indikator status koneksi (Online/Offline), badge jumlah antrean sync. |
| **Muhaffiz** | **Detail Santri** | Ringkasan profil & Asrama, posisi hafalan terakhir, histori setoran lengkap (termasuk dari Muhaffiz sebelumnya), tombol `+ Setoran`. |
| **Muhaffiz** | **Form Input Setoran** | Pilihan (Ziyadah/Muraja'ah/Tasmi'), input Juz/Surah/Ayat/Halaman, input angka 0–100, textarea catatan. |
| **Wali Murid** | **Beranda (Dashboard)** | **`StudentCreditCard`** (interaktif bisa dibalik, menampilkan NIS, Asrama, Total Juz), grafik tren nilai, 5 setoran terakhir. |
| **Wali Murid** | **Riwayat Setoran** | Daftar lengkap setoran dengan filter (Ziyadah/Muraja'ah/Tasmi' & rentang tanggal). |
| **Wali Murid** | **Rapor PDF** | Pilihan periode rapor, preview ringkas (kop ICBS + data Asrama), tombol **Unduh PDF**. |
| **Wali Murid** | **Profil & Pengaturan** | Info akun, ubah password, toggle notifikasi, tombol Logout. |

---

## 6. Rancangan Database (Prisma ORM + MySQL)

### Daftar Tabel & Kolom Utama

1. **`users`** (Menyimpan semua akun: Admin, Muhaffiz, Wali Murid)
   * `id` (INT, PK, Auto Increment)
   * `username` (VARCHAR, Unique — NIP/No. HP/Email)
   * `password_hash` (VARCHAR)
   * `full_name` (VARCHAR)
   * `role` (ENUM: `ADMIN`, `MUHAFFIZ`, `WALI_MURID`)
   * `fcm_token` (VARCHAR, Nullable — untuk Push Notification)
   * `must_change_password` (BOOLEAN, Default: `true`)
   * `is_active` (BOOLEAN, Default: `true`)
   * `created_at`, `updated_at` (DATETIME)

2. **`students`** (Data Santri)
   * `id` (INT, PK, Auto Increment)
   * `nis` (VARCHAR, Unique)
   * `full_name` (VARCHAR)
   * `class_name` (VARCHAR — misal: `"8A"`, `"10 IPA 1"`)
   * `dormitory` (VARCHAR — **Data Asrama**, misal: `"Asrama Umar bin Khattab"`, `"Asrama Abu Bakar"`)
   * `wali_id` (INT, FK -> `users.id`, Unique di MVP untuk aturan 1 akun 1 santri)
   * `current_muhaffiz_id` (INT, FK -> `users.id`, Nullable)
   * `total_juz` (DECIMAL(4,2), Default: 0 — cache performa)
   * `created_at`, `updated_at` (DATETIME)

3. **`halaqah_migrations`** (Jejak Audit Perpindahan Muhaffiz)
   * `id` (INT, PK, Auto Increment)
   * `student_id` (INT, FK -> `students.id`)
   * `from_muhaffiz_id` (INT, FK -> `users.id`, Nullable)
   * `to_muhaffiz_id` (INT, FK -> `users.id`)
   * `migrated_by_admin_id` (INT, FK -> `users.id`)
   * `migrated_at` (DATETIME, Default: `now()`)
   * `reason` (VARCHAR, Nullable)

4. **`memorization_logs`** (Data Setoran Hafalan)
   * `id` (INT, PK, Auto Increment)
   * `client_uuid` (CHAR(36), Unique — **Kunci Idempotensi Offline Sync**)
   * `student_id` (INT, FK -> `students.id`)
   * `muhaffiz_id` (INT, FK -> `users.id` — Muhaffiz penyimak saat itu)
   * `type` (ENUM: `ZIYADAH`, `MURAJAAH`, `TASMI`)
   * `juz` (TINYINT — 1 s/d 30)
   * `surah_name` (VARCHAR)
   * `ayah_start` (SMALLINT)
   * `ayah_end` (SMALLINT)
   * `page_number` (SMALLINT, Nullable)
   * `score` (TINYINT — Validasi 0 s/d 100)
   * `notes` (TEXT, Nullable — catatan tajwid/kelancaran)
   * `recorded_at` (DATETIME — waktu aktual setoran di HP Muhaffiz)
   * `synced_at` (DATETIME, Default: `now()` — waktu masuk ke server)
   * `deleted_at` (DATETIME, Nullable — *soft delete*)

### Ringkasan Relasi
* `users (Wali Murid)` **1 — 1** `students` *(siap di-upgrade ke 1 — N di Fase 2 dengan melepas constraint `Unique` pada `wali_id`)*.
* `users (Muhaffiz)` **1 — N** `students` (melalui `current_muhaffiz_id`).
* `students` **1 — N** `memorization_logs` *(histori selalu melekat pada santri meski Muhaffiz berganti)*.
* `students` **1 — N** `halaqah_migrations`.

---

## 7. Penanganan Edge Cases, Keamanan & Arsitektur Teknis
* **Anti-Duplikasi Offline Sync (Idempotency):** Setiap setoran lokal wajib membawa `client_uuid` (UUID v4). Backend melakukan `upsert` berbasis `client_uuid` agar sinyal putus-nyambung tidak menciptakan data ganda di MySQL.
* **Konflik Migrasi Muhaffiz saat Offline:** Server tetap menerima setoran offline dari Muhaffiz lama jika `recorded_at` lebih lama dari `migrated_at`, dan menyimpannya dengan `muhaffiz_id` lama sebagai arsip historis yang valid.
* **Batas Waktu Edit Setoran:** Muhaffiz hanya dapat mengedit/menghapus setoran maksimal **24 jam** setelah `recorded_at`. Perubahan di atas 24 jam hanya bisa dilakukan oleh Admin Web Dashboard.
* **Notification Queue:** Pengiriman *Push Notification* (Expo Push / FCM) diproses via antrean (*message queue*) dan menampilkan waktu aktual setoran (`recorded_at`) untuk mencegah *notification flood* saat sync massal.
* **Keamanan & Anti-IDOR:** Autentikasi JWT (`Access Token` + `Refresh Token` di `expo-secure-store`), password di-hash dengan `bcrypt`/`argon2`, wajib ganti password di login pertama, dan validasi ketat di API agar Wali Murid hanya bisa mengakses data `student.wali_id === req.user.id`.
* **Struktur Monorepo (Untuk Build di Antigravity):**
  * `/backend`: Node.js + TypeScript + Express + Prisma ORM + MySQL.
  * `/web-admin`: Vite + React + Tailwind CSS (Glassmorphism UI).
  * `/mobile`: React Native (Expo) + TypeScript + NativeWind + `expo-sqlite`.