import {
  Modal,
  TextInput,
  NumberInput,
  Select,
  Checkbox,
  Button,
  Group,
  Grid,
  Stack,
  Image,
  Text,
  Textarea
} from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { useForm } from "@inertiajs/react";

export default function ProdukModal({
  opened,
  onClose,
  mode,
  initialData,
  types,
  onSubmit,
}) {

  // ⭐ Ganti useState → useForm inertia
  const defaultFormData = {
    id: null,
    nama: "",
    qty: "",
    stok: 0,
    harga: "",
    deskripsi: "",
    id_type: "",
    is_best_seller: false,
    foto: null,
  };

  const form = useForm(defaultFormData);

  const [preview, setPreview] = useState(null);
  const [mimeError, setMimeError] = useState("");

  // Prefill ketika modal dibuka
  useEffect(() => {
    if (opened) {
      form.setData(initialData || defaultFormData);
      form.clearErrors();

      // preview foto lama
      if (initialData?.foto && typeof initialData.foto === "string") {
        setPreview(initialData.foto);
      } else {
        setPreview(null);
      }
    }
  }, [opened, initialData]);

  // ========= KOMPRES GAMBAR =========
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
          const scale = maxWidth / img.width;

          canvas.width = maxWidth;
          canvas.height = img.height * scale;

          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

          canvas.toBlob(
            (blob) => {
              resolve(new File([blob], file.name, { type: file.type }));
            },
            file.type,
            0.7
          );
        };
      };
    });
  };

  // ========= DROPZONE =========
  const handleDrop = async (files) => {
    const file = files[0];
    if (!file) return;

    if (!IMAGE_MIME_TYPE.includes(file.type)) {
      setMimeError("Format hanya boleh JPG / PNG");
      return;
    }
    setMimeError("");

    const compressed = await compressImage(file);

    form.setData("foto", compressed);

    setPreview(URL.createObjectURL(compressed));
  };

  const handleSubmit = () => {
    onSubmit(form, () => {
      form.reset(); // reset form setelah submit sukses
      onClose();
    });
  };

  // Handle close modal
  const handleClose = () => {
    form.reset(); // reset form saat ditutup
    onClose();
  };

  return (
    <Modal
      opened={opened}
      onClose={handleClose}
      centered
      radius="lg"
      size="xl"
      title={mode === "create" ? "Tambah Produk" : "Edit Produk"}
    >
      <Grid justify="center">

        {/* LEFT */}
        <Grid.Col span={5}>
          <Stack gap="md">

            <TextInput
              label="Nama Produk"
              placeholder="Nama Produk"
              value={form.data.nama}
              error={form.errors.nama}
              onChange={(e) => form.setData("nama", e.target.value)}
            />

            <NumberInput
              label="Harga"
              value={form.data.harga}
              error={form.errors.harga}
              onChange={(val) => form.setData("harga", val)}
            />

            <Textarea
              label="Deskripsi"
              autosize
              value={form.data.deskripsi}
              error={form.errors.deskripsi}
              onChange={(e) => form.setData("deskripsi", e.target.value)}
            />

            <Checkbox
              label="Best Seller"
              checked={form.data.is_best_seller}
              onChange={(e) =>
                form.setData("is_best_seller", e.currentTarget.checked)
              }
            />

          </Stack>
        </Grid.Col>

        {/* MIDDLE */}
        <Grid.Col span={4}>
          <Stack gap="md">
            <NumberInput
              label="Berat (gram)"
              value={form.data.qty}
              error={form.errors.qty}
              onChange={(val) => form.setData("qty", val)}
            />

            <Select
              label="Tipe Produk"
              value={form.data.id_type?.toString() || ""}
              error={form.errors.id_type}
              data={types.map((t) => ({
                value: t.id.toString(),
                label: t.nama,
              }))}
              onChange={(val) => form.setData("id_type", val)}
            />

            <NumberInput
              label="Stok Produk"
              value={form.data.stok}
              error={form.errors.stok}
              onChange={(val) => form.setData("stok", val)}
            />
          </Stack>
        </Grid.Col>

        {/* RIGHT */}
        <Grid.Col span={3}>
          <Stack align="center" justify="center">

            {preview ? (
              <div style={{ textAlign: "center" }}>
                <Image src={preview} radius="md" mb="sm" alt="Preview" />

                <Button
                  variant="light"
                  size="xs"
                  onClick={() => {
                    form.setData("foto", null);
                    setPreview(null);
                  }}
                >
                  Ubah Gambar
                </Button>
              </div>
            ) : (
              <Stack>
                <Dropzone
                  accept={IMAGE_MIME_TYPE}
                  multiple={false}
                  onDrop={handleDrop}
                  maxSize={5 * 1024 ** 2}
                  radius="md"
                >
                  <div className="flex justify-center items-center w-full h-full">
                    <Icon icon="majesticons:camera-line" width={48} height={48} />
                  </div>
                </Dropzone>
                <Text size="sm" c="blue">Upload Foto</Text>
              </Stack>
            )}

            {mimeError && <Text c="red" size="xs">{mimeError}</Text>}
            {form.errors.foto && <Text c="red" size="xs">{form.errors.foto}</Text>}

          </Stack>
        </Grid.Col>

      </Grid>

      <Group justify="center" mt="lg">
        <Button
          onClick={handleSubmit}
          loading={form.processing}
        >
          {mode === "create" ? "Simpan" : "Update"}
        </Button>
      </Group>
    </Modal>
  );
}
