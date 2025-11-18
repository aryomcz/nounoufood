import Card from '@/Components/Dashboard/Card';
import Chart from '@/Components/Dashboard/Chart';
import { Select } from '@mantine/core';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { router } from '@inertiajs/react';
import React from 'react'

const DashboardIndex = (props) => {

    const { year, years } = props;
    const formatRupiah = (number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(number);
    }

    const card = [
    {
      nama: "Pengguna",
      data: props.user,
      bg: "bg-blue-100",
      text: "text-blue-800",
      icon: "mdi:users",
    },
    {
      nama: "Pesanan",
      data: props.order,
      bg: "bg-green-100",
      text: "text-green-800",
      icon: "lets-icons:order-light",
    },
    {
      nama: "Pemasukan",
      data: formatRupiah(props.totalPembayaran),
      bg: "bg-tertiary-90",
      text: "text-primary-main",
      icon: "solar:dollar-outline",
    },
  ];

   const handleChange = (value) => {
    router.get("/dashboard", { year: value }, { preserveState: true });
  };

    return (
        <div>
            <div className="flex flex-wrap gap-2 lg:gap-4 w-full justify-start font-poppins">
        {card.map((menu) => (
          <Card
            key={menu.nama}
            nama={menu.nama}
            data={menu.data}
            bg={menu.bg}
            text={menu.text}
            icon={menu.icon}
          />
        ))}
      </div>
      <div className="py-10 px-8 rounded-3xl bg-white text-black items-center justify-center gap-6 shadow-md mt-6 max-w-[600px] w-full">
        <div className='w-full flex justify-between'>
        <h1 className='font-poppins font-bold text-lg mb-5'>
        Grafik Penjualan 
        </h1>
           <Select
            value={year.toString()}        // harus string
            data={years.map((y) => ({ value: y.toString(), label: y.toString() }))}
            onChange={handleChange}
            withScrollArea={false}
            styles={{
              input: {
                fontSize: "14px",
                padding: "4px 12px"
              }
            }}
          />
        </div>
      <Chart data={props.salesChart} year={year}/>
      </div>
        </div>
    );

}

DashboardIndex.layout = (page) => (
    <DashboardLayout title="Dashboard">{page}</DashboardLayout>
);

export default DashboardIndex;
