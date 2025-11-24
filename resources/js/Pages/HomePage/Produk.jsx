import { Carousel } from "@mantine/carousel";
import {
  Card,
  Image,
  Text,
  Button,
  Group,
  Badge,
  Stack,
  Drawer,
  NumberInput,
  Modal,
  Textarea,
  Portal,
} from "@mantine/core";
import Autoplay from "embla-carousel-autoplay";
import { Icon } from "@iconify/react";
import { useEffect, useRef, useState } from "react";
import classes from "../../../css/Product.module.css";
import { useForm, usePage } from "@inertiajs/react";
import { notifications } from "@mantine/notifications";
import { motion, LayoutGroup, AnimatePresence } from "motion/react";
import { useTranslation } from "react-i18next";

export default function CarouselBestSeller({ produk }) {
  const { t } = useTranslation();
  const autoplay = useRef(Autoplay({ delay: 4000 }));
  const carouselRef = useRef(null);

  const [opened, setOpened] = useState(false);
  const [waDrawer, setWaDrawer] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [previewProduct, setPreviewProduct] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  const alamatPelanggan = usePage()?.props?.auth?.user?.alamat;

  const form = useForm({
    id_produk: "",
    qty: 1,
    alamat: alamatPelanggan,
  });

  /*** EFFECT: Handle zIndex sementara saat preview ***/
  useEffect(() => {
    if (!carouselRef.current) return;

    const slides = carouselRef.current.querySelectorAll(".mantine-Carousel-slide > div");

    slides.forEach((sl) => {
      sl.style.zIndex = "1";
      sl.style.position = "relative";
    });

    if (selectedId) {
      const selected = carouselRef.current.querySelector(`[data-card-id="${selectedId}"]`);
      if (selected) selected.style.zIndex = "10";
    }

    return () => slides.forEach((sl) => (sl.style.zIndex = "1"));
  }, [selectedId, previewProduct]);

  /*** Functions ***/
  const openDrawer = (p) => {
    setSelectedProduct(p);
    form.setData({
      id_produk: p.id,
      qty: 1,
      alamat: alamatPelanggan,
    });
    setOpened(true);
  };

  const { notification } = usePage().props;

useEffect(() => {
  if (notification) {
    notifications.show({
      title: notification.title,
      message: notification.message,
      color: notification.color ?? "green",
      icon: <Icon icon="material-symbols:check-circle-outline-rounded" width={24} />
    });
  }
}, [notification]);

  const submitCart = () => {
    form.post(route("cart.store"), { onSuccess: () => {
      setOpened(false);
    } });
  };

  const handleOrder = () => {
    form.post(route("order.single.store"), {
      onSuccess: () => {
        setConfirmModal(false);
        setWaDrawer(false);

        const pesan =
          `Format Pemesanan Produk Nounoufood\n\n` +
          `Nama: ${notif.whatsapp.nama}\n` +
          `No Telepon: ${notif.whatsapp.phone}\n` +
          `Alamat: ${notif.whatsapp.alamat}\n\n` +
          `Produk:\n` +
          notif.whatsapp.items.map(i => `- ${i.nama} x${i.qty}`).join("\n") +
          `\n\nSubtotal: ${formatRupiah(notif.whatsapp.subtotal)}\n` +
          `Promo: -${formatRupiah(notif.whatsapp.diskon)}\n` +
          `Total: ${formatRupiah(notif.whatsapp.total)}`;

        const encoded = encodeURIComponent(pesan);
        const nomorToko = "6287820858924";
        window.location.href = `https://wa.me/${nomorToko}?text=${encoded}`;
      },
      onError: () => {
        setConfirmModal(false);
        notifications.show({
          title: "Pesanan Gagal",
          message: "Harap isi alamat dan jumlah produk!",
          color: "red",
          icon: <Icon icon="material-symbols:cancel-outline-rounded" width={24} />
        });
      }
    });
  };

  /*** Price Calculation ***/
  const hargaProduk = selectedProduct?.harga || 0;
  const diskonProduk = selectedProduct?.promo?.diskon_persen || 0;
  const subtotal = hargaProduk * form.data.qty;
  const potongan = (hargaProduk * diskonProduk / 100) * form.data.qty;
  const total = subtotal - potongan;

  const formatRupiah = (num) =>
    new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(num);

  /*** JSX ***/
  return (
    <LayoutGroup>
      <div id="produk" className="w-full flex flex-col justify-center items-center py-10 gap-2 md:gap-10">
        {/* Header */}
        <div className="text-center flex flex-col gap-2">
          <h1 className="font-poppins-2 font-semibold text-xl lg:text-3xl mt-10">{t('produk_best_seller')}</h1>
          <p className="font-poppins text-sm lg:text-lg">{t('lihat_katalog')}</p>
        </div>

        {/* Carousel */}
        <div ref={carouselRef} className="w-full flex justify-center items-center">
          <Carousel
            slideSize="256px"
            w={"100%"}
            height="auto"
            slideGap="md"
            align="center"
            classNames={classes}
            withIndicators
            withControls={false}
            loop
            plugins={[autoplay.current]}
            emblaOptions={{ align: 'center'}}
            // styles={{ container: { justifyContent:"center" } }}
          >
            {produk?.filter(p => p.is_best_seller === 1).map(p => (
              <Carousel.Slide
                key={p.id}
                data-card-id={p.id}
                className="py-10"
                style={{
                  zIndex: selectedId === p.id ? 9999 : 1,
                  position: "relative"
                }}
              >
                <motion.div
                  layoutId={`card-${p.id}`}
                  onClick={() => { setSelectedId(p.id); setPreviewProduct(p); }}
                  className="cursor-pointer"
                >
                  <Card shadow="xl" padding="lg" radius="lg" h="360px" w="100%" maw="256px" ta="start" withBorder style={{ borderRadius: "20px", position: "relative" }}>
                    <Card.Section>
                      <motion.img
                        src={p.foto}
                        alt={p.nama}
                        className="h-[148px] w-full object-cover"
                        layoutId={`image-${p.id}`}
                        style={{ borderRadius: "10px" }}
                      />
                    </Card.Section>

                    {p.is_best_seller && (
                      <div className="absolute top-3 right-0 bg-secondary-main border-[3px] border-primary-main rounded-l-full font-poppins-2 text-white text-sm px-2 py-1">
                        Best Seller
                      </div>
                    )}
                    {p.promo && (
                      <Badge color="yellow" variant="filled" style={{ position: "absolute", top: 10, left: 10, padding: "8px 10px", fontSize: "12px" }}>
                        -{p.promo.diskon_persen}%
                      </Badge>
                    )}

                    <Stack h="100%" justify="space-between">
                      {/* Info Produk */}
                      <div>
                        <motion.p layoutId={`title-${p.id}`} className="font-semibold mt-3 text-md">{p.nama}</motion.p>
                        {p.promo ? (
                          <>
                            <Text size="sm" c="dimmed" td="line-through">{formatRupiah(p.harga)}</Text>
                            <Group align="center" gap={4} className="text-primary-main">
                              <Text size="sm" c="dark" fw={700}>
                                {formatRupiah(p.harga - (p.promo.diskon_persen * p.harga)/100)}
                              </Text>
                              <Icon icon="iconamoon:discount" style={{ color:"#FAB12F" }} width={28}/>
                            </Group>
                          </>
                        ) : <Text size="sm" fw={700}>{formatRupiah(p.harga)}</Text>}
                      </div>

                      {/* Buttons */}
                      <div className="flex items-center justify-between mt-3 gap-2 w-full">
                        <Button
                          color="orange"
                          leftSection={<Icon icon="mdi:cart-plus" width={16} />}
                          radius="lg" size="xs" className="flex-1"
                          onClick={e => { e.stopPropagation(); openDrawer(p); }}
                        >{t('button_keranjang')}</Button>
                        <Button
                          color="green"
                          leftSection={<Icon icon="ic:baseline-whatsapp" width={16} />}
                          radius="lg" size="xs" className="flex-1"
                          onClick={e => { e.stopPropagation(); setSelectedProduct(p); form.setData({ id_produk: p.id, qty:1, alamat: alamatPelanggan }); setWaDrawer(true); }}
                        >{t('button_pesan')}</Button>
                      </div>
                    </Stack>
                  </Card>
                </motion.div>
              </Carousel.Slide>
            ))}
          </Carousel>
        </div>

        <Button component="a" href={route("catalog")} color="#FAB12F" size="md" mt="md">{t('button_lihat_semua')}</Button>

        {/* Drawers */}
        <Drawer opened={opened} onClose={() => setOpened(false)} title={t('tambah_keranjang')} position="right" padding="lg">
          {selectedProduct && (
            <div className="flex flex-col gap-4 justify-center">
              <Image src={selectedProduct?.foto} w="100%" maw="320px" h="auto" />
              <p className="font-medium">{selectedProduct?.nama}</p>
              <NumberInput label={t('jumlah')} min={1} value={form.data.qty} onChange={v => form.setData("qty", v)} />
              <Button onClick={submitCart} loading={form.processing} color="orange">{t('tambah_keranjang')}</Button>
            </div>
          )}
        </Drawer>

        <Drawer opened={waDrawer} onClose={() => setWaDrawer(false)} title={t('lanjutkan_pesanan')} position="right" padding="lg">
          {selectedProduct && (
            <div className="flex flex-col gap-4 justify-center">
              <Image src={selectedProduct.foto} w="100%" maw="320px" h="auto" />
              <p className="font-medium">{selectedProduct.nama}</p>
              <NumberInput label={t('jumlah')} min={1} value={form.data.qty} onChange={v => form.setData("qty", v)} />
              <Text>{t('alamat')}</Text>
              <Textarea placeholder={t('alamat')} value={form.data.alamat} onChange={e => form.setData("alamat", e.target.value)} />
              <Button color="orange" mt="sm" onClick={() => setConfirmModal(true)}>{t('lanjutkan_pesanan')}</Button>
            </div>
          )}
        </Drawer>

        {/* Preview */}
        <AnimatePresence>
          <Portal>
            {previewProduct && (
              <motion.div
                initial={{ opacity:0 }}
                animate={{ opacity:1 }}
                exit={{ opacity:0 }}
                className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center p-4"
                onClick={() => setPreviewProduct(null)}
              >
                <motion.div
                  layoutId={`card-${previewProduct.id}`}
                  transition={{ layout:{duration:0.35, bounce:0} }}
                  className="bg-white rounded-2xl p-5 w-full max-w-md shadow-xl relative"
                  onClick={e => e.stopPropagation()}
                >
                <Icon
                  icon="ic:round-close"
                  className="absolute top-3 right-3 cursor-pointer hover:text-gray-900 z-20 bg-secondary-main rounded-full"
                  style={{ color:"white" }}
                  width={24}
                  height={24}
                  onClick={() => setPreviewProduct(false)}
                /> 
                  <motion.img src={previewProduct.foto} layoutId={`image-${previewProduct.id}`} transition={{ layout:{duration:0.35,bounce:0} }} className="w-full h-56 object-cover rounded-xl" />
                  <motion.h2 layoutId={`title-${previewProduct.id}`} transition={{ layout:{duration:0.35,bounce:0} }} className="text-lg font-semibold mt-4">{previewProduct.nama}</motion.h2>

                  <div className="mt-3">
                    {previewProduct.promo ? (
                      <>
                        <p className="text-sm text-gray-500 line-through">{formatRupiah(previewProduct.harga)}</p>
                        <div className="flex items-center gap-2">
                          <p className="text-primary-main font-bold text-lg">{formatRupiah(previewProduct.harga - (previewProduct.promo.diskon_persen * previewProduct.harga)/100)}</p>
                          <Icon icon="iconamoon:discount" style={{ color:"#FAB12F" }} width={28}/>
                        </div>
                      </>
                    ) : (
                      <p className="text-lg font-bold text-gray-800">{formatRupiah(previewProduct.harga)}</p>
                    )}
                  </div>

                  {previewProduct.qty && <p className="text-sm text-gray-700 mt-3"><span className="font-semibold">{t('berat')}:</span> {previewProduct.qty}gr</p>}
                  <p className="text-gray-600 text-sm mt-4 leading-relaxed">{previewProduct.deskripsi ?? t('deskripsi_belum')}</p>

                  {previewProduct.halal && (
                    <div className="flex items-center gap-2 mt-4 p-3 bg-green-50 rounded-xl border border-green-200">
                      <img src="/images/halal-mui.png" alt="Halal MUI" className="w-10 h-10 object-contain" />
                      <div>
                        <p className="text-green-700 font-semibold text-sm">{t('sertifikat_halal')}</p>
                        <p className="text-xs text-gray-600">{t('nomor')}: {previewProduct.halal.no_sertifikasi ?? previewProduct.halal}</p>
                      </div>
                    </div>
                  )}

                </motion.div>
              </motion.div>
            )}
          </Portal>
        </AnimatePresence>

        {/* Modal Konfirmasi */}
        <Modal opened={confirmModal} onClose={() => setConfirmModal(false)} centered title={t('konfirmasi_pesanan')}>
          <Text mb="sm">Apakah Anda yakin ingin memesan {form.data.qty} {selectedProduct?.nama}?</Text>
          <Text>Subtotal: {formatRupiah(subtotal)}</Text>
          <Text>Promo: -{formatRupiah(potongan)}</Text>
          <Text>Total: {formatRupiah(total)}</Text>

          <Group justify="flex-end" mt="md">
            <Button variant="subtle" onClick={() => setConfirmModal(false)}>{t('batal')}</Button>
            <Button color="orange" onClick={handleOrder} loading={form.processing} leftSection={<Icon icon="ic:baseline-check" />}>
              {t('ya_pesan_sekarang')}
            </Button>
          </Group>
        </Modal>
      </div>
    </LayoutGroup>
  );
}
