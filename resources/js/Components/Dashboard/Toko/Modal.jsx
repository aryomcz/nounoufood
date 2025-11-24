import { useForm } from "@inertiajs/react";
import { Modal, TextInput, Button, Group, Textarea, Grid } from "@mantine/core";
import { useEffect, useState } from "react";

export default function TokoModal({
  opened,
  onClose,
  mode,        // "create" atau "edit"
  initialData, // { id, pertanyaan }
  onSubmit
}) {

  const form = useForm({ id: null, nama: "", alamat: "", url_map:"", url_map_embed:"" });

  // Set data saat modal dibuka
  useEffect(() => {
    if (opened) {
      form.setData(initialData);
      form.clearErrors();
    }
  }, [opened, initialData]);

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      centered
      size="lg"
      radius="lg"
      title={mode === "create" ? "Tambah Toko" : "Edit Toko"}
    >
        <Grid>
            <Grid.Col span={6}>
                <TextInput
                    label="Nama Toko"
                    placeholder="Nama Toko"
                    value={form.data.nama}
                    onChange={(e) => form.setData("nama", e.target.value)}
                    mb="md"
                    error={form.errors.nama}
                />
            </Grid.Col>
            <Grid.Col span={6}>
                <Textarea
                    autosize
                    label="Alamat"
                    placeholder="Alamat"
                    value={form.data.alamat}
                    onChange={(e) => form.setData("alamat", e.target.value)}
                    mb="md"
                    error={form.errors.alamat}
                />
            </Grid.Col>
            <Grid.Col span={6}>
                <Textarea
                    label="Url Google Map"
                    autosize
                    placeholder="Url Google Map"
                    value={form.data.url_map}
                    onChange={(e) => form.setData("url_map", e.target.value)}
                    mb="md"
                    error={form.errors.url_map}
                    />
            </Grid.Col>
            <Grid.Col span={6}>
                <Textarea
                    label="Url Google Map Embed"
                    autosize
                    placeholder="Url Google Map Embed"
                    value={form.data.url_map_embed}
                    onChange={(e) => form.setData("url_map_embed", e.target.value)}
                    mb="md"
                    error={form.errors.url_map_embed}
                />
            </Grid.Col>
        </Grid>


      <Group justify="center">
        
        <Button onClick={() => onSubmit(form)} radius="md" loading={form.processing}>
          {mode === "create" ? "Tambah" : "Update"}
        </Button>
      </Group>
    </Modal>
  );
}
