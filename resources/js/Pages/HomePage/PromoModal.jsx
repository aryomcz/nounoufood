import { Image, Text, Button } from "@mantine/core";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Icon } from "@iconify/react";
import { useTranslation } from "react-i18next";

export default function PromoModal({ promos }) {
  const [promoModal, setPromoModal] = useState(false);
  const [activePromo, setActivePromo] = useState(null);
  const [showDetail, setShowDetail] = useState(false); // toggle overlay detail
  const {t, i18n} = useTranslation();
  useEffect(() => {
    const today = new Date();

    const promoAktif = () => {
      const mulai = new Date(promos?.tanggal_mulai);
      const selesai = new Date(promos?.tanggal_selesai);
      return today >= mulai && today <= selesai;
    };

    if (promoAktif()) {
      setActivePromo(promos);
      const timer = setTimeout(() => setPromoModal(true), 2000);
      return () => clearTimeout(timer);
    }
  }, [promos]);

  if (!activePromo) return null;

  return (
    <AnimatePresence>
      {promoModal && activePromo && (
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 p-4"
          onClick={() => setPromoModal(false)}
        >
          <div
            className="relative w-full max-w-md rounded-2xl shadow-xl overflow-hidden bg-white"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Tombol Close Modal */}
            {!showDetail && 
            <Icon
              icon="ic:round-close"
              className="absolute top-3 right-3 cursor-pointer text-gray-600 hover:text-gray-900 z-20 bg-secondary-main rounded-full"
              style={{ color:"white" }}
              width={24}
              height={24}
              onClick={() => setPromoModal(false)}
            /> 
            }

            {/* Foto Promo */}
            <Image
              src={activePromo.foto}
              alt={activePromo.judul}
              radius="md"
              style={{
                width: "100%",
                height: "auto",
                maxHeight: "400px", // opsional, batasi tinggi
                objectFit: "cover", // agar selalu proporsional dan tidak terdistorsi
              }}
            />

            {/* Tombol lihat detail */}
            {!showDetail && (
              <Button
                mt="4"
                color="orange"
                fullWidth
                onClick={() => setShowDetail(true)}
              >
                {t('detail_promo')}
              </Button>
            )}

            {/* Overlay Detail */}
            <AnimatePresence>
              {showDetail && (
                <motion.div
                  initial={{ y: "100%", opacity: 0.5 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: "100%", opacity: 0.5 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="absolute inset-0 bg-white p-6 overflow-auto z-10"
                >
                  {/* Tombol Close Detail */}
                  <Icon
                    icon="ic:round-close"
                    className="absolute top-4 right-4 cursor-pointer text-gray-600 hover:text-gray-900"
                    width={24}
                    height={24}
                    onClick={() => setShowDetail(false)}
                  />
                  <div className="flex flex-col justify-between h-full">
                  <div>
                  <Text fw={700} size="lg">{activePromo.judul}</Text>
                  <Text size="sm" c="dark" mt="1">
                    {`${t('periode')} ${new Date(activePromo.tanggal_mulai).toLocaleDateString(i18n.language, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                    } ${t(`sd`)} ${new Date(activePromo.tanggal_selesai).toLocaleDateString(i18n.language, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                    }`}
                  </Text>
                  <Text mt="2">{activePromo.deskripsi}</Text>

                  <Text mt="2" fw={600}>{t('produk_promo')}</Text>
                  <ul className="list-disc list-inside">
                    {activePromo.products.map((p) => (
                      <li key={p.id}>{p.nama}</li>
                    ))}
                  </ul>
                  </div>
                  <Button
                    mt="4"
                    color="orange"
                    radius={"xl"}
                    fullWidth
                    onClick={() => {
                      setPromoModal(false);
                      const produkSection = document.getElementById("produk");
                      if (produkSection) produkSection.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    Lihat Produk
                  </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
