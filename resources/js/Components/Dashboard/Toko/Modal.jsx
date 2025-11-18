import { Modal, TextInput, Button, Group, Textarea, Grid } from "@mantine/core";
import { useEffect, useState } from "react";

export default function TokoModal({
  opened,
  onClose,
  mode,        // "create" atau "edit"
  initialData, // { id, pertanyaan }
  onSubmit,
  errors    // function(data)
}) {

  const [form, setForm] = useState({ id: null, nama: "", alamat: "", url_map:"", url_map_embed:"" });

  // Set data saat modal dibuka
  useEffect(() => {
    if (opened) {
      setForm(initialData);
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
                    label="Pertanyaan"
                    placeholder="Pertanyaan"
                    value={form.nama}
                    onChange={(e) => setForm({ ...form, nama: e.currentTarget.value })}
                    mb="md"
                    error={errors.nama}
                />
            </Grid.Col>
            <Grid.Col span={6}>
                <Textarea
                    label="Alamat"
                    placeholder="Alamat"
                    value={form.alamat}
                    onChange={(e) => setForm({ ...form, alamat: e.currentTarget.value })}
                    mb="md"
                    error={errors.alamat}
                />
            </Grid.Col>
            <Grid.Col span={6}>
                <Textarea
                    label="Url Google Map"
                    placeholder="Url Google Map"
                    value={form.url_map}
                    onChange={(e) => setForm({ ...form, url_map: e.currentTarget.value })}
                    mb="md"
                    error={errors.url_map}
                    />
            </Grid.Col>
            <Grid.Col span={6}>
                <Textarea
                    label="Url Google Map Embed"
                    placeholder="Url Google Map Embed"
                    value={form.url_map_embed}
                    onChange={(e) => setForm({ ...form, url_map_embed: e.currentTarget.value })}
                    mb="md"
                    error={errors.url_map_embed}
                />
            </Grid.Col>
        </Grid>


      <Group justify="center">
        
        <Button onClick={() => onSubmit(form)} radius="md">
          {mode === "create" ? "Tambah" : "Update"}
        </Button>
      </Group>
    </Modal>
  );
}
