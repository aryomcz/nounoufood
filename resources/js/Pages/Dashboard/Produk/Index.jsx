import TableView from '@/Components/Dashboard/Produk/TableView';
import DashboardLayout from '@/Layouts/DashboardLayout';
import React from 'react'

const ProdukIndex = (props) => {
    
    return (
            <div className="flex flex-col gap-6">
                  <h1 className="font-poppins text-2xl ml-2">Katalog Produk</h1>
                  <TableView produk={props.data} tipeProduk={props.tipe} />
            </div>
        );

}

ProdukIndex.layout = (page) => (
    <DashboardLayout title="Dashboard">{page}</DashboardLayout>
);

export default ProdukIndex;
