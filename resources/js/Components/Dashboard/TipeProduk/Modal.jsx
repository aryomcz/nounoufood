import { Modal, TextInput, Button, Group } from "@mantine/core";
import { useEffect } from "react";
import { useForm } from "@inertiajs/react";

export default function TipeProdukModal({
  opened,
  onClose,
  mode,
  initialData,
  onSubmit,
}) {

  const form = useForm({
    id: null,
    nama: "",
  });

  // Set initial data setiap modal dibuka
  useEffect(() => {
    if (opened) {
      form.setData(initialData);
      form.clearErrors();
    }
  }, [opened, initialData]);

  const handleSubmit = () => {
    onSubmit(form);
  };

  return (
    <Modal opened={opened} onClose={onClose} centered size="sm" radius="lg"
      title={mode === "create" ? "Tambah Tipe Produk" : "Edit Tipe Produk"}
    >

      <TextInput
        label="Nama"
        placeholder="Nama tipe produk"
        value={form.data.nama}
        onChange={(e) => form.setData("nama", e.target.value)}
        mb="md"
        error={form.errors.nama}
      />

      <Group justify="center">
        <Button onClick={handleSubmit} radius="md" loading={form.processing}>
          {mode === "create" ? "Tambah" : "Update"}
        </Button>
      </Group>
    </Modal>
  );
}
