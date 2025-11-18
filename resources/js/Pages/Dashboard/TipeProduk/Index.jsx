import TableView from '@/Components/Dashboard/TipeProduk/TableView';
import DashboardLayout from '@/Layouts/DashboardLayout';
import React from 'react'

const TipeProdukIndex = (props) => {
    console.log(props)
    return (
        <div className="flex flex-col gap-6">
              <h1 className="font-poppins text-2xl ml-2">Tipe Produk</h1>
              <TableView tipeProduk={props.data} />
        </div>
    );

}

TipeProdukIndex.layout = (page) => (
    <DashboardLayout title="Dashboard">{page}</DashboardLayout>
);

export default TipeProdukIndex;
