# Naskah Penjelasan Demo Video - KampusMarket

*Gunakan naskah atau poin-poin di bawah ini sebagai panduan saat merekam video demo aplikasi UAS Anda.*

---

## 1. Pembukaan
"Halo, perkenalkan nama saya [Nama Anda] dengan NIM [NIM Anda]. Pada kesempatan kali ini, saya akan mendemonstrasikan aplikasi *mobile* yang saya buat untuk memenuhi tugas UAS Pemrograman Mobile."

"Aplikasi yang saya kembangkan bernama **KampusMarket**. Aplikasi ini merupakan *marketplace* sederhana yang dirancang khusus untuk memenuhi kebutuhan mahasiswa di kampus. Aplikasi ini dibangun menggunakan *framework* React Native (Expo) dan menggunakan antarmuka dengan tema berwarna dominan *Pink* agar nyaman dipandang."

## 2. Demonstrasi Fitur Login & Validasi
*(Tampilkan layar Login)*
"Pertama-tama, kita berada di halaman Login/Daftar Akun. Di sini, saya menerapkan **validasi form lokal** sebelum data dikirim."
- "Jika saya mencoba mengirim form dengan email yang formatnya salah, atau password kurang dari 6 karakter, aplikasi akan memberikan peringatan merah."
- "Untuk simulasi login API, aplikasi ini terhubung dengan API publik dari **DummyJSON**. Saat form valid dan tombol ditekan, aplikasi akan melakukan *request* ke server DummyJSON untuk mendapatkan *Token Akses* (Access Token)."

*(Tekan Login hingga berhasil masuk)*
"Selain itu, saya juga telah mengimplementasikan fitur **Persistent Login** menggunakan `AsyncStorage`. Artinya, aplikasi akan 'mengingat' sesi login kita. Jika aplikasi di-*refresh* atau ditutup, kita tidak perlu login ulang lagi, melainkan langsung diarahkan ke Halaman Utama."

## 3. Demonstrasi Halaman Utama (Katalog Produk)
*(Tampilkan layar Home / Katalog)*
"Setelah berhasil login, kita masuk ke halaman utama yaitu **Katalog Produk**."
- **Integrasi API**: "Semua data produk yang tampil di sini tidak di-hardcode, melainkan **diambil langsung (fetch)** dari internet menggunakan API DummyJSON."
- **Filter Khusus**: "Mengingat ini adalah KampusMarket, saya memfilter *response* API secara khusus sehingga hanya produk yang relevan untuk mahasiswa yang ditampilkan, seperti Laptop, *Smartphone*, Kemeja, Sepatu, dan Aksesoris."
- **Konversi Mata Uang**: "Meskipun data asli dari DummyJSON menggunakan mata uang Dollar (USD), saya telah membuat logika otomatis untuk mengkonversi harga tersebut menjadi **Rupiah (IDR)** lengkap dengan format titiknya."

## 4. Demonstrasi Pencarian & Kategori
*(Lakukan scroll horizontal pada kategori)*
"Di bagian atas, terdapat komponen yang bisa dipakai berulang (reusable component), salah satunya adalah **Filter Kategori**."
- "Jika saya mengklik kategori 'laptops', daftar produk akan secara instan berubah menyaring hanya laptop saja."
*(Ketik sesuatu di kolom pencarian)*
- "Saya juga mengimplementasikan fitur **Pencarian (Search)**. Kita bisa mengetikkan kata kunci, dan daftar produk akan langsung menyesuaikan secara *real-time* tanpa membuat aplikasi menjadi *lemot*, berkat penggunaan `FlatList` yang efisien dalam me-render data dalam jumlah besar."

## 5. Demonstrasi Detail Produk & Keranjang Belanja
*(Klik salah satu produk)*
"Dari halaman utama, kita bisa masuk ke **Halaman Detail Produk**. Di sini ditampilkan gambar produk yang lebih besar, harga, kategori, dan deskripsi lengkap."

*(Klik tombol Tambah ke Keranjang)*
"Aplikasi ini menggunakan **Context API (CartContext)** untuk mengelola *state* keranjang belanja secara global."
- "Ketika saya menekan tombol 'Tambah ke Keranjang', produk tersebut akan disimpan di memori state aplikasi."

*(Pindah ke Tab Keranjang)*
"Sekarang kita pindah ke menu utama yang berbentuk **Tab Navigasi** di bawah layar, dan masuk ke **Keranjang Belanja**."
- "Bisa dilihat, produk yang tadi saya pilih sudah berhasil masuk ke sini."
- "Sistem juga otomatis menghitung **Total Belanjaan** dalam satuan Rupiah."
- "Terdapat tombol 'Hapus' untuk membatalkan pesanan, dan tombol 'Checkout' untuk menyelesaikan simulasi belanja yang secara otomatis akan mengosongkan isi keranjang."

## 6. Demonstrasi Profil & Logout
*(Pindah ke Tab Profil)*
"Menu tab terakhir adalah **Profil**. Di sini terdapat informasi singkat pengguna."
*(Klik tombol Logout)*
"Dan jika kita menekan tombol 'Keluar' (Logout), aplikasi akan menghapus *Token* dari `AsyncStorage` dan mengembalikan kita ke halaman Login awal."

## 7. Penutup
"Secara keseluruhan, aplikasi KampusMarket ini telah memenuhi semua ketentuan wajib tugas UAS, mencakup 3 halaman utama, penggunaan FlatList, komponen yang reusable, pencarian dan filter, navigasi Tab, serta terintegrasi sepenuhnya dengan API DummyJSON."

"Sekian demonstrasi aplikasi dari saya, terima kasih."
