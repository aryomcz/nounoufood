import { Modal, TextInput, Button, Group, Textarea } from "@mantine/core";
import { useEffect, useState } from "react";

export default function FAQModal({
  opened,
  onClose,
  mode,        // "create" atau "edit"
  initialData, // { id, pertanyaan }
  onSubmit,
  errors    // function(data)
}) {

  const [form, setForm] = useState({
    id: null,
    pertanyaan: "",
    jawaban: "",
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
      title={mode === "create" ? "Tambah FAQ" : "Edit FAQ"}
    >
      <Textarea
        label="Pertanyaan"
        placeholder="Pertanyaan"
        value={form.pertanyaan}
        onChange={(e) => setForm({ ...form, pertanyaan: e.currentTarget.value })}
        mb="md"
        error={errors.pertanyaan}
      />

      <Textarea
        label="Jawaban"
        placeholder="Jawaban"
        value={form.jawaban}
        onChange={(e) => setForm({ ...form, jawaban: e.currentTarget.value })}
        mb="md"
        error={errors.jawaban}
      />

      <Group justify="center">
        
        <Button onClick={() => onSubmit(form)} radius="md">
          {mode === "create" ? "Tambah" : "Update"}
        </Button>
      </Group>
    </Modal>
  );
}
