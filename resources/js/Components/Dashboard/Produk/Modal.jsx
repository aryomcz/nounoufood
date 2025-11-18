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
import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";


export default function ProdukModal({
  opened,
  onClose,
  mode, // "create" | "edit"
  initialData,
  types,
  onSubmit,
  errors,
}) {
  const [form, setForm] = useState({
    id: null,
    nama: "",
    qty: "",
    harga: "",
    deskripsi: "",
    id_type: "",
    is_best_seller: false,
    foto: null,
  });

  const [preview, setPreview] = useState(null);
  const [mimeError, setMimeError] = useState("");

  // ========= PREFILL DATA EDIT =========
  useEffect(() => {
    if (opened) {
      setForm(initialData);

      // jika foto dari database → tampilkan URL
      if (initialData?.foto && typeof initialData.foto === "string") {
        setPreview(initialData.foto);
      } else {
        setPreview(null);
      }
    }
  }, [opened, initialData]);

  // ========= COMPRESS IMAGE =========
  const compressImage = async (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = (event) => {
        const img = new window.Image(); // FIX: gunakan window.Image
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
              resolve(new File([blob], file.name, { type: file.type }));
            },
            file.type,
            0.7
          );
        };
      };
    });
  };

  // ========= HANDLE DROPZONE =========
  const handleDrop = async (files) => {
    console.log('filee');
    
    const file = files[0];
    if (!file) return;

    // MIME validation
    if (!IMAGE_MIME_TYPE.includes(file.type)) {
      setMimeError("Format hanya boleh JPG / PNG");
      return;
    }
    setMimeError("");

    const compressed = await compressImage(file);

    setForm({ ...form, foto: compressed });
    console.log(form);
    
    setPreview(URL.createObjectURL(compressed)); // show preview
  };

  // ========= RESET MODAL =========
  const closeModal = () => {
    setPreview(null);
    setMimeError("");
    onClose();
  };
  

  return (
    <Modal
      opened={opened}
      onClose={closeModal}
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
              value={form.nama}
              error={errors?.nama}
              onChange={(e) => setForm({ ...form, nama: e.target.value })}
            />

            <NumberInput
              label="Harga"
              placeholder="Harga"
              value={form.harga}
              error={errors?.harga}
              onChange={(val) => setForm({ ...form, harga: val })}
            />

            <Textarea 
              label="Deskripsi"
              placeholder="Deskripsi Barang"
              value={form.deskripsi}
              error={errors?.deskripsi}
              onChange={(val) => setForm({ ...form, deskripsi:val.currentTarget.value})}
            />

            <Checkbox
              label="Best Seller"
              checked={form.is_best_seller}
              onChange={(e) =>
                setForm({ ...form, is_best_seller: e.currentTarget.checked })
              }
            />

          </Stack>
        </Grid.Col>

        {/* MIDDLE */}
        <Grid.Col span={4}>
          <Stack gap="md">

            <NumberInput
              label="Berat (gram)"
              placeholder="Berat"
              value={form.qty}
              error={errors?.qty}
              onChange={(val) => setForm({ ...form, qty: val })}
            />

            <Select
              label="Tipe Produk"
              placeholder="Pilih tipe"
              data={types.map((t) => ({
                value: t.id.toString(),
                label: t.nama,
              }))}
              value={form.id_type?.toString() || ""}
              error={errors?.id_type}
              onChange={(val) => setForm({ ...form, id_type: val })}
            />

          </Stack>
        </Grid.Col>

        {/* RIGHT (DROPZONE) */}
        <Grid.Col span={3}>
          <Stack align="center" justify="center" className="w-full h-full">
            {preview ? (
              <div style={{ textAlign: "center" }}>
                <Image src={preview} radius="md" mb="sm" alt="Preview" />

                <Button
                  variant="light"
                  size="xs"
                  onClick={() => {
                    setPreview(null);
                    setForm({ ...form, foto: null });
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
                acceptColor="gray"
              >
                <div className="flex justify-center items-center w-full h-full">
                <Icon icon="majesticons:camera-line" width={48} height={48}/>
                </div>
              </Dropzone>
              <Text size="sm" c="blue">Upload Foto</Text>
              </Stack>
            )}

            {mimeError && (
              <Text c="red" size="xs">{mimeError}</Text>
            )}

            {errors?.foto && (
              <Text c="red" size="xs">{errors.foto}</Text>
            )}

          </Stack>
        </Grid.Col>

      </Grid>

      <Group justify="center" mt="lg">
        <Button onClick={() => onSubmit(form)}>
          {mode === "create" ? "Simpan" : "Update"}
        </Button>
      </Group>
    </Modal>
  );
}
