import React, { useState, useMemo, useEffect } from "react";
import { router, usePage } from "@inertiajs/react";
import {
  Table,
  Checkbox,
  TextInput,
  Button,
  Group,
  Pagination,
  Modal,
  Text,
  ActionIcon,
  Rating,
} from "@mantine/core";
import { Icon } from "@iconify/react";
import TestiModal from "./Modal";
import { notifications } from "@mantine/notifications";

export default function TableView({ testi }) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState([]);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const [formOpen, setFormOpen] = useState(false);
  const [formMode, setFormMode] = useState("create");
  const [formData, setFormData] = useState({});

 const openCreate = () => {
  setFormMode("create");
  setFormData({
    id: null,
    nama: "",
    komentar: "",
    bintang: 0
  });
  setFormOpen(true);
};


const openEdit = (item) => {
  setFormMode("edit");
  setFormData({
    id: item.id,
    nama: item.nama,
    komentar: item.komentar,
    bintang: item.bintang           // file upload baru
  });
  setFormOpen(true);
};

const { notification } = usePage().props;

useEffect(() => {
  if (notification) {
    notifications.show({
      title: notification.title,
      message: notification.message,
      color: notification.color ?? "green",
      icon: <Icon icon="material-symbols:check-circle-outline-rounded" width={24} />
    });
  }
}, [notification]);

  const submitForm = (form) => {

    if (formMode === "create") {
      form.post(route("testimoni.store"),{
       onSuccess: () => {
          setFormOpen(false);
          form.reset();
        }
      });
    } else {
      form.put(route("testimoni.update", form.data.id), {
        onSuccess: () => {
          setFormOpen(false);
        }
      });
    }
  };

  const itemsPerPage = 10;

  const filteredData = useMemo(() => {
    return testi.filter((item) =>
      item.nama.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, testi]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const toggleSelectAll = (checked) => {
    if (checked) {
      setSelected(paginatedData.map((d) => d.id));
    } else {
      setSelected([]);
    }
  };

  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleDelete = () => {
    if (selected.length === 0) return;
    setDeleteId(null);
    setConfirmOpen(true);
  };

  const confirmDelete = () => {
    const idsToDelete = deleteId ? [deleteId] : selected;

    router.delete(route("testimoni.delete"), {
      data: { ids: idsToDelete },
      onSuccess: () => {
        setSelected([]);
        setDeleteId(null);
        setConfirmOpen(false);
      },
    });
  };

  return (
    <div>
      <Group justify="end" mb="md">
        <Group>
          <TextInput
            leftSection={
              <Icon
                icon="material-symbols:search-rounded"
                width={20}
                height={20}
              />
            }
            placeholder="Cari"
            value={search}
            radius="lg"
            size="sm"
            onChange={(e) => setSearch(e.currentTarget.value)}
          />

          <Button
            color="yellow"
            leftSection={<Icon icon="ic:round-plus" width={20} height={20} />}
            onClick={openCreate}
          >
            Tambah
          </Button>
        </Group>
      </Group>

      <div className="bg-white border shadow-sm rounded-xl p-1 w-full overflow-x-auto min-w-[840px]">
        <Table highlightOnHover withColumnBorders={false} withTableBorder={false} verticalSpacing="sm">
          <Table.Thead>
            <Table.Tr>
              <Table.Th style={{ width: "5%" }}>
                <Checkbox
                  checked={
                    selected.length === paginatedData.length &&
                    paginatedData.length > 0
                  }
                  indeterminate={
                    selected.length > 0 &&
                    selected.length < paginatedData.length
                  }
                  onChange={(event) =>
                    toggleSelectAll(event.currentTarget.checked)
                  }
                />
              </Table.Th>

              <Table.Th style={{ textAlign: "center" }}>No</Table.Th>
              <Table.Th style={{ textAlign: "center" }}>Nama</Table.Th>
              <Table.Th style={{ textAlign: "center" }}>Komentar</Table.Th>
              <Table.Th style={{ textAlign: "center" }}>Bintang</Table.Th>

              <Table.Th style={{ width: "15%", textAlign: "center" }}>
                {selected.length < 2 ? (
                  "Aksi"
                ) : (
                  <ActionIcon
                    size={28}
                    radius="md"
                    color="#DD0303"
                    onClick={handleDelete}
                  >
                    <Icon icon="octicon:trash-16" width={20} height={20} />
                  </ActionIcon>
                )}
              </Table.Th>
            </Table.Tr>
          </Table.Thead>

          <Table.Tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((item, i) => (
                <Table.Tr key={item.id} className="text-center">
                  <Table.Td>
                    <Checkbox
                      checked={selected.includes(item.id)}
                      onChange={() => toggleSelect(item.id)}
                    />
                  </Table.Td>

                  <Table.Td>{(page - 1) * itemsPerPage + i + 1}</Table.Td>
                  <Table.Td>{item.nama}</Table.Td>
                  <Table.Td>{item.komentar}</Table.Td>
                  <Table.Td>
                    <Group justify="center">
                        <Rating value={item.bintang} />
                    </Group>
                    </Table.Td>
                  <Table.Td>
                    {selected.length < 2 && (
                      <Group gap="xs" justify="center">
                        <ActionIcon
                          size={28}
                          radius="md"
                          color="blue"
                          onClick={() => openEdit(item)}
                        >
                          <Icon icon="mdi:open-in-new" width={20} height={20} />
                        </ActionIcon>

                        <ActionIcon
                          size={28}
                          radius="md"
                          color="#DD0303"
                          onClick={() => {
                            setDeleteId(item.id);
                            setConfirmOpen(true);
                          }}
                        >
                          <Icon icon="octicon:trash-16" width={20} height={20} />
                        </ActionIcon>
                      </Group>
                    )}
                  </Table.Td>
                </Table.Tr>
              ))
            ) : (
              <Table.Tr>
                <Table.Td colSpan={7} align="center">
                  <Text c="dimmed" ta="center">
                    Tidak ada data tetsimoni.
                  </Text>
                </Table.Td>
              </Table.Tr>
            )}
          </Table.Tbody>
        </Table>

        {totalPages > 1 && (
          <Group justify="center" mt="md">
            <Pagination value={page} onChange={setPage} total={totalPages} />
          </Group>
        )}
      </div>

      {/* Modal Konfirmasi Hapus */}
      <Modal
        opened={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        top={true}
        size="xs"
        radius="lg"
        withCloseButton={false}
      >
        <Text size="sm" mb="md">
          Apakah kamu yakin ingin menghapus{" "}
          <strong>{deleteId ? 1 : selected.length}</strong> data ini?
        </Text>

        <Group justify="center">
          <Button
            variant="light"
            radius="md"
            size="sm"
            color="#3D42DF"
            onClick={() => setConfirmOpen(false)}
          >
            Tidak
          </Button>

          <Button
            variant="light"
            radius="md"
            size="sm"
            color="#DD0303"
            onClick={confirmDelete}
          >
            Iya
          </Button>
        </Group>
      </Modal>

      {/* Modal Form */}
      <TestiModal
        opened={formOpen}
        onClose={() => 
        {
          setFormOpen(false)
        }
        }
        mode={formMode}
        initialData={formData}
        onSubmit={submitForm}
      />
    </div>
  );
}
