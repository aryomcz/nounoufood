import React, { useState } from "react";
import QuantitySelector from "@/Components/Cart/QuantitySelector";
import GuestLayout from "@/Layouts/GuestLayout";
import { router, useForm, usePage } from "@inertiajs/react";
import {
  Button,
  Text,
  ActionIcon,
  Checkbox,
  Group,
  Drawer,
  Modal,
  Textarea,
} from "@mantine/core";
import { Icon } from "@iconify/react";
import { notifications } from "@mantine/notifications";

export default function CartIndex({ carts, total, diskon }) {

  const {notification} = usePage().props;
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [opened, setOpened] = useState(false);
  const [alamatModal, setAlamatModal] = useState(false);
  const { data, setData, post, processing, errors, reset } = useForm({
    items: [],
    alamat: usePage().props.auth?.user?.alamat ?? "",
  });

  const updateQty = (id, qty) => {
    router.patch(route("cart.qty"), {
        cart_id: id,
        qty: qty,
    });
  };

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

 const handleOrder = () => {
    router.post(
      route("order.store"),
      { 
        items: data.items,
        alamat: data.alamat, 
      },
      {
        onSuccess: (page) => {
          setConfirmOpen(false);
          setOpened(false);
          setData("items",[]);
          setAlamatModal(false);

          const notif = page.props.notification;

          if (!notif || !notif.whatsapp) {
            console.error("Tidak ada whatsapp data dari backend");
            return;
          }

          const pesan =
            `Format Pemesanan Produk Nounoufood\n\n`+
            `Nama: ${notif.whatsapp.nama}\n` +
            `No Telepon: ${notif.whatsapp.phone}\n` +
            `Alamat: ${notif.whatsapp.alamat}\n\n` +

            `Produk:\n` +
            notif.whatsapp.items
              .map((i) => `- ${i.nama} x${i.qty}`)
              .join("\n") +
            `\n\n` +

            `Subtotal: ${formatRupiah(notif.whatsapp.subtotal)}\n` +
            `Promo: -${formatRupiah(notif.whatsapp.diskon)}\n` +
            `Total: ${formatRupiah(notif.whatsapp.total)}`;


          const encoded = encodeURIComponent(pesan);

          const nomorToko = "6287820858924";

          // REDIRECT WA
          window.location.href = `https://wa.me/${nomorToko}?text=${encoded}`;

        },

        onError: () => {
          setConfirmOpen(false);
          setOpened(false);
          setSelected([]);
          setAlamatModal(false);

          notifications.show({
            title: "Pesanan Gagal",
            message: "Harap memilih produk!",
            color: "red",
            icon: <Icon icon="material-symbols:cancel-outline-rounded" width={24} />
          });
        }
      }
    );
  };



  const toggleSelect = (id) => {
    const baru = data.items.includes(id)
      ? data.items.filter(x => x !== id)
      : [...data.items, id];

    setData("items", baru);
  };

  const deleteSelectedItems = () => {
    if (data.items.length === 0) return;

    router.delete(route("cart.delete"), {
          data: { cart_id: data.items },
          onSuccess: () => {
            setData("items",[]);
          },
        });

    setData("items",[]);
  };

  const calculateSelectedTotals = () => {
    const selectedCarts = carts.filter((c) => data.items.includes(c.id));

    let subtotal = 0;
    let promo = 0;

    selectedCarts.forEach((c) => {
      const harga = c.products.harga;
      const diskon = c.products.promo?.diskon_persen ?? 0;

      const subtotalItem = harga * c.qty;
      const promoItem = (harga * diskon / 100) * c.qty;

      subtotal += subtotalItem;
      promo += promoItem;
    });

    return { subtotal, promo, totalPrice: subtotal - promo };
  };


  const { subtotal, promo, totalPrice } = calculateSelectedTotals();
  


  const formatRupiah = (num) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(num);

  // subtotal keseluruhan
  const subtotalOverall = carts.reduce((sum, item) => sum + item.subtotal, 0);

  return (
    <GuestLayout>
      <div className="max-w-7xl mx-auto py-20 px-4 bg-[#FDF7F0] min-h-screen relative">
        <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-12">
          Shopping Cart
        </h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* ---------------- LEFT: CART LIST ---------------- */}
          <div className="lg:w-2/3 bg-white rounded-2xl shadow-lg p-6">

            {/* Header */}
            <div className="flex justify-between items-center pb-4 border-b mb-4">
              <div className="flex items-center gap-2 mb-4">
                <Checkbox
                  checked={data.items.length === carts.length && carts.length > 0}
                  indeterminate={data.items.length > 0 && data.items.length < carts.length}
                  onChange={(e) => {
                    if (e.currentTarget.checked) {
                      setData("items", carts.map(c => c.id));
                    } else {
                      setData("items", []);
                    }
                  }}
                />
                <Text>Pilih Semua</Text>
              </div>

              {data.items.length > 0 && (
                <Button
                  color="red"
                  size="xs"
                  radius="md" 
                  leftSection={<Icon icon="octicon:trash-16" width={20} height={20} />}
                  onClick={deleteSelectedItems}
                  >
                  Hapus({data.items.length})
                </Button>
              )}
            </div>

            {/* Header kolom untuk desktop */}
            <div className="hidden md:grid grid-cols-8 gap-4 text-gray-500 font-semibold mb-4 text-sm">
              <div>
              {data.items.length} Barang
              </div> {/* checkbox */}
              <div className="col-span-2">Produk</div>
              <div className="text-right">Harga</div>
              <div className="text-center col-span-2">Jumlah</div>
              <div className="text-right col-span-2">Subtotal</div>
            </div>

            {/* Items */}
            {carts.map((c, index) => (
              <React.Fragment key={c.id}>
                <div className="grid grid-cols-1 md:grid-cols-8 gap-4 items-center py-4">

                  {/* Checkbox */}
                  <div className="flex md:block justify-start">
                    <Checkbox
                      checked={data.items.includes(c.id)}
                      onChange={() => toggleSelect(c.id)}
                    />
                  </div>

                  {/* Gambar */}
                  <div className="col-span-1 flex items-center justify-center md:justify-start">
                    <img
                      src={c.products.foto || "/placeholder-product.png"}
                      alt={c.products.nama}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                  </div>

                  {/* Nama */}
                  <div className="md:col-span-1 text-center md:text-left">
                    <Text size="md" fw={600}>
                      {c.products.nama}
                    </Text>
                  </div>

                  {/* Harga */}
                  <div className="md:col-span-1 text-center md:text-right">
                    <Text size="sm" fw={500}>
                      {formatRupiah(
                        c.products.harga
                      )}
                    </Text>
                  </div>

                  {/* Quantity */}
                  <div className="md:col-span-2 flex justify-center">
                    <QuantitySelector
                      cartId={c.id}
                      initialQty={c.qty}
                      onUpdateQty={updateQty}
                    />
                  </div>

                  {/* Subtotal */}
                  <div className="md:col-span-2 text-center md:text-right">
                    <Text size="md" fw={600}>
                      {formatRupiah(c.subtotal)}
                    </Text>
                  </div>
                </div>

                {index < carts.length - 1 && (
                  <hr className="my-2 border-gray-100" />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* ---------------- RIGHT: SUMMARY ---------------- */}
          <div className="hidden md:block lg:w-1/3 bg-white rounded-2xl shadow-lg p-6 h-fit sticky top-10">
            <h2 className="text-xl font-bold mb-4">Ringkasan Pesanan Anda</h2>

            <div className="space-y-3">
              <div className="flex justify-between">
                <Text>Subtotal</Text>
                <Text>{formatRupiah(subtotal)}</Text>
              </div>
              <div className="flex justify-between">
                <Text>Promo</Text>
                <Text>- {formatRupiah(promo)}</Text>
              </div>

              <hr className="my-3 border-gray-200" />

              <div className="flex justify-between font-bold text-lg">
                <Text>Total</Text>
                <Text>{formatRupiah(totalPrice)}</Text>
              </div>
            </div>

            <Button
              fullWidth
              size="lg"
              mt="xl"
              radius="xl"
              leftSection={<Icon icon="ic:baseline-whatsapp" width={20} />}
              disabled={data.items.length === 0}
              loading={processing}
              styles={() => ({
                root: {
                  backgroundColor: "transparent",
                  backgroundImage:
                    "linear-gradient(to right, #ffc764, #ff9900)",
                  color: "white",
                  "&:hover": {
                    backgroundImage:
                      "linear-gradient(to right, #ffc764, #ff9900)",
                    opacity: 0.9,
                  },
                },
              })}
             onClick={() => setConfirmOpen(true)}
            >
              Pesan Sekarang
            </Button>
          </div>
        </div>
        {/* Tombol untuk mobile */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-white border-t shadow-xl">
        <Button
          fullWidth
          radius="xl"
          color="orange"
          onClick={() => setOpened(true)}
          rightSection={opened ? <Icon icon="mdi:chevron-down" width={22} /> : <Icon icon="mdi:chevron-up" width={22} />}
        >
          Lihat Ringkasan Pesanan
        </Button>
      </div>
      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        position="bottom"
        size="80%" // tinggi drawer
        // withCloseButton={false}
        overlayProps={{ opacity: 0.2 }}
        className="md:hidden"
      >
        <div className="p-4">

          {/* Handle Bar */}
          <div className="w-14 h-1.5 bg-gray-300 rounded-full mx-auto mb-4"></div>

          <h2 className="text-xl font-bold mb-4 text-center">Ringkasan Pesanan</h2>

          <div className="space-y-3">
            <div className="flex justify-between">
              <Text>Subtotal</Text>
              <Text>{formatRupiah(subtotal)}</Text>
            </div>

            <div className="flex justify-between">
              <Text>Promo</Text>
              <Text>- {formatRupiah(promo)}</Text>
            </div>

            <hr className="my-3" />

            <div className="flex justify-between font-bold text-lg">
              <Text>Total</Text>
              <Text>{formatRupiah(totalPrice)}</Text>
            </div>
          </div>

          <Button
            fullWidth
            size="lg"
            radius="xl"
            mt="xl"
            disabled={data.items.length === 0}
            loading={processing}
            onClick={() => setConfirmOpen(true)}
            leftSection={<Icon icon="ic:baseline-whatsapp" width={20} />}
            styles={() => ({
              root: {
                backgroundColor:
                  data.items.length === 0 ? "#ccc" : "transparent",
                backgroundImage:
                  data.items.length === 0
                    ? "none"
                    : "linear-gradient(to right, #ffc764, #ff9900)",
                color: data.items.length === 0 ? "#666" : "white",
              },
            })}
          >
            Pesan Sekarang
          </Button>
        </div>
      </Drawer>

      </div>
      <Modal
        opened={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        centered
        title="Konfirmasi Pesanan"
      >
        <Text mb="md">
          Apakah Anda yakin ingin membuat pesanan dengan total:
          <b> {formatRupiah(totalPrice)}</b>?
        </Text>

        <Group justify="flex-end">
          <Button variant="subtle" onClick={() => setConfirmOpen(false)}>
            Batal
          </Button>

          <Button
            color="orange"
            onClick={() => {
              setConfirmOpen(false);
              setAlamatModal(true);
            }}

            leftSection={<Icon icon="ic:baseline-check" />}
          >
            Ya, Pesan Sekarang
          </Button>
        </Group>
      </Modal>
      <Modal
        opened={alamatModal}
        onClose={() => setAlamatModal(false)}
        centered
        title="Isi Alamat Pengiriman"
      >
        <Text mb="xs">Masukkan alamat lengkap Anda:</Text>

        <Textarea
          autosize
          value={data.alamat}
          onChange={(e) => setData("alamat", e.target.value)}
        />

        <Group justify="flex-end" mt="md">
          <Button variant="subtle" onClick={() => setAlamatModal(false)}>
            Batal
          </Button>

          <Button
            color="orange"
            onClick={() => {
              if (!data.alamat.trim()) {
                notifications.show({
                  title: "Alamat kosong!",
                  message: "Harap isi alamat sebelum melanjutkan.",
                  color: "red",
                  icon: <Icon icon="material-symbols:cancel-outline-rounded" width={24} />
                });
                return;
              }
              handleOrder(); // lanjut kirim order
            }}
            loading={processing}
            leftSection={<Icon icon="ic:baseline-check" />}
          >
            Lanjutkan Pesanan
          </Button>
        </Group>
      </Modal>

    </GuestLayout>
  );
}
