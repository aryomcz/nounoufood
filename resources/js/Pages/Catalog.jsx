import { Carousel } from "@mantine/carousel";
import { Card, Image, Text, Button, Group, Badge, Stack, Drawer, Modal, NumberInput, Textarea,Portal, Tooltip } from "@mantine/core";
import Autoplay from "embla-carousel-autoplay";
import { Icon } from "@iconify/react";
import { useRef, useState, useEffect} from "react";
import classes from "../../css/Product.module.css"
import GuestLayout from "@/Layouts/GuestLayout";
import { useForm, usePage } from "@inertiajs/react";
import { motion, LayoutGroup, AnimatePresence } from "motion/react";
import { useTranslation } from "react-i18next";
import {notifications} from "@mantine/notifications";
import QuantitySelector from "@/Components/Homepage/QuantitySelector";

export default function Catalog(props) {
    const { t } = useTranslation();
    const autoplay = useRef(Autoplay({ delay: 4000 }));
    const carouselRef = useRef(null);
    const [opened, setOpened] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [waDrawer, setWaDrawer] = useState(false);
    const [confirmModal, setConfirmModal] = useState(false);
    const [alamatModal, setAlamatModal] = useState(false);
    const [previewProduct, setPreviewProduct] = useState(null);
    const [selectedId, setSelectedId] = useState(null);
  
    const alamatPelanggan = usePage()?.props?.auth?.user?.alamat;
    const form = useForm({
      id_produk: "",
      qty: 1,
      alamat: alamatPelanggan,
    });

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
  
    const openDrawer = (p) => {
      setSelectedProduct(p);
      form.setData({
        id_produk: p.id,
        qty: 1,
        alamat: alamatPelanggan, // bisa diganti dengan default user alamat jika ada
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
      form.post(route("cart.store"), {
        onSuccess: () => {
          setOpened(false);
           }
      });
    };
    const [nomorToko, setNomorToko] = useState("");
    const no = usePage().props.company?.no_hp || "6281936110396";
    useEffect(() => {
     setNomorToko(no);
    }, []); 

  
    const handleOrder = () => {
      form.post(route("order.single.store"), {
        onSuccess: (page) => {
          setConfirmModal(false);
          setAlamatModal(false);
          setWaDrawer(false);
  
           const pesan =
              `Format Pemesanan Produk Nounoufood\n\n`+
              `Nama: ${notification.whatsapp.nama}\n` +
              `No Telepon: ${notification.whatsapp.phone}\n` +
              `Alamat: ${notification.whatsapp.alamat}\n\n` +
  
              `Produk:\n` +
              notification.whatsapp.items
                .map((i) => `- ${i.nama} x${i.qty}`)
                .join("\n") +
              `\n\n` +
  
              `Subtotal: ${formatRupiah(notification.whatsapp.subtotal)}\n` +
              `Promo: -${formatRupiah(notification.whatsapp.diskon)}\n` +
              `Total: ${formatRupiah(notification.whatsapp.total)}`;
  
  
            const encoded = encodeURIComponent(pesan);
  
            // REDIRECT WA
            window.location.href = `https://wa.me/${nomorToko}?text=${encoded}`;
        },
        onError: () => {
          setConfirmModal(false);
          setAlamatModal(false);
          notifications.show({
            title: "Pesanan Gagal",
            message: "Harap isi alamat dan jumlah produk!",
            color: "red",
            icon: <Icon icon="material-symbols:cancel-outline-rounded" width={24} />
          });
        }
      });
    };
  
    // Hitung subtotal, diskon, total
    const hargaProduk = selectedProduct?.harga || 0;
    const diskonProduk = selectedProduct?.promo?.diskon_persen || 0;
    const subtotal = hargaProduk * form.data.qty;
    const potongan = (hargaProduk * diskonProduk / 100) * form.data.qty;
    const total = subtotal - potongan;
    
    const formatRupiah = (num) =>
        new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
        }).format(num);

        const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08, // interval antar card
      delayChildren: 0.05    // sedikit delay awal
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      bounce: 0.35,
      stiffness: 70,
      damping: 12,
    },
  },
};

  return (
    <LayoutGroup>
    <GuestLayout>
        <div className="w-full flex flex-col justify-center items-center py-10 gap-2 md:gap-10 px-4 sm:px-6 xl:px-24 lg:py-20">
            {props?.produk?.filter((p) => p.products != null).map((p) => 
                <div key={p.id} className="text-center flex flex-col gap-2 w-full justify-center items-center">
                <motion.h1 initial={{ y: -100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{
          type: "spring",
          bounce: 0.45,
          stiffness: 70,
          damping: 12,
        }} className="font-poppins-2 font-semibold text-xl lg:text-3xl mt-10">{p.nama}</motion.h1>
                <div ref={carouselRef} className="w-full flex justify-center items-center">
                   <motion.div
                              variants={containerVariants}
                              initial="hidden"
                              whileInView="visible"
                              viewport={{ once: true, amount: 0.5 }}
                              className="w-full"
                            >  
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
                    {p.products.map((p) => (
                      <motion.div variants={itemVariants} key={p.id}>
                        <Carousel.Slide
                    // key={p.id}
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

                            {p.is_best_seller == true && (
                                <div className="absolute top-3 right-0 bg-secondary-main border-[3px] border-primary-main rounded-l-full font-poppins-2 text-white text-sm px-2 py-1">
                                <p>Best Seller</p>
                                </div>
                            )}

                            {p.promo && (
                                <Badge color="yellow" variant="filled" style={{ position: "absolute", top: 10, left: 10, padding: "8px 10px", fontSize: "12px" }}>
                                -{p.promo.diskon_persen}%
                                </Badge>
                            )}

                            <Stack h={"100%"} justify="space-between">
                                <div>
                                <motion.p layoutId={`title-${p.id}`} className="font-semibold mt-3 text-md">{p.nama}</motion.p>
                                {p.promo && <Text size="sm" c="dimmed" td="line-through">{formatRupiah(p.harga)}</Text>}
                                {p.promo && (
                                    <Group align="center" gap={4} className="text-primary-main">
                                    <Text size="sm" c={"dark"} fw={700}>
                                        {formatRupiah(p.harga - (p.promo.diskon_persen * p.harga) / 100)}
                                    </Text>
                                    <Icon icon="iconamoon:discount" style={{ color:"#FAB12F" }} width={28}/>
                                    </Group>
                                )}
                                {!p.promo && <Text size="sm" fw={700}>{formatRupiah(p.harga)}</Text>} 
                                    {/* <Text size="sm" c={"dark"} fw={700}>
                                        {p.qty}gr
                                    </Text> */}
                                </div>

                                <div className="flex items-center justify-between mt-3 gap-2 w-full">
                              <Tooltip
                                  label={p.stok === 0 ? t('stok_habis') : ""}
                                  disabled={p.stok !== 0}
                                >
                                  <Button
                                    color="orange"
                                    leftSection={<Icon icon="mdi:cart-plus" width={16} />}
                                    radius="lg"
                                    size="xs"
                                    className="flex-1"
                                    disabled={p.stok === 0}
                                    onClick={e => {
                                      if (p.stok === 0) return; // cegah klik
                                      e.stopPropagation();
                                      openDrawer(p);
                                    }}
                                  >
                                    {t('button_keranjang')}
                                  </Button>
                                </Tooltip>

                                <Tooltip
                                  label={p.stok === 0 ? t('stok_habis') : ""}
                                  disabled={p.stok !== 0}
                                >
                                  <Button
                                    color="green"
                                    leftSection={<Icon icon="ic:baseline-whatsapp" width={16} />}
                                    radius="lg"
                                    size="xs"
                                    className="flex-1"
                                    disabled={p.stok === 0}
                                    onClick={e => {
                                      if (p.stok === 0) return;
                                      e.stopPropagation();
                                      setSelectedProduct(p);
                                      form.setData({ id_produk: p.id, qty: 1, alamat: alamatPelanggan });
                                      setWaDrawer(true);
                                    }}
                                  >
                                    {t('button_pesan')}
                                  </Button>
                                </Tooltip>

                                </div>
                            </Stack>
                            </Card>
                            </motion.div>
                        </Carousel.Slide>
                      </motion.div>
                    ))}
                </Carousel>
                </motion.div>
                </div>
                </div>
            )}
        </div>
        {/* Drawer Cart */}
      <Drawer opened={opened} onClose={() => setOpened(false)} title={t('tambah_keranjang')} position="right" padding="lg">
        {selectedProduct && (
          <div className="flex flex-col gap-4 justify-center">
            <Image src={selectedProduct.foto} w={"100%"} maw={"320px"} h={"auto"} />
            <p className="font-medium">{selectedProduct.nama}</p>

            <QuantitySelector
                            cartId={selectedProduct.id}
                            initialQty={form.data.qty}
                            min={1}
                            max={selectedProduct.stok ?? 1}
                            onUpdateQty={(id, val) => form.setData("qty", val)}
                          />

            <Button onClick={submitCart} loading={form.processing} color="orange">{t('tambah_keranjang')}</Button>
          </div>
        )}
      </Drawer>

      {/* Drawer WhatsApp */}
      <Drawer opened={waDrawer} onClose={() => setWaDrawer(false)} title={t('lanjutkan_pesanan')}  position="right" padding="lg">
        {selectedProduct && (
          <div className="flex flex-col gap-4 justify-center">
            <Image src={selectedProduct.foto} w={"100%"} maw={"320px"} h={"auto"} />
            <p className="font-medium">{selectedProduct.nama}</p>
            <QuantitySelector
                            cartId={selectedProduct.id}
                            initialQty={form.data.qty}
                            min={1}
                            max={selectedProduct.stok ?? 1}
                            onUpdateQty={(id, val) => form.setData("qty", val)}
                          />
            <Text>{t('alamat')}</Text>
            <Textarea placeholder={t('alamat')} value={form.data.alamat} onChange={(e) => form.setData("alamat", e.target.value)} />
            <Button color="orange" mt="sm" onClick={() => setConfirmModal(true)}>{t('lanjutkan_pesanan')}</Button>
          </div>
        )}
      </Drawer>

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
                          className="absolute top-3 right-3 cursor-pointer text-gray-600 hover:text-gray-900 z-20 bg-secondary-main rounded-full"
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
                        {previewProduct.stok ? <p className="text-sm text-gray-700 mt-3"><span className="font-semibold">{t('stok')}:</span> {previewProduct.stok} pcs</p> : <p className="text-sm text-gray-700 mt-3 font-semibold">{t('stok_habis')}</p>}
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
      
                        <div className="flex justify-end mt-6">
                          {/* <Button color="red" variant="default" onClick={() => setPreviewProduct(null)}>{t('tutup')}</Button> */}
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                </Portal>
              </AnimatePresence>

      {/* Modal Konfirmasi */}
    <Modal opened={confirmModal} onClose={() => setConfirmModal(false)} centered title="Konfirmasi Pesanan">
      <Text mb="sm">Apakah Anda yakin ingin memesan {form.data.qty} {selectedProduct?.nama}?</Text>

      <Text>Subtotal: {formatRupiah(subtotal)}</Text>
      <Text>Promo: -{formatRupiah(potongan)}</Text>
      <Text>Total: {formatRupiah(total)}</Text>

      <Group justify="flex-end" mt="md">
        <Button variant="subtle" onClick={() => setConfirmModal(false)}>Batal</Button>
        <Button color="orange" onClick={handleOrder} loading={form.processing} leftSection={<Icon icon="ic:baseline-check" />}>
          Ya, Pesan Sekarang
        </Button>
      </Group>
    </Modal>
    </GuestLayout>
    </LayoutGroup>
  );
}
