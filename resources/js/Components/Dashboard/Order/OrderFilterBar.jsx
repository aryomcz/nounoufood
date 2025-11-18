import { useState } from "react";
import { Popover, Button, Group, Text, Badge } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { Icon } from "@iconify/react";
import dayjs from "dayjs";
import "dayjs/locale/id";
import "@mantine/dates/styles.css";

export default function OrderFilterBar({ onFilterChange, onReset }) {
  const [openedDate, setOpenedDate] = useState(false);
  const [openedStatus, setOpenedStatus] = useState(false);
  const [dateRange, setDateRange] = useState([null, null]);
  const [selectedStatus, setSelectedStatus] = useState([]);

  const statusOptions = [
    { label: "Batal", color: "red", id:0 },
    { label: "Terbayar", color: "teal", id:1 },
    { label: "Menunggu", color: "yellow", id:2 },
  ];

  const toggleStatus = (status) => {
    setSelectedStatus((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status]
    );
  };

  const applyFilter = () => {
    setOpenedDate(false);
    setOpenedStatus(false);
    onFilterChange?.({ dateRange, selectedStatus });
  };

  const resetFilter = () => {
    setDateRange([null, null]);
    setSelectedStatus([]);
    onReset?.();
  };

  const formatDate = (d) => {
    if (!d) return null;
    return dayjs(d).locale("id").format("DD MMMM YYYY");
  };

  return (
    <Group
      justify="space-between"
      className="bg-[#F9F9FB] shadow-sm border rounded-full px-3 py-2 w-fit"
      wrap="nowrap"
    >
      <Group gap="xs">
        <Icon icon="majesticons:filter-line" width={20} height={20} />
        <Text fw={500}>Filter By</Text>

        {/* FILTER TANGGAL */}
        <Popover
          width={320}
          position="bottom-start"
          shadow="md"
          radius="lg"
          opened={openedDate}
          onChange={setOpenedDate}
        >
          <Popover.Target>
            <Button
              variant="subtle"
              color="dark"
              rightSection={<Icon icon="mdi:chevron-down" width={16} height={16} />}
              onClick={() => {
                setOpenedDate((o) => !o);
                setOpenedStatus(false);
              }}
            >
              {dateRange[0] && dateRange[1]
                ? `${formatDate(dateRange[0])} - ${formatDate(dateRange[1])}`
                : "Tanggal"}
            </Button>
          </Popover.Target>

          <Popover.Dropdown>
            <DatePicker
              type="range"
              value={dateRange}
              onChange={setDateRange}
              locale="id"
              size="md"
              radius="md"
              withCellSpacing={false}
            />
            <div style={{ textAlign: "center", marginTop: 12 }}>
              <Text size="sm" c="dimmed">
                Pilih rentang tanggal
              </Text>
              <Button fullWidth mt="xs" color="blue" radius="md" onClick={applyFilter}>
                Terapkan
              </Button>
            </div>
          </Popover.Dropdown>
        </Popover>

        {/* FILTER STATUS PESANAN */}
        <Popover
          width={300}
          position="bottom-start"
          shadow="md"
          radius="lg"
          opened={openedStatus}
          onChange={setOpenedStatus}
        >
          <Popover.Target>
            <Button
              variant="subtle"
              color="dark"
              rightSection={<Icon icon="mdi:chevron-down" width={16} height={16} />}
              onClick={() => {
                setOpenedStatus((o) => !o);
                setOpenedDate(false);
              }}
            >
              Status Pesanan
            </Button>
          </Popover.Target>

          <Popover.Dropdown>
            <Text fw={500} mb="xs">
              Pilih Status Pesanan
            </Text>
            <Group gap="xs" mb="md">
              {statusOptions.map((s) => (
                <Badge
                  key={s.id}
                  color={selectedStatus.includes(s.id) ? s.color : "gray"}
                  variant={selectedStatus.includes(s.id) ? "light" : "outline"}
                  radius="md"
                  onClick={() => toggleStatus(s.id)}
                  style={{ cursor: "pointer" }}
                >
                  {s.label}
                </Badge>
              ))}
            </Group>
            <Text size="sm" c="dimmed" ta="center">
              Kamu bisa memilih lebih dari 1 status
            </Text>
            <Button fullWidth mt="xs" color="blue" radius="md" onClick={applyFilter}>
              Simpan
            </Button>
          </Popover.Dropdown>
        </Popover>
      <Button
        variant="subtle"
        color="red"
        leftSection={<Icon icon="ri:reset-left-fill" width={20} height={20} />}
        onClick={resetFilter}
      >
        Reset Filter
      </Button>
      </Group>
    </Group>
  );
}
