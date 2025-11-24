// resources/js/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Text statis
const resources = {
    id: {
        translation: {
            home: "Home",
            produk_kami: "Produk Kami",
            tentang_kami: "Tentang Kami",
            toko: "Toko",
            keranjang: "Keranjang",
            login: "Login",
            logout: "Logout",
            lihat_produk: "Lihat Produk",
            best_seller: "Best Seller",
            promo: "Promo",
            tambah: "Tambah",
            pesan: "Pesan",
            jumlah: "Jumlah",
            alamat: "Alamat",
            deskripsi: "Deskripsi",
        },
    },
    en: {
        translation: {
            home: "Home",
            produk_kami: "Our Products",
            tentang_kami: "About Us",
            toko: "Store",
            keranjang: "Cart",
            login: "Login",
            logout: "Logout",
            lihat_produk: "See Products",
            best_seller: "Best Seller",
            promo: "Promo",
            tambah: "Add",
            pesan: "Order",
            jumlah: "Quantity",
            alamat: "Address",
            deskripsi: "Description",
        },
    },
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: 'id',            // default bahasa Indonesia
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

export default i18n;
