import React, { useState } from "react";
import {
  Table,
  Badge,
  Text,
  Button,
  ActionIcon,
  Popover,
  Stack,
} from "@mantine/core";
import { Icon } from "@iconify/react";
import dayjs from "dayjs";
import "dayjs/locale/id";
import { router } from "@inertiajs/react";
import { notifications } from "@mantine/notifications";

const formatRupiah = (num) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(num || 0);

export default function TableView({ data = [] }) {
  const [expanded, setExpanded] = useState({});
  const [opened, setOpened] = useState(null); // simpan ID order yang sedang buka popup

  const toggleExpand = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleChangeStatus = (orderId, status) => {
    router.patch(
      `/dashboard/orders/${orderId}/status`,
      { status },
      {
        preserveScroll: true,
        onSuccess: (page) => {
          setOpened(null);
                  const notif = page.props.notification;
                   notifications.show({
                    title: notif.title,
                    message: notif.message,
                    color: notif.color ?? "green",
                    icon: <Icon icon="material-symbols:check-circle-outline-rounded" width={24} />
                  });
        },
      }
    );
  };

  return (
    <div className="bg-white border shadow-sm rounded-xl p-1 w-full overflow-x-auto min-w-[840px]">
      <Table highlightOnHover withColumnBorders={false}
  withTableBorder={false}
 verticalSpacing="sm">
        <Table.Thead bg="#FCFDFD">
          <Table.Tr>
            <Table.Th>No</Table.Th>
            <Table.Th>Nama</Table.Th>
            <Table.Th>Alamat</Table.Th>
            <Table.Th>Tanggal</Table.Th>
            <Table.Th>No Telp</Table.Th>
            <Table.Th>Status</Table.Th>
            <Table.Th style={{ width: "5%" }}></Table.Th>
          </Table.Tr>
        </Table.Thead>

        <Table.Tbody>
          {data.length > 0 ? (
            data.map((order, index) => (
              <React.Fragment key={order.id}>
                <Table.Tr>
                  <Table.Td>{index + 1}</Table.Td>
                  <Table.Td>{order.user?.nama}</Table.Td>
                  <Table.Td>{order.user?.alamat}</Table.Td>
                  <Table.Td>
                    {dayjs(order.created_at || order.tanggal)
                      .locale("id")
                      .format("DD MMM YYYY")}
                  </Table.Td>
                  <Table.Td>{order.user?.no_hp}</Table.Td>

                  {/* === Badge jadi trigger Popover === */}
                  <Table.Td>
                    <Popover
                      opened={opened === order.id}
                      onChange={(o) => setOpened(o ? order.id : null)}
                      width={150}
                      position="left-end"
                      withArrow
                      shadow="md"
                      radius="lg"
                    >
                      <Popover.Target>
                        <Badge
                          color={
                            order.status === 1
                              ? "teal"
                              : order.status === 2
                              ? "yellow"
                              : "red"
                          }
                          variant="light"
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            setOpened(opened === order.id ? null : order.id)
                          }
                        >
                          {order.status === 1
                            ? "Terbayar"
                            : order.status === 2
                            ? "Menunggu"
                            : "Batal"}
                        </Badge>
                      </Popover.Target>

                      <Popover.Dropdown>
                        <Stack>
                          <Button
                            variant="light"
                            color="teal"
                            onClick={() => handleChangeStatus(order.id, 1)}
                          >
                            Terbayar
                          </Button>
                          <Button
                            variant="light"
                            color="yellow"
                            onClick={() => handleChangeStatus(order.id, 2)}
                          >
                            Menunggu
                          </Button>
                          <Button
                            variant="light"
                            color="red"
                            onClick={() => handleChangeStatus(order.id, 0)}
                          >
                            Batal
                          </Button>
                        </Stack>
                      </Popover.Dropdown>
                    </Popover>
                  </Table.Td>

                  <Table.Td style={{ width: "40px" }}>
                    <ActionIcon
                      variant="subtle"
                      color="black"
                      onClick={() => toggleExpand(order.id)}
                    >
                      {expanded[order.id] ? (
                        <Icon
                          icon="mdi:chevron-down"
                          className="rotate-180"
                          size={32}
                        />
                      ) : (
                        <Icon icon="mdi:chevron-down" size={32} />
                      )}
                    </ActionIcon>
                  </Table.Td>
                </Table.Tr>

                {/* === Detail Expand === */}
                {expanded[order.id] && (
                  <>
                    <Table.Tr bg="#FEF5E8">
                      <Table.Td>No</Table.Td>
                      <Table.Td>Nama Produk</Table.Td>
                      <Table.Td>Tipe</Table.Td>
                      <Table.Td>Qty</Table.Td>
                      <Table.Td>Harga/pcs</Table.Td>
                      <Table.Td colSpan={2}>Total Harga</Table.Td>
                    </Table.Tr>
                    {order.detail?.map((item, idx) => (
                      <Table.Tr key={idx}>
                        <Table.Td>{idx + 1}</Table.Td>
                        <Table.Td>{item.produk?.nama}</Table.Td>
                        <Table.Td>{item.produk?.product_type?.nama}</Table.Td>
                        <Table.Td>{item.qty}</Table.Td>
                        <Table.Td>
                          {formatRupiah(
                            item.produk?.harga -
                              (item.produk?.harga * item.diskon) / 100
                          )}
                        </Table.Td>
                        <Table.Td>{formatRupiah(item.total)}</Table.Td>
                      </Table.Tr>
                    ))}
                    <Table.Tr>
                      <Table.Td colSpan={5} align="right">
                        <b className="font-poppins text-sm">Total Produk:</b>
                        <br />
                        <b className="font-poppins text-sm">Total Bayar:</b>
                      </Table.Td>
                      <Table.Td className="font-poppins text-sm">
                        {order.detail?.reduce((acc, cur) => acc + cur.qty, 0) ||
                          0}
                          <br />
                          {formatRupiah(order.total)}
                      </Table.Td>
                    </Table.Tr>
                  </>
                )}
              </React.Fragment>
            ))
          ) : (
            <Table.Tr>
              <Table.Td colSpan={7} align="center">
                <Text c="dimmed" ta="center">
                  Tidak ada data pesanan.
                </Text>
              </Table.Td>
            </Table.Tr>
          )}
        </Table.Tbody>
      </Table>
    </div>
  );
}
