import { Modal, TextInput, Button, Group, Select } from "@mantine/core";
import { useEffect } from "react";
import { useForm } from "@inertiajs/react";

export default function HalalModal({
  opened,
  onClose,
  mode,
  initialData,
  produk,
  onSubmit,
}) {

  // Form default
  const defaultFormData = { id: null, no_sertifikasi: "", id_produk: "" };

  const form = useForm(defaultFormData);

  // Reset form ke initialData saat modal dibuka
  useEffect(() => {
    if (opened) {
      form.setData(initialData || defaultFormData);
      form.clearErrors();
    }
  }, [opened, initialData]);

  // Handle submit
  const handleSubmit = () => {
    onSubmit(form, () => {
      form.reset(); // reset form setelah submit sukses
      onClose();
    });
  };

  // Handle close modal
  const handleClose = () => {
    form.reset(); // reset form saat ditutup
    onClose();
  };

  return (
    <Modal
      opened={opened}
      onClose={handleClose}
      centered
      size="sm"
      radius="lg"
      title={mode === "create" ? "Tambah Nomor Sertifikasi" : "Edit Nomor Sertifikasi"}
    >
      <TextInput
        label="Nomor Sertifikasi Halal"
        placeholder="Nomor Sertifikasi"
        value={form.data.no_sertifikasi}
        onChange={(e) => form.setData("no_sertifikasi", e.target.value)}
        mb="md"
        error={form.errors.no_sertifikasi}
      />

      <Select
        label="Produk"
        value={form.data.id_produk?.toString() || ""}
        error={form.errors.id_produk}
        data={produk.map((t) => ({
          value: t.id.toString(),
          label: t.nama,
        }))}
        onChange={(val) => form.setData("id_produk", val)}
      />

      <Group mt="md" justify="center">
        <Button onClick={handleSubmit} radius="md" loading={form.processing}>
          {mode === "create" ? "Tambah" : "Update"}
        </Button>
      </Group>
    </Modal>
  );
}
