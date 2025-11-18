// CompanyIndex.jsx
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
} from "@mantine/core";
import { DatePickerInput, YearPickerInput } from "@mantine/dates";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { Icon } from "@iconify/react";
import { router } from "@inertiajs/react";

export default function CompanyIndex({data}) {
  // --- form state (dates stored as Date objects) ---
  const [form, setForm] = useState({
    sejarah: data?.sejarah || "",
    tahun_berdiri: data?.tahun_berdiri ? new Date(data.tahun_berdiri, 0, 1) : null,
    visi: data?.visi || "",
    misi: data?.misi || "",
    email: data?.email || "",
    no_hp: data?.no_hp || "",
    tiktok: data?.tiktok || "",
    shopee: data?.shopee || "",
    foto: null,
});


  const [preview, setPreview] = useState(data?.foto || null);
  const [mimeError, setMimeError] = useState("");
  const [errors, setErrors] = useState({});
  const [processing, setProcessing] = useState(false);

  // --- helper to show error message (handles array or string) ---
  const getError = (field) => {
    if (!errors) return null;
    const val = errors[field];
    if (!val) return null;
    return Array.isArray(val) ? val[0] : val;
  };

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
    setForm((prev) => ({ ...prev, foto: compressed }));

    // revoke previous preview if it was a blob URL
    if (preview && preview.startsWith("blob:")) {
      URL.revokeObjectURL(preview);
    }
    setPreview(URL.createObjectURL(compressed));
  };

  
  useEffect(() => {
    setPreview(data?.foto || null);
  }, [data]);

  // cleanup preview URL on unmount
  useEffect(() => {
    return () => {
      if (preview && preview.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  // --- submit ---
  const submitCompany = useCallback(() => {
    setErrors({});
    setProcessing(true);
    const formData = new FormData();
    formData.append("sejarah", form.sejarah);
    formData.append(
        "tahun_berdiri",
        form.tahun_berdiri ? form.tahun_berdiri.getFullYear() : ""
    );

    formData.append("visi", form.visi);
    formData.append("misi", form.misi);
    formData.append("email", form.email);
    formData.append("no_hp", form.no_hp);
    formData.append("tiktok", form.tiktok);
    formData.append("shopee", form.shopee);

    if (form.foto) {
      formData.append("foto", form.foto);
    }

    router.post(route("company.store"), formData, {
      forceFormData: true,
      preserveScroll: true,
      onStart: () => setProcessing(true),
      onSuccess: () => {
        setProcessing(false);
        // optionally you can redirect or show toast; backend may redirect
      },
      onError: (errs) => {
        // errs is the validation object from Laravel (422)
        setErrors(errs || {});
        setProcessing(false);
      },
      onFinish: () => {
        setProcessing(false);
      },
    });
  }, [form]);
  

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
                    setForm((prev) => ({ ...prev, foto: null }));
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
            {getError("foto") && (
            <Text c="red" size="xs">
                {getError("foto")}
            </Text>
            )}
        </Stack>

        {/* FORM */}
        <Grid>
            <Grid.Col span={6}>
            <Textarea
                label="Sejarah"
                placeholder="Sejarah Perusahaan"
                value={form.sejarah}
                onChange={(e) => setForm((prev) => ({ ...prev, sejarah: e.target.value }))}
                error={getError("sejarah")}
            />
            </Grid.Col>

            <Grid.Col span={6}>
                
           <YearPickerInput
            label="Tahun Berdiri"
            placeholder="Pilih tahun"
            value={form.tahun_berdiri}
            onChange={(val) =>
                setForm((prev) => ({
                ...prev,
                tahun_berdiri: val, // simpan Date object
                }))
            }
            error={getError("tahun_berdiri")}
            />

            </Grid.Col>

            <Grid.Col span={6}>
             <Textarea
                label="Visi"
                placeholder="Visi Perusahaan"
                value={form.visi}
                onChange={(e) => setForm((prev) => ({ ...prev, visi: e.target.value }))}
                error={getError("visi")}
            />
            </Grid.Col>

            <Grid.Col span={6}>
             <Textarea
                label="Misi"
                placeholder="Misi Perusahaan"
                value={form.misi}
                onChange={(e) => setForm((prev) => ({ ...prev, misi: e.target.value }))}
                error={getError("misi")}
            />
            </Grid.Col>

            <Grid.Col span={6}>
            <TextInput
                label="Email"
                value={form.email}
                placeholder="Email Perusahaan"
                onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                error={getError("email")}
            />
            </Grid.Col>

            <Grid.Col span={6}>
            <TextInput
                label="WA Admin"
                placeholder="No HP Admin"
                value={form.no_hp}
                onChange={(e) => setForm((prev) => ({ ...prev, no_hp: e.target.value }))}
                error={getError("no_hp")}
            />
            </Grid.Col>

            <Grid.Col span={6}>
            <TextInput
                label="Link Tiktok"
                placeholder="Tiktok"
                value={form.tiktok}
                onChange={(e) => setForm((prev) => ({ ...prev, tiktok: e.target.value }))}
                error={getError("tiktok")}
            />
            </Grid.Col>

            <Grid.Col span={6}>
            <TextInput
                label="Link Shopee"
                placeholder="Shopee"
                value={form.shopee}
                onChange={(e) => setForm((prev) => ({ ...prev, shopee: e.target.value }))}
                error={getError("shopee")}
            />
            </Grid.Col>
        </Grid>
        <Group justify="center" mt={20}>
            <Button size="md" radius="md" onClick={submitCompany} disabled={processing}>
            {processing ? "Menyimpan..." : "Simpan"}
            </Button>
        </Group>
        </Stack>
     </div>
  );
}

CompanyIndex.layout = (page) => <DashboardLayout title="Company Profile">{page}</DashboardLayout>;
