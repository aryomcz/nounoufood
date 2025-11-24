import OrderFilterBar from "@/Components/Dashboard/Order/OrderFilterBar";
import TableView from "@/Components/Dashboard/Order/TableView";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { router } from "@inertiajs/react";
import React from "react";
import dayjs from "dayjs";

const OrderIndex = (props) => {

  const handleFilter = ({ dateRange, selectedStatus }) => {
  router.get("/dashboard/orders", {
    start_date: dateRange[0] ? dayjs(dateRange[0]).format("YYYY-MM-DD") : null,
    end_date: dateRange[1] ? dayjs(dateRange[1]).format("YYYY-MM-DD") : null,
    status: selectedStatus,
  }, { preserveState: true });
};

  const handleReset = () => router.get("/dashboard/orders");

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-poppins text-2xl ml-2">Pesanan Pelanggan</h1>
      <OrderFilterBar onFilterChange={handleFilter} onReset={handleReset} />
      <TableView data={props.data} />
    </div>
  );
};

OrderIndex.layout = (page) => (
  <DashboardLayout title="Dashboard">{page}</DashboardLayout>
);

export default OrderIndex;
