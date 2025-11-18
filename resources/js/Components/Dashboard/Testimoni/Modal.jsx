import { Modal, TextInput, Button, Group, Rating, Textarea, Text } from "@mantine/core";
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
    komentar: "",
    bintang: 0,
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
      title={mode === "create" ? "Tambah Testimoni" : "Edit Testimoni"}
    >
      <TextInput
        label="Nama"
        placeholder="Nama Testimoni"
        value={form.nama}
        onChange={(e) => setForm({ ...form, nama: e.currentTarget.value })}
        mb="md"
        error={errors.nama}
      />

      <Textarea 
        label="Komentar"
        placeholder="Komentar Testimoni"
        value={form.komentar}
        onChange={(e) => setForm({ ...form, komentar: e.currentTarget.value })}
        mb="md"
        error={errors.komentar}></Textarea>

        <Text size="sm">Bintang</Text>
      <Rating onError={errors.bintang} value={form.bintang} onChange={(val) => setForm({ ...form, bintang: val })} />

      <Group justify="center" mt={20}>
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
