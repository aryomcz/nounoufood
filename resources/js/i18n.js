// resources/js/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Text statis dan dinamis
const savedLang = localStorage.getItem('language') || 'id';
const resources = {
    id: {
        translation: {
            // Navbar
            home: "Home",
            produk_kami: "Produk Kami",
            tentang_kami: "Tentang Kami",
            toko: "Toko",
            keranjang: "Keranjang",
            login: "Login",
            logout: "Logout",

            // Footer
            navigasi: "Navigasi",
            quick_link: "Quick Link",
            marketplace: "Marketplace",
            contact_us: "Contact Us",
            faqs: "FAQs",
            pages: "Pages",
            services: "Services",
            shopee: "Shopee",
            tiktok: "TikTok",
            alamat_footer: "Botani Square Lantai UG, Yogya Junction Dramaga, Home Production (Taman Cimanggu, Kota Bogor)",

            // Tombol dan label
            lihat_produk: "Lihat Produk",
            best_seller: "Best Seller",
            promo: "Promo",
            tambah: "Tambah",
            pesan: "Pesan",
            jumlah: "Jumlah",
            alamat: "Alamat",
            deskripsi: "Deskripsi",

            // Kontak
            whatsapp: "WhatsApp",
            email: "Email",
            instagram: "Instagram",

            basreng: "Basreng",
            pedas_nampol: "Pedas Nampol",
            jagonya_basreng: "Jagonya Basreng",
            desc_basreng: "Camilan goreng krispi dari bakso, dibalut bumbu cabai pedas. Siap ngegas lidah kamu!",

            keripik_pisang: "Keripik Pisang",
            danggedang: "Danggedang",
            jagonya_keripik: "Jagonya Keripik Pisang",
            desc_keripik: "Cemilan renyah yang susah berhenti. Sekali coba, auto nagih!",

            minuman_kemasan: "Minuman Kemasan",
            segar: "Segar",
            jagonya_minuman: "Jagonya Minuman Kemasan",
            desc_minuman: "Minuman dingin yang bikin kamu auto fresh! Cocok buat panas-panasan.",

            produk_best_seller: "Produk Best Seller Kami",
            lihat_katalog: "Lihat Katalog Produk Best Seller Dari Toko Kami",
            button_keranjang: "Tambah",
            tambah_keranjang: "Tambah ke Keranjang",
            button_pesan: "Pesan",
            lanjutkan_pesanan: "Lanjutkan Pesanan",
            tutup: "Tutup",
            konfirmasi_pesanan: "Konfirmasi Pesanan",
            batal: "Batal",
            ya_pesan_sekarang: "Ya, Pesan Sekarang",
            berat: "Berat",
            deskripsi_belum: "Deskripsi belum tersedia.",
            sertifikat_halal: "Sertifikat Halal MUI",
            nomor: "Nomor",

            button_lihat_semua: "Lihat Semua",
        },
    },
    en: {
        translation: {
            // Navbar
            home: "Home",
            produk_kami: "Our Products",
            tentang_kami: "About Us",
            toko: "Store",
            keranjang: "Cart",
            login: "Login",
            logout: "Logout",

            // Footer
            navigasi: "Navigation",
            quick_link: "Quick Link",
            marketplace: "Marketplace",
            contact_us: "Contact Us",
            faqs: "FAQs",
            pages: "Pages",
            services: "Services",
            shopee: "Shopee",
            tiktok: "TikTok",
            alamat_footer: "Botani Square UG Floor, Yogya Junction Dramaga, Home Production (Taman Cimanggu, Bogor City)",

            // Tombol dan label
            lihat_produk: "See Products",
            best_seller: "Best Seller",
            promo: "Promo",
            tambah: "Add",
            pesan: "Order",
            jumlah: "Quantity",
            alamat: "Address",
            deskripsi: "Description",

            // Kontak
            whatsapp: "WhatsApp",
            email: "Email",
            instagram: "Instagram",

            basreng: "Spicy",
            pedas_nampol: "Basreng",
            jagonya_basreng: "The King of Basreng",
            desc_basreng: "Crispy fried snack from meatballs with spicy chili seasoning. Ready to excite your taste buds!",

            keripik_pisang: "Banana Chips",
            danggedang: "Danggedang",
            jagonya_keripik: "The King of Banana Chips",
            desc_keripik: "Crunchy snack that's hard to stop. Try once, you'll crave for more!",

            minuman_kemasan: "Fresh",
            segar: "Packaged Drinks",
            jagonya_minuman: "The King of Packaged Drinks",
            desc_minuman: "Cold drinks that instantly refresh! Perfect for hot days.",

            produk_best_seller: "Our Best Seller Products",
            lihat_katalog: "See Best Seller Products Catalog from Our Store",
            button_keranjang: "Add",
            tambah_keranjang: "Add to Cart",
            button_pesan: "Order",
            lanjutkan_pesanan: "Proceed Order",
            tutup: "Close",
            konfirmasi_pesanan: "Order Confirmation",
            batal: "Cancel",
            ya_pesan_sekarang: "Yes, Order Now",
            berat: "Weight",
            deskripsi_belum: "Description not available yet.",
            sertifikat_halal: "Halal MUI Certificate",
            nomor: "Number",

            button_lihat_semua: "View All",
        },
    },
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: savedLang,            // default bahasa Indonesia
        fallbackLng: 'id',
        interpolation: { escapeValue: false },
    });

/**
 * Fungsi translate dinamis untuk konten database
 * @param {string} text - konten asli dari database (default ID)
 * @param {string} lang - target language
 * @returns string - hasil terjemahan
 */
export const translateText = (text, lang) => {
    if (lang === 'id') return text; // default
    // Contoh sederhana: bisa diganti dengan API penerjemahan otomatis
    const dictionary = {
        "Keripik Pisang": { en: "Banana Chips" },
        "Basreng Pedas": { en: "Spicy Basreng" },
    };
    return dictionary[text]?.[lang] || text; // fallback ke default
};

export const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng); // simpan pilihan user
};

export default i18n;
