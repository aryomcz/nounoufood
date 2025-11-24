// PromoIndex.jsx
import DashboardLayout from "@/Layouts/DashboardLayout";
import { useEffect, useState, useCallback } from "react";
import {
  TextInput,
  NumberInput,
  Textarea,
  Checkbox,
  Button,
  Grid,
  Stack,
  Image,
  Text,
  Card,
  Group,
  Divider,
  Box,
} from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import classes from '../../../../css/Demo.module.css';
import { DatePickerInput } from "@mantine/dates";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { Icon } from "@iconify/react";
import { router, usePage } from "@inertiajs/react";
import { useForm } from "@inertiajs/react";
import { notifications } from "@mantine/notifications";



export default function PromoIndex({ products, promo}) {
  // --- form state (dates stored as Date objects) ---
 const { data, setData, post, processing, transform, errors } = useForm({
  judul: promo?.judul || "",
  tanggal_mulai: promo?.tanggal_mulai ? new Date(promo.tanggal_mulai) : null,
  tanggal_selesai: promo?.tanggal_selesai ? new Date(promo.tanggal_selesai) : null,
  diskon_persen: promo?.diskon_persen || "",
  deskripsi: promo?.deskripsi || "",
  foto: null,
  produk_ids: [],
});


  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [preview, setPreview] = useState(promo?.foto || null);
  const [mimeError, setMimeError] = useState("");


  // --- image compression (returns File) ---
  const compressImage = async (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = (event) => {
        const img = new window.Image();
        img.src = event.target.result;

        img.onload = () => {
          const canvas = document.createElement("canvas");
          const maxWidth = 800;
          const scaleSize = maxWidth / img.width;

          canvas.width = maxWidth;
          canvas.height = img.height * scaleSize;

          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

          canvas.toBlob(
            (blob) => {
              // Create new File from blob (preserve original name/type)
              resolve(new File([blob], file.name, { type: file.type }));
            },
            file.type,
            0.75
          );
        };

        img.onerror = () => {
          // fallback: return original file
          resolve(file);
        };
      };
    });
  };

  console.log(data.produk_ids);
  
  // --- drop handler ---
  const handleDrop = async (files) => {
    const file = files[0];
    if (!file) return;

    if (!IMAGE_MIME_TYPE.includes(file.type)) {
      setMimeError("Format harus JPG atau PNG");
      return;
    }
    setMimeError("");

    const compressed = await compressImage(file);
    setData("foto", compressed);

    // revoke previous preview if it was a blob URL
    if (preview && preview.startsWith("blob:")) {
      URL.revokeObjectURL(preview);
    }
    setPreview(URL.createObjectURL(compressed));
  };

  // --- toggle select all / preselect logic ---
  const toggleSelectAll = (checked) => {
    const list = checked ? products.map((p) => p.id) : [];
    setSelectAll(checked);
    setSelectedProducts(list);
    setData("produk_ids", list);  // WAJIB
};


  // initialize pre-selected products when products prop changes (e.g., edit)
  useEffect(() => {
  if (promo) {
    const preSelected = products
      .filter((p) => p.id_promo === promo.id) 
      .map((p) => p.id);

    setSelectedProducts(preSelected);
    setData("produk_ids", preSelected);  // sinkron form
    setSelectAll(preSelected.length === products.length);
  }
}, [products]);


  // keep selectAll in sync when selectedProducts change
  useEffect(() => {
    setSelectAll(selectedProducts.length === products.length && products.length > 0);
  }, [selectedProducts, products]);

  // cleanup preview URL on unmount
  useEffect(() => {
    return () => {
      if (preview && preview.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // format date (Date -> YYYY-MM-DD) safe
  const formatDateForBackend = (d) => {
    if (!d) return "";
    if (d instanceof Date && !isNaN(d)) {
      return d.toISOString().split("T")[0];
    }
    // if it's already a string, return as-is
    return `${d}`;
  };

    transform((data) => ({
    ...data,
    tanggal_mulai: formatDateForBackend(data.tanggal_mulai),
    tanggal_selesai: formatDateForBackend(data.tanggal_selesai),
  }));

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
  // --- submit ---
  const submitPromo = () => {
  post(route("promo.store"), {
    forceFormData: true,  // WAJIB karena ada foto
  });
  };


  const formatRupiah = (num) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(num || 0);

  return (
     <div className="bg-white border shadow-sm rounded-xl p-1">
        <Stack p={20}>
        {/* FOTO */}
        <Stack align="center" mb={10}>
            {preview ? (
            <Stack align="center">
                <Image src={preview} radius="md" h={150} w={150} fit="cover" />
                <Button
                variant="light"
                size="xs"
                onClick={() => {
                    if (preview && preview.startsWith("blob:")) {
                    URL.revokeObjectURL(preview);
                    }
                    setPreview(null);
                    setData("foto", null);

                }}
                >
                Ganti Foto
                </Button>
            </Stack>
            ) : (
            <Dropzone
                accept={IMAGE_MIME_TYPE}
                multiple={false}
                onDrop={handleDrop}
                maxSize={5 * 1024 ** 2}
                radius="md"
                style={{ width: 150, height: 150, borderRadius: 12 }}
            >
                <Stack align="center" justify="center" h="100%">
                <Icon icon="majesticons:camera-line" width={50} />
                <Text size="sm">Upload Foto</Text>
                </Stack>
            </Dropzone>
            )}

            {mimeError && (
            <Text c="red" size="xs">
                {mimeError}
            </Text>
            )}
            {errors.foto && (
            <Text c="red" size="xs">
                {errors.foto}
            </Text>
            )}
        </Stack>

        {/* FORM */}
        <Grid>
            <Grid.Col span={6}>
            <TextInput
                label="Judul"
                placeholder="Judul Promo"
                value={data.judul}
                onChange={(e) => setData("judul", e.target.value)}
                error={errors.judul}
            />
            </Grid.Col>

            <Grid.Col span={6}>
            <DatePickerInput
                label="Tanggal Mulai"
                placeholder="Pilih tanggal mulai"
                value={data.tanggal_mulai}
                onChange={(val) => setData("tanggal_mulai", val)}
                error={errors.tanggal_mulai}
                withinPortal
            />
            </Grid.Col>

            <Grid.Col span={6}>
            <DatePickerInput
                label="Tanggal Berakhir"
                placeholder="Pilih tanggal berakhir"
                value={data.tanggal_selesai}
                onChange={(val) => setData("tanggal_selesai", val)}
                error={errors.tanggal_selesai}
                minDate={data.tanggal_mulai || undefined} 
                withinPortal
            />
            </Grid.Col>

            <Grid.Col span={6}>
            <NumberInput
                label="Besar Diskon (%)"
                value={data.diskon_persen}
                placeholder="10"
                onChange={(val) => setData("diskon_persen", val)}
                error={errors.diskon_persen}
                min={0}
                max={100}
            />
            </Grid.Col>

            <Grid.Col span={6}>
            <Textarea
                label="Deskripsi"
                autosize
                placeholder="Deskripsi promo"
                value={data.deskripsi}
                onChange={(e) => setData("deskripsi", e.target.value)}
                error={errors.deskripsi}
            />
            </Grid.Col>
        </Grid>

        {/* <Divider my={10} /> */}

        {/* PILIH PRODUK */}
        <Stack>
            <Stack>
            <Text fw={600}>Pilih Produk</Text>

            <Checkbox
                label="Pilih Semua"
                checked={selectAll}
                indeterminate={
                    selectedProducts.length > 0 &&
                    selectedProducts.length < products.length
                }
                onChange={(e) => toggleSelectAll(e.currentTarget.checked)}
            />
            </Stack>

            {/* show validation message for produk */}
            {errors.produk_ids && (
            <Text c="red" size="xs">
                {errors.produk_ids}
            </Text>
            )}

            <Carousel
                slideSize={{ base: '100%', sm: '33%' }}
                slideGap="xs"
                controlsOffset="xs"
                align="center"
                withIndicators
                draggable
                loop
                height={"auto"}
                w="60%"
                styles={{
                    control: {
                    "&[data-inactive]": { opacity: 0, cursor: "default" },
                    },
                }}
                emblaOptions={{
                    loop: false,
                    dragFree: true,
                    align: 'center'
                }}
                classNames={classes}
                >
                {products.map((p) => {
                    const active = selectedProducts.includes(p.id);

                    return (
                    <Carousel.Slide key={p.id}>
                        <Card
                        shadow="sm"
                        padding="md"
                        radius="lg"
                        withBorder
                        maw="160"
                        w="100%"
                        style={{
                            borderColor: active ? "#FFC100" : "gray",
                            borderWidth: 1,
                            cursor: "pointer",
                            textAlign:"start"
                        }}
                        onClick={() => {
                            let newList;
                            if (selectedProducts.includes(p.id)) {
                              newList = selectedProducts.filter((x) => x !== p.id);
                            } else {
                              newList = [...selectedProducts, p.id];
                            }
                            setSelectedProducts(newList);
                            setData("produk_ids", newList); // <--- SINKRON
                          }}

                        >
                        <Card.Section>
                            <Image src={p.foto} h={140} w="100%" fit="cover" />
                        </Card.Section>

                        <Text fw={600} mt={10}>
                            {p.nama}
                        </Text>

                        {active ? (
                            <>
                            <Text size="sm" c="dimmed" td="line-through">
                                {formatRupiah(p.harga)}
                            </Text>
                            <Group gap={4} className="text-primary-main">
                            <Text size="sm" c={"dark"} fw={700}>
                                {formatRupiah(p.harga - (data.diskon_persen * p.harga) / 100)}
                            </Text>
                            <Icon icon="iconamoon:discount" style={{ color:"##FAB12F"  }} width={24}/>
                            </Group>
                            </>
                        ) : (
                            <Text size="sm" fw={700}>
                            {formatRupiah(p.harga)}
                            </Text>
                        )}
                        </Card>
                    </Carousel.Slide>
                    );
                })}
                </Carousel>

        </Stack>

        <Group justify="center" mt={20}>
            <Button size="md" radius="md" onClick={submitPromo} loading={processing}>
            {processing ? "Menyimpan..." : "Simpan"}
            </Button>
        </Group>
        </Stack>
     </div>
  );
}

PromoIndex.layout = (page) => <DashboardLayout title="Promo">{page}</DashboardLayout>;
