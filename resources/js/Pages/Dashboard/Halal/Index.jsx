import TableView from '@/Components/Dashboard/Halal/TableView';
import DashboardLayout from '@/Layouts/DashboardLayout';
import React from 'react'

const HalalIndex = (props) => {
    console.log(props)
    return (
        <div className="flex flex-col gap-6">
              <h1 className="font-poppins text-2xl ml-2">Sertifikasi Halal</h1>
              <TableView halal={props.data} produk={props.produk}/>
        </div>
    );

}

HalalIndex.layout = (page) => (
    <DashboardLayout title="Dashboard">{page}</DashboardLayout>
);

export default HalalIndex;
