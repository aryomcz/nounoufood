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
import { router, useForm } from "@inertiajs/react";

export default function CompanyIndex({company}) {

 // ubah value input (string/number/Date/null) menjadi Date valid
const toDateYear = (value) => {
  if (!value) return null;

  if (value instanceof Date) return value;

  const y = Number(value);
  if (!isNaN(y)) return new Date(y, 0, 1);

  return null;
};

// ubah Date → number (YYYY)
const toYearNumber = (value) => {
  return value?.split("-")[0];
};

 const { data, setData, post, processing, transform, errors } = useForm({
  sejarah: company?.sejarah || "",
  tahun_berdiri: `${(company?.tahun_berdiri)}-11-11`,   // ← aman
  visi: company?.visi || "",
  misi: company?.misi || "",
  email: company?.email || "",
  no_hp: company?.no_hp || "",
  tiktok: company?.tiktok || "",
  shopee: company?.shopee || "",
  foto: null,
});

  transform((data) => ({
    ...data,
    tahun_berdiri: toYearNumber(data.tahun_berdiri), // ← aman juga
  }));
  

  const [preview, setPreview] = useState(company?.foto || null);
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

  
  useEffect(() => {
    setPreview(company?.foto || null);
  }, [company]);

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
 const submitCompany = () => {
  post(route("company.store"), {
    forceFormData: true, // WAJIB karena ada file
    preserveScroll: true,
  });
};

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
                    setData("foto", null)
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
            <Textarea
                label="Sejarah"
                autosize
                placeholder="Sejarah Perusahaan"
                value={data.sejarah}
                onChange={(e) => setData("sejarah", e.target.value)}
                error={errors.sejarah}
            />
            </Grid.Col>

            <Grid.Col span={6}>
                
          <YearPickerInput
            label="Tahun Berdiri"
            placeholder="Pilih tahun"
            value={data.tahun_berdiri}
            onChange={(val) => setData("tahun_berdiri", val)}
            error={errors.tahun_berdiri}
            clearable
          />


            </Grid.Col>

            <Grid.Col span={6}>
             <Textarea
                label="Visi"
                autosize
                placeholder="Visi Perusahaan"
                value={data.visi}
                onChange={(e) => setData("visi", e.target.value)}
                error={errors.visi}
            />
            </Grid.Col>

            <Grid.Col span={6}>
             <Textarea
                label="Misi"
                autosize
                placeholder="Misi Perusahaan"
                value={data.misi}
                onChange={(e) => setData("misi", e.target.value)}
                error={errors.misi}
            />
            </Grid.Col>

            <Grid.Col span={6}>
            <TextInput
                label="Email"
                value={data.email}
                placeholder="Email Perusahaan"
                onChange={(e) => setData("email", e.target.value)}
                error={errors.email}
            />
            </Grid.Col>

            <Grid.Col span={6}>
            <TextInput
                label="WA Admin"
                placeholder="No HP Admin"
                value={data.no_hp}
                onChange={(e) => setData("no_hp", e.target.value)}
                error={errors.no_hp}
            />
            </Grid.Col>

            <Grid.Col span={6}>
            <TextInput
                label="Link Tiktok"
                placeholder="Tiktok"
                value={data.tiktok}
                onChange={(e) => setData("tiktok", e.target.value)}
                error={errors.tiktok}
            />
            </Grid.Col>

            <Grid.Col span={6}>
            <TextInput
                label="Link Shopee"
                placeholder="Shopee"
                value={data.shopee}
                onChange={(e) => setData("shopee", e.target.value)}
                error={errors.tiktok}
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
