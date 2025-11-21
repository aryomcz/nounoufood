import { useForm } from "@inertiajs/react";
import { Modal, TextInput, Button, Group, Rating, Textarea, Text } from "@mantine/core";
import { useEffect, useState } from "react";

export default function TipeProdukModal({
  opened,
  onClose,
  mode,        // "create" atau "edit"
  initialData, // { id, nama }
  onSubmit,
}) {

  const form = useForm({
    id: null,
    nama: "",
    komentar: "",
    bintang: 0,
  });

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
      size="sm"
      radius="lg"
      title={mode === "create" ? "Tambah Testimoni" : "Edit Testimoni"}
    >
      <TextInput
        label="Nama"
        placeholder="Nama Testimoni"
        value={form.data.nama}
        onChange={(e) => form.setData("nama", e.currentTarget.value)}
        mb="md"
        error={form.errors.nama}
      />

      <Textarea 
        label="Komentar"
        placeholder="Komentar Testimoni"
        value={form.data.komentar}
        onChange={(e) => form.setData("komentar", e.currentTarget.value)}
        mb="md"
        error={form.errors.komentar}></Textarea>

        <Text size="sm">Bintang</Text>
        <Rating onError={form.errors.bintang} value={form.data.bintang} onChange={(val) => form.setData("bintang", val)} />

        <Group justify="center" mt={20}>
        
        <Button onClick={() => onSubmit(form)} radius="md" loading={form.processing}>
          {mode === "create" ? "Tambah" : "Update"}
        </Button>
      </Group>
    </Modal>
  );
}
