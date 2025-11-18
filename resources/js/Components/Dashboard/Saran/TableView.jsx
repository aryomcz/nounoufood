import React, { useState, useMemo } from "react";
import { router } from "@inertiajs/react";
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
} from "@mantine/core";
import { Icon } from "@iconify/react";

export default function TableView({ saran }) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState([]);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const itemsPerPage = 10;

  const filteredData = useMemo(() => {
    return saran.filter((item) =>
      item.saran.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, saran]);

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

    router.delete(route("advice.delete"), {
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
      </Group>

      <div className="bg-white border shadow-sm rounded-xl p-1">
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

              <Table.Th>No</Table.Th>
              <Table.Th>Nama</Table.Th>
              <Table.Th>Saran</Table.Th>

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
                <Table.Tr key={item.id}>
                  <Table.Td>
                    <Checkbox
                      checked={selected.includes(item.id)}
                      onChange={() => toggleSelect(item.id)}
                    />
                  </Table.Td>
                  <Table.Td>{(page - 1) * itemsPerPage + i + 1}</Table.Td>
                  <Table.Td>{item.user.nama}</Table.Td>
                  <Table.Td>{item.saran}</Table.Td>
                   <Table.Td>
                                      {selected.length < 2 && (
                                        <Group justify="center">
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
                    Tidak ada data saran.
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
    </div>
  );
}
