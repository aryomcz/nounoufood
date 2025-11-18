import { Modal, TextInput, Button, Group } from "@mantine/core";
import { useEffect, useState } from "react";

export default function TipeProdukModal({
  opened,
  onClose,
  mode,        // "create" atau "edit"
  initialData, // { id, nama }
  onSubmit,
  errors    // function(data)
}) {

  const [form, setForm] = useState({
    id: null,
    nama: "",
  });

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
      size="sm"
      radius="lg"
      title={mode === "create" ? "Tambah Tipe Produk" : "Edit Tipe Produk"}
    >
      <TextInput
        label="Nama"
        placeholder="Nama tipe produk"
        value={form.nama}
        onChange={(e) => setForm({ ...form, nama: e.currentTarget.value })}
        mb="md"
        error={errors.nama}
      />

      <Group justify="center">
        {/* <Button variant="light" onClick={onClose}>
          Batal
        </Button> */}

        <Button onClick={() => onSubmit(form)} radius="md">
          {mode === "create" ? "Tambah" : "Update"}
        </Button>
      </Group>
    </Modal>
  );
}
