import { useForm } from "@inertiajs/react";
import { Modal, TextInput, Button, Group, Textarea } from "@mantine/core";
import { useEffect, useState } from "react";

export default function FAQModal({
  opened,
  onClose,
  mode,        // "create" atau "edit"
  initialData, // { id, pertanyaan }
  onSubmit,
}) {

  const form = useForm({
    id: null,
    pertanyaan: "",
    jawaban: "",
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
      title={mode === "create" ? "Tambah FAQ" : "Edit FAQ"}
    >
      <Textarea
        label="Pertanyaan"
        placeholder="Pertanyaan"
        value={form.data.pertanyaan}
        onChange={(e) =>  form.setData("pertanyaan", e.currentTarget.value )}
        mb="md"
        error={form.errors.pertanyaan}
      />

      <Textarea
        label="Jawaban"
        placeholder="Jawaban"
        value={form.data.jawaban}
        onChange={(e) => form.setData("jawaban", e.currentTarget.value )}
        mb="md"
        error={form.errors.jawaban}
      />

      <Group justify="center">
        
        <Button onClick={() => onSubmit(form)} radius="md" loading={form.processing}>
          {mode === "create" ? "Tambah" : "Update"}
        </Button>
      </Group>
    </Modal>
  );
}
